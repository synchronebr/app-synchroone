import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { rgba } from "polished";

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
  status: "S" | "W" | "D";
}
export const Asset = styled.View`
  background-color: ${({ theme, status }) => {
    switch (status) {
      case "S":
        return rgba(22, 163, 74, 0.8);
      case "W":
        return rgba(250, 204, 21, 1);
      case "D":
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
    gap: 16,
    marginTop: 16,
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

export const Card = styled.View`
  background-color: rgba(2, 132, 199, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
`;

export const CardTitle = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;

export const CardText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;

export const CardSubtitle = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  line-height: 21px;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

export const InfoData = styled.View``;

export const TemperatureCard = styled.View`
  align-items: center;
  background-color: rgba(2, 132, 199, 0.1);
  border-radius: 8px;
  gap: 8px;
  padding: 8px 12px;
`;

export const Temperature = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 4px;
`;

export const Graphics = styled.View`
  margin-bottom: 42px;
`;

export const GraphicsButtons = styled.View`
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const GraphicButton = styled.TouchableOpacity`
  background-color: rgba(241, 245, 249, 1);
  border-radius: 8px;
  flex: 1;
  padding: 8px 18px;
`;

export const GraphicButtonText = styled.Text`
  color: rgba(30, 41, 59, 0.6);
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smallest};
  line-height: 20px;
  text-align: center;
`;

export const GraphicImage = styled.Image`
  height: ${RFValue(300)}px;
  margin-bottom: 16px;
  width: 100%;
`;

export const StatusHistoryContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  border-color: rgba(241, 245, 249, 1);
  border-radius: 8px;
  border-width: 10px;
  margin-bottom: 5px;
  padding: 8px;
`;

export const StatusHistory = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.largest};
  font-weight: bold;
  text-align: center;
`;
