import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  gap: 20;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  text-align: center;
`;
