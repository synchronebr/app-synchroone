import React, { useCallback, useEffect, useState } from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-notifications";
import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";

// import { PieChart } from "react-native-svg-charts";

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
  MeasuringPointPartTimeLastReadingsViewStepper,
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
import { MeasuringPointPartTimeLastReadingsStepper } from "../../components/MeasuringPointPartTimeLastReadingsStepper";
import { enums } from "../../utils/enums";
import { getMeasuringPointById } from "../../services/MeasuringPoints";
import { Loading } from "../../components/Loading";

export function MeasurementPointDetails({ route, nabigation }) {
  const navigation = useNavigation();
  const [timeInfo, setTimeInfo] = useState({
    minutesSinceLast: 0,
    nextExecutionIn: 60,
  });
  const [item, setItem] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  async function loadScreen() {
      setIsLoading(true);
  
      try {
        const response = await getMeasuringPointById(Number(route.params.equipmentId), Number(route.params.mesuringPointId));
        const data = response;
        setItem(data);
      } catch (error) {
        Toast.show(
          "Houve um erro ao buscar o ponto de medição. Por favor, verifique sua conexão, ou tente novamente mais tarde.",
          { duration: 5000, type: "danger" }
        );
      } finally {
        setIsLoading(false);
      }
  }

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
      const now = new Date();
      let lastExecutionDate = new Date();
      if (item.measuringPoint.readings && item.measuringPoint.readings[0]) {
        lastExecutionDate = new Date(item.measuringPoint.readings[0].createdAt);
        const minutesSinceLast = differenceInMinutes(now, lastExecutionDate);
        let nextExecutionIn = 0;
        if (item.measuringPoint.device) {
          const readingWindow = item.measuringPoint.device.readingWindow;
          nextExecutionIn = readingWindow - minutesSinceLast;
          if (nextExecutionIn < 0) nextExecutionIn = 0;
        }
        setTimeInfo({ minutesSinceLast, nextExecutionIn });
      }
    };

    if (item) {
      calculateTime();
    }

    const interval = setInterval(calculateTime, 1000 * 60);

    return () => clearInterval(interval);
  }, [item]);

  useFocusEffect(
    useCallback(() => {
      loadScreen();
    }, [])
  );

  if (isLoading) return <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />;

  return (
    <Container>
      <Header>
        <Image
          resizeMode="cover"
          source={{
            uri: "https://synchroone.s3.amazonaws.com/white-mp-sensor.png",
          }}
        />

        {item && (
          <>
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

          {item.measuringPoint.type === enums.MeasuringPoints.Type.Online && (
            <Asset status={item.measuringPoint.readings[0]?.securityStatus}>
              <Detail>
                <Title>{item?.device?.battery} %</Title>
                <Subtitle>Bateria</Subtitle>
              </Detail>

              <Detail>
                <Title>{item?.device?.readingWindow} min</Title>
                <Subtitle>Janela</Subtitle>
              </Detail>

              <Detail>
                <Title>{timeInfo?.nextExecutionIn} min</Title>
                <Subtitle>Próxima</Subtitle>
              </Detail>
            </Asset>
          )}

          {item.measuringPoint.type === enums.MeasuringPoints.Type.PartTime && (
            <Asset status={item.measuringPoint.readings[0]?.securityStatus}>
              <Detail>
                <Subtitle>Periodicidade</Subtitle>
                <Title>{item.medianDays} dias</Title>
              </Detail>

              <Detail>
                <Subtitle>Última</Subtitle>
                <Title>{item.measuringPoint.readings.length === 0 ? 'Sem leitura': `há ${differenceInDays(new Date(), new Date(item.measuringPoint.readings[0].readingAt))} dias`}</Title>
              </Detail>

              <Detail>
                <Subtitle>Medições</Subtitle>
                <Title>{item.countReadings}</Title>
              </Detail>

            </Asset>
          )}
          </>
        )}
      </Header>

      {item && (
        <Content>

          {item.measuringPoint.type === enums.MeasuringPoints.Type.Online && (
            <>
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
            </>
          )}

        {item.measuringPoint.type === enums.MeasuringPoints.Type.PartTime && (
          <>
          {item.measuringPoint.readings.length > 0 ? (
              <>
              <Text>Últimas Medições Part-Time</Text>
              <MeasuringPointPartTimeLastReadingsViewStepper>
                {item.measuringPoint.readings.map((reading, i) => (
                  <MeasuringPointPartTimeLastReadingsStepper 
                    key={reading.id}
                    lastOne={i === item.measuringPoint.readings.length - 1}
                    status={reading.securityStatus || "default"} // Passa o status para mapeamento
                    date={format(new Date(reading.readingAt), "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                    doneBy={reading.responsibleCompany.name}
                  />
                ))}
              </MeasuringPointPartTimeLastReadingsViewStepper>
              </>
            ) : (
              <Text>Ainda não temos nenhum registro de leitura para esse ponto de medição</Text>
            )}
          
          </>
        )}

          {/* <Text>Gráficos</Text> */}

          {/* <Graphics>
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
          </Graphics> */}
          </Content>
        )}
    </Container>
  );
}
