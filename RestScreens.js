// DİNLENME VE MOLA EKRANLARI
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image, PixelRatio } from 'react-native';

// Çay ve Kahve görselleri
const TEA_IMAGE = require('./assets/turk_cayi.png');
const COFFEE_IMAGE = require('./assets/turk_kahvesi.png');

const { width, height } = Dimensions.get('window');

// Responsive scaling
const baseWidth = 375;
const scale = width / baseWidth;
const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

const COLORS = {
    bg: '#0a0a0f',
    card: '#1a1a24',
    cardLight: '#252532',
    accent: '#ffc857',
    text: '#f0f0f0',
    textDim: '#8a8a9a',
    success: '#4ecdc4',
};

// GECELİK DİNLENME EKRANI
export const RestScreen = ({ onRest, energy, onClose }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();

        // Pulse animation for moon
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.1, duration: 2000, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={[styles.restContainer, { opacity: fadeAnim }]}>
            <Animated.Text style={[styles.restEmoji, { transform: [{ scale: pulseAnim }] }]}>
                🌙
            </Animated.Text>
            <Text style={styles.restTitle}>Yoruldun...</Text>
            <Text style={styles.restSubtitle}>Enerji: %{Math.round(energy)}</Text>
            <Text style={styles.restDesc}>
                Uzun bir gündü. Eve git ve dinlen.{'\n'}
                Yarın yeni hikayeler seni bekliyor.
            </Text>

            <View style={styles.restStats}>
                <View style={styles.restStatItem}>
                    <Text style={styles.restStatEmoji}>🛏️</Text>
                    <Text style={styles.restStatLabel}>Eve Git</Text>
                </View>
                <View style={styles.restStatItem}>
                    <Text style={styles.restStatEmoji}>⏰</Text>
                    <Text style={styles.restStatLabel}>Sabah 08:00</Text>
                </View>
                <View style={styles.restStatItem}>
                    <Text style={styles.restStatEmoji}>⚡</Text>
                    <Text style={styles.restStatLabel}>%100 Enerji</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.restBtn} onPress={onRest} activeOpacity={0.8}>
                <Text style={styles.restBtnText}>UYKUYA YAT 💤</Text>
            </TouchableOpacity>

            {energy > 20 && (
                <TouchableOpacity style={styles.continueBtn} onPress={onClose} activeOpacity={0.7}>
                    <Text style={styles.continueBtnText}>Biraz daha dayanabilirim</Text>
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

// BENZİN DOLDURMA EKRANI
export const FuelScreen = ({ fuel, money, onRefuel, onClose }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const FUEL_COST = 500;

    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, []);

    const canAfford = money >= FUEL_COST;

    return (
        <Animated.View style={[styles.fuelContainer, { opacity: fadeAnim }]}>
            <Text style={styles.fuelEmoji}>⛽</Text>
            <Text style={styles.fuelTitle}>Benzin Bitmek Üzere!</Text>
            <Text style={styles.fuelSubtitle}>Depo: %{Math.round(fuel)}</Text>

            <View style={styles.fuelGauge}>
                <View style={[styles.fuelBar, { width: `${fuel}%` }]} />
            </View>

            <View style={styles.fuelCard}>
                <Text style={styles.fuelLabel}>DEPO DOLDUR</Text>
                <Text style={styles.fuelPrice}>₺{FUEL_COST}</Text>
                <TouchableOpacity
                    style={[styles.fuelBtn, !canAfford && styles.fuelBtnDisabled]}
                    onPress={() => canAfford && onRefuel(FUEL_COST)}
                    disabled={!canAfford}
                    activeOpacity={0.8}
                >
                    <Text style={styles.fuelBtnText}>
                        {canAfford ? 'DOLDUR ⛽' : 'YETERSİZ BAKİYE'}
                    </Text>
                </TouchableOpacity>
            </View>

            {fuel > 15 && (
                <TouchableOpacity style={styles.skipFuelBtn} onPress={onClose} activeOpacity={0.7}>
                    <Text style={styles.skipFuelText}>Sonra doldururum</Text>
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

// MOLA EKRANI (ÇAY/KAHVE)
export const BreakScreen = ({ onBreak, energy, money, onClose }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, []);

    const TEA_COST = 25;
    const COFFEE_COST = 40;

    return (
        <Animated.View style={[styles.breakContainer, { opacity: fadeAnim }]}>
            <Text style={styles.breakEmoji}>☕</Text>
            <Text style={styles.breakTitle}>Durak Molası</Text>
            <Text style={styles.breakSubtitle}>Enerji: %{Math.round(energy)}</Text>

            <View style={styles.breakOptions}>
                <TouchableOpacity
                    style={styles.breakOption}
                    onPress={() => money >= TEA_COST && onBreak('tea', TEA_COST)}
                    disabled={money < TEA_COST}
                    activeOpacity={0.8}
                >
                    <Image source={TEA_IMAGE} style={styles.breakOptionImage} resizeMode="contain" />
                    <Text style={styles.breakOptionName}>Çay</Text>
                    <Text style={styles.breakOptionEffect}>+15 Enerji</Text>
                    <Text style={styles.breakOptionPrice}>₺{TEA_COST}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.breakOption}
                    onPress={() => money >= COFFEE_COST && onBreak('coffee', COFFEE_COST)}
                    disabled={money < COFFEE_COST}
                    activeOpacity={0.8}
                >
                    <Image source={COFFEE_IMAGE} style={styles.breakOptionImage} resizeMode="contain" />
                    <Text style={styles.breakOptionName}>Kahve</Text>
                    <Text style={styles.breakOptionEffect}>+25 Enerji</Text>
                    <Text style={styles.breakOptionPrice}>₺{COFFEE_COST}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.skipBreakBtn} onPress={onClose} activeOpacity={0.7}>
                <Text style={styles.skipBreakText}>Devam Et</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    // REST SCREEN
    restContainer: {
        flex: 1,
        backgroundColor: '#0a0a1a',
        justifyContent: 'center',
        alignItems: 'center',
        padding: normalize(24),
    },
    restEmoji: {
        fontSize: normalize(80),
        marginBottom: normalize(24),
    },
    restTitle: {
        fontSize: normalize(32),
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: normalize(8),
    },
    restSubtitle: {
        fontSize: normalize(16),
        color: COLORS.accent,
        marginBottom: normalize(16),
    },
    restDesc: {
        fontSize: normalize(14),
        color: COLORS.textDim,
        textAlign: 'center',
        lineHeight: normalize(22),
        marginBottom: normalize(32),
    },
    restStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: normalize(32),
    },
    restStatItem: {
        alignItems: 'center',
    },
    restStatEmoji: {
        fontSize: normalize(28),
        marginBottom: normalize(4),
    },
    restStatLabel: {
        fontSize: normalize(11),
        color: COLORS.textDim,
    },
    restBtn: {
        backgroundColor: COLORS.accent,
        paddingVertical: normalize(16),
        paddingHorizontal: normalize(48),
        borderRadius: normalize(12),
        marginBottom: normalize(16),
    },
    restBtnText: {
        fontSize: normalize(16),
        fontWeight: '700',
        color: COLORS.bg,
    },
    continueBtn: {
        padding: normalize(12),
    },
    continueBtnText: {
        color: COLORS.textDim,
        fontSize: normalize(13),
    },

    // FUEL SCREEN
    fuelContainer: {
        flex: 1,
        backgroundColor: COLORS.bg,
        justifyContent: 'center',
        alignItems: 'center',
        padding: normalize(24),
    },
    fuelEmoji: {
        fontSize: normalize(64),
        marginBottom: normalize(16),
    },
    fuelTitle: {
        fontSize: normalize(24),
        fontWeight: '700',
        color: '#ff6b6b',
        marginBottom: normalize(8),
    },
    fuelSubtitle: {
        fontSize: normalize(16),
        color: COLORS.textDim,
        marginBottom: normalize(24),
    },
    fuelGauge: {
        width: '80%',
        height: normalize(20),
        backgroundColor: COLORS.card,
        borderRadius: normalize(10),
        overflow: 'hidden',
        marginBottom: normalize(32),
    },
    fuelBar: {
        height: '100%',
        backgroundColor: '#ff6b6b',
        borderRadius: normalize(10),
    },
    fuelCard: {
        backgroundColor: COLORS.card,
        padding: normalize(24),
        borderRadius: normalize(16),
        alignItems: 'center',
        width: '100%',
    },
    fuelLabel: {
        fontSize: normalize(12),
        color: COLORS.textDim,
        letterSpacing: 2,
        marginBottom: normalize(8),
    },
    fuelPrice: {
        fontSize: normalize(32),
        fontWeight: '700',
        color: COLORS.accent,
        marginBottom: normalize(16),
    },
    fuelBtn: {
        backgroundColor: COLORS.success,
        paddingVertical: normalize(14),
        paddingHorizontal: normalize(40),
        borderRadius: normalize(10),
    },
    fuelBtnDisabled: {
        backgroundColor: COLORS.cardLight,
    },
    fuelBtnText: {
        fontSize: normalize(14),
        fontWeight: '700',
        color: COLORS.bg,
    },
    skipFuelBtn: {
        marginTop: normalize(24),
        padding: normalize(12),
    },
    skipFuelText: {
        color: COLORS.textDim,
        fontSize: normalize(13),
    },

    // BREAK SCREEN
    breakContainer: {
        flex: 1,
        backgroundColor: COLORS.bg,
        justifyContent: 'center',
        alignItems: 'center',
        padding: normalize(24),
    },
    breakEmoji: {
        fontSize: normalize(56),
        marginBottom: normalize(16),
    },
    breakTitle: {
        fontSize: normalize(24),
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: normalize(8),
    },
    breakSubtitle: {
        fontSize: normalize(16),
        color: COLORS.accent,
        marginBottom: normalize(32),
    },
    breakOptions: {
        flexDirection: 'row',
        gap: normalize(16),
        marginBottom: normalize(24),
    },
    breakOption: {
        backgroundColor: COLORS.card,
        padding: normalize(20),
        borderRadius: normalize(16),
        alignItems: 'center',
        width: normalize(140),
    },
    breakOptionEmoji: {
        fontSize: normalize(40),
        marginBottom: normalize(8),
    },
    breakOptionImage: {
        width: normalize(70),
        height: normalize(70),
        marginBottom: normalize(8),
    },
    breakOptionName: {
        fontSize: normalize(18),
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: normalize(4),
    },
    breakOptionEffect: {
        fontSize: normalize(12),
        color: COLORS.success,
        marginBottom: normalize(8),
    },
    breakOptionPrice: {
        fontSize: normalize(16),
        fontWeight: '700',
        color: COLORS.accent,
    },
    skipBreakBtn: {
        backgroundColor: COLORS.cardLight,
        paddingVertical: normalize(14),
        paddingHorizontal: normalize(40),
        borderRadius: normalize(10),
    },
    skipBreakText: {
        color: COLORS.text,
        fontSize: normalize(14),
        fontWeight: '600',
    },
});

export default { RestScreen, FuelScreen, BreakScreen };
