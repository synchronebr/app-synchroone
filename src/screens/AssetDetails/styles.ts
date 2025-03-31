import { FlatList } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { rgba } from "polished";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const Header = styled.View``;

export const Image = styled.Image`
  height: ${RFValue(240)}px;
  width: 100%;
`;

export const Icon = styled.View`
  align-items: center;
  background-color: #ffffff;
  border-radius: 256px;
  justify-content: center;
`;

interface IAsset {
  status: "S" | "W" | "D";
}
export const Asset = styled.View<IAsset>`
  background-color: ${({ theme, status }) => {
    switch (status) {
      case "S":
        return rgba(22, 163, 74, 0.9);
      case "W":
        return rgba(250, 204, 21, 0.9);
      case "D":
        return rgba(238, 68, 68, 0.9);
      default:
        return rgba(30, 41, 59, 0.9);
    }
  }};
  bottom: 0;
  gap: 8px;
  padding: 16px 32px;
  position: absolute;
  width: 100%;
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

export const Content = styled.View`
  padding: 18px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
  margin: 16px 0;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    gap: 8,
    paddingBottom: 24,
  },
})`` as typeof FlatList;

export const DiagnosesButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  display: flex;
  gap: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DiagnosesButtonText = styled.Text`
  text-align: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.light};
`;
