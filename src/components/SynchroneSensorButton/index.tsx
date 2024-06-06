import React from "react";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import SensorsIcon from "../../assets/icons/sensors.svg";

import { SynchroneSensorButtonProps } from "./types";
import { Container, Content, Title, Subtitle } from "./styles";

export function SynchroneSensorButton({
  isActive,
  ...rest
}: SynchroneSensorButtonProps) {
  const THEME = useTheme();

  return (
    <Container isActive={isActive} {...rest}>
      <SensorsIcon
        height={RFValue(32)}
        fill={isActive ? THEME.colors.light : THEME.colors.gray_dark}
        width={RFValue(32)}
      />

      <Content>
        <Title isActive={isActive}>
          Sensor{"\n"}
          Synchroone
        </Title>

        <Subtitle isActive={isActive}>
          {isActive ? "Ativado" : "Aperte para ativar"}
        </Subtitle>
      </Content>
    </Container>
  );
}
