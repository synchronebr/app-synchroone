import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  flex: 1;
  justify-content: center;
`;
