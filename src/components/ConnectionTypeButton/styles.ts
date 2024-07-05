import styled from "styled-components/native";

import { ConnectionButtonStyleProps } from "./types";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<ConnectionButtonStyleProps>`
  align-items: center;
  border: 1px;
  border-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.dark : theme.colors.gray};
  border-radius: 10px;
  gap: 4px;
  justify-content: center;
  padding: 16px 26px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
`;
