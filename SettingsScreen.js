import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  PixelRatio,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const baseWidth = 375;
const scale = width / baseWidth;
const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

const SETTINGS_KEY = '@taksici_settings';
const DEFAULT_SETTINGS = {
  musicVolume: 0.5,
  effectVolume: 0.7,
  vibrationEnabled: true,
  textSpeed: 20,
  fontSize: 'normal',
  highContrast: false,
};

const COLORS = {
  bg: '#0a0a0f',
  card: '#1a1a24',
  cardLight: '#252532',
  accent: '#ffc857',
  text: '#f0f0f0',
  textDim: '#8a8a9a',
  success: '#4ecdc4',
};

const VOLUME_STEPS = [0, 0.25, 0.5, 0.75, 1];
const TEXT_SPEED_OPTIONS = [
  { label: 'Yavas', value: 35 },
  { label: 'Normal', value: 20 },
  { label: 'Hizli', value: 10 },
];
const FONT_SIZE_OPTIONS = [
  { label: 'Kucuk', value: 'small' },
  { label: 'Normal', value: 'normal' },
  { label: 'Buyuk', value: 'large' },
];

const formatPercent = (value) => `${Math.round(value * 100)}%`;

export const SettingsScreen = ({ onClose, onSettingsChange }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(SETTINGS_KEY);
        if (raw) {
          setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
        }
      } catch (error) {
        console.log('SettingsScreen load error:', error);
      }
    };
    load();
  }, []);

  const updateSettings = async (patch) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    } catch (error) {
      console.log('SettingsScreen save error:', error);
    }
    onSettingsChange?.(next);
  };

  const fontSizeLabel = useMemo(() => {
    const item = FONT_SIZE_OPTIONS.find((option) => option.value === settings.fontSize);
    return item?.label || 'Normal';
  }, [settings.fontSize]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onClose} activeOpacity={0.8}>
          <Text style={styles.backBtnText}>GERI</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AYARLAR</Text>
        <View style={styles.rightSpacer} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ses Ayarlari</Text>

          <Text style={styles.fieldLabel}>Muzik: {formatPercent(settings.musicVolume)}</Text>
          <View style={styles.row}>
            {VOLUME_STEPS.map((value) => (
              <TouchableOpacity
                key={`music_${value}`}
                style={[styles.stepBtn, settings.musicVolume === value && styles.stepBtnActive]}
                onPress={() => updateSettings({ musicVolume: value })}
                activeOpacity={0.8}
              >
                <Text style={[styles.stepBtnText, settings.musicVolume === value && styles.stepBtnTextActive]}>
                  {formatPercent(value)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.fieldLabel}>Efekt: {formatPercent(settings.effectVolume)}</Text>
          <View style={styles.row}>
            {VOLUME_STEPS.map((value) => (
              <TouchableOpacity
                key={`effect_${value}`}
                style={[styles.stepBtn, settings.effectVolume === value && styles.stepBtnActive]}
                onPress={() => updateSettings({ effectVolume: value })}
                activeOpacity={0.8}
              >
                <Text style={[styles.stepBtnText, settings.effectVolume === value && styles.stepBtnTextActive]}>
                  {formatPercent(value)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Oynanis</Text>

          <Text style={styles.fieldLabel}>Yazi Hizi</Text>
          <View style={styles.row}>
            {TEXT_SPEED_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[styles.optionBtn, settings.textSpeed === option.value && styles.optionBtnActive]}
                onPress={() => updateSettings({ textSpeed: option.value })}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionBtnText, settings.textSpeed === option.value && styles.optionBtnTextActive]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.fieldLabel}>Font Boyutu: {fontSizeLabel}</Text>
          <View style={styles.row}>
            {FONT_SIZE_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[styles.optionBtn, settings.fontSize === option.value && styles.optionBtnActive]}
                onPress={() => updateSettings({ fontSize: option.value })}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionBtnText, settings.fontSize === option.value && styles.optionBtnTextActive]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Erisilebilirlik</Text>

          <TouchableOpacity
            style={[styles.toggleBtn, settings.highContrast && styles.toggleBtnActive]}
            onPress={() => updateSettings({ highContrast: !settings.highContrast })}
            activeOpacity={0.8}
          >
            <Text style={styles.toggleLabel}>Yuksek Kontrast</Text>
            <Text style={styles.toggleValue}>{settings.highContrast ? 'ACIK' : 'KAPALI'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, settings.vibrationEnabled && styles.toggleBtnActive]}
            onPress={() => updateSettings({ vibrationEnabled: !settings.vibrationEnabled })}
            activeOpacity={0.8}
          >
            <Text style={styles.toggleLabel}>Titresim</Text>
            <Text style={styles.toggleValue}>{settings.vibrationEnabled ? 'ACIK' : 'KAPALI'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: normalize(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  backBtn: {
    backgroundColor: COLORS.card,
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(8),
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  backBtnText: {
    color: COLORS.text,
    fontSize: normalize(11),
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerTitle: {
    color: COLORS.accent,
    fontSize: normalize(16),
    fontWeight: '700',
    letterSpacing: 1,
  },
  rightSpacer: {
    width: normalize(56),
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: normalize(28),
    gap: normalize(12),
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: COLORS.cardLight,
    padding: normalize(12),
  },
  cardTitle: {
    color: COLORS.accent,
    fontSize: normalize(12),
    fontWeight: '700',
    marginBottom: normalize(10),
    letterSpacing: 1,
  },
  fieldLabel: {
    color: COLORS.text,
    fontSize: normalize(11),
    fontWeight: '600',
    marginBottom: normalize(6),
    marginTop: normalize(4),
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(8),
    marginBottom: normalize(8),
  },
  stepBtn: {
    backgroundColor: COLORS.cardLight,
    borderRadius: normalize(9),
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(10),
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  stepBtnActive: {
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(255, 200, 87, 0.2)',
  },
  stepBtnText: {
    color: COLORS.textDim,
    fontSize: normalize(10),
    fontWeight: '700',
  },
  stepBtnTextActive: {
    color: COLORS.accent,
  },
  optionBtn: {
    backgroundColor: COLORS.cardLight,
    borderRadius: normalize(9),
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(12),
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  optionBtnActive: {
    borderColor: COLORS.success,
    backgroundColor: 'rgba(78, 205, 196, 0.16)',
  },
  optionBtnText: {
    color: COLORS.textDim,
    fontSize: normalize(10),
    fontWeight: '700',
  },
  optionBtnTextActive: {
    color: COLORS.success,
  },
  toggleBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardLight,
    borderRadius: normalize(10),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(11),
    borderWidth: 1,
    borderColor: COLORS.cardLight,
    marginBottom: normalize(8),
  },
  toggleBtnActive: {
    borderColor: COLORS.success,
  },
  toggleLabel: {
    color: COLORS.text,
    fontSize: normalize(11),
    fontWeight: '600',
  },
  toggleValue: {
    color: COLORS.accent,
    fontSize: normalize(10),
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default SettingsScreen;
