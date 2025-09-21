// ./styles.ts
import styled from "styled-components/native";
import { CameraView } from "expo-camera";

export const Container = styled.View`
  flex: 1;
  background-color: #000; /* ajuda no efeito edge-to-edge */
`;

// Agora Camera estiliza o CameraView
export const Camera = styled(CameraView)`
  flex: 1;
`;

export const Scanner = styled.Image`
  position: absolute;
  width: 240px;
  height: 240px;
  opacity: 0.8;
`;
