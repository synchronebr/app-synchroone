import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  background-color: #0369a11a;
  border-radius: 16px;
  flex: 1;
  flex-direction: row;
  gap: 4px;
  padding: 16px;
`;

export const IconContainer = styled.TouchableOpacity`
  margin-right: 6px;
`;

export const Content = styled.View`
  flex: 1;
  gap: 2px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smallest}px;
  line-height: 15px;
`;
