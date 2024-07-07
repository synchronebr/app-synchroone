import styled from "styled-components/native";

export const BluetoothOffContainer = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
  justify-content: center;
  padding: 0 32px;
`;

export const BluetoothOffMessage = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
  text-align: center;
`;

export const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
  justify-content: center;
  padding: 0 32px;
`;

export const ConnectingInfo = styled.View`
  gap: 16px;
  padding: 16px 0;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
  text-align: center;
`;
