import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Animated } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export function Connecting() {
    const [showFail, setShowFail] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(1));
    const animationRef = useRef<LottieView>(null);
    const navigation = useNavigation();


    useEffect(() => {
        // Mostra tela de conexão por 20 segundos antes de falhar
        const timer = setTimeout(() => handleFailTransition(), 10000);
        return () => clearTimeout(timer);
    }, []);

    const handleFailTransition = () => {
        // Anima transição suave entre as telas
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
        }).start(() => {
            setShowFail(true);
            fadeAnim.setValue(0);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }).start();
        });
    };

    const handleRetry = () => {
        // Retorna à tela de conexão
        setShowFail(false);
        fadeAnim.setValue(1);
        // Reinicia o ciclo de 20s
        const timer = setTimeout(() => handleFailTransition(), 10000);
        return () => clearTimeout(timer);
    };

    const handleExit = () => {
        // Aqui você pode colocar uma navegação ou fechamento de app
        navigation.navigate("Success" as never);
    };

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
                {!showFail ? (
                    <>
                        <LottieView
                            ref={animationRef}
                            source={require("../../../assets/animations/link.json")}
                            autoPlay
                            loop
                            style={styles.animation}
                        />
                        <Text style={styles.title}>Conectando ao gateway...</Text>
                        <Text style={styles.subtitle}>
                            Estabelecendo canal seguro de comunicação
                        </Text>
                    </>
                ) : (
                    <>
                        <LottieView
                            source={require("../../../assets/animations/fail.json")}
                            autoPlay
                            loop={false}
                            style={styles.animation}
                        />
                        <Text style={styles.title}>
                            Não encontramos nenhuma conexão com gateway...
                        </Text>
                        <Text style={styles.subtitle}>
                            Verifique se há gateway(s) instalado(s) e devidamente configurado(s),
                            dentro do range de distância do sensor
                        </Text>

                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={handleRetry} style={styles.buttonRetry}>
                                <Text style={styles.buttonText}>Tentar novamente</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleExit} style={styles.buttonExit}>
                                <Text style={styles.buttonText}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
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
    },
    animation: {
        width: 300,
        height: 300,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginTop: 10,
        textAlign: "center",
        paddingHorizontal: 20,
    },
    subtitle: {
        fontSize: 15,
        color: "#CBD5E1",
        marginTop: 8,
        marginBottom: 30,
        textAlign: "center",
        paddingHorizontal: 30,
    },
    buttons: {
        gap: 16,
        marginTop: 20,

    },
    buttonRetry: {
        backgroundColor: "#0284C7",
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: "center",
        borderRadius: 10,
        width: 300,
    },
    buttonExit: {
        backgroundColor: "#0284C7",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        width: 300,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },
});
