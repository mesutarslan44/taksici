// TAKSİDUR - Müşteri Seçme Uygulaması
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, Dimensions, ScrollView, PixelRatio } from 'react-native';
import { PASSENGERS } from './passengers';
import { IstanbulMap } from './IstanbulMap';

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
    danger: '#ff6b6b',
    success: '#4ecdc4',
    appBg: '#1a1f2e',
    appAccent: '#00d4aa',
};

export const TaksiDurApp = ({
    completedStories = [],
    onSelectPassenger,
    onClose,
    dayTime = 'morning',
    hour = 8,
    lastTaxiLocation = 'Taksim', // Son taksi konumu
}) => {
    const [candidates, setCandidates] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [selectedPassenger, setSelectedPassenger] = useState(null);
    const [taxiLocation, setTaxiLocation] = useState(lastTaxiLocation);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        generateCandidates();
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, []);

    // Mevcut saate uygun yolcuları filtrele
    const generateCandidates = () => {
        const available = PASSENGERS.filter(p => !completedStories.includes(p.id));

        // Saate göre filtrele (yaklaşık)
        const hourFiltered = available.filter(p => {
            const passengerHour = parseInt(p.time?.split(':')[0] || '12');
            const diff = Math.abs(passengerHour - hour);
            return diff <= 4 || diff >= 20; // 4 saat tolerans
        });

        // Rastgele 3 tane seç
        const shuffled = (hourFiltered.length >= 3 ? hourFiltered : available)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        // Her birine rastgele puan ve mesafe ekle
        const withMeta = shuffled.map(p => ({
            ...p,
            rating: (3 + Math.random() * 2).toFixed(1),
            distance: (1 + Math.random() * 10).toFixed(1),
            estimatedEarning: Math.floor(50 + Math.random() * 200),
        }));

        setCandidates(withMeta);
    };

    // Yolcu seçildiğinde haritayı göster
    const handleSelect = (passenger) => {
        setSelectedPassenger(passenger);
        setShowMap(true);
    };

    // Harita animasyonu tamamlandığında
    const handleMapComplete = () => {
        if (selectedPassenger) {
            // Taksi konumunu güncelle
            setTaxiLocation(selectedPassenger.location);
            // Hikayeye geç
            Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
                onSelectPassenger(selectedPassenger);
            });
        }
    };

    // Harita atlandığında
    const handleMapSkip = () => {
        if (selectedPassenger) {
            setTaxiLocation(selectedPassenger.location);
        }
    };

    const handleRefresh = () => {
        slideAnim.setValue(50);
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
        generateCandidates();
    };

    const renderPassengerCard = (passenger, index) => {
        const isLowRating = parseFloat(passenger.rating) < 4;

        return (
            <Animated.View
                key={passenger.id}
                style={[
                    styles.passengerCard,
                    {
                        transform: [{ translateY: slideAnim }],
                        opacity: fadeAnim,
                    }
                ]}
            >
                <View style={styles.cardHeader}>
                    {passenger.image ? (
                        <Image source={passenger.image} style={styles.avatar} resizeMode="cover" />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarEmoji}>{passenger.avatar}</Text>
                        </View>
                    )}
                    <View style={styles.cardInfo}>
                        <Text style={styles.passengerName}>{passenger.name}</Text>
                        <View style={styles.ratingRow}>
                            <Text style={[styles.rating, isLowRating && styles.ratingLow]}>
                                ⭐ {passenger.rating}
                            </Text>
                            <Text style={styles.distance}>📍 {passenger.distance} km</Text>
                        </View>
                    </View>
                    <View style={styles.earningBox}>
                        <Text style={styles.earningLabel}>TAHMİNİ</Text>
                        <Text style={styles.earningValue}>₺{passenger.estimatedEarning}</Text>
                    </View>
                </View>

                <View style={styles.cardMeta}>
                    <Text style={styles.locationText}>🚩 {passenger.location}</Text>
                    <Text style={styles.timeText}>🕐 {passenger.time}</Text>
                </View>

                {isLowRating && (
                    <View style={styles.warningBadge}>
                        <Text style={styles.warningText}>⚠️ Düşük Puan - Riskli Olabilir</Text>
                    </View>
                )}

                <View style={styles.cardActions}>
                    <TouchableOpacity
                        style={styles.rejectBtn}
                        onPress={handleRefresh}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.rejectText}>❌ PAS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.acceptBtn}
                        onPress={() => handleSelect(passenger)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.acceptText}>✓ KABUL</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    };

    // Harita gösteriliyorsa
    if (showMap && selectedPassenger) {
        return (
            <IstanbulMap
                fromLocation={taxiLocation}
                toLocation={selectedPassenger.location}
                passengerName={selectedPassenger.name}
                onAnimationComplete={handleMapComplete}
                onSkip={handleMapSkip}
            />
        );
    }

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.appLogo}>
                    <Text style={styles.logoIcon}>🚕</Text>
                    <Text style={styles.logoText}>TaksiDur</Text>
                </View>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Text style={styles.closeBtnText}>✕</Text>
                </TouchableOpacity>
            </View>

            {/* Mevcut Konum Göstergesi */}
            <View style={styles.locationIndicator}>
                <Text style={styles.locationLabel}>📍 Mevcut Konum:</Text>
                <Text style={styles.locationValue}>{taxiLocation}</Text>
            </View>

            {/* Subtitle */}
            <Text style={styles.subtitle}>Yakınlardaki Yolcular</Text>

            {/* Passenger Cards - Scrollable */}
            <ScrollView
                style={styles.cardsScrollView}
                contentContainerStyle={styles.cardsContainer}
                showsVerticalScrollIndicator={false}
            >
                {candidates.length > 0 ? (
                    candidates.map((p, i) => renderPassengerCard(p, i))
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>😴</Text>
                        <Text style={styles.emptyText}>Şu an müşteri yok</Text>
                        <Text style={styles.emptySubtext}>Biraz bekle veya mola ver</Text>
                    </View>
                )}
            </ScrollView>

            {/* Footer - Fixed at bottom */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.refreshBtn} onPress={handleRefresh}>
                    <Text style={styles.refreshText}>🔄 YENİLE</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.appBg,
        padding: normalize(16),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: normalize(16),
        paddingTop: normalize(8),
    },
    appLogo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        fontSize: normalize(28),
        marginRight: normalize(8),
    },
    logoText: {
        fontSize: normalize(24),
        fontWeight: '800',
        color: COLORS.appAccent,
        letterSpacing: 1,
    },
    closeBtn: {
        width: normalize(36),
        height: normalize(36),
        borderRadius: normalize(18),
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtnText: {
        color: COLORS.textDim,
        fontSize: normalize(18),
    },
    locationIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 212, 170, 0.15)',
        paddingHorizontal: normalize(12),
        paddingVertical: normalize(8),
        borderRadius: normalize(8),
        marginBottom: normalize(12),
        borderWidth: 1,
        borderColor: 'rgba(0, 212, 170, 0.3)',
    },
    locationLabel: {
        fontSize: normalize(12),
        color: COLORS.textDim,
        marginRight: normalize(8),
    },
    locationValue: {
        fontSize: normalize(14),
        color: COLORS.appAccent,
        fontWeight: '700',
    },
    subtitle: {
        color: COLORS.textDim,
        fontSize: normalize(14),
        marginBottom: normalize(12),
        letterSpacing: 1,
    },
    cardsScrollView: {
        flex: 1,
    },
    cardsContainer: {
        gap: normalize(10),
        paddingBottom: normalize(8),
    },
    passengerCard: {
        backgroundColor: COLORS.card,
        borderRadius: normalize(14),
        padding: normalize(12),
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalize(8),
    },
    avatar: {
        width: normalize(48),
        height: normalize(48),
        borderRadius: normalize(24),
        marginRight: normalize(10),
        borderWidth: 2,
        borderColor: COLORS.appAccent,
    },
    avatarPlaceholder: {
        width: normalize(48),
        height: normalize(48),
        borderRadius: normalize(24),
        marginRight: normalize(10),
        backgroundColor: COLORS.cardLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarEmoji: {
        fontSize: normalize(28),
    },
    cardInfo: {
        flex: 1,
    },
    passengerName: {
        fontSize: normalize(16),
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: normalize(4),
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(12),
    },
    rating: {
        fontSize: normalize(13),
        color: COLORS.accent,
        fontWeight: '600',
    },
    ratingLow: {
        color: COLORS.danger,
    },
    distance: {
        fontSize: normalize(12),
        color: COLORS.textDim,
    },
    earningBox: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 212, 170, 0.15)',
        paddingHorizontal: normalize(12),
        paddingVertical: normalize(6),
        borderRadius: normalize(8),
    },
    earningLabel: {
        fontSize: normalize(8),
        color: COLORS.textDim,
        letterSpacing: 1,
    },
    earningValue: {
        fontSize: normalize(16),
        fontWeight: '800',
        color: COLORS.appAccent,
    },
    cardMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: normalize(12),
        paddingTop: normalize(8),
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    locationText: {
        fontSize: normalize(12),
        color: COLORS.textDim,
    },
    timeText: {
        fontSize: normalize(12),
        color: COLORS.accent,
    },
    warningBadge: {
        backgroundColor: 'rgba(255, 107, 107, 0.15)',
        padding: normalize(8),
        borderRadius: normalize(8),
        marginBottom: normalize(12),
    },
    warningText: {
        color: COLORS.danger,
        fontSize: normalize(11),
        textAlign: 'center',
        fontWeight: '600',
    },
    cardActions: {
        flexDirection: 'row',
        gap: normalize(12),
    },
    rejectBtn: {
        flex: 1,
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        padding: normalize(12),
        borderRadius: normalize(10),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 107, 0.3)',
    },
    rejectText: {
        color: COLORS.danger,
        fontWeight: '700',
        fontSize: normalize(13),
    },
    acceptBtn: {
        flex: 2,
        backgroundColor: COLORS.appAccent,
        padding: normalize(12),
        borderRadius: normalize(10),
        alignItems: 'center',
    },
    acceptText: {
        color: COLORS.bg,
        fontWeight: '700',
        fontSize: normalize(13),
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyEmoji: {
        fontSize: normalize(48),
        marginBottom: normalize(12),
    },
    emptyText: {
        fontSize: normalize(18),
        color: COLORS.text,
        fontWeight: '600',
    },
    emptySubtext: {
        fontSize: normalize(13),
        color: COLORS.textDim,
        marginTop: normalize(4),
    },
    footer: {
        paddingTop: normalize(12),
    },
    refreshBtn: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: normalize(14),
        borderRadius: normalize(12),
        alignItems: 'center',
    },
    refreshText: {
        color: COLORS.text,
        fontWeight: '600',
        fontSize: normalize(14),
    },
});

export default TaksiDurApp;
