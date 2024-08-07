import styled from "styled-components/native";

interface IContainerProps {
  selected: boolean;
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<IContainerProps>`
  align-items: center;
  background-color: ${({ selected, theme }) => selected ? theme.colors.light : theme.colors.secondary};
  border-radius: 6px;
  justify-content: center;
  padding: 8px 16px;
  border: 1px solid ${({ selected, theme }) => selected ? theme.colors.secondary : 'transparent'};;
`;

export const Title = styled.Text<IContainerProps>`
  color: ${({ selected, theme }) => selected ? theme.colors.secondary : theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
`;
