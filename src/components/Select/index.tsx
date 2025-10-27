
import React from "react";
import { StyleSheet, View } from "react-native";
import Picker, { PickerStyle } from "react-native-picker-select";

import THEME from "../../global/styles/theme";
import { SelectProps } from "./types";
import { Text, Container, ErrorText } from "./styles";

export default function Select<T>({ label, placeholder, values, selected, onSelect, editable, error, errorTextColor }: SelectProps<T>) {
  function onValueChange(newValue: T) {
    onSelect(newValue);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.label, error && { color: errorTextColor } ]}> { label } </Text>

      <View style={[styles.inputContainer, error && { borderColor: errorTextColor }]}>
        <Picker
          style={{
            ...pickerSelectStyles,
            inputIOSContainer: { height: 40, justifyContent: "center" },
            placeholder: [
              pickerSelectStyles.placeholder,
              error && { color: errorTextColor }, // Cor vermelha no texto para iOS
            ],
            inputIOS: [
              pickerSelectStyles.inputIOS,
              error && { color: errorTextColor }, // Cor vermelha no texto para iOS
            ],
            inputAndroid: [
              pickerSelectStyles.inputAndroid,
              error && { color: errorTextColor }, // Cor vermelha no texto para Android
            ],
          }}
          modalPropsIOS={{ presentationStyle: 'overFullScreen' }}
          enabled={editable}
          placeholder={{ label: placeholder, value: null }}
          value={selected}
          onValueChange={onValueChange}
          items={values}
        />
      </View>
      {error && (
        <ErrorText errorTextColor={errorTextColor}>
          {error}
        </ErrorText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  label: {
    fontSize: THEME.fontSize.medium,
    fontFamily: THEME.fonts.semiBold,
    marginBottom: 6,
    color: THEME.colors.dark,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: THEME.colors.gray_dark,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
});

const pickerSelectStyles = {
  viewContainer: {
    height: 40,
    justifyContent: "center",
    borderColor: THEME.colors.gray_dark,
  },
  inputIOS: {
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.normal,
    color: THEME.colors.dark,
    paddingHorizontal: 8,
  },
  inputAndroid: {
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.normal,
    color: THEME.colors.dark,
    paddingHorizontal: 8,
  },
  placeholder: {
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.normal,
    color: THEME.colors.primary,
  },
};