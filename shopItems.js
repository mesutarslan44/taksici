export const SHOP_CATEGORIES = [
    { id: 'mirror', name: 'Dikiz Aynası Süsü', icon: '🪞' },
    { id: 'rosary', name: 'Tesbih', icon: '📿' },
];

export const SHOP_ITEMS = {
    mirror: [
        { id: 'mirror_nazar', name: 'Nazar Boncuğu', price: 0, effect: 0, image: require('./assets/shop/mirror_nazar.webp'), emoji: '🧿', description: 'Başlangıç', owned: true },
        { id: 'mirror_kuran', name: 'Küçük Kuran', price: 250, effect: 5, image: require('./assets/shop/mirror_kuran.webp'), emoji: '📗', description: '+%5 itibar' },
        { id: 'mirror_gs', name: 'Galatasaray Arma', price: 300, effect: 0, image: require('./assets/shop/emblem_gs.webp'), emoji: '🦁', description: 'Cim bom bom' },
        { id: 'mirror_fb', name: 'Fenerbahçe Arma', price: 300, effect: 0, image: require('./assets/shop/emblem_fb.webp'), emoji: '🐤', description: 'Sarı kanarya' },
        { id: 'mirror_bjk', name: 'Beşiktaş Arma', price: 300, effect: 0, image: require('./assets/shop/emblem_bjk.webp'), emoji: '🦅', description: 'Kara kartal' },
        { id: 'mirror_ts', name: 'Trabzonspor Arma', price: 300, effect: 0, image: require('./assets/shop/emblem_ts.webp'), emoji: '⚓', description: 'Fırtına' },
        { id: 'mirror_gold', name: 'Altın Zincir', price: 1000, effect: 8, image: require('./assets/shop/mirror_gold.webp'), emoji: '⛓️', description: 'Lüks görünüm' },
        { id: 'mirror_led', name: 'LED Işıklı Logo', price: 2000, effect: 12, image: require('./assets/shop/mirror_led.webp'), emoji: '💡', description: 'Gece efekti' },
    ],
    rosary: [
        { id: 'rosary_plastic', name: 'Plastik Tesbih', price: 0, effect: 0, image: require('./assets/shop/rosary_plastic.webp'), emoji: '📿', description: 'Başlangıç', owned: true },
        { id: 'rosary_amber', name: 'Kehribar Tesbih', price: 500, effect: 5, image: require('./assets/shop/rosary_amber.webp'), emoji: '🟠', description: '+%5 itibar' },
        { id: 'rosary_silver', name: 'Gümüş Tesbih', price: 1500, effect: 10, image: require('./assets/shop/rosary_silver.webp'), emoji: '⚪', description: '+%10 itibar' },
        { id: 'rosary_gold', name: 'Altın Tesbih', price: 5000, effect: 20, image: require('./assets/shop/rosary_gold.webp'), emoji: '🟡', description: '+%20 itibar' },
    ],
};

// ÖZEL KOMBİNASYONLAR
export const SPECIAL_COMBOS = [
    {
        id: 'muhafazakar',
        name: 'Muhafazakar Taksici',
        required: ['mirror_nazar', 'rosary_amber', 'mirror_kuran'],
        bonus: 15,
        description: '+%15 itibar bonusu'
    },
    {
        id: 'night_rider',
        name: 'Gece Şövalyesi',
        required: ['mirror_led'],
        bonus: 10,
        description: 'Gece yolcularından +%10 kazanç'
    },
    {
        id: 'fanatik_gs',
        name: 'Aslan Taksici',
        required: ['mirror_gs'],
        bonus: 5,
        description: 'GS taraftarlarından ekstra bahşiş'
    },
];

// Varsayılan sahip olunan eşyalar
export const DEFAULT_OWNED = [
    'mirror_nazar', 'rosary_plastic'
];

// Varsayılan takılı eşyalar
export const DEFAULT_EQUIPPED = {
    mirror: 'mirror_nazar',
    rosary: 'rosary_plastic',
};
