import React from "react";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import ArrowForwardIcon from "../../assets/icons/arrow-forward.svg";

import { AssetCardNavigationProps, AssetCardProps } from "./types";
import {
  Container,
  Image,
  Content,
  Title,
  Subtitle,
  Text,
  LastMeasurementInfo,
  LastMeasurementText,
  LastMeasurementTextInfo,
  Elipses,
  DangerElipse,
  WarningElipse,
  SuccessElipse,
} from "./styles";

export function AssetCard({ ...rest }: AssetCardProps) {
  const navigation = useNavigation<AssetCardNavigationProps>();

  const THEME = useTheme();

  return (
    <Container onPress={() => navigation.navigate("AssetDetails")} {...rest}>
      <Image source={require("../../assets/images/asset-image.png")} />
      <Content>
        <Title>Motor Bomba Calderaria 2</Title>

        <Subtitle>Bomba hidráulica</Subtitle>

        <Text>5 sensores</Text>

        <LastMeasurementInfo>
          <LastMeasurementText>Últimas medições:</LastMeasurementText>

          <LastMeasurementTextInfo>Seguro</LastMeasurementTextInfo>
        </LastMeasurementInfo>

        <Elipses>
          <DangerElipse />
          <DangerElipse />
          <DangerElipse />
          <WarningElipse />
          <WarningElipse />
          <WarningElipse />
          <WarningElipse />
          <SuccessElipse />
          <SuccessElipse />
          <SuccessElipse />
        </Elipses>
      </Content>

      <ArrowForwardIcon
        fill={THEME.colors.primary}
        height={RFValue(12)}
        width={RFValue(12)}
      />
    </Container>
  );
}
