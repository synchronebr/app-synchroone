import styled from "styled-components/native";

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
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 28px;
  text-align: center;
`;

export const NotificationsIconContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
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