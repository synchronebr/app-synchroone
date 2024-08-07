import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 36,
  },
})``;

export const Form = styled.View`
  gap: 12px;
  margin: 8px 0 16px 0;
`;

export const DropdownWrapper = styled.View``;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;

export const MinutesInterval = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.View`
  margin-bottom: 32px;
`;

export const Content = styled.View`
  padding: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;