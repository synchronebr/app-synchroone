import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  /* background-color: ${({ theme }) => theme.colors.secondary_light}; */
  border-color: ${({ theme }) => theme.colors.gray};
  border-width: 1;
  border-radius: 12px;
  flex-direction: row;
  gap: 12px;
  padding: 8px 16px 8px 8px;
`;

export const Image = styled.Image`
  border-radius: 8px;
  height: ${RFValue(78)}px;
  width: ${RFValue(102)}px;
`;

export const Content = styled.View`
  flex: 1;
  gap: 2px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smallest}px;
  line-height: 15px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray_dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smallest}px;
  line-height: 21px;
`;

export const LastMeasurementInfo = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

interface ILastMeasurementTextInfo {
  status: 'S' | 'W' | 'D';
}

export const LastMeasurementTextInfo = styled.Text<ILastMeasurementTextInfo>`
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'S':
        return theme.colors.success;
      case 'W':
        return theme.colors.warning;
      case 'D':
        return theme.colors.danger;
      default:
        return theme.colors.light; 
    }
  }};
  border-radius: 128px;
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smallest}px;
  line-height: 15px;
  margin-bottom: 6px;
  padding: 4px;
`;

interface ICardStatusSafe {
  status: 'S' | 'W' | 'D' | 'IN';
}

export const CardStatusSafe = styled.View<ICardStatusSafe>`
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'S':
        return theme.colors.success;
      case 'W':
        return theme.colors.warning;
      case 'D':
        return theme.colors.danger;
      default:
        return theme.colors.light; 
    }
  }};
  /* line-height: 15px; */
  padding: 6px;
  border-radius: 8px;
  position: absolute;
  top: 6px;
  left: 5px;
`;

export const CardStatusSafeText = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smallest}px;
`;
