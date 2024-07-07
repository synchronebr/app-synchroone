import React from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

import { QRCodeScannerNavigationProps } from "./types";
import { Container, Camera, Scanner } from "./styles";

export function QRCodeScanner() {
  const navigation = useNavigation<QRCodeScannerNavigationProps>();

  function onScannerData(data: string) {
    const scannerData = {
      bluetoothDeviceName: data,
    };

    navigation.navigate("BluetoothManager", scannerData);
  }

  return (
    <Container>
      <Camera
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={({ data }) => onScannerData(data)}
      >
        <Scanner source={require("../../assets/images/qr-code-scanner.png")} />
      </Camera>
    </Container>
  );
}
