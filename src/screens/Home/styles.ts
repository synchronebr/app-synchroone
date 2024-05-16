import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
`;
