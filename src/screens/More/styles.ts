import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
  padding: 0 20px;
`;

export const Buttons = styled.View`
  gap: 8px;
`;
