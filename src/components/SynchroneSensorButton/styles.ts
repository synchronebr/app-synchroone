import styled from "styled-components/native";
import { SynchroneSensorButtonStyleProps } from "./types";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<SynchroneSensorButtonStyleProps>`
  align-items: center;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary : "#94A3B81A"};
  border-radius: 16px;
  flex: 1;
  flex-direction: row;
  gap: 10px;
  padding: 16px;
`;

export const Content = styled.View`
  gap: 2px;
`;

export const Title = styled.Text<SynchroneSensorButtonStyleProps>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.light : theme.colors.gray_dark};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;

export const Subtitle = styled.Text<SynchroneSensorButtonStyleProps>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.light : theme.colors.gray_dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smallest}px;
  line-height: 15px;
`;
