import React from "react";
import { Camera } from "expo-camera";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import SensorsIcon from "../../assets/icons/sensors.svg";

import { Container, Content, Title, Subtitle } from "./styles";
import { QRCodeNavigationProps } from "./types";

export function SynchroneSensorButton() {
  const [, requestPermission] = Camera.useCameraPermissions();

  const navigation = useNavigation<QRCodeNavigationProps>();
  const THEME = useTheme();

  const iconSize = RFValue(28);

  async function getCameraPermission() {
    const { granted } = await requestPermission();

    if (granted) navigation.navigate("QRCodeScanner" as never, { nextPage: 'ConfigureParameters' });
  }

  return (
    <Container onPress={getCameraPermission}>
      <SensorsIcon
        height={iconSize}
        fill={THEME.colors.secondary}
        width={iconSize}
      />

      <Content>
        <Title>Novo Sensor</Title>

        <Subtitle>Aperte para ativar</Subtitle>
      </Content>
    </Container>
  );
}
