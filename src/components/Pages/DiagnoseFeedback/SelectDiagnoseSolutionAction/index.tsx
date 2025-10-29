import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, ErrorText } from "./styles";
import THEME from "../../../../global/styles/theme";
import { t } from "i18next";
import { enums } from "../../../../utils/enums";
import type { SelectProps } from "./types";

type FeedbackValue =
  | typeof enums.Diagnoses.Causes.Feedback.NotClassified
  | typeof enums.Diagnoses.Causes.Feedback.NotConfirmed
  | typeof enums.Diagnoses.Causes.Feedback.Confirmed;

export default function SelectDiagnoseSolutionAction<T extends FeedbackValue>({
  key,
  label,
  selected,
  onSelect,
  editable = true,
  error,
  errorTextColor,
}: SelectProps<T>) {
  const isInitial =
    selected == null || selected === enums.Diagnoses.Causes.Feedback.NotClassified;

  const confirmed = enums.Diagnoses.Causes.Feedback.Confirmed;
  const notConfirmed = enums.Diagnoses.Causes.Feedback.NotConfirmed;

  const colors = {
    confirmed: {
      bg: THEME.colors.success,
      text: THEME.colors.light,
      border: THEME.colors.success,
    },
    notConfirmed: {
      bg: THEME.colors.danger_light ?? "#fde7e9",
      text: THEME.colors.danger,
      border: THEME.colors.danger,
    },
    neutral: {
      bg: "transparent",
      text: THEME.colors.dark,
      border: THEME.colors.gray_dark,
    },
  };

  function handleSelect(v: FeedbackValue | null) {
    onSelect((v === null ? null : (v as T)) as T);
  }

  return (
    <View style={styles.container} key={key}>
      {!!label && (
        <Text style={[styles.label, !!error && { color: errorTextColor }]}>{label}</Text>
      )}

      <View style={{ flexDirection: "row", gap: 8 }}>
        {isInitial && (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!editable}
              onPress={() => handleSelect(confirmed)}
              style={[
                styles.btn,
                {
                  borderColor: colors.neutral.border,
                  backgroundColor: colors.neutral.bg,
                },
              ]}
            >
              <Text style={[styles.btnText, { color: colors.neutral.text }]}>
                {t("index.confirmed")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!editable}
              onPress={() => handleSelect(notConfirmed)}
              style={[
                styles.btn,
                {
                  borderColor: colors.neutral.border,
                  backgroundColor: colors.neutral.bg,
                },
              ]}
            >
              <Text style={[styles.btnText, { color: colors.neutral.text }]}>
                {t("index.notConfirmed")}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {!isInitial && selected === confirmed && (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!editable}
              onPress={() => handleSelect(confirmed)}
              style={[
                styles.btn,
                {
                  borderColor: colors.confirmed.border,
                  backgroundColor: colors.confirmed.bg,
                },
              ]}
            >
              <Text style={[styles.btnText, { color: colors.confirmed.text }]}>
                {t("index.confirmed")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!editable}
              onPress={() => handleSelect(null)}
              style={styles.resetBtn}
            >
              <Text style={styles.resetText}>↻</Text>
            </TouchableOpacity>
          </>
        )}

        {!isInitial && selected === notConfirmed && (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!editable}
              onPress={() => handleSelect(notConfirmed)}
              style={[
                styles.btn,
                {
                  borderColor: colors.notConfirmed.border,
                  backgroundColor: colors.notConfirmed.bg,
                },
              ]}
            >
              <Text style={[styles.btnText, { color: colors.notConfirmed.text }]}>
                {t("index.notConfirmed")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!editable}
              onPress={() => handleSelect(null)}
              style={styles.resetBtn}
            >
              <Text style={styles.resetText}>↻</Text>
            </TouchableOpacity>
          </>
        )}
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
  btn: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.normal,
  },
  resetBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: THEME.colors.gray_dark,
    alignItems: "center",
    justifyContent: "center",
  },
  resetText: {
    fontSize: 14,
    fontFamily: THEME.fonts.semiBold,
    color: THEME.colors.dark,
  },
});
