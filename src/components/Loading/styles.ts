import styled from "styled-components/native";

interface IContainerProps {
  bgColor?: string;
}

export const Container = styled.View<IContainerProps>`
  align-items: center;
  background-color: ${({ bgColor, theme }) => bgColor ? bgColor : theme.colors.primary};
  flex: 1;
  justify-content: center;
`;
