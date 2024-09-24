import styled from "styled-components/native";
import { WeekDayFilterStyleProps } from "./types";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const WeekDay = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  gap: 12px;
`;

export const Day = styled.Text<WeekDayFilterStyleProps>`
  color: ${({ isSelected, theme }) =>
    !isSelected ? theme.colors.gray_dark : theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;

export const DateDiv = styled.Text<WeekDayFilterStyleProps>`
  color: ${({ isSelected, theme }) =>
    !isSelected ? theme.colors.gray_dark : theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;
