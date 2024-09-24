import React from "react";
import { Camera } from "expo-camera";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import GatewayIcon from "../../assets/icons/wireless.svg";

import { Container, Content, Title, Subtitle } from "./styles";
import { QRCodeNavigationProps } from "./types";

export function NewGatewayButton() {
  const [, requestPermission] = Camera.useCameraPermissions();

  const navigation = useNavigation<QRCodeNavigationProps>();
  const THEME = useTheme();

  const iconSize = RFValue(28);

  async function getCameraPermission() {
    const { granted } = await requestPermission();

    // if (granted) navigation.navigate("QRCodeScanner" as never, { nextPage: 'ConfigureGateway' });
    if (granted) navigation.navigate("ConfigureGateway" as never, { nextPage: 'ConfigureGateway' });
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
