import { FlatList } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 18px;
  margin-bottom: 16px;
  padding: 0 20px;
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
