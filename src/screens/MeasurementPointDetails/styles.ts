import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { rgba } from 'polished';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const Header = styled.View``;

export const Image = styled.Image`
  height: ${RFValue(240)}px;
  width: 100%;
`;

interface IAsset {
  status: 'S' | 'W' | 'D';
}
export const Asset = styled.View`
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'S':
        return rgba(22, 163, 74, 0.8);
      case 'W':
        return rgba(250, 204, 21, 1);
      case 'D':
        return rgba(238, 68, 68, 0.8);
      default:
        return rgba(30, 41, 59, 0.8);
    }
  }};
  bottom: 0;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
  padding: 16px 32px;
  position: absolute;
  width: 100%;
`;

export const Detail = styled.View``;

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

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
})``;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
  margin: 16px 0;
`;
