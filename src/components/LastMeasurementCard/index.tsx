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
  CardViews,
  CardViewsTitle,
  CardView,
  CardViewTemperature,
  CardViewTitle,
  CardViewValue,
  MeasurementHistory,
  MeasurementHistoryText,
  Title,
  Text,
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
    <Container >
      <Details>
        <CardViewsTitle>Aceleração</CardViewsTitle>
        <CardViews>
          <CardView>
            <CardViewTitle>Axial</CardViewTitle>
            <CardViewValue>{item.readings[0]?.accelAbsoluteZ > 0 ? (`${Number(item.readings[0]?.accelAbsoluteZ.toFixed(4))} m/s`) : (`-`)}</CardViewValue>
          </CardView>
          <CardView>
            <CardViewTitle>Vertical</CardViewTitle>
            <CardViewValue>{item.readings[0]?.accelAbsoluteY > 0 ? (`${Number(item.readings[0]?.accelAbsoluteY.toFixed(4))} m/s`) : (`-`)}</CardViewValue>
          </CardView>
          <CardView>
            <CardViewTitle>Horizontal</CardViewTitle>
            <CardViewValue>{item.readings[0]?.accelAbsoluteX > 0 ? (`${Number(item.readings[0]?.accelAbsoluteX.toFixed(4))} m/s`) : (`-`)}</CardViewValue>
          </CardView>
        </CardViews>

        <CardViewsTitle>Velocidade</CardViewsTitle>
        <CardViews>
          <CardView>
            <CardViewTitle>Axial</CardViewTitle>
            <CardViewValue>{item.readings[0]?.velAbsoluteZ > 0 ? (`${Number(item.readings[0]?.velAbsoluteZ.toFixed(4))} m/s`) : (`-`)}</CardViewValue>
          </CardView>
          <CardView>
            <CardViewTitle>Vertical</CardViewTitle>
            <CardViewValue>{item.readings[0]?.velAbsoluteY > 0 ? (`${Number(item.readings[0]?.velAbsoluteY.toFixed(4))} m/s`) : (`-`)}</CardViewValue>
          </CardView>
          <CardView>
            <CardViewTitle>Horizontal</CardViewTitle>
            <CardViewValue>{item.readings[0]?.velAbsoluteX > 0 ? (`${Number(item.readings[0]?.velAbsoluteX.toFixed(4))} m/s`) : (`-`)}</CardViewValue>
          </CardView>
        </CardViews>

        <CardViewsTitle>Temperatura</CardViewsTitle>
        <CardViews>
          <CardViewTemperature>
            <ThermometerIcon height={RFValue(16)} width={RFValue(24)} />
            <CardViewValue>{item.readings[0]?.temperature > 0 ? (`${Number(item.readings[0]?.temperature.toFixed(4))} °C`) : (`-`)}</CardViewValue>
          </CardViewTemperature>
        </CardViews>

        {/* <MeasurementHistory onPress={() => navigation.navigate("MeasurementHistory")}>
          <MeasurementHistoryText>Histórico de medições</MeasurementHistoryText>
          <Entypo color={THEME.colors.secondary} name="chevron-right" />
        </MeasurementHistory> */}
      </Details>
    </Container>
  );
}
