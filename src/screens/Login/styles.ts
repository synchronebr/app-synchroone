import { Platform } from "react-native";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import THEME from "../../global/styles/theme";

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    backgroundColor: THEME.colors.primary,
    minHeight: "100%",
    paddingHorizontal: RFValue(20),
  },
  keyboardShouldPersistTaps: "always",
})``;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  flex: 1;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  gap: 100px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${RFValue(Platform.OS === "android" ? 48 : 36)}px;
  margin: ${RFValue(96)}px 0;
  text-align: center;
`;

export const Form = styled.View`
  margin-bottom: 48px;
`;

export const InputWrapper = styled.View`
  margin-bottom: 16px;
`;

export const ButtonWrapper = styled.View`
  margin-top: 8px;
`;
