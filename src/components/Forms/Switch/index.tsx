import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  ColorValue,
} from "react-native";
import THEME from "../../../global/styles/theme";

type Size = "sm" | "md" | "lg";
type LabelPosition = "top" | "left" | "right";

export type RNSwitchProps = {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
  title?: string;
  labelPosition?: LabelPosition;
  disabled?: boolean;
  size?: Size;
  trackColorOn?: ColorValue;
  trackColorOff?: ColorValue;
  thumbColor?: ColorValue;
  style?: ViewStyle;
  accessibilityLabel?: string;
  disableAnimation?: boolean;
};

const SIZES: Record<Size, { trackW: number; trackH: number; padding: number }> = {
  sm: { trackW: 36, trackH: 20, padding: 2 },
  md: { trackW: 44, trackH: 24, padding: 3 },
  lg: { trackW: 56, trackH: 32, padding: 4 },
};

export function Switch({
  checked,
  onCheckedChange,
  title,
  labelPosition = "left",
  disabled = false,
  size = "md",
  trackColorOn = THEME.colors.primary,
  trackColorOff = THEME.colors.gray_light,
  thumbColor = THEME.colors.light,
  style,
  accessibilityLabel = "Switch",
  disableAnimation = false,
}: RNSwitchProps) {
  const { trackW, trackH, padding } = SIZES[size];
  const thumbSize = trackH - padding * 2;
  const travel = trackW - padding * 2 - thumbSize;

  const anim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    if (disableAnimation) {
      anim.setValue(checked ? 1 : 0);
      return;
    }
    Animated.timing(anim, {
      toValue: checked ? 1 : 0,
      duration: 150,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [checked, anim, disableAnimation]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, travel],
  });

  const trackBg = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [String(trackColorOff), String(trackColorOn)],
  });

  const containerStyle = useMemo<ViewStyle>(
    () => [
      { opacity: disabled ? 0.6 : 1 },
      style,
    ],
    [disabled, style]
  );

  const labelFirst = labelPosition === "left" || labelPosition === "top";

  return (
    <View
      style={[
        styles.wrapper,
        labelPosition === "top" ? styles.column : styles.row,
        labelPosition === "right" && { flexDirection: "row-reverse" },
      ]}
    >
      {title && (
        <Text
          style={[
            styles.label,
            labelPosition === "top" ? styles.labelTop : styles.labelSide,
          ]}
        >
          {title}
        </Text>
      )}

      <Pressable
        accessibilityRole="switch"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityState={{ disabled, checked }}
        hitSlop={8}
        disabled={disabled}
        onPress={() => onCheckedChange(!checked)}
        style={containerStyle}
      >
        <Animated.View
          style={[
            styles.track,
            {
              width: trackW,
              height: trackH,
              borderRadius: trackH / 2,
              backgroundColor: trackBg as any,
              padding,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.thumb,
              {
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                backgroundColor: thumbColor,
                transform: [{ translateX }],
              },
            ]}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    color: "#111827",
    fontSize: 15,
  },
  labelSide: {
    marginRight: 8,
  },
  labelTop: {
    marginBottom: 6,
  },
  track: {
    justifyContent: "center",
  },
  thumb: {
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
