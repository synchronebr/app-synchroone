import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, ErrorText } from "./styles";
import THEME from "../../../../global/styles/theme";
import { t } from "i18next";
import { enums } from "../../../../utils/enums";
import type { SelectProps } from "./types";
import { RotateCcwIcon } from 'lucide-react-native'

type FeedbackValue =
  | typeof enums.Diagnoses.Causes.Solutions.Feedback.NotClassified
  | typeof enums.Diagnoses.Causes.Solutions.Feedback.Performed
  | typeof enums.Diagnoses.Causes.Solutions.Feedback.NotPerformed;

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

  const confirmed = enums.Diagnoses.Causes.Solutions.Feedback.Performed;
  const notConfirmed = enums.Diagnoses.Causes.Solutions.Feedback.NotPerformed;

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
                {t("index.performed")}
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
                {t("index.notPerformed")}
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
                {t("index.performed")}
              </Text>
            </TouchableOpacity>

            {editable && (
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!editable}
              onPress={() => handleSelect(null)}
              style={styles.resetBtn}
            >
              <RotateCcwIcon size={15} />
            </TouchableOpacity>
            )}
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
                {t("index.notPerformed")}
              </Text>
            </TouchableOpacity>

            {editable && (
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!editable}
              onPress={() => handleSelect(null)}
              style={styles.resetBtn}
            >
              <RotateCcwIcon size={15} />
            </TouchableOpacity>
            )}
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
