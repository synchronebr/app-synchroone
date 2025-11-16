import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const Content = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  gap: 20;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.largest}px;
`

export const Description = styled.Text`
  text-align: center;
`
