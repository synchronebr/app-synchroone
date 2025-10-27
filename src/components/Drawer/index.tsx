// components/Drawer.tsx
import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  Animated,
  Pressable,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

type DrawerProps = {
  children: React.ReactNode;
  isOpen: boolean;
  position?: "center" | "bottom";
  maxHeightPercent?: number;
  onRequestClose?: () => void;
  // ↓ estes props seguem funcionando, mas a animação é por translate/opacity
  animateOnFirstOpen?: boolean;
  durationMs?: number;
};

export default function Drawer({
  children,
  isOpen,
  position = "center",
  maxHeightPercent = 0.95,
  onRequestClose,
  animateOnFirstOpen = false, // mantido por compatibilidade
  durationMs = 200,
}: DrawerProps) {
  const { height: screenH, width: screenW } = Dimensions.get("window");
  const maxH = screenH * maxHeightPercent;

  const progress = useRef(new Animated.Value(0)).current; // 0 fechado, 1 aberto
  const openedOnceRef = useRef(false);

  // controla animação de entrada/saída
  useEffect(() => {
    if (isOpen) {
      Animated.timing(progress, {
        toValue: 1,
        duration: durationMs,
        useNativeDriver: true,
      }).start(() => {
        openedOnceRef.current = true;
      });
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: durationMs,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, durationMs, progress]);

  // evita mount quando fechado (Modal cuida da visibilidade)
  if (!isOpen) return null;

  // translate de acordo com a posição
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: position === "bottom" ? [40, 0] : [10, 0], // leve slide
  });
  const containerOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1],
  });
  const overlayOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none" // animação controlada manualmente
      statusBarTranslucent
      onRequestClose={onRequestClose}
      presentationStyle="overFullScreen"
    >
      <Animated.View
        style={[
          styles.overlay,
          position === "center" ? styles.center : styles.bottom,
          Platform.select({ android: { paddingTop: 24 }, ios: undefined }),
          { opacity: overlayOpacity },
        ]}
        pointerEvents="box-none"
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onRequestClose} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ width: "100%", alignItems: "center" }}
        >
          <Animated.View
            style={[
              styles.container,
              {
                width: Math.min(screenW * 0.9, 720),
                maxHeight: maxH,
                alignSelf: position === "bottom" ? "stretch" : "auto",
                borderBottomLeftRadius: position === "bottom" ? 0 : 12,
                borderBottomRightRadius: position === "bottom" ? 0 : 12,
                transform: [{ translateY }],
                opacity: containerOpacity,
              },
            ]}
            pointerEvents="auto"
          >
            <ScrollView
              bounces={false}
              keyboardShouldPersistTaps="handled"
              contentInsetAdjustmentBehavior="never"
              automaticallyAdjustContentInsets={false as any}
              contentInset={{ top: 0, bottom: 0, left: 0, right: 0 }}
              scrollIndicatorInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
              contentContainerStyle={styles.inner}
            >
              {children}
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  inner: {
    paddingHorizontal: 2,
    paddingTop: 2,
    paddingBottom: 2,
    // evita “esticadas” ao crescer conteúdo:
    flexGrow: 0,
  },
});
