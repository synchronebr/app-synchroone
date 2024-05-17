import React from "react";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import QRCodeScannerIcon from "../../assets/icons/qr-code-scanner.svg";

import { Container } from "./styles";

export function QRCodeButton() {
  const THEME = useTheme();

  return (
    <Container
      style={{
        elevation: 8,
        shadowColor: THEME.colors.dark,
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.2,
      }}
    >
      <QRCodeScannerIcon height={RFValue(20)} width={RFValue(20)} />
    </Container>
  );
}
