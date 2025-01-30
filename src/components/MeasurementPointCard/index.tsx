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

interface IMeasurementPointCard extends MeasurementPointCardProps {
  item: IMeasuringPoint;
}

export function MeasurementPointCard({ item, ...rest }: IMeasurementPointCard) {
  const navigation = useNavigation<MeasurementPointCardNavigationProps>();

  const THEME = useTheme();

  return (
    <Container
      onPress={() => navigation.navigate("MeasurementPointDetails", { id: item.id, item })}
      {...rest}
    >
      <Image
        resizeMode="cover"
        source={{ uri: "https://synchroone.s3.amazonaws.com/white-mp-sensor.png"}}
      />
      {item.readings[0]?.securityStatus === 'S' && (<CardStatusSafe status={item.readings[0]?.securityStatus}><CardStatusSafeText>Seguro</CardStatusSafeText></CardStatusSafe>)}
      {item.readings[0]?.securityStatus === 'W' && (<CardStatusSafe status={item.readings[0]?.securityStatus}><CardStatusSafeText>Alerta</CardStatusSafeText></CardStatusSafe>)}
      {item.readings[0]?.securityStatus === 'D' && (<CardStatusSafe status={item.readings[0]?.securityStatus}><CardStatusSafeText>Perigo</CardStatusSafeText></CardStatusSafe>)}

      <Content>
        <Title>{item.name}</Title>

        <Subtitle>Descrição</Subtitle>

        <LastMeasurementInfo>
          <Text>{item?.device?.readingWindow} min</Text>
        </LastMeasurementInfo>
      </Content>

      <ArrowForwardIcon
        fill={THEME.colors.secondary}
        height={12}
        width={12}
      />
    </Container>
  );
}
