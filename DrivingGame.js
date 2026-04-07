
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated,
    Easing,
    Modal,
    PixelRatio
} from 'react-native';
import { Audio } from 'expo-av';
import { triggerHaptic } from './haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const baseWidth = 375;
const scale = SCREEN_WIDTH / baseWidth;
const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

const LANE_WIDTH = SCREEN_WIDTH / 3;
const CAR_WIDTH = 50;
const CAR_HEIGHT = 80;

// Engel tipleri: polis (hızlı), araba, kamyon (yavaş)
const OBSTACLE_TYPES = [
    { type: 'police', emoji: '🚔', speedMul: 1.0 },
    { type: 'car', emoji: '🚗', speedMul: 0.85 },
    { type: 'truck', emoji: '🚙', speedMul: 0.75 },
];

// Engel geçince yukarı uçan +10 / x2 popup
const FloatingPopup = ({ points, combo, headerColor }) => {
    const animY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    useEffect(() => {
        Animated.parallel([
            Animated.timing(animY, { toValue: -50, duration: 800, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
            Animated.timing(opacity, { toValue: 0, duration: 800, useNativeDriver: true, delay: 300 }),
        ]).start();
    }, []);
    return (
        <Animated.View
            pointerEvents="none"
            style={[
                styles.floatingPopup,
                {
                    transform: [{ translateY: animY }],
                    opacity,
                },
            ]}
        >
            <Text style={[styles.floatingPopupPoints, { color: headerColor }]}>+{points}</Text>
            {combo >= 2 && <Text style={[styles.floatingPopupCombo, { color: headerColor }]}>x{combo} kombo!</Text>}
        </Animated.View>
    );
};

const DrivingGame = ({
    onComplete,
    difficulty = 'normal',
    dayTime = 'morning',
    passengerName = '',
    effectVolume = 0.7,
    vibrationEnabled = true,
}) => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20); // 20 seconds survival
    const [playerLane, setPlayerLane] = useState(1); // 0: Left, 1: Middle, 2: Right
    const [gameOver, setGameOver] = useState(false);
    const [crashed, setCrashed] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [showResultCard, setShowResultCard] = useState(false);
    const [resultSuccess, setResultSuccess] = useState(false);
    const [resultScore, setResultScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [floatingPopups, setFloatingPopups] = useState([]);
    const intensityPhaseRef = useRef(0);

    // Animations
    const playerX = useRef(new Animated.Value(LANE_WIDTH * 1 + (LANE_WIDTH - CAR_WIDTH) / 2)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const obstacles = useRef([]).current; // We will manage obstacle state in ref to avoid re-renders causing lag
    const [obstacleState, setObstacleState] = useState([]); // Visual state

    const gameOverRef = useRef(false);
    const crashFlashAnim = useRef(new Animated.Value(0)).current;
    const roadStripesAnim = useRef(new Animated.Value(0)).current;
    const [soundsLoaded, setSoundsLoaded] = useState(false);
    const soundsRef = useRef({});

    // Arka plan ve metin renkleri (gece/gündüz - header okunabilir olsun)
    const bgColor = dayTime === 'night' ? '#1a1a2e' : '#e8e8e8';
    const cityColor = dayTime === 'night' ? '#2d2d44' : '#d0d0d0';
    const headerTextColor = dayTime === 'night' ? '#ffffff' : '#1a1a2e';

    // Config: zorluk gerçekten uygulanıyor (spawn sıklığı + engel hızı)
    const speed = difficulty === 'hard' ? 12 : 8;
    const spawnRate = difficulty === 'hard' ? 900 : 1400; // ms - hard'da daha sık engel

    // Ref for player lane loop access
    const playerLaneRef = useRef(playerLane);
    useEffect(() => { playerLaneRef.current = playerLane; }, [playerLane]);

    // Ses efektleri yükle (assets/testsurus)
    useEffect(() => {
        let mounted = true;
        const loadSounds = async () => {
            try {
                await Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: false });
                const names = ['select', 'music_move', 'defeat', 'victory', 'powerup'];
                const files = {
                    select: require('./assets/testsurus/select.mp3'),
                    music_move: require('./assets/testsurus/music_move.mp3'),
                    defeat: require('./assets/testsurus/defeat.mp3'),
                    victory: require('./assets/testsurus/victory.mp3'),
                    powerup: require('./assets/testsurus/powerup.mp3'),
                };
                for (const name of names) {
                    const { sound } = await Audio.Sound.createAsync(files[name], { volume: effectVolume });
                    if (mounted) soundsRef.current[name] = sound;
                }
                if (mounted) setSoundsLoaded(true);
            } catch (e) {
                console.log('DrivingGame sound load error:', e);
            }
        };
        loadSounds();
        return () => {
            mounted = false;
            Object.values(soundsRef.current).forEach(s => s?.unloadAsync?.());
        };
    }, []);

    const playSound = async (name) => {
        if (!soundsLoaded || effectVolume <= 0) return;
        const s = soundsRef.current[name];
        if (s) {
            try {
                await s.setPositionAsync(0);
                await s.setVolumeAsync(effectVolume);
                await s.playAsync();
            } catch (_) {}
        }
    };

    // Start Countdown + ses (select her saniye, SÜR! da select)
    useEffect(() => {
        let count = 3;
        const interval = setInterval(() => {
            count--;
            setCountdown(count);
            if (count > 0) playSound('select');
            if (count <= 0) {
                clearInterval(interval);
                playSound('select');
                setGameStarted(true);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCrash = () => {
        if (gameOverRef.current) return;
        gameOverRef.current = true;
        setGameOver(true);
        setCrashed(true);
        setResultSuccess(false);
        setResultScore(score);
        setCombo(0);

        playSound('defeat');
        if (vibrationEnabled) triggerHaptic('heavy');

        // Kırmızı flash + sarsma
        Animated.sequence([
            Animated.parallel([
                Animated.timing(crashFlashAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true, easing: Easing.linear }),
            ]),
            Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true, easing: Easing.linear }),
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true, easing: Easing.linear }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true, easing: Easing.linear }),
        ]).start();
        Animated.timing(crashFlashAnim, { toValue: 0, duration: 400, useNativeDriver: true, delay: 100 }).start();

        setTimeout(() => setShowResultCard(true), 1000);
    };

    const handleSuccess = () => {
        if (gameOverRef.current) return;
        gameOverRef.current = true;
        setGameOver(true);
        setResultSuccess(true);
        setResultScore(score);
        playSound('victory');
        if (vibrationEnabled) triggerHaptic('success');
        setTimeout(() => setShowResultCard(true), 500);
    };

    const handleResultCardClose = () => {
        setShowResultCard(false);
        onComplete(resultSuccess);
    };

    // Game Loop Timer + her 5 saniyede zorluk artışı (heyecan)
    useEffect(() => {
        if (gameOver || !gameStarted) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSuccess();
                    return 0;
                }
                if (prev === 6) intensityPhaseRef.current = Math.min(3, intensityPhaseRef.current + 1);
                if (prev === 11) intensityPhaseRef.current = Math.min(3, intensityPhaseRef.current + 1);
                if (prev === 16) intensityPhaseRef.current = Math.min(3, intensityPhaseRef.current + 1);
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [gameOver, gameStarted]);

    // Player Movement Animation
    useEffect(() => {
        Animated.timing(playerX, {
            toValue: playerLane * LANE_WIDTH + (LANE_WIDTH - CAR_WIDTH) / 2,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
        }).start();
    }, [playerLane]);

    // Parallax yol çizgileri (hız hissi)
    useEffect(() => {
        if (!gameStarted || gameOver) return;
        roadStripesAnim.setValue(0);
        const anim = Animated.loop(
            Animated.timing(roadStripesAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.linear,
            })
        );
        anim.start();
        return () => anim.stop();
    }, [gameStarted, gameOver]);

    // Obstacle Spawner: ilk spawn 1.5 sn, süre ilerledikçe daha hızlı/sık (intensityPhase)
    useEffect(() => {
        if (gameOver || !gameStarted) return;

        const baseDuration = Math.max(1200, 2400 - (speed - 6) * 200);
        let spawnerId = null;

        const spawnOne = () => {
            const phase = intensityPhaseRef.current;
            const phaseMul = Math.pow(0.88, phase);
            const lane = Math.floor(Math.random() * 3);
            const obstacleType = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
            const duration = (baseDuration / obstacleType.speedMul) * phaseMul;
            const id = Date.now();
            const animY = new Animated.Value(-100);

            // Çarpışma: sadece engel ile taksi gerçekten örtüştüğünde (engel geçtikten sonra kaza sayılmaz)
            const playerBottom = SCREEN_HEIGHT - 150;
            const playerTop = playerBottom - CAR_HEIGHT;
            const obstacleBottom = (v) => v + CAR_HEIGHT;
            const collisionListener = ({ value }) => {
                if (gameOverRef.current) return;
                const obsBottom = obstacleBottom(value);
                const overlap = value < playerBottom && obsBottom > playerTop;
                if (overlap && lane === playerLaneRef.current) handleCrash();
            };
            const listenerId = animY.addListener(collisionListener);

            const obstacle = { id, lane, animY, obstacleType };
            obstacles.push(obstacle);
            setObstacleState([...obstacles]);

            Animated.timing(animY, {
                toValue: SCREEN_HEIGHT + 100,
                duration,
                useNativeDriver: true,
                easing: Easing.linear,
            }).start(({ finished }) => {
                animY.removeListener(listenerId);
                if (finished) {
                    const index = obstacles.findIndex(o => o.id === id);
                    if (index > -1) {
                        obstacles.splice(index, 1);
                        setObstacleState([...obstacles]);
                        setCombo(prevCombo => {
                            const nextCombo = prevCombo + 1;
                            const bonus = prevCombo * 5;
                            const points = 10 + bonus;
                            setScore(s => s + points);
                            playSound('powerup');
                            const popupId = Date.now() + Math.random();
                            setFloatingPopups(prev => [...prev, { id: popupId, points, combo: nextCombo }]);
                            setTimeout(() => setFloatingPopups(p => p.filter(x => x.id !== popupId)), 900);
                            return nextCombo;
                        });
                    }
                }
            });
        };

        const getSpawnDelay = () => {
            const phase = intensityPhaseRef.current;
            return Math.max(600, spawnRate * Math.pow(0.9, phase));
        };
        let nextDelay = getSpawnDelay();
        const scheduleNext = () => {
            spawnerId = setTimeout(() => {
                spawnOne();
                nextDelay = getSpawnDelay();
                scheduleNext();
            }, nextDelay);
        };
        const initialTimeout = setTimeout(() => {
            spawnOne();
            scheduleNext();
        }, 1500);

        return () => {
            clearTimeout(initialTimeout);
            if (spawnerId) clearTimeout(spawnerId);
        };
    }, [gameOver, gameStarted]);



    const moveLeft = () => {
        if (playerLane > 0 && !gameOver) {
            setPlayerLane(playerLane - 1);
            playSound('music_move');
            if (vibrationEnabled) triggerHaptic('selection');
        }
    };

    const moveRight = () => {
        if (playerLane < 2 && !gameOver) {
            setPlayerLane(playerLane + 1);
            playSound('music_move');
            if (vibrationEnabled) triggerHaptic('selection');
        }
    };

    // Sol/Sağ ayrı butonlarla kontrol – dokunma güvenilir olsun

    // Şehir silueti için basit SVG benzeri görünüm
    const citySkyline = (
        <View style={[styles.citySkyline, { backgroundColor: cityColor }]}>
            {/* Binalar */}
            <View style={[styles.building, { height: normalize(80), left: normalize(20) }]} />
            <View style={[styles.building, { height: normalize(120), left: normalize(80) }]} />
            <View style={[styles.building, { height: normalize(60), left: normalize(140) }]} />
            <View style={[styles.building, { height: normalize(100), left: normalize(200) }]} />
            <View style={[styles.building, { height: normalize(140), left: normalize(260) }]} />
            <View style={[styles.building, { height: normalize(90), left: normalize(320) }]} />
        </View>
    );

    return (
        <Animated.View 
            style={[
                styles.container,
                { 
                    backgroundColor: bgColor,
                    transform: [{ translateX: shakeAnim }]
                }
            ]}
        >
            {/* Şehir Silueti Arka Plan */}
            {citySkyline}

            {/* Parallax yol çizgileri (aşağı akan şeritler - hız hissi) */}
            {gameStarted && !gameOver && (
                <View style={styles.roadStripesContainer} pointerEvents="none">
                    {[LANE_WIDTH - 2, LANE_WIDTH * 2 - 2].map((leftX, i) => (
                        <View key={i} style={[styles.roadStripeColumn, { left: leftX }]}>
                            {[0, 1, 2, 3, 4, 5, 6].map(j => (
                                <Animated.View
                                    key={j}
                                    style={[
                                        styles.roadStripe,
                                        {
                                            transform: [{
                                                translateY: roadStripesAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, normalize(80)],
                                                })
                                            }],
                                            marginTop: j * normalize(80),
                                        }
                                    ]}
                                />
                            ))}
                        </View>
                    ))}
                </View>
            )}

            {/* Sabit şerit ayırıcıları */}
            <View style={styles.road}>
                <View style={styles.laneMarker} />
                <View style={styles.laneMarker} />
            </View>

            {/* Kaza kırmızı flash overlay */}
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.crashFlash,
                    {
                        opacity: crashFlashAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.55],
                        }),
                    },
                ]}
            />

            {/* Header + SON 5 uyarısı + kombo */}
            <View style={styles.header}>
                <View>
                    <Text style={[styles.timer, { color: headerTextColor }]}>Süre: {timeLeft}</Text>
                    {timeLeft <= 5 && timeLeft > 0 && (
                        <Text style={[styles.sonBesText, { color: headerTextColor }]}>⚡ SON {timeLeft}! ⚡</Text>
                    )}
                </View>
                <View style={styles.headerRight}>
                    {combo >= 2 && (
                        <View style={styles.comboBadge}>
                            <Text style={styles.comboText}>x{combo}</Text>
                        </View>
                    )}
                    <Text style={[styles.score, { color: headerTextColor }]}>Puan: {score}</Text>
                </View>
            </View>

            {/* +10 / +15 floating popup (engel geçince) */}
            {floatingPopups.map(pop => (
                <FloatingPopup key={pop.id} points={pop.points} combo={pop.combo} headerColor={headerTextColor} />
            ))}

            {/* Obstacles - polis / araba / kamyon çeşitliliği */}
            {obstacleState.map(obs => (
                <Animated.View
                    key={obs.id}
                    style={[
                        styles.obstacle,
                        {
                            left: obs.lane * LANE_WIDTH + (LANE_WIDTH - CAR_WIDTH) / 2,
                            transform: [{ translateY: obs.animY }]
                        }
                    ]}
                >
                    <Text style={{ fontSize: 30 }}>{(obs.obstacleType || OBSTACLE_TYPES[0]).emoji}</Text>
                </Animated.View>
            ))}

            {/* Player Car */}
            <Animated.View
                style={[
                    styles.player,
                    {
                        transform: [{ translateX: playerX }]
                    }
                ]}
            >
                <Text style={{ fontSize: 40 }}>{crashed ? "💥" : "🚖"}</Text>
            </Animated.View>

            {/* COUNTDOWN OVERLAY */}
            {!gameStarted && (
                <View style={styles.countdownContainer}>
                    <Text style={styles.countdownText}>{countdown > 0 ? countdown : "SÜR!"}</Text>
                </View>
            )}

            {/* Kontroller – SOL / SAĞ (kibar, yumuşak stil) */}
            <View style={styles.controlArea}>
                <TouchableOpacity
                    style={styles.controlBtn}
                    activeOpacity={0.8}
                    onPress={moveLeft}
                    disabled={gameOver || !gameStarted}
                >
                    <Text style={styles.controlBtnEmoji}>←</Text>
                    <Text style={styles.controlBtnText}>Sol</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.controlBtn}
                    activeOpacity={0.8}
                    onPress={moveRight}
                    disabled={gameOver || !gameStarted}
                >
                    <Text style={styles.controlBtnEmoji}>→</Text>
                    <Text style={styles.controlBtnText}>Sağ</Text>
                </TouchableOpacity>
            </View>

            {/* Sonuç Kartı */}
            <Modal
                visible={showResultCard}
                transparent={true}
                animationType="fade"
                onRequestClose={handleResultCardClose}
            >
                <View style={styles.resultCardOverlay}>
                    <View style={[
                        styles.resultCard,
                        resultSuccess ? styles.resultCardSuccess : styles.resultCardFail
                    ]}>
                        <Text style={styles.resultIcon}>
                            {resultSuccess ? '🏁' : '💥'}
                        </Text>
                        <Text style={[
                            styles.resultTitle,
                            resultSuccess ? { color: '#4ecdc4' } : { color: '#ff6b6b' }
                        ]}>
                            {resultSuccess ? 'BAŞARILI!' : 'KAZA YAPTIN!'}
                        </Text>
                        <Text style={styles.resultMessage}>
                            {resultSuccess 
                                ? `Makas Show Başarılı: +%20 bonus bu hikâyede\nPuan: ${resultScore}`
                                : `Bu hikâyede kazanacağın para azaldı\nPolisler yakaladı!`
                            }
                        </Text>
                        {passengerName && (
                            <Text style={styles.resultPassenger}>
                                Yolcu: {passengerName}
                            </Text>
                        )}
                        <TouchableOpacity 
                            style={styles.resultButton}
                            onPress={handleResultCardClose}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.resultButtonText}>Devam Et</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    citySkyline: {
        position: 'absolute',
        bottom: normalize(200),
        left: 0,
        right: 0,
        height: normalize(150),
        opacity: 0.3,
    },
    building: {
        position: 'absolute',
        bottom: 0,
        width: normalize(40),
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: normalize(4),
    },
    road: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    laneMarker: {
        width: 2,
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    roadStripesContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        zIndex: 0,
    },
    roadStripeColumn: {
        position: 'absolute',
        width: 4,
        height: SCREEN_HEIGHT + normalize(200),
        top: -normalize(100),
    },
    roadStripe: {
        width: 4,
        height: normalize(40),
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 1,
    },
    crashFlash: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ff0000',
        zIndex: 15,
    },
    header: {
        position: 'absolute',
        top: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        zIndex: 10,
    },
    headerRight: {
        alignItems: 'flex-end',
    },
    timer: {
        fontSize: 22,
        fontWeight: '600',
    },
    sonBesText: {
        fontSize: 14,
        fontWeight: '700',
        marginTop: 4,
        letterSpacing: 1,
    },
    comboBadge: {
        backgroundColor: 'rgba(255, 200, 87, 0.4)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 6,
    },
    comboText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#ffc857',
    },
    score: {
        fontSize: 22,
        fontWeight: '600',
    },
    floatingPopup: {
        position: 'absolute',
        bottom: normalize(220),
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 12,
    },
    floatingPopupPoints: {
        fontSize: 28,
        fontWeight: '800',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    floatingPopupCombo: {
        fontSize: 14,
        fontWeight: '700',
        marginTop: 2,
        opacity: 0.9,
    },
    player: {
        position: 'absolute',
        bottom: 150,
        width: CAR_WIDTH,
        height: CAR_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
    },
    obstacle: {
        position: 'absolute',
        width: CAR_WIDTH,
        height: CAR_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
    },
    controlArea: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: normalize(180),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: normalize(24),
        paddingBottom: normalize(40),
        zIndex: 25,
    },
    controlBtn: {
        flex: 1,
        maxWidth: normalize(130),
        height: normalize(88),
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderRadius: normalize(14),
        borderWidth: 1.5,
        borderColor: 'rgba(255, 200, 87, 0.45)',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: normalize(14),
    },
    controlBtnEmoji: {
        fontSize: normalize(28),
        marginBottom: normalize(2),
        opacity: 0.9,
    },
    controlBtnText: {
        color: 'rgba(255, 200, 87, 0.95)',
        fontSize: normalize(16),
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    // Sonuç Kartı
    resultCardOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: normalize(24),
    },
    resultCard: {
        backgroundColor: '#1a1a24',
        borderRadius: normalize(20),
        padding: normalize(24),
        width: '100%',
        maxWidth: normalize(350),
        alignItems: 'center',
        borderWidth: 2,
    },
    resultCardSuccess: {
        borderColor: '#4ecdc4',
    },
    resultCardFail: {
        borderColor: '#ff6b6b',
    },
    resultIcon: {
        fontSize: normalize(64),
        marginBottom: normalize(16),
    },
    resultTitle: {
        fontSize: normalize(24),
        fontWeight: '800',
        marginBottom: normalize(12),
        letterSpacing: 1,
    },
    resultMessage: {
        fontSize: normalize(16),
        color: '#8a8a9a',
        textAlign: 'center',
        lineHeight: normalize(24),
        marginBottom: normalize(16),
    },
    resultPassenger: {
        fontSize: normalize(14),
        color: '#ffc857',
        marginBottom: normalize(20),
        fontWeight: '600',
    },
    resultButton: {
        backgroundColor: '#ffc857',
        paddingHorizontal: normalize(32),
        paddingVertical: normalize(12),
        borderRadius: normalize(12),
        minWidth: normalize(150),
    },
    resultButtonText: {
        color: '#0a0a0f',
        fontSize: normalize(16),
        fontWeight: '700',
        textAlign: 'center',
    },
    countdownContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    countdownText: {
        fontSize: 100,
        color: '#ffc857',
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 10
    }
});

export default DrivingGame;
