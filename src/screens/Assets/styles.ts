import { FlatList } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const SearchContainer = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 2px;
  margin-bottom: 16px;
  padding: 0 30px 0 30px;
  justify-content: center;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    gap: 8,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
})`` as typeof FlatList;

export const Content = styled.View`
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  padding: 0 20px;
`;

export const Filter = styled.View`
  /* background-color: red; */
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownWrapper = styled.View``;
