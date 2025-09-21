import { FlatList } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { rgba } from "polished";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled.View`
  flex: 1;
  min-height: 200;
`;

export const Image = styled.Image`
  height: ${RFValue(240)}px;
  width: 100%;
`;

/** Barra superior absoluta sobre a imagem */
export const TopBar = styled(SafeAreaView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  /* layout */
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  z-index: 2;
`;

/** Ícones da direita (sem width fixo) */
export const RightIcons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

/* Removemos o antigo `Icons` que tinha aspas em valores e não era usado */

interface IAsset {
  status: "S" | "W" | "D" | "IN" | string;
}
export const Asset = styled.View<IAsset>`
  background-color: ${({ status }) => {
    switch (status) {
      case "S":
        return rgba(22, 163, 74, 0.7);
      case "W":
        return rgba(250, 204, 21, 0.7);
      case "D":
        return rgba(238, 68, 68, 0.7);
      default:
        return rgba(30, 41, 59, 0.7);
    }
  }};
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 16px 32px;
  gap: 8px;
  z-index: 1; /* fica abaixo do TopBar, acima da imagem */
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
  line-height: 24px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  line-height: 18px;
  text-align: center;
`;
