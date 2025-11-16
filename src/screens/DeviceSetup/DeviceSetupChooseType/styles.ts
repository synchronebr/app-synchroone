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
`;
