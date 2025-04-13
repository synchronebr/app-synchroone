import { forwardRef } from "react";
import { useTheme } from "styled-components/native";
import { Picker } from "@react-native-picker/picker";

import { DropdownProps } from "./types";
import { Text, Container, ErrorText } from "./styles";

export const Dropdown = forwardRef<Picker<string>, DropdownProps>(
  function Dropdown(
    { data, editable, error, errorTextColor, label, ...rest },
    ref
  ) {
    const THEME = useTheme();

    return (
      <>
        {label && <Text>{label}</Text>}

        <Container>
          <Picker
            dropdownIconColor={
              editable ? THEME.colors.primary : THEME.colors.gray
            }
            enabled={editable}
            itemStyle={{
              color: error ? errorTextColor : THEME.colors.primary,
              fontFamily: THEME.fonts.medium,
              fontSize: THEME.fontSize.normal,
            }}
            style={{
              fontFamily: THEME.fonts.medium,
              fontSize: THEME.fontSize.normal,
              color: error ? errorTextColor : THEME.colors.primary,
            }}
            ref={ref}
            {...rest}
          >
            {data.map((item) => (
              <Picker.Item
                key={item.value}
                color={editable ? THEME.colors.primary : THEME.colors.gray}
                fontFamily={THEME.fonts.medium}
                label={item.label}
                style={{
                  color: editable ? THEME.colors.dark : THEME.colors.gray_dark,
                  fontSize: THEME.fontSize.normal,
                }}
                value={item.value}
              />
            ))}
          </Picker>
        </Container>
        {error && (
          <ErrorText errorTextColor={errorTextColor}>{error}</ErrorText>
        )}
      </>
    );
  }
);
