
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Picker from "react-native-picker-select";
import { SelectProps } from "./types";
import THEME from "../../global/styles/theme";

export default function Select<T>({ label, placeholder, values, selected, itemLabelFunc, onSelect }: SelectProps<T>) {
  function onValueChange(newValue: T) {
    onSelect(newValue);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}> { label } </Text>

      <View style={styles.inputContainer}>
        <Picker
          placeholder={{ label: placeholder, value: null }}
          value={selected}
          onValueChange={onValueChange}
          items={values}
          style={pickerSelectStyles}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  label: {
    fontSize: THEME.fontSize.largest,
    fontFamily: THEME.fonts.semiBold,
    marginBottom: 6,
    color: THEME.colors.dark,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: THEME.colors.gray_dark,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    color: THEME.colors.gray_dark,
    fontSize: THEME.fontSize.smaller,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: THEME.colors.dark,
  },
});
