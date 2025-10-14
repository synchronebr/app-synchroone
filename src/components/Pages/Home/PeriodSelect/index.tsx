import React, { useMemo } from "react";
import { Platform, View, StyleSheet, TouchableOpacity, ActionSheetIOS, Text } from "react-native";
import { Calendar as CalendarIcon } from "lucide-react-native";
import THEME from "../../../../global/styles/theme";
import RNPickerSelect from "react-native-picker-select";

type Props = {
  value: string;                  // "120" | "90" | "60"
  onChange: (v: string) => void;  // setter
  labelText?: string;             // placeholder/label
};

const OPTIONS = [
  { label: "Últimos 120 dias", value: "120" },
  { label: "Últimos 90 dias",  value: "90"  },
  { label: "Últimos 60 dias",  value: "60"  },
];

export default function PeriodSelect({ value, onChange, labelText }: Props) {
  const currentLabel = useMemo(
    () => OPTIONS.find(o => o.value === value)?.label ?? (labelText ?? "Selecione o período"),
    [value, labelText]
  );

  if (Platform.OS === "ios") {
    // iOS: usa ActionSheet (abre 100% das vezes)
    const openSheet = () => {
      const labels = OPTIONS.map(o => o.label);
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: labelText ?? "Período",
          options: [...labels, "Cancelar"],
          cancelButtonIndex: labels.length,
          userInterfaceStyle: "light",
        },
        (buttonIndex) => {
          if (buttonIndex < labels.length) {
            onChange(OPTIONS[buttonIndex].value);
          }
        }
      );
    };

    return (
      <TouchableOpacity onPress={openSheet} activeOpacity={0.9} style={[styles.container, styles.iosTap]}>
        <CalendarIcon size={15} color={THEME.colors.gray_dark} />
        <View style={{ width: 6 }} />
        <Text style={styles.iosText} numberOfLines={1}>{currentLabel}</Text>
      </TouchableOpacity>
    );
  }

  // Android (mantém RNPickerSelect)
  return (
    <View style={styles.container}>
      <CalendarIcon size={15} color={THEME.colors.gray_dark} />
      <View style={{ width: 4 }} />
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        value={value}
        onValueChange={(v) => v && onChange(String(v))}
        items={OPTIONS}
        placeholder={{ label: labelText ?? "Selecione o período", value: null }}
        style={{
          ...pickerStyles,
          placeholder: [pickerStyles.placeholder],
          inputAndroid: [pickerStyles.inputAndroid],
          viewContainer: pickerStyles.viewContainer,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: THEME.colors.gray,
    borderRadius: 4,
    backgroundColor: THEME.colors.light,
    flexDirection: "row",
    alignItems: "center",
  },
  iosTap: {
    // garante clique mesmo com siblings usando zIndex
    position: "relative",
    zIndex: 100,
  },
  iosText: {
    flexShrink: 1,
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.smallest,
    color: THEME.colors.gray_dark,
    paddingVertical: 4,
  },
});

const pickerStyles = {
  viewContainer: {
    minWidth: 150,
    justifyContent: "center",
  },
  inputAndroid: {
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.smallest,
    color: THEME.colors.gray_dark,
    paddingVertical: 2,
  },
  placeholder: {
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.smallest,
    color: THEME.colors.gray_dark,
  },
};
