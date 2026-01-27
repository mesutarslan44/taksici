
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated,
    Easing,
    Image,
    Alert
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const LANE_WIDTH = SCREEN_WIDTH / 3;
const CAR_WIDTH = 50;
const CAR_HEIGHT = 80;

const DrivingGame = ({ onComplete, difficulty = 'normal' }) => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20); // 20 seconds survival
    const [playerLane, setPlayerLane] = useState(1); // 0: Left, 1: Middle, 2: Right
    const [gameOver, setGameOver] = useState(false);
    const [crashed, setCrashed] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [countdown, setCountdown] = useState(3);

    // Animations
    const playerX = useRef(new Animated.Value(LANE_WIDTH * 1 + (LANE_WIDTH - CAR_WIDTH) / 2)).current;
    const obstacles = useRef([]).current; // We will manage obstacle state in ref to avoid re-renders causing lag
    const [obstacleState, setObstacleState] = useState([]); // Visual state

    const gameOverRef = useRef(false);

    // Config
    const speed = difficulty === 'hard' ? 12 : 8;
    const spawnRate = difficulty === 'hard' ? 1000 : 1500;

    // Ref for player lane loop access
    const playerLaneRef = useRef(playerLane);
    useEffect(() => { playerLaneRef.current = playerLane; }, [playerLane]);

    // Start Countdown
    useEffect(() => {
        let count = 3;
        const interval = setInterval(() => {
            count--;
            setCountdown(count);
            if (count <= 0) {
                clearInterval(interval);
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

        // Delay Alert to show crash
        setTimeout(() => {
            Alert.alert(
                "KAZA YAPTIN! 💥",
                "Araba hasar gördü. Polisler yakaladı!",
                [{ text: "Devam Et", onPress: () => onComplete(false) }]
            );
        }, 1500);
    };

    const handleSuccess = () => {
        if (gameOverRef.current) return;
        gameOverRef.current = true;
        setGameOver(true);

        setTimeout(() => {
            Alert.alert(
                "BAŞARDIN! 🏁",
                `Harika sürüş! Polisi atlattın! Puan: ${score}`,
                [{ text: "Devam Et", onPress: () => onComplete(true) }]
            );
        }, 500);
    };

    // Game Loop Timer
    useEffect(() => {
        if (gameOver || !gameStarted) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSuccess();
                    return 0;
                }
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

    // Obstacle Spawner & Collision Logic
    useEffect(() => {
        if (gameOver || !gameStarted) return;

        const spawner = setInterval(() => {
            const lane = Math.floor(Math.random() * 3);
            const id = Date.now();
            const animY = new Animated.Value(-100);

            // Add Collision Listener ONCE at creation
            animY.addListener(({ value }) => {
                if (gameOverRef.current) return;

                const playerY = SCREEN_HEIGHT - 150;
                // Hitbox: +/- 40 pixels
                if (value > playerY - 40 && value < playerY + 40) {
                    // Check horizontal alignment
                    if (lane === playerLaneRef.current) {
                        handleCrash();
                    }
                }
            });

            const obstacle = { id, lane, animY };
            obstacles.push(obstacle);
            setObstacleState([...obstacles]);

            // Move Obstacle
            Animated.timing(animY, {
                toValue: SCREEN_HEIGHT + 100,
                duration: 2000,
                useNativeDriver: true,
                easing: Easing.linear,
            }).start(({ finished }) => {
                if (finished) {
                    const index = obstacles.findIndex(o => o.id === id);
                    if (index > -1) {
                        obstacles.splice(index, 1);
                        setScore(s => s + 10);
                    }
                }
            });

        }, 800);

        return () => clearInterval(spawner);
    }, [gameOver, gameStarted]);



    const moveLeft = () => {
        if (playerLane > 0) setPlayerLane(playerLane - 1);
    };

    const moveRight = () => {
        if (playerLane < 2) setPlayerLane(playerLane + 1);
    };

    return (
        <View style={styles.container}>
            {/* Road Lines */}
            <View style={styles.road}>
                <View style={styles.laneMarker} />
                <View style={styles.laneMarker} />
            </View>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.timer}>Süre: {timeLeft}</Text>
                <Text style={styles.score}>Puan: {score}</Text>
            </View>

            {/* Obstacles */}
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
                    <Text style={{ fontSize: 30 }}>🚔</Text>
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

            {/* Controls */}
            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlBtn} onPress={moveLeft}>
                    <Text style={styles.btnText}>SOL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn} onPress={moveRight}>
                    <Text style={styles.btnText}>SAĞ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        overflow: 'hidden',
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
        backgroundColor: 'white',
        opacity: 0.5,
        borderStyle: 'dashed',
        borderWidth: 1,
    },
    header: {
        position: 'absolute',
        top: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        zIndex: 10,
    },
    timer: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    score: {
        color: '#FFD700',
        fontSize: 24,
        fontWeight: 'bold',
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
    controls: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
    },
    controlBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 50,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
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
