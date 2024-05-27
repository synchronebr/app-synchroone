import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary_light};
  border-radius: 8px;
  flex-direction: row;
  padding: 8px 12px;
`;

export const Details = styled.View`
  flex: 1;
`;

export const Title = styled.Text``;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const IconContainer = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 128px;
  height: ${RFValue(40)}px;
  justify-content: center;
  width: ${RFValue(40)}px;
`;
