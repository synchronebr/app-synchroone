import React, { useCallback, useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
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
  CardsContent,
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
import { Dimensions, useWindowDimensions } from "react-native";
import { MeasuringPointPartTimeLastReadingsStepper } from "../../components/MeasuringPointPartTimeLastReadingsStepper";
import { enums } from "../../utils/enums";
import { getMeasuringPointById } from "../../services/MeasuringPoints";
import { Loading } from "../../components/Loading";
import { formatDateByLocale } from "../../utils/formatDateByLocale";

export function MeasurementPointDetails({ route, nabigation }) {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const [timeInfo, setTimeInfo] = useState({
    minutesSinceLast: 0,
    nextExecutionIn: 0,
  });
  const [item, setItem] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  async function loadScreen() {
    setIsLoading(true);

    try {
      const response = await getMeasuringPointById(
        Number(route.params.equipmentId),
        Number(route.params.mesuringPointId)
      );
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

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      if (item.measuringPoint.readings && item.measuringPoint.readings[0]) {
        let lastExecutionDate = new Date(item.measuringPoint.readings[0].createdAt);
        const minutesSinceLast = differenceInMinutes(now, lastExecutionDate);
        let nextExecutionIn = 0;
        console.log(now, lastExecutionDate, minutesSinceLast);
        if (item.measuringPoint.device) {
          const readingWindow = item.measuringPoint.device.readingWindow;
          nextExecutionIn = readingWindow - minutesSinceLast;
          if (nextExecutionIn < 0) nextExecutionIn = 0;
        }

        setTimeInfo({ minutesSinceLast, nextExecutionIn });
      } else if (item.measuringPoint?.device?.readingWindow) {
        setTimeInfo({ minutesSinceLast: item.measuringPoint?.device?.readingWindow, nextExecutionIn: item.measuringPoint?.device?.readingWindow });
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

  // if (isLoading) return <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />;

  return (
    <Container>
      {isLoading ? (
        <ContentLoader viewBox={`0 0 ${width} ${height}`}>
          <Rect x="1" y="10" rx="10" ry="10" width={width} height="200" />
          <Rect x="1" y="230" rx="10" ry="10" width={width} height="100" />
          <Rect x="1" y="350" rx="10" ry="10" width={width} height="100" />
          <Rect x="1" y="470" rx="10" ry="10" width={width} height="100" />
        </ContentLoader>
      ) : (
        <>
          <Header>
            <Image
              resizeMode="cover"
              source={{
                uri: item && item.measuringPoint.type === enums.MeasuringPoints.Type.PartTime ? "https://synchroone.s3.amazonaws.com/white-technician-machine.jpg" : "https://synchroone.s3.amazonaws.com/white-mp-sensor.png",
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

                {item && item.measuringPoint.type === enums.MeasuringPoints.Type.Online && (
                  <Asset
                    status={item.measuringPoint.readings[0]?.securityStatus}
                  >
                    <Detail>
                      <Title>{item.measuringPoint.device ? item.measuringPoint.device.battery : '-'} %</Title>
                      <Subtitle>Bateria</Subtitle>
                    </Detail>

                    <Detail>
                      <Title>{item.measuringPoint.device ? `${item.measuringPoint.device.readingWindow} min` : '-'} </Title>
                      <Subtitle>Janela</Subtitle>
                    </Detail>

                    <Detail>
                      <Title>{item.measuringPoint.device ? `${timeInfo?.nextExecutionIn} min` : '-'}</Title>
                      <Subtitle>Próxima</Subtitle>
                    </Detail>
                  </Asset>
                )}

                {item.measuringPoint.type ===
                  enums.MeasuringPoints.Type.PartTime && (
                  <Asset
                    status={item.measuringPoint.readings[0]?.securityStatus}
                  >
                    <Detail>
                      <Subtitle>Periodicidade</Subtitle>
                      <Title>{item.medianDays} dias</Title>
                    </Detail>

                    <Detail>
                      <Subtitle>Última</Subtitle>
                      <Title>
                        {item.measuringPoint.readings.length === 0
                          ? "Sem leitura"
                          : `há ${differenceInDays(
                              new Date(),
                              new Date(
                                item.measuringPoint.readings[0].readingAt
                              )
                            )} dias`}
                      </Title>
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
              {item.measuringPoint.type == enums.MeasuringPoints.Type.Online && item.measuringPoint.readings.length > 0 && (
                <>
                <Text>Última Medição Online ({formatDateByLocale(item.measuringPoint.readings[0].createdAt)})</Text>
                <CardsContent>
                  <Card>
                    <CardTitle>Aceleração</CardTitle>

                    <Info>
                      <InfoData>
                        <CardText>Axial</CardText>
                        <CardSubtitle>{item.measuringPoint.readings[0].accelAbsoluteX.toFixed(2)} G</CardSubtitle>
                      </InfoData>

                      <InfoData>
                        <CardText>Vertical</CardText>
                        <CardSubtitle>{item.measuringPoint.readings[0].accelAbsoluteY.toFixed(2)} G</CardSubtitle>
                      </InfoData>

                      <InfoData>
                        <CardText>Horizontal</CardText>
                        <CardSubtitle>{item.measuringPoint.readings[0].accelAbsoluteZ.toFixed(2)} G</CardSubtitle>
                      </InfoData>
                    </Info>
                  </Card>

                  <Card>
                    <CardTitle>Velocidade</CardTitle>

                    <Info>
                      <InfoData>
                        <CardText>Axial</CardText>
                        <CardSubtitle>{item.measuringPoint.readings[0].velAbsoluteX.toFixed(2)} m/s²</CardSubtitle>
                      </InfoData>

                      <InfoData>
                        <CardText>Vertical</CardText>
                        <CardSubtitle>{item.measuringPoint.readings[0].velAbsoluteX.toFixed(2)} m/s²</CardSubtitle>
                      </InfoData>

                      <InfoData>
                        <CardText>Horizontal</CardText>
                        <CardSubtitle>{item.measuringPoint.readings[0].velAbsoluteX.toFixed(2)} m/s²</CardSubtitle>
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

                      <CardTitle>{item.measuringPoint.readings[0].temperature} C</CardTitle>
                    </Temperature>
                  </TemperatureCard>
                </CardsContent>
                </>
              )}

              {item.measuringPoint.type == enums.MeasuringPoints.Type.Online && item.measuringPoint.readings.length === 0 && (
                <CardsContent>
                  <Card>
                    <CardTitle>Nennhuma leitura feita.</CardTitle>
                  </Card>
                </CardsContent>
              )}

              {item.measuringPoint.type ===
                enums.MeasuringPoints.Type.PartTime && (
                <>
                  {item.measuringPoint.readings.length > 0 ? (
                    <>
                      <Text>Últimas Medições Part-Time</Text>
                      <MeasuringPointPartTimeLastReadingsViewStepper>
                        {item.measuringPoint.readings.map((reading, i) => (
                          <MeasuringPointPartTimeLastReadingsStepper
                            key={reading.id}
                            id={reading.id}
                            lastOne={
                              i === item.measuringPoint.readings.length - 1
                            }
                            status={reading.securityStatus || "default"} // Passa o status para mapeamento
                            date={format(
                              new Date(reading.readingAt),
                              "dd 'de' MMMM 'de' yyyy",
                              {
                                locale: ptBR,
                              }
                            )}
                            doneBy={reading.responsibleCompany.name}
                            diagnoseId={reading?.diagnoses[0]?.id}
                          />
                        ))}
                      </MeasuringPointPartTimeLastReadingsViewStepper>
                    </>
                  ) : (
                    <Text>
                      Ainda não temos nenhum registro de leitura para esse ponto
                      de medição
                    </Text>
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
        </>
      )}
    </Container>
  );
}
