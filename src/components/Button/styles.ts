import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 6px;
  justify-content: center;
  padding: 12px 16px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  text-align: center;
`;
