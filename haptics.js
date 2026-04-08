import { Vibration } from 'react-native';

const vibratePattern = (pattern, vibrationEnabled = true) => {
  if (!vibrationEnabled) return;
  try {
    Vibration.vibrate(pattern);
  } catch (error) {
    console.log('Vibration error:', error);
  }
};

const triggerReputationChange = (delta, vibrationEnabled = true) => {
  if (!vibrationEnabled || !delta) return;
  if (delta > 0) {
    // Kisa pozitif vurgu
    vibratePattern(20, vibrationEnabled);
    return;
  }
  // Negatifte daha belirgin iki darbe
  vibratePattern([0, 35, 45, 35], vibrationEnabled);
};

const triggerAccident = (vibrationEnabled = true) => {
  // Kaza icin daha sert ve uzun pattern
  vibratePattern([0, 70, 40, 90, 40, 120], vibrationEnabled);
};

const triggerNewRank = (vibrationEnabled = true) => {
  // Rutbe atlama icin ritmik kutlama
  vibratePattern([0, 25, 35, 25, 35, 55], vibrationEnabled);
};

export {
  triggerReputationChange,
  triggerAccident,
  triggerNewRank,
};
