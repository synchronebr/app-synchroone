import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";

export function Success() {
    const [phase, setPhase] = useState(1);
    const [fadeAnim] = useState(new Animated.Value(1));
    const animationRef = useRef<LottieView>(null);

    useEffect(() => {
        // Avança automaticamente pelas 3 fases
        const timers = [
            setTimeout(() => handleNextPhase(2), 10000), // após 10s -> fase 2
            setTimeout(() => handleNextPhase(3), 20000), // após 20s -> fase 3
            setTimeout(() => handleNextPhase(4), 30000), // após 30s -> tela final
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    const handleNextPhase = (next: number) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
        }).start(() => {
            setPhase(next);
            fadeAnim.setValue(0);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }).start();
        });
    };

    const getPhaseContent = () => {
        switch (phase) {
            case 1:
                return {
                    anim: require("../../../assets/animations/signal.json"),
                    title: "Avaliando nível de sinal...",
                    subtitle: "Analisando estabilidade da conexão com o sensor",
                };
            case 2:
                return {
                    anim: require("../../../assets/animations/plane.json"),
                    title: "Enviando a primeira leitura...",
                    subtitle: "Transmitindo dados iniciais para validação",
                };
            case 3:
                return {
                    anim: require("../../../assets/animations/success.json"),
                    title: "Leitura confirmada!",
                    subtitle: "Dados recebidos com sucesso no sistema",
                };
            case 4:
                return {
                    anim: require("../../../assets/animations/congrats.json"),
                    title: "Configuração concluída com sucesso!",
                    subtitle: "",
                };
            default:
                return null;
        }
    };

    const content = getPhaseContent();

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
                {content?.anim && (
                    <LottieView
                        ref={animationRef}
                        source={content.anim}
                        autoPlay
                        loop={phase !== 3} // na última animação, toca uma vez
                        style={styles.animation}
                    />
                )}
                <Text style={styles.title}>{content?.title}</Text>
                {content?.subtitle ? (
                    <Text style={styles.subtitle}>{content.subtitle}</Text>
                ) : null}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E293B",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    animation: {
        width: 280,
        height: 280,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginTop: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#CBD5E1",
        marginTop: 8,
        textAlign: "center",
    },
});
