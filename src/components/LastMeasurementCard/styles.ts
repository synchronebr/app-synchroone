import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary_light};
  border-radius: 8px;
  flex-direction: row;
  padding: 8px 12px;
`;

export const Details = styled.View`
  flex: 1;
  gap: 8px;
`;

export const MeasurementHistory = styled.View`
  flex-direction: row;
  gap: 8px;
  position: absolute;
  right: 0;
`;

export const MeasurementHistoryText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smallest}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const Temperature = styled.View`
  align-items: center;
  bottom: 0;
  flex-direction: row;
  gap: 4px;
  position: absolute;
  right: 0;
`;
