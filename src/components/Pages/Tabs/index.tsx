
import React from "react";
import { useTheme } from "styled-components/native";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import theme from "../../../global/styles/theme";

interface ITabsProps {
  options: {
    label: string;
    value: string;
  }[],
  value?: string;
  setValue: (value: string) => void;
  smallText?: boolean;
}

export default function Tabs({
  options,
  value,
  setValue,
  smallText,
}: ITabsProps) {

  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity style={[styles.button, smallText && styles.buttonSmall, value === option.value && styles.buttonActive]} onPress={() => setValue(option.value)}>
          <Text style={[styles.buttonText, smallText && styles.buttonTextSmall]}>{option.label}</Text>
        </TouchableOpacity>
      ))}

    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    alignItems: "center",
    borderRadius: 4,
    padding: 8,
    borderWidth: 0,
    backgroundColor: theme.colors.primary_light,
  },
  buttonSmall: {
    flex: 1,
    alignItems: "center",
    borderRadius: 4,
    padding: 4,
    borderWidth: 0,
    backgroundColor: theme.colors.primary_light,
  },
  buttonActive: {
    backgroundColor: theme.colors.light,
    borderColor: theme.colors.gray,
    borderWidth: 1,
  },
  buttonText: {
  },
  buttonTextSmall: {
    fontSize: 10,
  },
});