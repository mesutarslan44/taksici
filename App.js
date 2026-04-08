import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions, StatusBar, BackHandler, Image, PixelRatio, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { PASSENGERS } from './passengers';
import { TaxiInterior } from './TaxiInterior';
import { ShopScreen } from './ShopScreen';
import { DEFAULT_OWNED, DEFAULT_EQUIPPED, SHOP_ITEMS, SPECIAL_COMBOS } from './shopItems';
import { TaksiDurApp } from './TaksiDurApp';
import { RestScreen, FuelScreen, BreakScreen } from './RestScreens';
import DrivingGame from './DrivingGame';
import { getTimeEmoji, getTimeLabel, formatHour } from './GameManager';
import { SettingsScreen } from './SettingsScreen';
import { triggerReputationChange, triggerAccident, triggerNewRank } from './haptics';
import {
  DEFAULT_DAILY_QUESTS,
  DEFAULT_META_PROGRESS,
  META_UPGRADES,
  getDayKey,
  rolloverDailyQuests,
  updateQuestsOnRide,
  getCurrentChainStep,
  getDailyChainProgress,
  claimDailyChain,
  getActiveWeeklyEvent,
  applyWeeklyEventBonuses,
  getUpgradeCost,
  tryPurchaseUpgrade,
  getMetaEffects,
  pickReplayVariant,
  applyReplayVariantToEnding,
} from './progressionSystems';
import { logBalanceEvent, getCurrentWeekSummary, getBalanceHint } from './analytics';

const { width, height } = Dimensions.get('window');

// Responsive scaling utilities
const baseWidth = 375; // iPhone 8 base width
const scale = width / baseWidth;
const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));
const normalizeFont = (size) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const COLORS = {
  bg: '#0a0a0f', bgLight: '#12121a', card: '#1a1a24', cardLight: '#252532',
  accent: '#ffc857', text: '#f0f0f0', textDim: '#8a8a9a', danger: '#ff6b6b', success: '#4ecdc4', purple: '#9d4edd',
};

// İtibar Seviye Sistemi (Profesyonel isimler, negatif dahil)
const REPUTATION_RANKS = [
  // Negatif seviyeler
  { min: -1000, name: 'Kara Liste', emoji: '💀', color: '#1a1a1a' },
  { min: -500, name: 'Tehlikeli', emoji: '⚠️', color: '#8b0000' },
  { min: -200, name: 'Şüpheli', emoji: '👎', color: '#ff4444' },
  { min: -50, name: 'Borçlu', emoji: '📉', color: '#ff6b6b' },
  // Pozitif seviyeler
  { min: 0, name: 'Acemi', emoji: '🚕', color: '#8a8a9a' },
  { min: 250, name: 'Çırak', emoji: '🚖', color: '#6b8e23' },
  { min: 500, name: 'Kalfa', emoji: '🎖️', color: '#4ecdc4' },
  { min: 1000, name: 'Usta', emoji: '🏅', color: '#ffc857' },
  { min: 2000, name: 'Başusta', emoji: '🌟', color: '#ff8c00' },
  { min: 3500, name: 'Reis', emoji: '⭐', color: '#ff6b6b' },
  { min: 5000, name: 'Kaptan', emoji: '🎯', color: '#9d4edd' },
  { min: 7500, name: 'Efsane', emoji: '👑', color: '#ffd700' },
  { min: 10000, name: 'Maestro', emoji: '🏆', color: '#00ffff' },
  { min: 15000, name: 'İstanbul Kralı', emoji: '💎', color: '#ff00ff' },
];

const getReputationRank = (reputation) => {
  for (let i = REPUTATION_RANKS.length - 1; i >= 0; i--) {
    if (reputation >= REPUTATION_RANKS[i].min) {
      return REPUTATION_RANKS[i];
    }
  }
  return REPUTATION_RANKS[0]; // En düşük seviye
};

const STORAGE_KEY = '@taksici_game_state';
const COMPLETED_STORIES_KEY = '@taksici_completed_stories';
const INVENTORY_KEY = '@taksici_inventory';
const EQUIPPED_KEY = '@taksici_equipped';
const MANAGER_KEY = '@taksici_manager';
const DAILY_QUESTS_KEY = '@taksici_daily_quests';
const LAST_QUEST_RESET_KEY = '@taksici_last_quest_reset';
const ACHIEVEMENTS_KEY = '@taksici_achievements';
const SETTINGS_KEY = '@taksici_settings';
const META_PROGRESS_KEY = '@taksici_meta_progress';

// Varsayılan ayarlar
const DEFAULT_SETTINGS = {
  musicVolume: 0.5,
  effectVolume: 0.7,
  vibrationEnabled: true,
  textSpeed: 20,
  fontSize: 'normal',
  highContrast: false,
};

// Başarılar (Achievements) Sistemi – check(state, ending, completedStories) doğru veriyle çağrılıyor
const ACHIEVEMENTS = [
  // İlk adımlar
  {
    id: 'first_5_rides',
    name: 'İlk Beş Yolcu',
    description: '5 yolcu taşıdın',
    emoji: '🚕',
    color: '#6b8e23',
    check: (state) => (state?.rides ?? 0) >= 5,
  },
  {
    id: 'first_normal_ending',
    name: 'İyi Son',
    description: 'İlk kez normal (iyi) bir sonla bitirdin',
    emoji: '✨',
    color: '#4ecdc4',
    check: (state, ending) => ending?.type === 'normal',
  },
  {
    id: 'five_stories',
    name: 'Beş Hikaye',
    description: '5 hikâyeyi tamamladın',
    emoji: '📖',
    color: '#8a8a9a',
    check: (state, ending, completedStories) => (completedStories?.length ?? 0) >= 5,
  },
  // Para
  {
    id: 'first_10k',
    name: 'İlk 10.000₺',
    description: '10.000₺ kazandın',
    emoji: '💰',
    color: '#ffc857',
    check: (state) => (state?.money ?? 0) >= 10000,
  },
  {
    id: 'money_25k',
    name: '25.000₺',
    description: 'Kasanda 25.000₺ biriktirdin',
    emoji: '💵',
    color: '#ffc857',
    check: (state) => (state?.money ?? 0) >= 25000,
  },
  {
    id: 'money_50k',
    name: '50.000₺',
    description: '50.000₺ kazandın',
    emoji: '🏦',
    color: '#ffd700',
    check: (state) => (state?.money ?? 0) >= 50000,
  },
  // İtibar
  {
    id: 'reputation_100',
    name: 'İtibar 100',
    description: 'İtibarın 100\'e ulaştı',
    emoji: '⭐',
    color: '#4ecdc4',
    check: (state) => (state?.reputation ?? 0) >= 100,
  },
  {
    id: 'reputation_500',
    name: 'İtibar 500',
    description: 'İtibarın 500\'e ulaştı',
    emoji: '🌟',
    color: '#ffc857',
    check: (state) => (state?.reputation ?? 0) >= 500,
  },
  // Özel sonlar
  {
    id: 'first_police',
    name: 'İlk Polis Sonu',
    description: 'İlk kez polis sonu aldın',
    emoji: '👮‍♂️',
    color: '#3b82f6',
    check: (state, ending) => ending?.type === 'police',
  },
  {
    id: 'first_hospital',
    name: 'İlk Hastane Sonu',
    description: 'İlk kez hastane sonu aldın',
    emoji: '🏥',
    color: '#ef4444',
    check: (state, ending) => ending?.type === 'hospital',
  },
  {
    id: 'first_court',
    name: 'İlk Adliye Sonu',
    description: 'İlk kez adliye sonu aldın',
    emoji: '⚖️',
    color: '#fbbf24',
    check: (state, ending) => ending?.type === 'court',
  },
  // Hikaye ilerlemesi
  {
    id: 'ten_stories',
    name: 'On Hikaye',
    description: '10 hikâyeyi tamamladın',
    emoji: '📚',
    color: '#9d4edd',
    check: (state, ending, completedStories) => (completedStories?.length ?? 0) >= 10,
  },
  {
    id: 'half_stories',
    name: 'Yarı Yol',
    description: 'Hikâyelerin yarısını tamamladın',
    emoji: '🎯',
    color: '#9d4edd',
    check: (state, ending, completedStories) =>
      (completedStories?.length ?? 0) >= Math.ceil((PASSENGERS?.length ?? 30) / 2),
  },
  {
    id: 'all_stories',
    name: 'Tüm Hikâyeler',
    description: 'Tüm hikâyeleri tamamladın',
    emoji: '📚',
    color: '#9d4edd',
    check: (state, ending, completedStories) =>
      (completedStories?.length ?? 0) >= (PASSENGERS?.length ?? 30),
  },
  // Yolcu sayısı
  {
    id: 'first_25_rides',
    name: '25 Yolcu',
    description: '25 yolcu taşıdın',
    emoji: '🚖',
    color: '#6b8e23',
    check: (state) => (state?.rides ?? 0) >= 25,
  },
  // Negatif
  {
    id: 'negative_reputation',
    name: 'Kara Liste',
    description: 'İtibarın -50\'nin altına düştü',
    emoji: '💀',
    color: '#1a1a1a',
    check: (state) => (state?.reputation ?? 0) < -50,
  },
];

// Günlük Görevler Sistemi
const getNextRank = (reputation) => {
  const currentRank = getReputationRank(reputation);
  const currentIndex = REPUTATION_RANKS.findIndex(r => r.min === currentRank.min);
  if (currentIndex < REPUTATION_RANKS.length - 1) {
    return REPUTATION_RANKS[currentIndex + 1];
  }
  return null; // En yüksek rütbedesin
};

const getReputationToNextRank = (reputation) => {
  const nextRank = getNextRank(reputation);
  if (!nextRank) return null;
  return nextRank.min - reputation;
};

// Rütbe ilerleme yüzdesini hesapla
const getReputationProgress = (reputation) => {
  const currentRank = getReputationRank(reputation);
  const nextRank = getNextRank(reputation);
  if (!nextRank) return 100; // En yüksek rütbedesin

  const currentRankMin = currentRank.min;
  const nextRankMin = nextRank.min;
  const range = nextRankMin - currentRankMin;
  const progress = reputation - currentRankMin;

  return Math.min(100, Math.max(0, (progress / range) * 100));
};

// Yağmur Damlası
const RainDrop = ({ delay, duration, left, isRaining }) => {
  const translateY = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    if (!isRaining) return;
    const animate = () => {
      translateY.setValue(-20); opacity.setValue(0.3);
      Animated.parallel([
        Animated.timing(translateY, { toValue: height + 20, duration, useNativeDriver: true, delay }),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0.6, duration: duration * 0.3, useNativeDriver: true, delay }),
          Animated.timing(opacity, { toValue: 0.1, duration: duration * 0.7, useNativeDriver: true }),
        ]),
      ]).start(() => { if (isRaining) animate(); });
    };
    animate();
  }, [isRaining]);
  if (!isRaining) return null;
  return <Animated.View style={[styles.rainDrop, { left: `${left}%`, transform: [{ translateY }], opacity }]} />;
};

const RainEffect = ({ isRaining }) => {
  const drops = Array.from({ length: 30 }, (_, i) => ({ id: i, delay: Math.random() * 2000, duration: 1000 + Math.random() * 1000, left: Math.random() * 100 }));
  return <View style={styles.rainContainer} pointerEvents="none">{drops.map(drop => <RainDrop key={drop.id} {...drop} isRaining={isRaining} />)}</View>;
};

function App() {
  return <SafeAreaProvider><StatusBar barStyle="light-content" backgroundColor={COLORS.bg} /><GameScreen /></SafeAreaProvider>;
}

