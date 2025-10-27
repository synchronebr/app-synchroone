import styled from "styled-components/native";

const FOOTER_HEIGHT = 72; // ajuste conforme o seu Button

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingBottom: 20 + FOOTER_HEIGHT,
  },
})`
  flex: 1;
`;

export const Title = styled.Text`
  margin-top: 6px;
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const SubTitle = styled.Text`
  margin-top: 6px;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.8;
`;

export const Footer = styled.View`
  padding: 12px 20px 16px;
  background-color: ${({ theme }) => theme.colors.light};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.primary_light};
`;

/* Resumo */
export const SectionTitle = styled.Text`
  margin-top: 12px;
  margin-bottom: 6px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const SummaryBlock = styled.View`
  margin-top: 8px;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.primary_light};
  gap: 4px;
`;

export const SummaryTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  color: ${({ theme }) => theme.colors.text_dark};
  margin-bottom: 2px;
`;

export const SummaryRow = styled.View`
  flex-direction: row;
  gap: 6px;
  flex-wrap: wrap;
`;

export const SummarySubValue = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.75;
  line-height: 17px;
  margin-left: 10px;
`;

export const SummaryLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const SummaryValue = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.9;
`;

export const SummarySolution = styled.View`
  margin-top: 6px;
  padding-left: 6px;
  gap: 2px;
`;

/* Campos finais */
export const Field = styled.View`
  margin-top: 10px;
  gap: 6px;
`;
export const FieldLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Row = styled.View`
  margin-top: 8px;
  flex-direction: row;
  gap: 16px;
`;

export const CheckItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const CheckSquare = styled.Text`
  font-size: 16px;
`;
export const CheckLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const ActionContainer = styled.View`
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
  align-items: stretch;
  gap: 4;
`;

export const ActionTitle = styled.Text`
  text-align: center;
  margin-top: 6px;
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const ActionSubTitle = styled.Text`
  text-align: center;
  margin-top: 6px;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.8;
`;