import React from "react";
import { Camera } from "expo-camera";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import GatewayIcon from "../../assets/icons/wireless.svg";

import { Container, Content, Title, Subtitle } from "./styles";
import { QRCodeNavigationProps } from "./types";

export function NewGatewayButton() {
  const navigation = useNavigation<QRCodeNavigationProps>();
  const THEME = useTheme();

  const iconSize = 22;

  async function getCameraPermission() {
    navigation.navigate("PreConfigureGateway" as never, { type: 'G' });
  }

  return (
    <Container onPress={getCameraPermission} >
      <GatewayIcon
        height={iconSize}
        fill={THEME.colors.secondary}
        width={iconSize}
      />

      <Content>
        <Title>Novo Gateway</Title>

        <Subtitle>Aperte para ativar</Subtitle>
      </Content>
    </Container>
  );
}
