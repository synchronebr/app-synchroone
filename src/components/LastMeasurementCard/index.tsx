import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import ThermometerIcon from "../../assets/icons/thermometer.svg";

import { LastMeasurementCardNavigationProps } from "./types";
import {
  Container,
  Details,
  MeasurementHistory,
  MeasurementHistoryText,
  Title,
  Text,
  Temperature,
} from "./styles";
import { IMeasuringPoint } from "../../services/dtos/IMeasuringPoint";
import { getStatusDescription } from "../../utils/getStatusDescription";

interface ILastMeasurementCard {
  item: IMeasuringPoint;
}

export function LastMeasurementCard({ item }: ILastMeasurementCard) {
  const navigation = useNavigation<LastMeasurementCardNavigationProps>();

  const THEME = useTheme();

  return (
    <Container onPress={() => navigation.navigate("MeasurementHistory")}>
      <Details>
        <MeasurementHistory>
          <MeasurementHistoryText>Histórico de medições</MeasurementHistoryText>
          <Entypo color={THEME.colors.secondary} name="chevron-right" />
        </MeasurementHistory>

        <Text>
          <Title>Velocidade: </Title> {item.readings.length > 0 ? (`${item.readings[0]?.vibrationAbsolute} m/s`) : (`0`)} 
        </Text>
        <Text>
          <Title>Aceleração: </Title>{item.readings.length > 0 ? (`${item.readings[0]?.accelarationAbsolute} m/s`) : (`0`)} 
        </Text>
        <Text>
          <Title>Status: </Title>{item.readings.length > 0 ? (<>{getStatusDescription(item.readings[0]?.securityStatus)}</>) : ('-')}
        </Text>

        <Temperature>
          <ThermometerIcon height={RFValue(24)} width={RFValue(24)} />
          <Title>{item.readings.length > 0 ? (`${item.readings[0]?.accelarationAbsolute} °C`) : ('-')}</Title>
        </Temperature>
      </Details>
    </Container>
  );
}
