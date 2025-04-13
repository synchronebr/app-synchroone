import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const Scroll = styled.ScrollView`
  padding: 0 20px;
`;

export const Form = styled.View`
  margin: 10px 0 48px 0;
  gap: 16px;
`;

export const Wrapper = styled.View``;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;
