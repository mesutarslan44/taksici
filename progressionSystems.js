const DAILY_CHAIN_STEPS = [
  {
    id: 'day_1',
    title: 'Isinma Vardiyasi',
    targets: { ridesToday: 2, nightRides: 0, policeFreeRides: 2 },
    reward: { money: 120, reputation: 6 },
  },
  {
    id: 'day_2',
    title: 'Yogun Trafik',
    targets: { ridesToday: 3, nightRides: 1, policeFreeRides: 2 },
    reward: { money: 180, reputation: 8 },
  },
  {
    id: 'day_3',
    title: 'Aksam Mesaisi',
    targets: { ridesToday: 4, nightRides: 2, policeFreeRides: 3 },
    reward: { money: 240, reputation: 10 },
  },
  {
    id: 'day_4',
    title: 'Durak Ustasi',
    targets: { ridesToday: 5, nightRides: 2, policeFreeRides: 4 },
    reward: { money: 320, reputation: 12 },
  },
  {
    id: 'day_5',
    title: 'Gececi',
    targets: { ridesToday: 5, nightRides: 3, policeFreeRides: 4 },
    reward: { money: 420, reputation: 15 },
  },
  {
    id: 'day_6',
    title: 'Kazanc Sprinti',
    targets: { ridesToday: 6, nightRides: 3, policeFreeRides: 5 },
    reward: { money: 560, reputation: 18 },
  },
  {
    id: 'day_7',
    title: 'Efsane Vardiya',
    targets: { ridesToday: 7, nightRides: 4, policeFreeRides: 6 },
    reward: { money: 900, reputation: 30 },
  },
];

const DEFAULT_DAILY_QUESTS = {
  ridesToday: 0,
  nightRides: 0,
  policeFreeRides: 0,
  lastResetDay: null,
  chainDayIndex: 0,
  streakDays: 0,
  bestStreak: 0,
  chainClaimedToday: false,
  claimable: false,
  lastClaimDay: null,
  softResetCount: 0,
  missedYesterday: false,
};

const WEEKLY_EVENTS = [
  {
    id: 'night_shift',
    name: 'Gece Vardiyasi Haftasi',
    description: 'Gece yolculari daha bol, gece bonusu daha yuksek.',
    bonusMoneyPct: 12,
    bonusReputationPct: 8,
    passengerIds: [3, 7, 12, 17, 20, 25, 30],
    themeColor: '#4ecdc4',
  },
  {
    id: 'vip_rush',
    name: 'VIP Yogunlugu',
    description: 'Bahsis potansiyeli yuksek yolcular one cikar.',
    bonusMoneyPct: 18,
    bonusReputationPct: 4,
    passengerIds: [4, 9, 14, 18, 22, 27],
    themeColor: '#ffc857',
  },
  {
    id: 'chaos_week',
    name: 'Kaos Haftasi',
    description: 'Riskli yolcular daha sik. Karar kaliteni gostereceksin.',
    bonusMoneyPct: 10,
    bonusReputationPct: 12,
    passengerIds: [5, 8, 11, 16, 19, 24, 29],
    themeColor: '#ff6b6b',
  },
];

const META_UPGRADES = {
  fuelEco: {
    id: 'fuelEco',
    label: 'Yakit Verimi',
    effectLabel: '-8% yakit tuketimi / seviye',
    maxLevel: 5,
    baseCost: 700,
  },
  customerPatience: {
    id: 'customerPatience',
    label: 'Musteri Sabri',
    effectLabel: '-10% negatif itibar cezasi / seviye',
    maxLevel: 5,
    baseCost: 750,
  },
  taximeterMastery: {
    id: 'taximeterMastery',
    label: 'Taksimetre Ustaligi',
    effectLabel: '+6% taksimetre kazanci / seviye',
    maxLevel: 5,
    baseCost: 850,
  },
};

const DEFAULT_META_PROGRESS = {
  fuelEco: 0,
  customerPatience: 0,
  taximeterMastery: 0,
};

