import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  border-radius: 8px;
  flex-direction: row;
`;

export const Details = styled.View`
  flex: 1;
  gap: 8px;
`;

export const CardViews = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
  width: 100%;
`;

export const CardViewsTitle = styled.Text`
`;

export const CardView = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary_light};
  padding: 8px 12px;
  border-radius: 4px;
`;

export const CardViewTemperature = styled.View`
  /* flex: 1; */
  flex-direction: row;
  gap: 2px;
  background-color: ${({ theme }) => theme.colors.secondary_light};
  padding: 8px;
  border-radius: 4px;
`;

export const CardViewTitle = styled.Text``;

export const CardViewValue = styled.Text``;

export const MeasurementHistory = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
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

