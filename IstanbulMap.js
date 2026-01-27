// TAKSİCİ - İstanbul Harita Navigasyon Sistemi
// GTA 2 Tarzı Top-Down Harita ile Animasyonlu Taksi

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    Dimensions,
    TouchableOpacity,
    PixelRatio,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive scaling
const baseWidth = 375;
const scale = SCREEN_WIDTH / baseWidth;
const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

// Harita görseli oranları (jpg dosyası boyutuna göre ayarlanacak)
const MAP_WIDTH = SCREEN_WIDTH;
const MAP_HEIGHT = SCREEN_HEIGHT;

// İstanbul semtleri - harita üzerindeki koordinatlar (yüzde cinsinden)
// Haritadaki etiketlere göre düzeltildi
const ISTANBUL_LOCATIONS = {
    // AVRUPA YAKASI
    'Sarıyer': { x: 0.40, y: 0.05, side: 'europe' },
    'Bebek': { x: 0.45, y: 0.15, side: 'europe' },
    'Levent': { x: 0.35, y: 0.18, side: 'europe' },
    'Nişantaşı': { x: 0.30, y: 0.28, side: 'europe' },
    'Şişli': { x: 0.25, y: 0.25, side: 'europe' },
    'Beşiktaş': { x: 0.40, y: 0.30, side: 'europe' },
    'Taksim': { x: 0.32, y: 0.36, side: 'europe' },
    'Beyoğlu': { x: 0.28, y: 0.40, side: 'europe' },
    'Fatih': { x: 0.22, y: 0.48, side: 'europe' },
    'Eminönü': { x: 0.32, y: 0.50, side: 'europe' },
    'Bakırköy': { x: 0.10, y: 0.60, side: 'europe' },
    'Zeytinburnu': { x: 0.15, y: 0.55, side: 'europe' },
    'Esenler': { x: 0.12, y: 0.40, side: 'europe' },
    'Bağcılar': { x: 0.08, y: 0.45, side: 'europe' },

    // ANADOLU YAKASI
    'Üsküdar': { x: 0.60, y: 0.40, side: 'asia' }, // Köprünün hemen altı
    'Çamlıca': { x: 0.75, y: 0.35, side: 'asia' },
    'Kadıköy': { x: 0.65, y: 0.65, side: 'asia' }, // Daha aşağıda (Güney)
    'Ataşehir': { x: 0.80, y: 0.50, side: 'asia' },
    'Pendik': { x: 0.85, y: 0.75, side: 'asia' },

    // Özel
    'Havalimanı': { x: 0.05, y: 0.60, side: 'europe' },
    'Sultanahmet': { x: 0.35, y: 0.52, side: 'europe' },
};

// Yol düğümleri (Kavşaklar)
const EUROPE_ROAD_NODES = {
    'besiktas_sahil': { x: 0.42, y: 0.28 },
    'taksim_meydan': { x: 0.32, y: 0.36 },
    'eminonu_sahil': { x: 0.32, y: 0.50 },
    'karakoy': { x: 0.32, y: 0.44 },
    'halic_koprusu': { x: 0.25, y: 0.42 },
};

const ASIA_ROAD_NODES = {
    'beylerbeyi': { x: 0.60, y: 0.30 },
    'uskudar_sahil': { x: 0.60, y: 0.42 },
    'harem': { x: 0.60, y: 0.50 },         // Kilit nokta: Kadıköy'e giderken buradan geçmeli
    'altunizade': { x: 0.65, y: 0.40 },
    'uzuncayir': { x: 0.70, y: 0.55 },
    'kadikoy_rihtim': { x: 0.65, y: 0.62 },
};

// Köprüler
const BRIDGES = {
    'fsm': {
        europe: { x: 0.44, y: 0.15 },
        middle: { x: 0.50, y: 0.16 }, // Daha kavisli
        asia: { x: 0.56, y: 0.17 },
    },
    '15july': {
        europe: { x: 0.45, y: 0.34 }, // Ortaköy
        middle: { x: 0.52, y: 0.35 },
        asia: { x: 0.58, y: 0.36 },   // Beylerbeyi
    },
};

const getSide = (location) => {
    const loc = ISTANBUL_LOCATIONS[location];
    if (!loc) return 'europe';
    return loc.side || (loc.x > 0.50 ? 'asia' : 'europe');
};

