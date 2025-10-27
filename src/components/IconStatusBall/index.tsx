import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import THEME from "../../global/styles/theme";
import { IconStatusBallProps } from "./types";
import { Container } from "./styles";

export default function IconStatusBall<T>({ status }: IconStatusBallProps<T>) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (status === "O") {
      // animação contínua de pulsação
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1); // reseta
    }
  }, [status]);

  const getColor = () => {
    switch (status) {
      case "O": // Online
        return THEME.colors.success; // verde
      case "F": // Falha
        return THEME.colors.danger; // vermelho
      case "I": // Inativo
      default:
        return THEME.colors.gray; // cinza
    }
  };

  return (
    <Animated.View
      style={{
        width: 16,
        height: 16,
        borderRadius: 10,
        backgroundColor: getColor(),
        transform: [{ scale: pulseAnim }],
      }}
    />
  );
}