function GameScreen() {
  const insets = useSafeAreaInsets();
  const [screen, setScreen] = useState('menu');
  const [gameState, setGameState] = useState({ money: 250, rides: 0, reputation: 50, currentPassenger: null, dialogueIndex: 0 });
  const [currentEnding, setCurrentEnding] = useState(null);
  const [completedStories, setCompletedStories] = useState([]);
  const [rainSound, setRainSound] = useState(null);
  const [trafficSound, setTrafficSound] = useState(null);
  const [citySound, setCitySound] = useState(null);

  // KONUM SİSTEMİ
  const [lastLocation, setLastLocation] = useState('Taksim'); // Varsayılan başlangıç

  const [isRaining, setIsRaining] = useState(true);
  // Radio states removed
  const [allStoriesCompleted, setAllStoriesCompleted] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const [ownedItems, setOwnedItems] = useState(DEFAULT_OWNED);
  const [equippedItems, setEquippedItems] = useState(DEFAULT_EQUIPPED);
  const [taximeterAmount, setTaximeterAmount] = useState(0);

  // YENİ: Oyun Yöneticisi State
  const [manager, setManager] = useState({
    energy: 100,
    fuel: 100,
    hour: 8,
    dayTime: 'morning',
    day: 1,
    ridesThisShift: 0,
  });

  // Günlük Görevler State
  const [dailyQuests, setDailyQuests] = useState(DEFAULT_DAILY_QUESTS);
  const [metaProgress, setMetaProgress] = useState(DEFAULT_META_PROGRESS);
  const [weeklySummary, setWeeklySummary] = useState({
    weekId: '',
    totalEvents: 0,
    ridesCompleted: 0,
    moneyDelta: 0,
    avgRideMoney: 0,
    policeEndings: 0,
    refuels: 0,
    breaks: 0,
    dailyClaims: 0,
    upgrades: 0,
    replayRides: 0,
  });

  // Başarılar (Achievements) State
  const [achievements, setAchievements] = useState({});

  // Mini-Game State
  const [pendingNextChoice, setPendingNextChoice] = useState(null);
  const [pendingFailChoice, setPendingFailChoice] = useState(null);

  // Tooltip Modal State
  const [tooltipModal, setTooltipModal] = useState({ visible: false, type: null });

  // Diyalog Geçmişi State
  const [dialogueHistory, setDialogueHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Typewriter Effect State
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [canSkipTyping, setCanSkipTyping] = useState(false);
  const typewriterTimeoutRef = useRef(null);
  const typingIndexRef = useRef(0);

  // Settings State
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [previousReputation, setPreviousReputation] = useState(null);
  const [previousRank, setPreviousRank] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const choicesAnim = useRef(new Animated.Value(0)).current;
  const ambientTimeoutsRef = useRef([]);
  const rainSoundRef = useRef(null);
  const trafficSoundRef = useRef(null);
  const citySoundRef = useRef(null);

  const scheduleAmbientTimeout = (callback, delay) => {
    const timeoutId = setTimeout(() => {
      ambientTimeoutsRef.current = ambientTimeoutsRef.current.filter(id => id !== timeoutId);
      callback();
    }, delay);
    ambientTimeoutsRef.current.push(timeoutId);
    return timeoutId;
  };

  const clearAmbientTimeouts = () => {
    ambientTimeoutsRef.current.forEach(clearTimeout);
    ambientTimeoutsRef.current = [];
  };

  const weeklyEvent = getActiveWeeklyEvent();
  const currentChainStep = getCurrentChainStep(dailyQuests);
  const chainProgress = getDailyChainProgress(dailyQuests);
  const metaEffects = getMetaEffects(metaProgress);

  // Manager kaydet/yükle
  useEffect(() => {
    loadManagerState();
    loadDailyQuests();
    loadMetaProgress();
    loadAchievements();
    loadSettings();
    refreshWeeklySummary();
  }, []);

  // Ayarları yükle
  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (e) {
      console.log('Settings load error:', e);
    }
  };

  // Ayarlar değiştiğinde ses seviyelerini güncelle
  useEffect(() => {
    if (rainSound) {
      rainSound.setVolumeAsync(settings.musicVolume * 0.3);
    }
    if (trafficSound) {
      trafficSound.setVolumeAsync(settings.effectVolume * 0.15);
    }
    if (citySound) {
      citySound.setVolumeAsync(settings.effectVolume * 0.12);
    }
  }, [settings.musicVolume, settings.effectVolume, rainSound, trafficSound, citySound]);

  const loadManagerState = async () => {
    try {
      const saved = await AsyncStorage.getItem(MANAGER_KEY);
      if (saved) setManager(prev => ({ ...prev, ...JSON.parse(saved) }));
    } catch (e) { console.log('Manager load error:', e); }
  };

  const saveManagerState = async (newManager) => {
    try {
      await AsyncStorage.setItem(MANAGER_KEY, JSON.stringify(newManager));
    } catch (e) { console.log('Manager save error:', e); }
  };

  const loadMetaProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem(META_PROGRESS_KEY);
      if (saved) {
        setMetaProgress({ ...DEFAULT_META_PROGRESS, ...JSON.parse(saved) });
      }
    } catch (e) {
      console.log('Meta progress load error:', e);
    }
  };

  const saveMetaProgress = async (newMeta) => {
    try {
      await AsyncStorage.setItem(META_PROGRESS_KEY, JSON.stringify(newMeta));
    } catch (e) {
      console.log('Meta progress save error:', e);
    }
  };

  const refreshWeeklySummary = async () => {
    const summary = await getCurrentWeekSummary();
    setWeeklySummary(summary);
  };

  // Günlük Görevler Yükleme ve Sıfırlama
  const loadDailyQuests = async () => {
    try {
      const saved = await AsyncStorage.getItem(DAILY_QUESTS_KEY);
      const legacyReset = await AsyncStorage.getItem(LAST_QUEST_RESET_KEY);
      const todayKey = getDayKey();
      const parsed = saved ? { ...DEFAULT_DAILY_QUESTS, ...JSON.parse(saved) } : { ...DEFAULT_DAILY_QUESTS };

      if (!parsed.lastResetDay && legacyReset) {
        parsed.lastResetDay = legacyReset;
      }

      const rolled = rolloverDailyQuests(parsed, todayKey);
      setDailyQuests(rolled);
      await AsyncStorage.setItem(DAILY_QUESTS_KEY, JSON.stringify(rolled));
      await AsyncStorage.setItem(LAST_QUEST_RESET_KEY, todayKey);
    } catch (e) { console.log('Daily quests load error:', e); }
  };

  const saveDailyQuests = async (newQuests) => {
    try {
      await AsyncStorage.setItem(DAILY_QUESTS_KEY, JSON.stringify(newQuests));
      if (newQuests?.lastResetDay) {
        await AsyncStorage.setItem(LAST_QUEST_RESET_KEY, newQuests.lastResetDay);
      }
    } catch (e) { console.log('Daily quests save error:', e); }
  };

  const loadAchievements = async () => {
    try {
      const saved = await AsyncStorage.getItem(ACHIEVEMENTS_KEY);
      if (saved) {
        setAchievements(JSON.parse(saved));
      }
    } catch (e) { console.log('Achievements load error:', e); }
  };

  const saveAchievements = async (newAchievements) => {
    try {
      await AsyncStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(newAchievements));
    } catch (e) { console.log('Achievements save error:', e); }
  };

  // Başarı Kontrolü
  const checkAchievements = (ending = null, currentState = null, currentCompleted = null) => {
    const stateToCheck = currentState || gameState;
    const completedToCheck = currentCompleted !== null ? currentCompleted : completedStories;

    setAchievements(prev => {
      const newAchievements = { ...prev };
      let hasNewAchievement = false;

      ACHIEVEMENTS.forEach(achievement => {
        // Eğer zaten kazanılmışsa atla
        if (newAchievements[achievement.id]) return;

        // Kontrol et
        if (achievement.check(stateToCheck, ending, completedToCheck)) {
          newAchievements[achievement.id] = {
            unlocked: true,
            unlockedAt: new Date().toISOString(),
          };
          hasNewAchievement = true;
        }
      });

      if (hasNewAchievement) {
        saveAchievements(newAchievements);
      }

      return newAchievements;
    });
  };

  const updateDailyQuests = (ending, hour = manager.hour) => {
    const todayKey = getDayKey();

    setDailyQuests(prev => {
      const rolled = rolloverDailyQuests(prev, todayKey);
      const next = updateQuestsOnRide(rolled, { ending, hour });
      saveDailyQuests(next);
      return next;
    });
  };

  const handleClaimDailyChainReward = () => {
    setDailyQuests(prev => {
      const rolled = rolloverDailyQuests(prev, getDayKey());
      const result = claimDailyChain(rolled);
      if (!result.claimed) return rolled;

      setGameState(prevState => {
        const nextState = {
          ...prevState,
          money: prevState.money + result.reward.money,
          reputation: prevState.reputation + result.reward.reputation,
        };
        saveGameState(nextState);
        setTimeout(() => {
          checkAchievements(null, nextState, completedStories);
        }, 100);
        return nextState;
      });

      logBalanceEvent('daily_chain_claim', {
        chainDayIndex: rolled.chainDayIndex,
        moneyReward: result.reward.money,
        repReward: result.reward.reputation,
      });

      saveDailyQuests(result.updated);
      refreshWeeklySummary();
      return result.updated;
    });
  };

  const handlePurchaseMetaUpgrade = (upgradeId) => {
    const purchase = tryPurchaseUpgrade(metaProgress, upgradeId);
    if (!purchase.ok) return;

    if (gameState.money < purchase.cost) {
      Alert.alert('Yetersiz Bakiye', 'Bu gelistirme icin kasada yeterli para yok.');
      return;
    }

    const newMeta = purchase.newMeta;
    const newState = { ...gameState, money: gameState.money - purchase.cost };

    setMetaProgress(newMeta);
    saveMetaProgress(newMeta);

    setGameState(newState);
    saveGameState(newState);

    logBalanceEvent('meta_upgrade_buy', {
      upgradeId,
      cost: purchase.cost,
      nextLevel: newMeta[upgradeId],
    });
    refreshWeeklySummary();
  };

  const calculateDayTime = (hour) => {
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  // Geri tuşu handler
  useEffect(() => {
    const backAction = () => {
      if (screen === 'settings' || screen === 'shop' || screen === 'taksidur' || screen === 'rest' || screen === 'fuel' || screen === 'break' || screen === 'achievements') {
        setScreen('menu');
        return true;
      } else if (screen === 'passenger') {
        setScreen('taksidur');
        return true;
      } else if (screen === 'ending') {
        setScreen('menu');
        setGameState(prev => ({ ...prev, currentPassenger: null }));
        return true;
      } else if (screen === 'menu') {
        return false;
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [screen]);

  useEffect(() => {
    if (screen === 'menu') {
      refreshWeeklySummary();
    }
  }, [screen, gameState.rides, gameState.money]);

  // Font boyutu çarpanı
  const getFontSizeMultiplier = () => {
    switch (settings.fontSize) {
      case 'small': return 0.85;
      case 'large': return 1.25;
      default: return 1.0;
    }
  };

  const fontSizeMultiplier = getFontSizeMultiplier();

  // Kontrast renkleri
  const getTextColor = () => {
    if (settings.highContrast) {
      return COLORS.text; // Daha parlak beyaz
    }
    return COLORS.text;
  };

  const getCardBgColor = () => {
    if (settings.highContrast) {
      return COLORS.bgLight; // Daha açık arka plan
    }
    return COLORS.card;
  };

  const getDialogueBoxStyle = () => {
    if (settings.highContrast) {
      return {
        backgroundColor: 'rgba(37, 37, 50, 0.95)',
        borderWidth: 2,
        borderColor: COLORS.accent,
      };
    }
    return {
      backgroundColor: 'rgba(26,26,36,0.9)',
    };
  };

  useEffect(() => {
    fadeAnim.setValue(0); slideAnim.setValue(50);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();

    if (screen === 'dialogue' && !isThinking) {
      Animated.timing(choicesAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }
  }, [screen, isThinking]);

  // Diyalog değiştiğinde typewriter efekti başlat
  useEffect(() => {
    if (screen === 'dialogue' && gameState.currentPassenger && !isThinking) {
      const dialogue = gameState.currentPassenger.dialogue[gameState.dialogueIndex];
      if (dialogue?.text) {
        // Önceki timeout'u temizle
        if (typewriterTimeoutRef.current) {
          clearTimeout(typewriterTimeoutRef.current);
        }
        // Her durumda yeniden başlat
        startTypewriterEffect(dialogue.text);
      }
    }

    // Cleanup
    return () => {
      if (typewriterTimeoutRef.current) {
        clearTimeout(typewriterTimeoutRef.current);
      }
    };
  }, [gameState.dialogueIndex, gameState.currentPassenger, screen, isThinking]);

  useEffect(() => {
    loadGameState();
    loadRainSound();
    return () => {
      clearAmbientTimeouts();
      rainSoundRef.current?.unloadAsync?.();
      trafficSoundRef.current?.unloadAsync?.();
      citySoundRef.current?.unloadAsync?.();
    };
  }, []);

  // Ortam sesleri döngüsü - Ayarlardan ses seviyelerini kullan
  useEffect(() => {
    clearAmbientTimeouts();
    let isCancelled = false;

    const ambientCycle = async () => {
      if (isCancelled) return;

      setIsRaining(true);
      if (rainSound && settings.musicVolume > 0) {
        await rainSound.setVolumeAsync(settings.musicVolume * 0.3);
        await rainSound.playAsync();
      }

      scheduleAmbientTimeout(async () => {
        if (isCancelled) return;
        setIsRaining(false);
        if (rainSound) await rainSound.pauseAsync();

        scheduleAmbientTimeout(async () => {
          if (isCancelled) return;
          if (trafficSound && settings.effectVolume > 0) {
            await trafficSound.setVolumeAsync(settings.effectVolume * 0.15);
            await trafficSound.playAsync();
          }

          scheduleAmbientTimeout(async () => {
            if (isCancelled) return;
            if (trafficSound) await trafficSound.pauseAsync();

            scheduleAmbientTimeout(async () => {
              if (isCancelled) return;
              if (citySound && settings.effectVolume > 0) {
                await citySound.setVolumeAsync(settings.effectVolume * 0.12);
                await citySound.playAsync();
              }

              scheduleAmbientTimeout(async () => {
                if (isCancelled) return;
                if (citySound) await citySound.pauseAsync();

                scheduleAmbientTimeout(() => {
                  if (!isCancelled) ambientCycle();
                }, 60000);
              }, 20000);
            }, 40000);
          }, 20000);
        }, 30000);
      }, 15000);
    };

    scheduleAmbientTimeout(ambientCycle, 1000);
    return () => {
      isCancelled = true;
      clearAmbientTimeouts();
    };
  }, [rainSound, trafficSound, citySound, settings.musicVolume, settings.effectVolume]);

  // Taksimetre animasyonu
  // Taksimetre animasyonu - Gerçekçi Artış
  useEffect(() => {
    if (screen === 'dialogue' && gameState.currentPassenger) {
      // Hedef ücret: Yolcunun tahmini kazancı
      const targetFare = gameState.currentPassenger.estimatedEarning || 50;
      // Yolculuk süresi (saniye) varsayımı: 45 sn
      // Her 100ms'de ne kadar artacak?
      const incrementPerTick = targetFare / (45 * 10);

      const interval = setInterval(() => {
        setTaximeterAmount(prev => {
          // Çok aşırı artmasını engelle (max 1.5 katı)
          if (prev >= targetFare * 1.5) return prev;
          return prev + incrementPerTick;
        });
      }, 100);
      return () => clearInterval(interval);
    } else if (screen === 'taksidur' || screen === 'passenger') {
      setTaximeterAmount(5.00); // Açılış ücreti
    }
  }, [screen, gameState.currentPassenger]);

  const loadRainSound = async () => {
    try {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: true });

      const { sound: rain } = await Audio.Sound.createAsync(
        { uri: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3' },
        { shouldPlay: false, isLooping: true, volume: 0.3 }
      );
      rainSoundRef.current = rain;
      setRainSound(rain);

      // Trafik Sesi - Yerel dosya
      const { sound: traffic } = await Audio.Sound.createAsync(
        require('./assets/sounds/traffic.mp3'),
        { shouldPlay: false, isLooping: true, volume: 0.15 }
      );
      trafficSoundRef.current = traffic;
      setTrafficSound(traffic);

      // Sehir Ambiyansi - Yerel dosya
      const { sound: city } = await Audio.Sound.createAsync(
        require('./assets/sounds/city.mp3'),
        { shouldPlay: false, isLooping: true, volume: 0.12 }
      );
      citySoundRef.current = city;
      setCitySound(city);
    } catch (e) { console.log('Sound load error:', e); }
  };

  // Radyo fonksiyonları silindi

  // MUTE/UNMUTE - Artık ayarlar ekranından kontrol ediliyor
  // Eski toggleMute fonksiyonu kaldırıldı

  const loadGameState = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      const completed = await AsyncStorage.getItem(COMPLETED_STORIES_KEY);
      const inventory = await AsyncStorage.getItem(INVENTORY_KEY);
      const equipped = await AsyncStorage.getItem(EQUIPPED_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const reputation = parsed.reputation ?? 50;
        setGameState(prev => ({ ...prev, money: parsed.money ?? 250, rides: parsed.rides ?? 0, reputation }));
        if (parsed.lastLocation) setLastLocation(parsed.lastLocation); // Konum yükle
        // Önceki itibar ve rütbeyi başlat
        setPreviousReputation(reputation);
        setPreviousRank(getReputationRank(reputation));
      } else {
        // İlk başlatma
        const initialReputation = 50;
        setPreviousReputation(initialReputation);
        setPreviousRank(getReputationRank(initialReputation));
      }
      if (completed) setCompletedStories(JSON.parse(completed));
      if (inventory) setOwnedItems(JSON.parse(inventory));
      if (equipped) setEquippedItems(JSON.parse(equipped));
    } catch (e) { console.log('Load error:', e); }
  };

  const saveGameState = async (newState, newCompletedStories = null, newLocation = null) => {
    try {
      const locationToSave = newLocation || lastLocation;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
        money: newState.money,
        rides: newState.rides,
        reputation: newState.reputation,
        lastLocation: locationToSave // Konum kaydet
      }));
      if (newCompletedStories) await AsyncStorage.setItem(COMPLETED_STORIES_KEY, JSON.stringify(newCompletedStories));
    } catch (e) { console.log('Save error:', e); }
  };

  const saveInventory = async (newOwned, newEquipped) => {
    try {
      await AsyncStorage.setItem(INVENTORY_KEY, JSON.stringify(newOwned));
      await AsyncStorage.setItem(EQUIPPED_KEY, JSON.stringify(newEquipped));
    } catch (e) { console.log('Save inventory error:', e); }
  };

  const calculateBonus = () => {
    let bonus = 0;
    Object.entries(equippedItems).forEach(([category, itemId]) => {
      const items = SHOP_ITEMS[category];
      if (items) {
        const item = items.find(i => i.id === itemId);
        if (item) bonus += item.effect || 0;
      }
    });
    SPECIAL_COMBOS.forEach(combo => {
      const hasAll = combo.required.every(itemId =>
        Object.values(equippedItems).includes(itemId) || ownedItems.includes(itemId)
      );
      if (hasAll) bonus += combo.bonus;
    });
    return bonus;
  };

  const getAvailableStories = () => PASSENGERS.filter(p => !completedStories.includes(p.id));
  const getReplayStories = () => PASSENGERS.filter(p => completedStories.includes(p.id));

  // YOLCU AL - TaksiDur uygulamasini ac
  const startRide = () => {
    const available = getAvailableStories();
    const replay = getReplayStories();

    if (available.length === 0 && replay.length === 0) {
      setAllStoriesCompleted(true);
      return;
    }

    setAllStoriesCompleted(false);

    if (manager.energy <= 15) {
      setScreen('rest');
      return;
    }
    if (manager.fuel <= 15) {
      setScreen('fuel');
      return;
    }

    logBalanceEvent('ride_search_open', {
      availableStories: available.length,
      replayStories: replay.length,
    });

    setScreen('taksidur');
  };

  const handleTaximeterIncrease = (amount) => {
    setTaximeterAmount(prev => prev + amount);
  };

  // TaksiDur'dan yolcu seçildi
  const handleSelectPassenger = (passenger) => {
    const passengerWithReplay = passenger?.isReplay
      ? { ...passenger, replayVariant: passenger.replayVariant || pickReplayVariant() }
      : passenger;

    setGameState(prev => ({ ...prev, currentPassenger: passengerWithReplay, dialogueIndex: 0 }));
    setLastLocation(passenger.location);
    saveGameState(gameState, null, passenger.location);

    logBalanceEvent('passenger_selected', {
      passengerId: passengerWithReplay?.id,
      isReplay: !!passengerWithReplay?.isReplay,
      isEventPassenger: !!passengerWithReplay?.isEventPassenger,
      eventId: weeklyEvent?.id || null,
    });

    const totalRides = gameState.rides + 1;
    if (totalRides > 0 && totalRides % 5 === 0) {
      Alert.alert(
        "?? MEYDAN OKUMA! ??",
        "Besinci yolcu serefine ozel bir parkur seni bekliyor! Yolcuyu almadan once yeteneklerini goster!",
        [
          {
            text: "YARISA BASLA",
            onPress: () => {
              setPendingNextChoice(-1);
              setPendingFailChoice(-1);
              setScreen('driving_game');
            }
          }
        ]
      );
      return;
    }

    setScreen('passenger');
  };

  const completeRideAndUpdate = (ending) => {
    const duration = 30 + Math.random() * 30;
    const newHour = (manager.hour + Math.ceil(duration / 60)) % 24;
    const rawFuelCost = (5 + Math.random() * 5) * metaEffects.fuelConsumptionMultiplier;
    const newFuel = Math.max(0, manager.fuel - rawFuelCost);
    const newEnergy = Math.max(0, manager.energy - (10 + Math.random() * 5));
    const newDay = newHour < manager.hour ? manager.day + 1 : manager.day;

    const newManager = {
      ...manager,
      hour: newHour,
      fuel: newFuel,
      energy: newEnergy,
      dayTime: calculateDayTime(newHour),
      day: newDay,
      ridesThisShift: manager.ridesThisShift + 1,
    };
    setManager(newManager);
    saveManagerState(newManager);

    updateDailyQuests(ending, newHour);
  };

  const handleRest = () => {
    const newManager = {
      ...manager,
      energy: 100,
      hour: 8,
      dayTime: 'morning',
      day: manager.dayTime === 'night' ? manager.day + 1 : manager.day,
      ridesThisShift: 0,
    };
    setManager(newManager);
    saveManagerState(newManager);
    setScreen('menu');
  };

  // Benzin doldur
  const handleRefuel = (cost) => {
    if (gameState.money >= cost) {
      const newState = { ...gameState, money: gameState.money - cost };
      setGameState(newState);
      saveGameState(newState);

      // Ba?ar?lar? kontrol et (para de?i?ti)
      setTimeout(() => {
        checkAchievements(null, newState, completedStories);
      }, 100);

      const newManager = { ...manager, fuel: 100 };
      setManager(newManager);
      saveManagerState(newManager);
      logBalanceEvent('refuel', { cost });
      refreshWeeklySummary();
      setScreen('menu');
    }
  };

  // Mola
  const handleBreak = (type, cost) => {
    if (gameState.money >= cost) {
      const newState = { ...gameState, money: gameState.money - cost };
      setGameState(newState);
      saveGameState(newState);

      // Ba?ar?lar? kontrol et (para de?i?ti)
      setTimeout(() => {
        checkAchievements(null, newState, completedStories);
      }, 100);

      const energyBoost = type === 'coffee' ? 25 : 15;
      const newManager = {
        ...manager,
        energy: Math.min(100, manager.energy + energyBoost),
        hour: (manager.hour + 1) % 24,
      };
      setManager(newManager);
      saveManagerState(newManager);
      logBalanceEvent('break', { type, cost });
      refreshWeeklySummary();
      setScreen('menu');
    }
  };

  const resetStories = async () => {
    setCompletedStories([]);
    setAllStoriesCompleted(false);
    await AsyncStorage.removeItem(COMPLETED_STORIES_KEY);
  };

  const acceptPassenger = () => {
    setScreen('dialogue');
    // İlk diyalog için geçmişi sıfırla
    setDialogueHistory([]);
    // Typewriter efekti useEffect'te başlayacak
  };

  // Typewriter Effect Fonksiyonu
  const startTypewriterEffect = (fullText) => {
    setIsTyping(true);
    setCanSkipTyping(false);
    setDisplayedText('');
    typingIndexRef.current = 0;

    const typingSpeed = settings.textSpeed || 20; // Güvenli fallback

    const type = () => {
      const currentIndex = typingIndexRef.current;
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        typingIndexRef.current = currentIndex + 1;
        typewriterTimeoutRef.current = setTimeout(type, typingSpeed);
      } else {
        setIsTyping(false);
        setCanSkipTyping(false);
      }

      // İlk birkaç karakterden sonra skip edilebilir
      if (currentIndex > 10) {
        setCanSkipTyping(true);
      }
    };

    type();
  };

  // Typewriter'i skip et
  const skipTypewriter = () => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }
    const currentDialogue = gameState.currentPassenger?.dialogue[gameState.dialogueIndex];
    if (currentDialogue?.text) {
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
      setCanSkipTyping(false);
    }
  };

  // Radyoyu durdur (diyalog bittiğinde otomatik kapanması için)
  // stopRadio fonksiyonu silindi

  const handleChoice = (nextIndex, ending = null) => {
    // --- MINI GAME TRIGGERS ---
    // Karakter 19: Makas Show (next: 6), Fail: 7
    if (gameState.currentPassenger?.id === 19 && nextIndex === 6) {
      setPendingNextChoice(6);
      setPendingFailChoice(7);
      setScreen('driving_game');
      return;
    }
    // Karakter 20: Kaçış (next: 8), Fail: 10
    if (gameState.currentPassenger?.id === 20 && nextIndex === 8) {
      setPendingNextChoice(8);
      setPendingFailChoice(10);
      setScreen('driving_game');
      return;
    }

    if (ending) {
      const replayVariant = gameState.currentPassenger?.replayVariant;
      const resolvedEnding = gameState.currentPassenger?.isReplay
        ? applyReplayVariantToEnding(ending, replayVariant, gameState.currentPassenger?.name)
        : ending;

      const bonus = calculateBonus();
      const baseFare = Math.floor(taximeterAmount * metaEffects.taximeterMultiplier);
      const endingMoney = resolvedEnding.money || 0;
      const totalMoney = baseFare + endingMoney;

      const earnedMoney = Math.round(totalMoney * (1 + bonus / 100));
      let earnedRep = Math.round((resolvedEnding.reputation || 0) * (1 + bonus / 100));
      if (earnedRep < 0) {
        earnedRep = Math.round(earnedRep * metaEffects.negativeReputationMultiplier);
      }

      const weeklyAdjusted = applyWeeklyEventBonuses(earnedMoney, earnedRep, weeklyEvent);
      const endingForDisplay = {
        ...resolvedEnding,
        appliedMoney: weeklyAdjusted.money,
        appliedReputation: weeklyAdjusted.reputation,
        appliedBonusPct: bonus,
        appliedEventMoneyBonus: weeklyAdjusted.moneyBonus || 0,
        appliedEventReputationBonus: weeklyAdjusted.reputationBonus || 0,
      };

      setCurrentEnding(endingForDisplay);
      setScreen('ending');
      completeRideAndUpdate(endingForDisplay);

      const newCompleted = [...completedStories];
      if (!completedStories.includes(gameState.currentPassenger.id)) {
        newCompleted.push(gameState.currentPassenger.id);
        setCompletedStories(newCompleted);
      }

      const newState = {
        ...gameState,
        money: gameState.money + weeklyAdjusted.money,
        rides: gameState.rides + 1,
        reputation: gameState.reputation + weeklyAdjusted.reputation,
        currentEnding: endingForDisplay
      };

      const repChange = newState.reputation - gameState.reputation;
      if (previousReputation !== null && Math.abs(repChange) > 0) {
        triggerReputationChange(repChange, settings.vibrationEnabled);
      }

      const oldRank = previousRank || getReputationRank(gameState.reputation);
      const newRank = getReputationRank(newState.reputation);
      if (previousRank !== null && oldRank.min !== newRank.min) {
        triggerNewRank(settings.vibrationEnabled);
      }

      setPreviousReputation(newState.reputation);
      setPreviousRank(newRank);
      setGameState(newState);
      saveGameState(newState);
      if (newCompleted.length > completedStories.length) {
        AsyncStorage.setItem(COMPLETED_STORIES_KEY, JSON.stringify(newCompleted));
      }

      logBalanceEvent('ride_completed', {
        endingType: endingForDisplay.type || 'normal',
        money: weeklyAdjusted.money,
        reputation: weeklyAdjusted.reputation,
        isReplay: !!gameState.currentPassenger?.isReplay,
        eventId: weeklyEvent?.id || null,
        eventMoneyBonus: weeklyAdjusted.moneyBonus || 0,
      });
      refreshWeeklySummary();

      setTimeout(() => {
        checkAchievements(endingForDisplay, newState, newCompleted);
      }, 100);

      return;
    }

    const currentDialogue = gameState.currentPassenger?.dialogue;
    if (nextIndex === null || nextIndex === undefined || !currentDialogue || !currentDialogue[nextIndex]) {
      console.warn('Invalid nextIndex or dialogue not found, returning to menu.');
      setGameState(prev => ({ ...prev, currentPassenger: null }));
      setScreen('menu');
      return;
    }

    setIsThinking(true);
    choicesAnim.setValue(0);

    // Diyalog geçmişine ekle
    const currentDialogueStep = gameState.currentPassenger?.dialogue[gameState.dialogueIndex];
    if (currentDialogueStep) {
      const selectedChoice = currentDialogueStep.choices?.find(c => c.next === nextIndex);
      if (selectedChoice) {
        setDialogueHistory(prev => [
          ...prev.slice(-4), // Son 4'ü tut
          { type: 'passenger', text: currentDialogueStep.text, speaker: gameState.currentPassenger.name },
          { type: 'player', text: selectedChoice.text, speaker: 'Sen' }
        ]);
      }
    }

    const delay = 500;

    setTimeout(() => {
      setIsThinking(false);
      setGameState(prev => ({ ...prev, dialogueIndex: nextIndex }));
      Animated.timing(choicesAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();

      // Yeni diyalog için typewriter efekti başlat
      // useEffect tarafından otomatik tetiklenecek
      // const nextDialogue = gameState.currentPassenger?.dialogue[nextIndex];
      // if (nextDialogue?.text) {
      //   startTypewriterEffect(nextDialogue.text);
      // }
    }, delay);
  };

  const continueGame = () => {
    setGameState(prev => ({ ...prev, currentPassenger: null }));
    setScreen('menu');
    // stopRadio silindi
  };

  // MAĞAZA
  const handleBuy = (item, category) => {
    if (gameState.money < item.price) return;
    const newMoney = gameState.money - item.price;
    const newOwned = [...ownedItems, item.id];
    const newEquipped = { ...equippedItems, [category]: item.id };
    const newState = { ...gameState, money: newMoney };
    setGameState(newState);
    setOwnedItems(newOwned);
    setEquippedItems(newEquipped);
    saveGameState(newState);
    saveInventory(newOwned, newEquipped);

    // Başarıları kontrol et (para değişti)
    setTimeout(() => {
      checkAchievements(null, newState, completedStories);
    }, 100);
    logBalanceEvent('shop_buy', {
      itemId: item.id,
      category,
      cost: item.price,
    });
    refreshWeeklySummary();
  };

  const handleEquip = (itemId, category) => {
    const newEquipped = { ...equippedItems, [category]: itemId };
    setEquippedItems(newEquipped);
    saveInventory(ownedItems, newEquipped);
  };

  // Mini-Game Result Handler
  const handleMiniGameResult = (success) => {
    // TEST MODU KONTROLÜ
    if (!gameState.currentPassenger) {
      Alert.alert(
        success ? "BAŞARILI! 🎉" : "KAZA! 💥",
        success ? "Harika sürüş! Test sürüşünü geçtin." : "Dikkat et! Test sürüşünde kaza yaptın.",
        [{ text: "Menüye Dön", onPress: () => setScreen('menu') }]
      );
      return;
    }

    // Mini game sonrasında hangi diyaloğa gidileceğini belirle
    const nextDialogueIndex = success ? pendingNextChoice : pendingFailChoice;

    // Reset pending states
    setPendingNextChoice(null);
    setPendingFailChoice(null);

    // MEYDAN OKUMA MODU (-1): Passenger ekranına git
    if (nextDialogueIndex === -1) {
      Alert.alert(
        success ? "BAŞARILI! 🎉" : "EH, İDARE EDER 😅",
        success ? "Harika sürüş! Şimdi yolcunu al." : "Olsun, bir dahaki sefere daha iyi olur. Yolcunu al.",
        [{ text: "TAMAM", onPress: () => setScreen('passenger') }]
      );
      return;
    }

    // Normal diyalog içi mini game: Diyalog ekranına dön
    setScreen('dialogue');

    if (nextDialogueIndex !== null && nextDialogueIndex >= 0) {
      // Diyaloğu doğrudan ilerlet (handleChoice'u çağırmadan)
      setGameState(prev => ({ ...prev, dialogueIndex: nextDialogueIndex }));

      // Diyalog geçmişine ekle
      const currentDialogue = gameState.currentPassenger.dialogue[gameState.dialogueIndex];
      if (currentDialogue) {
        setDialogueHistory(prev => [
          ...prev,
          { type: 'passenger', text: currentDialogue.text, speaker: gameState.currentPassenger.name },
          { type: 'player', text: success ? '(Makas başarılı!)' : '(Kaza!)', speaker: 'Sen' }
        ]);
      }
    }
  };

  // MENÜ EKRANI
  const renderMenuScreen = () => (
    <Animated.View style={[styles.screen, styles.menuScreen, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
        <Image source={require('./assets/bg_rain_dark.webp')} style={{ width: width, height: height }} resizeMode="cover" blurRadius={3} />
      </View>

      {/* Üst Butonlar - Sağ Üst - Yan Yana */}
      <View style={styles.topButtonsRow}>
        {/* Sıfırlama Butonu - Kırmızı Çerçeveli */}
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={() => {
            Alert.alert(
              "⚠️ İlerlemeyi Sıfırla",
              "Tüm hikaye geçmişiniz silinecek. '29 hikaye bitti' gibi hatalar düzelecek.\n\nEmin misiniz?",
              [
                { text: "Vazgeç", style: "cancel" },
                {
                  text: "EVET, SİL",
                  style: "destructive",
                  onPress: () => {
                    resetStories();
                    console.log("Hikayeler kullanıcı onayıyla sıfırlandı");
                  }
                }
              ]
            );
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.resetBtnText}>🗑️</Text>
        </TouchableOpacity>

        {/* Ayarlar Butonu */}
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => setScreen('settings')}
          activeOpacity={0.7}
        >
          <Text style={styles.settingsBtnText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Kaydırılabilir İçerik */}
      <ScrollView
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ paddingBottom: normalize(40), alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >



        <View style={styles.logo}>
          <Text style={styles.logoEmoji}>🚖</Text>
          <Text style={styles.logoText}>TAKSİCİ</Text>
          <Text style={styles.logoSubtext}>İSTANBUL HİKAYELERİ</Text>
        </View>

        {/* Zaman ve Durum: Saat + Sabah/Öğle/Akşam/Gece (gündüz/gece anlaşılır olsun) */}
        <View style={styles.timeBar}>
          <View style={styles.timeItem}>
            <Text style={styles.timeEmoji}>{getTimeEmoji(manager.dayTime)}</Text>
            <Text style={styles.timeText}>{formatHour(manager.hour)}</Text>
            <Text style={styles.timeLabel}>{getTimeLabel(manager.dayTime)}</Text>
          </View>
          <View style={styles.timeItem}>
            <Text style={styles.timeEmoji}>📅</Text>
            <Text style={styles.timeText}>Gün {manager.day}</Text>
            <Text style={styles.timeLabel}>Oyun günü</Text>
          </View>
          <View style={styles.timeItem}>
            <Text style={styles.timeEmoji}>⚡</Text>
            <Text style={[styles.timeText, manager.energy <= 20 && styles.timeDanger]}>%{Math.round(manager.energy)}</Text>
          </View>
          <View style={styles.timeItem}>
            <Text style={styles.timeEmoji}>⛽</Text>
            <Text style={[styles.timeText, manager.fuel <= 20 && styles.timeDanger]}>%{Math.round(manager.fuel)}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <View style={styles.statHeaderRow}>
              <Text style={styles.statValue}>₺{gameState.money}</Text>
              <TouchableOpacity
                onPress={() => setTooltipModal({ visible: true, type: 'money' })}
                onLongPress={() => setTooltipModal({ visible: true, type: 'money' })}
                style={styles.statInfoBtn}
                activeOpacity={0.7}
              >
                <Text style={styles.statInfoText}>ℹ️</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.statLabel}>KASA</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <View style={styles.statHeaderRow}>
              <Text style={styles.statValue}>{gameState.rides}</Text>
              <TouchableOpacity
                onPress={() => setTooltipModal({ visible: true, type: 'rides' })}
                onLongPress={() => setTooltipModal({ visible: true, type: 'rides' })}
                style={styles.statInfoBtn}
                activeOpacity={0.7}
              >
                <Text style={styles.statInfoText}>ℹ️</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.statLabel}>YOLCU</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <View style={styles.statHeaderRow}>
              <Text style={[styles.statValue, { color: getReputationRank(gameState.reputation).color }]}>
                {getReputationRank(gameState.reputation).emoji} {gameState.reputation}
              </Text>
              <TouchableOpacity
                onPress={() => setTooltipModal({ visible: true, type: 'reputation' })}
                onLongPress={() => setTooltipModal({ visible: true, type: 'reputation' })}
                style={styles.statInfoBtn}
                activeOpacity={0.7}
              >
                <Text style={styles.statInfoText}>ℹ️</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.statLabel, { color: getReputationRank(gameState.reputation).color }]}>
              {getReputationRank(gameState.reputation).name.toUpperCase()}
            </Text>
            {getReputationToNextRank(gameState.reputation) !== null && (
              <View style={styles.reputationProgressContainer}>
                <View style={styles.reputationProgressBar}>
                  <View
                    style={[
                      styles.reputationProgressFill,
                      {
                        width: `${getReputationProgress(gameState.reputation)}%`,
                        backgroundColor: getReputationRank(gameState.reputation).color
                      }
                    ]}
                  />
                </View>
                <Text style={styles.reputationProgressText}>
                  {getNextRank(gameState.reputation).name}'e %{Math.round(getReputationProgress(gameState.reputation))} kaldı
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Günlük Görevler */}
        <View style={styles.chainCard}>
          <Text style={styles.chainTitle}>7 GUNLUK ZINCIR - Gun {(currentChainStep?.id || 'day_1').split('_')[1]}</Text>
          <Text style={styles.chainSubtitle}>{currentChainStep?.title}</Text>
          {chainProgress.objectives.map((objective) => (
            <View key={objective.key} style={styles.chainObjectiveRow}>
              <Text style={styles.chainObjectiveText}>
                {objective.done ? '[X]' : '[ ]'} {objective.label}
              </Text>
              <Text style={styles.chainObjectiveCount}>{objective.current}/{objective.target}</Text>
            </View>
          ))}
          <View style={styles.chainRewardRow}>
            <Text style={styles.chainRewardText}>Odul: +{currentChainStep?.reward?.money || 0} TL / +{currentChainStep?.reward?.reputation || 0} itibar</Text>
            <Text style={styles.chainRewardText}>Streak: {dailyQuests.streakDays} (En iyi: {dailyQuests.bestStreak})</Text>
          </View>
          <TouchableOpacity
            style={[styles.chainClaimBtn, !(dailyQuests.claimable && !dailyQuests.chainClaimedToday) && styles.chainClaimBtnDisabled]}
            onPress={handleClaimDailyChainReward}
            disabled={!(dailyQuests.claimable && !dailyQuests.chainClaimedToday)}
            activeOpacity={0.8}
          >
            <Text style={styles.chainClaimBtnText}>
              {dailyQuests.chainClaimedToday ? 'BUGUN TOPLANDI' : dailyQuests.claimable ? 'ODULU TOPLA' : 'HEDEFI TAMAMLA'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weeklyEventCard}>
          <Text style={styles.weeklyEventCardTitle}>{weeklyEvent.name}</Text>
          <Text style={styles.weeklyEventCardDesc}>{weeklyEvent.description}</Text>
          <Text style={styles.weeklyEventCardBonus}>Bonus: +%{weeklyEvent.bonusMoneyPct} para / +%{weeklyEvent.bonusReputationPct} pozitif itibar</Text>
        </View>

        <View style={styles.metaTreeCard}>
          <Text style={styles.metaTreeTitle}>KALICI TAKSI GELISTIRMELERI</Text>
          {Object.keys(META_UPGRADES).map((upgradeId) => {
            const upgrade = META_UPGRADES[upgradeId];
            const level = metaProgress[upgradeId] || 0;
            const cost = getUpgradeCost(upgradeId, level);
            const isMax = level >= upgrade.maxLevel;
            const canBuy = !isMax && gameState.money >= cost;
            return (
              <View key={upgradeId} style={styles.metaUpgradeRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.metaUpgradeName}>{upgrade.label} Lv.{level}/{upgrade.maxLevel}</Text>
                  <Text style={styles.metaUpgradeEffect}>{upgrade.effectLabel}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.metaUpgradeBtn, !canBuy && styles.metaUpgradeBtnDisabled]}
                  onPress={() => handlePurchaseMetaUpgrade(upgradeId)}
                  disabled={!canBuy}
                  activeOpacity={0.8}
                >
                  <Text style={styles.metaUpgradeBtnText}>{isMax ? 'MAX' : `${cost} TL`}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={styles.balanceSummaryCard}>
          <Text style={styles.balanceSummaryTitle}>HAFTALIK DENGE OZETI ({weeklySummary.weekId || '-'})</Text>
          <Text style={styles.balanceSummaryLine}>Ride: {weeklySummary.ridesCompleted} | Ortalama: {weeklySummary.avgRideMoney} TL | Polis Sonu: {weeklySummary.policeEndings}</Text>
          <Text style={styles.balanceSummaryLine}>Gorev Odulu: {weeklySummary.dailyClaims} | Upgrade: {weeklySummary.upgrades} | Replay: {weeklySummary.replayRides}</Text>
          <Text style={styles.balanceSummaryHint}>{getBalanceHint(weeklySummary)}</Text>
        </View>

        {calculateBonus() > 0 && (
          <View style={styles.bonusBadge}>
            <Text style={styles.bonusText}>+%{calculateBonus()} Bonus Aktif</Text>
          </View>
        )}

        {/* Başarılar Rozet Satırı - Sadece başarı varsa göster */}
        {Object.keys(achievements).filter(id => achievements[id]?.unlocked).length > 0 && (
          <TouchableOpacity
            style={styles.achievementsRow}
            onPress={() => setScreen('achievements')}
            activeOpacity={0.8}
          >
            <View style={styles.achievementsRowHeader}>
              <Text style={styles.achievementsTitle}>🏆 BAŞARILARIM</Text>
              <Text style={styles.achievementsCount}>
                {Object.keys(achievements).filter(id => achievements[id]?.unlocked).length}/{ACHIEVEMENTS.length}
              </Text>
            </View>
            <View style={styles.achievementBadgesRow}>
              {ACHIEVEMENTS.filter(ach => achievements[ach.id]?.unlocked)
                .slice(0, 5)
                .map(ach => (
                  <View key={ach.id} style={styles.achievementBadge}>
                    <Text style={styles.achievementEmoji}>{ach.emoji}</Text>
                  </View>
                ))}
              {Object.keys(achievements).filter(id => achievements[id]?.unlocked).length > 5 && (
                <View style={styles.achievementMoreBadge}>
                  <Text style={styles.achievementMoreText}>+{Object.keys(achievements).filter(id => achievements[id]?.unlocked).length - 5}</Text>
                </View>
              )}
            </View>
            <Text style={styles.achievementsHint}>Detaylar için dokun →</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.storyCounter}>
          {(getAvailableStories().length === 0 && getReplayStories().length === 0) ? 'Tum hikayeler tamamlandi!' : `${getAvailableStories().length} yeni + ${getReplayStories().length} replay hikaye`}
        </Text>

        {(getAvailableStories().length === 0 && getReplayStories().length === 0) ? (
          <TouchableOpacity style={[styles.startBtn, { backgroundColor: COLORS.purple }]} onPress={resetStories} activeOpacity={0.8}>
            <Text style={styles.startBtnText}>HİKAYELERİ SIFIRLA</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.ctaButtonContainer}>
            <Animated.View style={[styles.ctaGlow, { opacity: fadeAnim }]} />
            <TouchableOpacity style={styles.ctaButton} onPress={startRide} activeOpacity={0.8}>
              <LinearGradient
                colors={[COLORS.accent, '#ffd700', COLORS.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.ctaGradient}
              >
                <Text style={styles.ctaButtonText}>🚕 TAKSİDUR AÇ</Text>
                <Text style={styles.ctaButtonSub}>Yolcu seçip yeni hikayeye başla</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Alt Butonlar */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => setScreen('break')} activeOpacity={0.8}>
            <Text style={styles.secondaryBtnEmoji}>☕</Text>
            <Text style={styles.secondaryBtnText}>MOLA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => setScreen('shop')} activeOpacity={0.8}>
            <Text style={styles.secondaryBtnEmoji}>🏪</Text>
            <Text style={styles.secondaryBtnText}>MAĞAZA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => setScreen('fuel')} activeOpacity={0.8}>
            <Text style={styles.secondaryBtnEmoji}>⛽</Text>
            <Text style={styles.secondaryBtnText}>BENZİN</Text>
          </TouchableOpacity>
        </View>

        {/* TEST SÜRÜŞÜ BUTONU */}
        <TouchableOpacity
          style={{
            backgroundColor: '#1a1a24',
            width: '100%',
            marginBottom: normalize(10),
            borderColor: COLORS.accent,
            borderWidth: 2,
            borderRadius: normalize(12),
            paddingVertical: normalize(12),
            alignItems: 'center',
          }}
          onPress={() => setScreen('driving_game')}
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: normalize(24), marginBottom: normalize(4) }}>🎮</Text>
          <Text style={{ fontSize: normalize(12), color: COLORS.accent, fontWeight: 'bold' }}>TEST SÜRÜŞÜ YAP</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Her yolcu bir hikaye. Her karar bir sonuç.</Text>
      </ScrollView>

      {/* Tooltip Modal */}
      <Modal
        visible={tooltipModal.visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setTooltipModal({ visible: false, type: null })}
      >
        <TouchableOpacity
          style={styles.tooltipModalOverlay}
          activeOpacity={1}
          onPress={() => setTooltipModal({ visible: false, type: null })}
        >
          <View style={styles.tooltipModalContent}>
            <Text style={styles.tooltipTitle}>
              {tooltipModal.type === 'money' && '💰 KASA'}
              {tooltipModal.type === 'rides' && '👥 YOLCU'}
              {tooltipModal.type === 'reputation' && '⭐ İTİBAR'}
            </Text>
            <Text style={styles.tooltipText}>
              {tooltipModal.type === 'money' && 'Kasanızda biriken para miktarı. Yolcu taşıyarak ve hikayeleri tamamlayarak kazanabilirsiniz.'}
              {tooltipModal.type === 'rides' && 'Toplam taşıdığınız yolcu sayısı. Her yolcu bir hikaye ve farklı sonuçlar getirir.'}
              {tooltipModal.type === 'reputation' && 'İtibar yüksekse bazı yolcular ekstra bahşiş bırakır. İtibarınızı iyi kararlar vererek artırabilirsiniz.'}
            </Text>
            <TouchableOpacity
              style={styles.tooltipCloseBtn}
              onPress={() => setTooltipModal({ visible: false, type: null })}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipCloseText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </Animated.View >
  );

  // YOLCU EKRANI - TAM EKRAN PORTRE
  const renderPassengerScreen = () => {
    const p = gameState.currentPassenger;
    if (!p) return null;
    return (
      <Animated.View style={[styles.screen, styles.passengerScreenFull, { opacity: fadeAnim }]}>
        {/* Tam Ekran Karakter Görseli */}
        <View style={styles.portraitContainer}>
          {p.image ? (
            <Image source={p.image} style={styles.fullPortrait} resizeMode="cover" />
          ) : (
            <View style={styles.fallbackPortrait}>
              <Text style={styles.fallbackEmoji}>{p.avatar}</Text>
            </View>
          )}
          <LinearGradient
            colors={['transparent', 'rgba(10,10,15,0.95)']}
            style={styles.portraitOverlay}
            pointerEvents="none"
          />
        </View>

        {/* Alt Bilgi Kartı */}
        <View style={styles.passengerInfoCard}>
          <View style={styles.passengerBadge}>
            <Text style={styles.badgeLocation}>📍 {p.location}</Text>
            <Text style={styles.badgeTime}>🕐 {p.time}</Text>
          </View>
          <Text style={styles.passengerNameLarge}>{p.name}</Text>
          <Text style={styles.passengerIntroText}>{p.intro}</Text>
          <TouchableOpacity style={styles.acceptBtnLarge} onPress={acceptPassenger} activeOpacity={0.8}>
            <Text style={styles.acceptBtnTextLarge}>YOLCUYU AL</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  // DİYALOG EKRANI - TAM EKRAN PORTRE İLE
  const renderDialogueScreen = () => {
    const p = gameState.currentPassenger;
    if (!p) return null;
    const dialogue = p.dialogue[gameState.dialogueIndex];
    return (
      <Animated.View style={[styles.screen, styles.dialogueScreenFull, { opacity: fadeAnim }]}>
        {/* Arka Plan Portre */}
        <View style={styles.dialoguePortraitBg}>
          {p.image ? (
            <Image source={p.image} style={styles.dialoguePortraitImage} resizeMode="cover" blurRadius={2} />
          ) : null}
          <View style={styles.dialoguePortraitOverlay} />
        </View>

        {/* Üst: Taksimetre ve Karakter */}
        <View style={styles.dialogueTopBar}>
          <TaxiInterior
            equipped={equippedItems}
            taximeterAmount={taximeterAmount}
          />
        </View>

        {/* Karakter Küçük Portre */}
        <View style={styles.dialogueCharacterRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {p.image ? (
              <Image source={p.image} style={styles.dialogueCharacterSmall} resizeMode="cover" />
            ) : (
              <Text style={styles.dialogueAvatarSmall}>{p.avatar}</Text>
            )}
            <Text style={styles.dialogueCharacterName}>{p.name}</Text>
          </View>

          {/* Geçmiş Butonu - Buraya Taşındı */}
          {dialogueHistory.length > 0 && (
            <TouchableOpacity
              style={styles.historyBtn}
              onPress={() => setShowHistoryModal(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.historyBtnText}>📜 Geçmiş</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Diyalog Kutusu */}
        <View style={[styles.dialogueBox, getDialogueBoxStyle()]}>
          <ScrollView
            style={styles.dialogueScroll}
            showsVerticalScrollIndicator={false}
            onTouchStart={canSkipTyping && isTyping ? skipTypewriter : undefined}
          >
            <Text style={[
              styles.dialogueTextNew,
              {
                fontSize: normalizeFont(16 * fontSizeMultiplier),
                lineHeight: normalizeFont(28 * fontSizeMultiplier),
                color: getTextColor(),
              }
            ]}>
              {isThinking ? "..." : (isTyping && displayedText ? displayedText : (dialogue?.text || "..."))}
              {isTyping && canSkipTyping && (
                <Text style={[styles.skipHint, { fontSize: normalizeFont(12 * fontSizeMultiplier) }]}> (Dokunarak hızlandır)</Text>
              )}
            </Text>
          </ScrollView>
        </View>

        {/* Seçenekler */}
        <View style={styles.choicesContainerNew}>
          {isThinking ? (
            <View style={styles.thinkingContainer}>
              <Text style={styles.thinkingText}>...</Text>
            </View>
          ) : (
            <>
              {dialogue?.choices?.map((choice, index) => {
                // Seçenek ipuçlarını analiz et
                const hints = analyzeChoiceHints(choice, dialogue);

                return (
                  <Animated.View
                    key={index}
                    style={{
                      opacity: choicesAnim,
                      transform: [{
                        translateY: choicesAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0]
                        })
                      }]
                    }}
                  >
                    <TouchableOpacity
                      style={styles.choiceBtnPlayer}
                      onPress={() => handleChoice(choice.next, choice.ending)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.choiceContent}>
                        <Text style={styles.choiceTextPlayer}>{choice.text}</Text>
                        {hints.length > 0 && (
                          <View style={styles.choiceHints}>
                            {hints.map((hint, idx) => (
                              <Text key={idx} style={styles.choiceHintIcon}>{hint}</Text>
                            ))}
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}

              {dialogue?.ending && (
                <Animated.View
                  style={{
                    opacity: choicesAnim,
                    transform: [{
                      translateY: choicesAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0]
                      })
                    }]
                  }}
                >
                  <TouchableOpacity style={[styles.choiceBtnNew, styles.endingBtn]} onPress={() => handleChoice(null, dialogue.ending)} activeOpacity={0.8}>
                    <Text style={[styles.choiceTextNew, { color: '#000', fontWeight: 'bold' }]}>HİKAYEYİ BİTİR 🏁</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </>
          )}
        </View>

        {/* Geçmiş Modal */}
        <Modal
          visible={showHistoryModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowHistoryModal(false)}
        >
          <TouchableOpacity
            style={styles.historyModalOverlay}
            activeOpacity={1}
            onPress={() => setShowHistoryModal(false)}
          >
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.historyModalContent}>
                <View style={styles.historyModalHeader}>
                  <Text style={styles.historyModalTitle}>📜 Diyalog Geçmişi</Text>
                  <TouchableOpacity
                    onPress={() => setShowHistoryModal(false)}
                    style={styles.historyModalCloseBtn}
                  >
                    <Text style={styles.historyModalCloseText}>✕</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.historyScroll} showsVerticalScrollIndicator={false}>
                  <View onStartShouldSetResponder={() => true}>
                    {dialogueHistory.map((item, idx) => (
                      <View
                        key={idx}
                        style={[
                          styles.historyItem,
                          item.type === 'player' && styles.historyItemPlayer
                        ]}
                      >
                        <Text style={styles.historySpeaker}>{item.speaker}:</Text>
                        <Text style={[
                          styles.historyText,
                          item.type === 'player' && styles.historyTextPlayer
                        ]}>
                          {item.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </Animated.View>
    );
  };

  // Seçenek ipuçlarını analiz et
  const analyzeChoiceHints = (choice, dialogue) => {
    const hints = [];
    const text = choice.text.toLowerCase();

    // Para ipuçları
    if (text.includes('para') || text.includes('ücret') || text.includes('ödeme') || text.includes('bahşiş')) {
      hints.push('💸');
    }

    // İtibar ipuçları
    if (text.includes('kaba') || text.includes('kırgın') || text.includes('üzgün') || text.includes('kızgın')) {
      hints.push('💔');
    }

    // Riskli karar ipuçları
    if (text.includes('risk') || text.includes('tehlikeli') || text.includes('polis') || text.includes('kaç') || text.includes('yasa dışı')) {
      hints.push('⚖️');
    }

    // İyi karar ipuçları
    if (text.includes('yardım') || text.includes('iyilik') || text.includes('şefkat') || text.includes('merhamet')) {
      hints.push('✨');
    }

    return hints;
  };

  // BİTİŞ EKRANI
  const renderEndingScreen = () => {
    if (!currentEnding) return null;
    const bonus = typeof currentEnding.appliedBonusPct === 'number'
      ? currentEnding.appliedBonusPct
      : calculateBonus();
    const endingMoneyDisplay = typeof currentEnding.appliedMoney === 'number'
      ? currentEnding.appliedMoney
      : Math.round((currentEnding.money || 0) * (1 + bonus / 100));
    const endingReputationDisplay = typeof currentEnding.appliedReputation === 'number'
      ? currentEnding.appliedReputation
      : Math.round((currentEnding.reputation || 0) * (1 + bonus / 100));

    let endingIcon = '🏁';
    let endingColor = COLORS.text;
    let bgStyle = {};

    switch (currentEnding.type) {
      case 'police':
        endingIcon = '👮‍♂️'; endingColor = '#3b82f6'; bgStyle = { backgroundColor: '#1e293b' };
        break;
      case 'court':
        endingIcon = '⚖️'; endingColor = '#fbbf24'; bgStyle = { backgroundColor: '#292524' };
        break;
      case 'hospital':
        endingIcon = '🏥'; endingColor = '#ef4444'; bgStyle = { backgroundColor: '#3f0f0f' };
        break;
      default:
        endingIcon = '🏁';
    }

    return (
      <Animated.View style={[styles.screen, styles.endingScreen, bgStyle, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <ScrollView contentContainerStyle={styles.endingScrollContent} showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.endingIcon, { fontSize: 80, marginBottom: 20 }]}>{endingIcon}</Text>
            <Text style={[styles.endingTitle, { color: endingColor }]}>
              {currentEnding.type === 'police' ? 'KARAKOL' :
                currentEnding.type === 'court' ? 'ADLİYE' :
                  currentEnding.type === 'hospital' ? 'HASTANE' : 'HİKAYE SONU'}
            </Text>
            <Text style={styles.endingText}>{currentEnding.text}</Text>

            <View style={styles.endingStatsCard}>
              <Text style={styles.statsHeader}>OPERA RAPORU</Text>
              <View style={styles.endingStats}>
                <View style={styles.endingStat}>
                  <Text style={styles.endingStatValue}>
                    {endingMoneyDisplay >= 0 ? '+' : ''}₺{Math.round(endingMoneyDisplay)}
                  </Text>
                  <Text style={styles.endingStatLabel}>KAZANÇ</Text>
                </View>
                <View style={styles.statDividerVertical} />
                <View style={styles.endingStat}>
                  <Text style={[styles.endingStatValue, { color: endingReputationDisplay >= 0 ? COLORS.success : COLORS.danger }]}>
                    {endingReputationDisplay >= 0 ? '+' : ''}{Math.round(endingReputationDisplay)}
                  </Text>
                  <Text style={styles.endingStatLabel}>İTİBAR</Text>
                </View>
              </View>
              {bonus > 0 && <Text style={styles.bonusApplied}>+{bonus}% Ekipman Bonusu</Text>}
            </View>

            {/* Günlük Görev İlerlemesi */}
            <View style={styles.dailyQuestsProgressCard}>
              <Text style={styles.dailyQuestsProgressTitle}>📋 GÜNLÜK GÖREV İLERLEMESİ</Text>
              <View style={styles.questProgressItem}>
                <Text style={styles.questProgressText}>
                  {dailyQuests.ridesToday >= 5 ? '✅' : '⭕'} Bugün 5 yolcu taşı
                </Text>
                <View style={styles.questProgressBar}>
                  <View style={[styles.questProgressFill, { width: `${Math.min(100, (dailyQuests.ridesToday / 5) * 100)}%` }]} />
                </View>
                <Text style={styles.questProgressCount}>{dailyQuests.ridesToday}/5</Text>
              </View>
              <View style={styles.questProgressItem}>
                <Text style={styles.questProgressText}>
                  {dailyQuests.nightRides >= 3 ? '✅' : '⭕'} Gece 3 yolculuk yap
                </Text>
                <View style={styles.questProgressBar}>
                  <View style={[styles.questProgressFill, { width: `${Math.min(100, (dailyQuests.nightRides / 3) * 100)}%` }]} />
                </View>
                <Text style={styles.questProgressCount}>{dailyQuests.nightRides}/3</Text>
              </View>
              <View style={styles.questProgressItem}>
                <Text style={styles.questProgressText}>
                  {dailyQuests.policeFreeRides >= 10 ? '✅' : '⭕'} Polissiz 10 sefer
                </Text>
                <View style={styles.questProgressBar}>
                  <View style={[styles.questProgressFill, { width: `${Math.min(100, (dailyQuests.policeFreeRides / 10) * 100)}%` }]} />
                </View>
                <Text style={styles.questProgressCount}>{dailyQuests.policeFreeRides}/10</Text>
              </View>
            </View>

            <View style={styles.chainEndingCard}>
              <Text style={styles.chainEndingTitle}>7 GUNLUK ZINCIR DURUMU</Text>
              <Text style={styles.chainEndingLine}>
                Gun {(currentChainStep?.id || 'day_1').split('_')[1]}: {currentChainStep?.title}
              </Text>
              <Text style={styles.chainEndingLine}>
                Streak: {dailyQuests.streakDays} | Bugun odul: {dailyQuests.chainClaimedToday ? 'Toplandi' : dailyQuests.claimable ? 'Hazir' : 'Devam ediyor'}
              </Text>
            </View>

            <TouchableOpacity style={[styles.continueBtn, { backgroundColor: endingColor }]} onPress={continueGame} activeOpacity={0.8}>
              <Text style={[styles.continueBtnText, { color: '#000' }]}>
                {currentEnding.type === 'normal' ? 'DEVAM ET' : 'YENİ HİKAYE'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    );
  };

  // MINI OYUN EKRANI
  if (screen === 'driving_game') {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <DrivingGame
          onComplete={(success) => {
            if (!success) {
              triggerAccident(settings.vibrationEnabled);
            }
            handleMiniGameResult(success);
          }}
          difficulty={gameState.currentPassenger?.id === 20 ? 'hard' : 'normal'}
          dayTime={manager.dayTime}
          passengerName={gameState.currentPassenger?.name || ''}
          effectVolume={settings.effectVolume ?? 0.7}
          vibrationEnabled={settings.vibrationEnabled ?? true}
        />
      </View>
    );
  }

  // TAKSİDUR EKRANI
  if (screen === 'taksidur') {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <TaksiDurApp
          completedStories={completedStories}
          onSelectPassenger={handleSelectPassenger}
          onClose={() => setScreen('menu')}
          dayTime={manager.dayTime}
          hour={manager.hour}
          weeklyEvent={weeklyEvent}
          allowReplay={true}
          lastTaxiLocation={lastLocation}
          onTaximeterIncrease={handleTaximeterIncrease}
        />
      </View>
    );
  }

  // DİNLENME EKRANI
  if (screen === 'rest') {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <RestScreen
          energy={manager.energy}
          onRest={handleRest}
          onClose={() => setScreen('menu')}
        />
      </View>
    );
  }

  // BENZİN EKRANI
  if (screen === 'fuel') {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <FuelScreen
          fuel={manager.fuel}
          money={gameState.money}
          onRefuel={handleRefuel}
          onClose={() => setScreen('menu')}
        />
      </View>
    );
  }

  // MOLA EKRANI
  if (screen === 'break') {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <BreakScreen
          energy={manager.energy}
          money={gameState.money}
          onBreak={handleBreak}
          onClose={() => setScreen('menu')}
        />
      </View>
    );
  }

  // MAĞAZA EKRANI
  if (screen === 'shop') {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <ShopScreen
          money={gameState.money}
          ownedItems={ownedItems}
          equippedItems={equippedItems}
          onBuy={handleBuy}
          onEquip={handleEquip}
          onClose={() => setScreen('menu')}
        />
      </View>
    );
  }

  // AYARLAR EKRANI
  if (screen === 'settings') {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <SettingsScreen
          onClose={() => setScreen('menu')}
          onSettingsChange={(newSettings) => {
            setSettings(newSettings);
            // Ses seviyelerini güncelle
            if (rainSound) rainSound.setVolumeAsync(newSettings.musicVolume * 0.3);
            if (trafficSound) trafficSound.setVolumeAsync(newSettings.effectVolume * 0.15);
            if (citySound) citySound.setVolumeAsync(newSettings.effectVolume * 0.12);
          }}
        />
      </View>
    );
  }

  // BAŞARILAR EKRANI
  if (screen === 'achievements') {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: COLORS.bg }]}>
        <View style={styles.screen}>
          {/* Header */}
          <View style={styles.achievementsHeader}>
            <TouchableOpacity
              style={styles.achievementsBackBtn}
              onPress={() => setScreen('menu')}
              activeOpacity={0.7}
            >
              <Text style={styles.achievementsBackText}>← GERİ</Text>
            </TouchableOpacity>
            <Text style={styles.achievementsHeaderTitle}>🏆 BAŞARILAR</Text>
            <View style={{ width: normalize(60) }} />
          </View>

          {/* Liste */}
          <ScrollView
            style={styles.achievementsScroll}
            contentContainerStyle={styles.achievementsContent}
            showsVerticalScrollIndicator={false}
          >
            {ACHIEVEMENTS.map(achievement => {
              const isUnlocked = achievements[achievement.id]?.unlocked;
              return (
                <View
                  key={achievement.id}
                  style={[
                    styles.achievementCard,
                    isUnlocked ? styles.achievementCardUnlocked : styles.achievementCardLocked,
                  ]}
                >
                  <View style={styles.achievementCardLeft}>
                    <Text style={[styles.achievementCardEmoji, !isUnlocked && styles.achievementCardEmojiLocked]}>
                      {isUnlocked ? achievement.emoji : '🔒'}
                    </Text>
                  </View>
                  <View style={styles.achievementCardRight}>
                    <Text style={[styles.achievementCardName, !isUnlocked && styles.achievementCardNameLocked]}>
                      {achievement.name}
                    </Text>
                    <Text style={[styles.achievementCardDesc, !isUnlocked && styles.achievementCardDescLocked]}>
                      {achievement.description}
                    </Text>
                    {isUnlocked && achievements[achievement.id]?.unlockedAt && (
                      <Text style={styles.achievementCardDate}>
                        {new Date(achievements[achievement.id].unlockedAt).toLocaleDateString('tr-TR')}
                      </Text>
                    )}
                  </View>
                  {isUnlocked && (
                    <View style={styles.achievementCheckmark}>
                      <Text style={styles.achievementCheckmarkText}>✓</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>

          {/* Footer */}
          <View style={styles.achievementsFooter}>
            <Text style={styles.achievementsFooterText}>
              {Object.keys(achievements).filter(id => achievements[id]?.unlocked).length} / {ACHIEVEMENTS.length} Başarı Kazanıldı
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.bgGradient} />
      <RainEffect isRaining={isRaining} />
      {screen === 'menu' && renderMenuScreen()}
      {screen === 'passenger' && renderPassengerScreen()}
      {screen === 'dialogue' && renderDialogueScreen()}
      {screen === 'ending' && renderEndingScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  bgGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: COLORS.bg },
  screen: { flex: 1, padding: normalize(24) },
  rainContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' },
  rainDrop: { position: 'absolute', width: 2, height: normalize(20), backgroundColor: COLORS.textDim, borderRadius: 1 },

  menuScreen: { justifyContent: 'center', alignItems: 'center' },
  logo: { alignItems: 'center', marginBottom: normalize(24) },
  logoEmoji: { fontSize: normalize(64), marginBottom: normalize(12) },
  logoText: { fontSize: normalize(42), fontWeight: '700', color: COLORS.accent, letterSpacing: normalize(6) },
  logoSubtext: { fontSize: normalize(11), color: COLORS.textDim, letterSpacing: normalize(4), marginTop: normalize(6) },

  // Üst Butonlar Row
  topButtonsRow: {
    position: 'absolute',
    top: normalize(16),
    right: normalize(16),
    flexDirection: 'row',
    gap: normalize(10),
    zIndex: 10,
  },
  // Ayarlar Butonu
  settingsBtn: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  settingsBtnText: {
    fontSize: normalize(22),
  },
  // Sıfırlama Butonu (Kırmızı Çerçeve)
  resetBtn: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.danger,
  },
  resetBtnText: {
    fontSize: normalize(20),
  },

  // YENİ: Zaman Bar
  timeBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: normalize(12),
    padding: normalize(12),
    marginBottom: normalize(16),
    width: '100%',
    justifyContent: 'space-around',
  },
  timeItem: { alignItems: 'center' },
  timeEmoji: { fontSize: normalize(18), marginBottom: normalize(2) },
  timeText: { fontSize: normalize(12), color: COLORS.text, fontWeight: '600' },
  timeLabel: { fontSize: normalize(9), color: COLORS.textDim, marginTop: normalize(2), textTransform: 'uppercase', letterSpacing: 0.5 },
  timeDanger: { color: COLORS.danger },

  statsContainer: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: normalize(16), padding: normalize(18), marginBottom: normalize(12), width: '100%' },
  statBox: { flex: 1, alignItems: 'center' },
  statHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: normalize(4) },
  statValue: { fontSize: normalize(20), fontWeight: '700', color: COLORS.text },
  statLabel: { fontSize: normalize(9), color: COLORS.textDim, marginTop: normalize(4), letterSpacing: 1 },
  statInfoBtn: { padding: normalize(4) },
  statInfoText: { fontSize: normalize(12), color: COLORS.textDim, opacity: 0.7 },
  nextRankText: { fontSize: normalize(8), color: COLORS.textDim, marginTop: normalize(2), fontStyle: 'italic' },
  statDivider: { width: 1, backgroundColor: COLORS.cardLight, marginHorizontal: normalize(8) },
  reputationProgressContainer: { width: '100%', marginTop: normalize(6) },
  reputationProgressBar: { height: normalize(4), backgroundColor: COLORS.cardLight, borderRadius: normalize(2), overflow: 'hidden', marginBottom: normalize(4) },
  reputationProgressFill: { height: '100%', borderRadius: normalize(2) },
  reputationProgressText: { fontSize: normalize(7), color: COLORS.textDim, textAlign: 'center', fontStyle: 'italic' },
  bonusBadge: { backgroundColor: COLORS.success, paddingHorizontal: normalize(16), paddingVertical: normalize(6), borderRadius: normalize(20), marginBottom: normalize(8) },
  bonusText: { color: COLORS.bg, fontWeight: 'bold', fontSize: normalize(12) },

  // Günlük Görevler
  chainCard: {
    backgroundColor: COLORS.card,
    borderRadius: normalize(12),
    padding: normalize(12),
    marginBottom: normalize(12),
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  chainTitle: {
    fontSize: normalize(12),
    color: COLORS.accent,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: normalize(4),
  },
  chainSubtitle: {
    fontSize: normalize(11),
    color: COLORS.text,
    marginBottom: normalize(8),
    fontWeight: '600',
  },
  chainObjectiveRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(6),
  },
  chainObjectiveText: {
    fontSize: normalize(10),
    color: COLORS.text,
    flex: 1,
    marginRight: normalize(8),
  },
  chainObjectiveCount: {
    fontSize: normalize(10),
    color: COLORS.textDim,
    fontWeight: '700',
  },
  chainRewardRow: {
    marginTop: normalize(4),
    marginBottom: normalize(8),
  },
  chainRewardText: {
    fontSize: normalize(10),
    color: COLORS.textDim,
    marginBottom: normalize(2),
  },
  chainClaimBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: normalize(10),
    borderRadius: normalize(10),
    alignItems: 'center',
  },
  chainClaimBtnDisabled: {
    backgroundColor: COLORS.cardLight,
  },
  chainClaimBtnText: {
    fontSize: normalize(10),
    color: COLORS.bg,
    fontWeight: '700',
    letterSpacing: 1,
  },
  weeklyEventCard: {
    backgroundColor: '#163033',
    borderRadius: normalize(12),
    padding: normalize(12),
    marginBottom: normalize(12),
    width: '100%',
    borderWidth: 1,
    borderColor: '#2a5a60',
  },
  weeklyEventCardTitle: {
    fontSize: normalize(12),
    color: COLORS.success,
    fontWeight: '700',
    marginBottom: normalize(4),
  },
  weeklyEventCardDesc: {
    fontSize: normalize(10),
    color: COLORS.text,
    marginBottom: normalize(6),
  },
  weeklyEventCardBonus: {
    fontSize: normalize(10),
    color: COLORS.accent,
    fontWeight: '600',
  },
  metaTreeCard: {
    backgroundColor: COLORS.card,
    borderRadius: normalize(12),
    padding: normalize(12),
    marginBottom: normalize(12),
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  metaTreeTitle: {
    fontSize: normalize(11),
    color: COLORS.accent,
    fontWeight: '700',
    marginBottom: normalize(8),
    letterSpacing: 1,
  },
  metaUpgradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(8),
    gap: normalize(8),
  },
  metaUpgradeName: {
    fontSize: normalize(11),
    color: COLORS.text,
    fontWeight: '600',
  },
  metaUpgradeEffect: {
    fontSize: normalize(9),
    color: COLORS.textDim,
    marginTop: normalize(2),
  },
  metaUpgradeBtn: {
    backgroundColor: COLORS.success,
    borderRadius: normalize(8),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(8),
    minWidth: normalize(74),
    alignItems: 'center',
  },
  metaUpgradeBtnDisabled: {
    backgroundColor: COLORS.cardLight,
  },
  metaUpgradeBtnText: {
    fontSize: normalize(10),
    color: COLORS.bg,
    fontWeight: '700',
  },
  balanceSummaryCard: {
    backgroundColor: 'rgba(157, 78, 221, 0.12)',
    borderRadius: normalize(12),
    padding: normalize(12),
    marginBottom: normalize(12),
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(157, 78, 221, 0.45)',
  },
  balanceSummaryTitle: {
    fontSize: normalize(11),
    color: COLORS.purple,
    fontWeight: '700',
    marginBottom: normalize(6),
  },
  balanceSummaryLine: {
    fontSize: normalize(10),
    color: COLORS.text,
    marginBottom: normalize(4),
  },
  balanceSummaryHint: {
    fontSize: normalize(10),
    color: COLORS.textDim,
    fontStyle: 'italic',
  },
  chainEndingCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: normalize(12),
    padding: normalize(12),
    width: '100%',
    marginBottom: normalize(18),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  chainEndingTitle: {
    color: COLORS.accent,
    fontSize: normalize(11),
    fontWeight: '700',
    marginBottom: normalize(6),
    textAlign: 'center',
    letterSpacing: 1,
  },
  chainEndingLine: {
    color: COLORS.text,
    fontSize: normalize(10),
    textAlign: 'center',
    marginBottom: normalize(4),
  },
  dailyQuestsContainer: {
    backgroundColor: COLORS.card,
    borderRadius: normalize(12),
    padding: normalize(12),
    marginBottom: normalize(12),
    width: '100%',
  },
  dailyQuestsTitle: {
    fontSize: normalize(11),
    color: COLORS.accent,
    fontWeight: '700',
    marginBottom: normalize(8),
    letterSpacing: 1,
  },
  questItem: {
    marginBottom: normalize(6),
  },
  questText: {
    fontSize: normalize(11),
    color: COLORS.text,
    lineHeight: normalize(16),
  },
  // Başarılar Rozet Satırı Stilleri
  achievementsRow: {
    backgroundColor: COLORS.card,
    borderRadius: normalize(12),
    padding: normalize(12),
    marginBottom: normalize(12),
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  achievementsRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  achievementsTitle: {
    fontSize: normalize(12),
    color: COLORS.accent,
    fontWeight: '700',
  },
  achievementsCount: {
    fontSize: normalize(11),
    color: COLORS.textDim,
    fontWeight: '600',
  },
  achievementBadgesRow: {
    flexDirection: 'row',
    gap: normalize(8),
    marginBottom: normalize(8),
  },
  achievementBadge: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: COLORS.cardLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementEmoji: {
    fontSize: normalize(18),
  },
  achievementMoreBadge: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementMoreText: {
    fontSize: normalize(12),
    color: COLORS.bg,
    fontWeight: '700',
  },
  achievementsHint: {
    fontSize: normalize(10),
    color: COLORS.textDim,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Başarılar EKRANI stilleri (sayfa)
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(20),
    paddingBottom: normalize(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardLight,
  },
  achievementsBackBtn: {
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(12),
  },
  achievementsBackText: {
    fontSize: normalize(14),
    color: COLORS.accent,
    fontWeight: '600',
  },
  achievementsHeaderTitle: {
    fontSize: normalize(20),
    fontWeight: '700',
    color: COLORS.text,
  },
  achievementsScroll: {
    flex: 1,
  },
  achievementsContent: {
    paddingBottom: normalize(20),
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(16),
    borderRadius: normalize(12),
    marginBottom: normalize(12),
    borderWidth: 1,
  },
  achievementCardUnlocked: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.accent,
  },
  achievementCardLocked: {
    backgroundColor: 'rgba(26, 26, 36, 0.5)',
    borderColor: COLORS.cardLight,
  },
  achievementCardLeft: {
    marginRight: normalize(16),
  },
  achievementCardEmoji: {
    fontSize: normalize(32),
  },
  achievementCardEmojiLocked: {
    opacity: 0.5,
  },
  achievementCardRight: {
    flex: 1,
  },
  achievementCardName: {
    fontSize: normalize(16),
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: normalize(4),
  },
  achievementCardNameLocked: {
    color: COLORS.textDim,
  },
  achievementCardDesc: {
    fontSize: normalize(12),
    color: COLORS.textDim,
    lineHeight: normalize(18),
  },
  achievementCardDescLocked: {
    opacity: 0.7,
  },
  achievementCardDate: {
    fontSize: normalize(10),
    color: COLORS.accent,
    marginTop: normalize(6),
    fontStyle: 'italic',
  },
  achievementCheckmark: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(14),
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: normalize(12),
  },
  achievementCheckmarkText: {
    fontSize: normalize(16),
    color: COLORS.bg,
    fontWeight: '700',
  },
  achievementsFooter: {
    paddingVertical: normalize(16),
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.cardLight,
  },
  achievementsFooterText: {
    fontSize: normalize(14),
    color: COLORS.textDim,
    fontWeight: '600',
  },
  storyCounter: { color: COLORS.accent, fontSize: normalize(13), marginBottom: normalize(12), fontWeight: '600' },
  startBtn: { backgroundColor: COLORS.accent, paddingVertical: normalize(18), paddingHorizontal: normalize(40), borderRadius: normalize(14), width: '100%', alignItems: 'center', marginBottom: normalize(16) },
  startBtnText: { fontSize: normalize(16), fontWeight: '700', color: COLORS.bg, letterSpacing: 1 },
  startBtnSub: { fontSize: normalize(10), color: COLORS.bg, opacity: 0.7, marginTop: normalize(4) },
  // CTA Button with Gradient and Glow
  ctaButtonContainer: { width: '100%', marginBottom: normalize(16), position: 'relative' },
  ctaGlow: {
    position: 'absolute',
    top: normalize(-4),
    left: normalize(-4),
    right: normalize(-4),
    bottom: normalize(-4),
    borderRadius: normalize(18),
    backgroundColor: COLORS.accent,
    opacity: 0.3,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: normalize(15),
    elevation: 10,
  },
  ctaButton: { borderRadius: normalize(14), overflow: 'hidden', width: '100%' },
  ctaGradient: { paddingVertical: normalize(20), paddingHorizontal: normalize(40), alignItems: 'center', borderRadius: normalize(14) },
  ctaButtonText: { fontSize: normalize(18), fontWeight: '700', color: COLORS.bg, letterSpacing: 1, marginBottom: normalize(4) },
  ctaButtonSub: { fontSize: normalize(11), color: COLORS.bg, opacity: 0.9, fontWeight: '500' },
  // Tooltip Modal
  tooltipModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: normalize(24) },
  tooltipModalContent: { backgroundColor: COLORS.card, borderRadius: normalize(16), padding: normalize(24), width: '100%', maxWidth: normalize(320), borderWidth: 1, borderColor: COLORS.cardLight },
  tooltipTitle: { fontSize: normalize(18), fontWeight: '700', color: COLORS.accent, marginBottom: normalize(12), textAlign: 'center' },
  tooltipText: { fontSize: normalize(14), color: COLORS.text, lineHeight: normalize(22), textAlign: 'center', marginBottom: normalize(20) },
  tooltipCloseBtn: { backgroundColor: COLORS.accent, paddingVertical: normalize(12), borderRadius: normalize(8), alignItems: 'center' },
  tooltipCloseText: { fontSize: normalize(14), fontWeight: '700', color: COLORS.bg, letterSpacing: 1 },

  // Alt butonlar
  bottomButtons: { flexDirection: 'row', gap: normalize(12), marginBottom: normalize(16) },
  secondaryBtn: { flex: 1, backgroundColor: COLORS.card, paddingVertical: normalize(12), borderRadius: normalize(12), alignItems: 'center', borderWidth: 1, borderColor: COLORS.cardLight },
  secondaryBtnEmoji: { fontSize: normalize(20), marginBottom: normalize(4) },
  secondaryBtnText: { fontSize: normalize(10), fontWeight: '600', color: COLORS.textDim, letterSpacing: 1 },

  footerText: { color: COLORS.textDim, fontSize: normalize(12), marginTop: normalize(8), fontStyle: 'italic' },

  // YENİ: Tam Ekran Yolcu Ekranı
  passengerScreenFull: { padding: 0 },
  portraitContainer: { flex: 1, position: 'relative' },
  fullPortrait: { width: '100%', height: '100%' },
  fallbackPortrait: { flex: 1, backgroundColor: COLORS.card, justifyContent: 'center', alignItems: 'center' },
  fallbackEmoji: { fontSize: normalize(120) },
  portraitOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%' },
  passengerInfoCard: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(10,10,15,0.95)', padding: normalize(24), borderTopLeftRadius: normalize(24), borderTopRightRadius: normalize(24) },
  passengerBadge: { flexDirection: 'row', gap: normalize(16), marginBottom: normalize(12) },
  badgeLocation: { color: COLORS.textDim, fontSize: normalize(13) },
  badgeTime: { color: COLORS.accent, fontSize: normalize(13) },
  passengerNameLarge: { fontSize: normalize(28), fontWeight: '700', color: COLORS.text, marginBottom: normalize(12) },
  passengerIntroText: { fontSize: normalize(15), lineHeight: normalize(24), color: COLORS.text, marginBottom: normalize(20) },
  acceptBtnLarge: { backgroundColor: COLORS.success, padding: normalize(18), borderRadius: normalize(14), alignItems: 'center' },
  acceptBtnTextLarge: { fontSize: normalize(16), fontWeight: '700', color: COLORS.bg, letterSpacing: 1 },

  // YENİ: Diyalog Ekranı Tam Ekran
  dialogueScreenFull: { padding: 0 },
  dialoguePortraitBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  dialoguePortraitImage: { width: '100%', height: '100%', opacity: 0.3 },
  dialoguePortraitOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(10,10,15,0.55)' },
  dialogueCharacterRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: normalize(20), paddingVertical: normalize(12) },
  dialogueCharacterSmall: { width: normalize(50), height: normalize(50), borderRadius: normalize(25), borderWidth: 2, borderColor: COLORS.accent, marginRight: normalize(12) },
  dialogueAvatarSmall: { fontSize: normalize(36), marginRight: normalize(12) },
  dialogueCharacterName: { fontSize: normalize(18), fontWeight: '600', color: COLORS.text },
  dialogueBox: { flex: 1, marginHorizontal: normalize(16), marginBottom: normalize(12), backgroundColor: 'rgba(26,26,36,0.9)', borderRadius: normalize(16), padding: normalize(20), position: 'relative' },
  dialogueScroll: { flex: 1 },
  dialogueTextNew: { fontSize: normalize(16), lineHeight: normalize(28), color: COLORS.text },
  skipHint: { fontSize: normalize(12), color: COLORS.textDim, fontStyle: 'italic' },
  // Geçmiş Butonu
  historyBtn: {
    position: 'absolute',
    top: normalize(8),
    right: normalize(8),
    backgroundColor: 'rgba(255, 200, 87, 0.2)',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: 'rgba(255, 200, 87, 0.3)',
    zIndex: 10,
  },
  historyBtnText: {
    fontSize: normalize(11),
    color: COLORS.accent,
    fontWeight: '600',
  },
  choicesContainerNew: { paddingHorizontal: normalize(16), paddingBottom: normalize(24), gap: normalize(10) },
  choiceBtnNew: { backgroundColor: COLORS.cardLight, borderRadius: normalize(12), padding: normalize(16), borderWidth: 1, borderColor: COLORS.card },
  choiceTextNew: { fontSize: normalize(14), color: COLORS.text, lineHeight: normalize(20) },
  // Oyuncu Seçenek Butonu (Farklı Renk)
  choiceBtnPlayer: {
    backgroundColor: COLORS.accent,
    borderRadius: normalize(12),
    padding: normalize(16),
    borderWidth: 1,
    borderColor: COLORS.accent,
    opacity: 0.9,
  },
  choiceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  choiceTextPlayer: { fontSize: normalize(14), color: COLORS.bg, lineHeight: normalize(20), fontWeight: '600', flex: 1 },
  choiceHints: {
    flexDirection: 'row',
    gap: normalize(4),
    marginLeft: normalize(8),
  },
  choiceHintIcon: {
    fontSize: normalize(16),
  },
  endingBtn: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  // Geçmiş Modal
  historyModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(24),
  },
  historyModalContent: {
    backgroundColor: COLORS.card,
    borderRadius: normalize(16),
    padding: normalize(20),
    width: '100%',
    maxWidth: normalize(400),
    maxHeight: '80%', // Yüzdelik yükseklik
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  historyModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(16),
    paddingBottom: normalize(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardLight,
  },
  historyModalTitle: {
    fontSize: normalize(18),
    fontWeight: '700',
    color: COLORS.accent,
  },
  historyModalCloseBtn: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    backgroundColor: COLORS.cardLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyModalCloseText: {
    fontSize: normalize(18),
    color: COLORS.textDim,
  },
  historyScroll: {
    // maxHeight kaldırıldı, parent (modalContent) yüksekliğine uyacak
  },
  historyItem: {
    marginBottom: normalize(16),
    padding: normalize(12),
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: normalize(10),
  },
  historyItemPlayer: {
    backgroundColor: 'rgba(255, 200, 87, 0.15)',
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  historySpeaker: {
    fontSize: normalize(12),
    fontWeight: '700',
    color: COLORS.accent,
    marginBottom: normalize(4),
  },
  historyText: {
    fontSize: normalize(14),
    color: COLORS.text,
    lineHeight: normalize(20),
  },
  historyTextPlayer: {
    color: COLORS.bg,
    fontWeight: '500',
  },
  thinkingContainer: { padding: normalize(20), alignItems: 'center', justifyContent: 'center' },
  thinkingText: { color: COLORS.textDim, fontSize: normalize(24), fontWeight: 'bold', letterSpacing: 2 },

  // Bitiş Ekranı
  endingScreen: {},
  endingScrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: normalize(20) },
  endingTitle: { fontSize: normalize(11), color: COLORS.textDim, letterSpacing: normalize(5), marginBottom: normalize(24) },
  endingText: { fontSize: normalize(16), lineHeight: normalize(26), color: COLORS.text, textAlign: 'center', marginBottom: normalize(32), paddingHorizontal: normalize(12) },
  endingStatsCard: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: normalize(16), padding: normalize(20), width: '100%', marginBottom: normalize(30), borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  statsHeader: { color: COLORS.textDim, fontSize: normalize(10), letterSpacing: 2, textAlign: 'center', marginBottom: normalize(15), fontWeight: '700' },
  endingStats: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: normalize(10) },
  endingStat: { alignItems: 'center' },
  statDividerVertical: { width: 1, height: normalize(40), backgroundColor: 'rgba(255,255,255,0.1)' },
  endingStatValue: { fontSize: normalize(36), fontWeight: '700', color: COLORS.accent, marginBottom: normalize(4) },
  endingStatLabel: { fontSize: normalize(10), color: COLORS.textDim, letterSpacing: 1 },
  bonusApplied: { color: COLORS.success, fontSize: normalize(12), marginBottom: normalize(24), fontWeight: '600', textAlign: 'center' },

  // Ending Ekranı Günlük Görevler
  dailyQuestsProgressCard: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: normalize(12),
    padding: normalize(16),
    width: '100%',
    marginBottom: normalize(20),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dailyQuestsProgressTitle: {
    color: COLORS.accent,
    fontSize: normalize(11),
    fontWeight: '700',
    marginBottom: normalize(12),
    textAlign: 'center',
    letterSpacing: 1,
  },
  questProgressItem: {
    marginBottom: normalize(12),
  },
  questProgressText: {
    fontSize: normalize(11),
    color: COLORS.text,
    marginBottom: normalize(4),
  },
  questProgressBar: {
    height: normalize(6),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: normalize(3),
    overflow: 'hidden',
    marginBottom: normalize(4),
  },
  questProgressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: normalize(3),
  },
  questProgressCount: {
    fontSize: normalize(9),
    color: COLORS.textDim,
    textAlign: 'right',
  },

  // Başarılar Rozet Satırı
  legacyAchievementsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(12),
    gap: normalize(8),
  },
  legacyAchievementBadge: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    backgroundColor: COLORS.cardLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  legacyAchievementEmoji: {
    fontSize: normalize(20),
  },
  legacyAchievementMoreBadge: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  legacyAchievementMoreText: {
    fontSize: normalize(10),
    color: COLORS.textDim,
    fontWeight: '700',
  },
  legacyAchievementViewAllBtn: {
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderRadius: normalize(12),
    backgroundColor: COLORS.cardLight,
    borderWidth: 1,
    borderColor: COLORS.card,
  },
  legacyAchievementViewAllText: {
    fontSize: normalize(10),
    color: COLORS.accent,
    fontWeight: '600',
  },

  // Başarılar Detay Ekranı
  legacyAchievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: normalize(16),
    marginBottom: normalize(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardLight,
  },
  legacyAchievementsBackBtn: {
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(12),
  },
  legacyAchievementsBackText: {
    fontSize: normalize(14),
    color: COLORS.accent,
    fontWeight: '600',
  },
  legacyAchievementsHeaderTitle: {
    fontSize: normalize(20),
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 1,
  },
  legacyAchievementsScroll: {
    flex: 1,
  },
  legacyAchievementsContent: {
    paddingBottom: normalize(20),
  },
  legacyAchievementCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: normalize(12),
    padding: normalize(16),
    marginBottom: normalize(12),
    borderWidth: 1,
    borderColor: COLORS.cardLight,
    position: 'relative',
  },
  legacyAchievementCardUnlocked: {
    borderColor: COLORS.accent,
    borderWidth: 2,
  },
  legacyAchievementCardLocked: {
    opacity: 0.5,
  },
  legacyAchievementCardLeft: {
    marginRight: normalize(12),
  },
  legacyAchievementCardEmoji: {
    fontSize: normalize(32),
  },
  legacyAchievementCardEmojiLocked: {
    opacity: 0.3,
  },
  legacyAchievementCardRight: {
    flex: 1,
  },
  legacyAchievementCardName: {
    fontSize: normalize(16),
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: normalize(4),
  },
  legacyAchievementCardNameLocked: {
    color: COLORS.textDim,
  },
  legacyAchievementCardDesc: {
    fontSize: normalize(12),
    color: COLORS.textDim,
    lineHeight: normalize(18),
    marginBottom: normalize(4),
  },
  legacyAchievementCardDescLocked: {
    color: COLORS.textDim,
    opacity: 0.7,
  },
  legacyAchievementCardDate: {
    fontSize: normalize(10),
    color: COLORS.accent,
    marginTop: normalize(4),
  },
  legacyAchievementCheckmark: {
    position: 'absolute',
    top: normalize(8),
    right: normalize(8),
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(12),
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legacyAchievementCheckmarkText: {
    fontSize: normalize(14),
    color: COLORS.bg,
    fontWeight: '700',
  },
  legacyAchievementsFooter: {
    paddingTop: normalize(16),
    borderTopWidth: 1,
    borderTopColor: COLORS.cardLight,
    alignItems: 'center',
  },
  legacyAchievementsFooterText: {
    fontSize: normalize(12),
    color: COLORS.textDim,
    fontWeight: '600',
  },

  continueBtn: { backgroundColor: COLORS.accent, paddingVertical: normalize(16), paddingHorizontal: normalize(40), borderRadius: normalize(12) },
  continueBtnText: { fontSize: normalize(14), fontWeight: '700', color: COLORS.bg, letterSpacing: 1 },
});

export default App;
