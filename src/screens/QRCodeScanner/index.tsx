import React, { useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

import { Button } from "../../components/Button";

import {
  Container,
  Camera,
  Text,
  QRCode,
  ButtonWrapper,
  Scanner,
} from "./styles";

export function QRCodeScanner() {
  const [scannerData, setScannerData] = useState<string | null>(null);

  if (scannerData) {
    return (
      <Container>
        <Text>{scannerData}</Text>
        <QRCode source={require("../../assets/images/qr-code.png")} />
        <ButtonWrapper>
          <Button
            onPress={() => setScannerData(null)}
            title="Escanear outro QR Code"
          />
        </ButtonWrapper>
      </Container>
    );
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
        onBarCodeScanned={({ data }) => setScannerData(data)}
      >
        <Scanner source={require("../../assets/images/qr-code-scanner.png")} />
      </Camera>
    </Container>
  );
}
