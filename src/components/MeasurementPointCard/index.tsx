import React from "react";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

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
  CardStatusSafe,
  CardStatusSafeText,
} from "./styles";
import { IMeasuringPoint } from "../../services/dtos/IMeasuringPoint";
import { enums } from "../../utils/enums";

interface IMeasurementPointCard extends MeasurementPointCardProps {
  equipmentId: number;
  item: IMeasuringPoint;
}

export function MeasurementPointCard({ equipmentId, item,...rest }: IMeasurementPointCard) {
  const navigation = useNavigation<MeasurementPointCardNavigationProps>();

  const THEME = useTheme();

  return (
    <Container
      onPress={() =>
        navigation.navigate("MeasurementPointDetails", { mesuringPointId: item.id, equipmentId })
      }
      {...rest}
    >
      <Image
        resizeMode="cover"
        source={{
          uri: item.type === enums.MeasuringPoints.Type.PartTime ? "https://synchroone.s3.amazonaws.com/white-technician-machine.jpg" : "https://synchroone.s3.amazonaws.com/white-mp-sensor.png",
        }}
      />
      {item.securityStatus === "S" && (
        <CardStatusSafe status={item.securityStatus}>
          <CardStatusSafeText>Seguro</CardStatusSafeText>
        </CardStatusSafe>
      )}
      {item.securityStatus === "W" && (
        <CardStatusSafe status={item.securityStatus}>
          <CardStatusSafeText>Alerta</CardStatusSafeText>
        </CardStatusSafe>
      )}
      {item.securityStatus === "D" && (
        <CardStatusSafe status={item.securityStatus}>
          <CardStatusSafeText>Perigo</CardStatusSafeText>
        </CardStatusSafe>
      )}

      <Content>
        <Title>{item.name}</Title>

        
        {item.type === enums.MeasuringPoints.Type.PartTime ? (
          <Subtitle>Leituras feitas por um técnico</Subtitle>
        ) : (
          <>
          {item.device ? (
            <Subtitle>{item.device.code}</Subtitle>
          ) : (
            <Subtitle>Nenhum sensor vinculado</Subtitle>
          )}
          </>
        )}

        {item && item.device && item.device.readingWindow && (
        <LastMeasurementInfo>
          <Text>{item.device.readingWindow} min</Text>
        </LastMeasurementInfo>
        )}
      </Content>

      <ArrowForwardIcon fill={THEME.colors.primary} height={12} width={12} />
    </Container>
  );
}
