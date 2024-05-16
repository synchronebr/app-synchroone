import { forwardRef } from "react";
import { useTheme } from "styled-components/native";
import { Picker } from "@react-native-picker/picker";

import { DropdownProps } from "./types";
import { Text, Container } from "./styles";

export const Dropdown = forwardRef<Picker<string>, DropdownProps>(
  function Dropdown({ data, editable, label, ...rest }, ref) {
    const THEME = useTheme();

    return (
      <>
        {label && <Text>{label}</Text>}

        <Container>
          <Picker
            dropdownIconColor={
              editable ? THEME.colors.primary : THEME.colors.gray
            }
            itemStyle={{
              color: THEME.colors.primary,
              fontFamily: THEME.fonts.medium,
              fontSize: THEME.fontSize.normal,
            }}
            style={{
              fontFamily: THEME.fonts.medium,
              fontSize: THEME.fontSize.normal,
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
      </>
    );
  }
);