const calculatePath = (from, to) => {
    const fromLoc = ISTANBUL_LOCATIONS[from] || ISTANBUL_LOCATIONS['Taksim'];
    const toLoc = ISTANBUL_LOCATIONS[to] || ISTANBUL_LOCATIONS['Kadıköy'];

    const fromSide = getSide(from);
    const toSide = getSide(to);

    const path = [fromLoc];

    // ARA NOKTALAR (WAYPOINTS)
    // Avrupa Sahil Hattı: Sarıyer -> Bebek -> Beşiktaş -> Karaköy -> Eminönü -> (Zeytinburnu)

    // --- YAKA DEĞİŞTİRME MEVCUTSA (KÖPRÜ KULLANIMI) ---
    if (fromSide !== toSide) {
        // Hangi köprü? (Kuzeydeki noktalar için FSM, Güney için 15 Temmuz)
        const useFSM = fromLoc.y < 0.20 || toLoc.y < 0.20;
        const bridge = useFSM ? BRIDGES.fsm : BRIDGES['15july'];

        // KÖPRÜYE GİDİŞ
        if (fromSide === 'europe') {
            // Avrupa'dan Köprüye çıkış
            if (!useFSM) {
                // Beşiktaş sapağına uğra (sahil yolundan geliyorsa)
                if (fromLoc.y > 0.25) path.push(EUROPE_ROAD_NODES.besiktas_sahil);
            }
            path.push(bridge.europe);
        } else {
            // Asya'dan Köprüye çıkış
            if (!useFSM) {
                // E-5 bağlantısı veya sahil
                if (fromLoc.y > 0.35) path.push(ASIA_ROAD_NODES.altunizade);
            }
            path.push(bridge.asia);
        }

        // KÖPRÜ GEÇİŞİ
        path.push(bridge.middle);

        // KÖPRÜDEN İNİŞ
        if (toSide === 'europe') {
            path.push(bridge.europe);
            if (!useFSM) {
                // Beşiktaş sapağı
                path.push(EUROPE_ROAD_NODES.besiktas_sahil);
                // Hedef Eminönü/Fatih tarafıysa Karaköy'den geçir
                if (toLoc.y > 0.40) {
                    path.push(EUROPE_ROAD_NODES.karakoy);
                    if (toLoc.y > 0.48) path.push(EUROPE_ROAD_NODES.eminonu_sahil);
                }
            }
        } else {
            path.push(bridge.asia);
            if (!useFSM) {
                // Altunizade sapağı
                path.push(ASIA_ROAD_NODES.altunizade);
                // Hedef Kadıköy/Üsküdar ise yönlendir
                if (toLoc.y > 0.50) {
                    path.push(ASIA_ROAD_NODES.harem); // Harem üzerinden Kadıköy
                } else if (toLoc.y > 0.40) {
                    path.push(ASIA_ROAD_NODES.uskudar_sahil);
                }
            }
        }
    }
    // --- AYNI YAKA İÇİ ---
    else {
        if (fromSide === 'europe') {
            // Avrupa Sahil Hattı Kontrolü (Yukarıdan Aşağı)
            // Sarıyer (0.05) -> Beşiktaş (0.30) -> Eminönü (0.50)

            // Kuzeyden Güneye İniş (veya tam tersi)
            const minY = Math.min(fromLoc.y, toLoc.y);
            const maxY = Math.max(fromLoc.y, toLoc.y);

            if (minY < 0.25 && maxY > 0.35) {
                // Sarıyer/Bebek hattından merkeze iniyorsa Beşiktaş'a uğrasın
                path.push(EUROPE_ROAD_NODES.besiktas_sahil);
            }

            // Beşiktaş/Taksim -> Eminönü/Zeytinburnu hattı (Haliç geçişi veya sahil)
            if (maxY > 0.42 && minY < 0.42) {
                // Karaköy zorunlu istikamet (Haliç ağzı)
                path.push(EUROPE_ROAD_NODES.karakoy);
                // Eğer Haliç'in öbür tarafına geçiyorsa (Eminönü, Fatih, Zeytinburnu)
                if ((fromLoc.y > 0.45 || toLoc.y > 0.45) && (fromLoc.x < 0.30 || toLoc.x < 0.30)) {
                    // Galata Köprüsü temsili geçiş
                    path.push(EUROPE_ROAD_NODES.eminonu_sahil);
                }
            }
        } else {
            // Asya Sahil Hattı
            // Beykoz -> Üsküdar -> Kadıköy
            const minY = Math.min(fromLoc.y, toLoc.y);
            const maxY = Math.max(fromLoc.y, toLoc.y);

            // Üsküdar (0.40) civarından geçiş
            if (minY < 0.45 && maxY > 0.55) {
                path.push(ASIA_ROAD_NODES.uskudar_sahil);
                path.push(ASIA_ROAD_NODES.harem);
            }
        }
    }

    path.push(toLoc);
    return path;
};

