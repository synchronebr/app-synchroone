import { FlatList } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    gap: 8,
    paddingBottom: 24,
  },
})`` as typeof FlatList;

export const Content = styled.View`
  padding: 20px;
`;

export const Text = styled.Text``;
