import { FlatList } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const TuneIconContainer = styled.View`
  align-items: flex-end;
  margin: 0 0 12px 0;
  padding: 0 20px;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    gap: 8,
    paddingHorizontal: 20,
  },
})`` as typeof FlatList;

export const Content = styled.View`
  padding: 20px;
  margin-bottom: 10px;
`;

export const Text = styled.Text``;

export const Footer = styled.View`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  padding: 16px;
`;

export const Pressable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const FooterText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
`;
