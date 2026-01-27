import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity, PixelRatio } from 'react-native';
import { SHOP_ITEMS } from './shopItems';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive scaling - normalize sizes across different devices
const scale = SCREEN_WIDTH / 375; // Base on iPhone 8 width
const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

// Dynamic interior height based on screen size
const INTERIOR_HEIGHT = Math.min(200, SCREEN_HEIGHT * 0.25);

// ============================================================
// FOTOGERÇEKÇI TAKSİ KOKPİTİ (Görsel Tabanlı)
// ============================================================

export const TaxiInterior = ({ equipped = {}, taximeterAmount = 0 }) => {
    const mirrorItem = SHOP_ITEMS.mirror.find(i => i.id === equipped.mirror) || SHOP_ITEMS.mirror[0];
    const rosaryItem = SHOP_ITEMS.rosary?.find(i => i.id === equipped.rosary) || null;
    // Taksimetre mağazadan kaldırıldı, varsayılan stil
    const taximeterItem = { id: 'taxi_old' };

    // Taksimetre Stilleri
    const getTaximeterStyle = () => {
        switch (taximeterItem.id) {
            case 'taxi_modern':
                return { bg: '#002200', text: '#00ff00', font: 'monospace', border: '#004400' };
            case 'taxi_luxury':
                return { bg: '#10101a', text: '#00ccff', font: 'sans-serif', border: '#202040' };
            default: // taxi_old
                return { bg: 'rgba(20,0,0,0.9)', text: '#ff3333', font: 'monospace', border: '#440000' };
        }
    };
    const meterStyle = getTaximeterStyle();

    return (
        <View style={styles.container}>
            {/* Ana Arka Plan Görseli */}
            <Image
                source={require('./assets/taxi_interior_bg.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            />

            {/* Dinamik Overlay: Taksimetre */}
            <View style={styles.taximeterOverlay}>
                <View style={[styles.taximeterBox, { backgroundColor: meterStyle.bg, borderColor: meterStyle.border }]}>
                    <Text style={[styles.taximeterText, { color: meterStyle.text, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' }]}>
                        ₺{taximeterAmount.toFixed(2)}
                    </Text>
                </View>
            </View>

            {/* Dinamik Overlay: Ayna Süsü (Dikdörtgen Çerçeve) */}
            {mirrorItem && (
                <View style={styles.mirrorDecorOverlay}>
                    <View style={styles.mirrorDecorFrame}>
                        {mirrorItem.image ? (
                            <Image
                                source={mirrorItem.image}
                                style={styles.mirrorDecorImage}
                                resizeMode="contain"
                            />
                        ) : (
                            <Text style={styles.mirrorDecorEmoji}>{mirrorItem.emoji}</Text>
                        )}
                    </View>
                </View>
            )}



            {/* Karartma Efekti (Alt kenarlar için) */}
            <View style={styles.bottomFade} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: INTERIOR_HEIGHT,
        borderRadius: normalize(16),
        overflow: 'hidden',
        marginBottom: normalize(16),
        backgroundColor: '#0a0a0f',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

    // Taksimetre - Üst orta (cam üstü montaj)
    taximeterOverlay: {
        position: 'absolute',
        top: normalize(2),
        left: '50%',
        marginLeft: normalize(-45),
        zIndex: 10,
    },
    taximeterBox: {
        paddingHorizontal: normalize(8),
        paddingVertical: normalize(2),
        borderRadius: normalize(4),
        borderWidth: 1,
        minWidth: normalize(70),
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    taximeterText: {
        fontWeight: 'bold',
        fontSize: normalize(12),
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
    },

    // Ayna Süsü
    mirrorDecorOverlay: {
        position: 'absolute',
        top: normalize(55),
        left: '50%',
        marginLeft: normalize(-9),
        zIndex: 10,
    },
    mirrorDecorFrame: {
        width: normalize(18),
        height: normalize(22),
        backgroundColor: 'rgba(30, 25, 20, 0.85)',
        borderRadius: normalize(2),
        borderWidth: 1,
        borderColor: '#5a4030',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    mirrorDecorImage: { width: normalize(14), height: normalize(18) },
    mirrorDecorEmoji: { fontSize: normalize(12) },

    // Koku (Scent)
    scentOverlay: {
        position: 'absolute',
        top: normalize(65),
        left: '50%',
        marginLeft: normalize(15),
        zIndex: 9,
    },
    scentEmoji: {
        fontSize: normalize(16),
        opacity: 0.9,
    },

    // Tesbih - Orta Alt (Vites Konumu)
    centerBottomOverlay: {
        position: 'absolute',
        bottom: normalize(-40),
        left: '50%',
        marginLeft: normalize(-30),
        zIndex: 20,
    },
    rosaryCentered: {
        width: normalize(60),
        height: normalize(100),
        transform: [{ rotate: '90deg' }],
    },



    bottomFade: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: normalize(30),
        backgroundColor: 'transparent',
    },
});

export default TaxiInterior;
