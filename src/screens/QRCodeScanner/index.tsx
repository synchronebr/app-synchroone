import React, { useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

import { useBLEManager } from "../../hooks/useBLEManager";

import { QRCodeScannerNavigationProps } from "./types";
import { Container, Camera, Scanner } from "./styles";

export function QRCodeScanner({ route }) {
  const navigation = useNavigation<QRCodeScannerNavigationProps>();
  const { disconnectDevice } = useBLEManager();

  function onScannerData(data: string) {
    const scannerData = {
      bluetoothDeviceName: data,
    };

    navigation.navigate(route.params.nextPage, scannerData);
  }

  useEffect(() => { disconnectDevice() }, [])

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
