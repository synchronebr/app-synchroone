import React, { forwardRef, useEffect, useMemo, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  FocusEvent,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native";

import THEME from "../../global/styles/theme";

type TextAreaProps = {
  label?: string;
  labelColor?: string;
  error?: string;
  errorTextColor?: string;

  editable?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  placeholderTextColor?: string;

  maxLength?: number;        // exibe contador se informado
  showCounter?: boolean;     // força mostrar/ocultar contador
  minRows?: number;          // ex.: 3  (altura mínima aproximada)
  maxRows?: number;          // ex.: 8  (altura máxima para auto-grow)
  autoGrow?: boolean;        // padrão: true

  // Handlers do TextInput
  onChangeText?: (text: string) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;

  // Outras props do TextInput que você queira repassar
  multiline?: true;          // será sempre true, mas deixo aqui pro TS aceitar
  style?: any;
};

export const InputArea = forwardRef<TextInput, TextAreaProps>(function TextArea(
  {
    label,
    labelColor,
    error,
    errorTextColor,

    editable = true,
    value,
    defaultValue,
    placeholder,
    placeholderTextColor,

    maxLength,
    showCounter,
    minRows = 3,
    maxRows = 10,
    autoGrow = true,

    onChangeText,
    onFocus,
    onBlur,
    style,
    ...rest
  },
  ref
) {
  // Detecta texto inicial (controlado / não-controlado)
  const initialHasText =
    (typeof value === "string" && value.length > 0) ||
    (typeof defaultValue === "string" && defaultValue.length > 0);

  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(initialHasText);
  const [content, setContent] = useState(value ?? defaultValue ?? "");
  const [measuredLineHeight, setMeasuredLineHeight] = useState<number>(0);
  const lineHeight = useMemo(
    () => measuredLineHeight || Math.round(THEME.fontSize.normal * 1.4),
    [measuredLineHeight]
  );

  // Alturas mínima e máxima (baseadas no número de linhas)
  const minHeight = useMemo(() => minRows * lineHeight, [minRows, lineHeight]);
  const maxHeight = useMemo(() => maxRows * lineHeight, [maxRows, lineHeight]);

  // Altura atual (auto-grow)
  const [height, setHeight] = useState<number>(minHeight);

  // Sincroniza quando for controlado externamente
  useEffect(() => {
    if (typeof value === "string") {
      setContent(value);
      setHasText(value.length > 0);
    }
  }, [value]);

  const handleFocus = (e: FocusEvent) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChangeText = (text: string) => {
    setContent(text);
    setHasText(text.length > 0);
    onChangeText?.(text);
  };

  const onContentSizeChange = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    if (!autoGrow) return;
    const next = Math.max(minHeight, Math.min(e.nativeEvent.contentSize.height, maxHeight));
    setHeight(next);
  };

  const borderColor =
    editable && (isFocused || hasText) ? THEME.colors.primary : THEME.colors.gray;

  const counterVisible = typeof maxLength === "number" ? (showCounter ?? true) : !!showCounter;

  return (
    <>
      {label && (
        <Text style={[styles.label, { color: labelColor || THEME.colors.dark }]}>
          {label}
        </Text>
      )}

      <View style={[styles.wrapper, { borderColor }]}>
        <TextInput
          ref={ref}
          {...rest}
          multiline
          value={content}
          defaultValue={undefined} // evitamos conflito com 'value'
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onContentSizeChange={onContentSizeChange}
          style={[
            styles.field,
            style,
            {
              // topo no Android
              textAlignVertical: "top",
              // cores
              color: editable ? THEME.colors.primary : THEME.colors.gray,
              // alturas
              minHeight,
              height: autoGrow ? height : undefined,
              // garante um lineHeight para cálculo
              lineHeight,
            },
          ]}
          editable={editable}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor ??
            (editable ? THEME.colors.gray_dark : THEME.colors.gray)
          }
          maxLength={maxLength}
          // ajuda o teclado a não “corrigir senha”
          autoCorrect
          autoCapitalize="sentences"
          // medir lineHeight uma vez (hack simples)
          onLayout={(e) => {
            if (!measuredLineHeight) {
              // aproxima por font size se não tiver medição direta
              setMeasuredLineHeight(Math.round(THEME.fontSize.normal * 1.4));
            }
          }}
        />
      </View>

      <View style={styles.footerRow}>
        {!!error && (
          <Text
            style={[
              styles.errorText,
              { color: errorTextColor || THEME.colors.danger },
            ]}
          >
            {error}
          </Text>
        )}

        {counterVisible && (
          <Text style={styles.counter}>
            {(content?.length ?? 0)}
            {typeof maxLength === "number" ? ` / ${maxLength}` : ""}
          </Text>
        )}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  label: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: THEME.fontSize.normal,
    marginBottom: 4,
  },
  wrapper: {
    backgroundColor: THEME.colors.light,
    borderRadius: 6,
    borderWidth: 0.5,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "android" ? 6 : 10,
  },
  field: {
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.normal,
    // minWidth: 0 não é necessário aqui
  },
  footerRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: {
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.smallest,
    marginLeft: 8,
  },
  counter: {
    marginRight: 8,
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.smallest,
    color: THEME.colors.gray_dark,
    opacity: 0.8,
  },
});
