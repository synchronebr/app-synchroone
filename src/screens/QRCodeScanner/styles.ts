import { Camera as ExpoCamera } from "expo-camera";
import styled from "styled-components/native";

const imagesSizes = 300;

export const Container = styled.View`
  flex: 1;
  gap: 16px;
  justify-content: center;
`;

export const Camera = styled(ExpoCamera)`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const Scanner = styled.Image`
  height: ${imagesSizes}px;
  width: ${imagesSizes}px;
`;
