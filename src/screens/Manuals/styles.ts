import { FlatList } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 20,
  },
})`` as typeof FlatList;
