import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  background-color: #0369a11a;
  border-radius: 16px;
  flex: 1;
  flex-direction: row;
  gap: 10px;
  padding: 16px;
`;

export const IconContainer = styled.TouchableOpacity`
  padding: ${RFValue(4)}px ${RFValue(4)}px 0 0;
`;

export const Content = styled.View`
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
