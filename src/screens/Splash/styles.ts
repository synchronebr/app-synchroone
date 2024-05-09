import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  flex: 1;
`;

export const Content = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;
