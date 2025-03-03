import styled from "styled-components/native";

import { NotificationCardStyleProps } from "./types";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<NotificationCardStyleProps>`
  background-color: ${({ isRead, theme }) =>
    isRead ? theme.colors.light : "rgba(30, 41, 59, 0.1)"};
  border-color: ${({ theme }) => theme.colors.gray};
  border-radius: 8px;
  border-width: 1px;
  padding: 8px 12px;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;

export const Text = styled.Text<NotificationCardStyleProps>`
  color: ${({ isRead, theme }) =>
    isRead ? theme.colors.gray_dark : theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  line-height: 18px;
`;
