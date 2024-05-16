import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
  padding: 20px;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(28)}px;
  text-align: center;
`;

export const NotificationsIconContainer = styled.View`
  padding: ${RFValue(6)}px ${RFValue(6)}px 0 0;
  position: absolute;
  right: 0;
`;

export const GreetingsContainer = styled.View`
  align-items: center;
  border-color: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  border-width: 1px;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 20px;
  padding: 18px 26px;
`;

export const GreetingsMessage = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
  text-align: center;
`;

export const Buttons = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 16px;
`;
