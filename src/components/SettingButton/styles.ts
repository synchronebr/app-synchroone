import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray};
  flex-direction: row;
  gap: 16px;
  padding: 0 4px 16px 4px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;
