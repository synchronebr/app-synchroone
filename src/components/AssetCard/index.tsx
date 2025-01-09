import React, { useEffect, useState } from "react";
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
    <Container onPress={() => navigation.navigate("AssetDetails", { id: item.id })} {...rest}>
      <Image
        source={{ uri: "https://synchroone.s3.amazonaws.com/blue-machine-sensor.png"}}
      />
      <Content>
        <Title>{item.description}</Title>

        <Subtitle>{item.machine.name}</Subtitle>

        {/* <Text>5 sensores</Text> */}

        <LastMeasurementInfo>
          <LastMeasurementText>Últimas medições:</LastMeasurementText>

          <LastMeasurementTextInfo>Seguro</LastMeasurementTextInfo>
        </LastMeasurementInfo>

        <Elipses>
          {readings?.slice(0, 8).map(reading => (
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
        height={RFValue(12)}
        width={RFValue(12)}
      />
    </Container>
  );
}
