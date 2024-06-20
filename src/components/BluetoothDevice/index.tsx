import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { BluetoothDeviceProps } from "./types";
import { Container, Info, Title, Text, ConnectionInfoText } from "./styles";

export function BluetoothDevice({
  device,
  isConnected,
  ...rest
}: BluetoothDeviceProps) {
  const THEME = useTheme();

  const { id, name } = device;

  return (
    <Container {...rest}>
      <FontAwesome
        name="bluetooth"
        size={24}
        color={THEME.colors.primary_dark}
      />

      <Info>
        <Title>{name ? name : "Dispositivo Sem Nome"}</Title>
        <Text>{id}</Text>
      </Info>

      <ConnectionInfoText isConnected={isConnected}>
        {isConnected ? "Conectado" : "Desconectado"}
      </ConnectionInfoText>
    </Container>
  );
}
