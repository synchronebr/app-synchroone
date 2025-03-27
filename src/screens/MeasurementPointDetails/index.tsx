import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LastMeasurementCard } from "../../components/LastMeasurementCard";

import {
  Container,
  Header,
  Image,
  Asset,
  Detail,
  Title,
  Subtitle,
  Content,
  Text,
} from "./styles";
import { differenceInMinutes } from "date-fns";

export function MeasurementPointDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const [timeInfo, setTimeInfo] = useState({
    minutesSinceLast: 0,
    nextExecutionIn: 0,
  });
  const THEME = useTheme();

  useEffect(() => {
    const calculateTime = () => {
      const item = route.params?.item;
      if (!item) return;

      const now = new Date();
      let lastExecutionDate = new Date();

      if (item.readings?.[0]) {
        lastExecutionDate = new Date(item.readings[0].createdAt);
        const minutesSinceLast = differenceInMinutes(now, lastExecutionDate);
        let nextExecutionIn = 0;

        if (item.device) {
          const readingWindow = item.device.readingWindow || 60;
          nextExecutionIn = Math.max(0, readingWindow - minutesSinceLast);
        }

        setTimeInfo({ minutesSinceLast, nextExecutionIn });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000 * 60);

    return () => clearInterval(interval);
  }, [route.params?.item]);

  if (!route.params?.item) {
    return null; // ou algum componente de fallback
  }

  return (
    <Container>
      <Header>
        <Image
          resizeMode="cover"
          source={{
            uri: "https://synchroone.s3.amazonaws.com/white-mp-sensor.png",
          }}
        />

        <Entypo
          color={THEME.colors.dark}
          name="chevron-left"
          onPress={() => navigation.goBack()}
          size={32}
          style={{
            position: "absolute",
            left: 8,
            top: 16,
          }}
        />

        <Asset status={route.params.item.readings[0]?.securityStatus}>
          <Detail>
            <Title>{route.params.item?.device?.battery ?? "--"} %</Title>
            <Subtitle>Bateria</Subtitle>
          </Detail>

          <Detail>
            <Title>
              {route.params.item?.device?.readingWindow ?? "--"} min
            </Title>
            <Subtitle>Janela</Subtitle>
          </Detail>

          <Detail>
            <Title>{timeInfo?.nextExecutionIn ?? "--"} min</Title>
            <Subtitle>Próxima</Subtitle>
          </Detail>
        </Asset>
      </Header>

      <Content>
        <Text>Última medição</Text>
        <LastMeasurementCard item={route.params.item} />
      </Content>
    </Container>
  );
}
