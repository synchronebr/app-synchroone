import React from "react";
import { Camera } from "expo-camera";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import SensorsIcon from "../../assets/icons/sensors.svg";

import { Container, Content, Title, Subtitle } from "./styles";
import { QRCodeNavigationProps } from "./types";

export function SynchroneSensorButton() {
  const navigation = useNavigation<QRCodeNavigationProps>();
  const THEME = useTheme();

  const iconSize = 28;

  async function getCameraPermission() {
    navigation.navigate("PreConfigureSensor" as never, { type: 'S' });
    // navigation.navigate("ConfigureParameters" as never, { type: 'S' }); // testes
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
