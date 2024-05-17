import React from "react";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import BellRingingIcon from "../../assets/icons/bell-ringing.svg";

import { TotalNotifications } from "../TotalNotifications";

import { Container, BellRingingIconContainer } from "./styles";

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
      <BellRingingIconContainer>
        <BellRingingIcon height={RFValue(20)} width={RFValue(20)} />

        <TotalNotifications total={1} />
      </BellRingingIconContainer>
    </Container>
  );
}
