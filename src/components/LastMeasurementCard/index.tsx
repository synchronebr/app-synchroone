import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import ThermometerIcon from "../../assets/icons/thermometer.svg";

import {
  Container,
  Details,
  MeasurementHistory,
  MeasurementHistoryText,
  Title,
  Text,
  Temperature,
} from "./styles";

export function LastMeasurementCard() {
  const THEME = useTheme();

  return (
    <Container>
      <Details>
        <MeasurementHistory>
          <MeasurementHistoryText>Histórico de medições</MeasurementHistoryText>
          <Entypo color={THEME.colors.secondary} name="chevron-right" />
        </MeasurementHistory>

        <Text>Velocidade: 1.79 m/s</Text>
        <Text>Aceleração: 2.32 m/s</Text>
        <Text>Status: Seguro</Text>

        <Temperature>
          <ThermometerIcon height={RFValue(24)} width={RFValue(24)} />
          <Title>43°C</Title>
        </Temperature>
      </Details>
    </Container>
  );
}
