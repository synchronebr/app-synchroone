import React from "react";
import { StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

import QRCodeScannerIcon from "../../assets/icons/qr-code-scanner.svg";

import THEME from "../../global/styles/theme";

import { Container } from "./styles";
import { QRCodeNavigationProps } from "./types";

export function QRCodeButton() {
  const [, requestPermission] = Camera.useCameraPermissions();

  const navigation = useNavigation<QRCodeNavigationProps>();

  const iconSize = 16;

  async function getCameraPermission() {
    const { granted } = await requestPermission();

    if (granted) navigation.navigate("QRCodeScanner" as never, { nextPage: 'BluetoothManager' });
  }

  return (
    <Container style={styles.container} onPress={getCameraPermission}>
      <QRCodeScannerIcon height={iconSize} width={iconSize}/>
    </Container>
  );
}

export const styles = StyleSheet.create({
  container: {
    elevation: 8,
    shadowColor: THEME.colors.dark,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.2,
  },
});
