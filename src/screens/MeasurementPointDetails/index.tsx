import React, { useEffect, useState } from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { PieChart } from "react-native-svg-charts";

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
  Card,
  Info,
  InfoData,
  CardTitle,
  CardText,
  CardSubtitle,
  TemperatureCard,
  Temperature,
  Graphics,
  GraphicsButtons,
  GraphicButton,
  GraphicButtonText,
  GraphicImage,
  StatusHistoryContainer,
  StatusHistory,
} from "./styles";
import { differenceInMinutes } from "date-fns";
import { Dimensions } from "react-native";

export function MeasurementPointDetails({ route, nabigation }) {
  const navigation = useNavigation();
  const [timeInfo, setTimeInfo] = useState({
    minutesSinceLast: 0,
    nextExecutionIn: 60,
  });

  const THEME = useTheme();

  const data = [275, 180, 150, 120, 100]; // Valores de exemplo
  const colors = ["#2CA58D", "#F08700", "#E63946", "#1D3557", "#F4A261"]; // Cores para cada segmento

  const pieData = data.map((value, index) => ({
    value,
    svg: { fill: colors[index] },
    key: `pie-${index}`,
  }));

  const stackedBarData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    legend: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    data: [
      {
        data: [50, 60, 40, 30, 70, 60], // Parte inferior da barra
      },
      {
        data: [40, 50, 30, 60, 50, 40], // Parte superior da barra
      },
    ],
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
  };

  useEffect(() => {
    const calculateTime = () => {
      const item = route.params.item;
      const now = new Date();
      let lastExecutionDate = new Date();
      if (item.readings[0]) {
        lastExecutionDate = new Date(item.readings[0].createdAt);
        const minutesSinceLast = differenceInMinutes(now, lastExecutionDate);
        let nextExecutionIn = 0;
        if (item.device) {
          const readingWindow = item.device.readingWindow;
          nextExecutionIn = readingWindow - minutesSinceLast;
          if (nextExecutionIn < 0) nextExecutionIn = 0;
        }
        setTimeInfo({ minutesSinceLast, nextExecutionIn });
      }
    };

    calculateTime();

    const interval = setInterval(calculateTime, 1000 * 60);

    return () => clearInterval(interval);
  }, [route.params.item]);

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
            <Title>{route.params.item?.device?.battery} %</Title>
            <Subtitle>Bateria</Subtitle>
          </Detail>

          <Detail>
            <Title>{route.params.item?.device?.readingWindow} min</Title>
            <Subtitle>Janela</Subtitle>
          </Detail>

          <Detail>
            <Title>{timeInfo?.nextExecutionIn} min</Title>
            <Subtitle>Próxima</Subtitle>
          </Detail>
        </Asset>
      </Header>

      <Content>
        <Card>
          <CardTitle>Aceleração</CardTitle>

          <Info>
            <InfoData>
              <CardText>Axial</CardText>
              <CardSubtitle>2.32 m/s</CardSubtitle>
            </InfoData>

            <InfoData>
              <CardText>Vertical</CardText>
              <CardSubtitle>2.32 m/s</CardSubtitle>
            </InfoData>

            <InfoData>
              <CardText>Horizontal</CardText>
              <CardSubtitle>2.32 m/s</CardSubtitle>
            </InfoData>
          </Info>
        </Card>

        <Card>
          <CardTitle>Velocidade</CardTitle>

          <Info>
            <InfoData>
              <CardText>Axial</CardText>
              <CardSubtitle>2.32 m/s</CardSubtitle>
            </InfoData>

            <InfoData>
              <CardText>Vertical</CardText>
              <CardSubtitle>2.32 m/s</CardSubtitle>
            </InfoData>

            <InfoData>
              <CardText>Horizontal</CardText>
              <CardSubtitle>2.32 m/s</CardSubtitle>
            </InfoData>
          </Info>
        </Card>

        <TemperatureCard>
          <CardTitle>Temperatura</CardTitle>

          <Temperature>
            <FontAwesome
              name="thermometer-three-quarters"
              size={24}
              color={THEME.colors.primary}
            />

            <CardTitle>43 C</CardTitle>
          </Temperature>
        </TemperatureCard>

        <Text>Gráficos</Text>

        <Graphics>
          <GraphicsButtons>
            <GraphicButton>
              <GraphicButtonText>Aceleração RMS</GraphicButtonText>
            </GraphicButton>

            <GraphicButton>
              <GraphicButtonText>Velocidade RMS</GraphicButtonText>
            </GraphicButton>

            <GraphicButton>
              <GraphicButtonText>Temperatura Média</GraphicButtonText>
            </GraphicButton>
          </GraphicsButtons>

          <GraphicImage
            resizeMode="container"
            source={require("../../assets/images/graphic-1.png")}
          />

          <StatusHistoryContainer>
            <StatusHistory>Histórico de Status</StatusHistory>
          </StatusHistoryContainer>

          <PieChart
            style={{ height: 200 }}
            data={pieData}
            innerRadius={50} // Define a aparência de "rosca"
            outerRadius={"95%"}
          />

          <StatusHistoryContainer>
            <StatusHistory>Raio-X de Monitoramento</StatusHistory>
          </StatusHistoryContainer>

          <GraphicImage
            resizeMode="container"
            source={require("../../assets/images/graphic-3.png")}
          />
        </Graphics>
      </Content>
    </Container>
  );
}