const REPLAY_VARIANTS = ['night_shift', 'vip_tip', 'moral_test', 'second_chance'];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const getDayKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseDayKey = (dayKey) => {
  if (!dayKey || typeof dayKey !== 'string') return null;
  const [year, month, day] = dayKey.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const getDayDiff = (fromDayKey, toDayKey) => {
  const from = parseDayKey(fromDayKey);
  const to = parseDayKey(toDayKey);
  if (!from || !to) return 0;
  const diffMs = to.getTime() - from.getTime();
  return Math.floor(diffMs / (24 * 60 * 60 * 1000));
};

const getCurrentChainStep = (quests) => {
  const safeIndex = clamp(quests?.chainDayIndex ?? 0, 0, DAILY_CHAIN_STEPS.length - 1);
  return DAILY_CHAIN_STEPS[safeIndex];
};

const getDailyChainProgress = (quests) => {
  const step = getCurrentChainStep(quests || DEFAULT_DAILY_QUESTS);
  const objectives = [
    {
      key: 'ridesToday',
      label: `Bugun ${step.targets.ridesToday} yolcu tasi`,
      current: quests?.ridesToday ?? 0,
      target: step.targets.ridesToday,
    },
    {
      key: 'nightRides',
      label: `Gece ${step.targets.nightRides} yolculuk yap`,
      current: quests?.nightRides ?? 0,
      target: step.targets.nightRides,
    },
    {
      key: 'policeFreeRides',
      label: `${step.targets.policeFreeRides} polisiz sefer`,
      current: quests?.policeFreeRides ?? 0,
      target: step.targets.policeFreeRides,
    },
  ].map((item) => {
    const safeTarget = Math.max(1, item.target);
    const percent = Math.min(100, Math.round((item.current / safeTarget) * 100));
    const done = item.current >= item.target;
    return { ...item, done, percent };
  });

  const completedAll = objectives.every((item) => item.done);
  return { step, objectives, completedAll };
};

const rolloverDailyQuests = (quests, todayKey = getDayKey()) => {
  const next = { ...DEFAULT_DAILY_QUESTS, ...(quests || {}) };
  if (!next.lastResetDay) {
    next.lastResetDay = todayKey;
    next.missedYesterday = false;
    return next;
  }

  if (next.lastResetDay === todayKey) {
    return next;
  }

  const dayDiff = getDayDiff(next.lastResetDay, todayKey);
  const missedClaim = !next.chainClaimedToday;
  const missedMultipleDays = dayDiff > 1;
  const shouldSoftReset = missedClaim || missedMultipleDays;

  if (shouldSoftReset) {
    const penalty = missedMultipleDays ? 2 : 1;
    next.streakDays = Math.max(0, next.streakDays - penalty);
    next.chainDayIndex = Math.max(0, next.chainDayIndex - penalty);
    next.softResetCount = (next.softResetCount || 0) + 1;
    next.missedYesterday = true;
  } else {
    next.missedYesterday = false;
  }

  next.ridesToday = 0;
  next.nightRides = 0;
  next.policeFreeRides = 0;
  next.chainClaimedToday = false;
  next.claimable = false;
  next.lastResetDay = todayKey;
  return next;
};

const updateQuestsOnRide = (quests, { ending, hour }) => {
  const next = { ...quests };
  next.ridesToday += 1;

  if (hour >= 21 || hour < 6) {
    next.nightRides += 1;
  }
  if (!ending || ending.type !== 'police') {
    next.policeFreeRides += 1;
  }

  const progress = getDailyChainProgress(next);
  next.claimable = progress.completedAll && !next.chainClaimedToday;
  return next;
};

const claimDailyChain = (quests) => {
  const next = { ...quests };
  const progress = getDailyChainProgress(next);
  if (!progress.completedAll || next.chainClaimedToday) {
    return {
      claimed: false,
      updated: next,
      reward: { money: 0, reputation: 0, streakBonus: 0 },
    };
  }

  const step = progress.step;
  const streakBonus = Math.max(0, (next.streakDays || 0) * 20);
  const repStreakBonus = Math.floor((next.streakDays || 0) / 3);
  const reward = {
    money: step.reward.money + streakBonus,
    reputation: step.reward.reputation + repStreakBonus,
    streakBonus,
  };

  next.chainClaimedToday = true;
  next.claimable = false;
  next.lastClaimDay = next.lastResetDay || getDayKey();
  next.streakDays = (next.streakDays || 0) + 1;
  next.bestStreak = Math.max(next.bestStreak || 0, next.streakDays);
  next.chainDayIndex = (next.chainDayIndex + 1) % DAILY_CHAIN_STEPS.length;
  next.missedYesterday = false;

  return { claimed: true, updated: next, reward };
};

const getIsoWeekNumber = (date = new Date()) => {
  const temp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = temp.getUTCDay() || 7;
  temp.setUTCDate(temp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
  return Math.ceil((((temp - yearStart) / 86400000) + 1) / 7);
};

const getActiveWeeklyEvent = (date = new Date()) => {
  const weekNumber = getIsoWeekNumber(date);
  const index = weekNumber % WEEKLY_EVENTS.length;
  return WEEKLY_EVENTS[index];
};

const applyWeeklyEventBonuses = (money, reputation, weeklyEvent) => {
  if (!weeklyEvent) return { money, reputation };
  const moneyBonus = Math.round(money * ((weeklyEvent.bonusMoneyPct || 0) / 100));
  const positiveRep = Math.max(0, reputation);
  const reputationBonus = Math.round(positiveRep * ((weeklyEvent.bonusReputationPct || 0) / 100));
  return {
    money: money + moneyBonus,
    reputation: reputation + reputationBonus,
    moneyBonus,
    reputationBonus,
  };
};

const getUpgradeCost = (upgradeId, level) => {
  const upgrade = META_UPGRADES[upgradeId];
  if (!upgrade) return Number.MAX_SAFE_INTEGER;
  return Math.round(upgrade.baseCost * (1 + level * 0.85));
};

const tryPurchaseUpgrade = (metaProgress, upgradeId) => {
  const upgrade = META_UPGRADES[upgradeId];
  if (!upgrade) {
    return { ok: false, error: 'upgrade_not_found', cost: 0, newMeta: metaProgress };
  }
  const currentLevel = metaProgress?.[upgradeId] ?? 0;
  if (currentLevel >= upgrade.maxLevel) {
    return { ok: false, error: 'max_level', cost: 0, newMeta: metaProgress };
  }

  const cost = getUpgradeCost(upgradeId, currentLevel);
  const newMeta = {
    ...metaProgress,
    [upgradeId]: currentLevel + 1,
  };
  return { ok: true, cost, newMeta };
};

const getMetaEffects = (metaProgress) => {
  const fuelLevel = metaProgress?.fuelEco ?? 0;
  const patienceLevel = metaProgress?.customerPatience ?? 0;
  const meterLevel = metaProgress?.taximeterMastery ?? 0;

  return {
    fuelConsumptionMultiplier: Math.max(0.5, 1 - (fuelLevel * 0.08)),
    negativeReputationMultiplier: Math.max(0.45, 1 - (patienceLevel * 0.1)),
    taximeterMultiplier: 1 + (meterLevel * 0.06),
  };
};

const pickReplayVariant = () => REPLAY_VARIANTS[Math.floor(Math.random() * REPLAY_VARIANTS.length)];

const applyReplayVariantToEnding = (ending, variantId, passengerName = '') => {
  if (!ending) return ending;
  const endingCopy = { ...ending };
  const suffixName = passengerName ? ` (${passengerName})` : '';

  switch (variantId) {
    case 'night_shift':
      endingCopy.money = (endingCopy.money || 0) + 90;
      endingCopy.reputation = (endingCopy.reputation || 0) - 4;
      endingCopy.text = `${endingCopy.text}\n\nAlternatif Son${suffixName}: Gece trafiginde ekstra taksimetre yazdi.`;
      break;
    case 'vip_tip':
      endingCopy.money = (endingCopy.money || 0) + 160;
      endingCopy.reputation = (endingCopy.reputation || 0) + 10;
      endingCopy.text = `${endingCopy.text}\n\nAlternatif Son${suffixName}: Yolcu son anda cömert bir bahsis birakti.`;
      break;
    case 'moral_test':
      endingCopy.money = (endingCopy.money || 0) - 30;
      endingCopy.reputation = (endingCopy.reputation || 0) + 24;
      endingCopy.text = `${endingCopy.text}\n\nAlternatif Son${suffixName}: Para yerine vicdani puan kazandin.`;
      break;
    case 'second_chance':
    default:
      endingCopy.money = (endingCopy.money || 0) + 50;
      endingCopy.reputation = (endingCopy.reputation || 0) + 16;
      endingCopy.text = `${endingCopy.text}\n\nAlternatif Son${suffixName}: Bu kez yolculuk daha dengeli kapandi.`;
      break;
  }

  return endingCopy;
};

export {
  DAILY_CHAIN_STEPS,
  DEFAULT_DAILY_QUESTS,
  DEFAULT_META_PROGRESS,
  META_UPGRADES,
  WEEKLY_EVENTS,
  getDayKey,
  getCurrentChainStep,
  getDailyChainProgress,
  rolloverDailyQuests,
  updateQuestsOnRide,
  claimDailyChain,
  getActiveWeeklyEvent,
  applyWeeklyEventBonuses,
  getUpgradeCost,
  tryPurchaseUpgrade,
  getMetaEffects,
  pickReplayVariant,
  applyReplayVariantToEnding,
};
