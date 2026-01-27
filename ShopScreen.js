import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SHOP_CATEGORIES, SHOP_ITEMS } from './shopItems';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const COLORS = {
    bg: '#0a0a0f',
    card: '#1a1a24',
    cardLight: '#252532',
    accent: '#ffc857',
    text: '#f0f0f0',
    textDim: '#8a8a9a',
    success: '#4ecdc4',
    danger: '#ff6b6b',
    gold: '#FFD700',
};

export const ShopScreen = ({ money, ownedItems, equippedItems, onBuy, onEquip, onClose }) => {
    const [selectedCategory, setSelectedCategory] = useState('mirror');

    const items = SHOP_ITEMS[selectedCategory] || [];

    const handleBuy = (item) => {
        if (money < item.price) {
            Alert.alert('Yetersiz Bakiye', `Bu ürün için ₺${item.price - money} daha lazım.`);
            return;
        }
        Alert.alert(
            'Satın Al',
            `${item.name} - ₺${item.price}\n\nSatın almak istiyor musun?`,
            [
                { text: 'Vazgeç', style: 'cancel' },
                { text: 'Satın Al', onPress: () => onBuy(item, selectedCategory) },
            ]
        );
    };

    const handleEquip = (item) => {
        onEquip(item.id, selectedCategory);
    };

    const isOwned = (itemId) => ownedItems.includes(itemId);
    const isEquipped = (itemId) => equippedItems[selectedCategory] === itemId;

    // Kategori Butonu
    const CategoryTab = ({ cat, isActive }) => (
        <TouchableOpacity
            style={[styles.categoryBtn, isActive && styles.categoryBtnActive]}
            onPress={() => setSelectedCategory(cat.id)}
            activeOpacity={0.7}
        >
            <Text style={styles.categoryEmoji}>{cat.icon}</Text>
            <Text style={[styles.categoryName, isActive && styles.categoryNameActive]}>
                {cat.name}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
    );

    // Ürün Kartı
    const ShopCard = ({ item }) => {
        const owned = isOwned(item.id);
        const equipped = isEquipped(item.id);
        const canAfford = money >= item.price;

        return (
            <View style={[styles.itemCard, equipped && styles.itemCardEquipped]}>
                {/* Ürün Görseli / Emoji */}
                <View style={[styles.imageContainer, equipped && styles.imageContainerEquipped]}>
                    {item.image ? (
                        <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
                    ) : (
                        <Text style={styles.itemEmoji}>{item.emoji}</Text>
                    )}

                    {/* Efekt Rozeti */}
                    {item.effect > 0 && (
                        <View style={styles.effectBadge}>
                            <Text style={styles.effectText}>+{item.effect}%</Text>
                        </View>
                    )}
                </View>

                {/* Bilgiler */}
                <View style={styles.cardContent}>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
                </View>

                {/* Aksiyon Butonu */}
                <View style={styles.actionContainer}>
                    {equipped ? (
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>KULLANILAYOR</Text>
                        </View>
                    ) : owned ? (
                        <TouchableOpacity
                            style={styles.equipBtn}
                            onPress={() => handleEquip(item)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.equipBtnText}>KUŞAN</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.buyBtn, !canAfford && styles.buyBtnDisabled]}
                            onPress={() => handleBuy(item)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buyBtnText}>₺{item.price}</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Kenar Işıltısı (Sadece takılıysa) */}
                {equipped && <LinearGradient
                    colors={['transparent', 'rgba(78, 205, 196, 0.3)', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                    pointerEvents="none"
                />}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                    <Text style={styles.closeBtnText}>✕</Text>
                </TouchableOpacity>
                <Text style={styles.title}>GALERİ & MAĞAZA</Text>
                <View style={styles.moneyBadge}>
                    <Text style={styles.moneyLabel}>BAKİYE</Text>
                    <Text style={styles.moneyText}>₺{money}</Text>
                </View>
            </View>

            {/* Kategoriler */}
            <View style={styles.categoriesWrapper}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {SHOP_CATEGORIES.map(cat => (
                        <CategoryTab key={cat.id} cat={cat} isActive={selectedCategory === cat.id} />
                    ))}
                </ScrollView>
            </View>

            {/* Ürün Grid */}
            <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.grid}>
                    {items.map(item => <ShopCard key={item.id} item={item} />)}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 10,
    },
    closeBtn: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.card,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.cardLight,
    },
    closeBtnText: {
        color: COLORS.text,
        fontSize: 18,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        letterSpacing: 1,
    },
    moneyBadge: {
        alignItems: 'flex-end',
    },
    moneyLabel: {
        fontSize: 10,
        color: COLORS.textDim,
        fontWeight: 'bold',
    },
    moneyText: {
        color: COLORS.accent,
        fontWeight: 'bold',
        fontSize: 18,
    },
    categoriesWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.cardLight,
        marginBottom: 10,
    },
    categoriesContainer: {
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    categoryBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 12,
        alignItems: 'center',
        opacity: 0.6,
    },
    categoryBtnActive: {
        opacity: 1,
    },
    categoryEmoji: {
        fontSize: 24,
        marginBottom: 4,
    },
    categoryName: {
        fontSize: 12,
        color: COLORS.textDim,
        fontWeight: '600',
    },
    categoryNameActive: {
        color: COLORS.accent,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -11,
        width: 20,
        height: 3,
        backgroundColor: COLORS.accent,
        borderRadius: 2,
    },
    gridContainer: {
        padding: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    itemCard: {
        width: CARD_WIDTH,
        backgroundColor: COLORS.card,
        borderRadius: 16,
        marginBottom: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.cardLight,
        overflow: 'hidden',
    },
    itemCardEquipped: {
        borderColor: COLORS.success,
        backgroundColor: '#1c2826',
    },
    imageContainer: {
        width: '100%',
        height: 80,
        backgroundColor: '#121218',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        position: 'relative',
    },
    imageContainerEquipped: {
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
    },
    itemImage: {
        width: 60,
        height: 60,
    },
    itemEmoji: {
        fontSize: 40,
    },
    effectBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: 'rgba(255, 200, 87, 0.2)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 200, 87, 0.5)',
    },
    effectText: {
        fontSize: 10,
        color: COLORS.accent,
        fontWeight: 'bold',
    },
    cardContent: {
        marginBottom: 12,
    },
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    itemDesc: {
        fontSize: 10,
        color: COLORS.textDim,
        lineHeight: 14,
        height: 28,
    },
    actionContainer: {
        marginTop: 'auto',
    },
    buyBtn: {
        backgroundColor: COLORS.accent,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
    },
    buyBtnDisabled: {
        backgroundColor: COLORS.cardLight,
        opacity: 0.5,
    },
    buyBtnText: {
        color: COLORS.bg,
        fontWeight: 'bold',
        fontSize: 12,
    },
    equipBtn: {
        backgroundColor: COLORS.cardLight,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.textDim,
    },
    equipBtnText: {
        color: COLORS.text,
        fontWeight: 'bold',
        fontSize: 12,
    },
    statusBadge: {
        backgroundColor: COLORS.success,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
    },
    statusText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 10,
    },
});
