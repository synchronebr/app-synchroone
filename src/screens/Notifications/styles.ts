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
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
})`` as typeof FlatList;
