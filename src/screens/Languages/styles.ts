import styled from "styled-components/native";

/** Layout geral da tela */
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.light};
  padding-bottom: 20px;
`;

export const LanguageContent = styled.View`
  flex: 1;
  margin: 10px 0px;
  padding: 0 20px;
  gap: 10;
`;

/** Cartão do idioma (visual da imagem) */
export const LanguageCard = styled.TouchableOpacity<{ selected?: boolean }>`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary_light : theme.colors.light};
  border-radius: 4px;
  padding: 4px;
`;

export const CardInner = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardLeft = styled.View`
  margin-right: 12px;
`;

/** Flag redonda 48px */
export const FlagWrapper = styled.View`
`;

export const FlagImage = styled.Image`
  height: 100%;
  width: 100%;
`;

export const CardContent = styled.View`
  flex: 1;
  min-height: 48px;
  justify-content: center;
`;

export const LanguageRow = styled.View`
  flex-direction: row;
  align-items: baseline;
  flex-wrap: nowrap;
`;

export const LanguageName = styled.Text`
  flex-shrink: 1;
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const LanguageSmall = styled.Text`
  font-size: ${({ theme }) => Math.max(12, theme.fontSize.smaller)}px;
  color: ${({ theme }) => theme.colors.gray_dark ?? theme.colors.gray};
`;

export const Footer = styled.View`
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
`;
