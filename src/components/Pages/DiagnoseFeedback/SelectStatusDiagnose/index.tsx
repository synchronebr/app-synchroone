import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect, { PickerStyle } from "react-native-picker-select";

import THEME from "../../../../global/styles/theme";
import { SelectProps } from "./types";
import { Text, ErrorText } from "./styles";
import { t } from "i18next";
import { enums } from "../../../../utils/enums";

type FeedbackValue =
  | typeof enums.Diagnoses.Causes.Feedback.NotClassified
  | typeof enums.Diagnoses.Causes.Feedback.NotConfirmed
  | typeof enums.Diagnoses.Causes.Feedback.Confirmed
  | typeof enums.Diagnoses.Causes.Feedback.PartiallyConfirmed;

const STATUS_COLORS: Record<
  FeedbackValue,
  { bg: string; border: string; text: string }
> = {
  [enums.Diagnoses.Causes.Feedback.NotClassified]: {
    bg: THEME.colors.gray_light,
    border: THEME.colors.gray_dark,
    text: THEME.colors.dark,
  },
  [enums.Diagnoses.Causes.Feedback.NotConfirmed]: {
    bg: THEME.colors.danger_light ?? "#fde7e9",
    border: THEME.colors.danger,
    text: THEME.colors.danger ?? THEME.colors.danger,
  },
  [enums.Diagnoses.Causes.Feedback.Confirmed]: {
    bg: THEME.colors.success,
    border: THEME.colors.success,
    text: THEME.colors.light,
  },
  [enums.Diagnoses.Causes.Feedback.PartiallyConfirmed]: {
    bg: THEME.colors.orange,
    border: THEME.colors.orange,
    text: THEME.colors.light,
  },
};

export default function SelectStatusDiagnose<T extends FeedbackValue>({
  key,
  label,
  placeholder,
  selected,
  onSelect,
  editable = true,
  error,
  errorTextColor,
}: SelectProps<T>) {
  function onValueChange(newValue: T | null) {
    // Nunca passe undefined — iOS espera null para placeholder
    onSelect((newValue === null ? null : (newValue as T)) as T);
  }

  const palette = useMemo(() => {
    if (selected == null || !(selected in STATUS_COLORS)) {
      return {
        bg: "#f9f9f9",
        border: THEME.colors.gray_dark,
        text: THEME.colors.dark,
      };
    }
    return STATUS_COLORS[selected as FeedbackValue];
  }, [selected]);

  const dynamicContainer = useMemo(
    () => [
      styles.inputContainer,
      { backgroundColor: palette.bg, borderColor: palette.border },
      error && { borderColor: errorTextColor },
    ],
    [palette, error, errorTextColor]
  );

  const pickerStyles = useMemo(
    () =>
      ({
        viewContainer: {
          height: 40,
          justifyContent: "center",
        },
        // Centralização “de verdade” no iOS
        inputIOSContainer: {
          alignItems: "center",
          justifyContent: "center",
          height: 40,
        },
        inputAndroidContainer: {
          alignItems: "center",
          justifyContent: "center",
          height: 40,
        },
        inputIOS: {
          fontFamily: THEME.fonts.medium,
          fontSize: THEME.fontSize.normal,
          color: error ? errorTextColor : palette.text,
          paddingHorizontal: 8,
          textAlign: "center",
          paddingVertical: 10,
        },
        inputAndroid: {
          fontFamily: THEME.fonts.medium,
          fontSize: THEME.fontSize.normal,
          color: error ? errorTextColor : palette.text,
          paddingHorizontal: 8,
          textAlign: "center",
          paddingVertical: 6,
        },
        placeholder: {
          fontFamily: THEME.fonts.medium,
          fontSize: THEME.fontSize.normal,
          color: error ? errorTextColor : THEME.colors.primary,
        },
        iconContainer: { right: 8, top: 10 },
      } satisfies Partial<PickerStyle>),
    [palette, error, errorTextColor]
  );

  return (
    <View style={styles.container} key={key}>
      {!!label && (
        <Text style={[styles.label, !!error && { color: errorTextColor }]}>{label}</Text>
      )}

      <View style={dynamicContainer}>
        <RNPickerSelect
          key={`RNPicker-${key}`}
          style={pickerStyles as PickerStyle}
          disabled={!editable}                     // <- iOS
          placeholder={{ label: placeholder, value: null }}
          value={selected ?? null}                 // <- nunca undefined
          onValueChange={onValueChange}
          items={[
            { label: t("index.notClassified"), value: enums.Diagnoses.Causes.Feedback.NotClassified },
            { label: t("index.confirmed"), value: enums.Diagnoses.Causes.Feedback.Confirmed },
            { label: t("index.partiallyConfirmed"), value: enums.Diagnoses.Causes.Feedback.PartiallyConfirmed },
            { label: t("index.notConfirmed"), value: enums.Diagnoses.Causes.Feedback.NotConfirmed },
          ]}
          useNativeAndroidPickerStyle={false}
          doneText="OK"                            // UX iOS
        />
      </View>

      {!!error && <ErrorText errorTextColor={errorTextColor!}>{error}</ErrorText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: THEME.fontSize.normal,
    fontFamily: THEME.fonts.semiBold,
    marginBottom: 6,
    color: THEME.colors.dark,
    textAlign: "center",
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: "hidden",
    justifyContent: "center",
  },
});
