import styled from "styled-components/native";

export const Container = styled.View`
    padding-left: 10px;
    padding-right: 10px;
    background-color: ${({ theme }) => theme.colors.primary_light};
    flex-direction: row;
    gap: 10;
    border-radius: 4px;
`;

export const LeftContainer = styled.View`
    flex-direction: row;
    align-items: center;
    flex: 1;
    gap: 10;
`;

export const ImageContainer = styled.View`
    /* flex: 1; */
`;

export const Image = styled.Image`
  border-radius: 8px;
  height: 80px;
  width: 80px;
`;

interface IStatusCardColorProps {
  status: string;
}

export const StatusCard = styled.View<IStatusCardColorProps>`
  padding: 2px 6px;
  border-radius: 4px;
  align-self: flex-start; /* faz o efeito do FIT-CONTENT no RN */
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "ON":
        return theme.colors.success;
      case "OF":
        return theme.colors.danger;
      case "NG":
        return theme.colors.primary;
      case "NC":
        return theme.colors.light;
      default:
        return theme.colors.gray;
    }
  }};
`;

export const StatusCardText = styled.Text<IStatusCardColorProps>`
    color: ${({ status, theme }) => {
        switch (status) {
        case "NC":
            return theme.colors.primary;
        default:
            return theme.colors.light;
        }
    }};
    font-size: 8;
`;


export const TextContainer = styled.View`
    justify-content: center;
    gap: 4;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
`;

export const Subtitle = styled.Text`
    color: ${({ theme }) => theme.colors.gray_dark};
    font-size: ${({ theme }) => theme.fontSize.smaller};
`;

export const RightIcons = styled.View`
    justify-content: center;
    /* align-items: center; */
    /* background-color: rebeccapurple; */
`;
