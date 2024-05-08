import React, { forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaskInput from "react-native-mask-input";

import SearchIcon from "../../assets/icons/search.svg";
import VisibilityIcon from "../../assets/icons/visibility.svg";
import VisibilityOffIcon from "../../assets/icons/visibility_off.svg";

import { InputProps } from "./types";
import THEME from "../../global/styles/theme";

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { editable = true, error, label, searchable, secureTextEntry, ...rest },
  ref
) {
  const [passwordHidden, setPasswordHidden] = useState(secureTextEntry);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.input,
          {
            borderColor: editable ? THEME.colors.primary : THEME.colors.gray,
          },
        ]}
      >
        {searchable && (
          <SearchIcon
            fill={editable ? THEME.colors.primary : THEME.colors.gray}
          />
        )}

        <MaskInput
          style={[
            styles.field,
            {
              color: editable ? THEME.colors.primary : THEME.colors.gray,
              paddingLeft: searchable ? 8 : 0,
            },
          ]}
          editable={editable}
          placeholderTextColor={
            editable ? THEME.colors.gray_dark : THEME.colors.gray
          }
          secureTextEntry={passwordHidden}
          {...rest}
          ref={ref}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setPasswordHidden(!passwordHidden)}
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
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
});

const styles = StyleSheet.create({
  label: {
    color: THEME.colors.dark,
    fontFamily: THEME.fonts.semiBold,
    fontSize: THEME.fontSize.normal,
    marginBottom: 6,
  },
  input: {
    alignItems: "center",
    backgroundColor: THEME.colors.light,
    borderRadius: 6,
    borderWidth: 0.5,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  field: {
    flex: 1,
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.normal,
  },
  eyeIcon: {
    marginLeft: 16,
  },
  errorText: {
    color: THEME.colors.danger,
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.smallest,
    marginLeft: 8,
    marginTop: 4,
  },
});
