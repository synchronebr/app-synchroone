import React, { forwardRef, useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FocusEvent,
} from "react-native";
import MaskInput from "react-native-mask-input";

import SearchIcon from "../../assets/icons/search.svg";
import VisibilityIcon from "../../assets/icons/visibility.svg";
import VisibilityOffIcon from "../../assets/icons/visibility-off.svg";

import THEME from "../../global/styles/theme";

import { InputProps } from "./types";
import { QRCodeButton } from "../QRCodeButton";

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    editable = true,
    error,
    errorTextColor,
    label,
    labelColor,
    searchable,
    secureTextEntry,
    qrcode,
    ...rest
  },
  ref
) {
  const [passwordHidden, setPasswordHidden] = useState(!!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  // Detecta se há texto (controlado ou não-controlado)
  const initialHasText =
    (typeof rest.value === "string" && rest.value.length > 0) ||
    (typeof (rest as any).defaultValue === "string" &&
      (rest as any).defaultValue.length > 0);

  const [hasText, setHasText] = useState<boolean>(initialHasText);

  // Sincroniza quando 'value' controlado mudar
  useEffect(() => {
    if (typeof rest.value === "string") {
      setHasText(rest.value.length > 0);
    }
  }, [rest.value]);

  // preserva handlers vindos por props
  const { onFocus, onBlur, onChangeText } = rest;

  const handleFocus = (e: FocusEvent) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // assinatura do MaskInput: (masked, unmasked, obfuscated?) -> void
  const handleChangeText = (masked: string, unmasked?: string) => {
    setHasText(Boolean((unmasked ?? masked)?.length));
    // repassa pro handler original (se existir)
    // @ts-ignore - respeita assinatura que você tiver no seu InputProps
    onChangeText?.(masked, unmasked);
  };

  const searchFill =
    editable && (isFocused || hasText) ? THEME.colors.dark : THEME.colors.gray;

  return (
    <>
      {label && (
        <Text style={[styles.label, { color: labelColor || THEME.colors.dark }]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.input,
          { borderColor: editable && (isFocused || hasText) ? THEME.colors.primary : THEME.colors.gray },
        ]}
      >
        {searchable && (
          <View style={styles.leftIcon}>
            <SearchIcon fill={searchFill} />
          </View>
        )}

        <MaskInput
          ref={ref}
          {...rest}
          style={[
            styles.field,
            {
              color: editable ? THEME.colors.primary : THEME.colors.gray,
            },
          ]}
          editable={editable}
          placeholderTextColor={
            editable ? THEME.colors.gray_dark : THEME.colors.gray
          }
          secureTextEntry={!!secureTextEntry && passwordHidden}
          textContentType="oneTimeCode"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
        />

        <View style={styles.rightIcons}>
          {qrcode && <QRCodeButton />}

          {secureTextEntry && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setPasswordHidden((v) => !v)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {passwordHidden ? (
                <VisibilityIcon
                  fill={editable ? THEME.colors.secondary : THEME.colors.gray}
                />
              ) : (
                <VisibilityOffIcon
                  fill={editable ? THEME.colors.secondary : THEME.colors.gray}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {error && (
        <Text
          style={[
            styles.errorText,
            { color: errorTextColor || THEME.colors.danger },
          ]}
        >
          {error}
        </Text>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  label: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: THEME.fontSize.normal,
  },
  input: {
    alignItems: "center",
    backgroundColor: THEME.colors.light,
    borderRadius: 6,
    borderWidth: 0.5,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "android" ? 8 : 12,
  },
  leftIcon: {
    marginRight: 8,
  },
  field: {
    flex: 1,
    minWidth: 0,
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.normal,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  rightIconSpacing: {
    marginRight: 12,
  },
  errorText: {
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.smallest,
    marginLeft: 8,
    marginTop: 4,
  },
});
