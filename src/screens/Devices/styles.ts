import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.light};
  padding-left: 20px;
  padding-right: 20px;
`;

/** Wrapper só para as tabs (sem flex) */
export const TabsContent = styled.View``;

/** Área rolável dos cards */
export const ScrollArea = styled.ScrollView`
  margin-top: 20;
`;

/** Grid/stack dos cards (usaremos gap via contentContainerStyle do ScrollView) */
export const ContentCards = styled.View`
  gap: 10px;
`;

/** Footer fixo (fora do ScrollView) */
export const Footer = styled.View`
  padding-top: 10px;
  padding-bottom: 30px;
  background-color: ${({ theme }) => theme.colors.light};
`;
