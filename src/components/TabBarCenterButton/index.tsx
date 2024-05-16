import React from "react";
import { useTheme } from "styled-components/native";

import BellRingingIcon from "../../assets/icons/bell-ringing.svg";

import { Container } from "./styles";

export function TabBarCenterButton() {
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
      <BellRingingIcon />
    </Container>
  );
}
