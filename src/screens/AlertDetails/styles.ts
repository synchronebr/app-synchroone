import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
})``;


export const PieceDiv = styled.View`
  align-items: start;
  flex-direction: column;
  gap: 10px;
  justify-content: start;
  gap: 4px;
  margin: 10px 0;
`;

export const PieceText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
`;

export const PiecePath = styled.Text`
  color: ${({ theme }) => theme.colors.gray_dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  margin: 6px 0;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray_dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  line-height: 18px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 18px;
`;

export const Divider = styled.View`
  background-color: ${({ theme }) => theme.colors.gray};
  border-color: ${({ theme }) => theme.colors.gray};
  border-width: 0.5px;
  margin: 16px 0;
`;

export const HistoryCards = styled.View`
  gap: 16px;
  margin: 16px 0;
`;

export const SeeMoreButton = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})``;

export const SeeMore = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  line-height: 18px;
  text-align: right;
`;

export const ShareButtonContainer = styled.View`
  margin-bottom: 32px;
`;


export const DiagnoseDescription = styled.View`
  background-color: ${({ theme }) => theme.colors.gray_light};
  padding: 8px;
  border-radius: 5px;
`;

export const DiagnoseDescriptionTitleDiv = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 4px;
  margin-bottom: 16px;
`;

export const DiagnoseDescriptionTitle = styled.Text`
`;

export const DiagnoseDescriptionSubtitle = styled.Text``;

export const CardsInfo = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

interface CardInfoProps {
  hazardousness: 'S' | 'W' | 'D' | 'IN';
}
export const CardInfo = styled.View<CardInfoProps>`
  background-color: ${({ theme, hazardousness }) =>
    hazardousness === "S"
      ? theme.colors.success_light
      : hazardousness === "W"
      ? theme.colors.warning_light
      : theme.colors.danger_light};
  border-color: ${({ theme, hazardousness }) =>
    hazardousness === "S"
      ? theme.colors.success
      : hazardousness === "W"
      ? theme.colors.warning
      : theme.colors.danger};
  border-width: 1px;
  padding: 16px;
  text-align: center;
  border-radius: 5px;
  width: 100px;
`;

export const CardInfoTitle = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  margin-bottom: 5px;
`;

export const CardInfoSubtitle = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 12px;
`;


export const CardCauses = styled.View`
  margin-top: 25px;
`;

export const CardCause = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const CardCauseTitle = styled.Text``;

export const CardCauseButton = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.gray_light};
  padding: 8px;
  border-radius: 5px;
`;