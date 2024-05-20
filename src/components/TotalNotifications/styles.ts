import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.danger};
  border-radius: 128px;
  height: 20px;
  justify-content: center;
  position: absolute;
  right: -4px;
  top: -6px;
  width: 20px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smallest}px;
`;
