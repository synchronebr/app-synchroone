import React, { useState } from "react";
import { Camera } from "expo-camera";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import SensorsIcon from "../../assets/icons/sensors.svg";

import { Container, Content, Title, Subtitle } from "./styles";

export function SynchroneSensorButton() {
  const [isActive, setIsActive] = useState(false);
  const [, requestPermission] = Camera.useCameraPermissions();

  const navigation = useNavigation();
  const THEME = useTheme();

  const iconSize = RFValue(32);

  async function getCameraPermission() {
    const { granted } = await requestPermission();

    if (granted) navigation.navigate("QRCodeScanner" as never);
  }

  return (
    <Container onPress={getCameraPermission} isActive={isActive}>
      <SensorsIcon
        height={iconSize}
        fill={isActive ? THEME.colors.light : THEME.colors.gray_dark}
        width={iconSize}
      />

      <Content>
        <Title isActive={isActive}>
          Configurar{"\n"}
          Sensor
        </Title>

        <Subtitle isActive={isActive}>
          {isActive ? "Ativado" : "Ler o QR Code"}
        </Subtitle>
      </Content>
    </Container>
  );
}
