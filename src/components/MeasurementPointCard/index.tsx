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
import { t } from "i18next";

interface IMeasurementPointCard extends MeasurementPointCardProps {
  equipmentId: number;
  item: IMeasuringPoint;
}

export function MeasurementPointCard({ equipmentId, item, ...rest }: IMeasurementPointCard) {
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
        source={
          item.type === enums.MeasuringPoints.Type.PartTime
            ? require('../../assets/images/white-technician-machine.jpg')
            : require('../../assets/images/blue-mp-sensor.png')
        }
      />
      {item.securityStatus === "S" && (
        <CardStatusSafe status={item.securityStatus}>
          <CardStatusSafeText>{t('index.securityStatus-S')}</CardStatusSafeText>
        </CardStatusSafe>
      )}
      {item.securityStatus === "W" && (
        <CardStatusSafe status={item.securityStatus}>
          <CardStatusSafeText>{t('index.securityStatus-W')}</CardStatusSafeText>
        </CardStatusSafe>
      )}
      {item.securityStatus === "D" && (
        <CardStatusSafe status={item.securityStatus}>
          <CardStatusSafeText>{t('index.securityStatus-D')}</CardStatusSafeText>
        </CardStatusSafe>
      )}

      <Content>
        <Title>{item.name}</Title>


        {item.type === enums.MeasuringPoints.Type.PartTime ? (
          <Subtitle>{t('index.readingsByTechnician')}</Subtitle>
        ) : (
          <>
            {item.device ? (
              <Subtitle>{item.device.code}</Subtitle>
            ) : (
              <Subtitle>{t('index.noSensorsLinked')}</Subtitle>
            )}
          </>
        )}

        {item && item.device && item.device.readingWindow && (
          <LastMeasurementInfo>
            <Text>{t('index.minutesMin', { minutes: item.device.readingWindow })}</Text>
          </LastMeasurementInfo>
        )}
      </Content>

      <ArrowForwardIcon fill={THEME.colors.primary} height={12} width={12} />
    </Container>
  );
}
