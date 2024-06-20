import styled from "styled-components/native";

import { ConnectionInfoTextStyleProps } from "./types";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  flex-direction: row;
  gap: 32px;
  padding: 8px;
`;

export const Info = styled.View`
  align-items: flex-start;
  flex: 1;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
  margin-bottom: 4px;
  text-align: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  margin-bottom: 4px;
  text-align: center;
`;

export const ConnectionInfoText = styled.Text<ConnectionInfoTextStyleProps>`
  color: ${({ isConnected, theme }) =>
    isConnected ? theme.colors.success : theme.colors.danger};
  font-family: ${({ isConnected, theme }) =>
    isConnected ? theme.fonts.semiBold : theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  margin-bottom: 4px;
`;
