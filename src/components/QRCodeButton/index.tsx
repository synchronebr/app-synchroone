import React from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import QRCodeScannerIcon from "../../assets/icons/qr-code-scanner.svg";

import { Container } from "./styles";

export function QRCodeButton() {
  const THEME = useTheme();

  const heightAndWidth = Platform.OS === "android" ? 20 : 16;

  return (
    <Container
      style={{
        elevation: 8,
        shadowColor: THEME.colors.dark,
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.2,
      }}
    >
      <QRCodeScannerIcon
        height={RFValue(heightAndWidth)}
        width={RFValue(heightAndWidth)}
      />
    </Container>
  );
}
