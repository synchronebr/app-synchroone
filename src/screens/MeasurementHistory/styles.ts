import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const WeekDayFilterContainer = styled.View`
  margin-bottom: 8px;
  padding: 0 20px;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    gap: 24,
    padding: 20,
  },
})``;