// Ana bileşen
export const IstanbulMap = ({
    fromLocation = 'Taksim',
    toLocation = 'Kadıköy',
    passengerName = '',
    onAnimationComplete,
    onSkip,
}) => {
    const [isAnimating, setIsAnimating] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentSegment, setCurrentSegment] = useState(0);
    const [showSkipButton, setShowSkipButton] = useState(false);

    const taxiPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const taxiRotation = useRef(new Animated.Value(0)).current;
    const pathProgress = useRef(new Animated.Value(0)).current;

    const path = useRef(calculatePath(fromLocation, toLocation)).current;

    // Mesafeye göre süre hesapla (min 20sn)
    const calculateDuration = useCallback(() => {
        let totalDistance = 0;
        for (let i = 0; i < path.length - 1; i++) {
            const dx = path[i + 1].x - path[i].x;
            const dy = path[i + 1].y - path[i].y;
            totalDistance += Math.sqrt(dx * dx + dy * dy);
        }
        // Min 20sn, max 35sn
        const duration = Math.max(20000, Math.min(35000, totalDistance * 80000));
        return duration;
    }, [path]);

    const isCompleted = useRef(false); // Çifte tetiklemeyi önlemek için

    useEffect(() => {
        // İlk pozisyonu ayarla
        const startPos = path[0];
        taxiPosition.setValue({
            x: startPos.x * MAP_WIDTH,
            y: startPos.y * MAP_HEIGHT,
        });

        // 3 saniye sonra skip butonu göster
        const skipTimer = setTimeout(() => {
            setShowSkipButton(true);
        }, 3000);

        // Animasyonu başlat
        const totalDuration = calculateDuration();
        const segmentDurations = [];

        // Her segment için süre hesapla
        let totalDist = 0;
        for (let i = 0; i < path.length - 1; i++) {
            const dx = path[i + 1].x - path[i].x;
            const dy = path[i + 1].y - path[i].y;
            totalDist += Math.sqrt(dx * dx + dy * dy);
        }

        let accumulatedDist = 0;
        for (let i = 0; i < path.length - 1; i++) {
            const dx = path[i + 1].x - path[i].x;
            const dy = path[i + 1].y - path[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            segmentDurations.push((dist / totalDist) * totalDuration);
            accumulatedDist += dist;
        }

        // Segment animasyonlarını sırayla çalıştır
        const animateSegment = (segmentIndex) => {
            if (isCompleted.current) return; // Eğer tamamlandıysa dur (Skip basıldıysa vs)

            if (segmentIndex >= path.length - 1) {
                // Animasyon bitti
                if (!isCompleted.current) {
                    isCompleted.current = true;
                    setIsAnimating(false);
                    setTimeout(() => {
                        onAnimationComplete?.();
                    }, 500);
                }
                return;
            }

            setCurrentSegment(segmentIndex);

            const fromPoint = path[segmentIndex];
            const toPoint = path[segmentIndex + 1];

            // Rotasyonu hesapla
            const angle = Math.atan2(
                toPoint.y - fromPoint.y,
                toPoint.x - fromPoint.x
            ) * (180 / Math.PI);

            // Rotasyonu animasyonla değiştir
            Animated.timing(taxiRotation, {
                toValue: angle,
                duration: 300,
                useNativeDriver: true,
            }).start();

            // Pozisyonu animasyonla değiştir
            Animated.timing(taxiPosition, {
                toValue: {
                    x: toPoint.x * MAP_WIDTH,
                    y: toPoint.y * MAP_HEIGHT,
                },
                duration: segmentDurations[segmentIndex],
                useNativeDriver: true,
            }).start(({ finished }) => {
                // Eğer animasyon skip ile kesildiyse devam etme
                if (finished && !isCompleted.current) {
                    // Progress güncelle
                    setProgress((segmentIndex + 1) / (path.length - 1));
                    // Sonraki segmente geç
                    animateSegment(segmentIndex + 1);
                }
            });
        };

        // Animasyonu başlat
        animateSegment(0);

        // Progress animasyonu
        Animated.timing(pathProgress, {
            toValue: 1,
            duration: totalDuration,
            useNativeDriver: false,
        }).start();

        return () => {
            clearTimeout(skipTimer);
            isCompleted.current = true; // Unmount olursa durdur
        };
    }, []);

    const handleSkip = () => {
        if (!isCompleted.current) {
            isCompleted.current = true;
            setIsAnimating(false);
            taxiPosition.stopAnimation(); // Mevcut animasyonu durdur
            onSkip?.();
            onAnimationComplete?.();
        }
    };

    // Rotasyon interpolasyonu
    const rotateInterpolate = taxiRotation.interpolate({
        inputRange: [-180, 180],
        outputRange: ['-180deg', '180deg'],
    });

    return (
        <View style={styles.container}>
            {/* Harita Görseli */}
            <Image
                source={require('./assets/istanbul_map.jpg')}
                style={styles.mapImage}
                resizeMode="cover"
            />

            {/* Karartma overlay */}
            <View style={styles.darkOverlay} />

            {/* Başlangıç noktası işareti */}
            <View style={[
                styles.locationMarker,
                styles.startMarker,
                {
                    left: path[0].x * MAP_WIDTH - 15,
                    top: path[0].y * MAP_HEIGHT - 15,
                }
            ]}>
                <Text style={styles.markerEmoji}>📍</Text>
            </View>

            {/* Bitiş noktası işareti */}
            <View style={[
                styles.locationMarker,
                styles.endMarker,
                {
                    left: path[path.length - 1].x * MAP_WIDTH - 15,
                    top: path[path.length - 1].y * MAP_HEIGHT - 15,
                }
            ]}>
                <Text style={styles.markerEmoji}>🎯</Text>
            </View>

            {/* Taksi */}
            <Animated.View
                style={[
                    styles.taxiContainer,
                    {
                        transform: [
                            { translateX: Animated.subtract(taxiPosition.x, 20) },
                            { translateY: Animated.subtract(taxiPosition.y, 20) },
                            { rotate: rotateInterpolate },
                        ],
                    },
                ]}
            >
                <View style={styles.taxi}>
                    <Text style={styles.taxiEmoji}>🚕</Text>
                </View>
            </Animated.View>

            {/* Üst Bilgi Paneli */}
            <View style={styles.infoPanel}>
                <View style={styles.infoPanelContent}>
                    <Text style={styles.routeTitle}>🚕 YOLCULUK</Text>
                    <Text style={styles.routeText}>
                        {fromLocation} → {toLocation}
                    </Text>
                    {passengerName && (
                        <Text style={styles.passengerText}>
                            Yolcu: {passengerName}
                        </Text>
                    )}
                </View>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressBg}>
                        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                    </View>
                    <Text style={styles.progressText}>
                        {Math.round(progress * 100)}%
                    </Text>
                </View>
            </View>

            {/* Skip Butonu */}
            {showSkipButton && (
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={handleSkip}
                    activeOpacity={0.7}
                >
                    <Text style={styles.skipText}>⏭️ ATLA</Text>
                </TouchableOpacity>
            )}

            {/* Alt Durum */}
            <View style={styles.statusBar}>
                <Text style={styles.statusText}>
                    {isAnimating ? '🚦 Yolda...' : '✅ Vardık!'}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0f',
    },
    mapImage: {
        position: 'absolute',
        width: MAP_WIDTH,
        height: MAP_HEIGHT,
        top: 0,
        left: 0,
    },
    darkOverlay: {
        position: 'absolute',
        width: MAP_WIDTH,
        height: MAP_HEIGHT,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    locationMarker: {
        position: 'absolute',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    startMarker: {
        opacity: 0.8,
    },
    endMarker: {
        opacity: 1,
    },
    markerEmoji: {
        fontSize: normalize(24),
    },
    taxiContainer: {
        position: 'absolute',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    taxi: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 200, 0, 0.3)',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ffc800',
    },
    taxiEmoji: {
        fontSize: normalize(28),
    },
    infoPanel: {
        position: 'absolute',
        top: normalize(50),
        left: normalize(16),
        right: normalize(16),
        backgroundColor: 'rgba(20, 25, 35, 0.95)',
        borderRadius: normalize(16),
        padding: normalize(16),
        borderWidth: 1,
        borderColor: 'rgba(255, 200, 0, 0.3)',
    },
    infoPanelContent: {
        marginBottom: normalize(12),
    },
    routeTitle: {
        fontSize: normalize(14),
        color: '#ffc800',
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: normalize(4),
    },
    routeText: {
        fontSize: normalize(18),
        color: '#ffffff',
        fontWeight: '700',
    },
    passengerText: {
        fontSize: normalize(13),
        color: '#8a8a9a',
        marginTop: normalize(4),
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(10),
    },
    progressBg: {
        flex: 1,
        height: normalize(8),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: normalize(4),
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#ffc800',
        borderRadius: normalize(4),
    },
    progressText: {
        fontSize: normalize(12),
        color: '#ffc800',
        fontWeight: '700',
        width: normalize(40),
        textAlign: 'right',
    },
    skipButton: {
        position: 'absolute',
        bottom: normalize(100),
        right: normalize(20),
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: normalize(20),
        paddingVertical: normalize(12),
        borderRadius: normalize(25),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    skipText: {
        fontSize: normalize(14),
        color: '#ffffff',
        fontWeight: '600',
    },
    statusBar: {
        position: 'absolute',
        bottom: normalize(40),
        left: normalize(16),
        right: normalize(16),
        backgroundColor: 'rgba(20, 25, 35, 0.9)',
        borderRadius: normalize(12),
        padding: normalize(12),
        alignItems: 'center',
    },
    statusText: {
        fontSize: normalize(16),
        color: '#ffffff',
        fontWeight: '600',
    },
});

export default IstanbulMap;
