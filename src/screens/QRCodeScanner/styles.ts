import { CameraView } from "expo-camera";
import styled from "styled-components/native";

const imagesSizes = 300;

export const Container = styled.View`
  flex: 1;
  gap: 16px;
  justify-content: center;
`;

export const Camera = styled(CameraView)`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  text-align: center;
`;

export const ButtonWrapper = styled.View`
  align-self: center;
  width: 50%;
`;

export const QRCode = styled.Image`
  align-self: center;
  height: ${imagesSizes}px;
  width: ${imagesSizes}px;
`;

export const Scanner = styled.Image`
  height: ${imagesSizes}px;
  width: ${imagesSizes}px;
`;
