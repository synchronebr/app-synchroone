import styled from "styled-components/native";

import { HistoryCardStyleProps } from "./types";

export const Container = styled.View<HistoryCardStyleProps>`
  background-color: ${({ type, theme }) =>
    type === "danger"
      ? theme.colors.danger
      : type === "success"
      ? theme.colors.success
      : type === "warning"
      ? theme.colors.warning
      : theme.colors.success};
  border-radius: 8px;
  padding: 12px 8px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;

export const Time = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
  line-height: 24px;
`;

export const Content = styled.View``;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  line-height: 18px;
`;
