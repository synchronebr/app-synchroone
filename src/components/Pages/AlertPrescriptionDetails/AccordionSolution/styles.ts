import styled from "styled-components/native";


export const AccordionDiv = styled.View`
  background-color: ${({ theme }) => theme.colors.gray_light};
  border-radius: 6px;
  padding: 10px;
`;

export const AccordionHeader = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
`;

export const AccordionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  margin-bottom: 8px;
`;

export const AccordionChildren = styled.View`
  flex-direction: row;
  justify-content: start;
  margin-left: 16px;
  margin-top: 10px;
`;

export const AccordionDescription = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  margin-bottom: 8px;
`;
