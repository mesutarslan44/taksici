import AsyncStorage from '@react-native-async-storage/async-storage';

const ANALYTICS_KEY = '@taksici_balance_analytics_v1';
const ANALYTICS_MAX_ITEMS = 800;

const getIsoWeekNumber = (date = new Date()) => {
  const temp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = temp.getUTCDay() || 7;
  temp.setUTCDate(temp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
  return Math.ceil((((temp - yearStart) / 86400000) + 1) / 7);
};

const getWeekId = (date = new Date()) => `${date.getFullYear()}-W${String(getIsoWeekNumber(date)).padStart(2, '0')}`;

const safeParseArray = (rawValue) => {
  if (!rawValue) return [];
  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const logBalanceEvent = async (eventName, payload = {}) => {
  try {
    const now = new Date();
    const current = safeParseArray(await AsyncStorage.getItem(ANALYTICS_KEY));
    current.push({
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      eventName,
      payload,
      weekId: getWeekId(now),
      ts: now.toISOString(),
    });
    const trimmed = current.slice(-ANALYTICS_MAX_ITEMS);
    await AsyncStorage.setItem(ANALYTICS_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.log('Analytics log error:', error);
  }
};

const getCurrentWeekSummary = async () => {
  const summary = {
    weekId: getWeekId(),
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
  };

  try {
    const allEvents = safeParseArray(await AsyncStorage.getItem(ANALYTICS_KEY));
    const thisWeekEvents = allEvents.filter((item) => item.weekId === summary.weekId);
    summary.totalEvents = thisWeekEvents.length;

    for (const item of thisWeekEvents) {
      const payload = item.payload || {};
      if (item.eventName === 'ride_completed') {
        summary.ridesCompleted += 1;
        summary.moneyDelta += Number(payload.money ?? 0);
        if (payload.endingType === 'police') summary.policeEndings += 1;
        if (payload.isReplay) summary.replayRides += 1;
      } else if (item.eventName === 'refuel') {
        summary.refuels += 1;
      } else if (item.eventName === 'break') {
        summary.breaks += 1;
      } else if (item.eventName === 'daily_chain_claim') {
        summary.dailyClaims += 1;
      } else if (item.eventName === 'meta_upgrade_buy') {
        summary.upgrades += 1;
      }
    }

    summary.avgRideMoney = summary.ridesCompleted > 0
      ? Math.round(summary.moneyDelta / summary.ridesCompleted)
      : 0;
  } catch (error) {
    console.log('Analytics summary error:', error);
  }

  return summary;
};

const getBalanceHint = (summary) => {
  if (!summary || summary.ridesCompleted === 0) {
    return 'Bu hafta veri az. Ilk hedef: en az 10 ride toplayip dengeyi olcmek.';
  }
  const policeRate = summary.policeEndings / Math.max(1, summary.ridesCompleted);
  if (policeRate > 0.35) {
    return 'Polis sonu orani yuksek. Riskli secenek cezalarini bir miktar yumusatabilirsin.';
  }
  if (summary.avgRideMoney < 120) {
    return 'Ortalama gelir dusuk. Taksimetre bonuslarini veya event odullerini artır.';
  }
  if (summary.replayRides < 2 && summary.ridesCompleted > 10) {
    return 'Replay kullanim dusuk. Alternatif son odullerini biraz daha cazip yap.';
  }
  return 'Denge su an saglikli. Haftalik bonuslarda kucuk iterasyonlarla devam et.';
};

export {
  logBalanceEvent,
  getCurrentWeekSummary,
  getBalanceHint,
};
