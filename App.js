import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions, StatusBar, BackHandler, Image, PixelRatio, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { PASSENGERS } from './passengers';
import { TaxiInterior } from './TaxiInterior';
import { ShopScreen } from './ShopScreen';
import { DEFAULT_OWNED, DEFAULT_EQUIPPED, SHOP_ITEMS, SPECIAL_COMBOS } from './shopItems';
import { TaksiDurApp } from './TaksiDurApp';
import { RestScreen, FuelScreen, BreakScreen } from './RestScreens';
import DrivingGame from './DrivingGame';
import { getTimeEmoji, formatHour } from './GameManager';

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

  const [radioChannelIndex, setRadioChannelIndex] = useState(0); // Artık kullanılmıyor ama state yapısını bozmamak için kalsın veya silebiliriz (temizlemek daha iyi)
  const [isRaining, setIsRaining] = useState(true);
  // Radio states removed
  const [allStoriesCompleted, setAllStoriesCompleted] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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

  // Mini-Game State
  const [pendingNextChoice, setPendingNextChoice] = useState(null);
  const [pendingFailChoice, setPendingFailChoice] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const choicesAnim = useRef(new Animated.Value(0)).current;
  const isMutedRef = useRef(isMuted);

  // Manager kaydet/yükle
  useEffect(() => {
    loadManagerState();
  }, []);

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

  // Gün zamanı hesapla
  const calculateDayTime = (hour) => {
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  // Geri tuşu handler
  useEffect(() => {
    const backAction = () => {
      if (screen === 'shop' || screen === 'taksidur' || screen === 'rest' || screen === 'fuel' || screen === 'break') {
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
    fadeAnim.setValue(0); slideAnim.setValue(50);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();

    if (screen === 'dialogue' && !isThinking) {
      Animated.timing(choicesAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }
  }, [screen, isThinking]);

  useEffect(() => {
    loadGameState();
    loadRainSound();
    return () => {
      if (rainSound) rainSound.unloadAsync();
      if (trafficSound) trafficSound.unloadAsync();
      if (citySound) citySound.unloadAsync();
    };
  }, []);

  // Ortam sesleri döngüsü
  useEffect(() => {
    const ambientCycle = async () => {
      setIsRaining(true);
      if (rainSound && !isMutedRef.current) await rainSound.playAsync();

      setTimeout(async () => {
        setIsRaining(false);
        if (rainSound) await rainSound.pauseAsync();

        setTimeout(async () => {
          if (trafficSound && !isMutedRef.current) await trafficSound.playAsync();

          setTimeout(async () => {
            if (trafficSound) await trafficSound.pauseAsync();

            setTimeout(async () => {
              if (citySound && !isMutedRef.current) await citySound.playAsync();

              setTimeout(async () => {
                if (citySound) await citySound.pauseAsync();

                setTimeout(() => { ambientCycle(); }, 60000);
              }, 20000);
            }, 40000);
          }, 20000);
        }, 30000);
      }, 15000);
    };

    const timer = setTimeout(ambientCycle, 1000);
    return () => clearTimeout(timer);
  }, [rainSound, trafficSound, citySound]);

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
      setRainSound(rain);

      // Trafik Sesi - Yerel dosya
      const { sound: traffic } = await Audio.Sound.createAsync(
        require('./assets/sounds/traffic.mp3'),
        { shouldPlay: false, isLooping: true, volume: 0.15 }
      );
      setTrafficSound(traffic);

      // Şehir Ambiyansı - Yerel dosya
      const { sound: city } = await Audio.Sound.createAsync(
        require('./assets/sounds/city.mp3'),
        { shouldPlay: false, isLooping: true, volume: 0.12 }
      );
      setCitySound(city);
    } catch (e) { console.log('Sound load error:', e); }
  };

  // Radyo fonksiyonları silindi

  // MUTE/UNMUTE - Tüm sesleri anında sustur
  const toggleMute = async () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    isMutedRef.current = newMuted; // Ref'i de güncelle

    try {
      if (newMuted) {
        // Tüm sesleri durdur
        if (rainSound) await rainSound.pauseAsync();
        if (trafficSound) await trafficSound.pauseAsync();
        if (citySound) await citySound.pauseAsync();
        if (citySound) await citySound.pauseAsync();
        // Radyo silindi
      } else {
        // Sesleri devam ettir (eğer ilgili state aktifse)
        if (rainSound && isRaining) await rainSound.playAsync();
      }
    } catch (e) {
      console.log('Mute toggle error:', e);
    }
  };

  const loadGameState = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      const completed = await AsyncStorage.getItem(COMPLETED_STORIES_KEY);
      const inventory = await AsyncStorage.getItem(INVENTORY_KEY);
      const equipped = await AsyncStorage.getItem(EQUIPPED_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setGameState(prev => ({ ...prev, money: parsed.money || 250, rides: parsed.rides || 0, reputation: parsed.reputation || 50 }));
        if (parsed.lastLocation) setLastLocation(parsed.lastLocation); // Konum yükle
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

  // YOLCU AL - TaksiDur uygulamasını aç
  const startRide = () => {
    const available = getAvailableStories();
    if (available.length === 0) { setAllStoriesCompleted(true); return; }

    // Önce kontroller
    if (manager.energy <= 15) {
      setScreen('rest');
      return;
    }
    if (manager.fuel <= 15) {
      setScreen('fuel');
      return;
    }

    setScreen('taksidur');
  };

  // TaksiDur'dan yolcu seçildi
  const handleSelectPassenger = (passenger) => {
    setGameState(prev => ({ ...prev, currentPassenger: passenger, dialogueIndex: 0 }));
    setLastLocation(passenger.location);
    saveGameState(gameState, null, passenger.location);

    // HER 5 YOLCUDA BİR BONUS OYUN (Surprise event)
    const totalRides = gameState.rides + 1; // Bu yolculukla birlikte kaçıncı?
    if (totalRides > 0 && totalRides % 5 === 0) {
      Alert.alert(
        "⚠️ MEYDAN OKUMA! ⚠️",
        "Beşinci yolcu şerefine özel bir parkur seni bekliyor! Yolcuyu almadan önce yeteneklerini göster!",
        [
          {
            text: "YARIŞA BAŞLA",
            onPress: () => {
              // Özel bir pending state ayarlamaya gerek yok, sadece ekranı açıyoruz.
              // handleMiniGameResult zaten "passenger" ekranına atıyor.
              // Sadece 'success' durumunda ekstra para verelim mi?
              // Şimdilik sadece oyunu açalım.
              setScreen('driving_game');
            }
          }
        ]
      );
      return;
    }

    setScreen('passenger');
  };

  // Hikaye bitti - manager güncelle
  const completeRideAndUpdate = (ending) => {
    const duration = 30 + Math.random() * 30;
    const newHour = (manager.hour + Math.ceil(duration / 60)) % 24;
    const newFuel = Math.max(0, manager.fuel - (5 + Math.random() * 5));
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
  };

  // Dinlenme
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

      const newManager = { ...manager, fuel: 100 };
      setManager(newManager);
      saveManagerState(newManager);
      setScreen('menu');
    }
  };

  // Mola
  const handleBreak = (type, cost) => {
    if (gameState.money >= cost) {
      const newState = { ...gameState, money: gameState.money - cost };
      setGameState(newState);
      saveGameState(newState);

      const energyBoost = type === 'coffee' ? 25 : 15;
      const newManager = {
        ...manager,
        energy: Math.min(100, manager.energy + energyBoost),
        hour: (manager.hour + 1) % 24,
      };
      setManager(newManager);
      saveManagerState(newManager);
      setScreen('menu');
    }
  };

  const resetStories = async () => {
    setCompletedStories([]);
    setAllStoriesCompleted(false);
    await AsyncStorage.removeItem(COMPLETED_STORIES_KEY);
  };

  const acceptPassenger = () => setScreen('dialogue');

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
      setCurrentEnding(ending);
      setScreen('ending');
      completeRideAndUpdate(ending);

      // Radyo kapatma silindi

      const bonus = calculateBonus();
      // YENİ KAZANÇ HESABI: Taksimetre + Ending Bonusu
      const baseFare = Math.floor(taximeterAmount);
      const endingMoney = ending.money || 0; // Ending'den gelen ek para/ceza
      const totalMoney = baseFare + endingMoney;

      const earnedMoney = Math.round(totalMoney * (1 + bonus / 100));
      const earnedRep = Math.round(ending.reputation * (1 + bonus / 100));

      const newCompleted = [...completedStories];
      if (!completedStories.includes(gameState.currentPassenger.id)) {
        newCompleted.push(gameState.currentPassenger.id);
        setCompletedStories(newCompleted);
      }

      const newState = {
        ...gameState,
        money: gameState.money + earnedMoney,
        rides: gameState.rides + 1,
        reputation: Math.max(0, gameState.reputation + earnedRep), // Sınırsız itibar
        currentEnding: ending
      };
      setGameState(newState);
      saveGameState(newState);
      if (newCompleted.length > completedStories.length) {
        AsyncStorage.setItem(COMPLETED_STORIES_KEY, JSON.stringify(newCompleted));
      }
      return;
    }

    const currentDialogue = gameState.currentPassenger?.dialogue;
    if (nextIndex === null || nextIndex === undefined || !currentDialogue || !currentDialogue[nextIndex]) {
      console.warn('Invalid nextIndex or dialogue not found, returning to menu.');
      setGameState(prev => ({ ...prev, currentPassenger: null }));
      setScreen('menu');
      setScreen('menu');
      // stopRadio silindi
      return;
    }

    setIsThinking(true);
    choicesAnim.setValue(0);

    const delay = 500;

    setTimeout(() => {
      setIsThinking(false);
      setGameState(prev => ({ ...prev, dialogueIndex: nextIndex }));
      Animated.timing(choicesAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
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

    // Önce ekranı değiştir ki render hatası olmasın
    setScreen('passenger');

    // Diyalog geçişini güvenli yap
    setTimeout(() => {
      setScreen('dialogue');
      if (success) {
        if (pendingNextChoice !== null) handleChoice(pendingNextChoice);
      } else {
        if (pendingFailChoice !== null) handleChoice(pendingFailChoice);
      }
      // Reset
      setPendingNextChoice(null);
      setPendingFailChoice(null);
    }, 100);
  };

  // MENÜ EKRANI
  const renderMenuScreen = () => (
    <Animated.View style={[styles.screen, styles.menuScreen, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
        <Image source={require('./assets/bg_rain_dark.png')} style={{ width: width, height: height }} resizeMode="cover" blurRadius={3} />
      </View>

      {/* Mute Butonu - Sağ Üst */}
      <TouchableOpacity
        style={styles.muteBtn}
        onPress={toggleMute}
        activeOpacity={0.7}
      >
        <Text style={styles.muteBtnText}>{isMuted ? '🔇' : '🔊'}</Text>
      </TouchableOpacity>

      {/* SIFIRLAMA BUTONU - GÜVENLİ (Onaylı) */}
      <TouchableOpacity
        style={[styles.muteBtn, { right: normalize(70), borderColor: COLORS.danger }]}
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
        <Text style={styles.muteBtnText}>🗑️</Text>
      </TouchableOpacity>

      <View style={styles.logo}>
        <Text style={styles.logoEmoji}>🚖</Text>
        <Text style={styles.logoText}>TAKSİCİ</Text>
        <Text style={styles.logoSubtext}>İSTANBUL HİKAYELERİ</Text>
      </View>

      {/* YENİ: Zaman ve Durum Göstergesi */}
      <View style={styles.timeBar}>
        <View style={styles.timeItem}>
          <Text style={styles.timeEmoji}>{getTimeEmoji(manager.dayTime)}</Text>
          <Text style={styles.timeText}>{formatHour(manager.hour)}</Text>
        </View>
        <View style={styles.timeItem}>
          <Text style={styles.timeEmoji}>📅</Text>
          <Text style={styles.timeText}>Gün {manager.day}</Text>
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
        <View style={styles.statBox}><Text style={styles.statValue}>₺{gameState.money}</Text><Text style={styles.statLabel}>KASA</Text></View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}><Text style={styles.statValue}>{gameState.rides}</Text><Text style={styles.statLabel}>YOLCU</Text></View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: getReputationRank(gameState.reputation).color }]}>
            {getReputationRank(gameState.reputation).emoji} {gameState.reputation}
          </Text>
          <Text style={[styles.statLabel, { color: getReputationRank(gameState.reputation).color }]}>
            {getReputationRank(gameState.reputation).name.toUpperCase()}
          </Text>
        </View>
      </View>

      {calculateBonus() > 0 && (
        <View style={styles.bonusBadge}>
          <Text style={styles.bonusText}>+%{calculateBonus()} Bonus Aktif</Text>
        </View>
      )}

      <Text style={styles.storyCounter}>
        {allStoriesCompleted ? '✓ Tüm hikayeler tamamlandı!' : `${getAvailableStories().length} hikaye bekliyor`}
      </Text>

      {allStoriesCompleted ? (
        <TouchableOpacity style={[styles.startBtn, { backgroundColor: COLORS.purple }]} onPress={resetStories} activeOpacity={0.8}>
          <Text style={styles.startBtnText}>HİKAYELERİ SIFIRLA</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.startBtn} onPress={startRide} activeOpacity={0.8}>
          <Text style={styles.startBtnText}>🚕 TAKSİDUR AÇ</Text>
          <Text style={styles.startBtnSub}>Yolcu ara ve seç</Text>
        </TouchableOpacity>
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

      {/* TEST SÜRÜŞÜ BUTONU (GEÇİCİ) */}
      <TouchableOpacity
        style={[styles.secondaryBtn, { backgroundColor: '#1a1a24', width: '100%', marginBottom: 10, borderColor: COLORS.accent }]}
        onPress={() => setScreen('driving_game')}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 20, marginBottom: 5 }}>🎮</Text>
        <Text style={{ fontSize: 12, color: COLORS.accent, fontWeight: 'bold' }}>TEST SÜRÜŞÜ YAP</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Her yolcu bir hikaye. Her karar bir sonuç.</Text>
    </Animated.View>
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
          <View style={styles.portraitOverlay} />
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
          {p.image ? (
            <Image source={p.image} style={styles.dialogueCharacterSmall} resizeMode="cover" />
          ) : (
            <Text style={styles.dialogueAvatarSmall}>{p.avatar}</Text>
          )}
          <Text style={styles.dialogueCharacterName}>{p.name}</Text>
        </View>

        {/* Diyalog Kutusu */}
        <View style={styles.dialogueBox}>
          <ScrollView style={styles.dialogueScroll} showsVerticalScrollIndicator={false}>
            <Text style={styles.dialogueTextNew}>
              {isThinking ? "..." : (dialogue?.text || "...")}
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
              {dialogue?.choices?.map((choice, index) => (
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
                  <TouchableOpacity style={styles.choiceBtnNew} onPress={() => handleChoice(choice.next, choice.ending)} activeOpacity={0.8}>
                    <Text style={styles.choiceTextNew}>{choice.text}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}

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
      </Animated.View>
    );
  };

  // BİTİŞ EKRANI
  const renderEndingScreen = () => {
    if (!currentEnding) return null;
    const bonus = calculateBonus();

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
                    {(currentEnding.money || 0) >= 0 ? '+' : ''}₺{Math.round((currentEnding.money || 0) * (1 + bonus / 100))}
                  </Text>
                  <Text style={styles.endingStatLabel}>KAZANÇ</Text>
                </View>
                <View style={styles.statDividerVertical} />
                <View style={styles.endingStat}>
                  <Text style={[styles.endingStatValue, { color: (currentEnding.reputation || 0) >= 0 ? COLORS.success : COLORS.danger }]}>
                    {(currentEnding.reputation || 0) >= 0 ? '+' : ''}{Math.round((currentEnding.reputation || 0) * (1 + bonus / 100))}
                  </Text>
                  <Text style={styles.endingStatLabel}>İTİBAR</Text>
                </View>
              </View>
              {bonus > 0 && <Text style={styles.bonusApplied}>+{bonus}% Ekipman Bonusu</Text>}
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
          onComplete={handleMiniGameResult}
          difficulty={gameState.currentPassenger?.id === 20 ? 'hard' : 'normal'}
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
          lastTaxiLocation={lastLocation} // Son konumu geçiriyoruz
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

  // Mute Butonu
  muteBtn: {
    position: 'absolute',
    top: normalize(16),
    right: normalize(16),
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardLight,
    zIndex: 10,
  },
  muteBtnText: {
    fontSize: normalize(22),
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
  timeDanger: { color: COLORS.danger },

  statsContainer: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: normalize(16), padding: normalize(18), marginBottom: normalize(12), width: '100%' },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: normalize(20), fontWeight: '700', color: COLORS.text },
  statLabel: { fontSize: normalize(9), color: COLORS.textDim, marginTop: normalize(4), letterSpacing: 1 },
  statDivider: { width: 1, backgroundColor: COLORS.cardLight, marginHorizontal: normalize(8) },
  bonusBadge: { backgroundColor: COLORS.success, paddingHorizontal: normalize(16), paddingVertical: normalize(6), borderRadius: normalize(20), marginBottom: normalize(8) },
  bonusText: { color: COLORS.bg, fontWeight: 'bold', fontSize: normalize(12) },
  storyCounter: { color: COLORS.accent, fontSize: normalize(13), marginBottom: normalize(12), fontWeight: '600' },
  startBtn: { backgroundColor: COLORS.accent, paddingVertical: normalize(18), paddingHorizontal: normalize(40), borderRadius: normalize(14), width: '100%', alignItems: 'center', marginBottom: normalize(16) },
  startBtnText: { fontSize: normalize(16), fontWeight: '700', color: COLORS.bg, letterSpacing: 1 },
  startBtnSub: { fontSize: normalize(10), color: COLORS.bg, opacity: 0.7, marginTop: normalize(4) },

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
  portraitOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(transparent, #0a0a0f)' },
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
  dialoguePortraitOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(10,10,15,0.7)' },
  dialogueTopBar: { paddingHorizontal: normalize(16), paddingTop: normalize(16) },
  dialogueCharacterRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: normalize(20), paddingVertical: normalize(12) },
  dialogueCharacterSmall: { width: normalize(50), height: normalize(50), borderRadius: normalize(25), borderWidth: 2, borderColor: COLORS.accent, marginRight: normalize(12) },
  dialogueAvatarSmall: { fontSize: normalize(36), marginRight: normalize(12) },
  dialogueCharacterName: { fontSize: normalize(18), fontWeight: '600', color: COLORS.text },
  dialogueBox: { flex: 1, marginHorizontal: normalize(16), marginBottom: normalize(12), backgroundColor: 'rgba(26,26,36,0.9)', borderRadius: normalize(16), padding: normalize(20) },
  dialogueScroll: { flex: 1 },
  dialogueTextNew: { fontSize: normalize(16), lineHeight: normalize(28), color: COLORS.text },
  choicesContainerNew: { paddingHorizontal: normalize(16), paddingBottom: normalize(24), gap: normalize(10) },
  choiceBtnNew: { backgroundColor: COLORS.cardLight, borderRadius: normalize(12), padding: normalize(16), borderWidth: 1, borderColor: COLORS.card },
  choiceTextNew: { fontSize: normalize(14), color: COLORS.text, lineHeight: normalize(20) },
  endingBtn: { backgroundColor: COLORS.success, borderColor: COLORS.success },
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
  continueBtn: { backgroundColor: COLORS.accent, paddingVertical: normalize(16), paddingHorizontal: normalize(40), borderRadius: normalize(12) },
  continueBtnText: { fontSize: normalize(14), fontWeight: '700', color: COLORS.bg, letterSpacing: 1 },
});

export default App;
