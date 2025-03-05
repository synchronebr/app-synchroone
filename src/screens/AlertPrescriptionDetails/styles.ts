import { margin } from "polished";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
  padding: 20px;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    // paddingHorizontal: 20,
    marginTop: 10,
  },
})``;

export const Divider = styled.View`
  background-color: ${({ theme }) => theme.colors.gray};
  border-color: ${({ theme }) => theme.colors.gray};
  border-width: 0.5px;
  margin: 16px 0;
`;

export const HeaderDiv = styled.View`
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  /* margin: 20px 0; */
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
`;

export const HeaderDescription = styled.Text`
  color: ${({ theme }) => theme.colors.gray_dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
  line-height: 18px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
  line-height: 18px;
  margin: 6px 0 10px 0;
`;

export const AccordionSolutionDiv = styled.View`
  margin-bottom: 16px;
`;