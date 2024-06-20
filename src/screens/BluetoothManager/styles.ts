import { FlatList } from "react-native";
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
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 16,
  },
})`` as typeof FlatList;

export const Divider = styled.View`
  height: 0.5px;
  background-color: ${({ theme }) => theme.colors.gray_dark};
  width: 100%;
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
