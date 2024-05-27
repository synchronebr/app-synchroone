import React from "react";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import ArrowForwardIcon from "../../assets/icons/arrow-forward.svg";

import {
  MeasurementPointCardNavigationProps,
  MeasurementPointCardProps,
} from "./types";
import {
  Container,
  Image,
  Content,
  Title,
  Subtitle,
  Text,
  LastMeasurementInfo,
  LastMeasurementTextInfo,
} from "./styles";

export function MeasurementPointCard({ ...rest }: MeasurementPointCardProps) {
  const navigation = useNavigation<MeasurementPointCardNavigationProps>();

  const THEME = useTheme();

  return (
    <Container
      onPress={() => navigation.navigate("MeasurementPointDetails")}
      {...rest}
    >
      <Image
        resizeMode="cover"
        source={require("../../assets/images/asset-image.png")}
      />

      <Content>
        <Title>Rolamento Traseiro</Title>

        <Subtitle>Descrição</Subtitle>

        <LastMeasurementInfo>
          <Text>60min</Text>

          <LastMeasurementTextInfo>Seguro</LastMeasurementTextInfo>
        </LastMeasurementInfo>
      </Content>

      <ArrowForwardIcon
        fill={THEME.colors.secondary}
        height={RFValue(12)}
        width={RFValue(12)}
      />
    </Container>
  );
}
