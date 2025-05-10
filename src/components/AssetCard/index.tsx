import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

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
  CardStatusSafe,
  CardStatusSafeText,
  Elipses,
  DangerElipse,
  WarningElipse,
  SuccessElipse,
} from "./styles";
import { IReading } from "../../services/dtos/IReading";

export function AssetCard({ item, ...rest }: AssetCardProps) {
  const navigation = useNavigation<AssetCardNavigationProps>();
  const [isLoadingReadings, setIsLoadingReadings] = useState(false)
  const [readings, setReadings] = useState([])

  const THEME = useTheme();

  const buildReadings = async () => {
    setIsLoadingReadings(true);
    const items = [] as IReading[];
    if (item.measuringPoints) {
      const mapMP = item.measuringPoints.map(mp => {
        mp.readings?.map(reading => {
          items.push(reading);
        });
      })
      await Promise.all(mapMP);

      items.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      setReadings(items);
    }
  }

  useEffect(() => {
    buildReadings()
  }, [])

  return (
    <Container onPress={() => navigation.navigate("AssetDetails", { id: item.id })} {...rest} status={readings[0]?.securityStatus}>
      <Image
        source={{ uri: item.image ? item.image : "https://synchroone.s3.amazonaws.com/blue-machine-sensor.png"}}
      />
      {readings[0]?.securityStatus === 'S' && (<CardStatusSafe status={readings[0]?.securityStatus}><CardStatusSafeText>Seguro</CardStatusSafeText></CardStatusSafe>)}
      {readings[0]?.securityStatus === 'W' && (<CardStatusSafe status={readings[0]?.securityStatus}><CardStatusSafeText>Alerta</CardStatusSafeText></CardStatusSafe>)}
      {readings[0]?.securityStatus === 'D' && (<CardStatusSafe status={readings[0]?.securityStatus}><CardStatusSafeText>Perigo</CardStatusSafeText></CardStatusSafe>)}
      <Content>
        <Title>{item.description}</Title>

        <Subtitle>{item.path?.title}</Subtitle>

        {/* <Text>5 sensores</Text> */}

        <LastMeasurementInfo>
          <LastMeasurementText>Últimas medições:</LastMeasurementText>
        </LastMeasurementInfo>

        <Elipses>
          {readings?.slice(0, 8).sort((a, b) => a.id - b.id).map(reading => (
            <>
            {reading.securityStatus === 'S' && (<SuccessElipse />)}
            {reading.securityStatus === 'W' && (<WarningElipse />)}
            {reading.securityStatus === 'D' && (<DangerElipse />)}
            </>
          ))}
        </Elipses>
      </Content>

      <ArrowForwardIcon
        fill={THEME.colors.primary}
        height={12}
        width={12}
      />
    </Container>
  );
}
