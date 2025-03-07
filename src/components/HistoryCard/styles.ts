import styled from "styled-components/native";

import { HistoryCardCircleStyleProps, HistoryCardStyleProps } from "./types";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  gap: 8px;
`;

export const Progress = styled.View`
  align-items: center;
  gap: 4px;
`;

export const Circle = styled.View<HistoryCardCircleStyleProps>`
  background-color: ${({ read, type, theme }) => 
    read ? theme.colors.neutral : 
    type === "D" ? theme.colors.danger 
    : type === "S" ? theme.colors.success
    : type === "W" ? theme.colors.warning_dark
    : null
  };
  border-color: ${({ type, theme }) =>
    type === "D"
      ? theme.colors.danger
      : type === "S"
      ? theme.colors.success
      : type === "W"
      ? theme.colors.warning_dark
      : theme.colors.success}; 
  border-radius: 64px;
  border-width: 2px;
  height: 12px;
  width: 12px;
`;

export const Line = styled.View`
  background-color: ${({ type, theme }) =>
    type === "D"
      ? theme.colors.danger
      : type === "S"
      ? theme.colors.success
      : type === "W"
      ? theme.colors.warning_dark
      : theme.colors.success}; 
  flex: 1;
  width: 1px;
`;

export const Card = styled.View<HistoryCardStyleProps>`
  /* background-color: ${({ type, theme }) =>
    type === "D"
      ? theme.colors.danger
      : type === "S"
      ? theme.colors.success
      : type === "W"
      ? theme.colors.warning
      : theme.colors.success}; */

  border-color: ${({ type, theme }) =>
    type === "D"
      ? theme.colors.danger
      : type === "S"
      ? theme.colors.success
      : type === "W"
      ? theme.colors.warning_dark
      : theme.colors.success};
  border-radius: 8px;
  border-width: 1px;
  flex: 1;
  padding: 8px 8px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
  flex-flow: wrap;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ type, theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;

export const Time = styled.Text`
  color: ${({ type, theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 10px;
  line-height: 24px;
`;

export const Content = styled.View``;

export const Text = styled.Text`
  color: ${({ type, theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  line-height: 18px;
  margin-bottom: 4px;
`;

export const TextPath = styled.Text`
  color: ${({ type, theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 8px;
  line-height: 18px;
  margin-bottom: 2px;
`;
