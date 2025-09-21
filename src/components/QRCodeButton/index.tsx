import React from "react";
import { StyleSheet } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

import QRCodeScannerIcon from "../../assets/icons/qr-code-scanner.svg";
import THEME from "../../global/styles/theme";
import { QRCodeNavigationProps } from "./types";

interface IQRCodeButton {
  iconSize?: number;
}

export function QRCodeButton({ iconSize = 24 }: IQRCodeButton) {
  const [, requestPermission] = useCameraPermissions();

  const navigation = useNavigation<QRCodeNavigationProps>();

  async function getCameraPermission() {
    const { granted } = await requestPermission();

    if (granted)
      navigation.navigate("QRCodeScanner" as never, {
        nextPage: "AssetDetails",
      });
  }

  return (
    <QRCodeScannerIcon 
      style={styles.container} 
      onPress={getCameraPermission} 
      height={iconSize} 
      width={iconSize} 
      fill={THEME.colors.dark} 
    />
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
