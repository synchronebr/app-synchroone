import { FlatList } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const SubtitleContent = styled.View`
  align-items: center; 
  margin: -10px 0px 15px 0px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.normal};
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    gap: 8,
    paddingBottom: 24,
  },
})`` as typeof FlatList;

export const Content = styled.View`
  padding: 0px 20px 20px 20px;
`;

export const Text = styled.Text``;
