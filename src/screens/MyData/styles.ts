import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
  gap: 24px;
`;

export const TextDiv = styled.View`
  gap: 2px;
  padding: 0 20px;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const SubText = styled.Text`
`;

export const ButtonWrapper = styled.View`
  margin-bottom: 48px;
  padding: 0 20px;
`;
