// OYUN YÖNETİCİSİ - Enerji, Benzin, Gün/Gece Sistemi
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GAME_MANAGER_KEY = '@taksici_game_manager';

// Varsayılan değerler
const DEFAULT_STATE = {
    energy: 100,        // Enerji (0-100)
    fuel: 100,          // Benzin (0-100)
    dayTime: 'morning', // morning, afternoon, evening, night
    hour: 8,            // Saat (0-24)
    day: 1,             // Gün sayısı
    ridesThisShift: 0,  // Bu vardiyada yapılan yolculuk
};

// Context
const GameManagerContext = createContext(null);

export const useGameManager = () => useContext(GameManagerContext);

export const GameManagerProvider = ({ children }) => {
    const [state, setState] = useState(DEFAULT_STATE);

    // Yükleme
    useEffect(() => {
        loadState();
    }, []);

    const loadState = async () => {
        try {
            const saved = await AsyncStorage.getItem(GAME_MANAGER_KEY);
            if (saved) {
                setState(prev => ({ ...prev, ...JSON.parse(saved) }));
            }
        } catch (e) {
            console.log('GameManager load error:', e);
        }
    };

    const saveState = async (newState) => {
        try {
            await AsyncStorage.setItem(GAME_MANAGER_KEY, JSON.stringify(newState));
        } catch (e) {
            console.log('GameManager save error:', e);
        }
    };

    // Gün zamanını hesapla
    const calculateDayTime = (hour) => {
        if (hour >= 6 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 21) return 'evening';
        return 'night';
    };

    // Yolculuk tamamlandı
    const completeRide = (duration = 30) => {
        setState(prev => {
            const newHour = (prev.hour + Math.ceil(duration / 60)) % 24;
            const newFuel = Math.max(0, prev.fuel - (5 + Math.random() * 5));
            const newEnergy = Math.max(0, prev.energy - (10 + Math.random() * 5));
            const newDay = newHour < prev.hour ? prev.day + 1 : prev.day;

            const newState = {
                ...prev,
                hour: newHour,
                fuel: newFuel,
                energy: newEnergy,
                dayTime: calculateDayTime(newHour),
                day: newDay,
                ridesThisShift: prev.ridesThisShift + 1,
            };
            saveState(newState);
            return newState;
        });
    };

    // Benzin doldur
    const refuel = (cost) => {
        setState(prev => {
            const newState = { ...prev, fuel: 100 };
            saveState(newState);
            return newState;
        });
        return true;
    };

    // Dinlen
    const rest = () => {
        setState(prev => {
            // Sabaha kadar uyu
            const newState = {
                ...prev,
                energy: 100,
                hour: 8,
                dayTime: 'morning',
                day: prev.dayTime === 'night' ? prev.day + 1 : prev.day,
                ridesThisShift: 0,
            };
            saveState(newState);
            return newState;
        });
    };

    // Mola ver (çay/kahve)
    const takeBreak = (type = 'tea') => {
        setState(prev => {
            const energyBoost = type === 'coffee' ? 25 : 15;
            const newState = {
                ...prev,
                energy: Math.min(100, prev.energy + energyBoost),
                hour: (prev.hour + 1) % 24,
            };
            saveState(newState);
            return newState;
        });
    };

    // Kontroller
    const needsRest = () => state.energy <= 15;
    const needsFuel = () => state.fuel <= 15;
    const canDrive = () => state.energy > 15 && state.fuel > 15;

    // Sıfırla
    const resetGameManager = async () => {
        setState(DEFAULT_STATE);
        await AsyncStorage.removeItem(GAME_MANAGER_KEY);
    };

    const value = {
        ...state,
        completeRide,
        refuel,
        rest,
        takeBreak,
        needsRest,
        needsFuel,
        canDrive,
        resetGameManager,
    };

    return (
        <GameManagerContext.Provider value={value}>
            {children}
        </GameManagerContext.Provider>
    );
};

// Zaman göstergesi için yardımcı
export const getTimeEmoji = (dayTime) => {
    switch (dayTime) {
        case 'morning': return '🌅';
        case 'afternoon': return '☀️';
        case 'evening': return '🌆';
        case 'night': return '🌙';
        default: return '☀️';
    }
};

export const formatHour = (hour) => {
    const h = hour % 24;
    return `${h.toString().padStart(2, '0')}:00`;
};
