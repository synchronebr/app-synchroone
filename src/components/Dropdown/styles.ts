import styled from "styled-components/native";

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  margin-bottom: 8px;
`;

export const Container = styled.View`
  border-color: ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
  border-width: 1px;
`;
