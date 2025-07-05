import React, { useCallback, useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-notifications";
import {
  format,
  differenceInDays,
  differenceInMinutes,
  subDays,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import { LargeAreaChart } from "../../components/Charts/LargeAreaChart";

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
} from "./styles";

import { useWindowDimensions } from "react-native";
import { MeasuringPointPartTimeLastReadingsStepper } from "../../components/MeasuringPointPartTimeLastReadingsStepper";
import { enums } from "../../utils/enums";
import {
  getMeasuringPointById,
  getReadingsByMeasuringPoint,
} from "../../services/MeasuringPoints";
import { Loading } from "../../components/Loading";
import { formatDateByLocale } from "../../utils/formatDateByLocale";

interface MeasurementPointDetailsProps {
  route: {
    params: {
      equipmentId: number | string;
      mesuringPointId: number | string;
    };
  };
  navigation: any;
}

export function MeasurementPointDetails({
  route,
  navigation,
}: MeasurementPointDetailsProps) {
  const { height, width } = useWindowDimensions();
  const THEME = useTheme();

  const [item, setItem] = useState<any>(null);
  const [chartData, setChartData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [actionType, setActionType] = useState<"A" | "V" | "T">("A");

  async function loadScreen() {
    setIsLoading(true);
    try {
      const response = await getMeasuringPointById(
        Number(route.params.equipmentId),
        Number(route.params.mesuringPointId)
      );
      console.log("response", response);
      setItem(response);
    } catch (error) {
      Toast.show(
        "Houve um erro ao buscar os dados. Por favor, verifique sua conexão, ou tente novamente mais tarde.",
        { duration: 5000, type: "danger" }
      );
    } finally {
      setIsLoading(false);
    }
  }

  function formatNumber(value: number | null | undefined, decimals = 2) {
    return typeof value === "number" ? value.toFixed(decimals) : "-";
  }

  async function loadChartData(selectedActionType: "A" | "V" | "T") {
    setIsChartLoading(true);
    try {
      const today = new Date();
      const startDate = subDays(today, 30);

      const readingsResponse = await getReadingsByMeasuringPoint(
        Number(route.params.mesuringPointId),
        {
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(today, "yyyy-MM-dd"),
          type: selectedActionType,
          withoutInvalids: false,
        }
      );
      setChartData(readingsResponse);
    } catch (error) {
      Toast.show(
        "Houve um erro ao buscar os dados do gráfico. Por favor, verifique sua conexão, ou tente novamente mais tarde.",
        { duration: 5000, type: "danger" }
      );
    } finally {
      setIsChartLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadScreen();
    }, [])
  );

  useEffect(() => {
    loadChartData(actionType);
  }, [actionType]);

  // Atualiza o tempo restante para próxima leitura
  useEffect(() => {
    if (!item) return;

    const calculateTime = () => {
      const now = new Date();
      if (item.measuringPoint.readings && item.measuringPoint.readings[0]) {
        const lastExecutionDate = new Date(
          item.measuringPoint.readings[0].createdAt
        );
        const minutesSinceLast = differenceInMinutes(now, lastExecutionDate);
        let nextExecutionIn = 0;

        if (item.measuringPoint.device) {
          const readingWindow = item.measuringPoint.device.readingWindow;
          nextExecutionIn = readingWindow - minutesSinceLast;
          if (nextExecutionIn < 0) nextExecutionIn = 0;
        }

        setTimeInfo({ minutesSinceLast, nextExecutionIn });
      } else if (item.measuringPoint?.device?.readingWindow) {
        setTimeInfo({
          minutesSinceLast: item.measuringPoint.device.readingWindow,
          nextExecutionIn: item.measuringPoint.device.readingWindow,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [item]);

  const [timeInfo, setTimeInfo] = useState({
    minutesSinceLast: 0,
    nextExecutionIn: 0,
  });

  const handleGraphicButtonClick = (type: "A" | "V" | "T") => {
    setActionType(type);
  };

  if (isLoading)
    return (
      <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
    );

  return (
    <Container>
      <Header>
        <Image
          resizeMode="cover"
          source={{
            uri:
              item &&
              item.measuringPoint.type === enums.MeasuringPoints.Type.PartTime
                ? "https://synchroone.s3.amazonaws.com/white-technician-machine.jpg"
                : "https://synchroone.s3.amazonaws.com/white-mp-sensor.png",
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
                  <Title>
                    {item.measuringPoint.device
                      ? item.measuringPoint.device.battery
                      : "-"}{" "}
                    %
                  </Title>
                  <Subtitle>Bateria</Subtitle>
                </Detail>

                <Detail>
                  <Title>
                    {item.measuringPoint.device
                      ? `${item.measuringPoint.device.readingWindow} min`
                      : "-"}
                  </Title>
                  <Subtitle>Janela</Subtitle>
                </Detail>

                <Detail>
                  <Title>
                    {item.measuringPoint.device
                      ? `${timeInfo.nextExecutionIn} min`
                      : "-"}
                  </Title>
                  <Subtitle>Próxima</Subtitle>
                </Detail>
              </Asset>
            )}

            {item.measuringPoint.type ===
              enums.MeasuringPoints.Type.PartTime && (
              <Asset status={item.measuringPoint.readings[0]?.securityStatus}>
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
                          new Date(item.measuringPoint.readings[0].readingAt)
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
          {item.measuringPoint.type === enums.MeasuringPoints.Type.Online &&
          item.measuringPoint.readings.length > 0 ? (
            <>
              <Text>
                Última Medição Online (
                {formatDateByLocale(item.measuringPoint.readings[0].createdAt)})
              </Text>
              <CardsContent>
                <Card>
                  <CardTitle>Aceleração</CardTitle>

                  <Info>
                    <InfoData>
                      <CardText>Axial</CardText>
                      <CardSubtitle>
                        {formatNumber(
                          item.measuringPoint.readings[0].accelAbsoluteX
                        )}{" "}
                        G
                      </CardSubtitle>
                    </InfoData>

                    <InfoData>
                      <CardText>Vertical</CardText>
                      <CardSubtitle>
                        {formatNumber(
                          item.measuringPoint.readings[0].accelAbsoluteY
                        )}{" "}
                        G
                      </CardSubtitle>
                    </InfoData>

                    <InfoData>
                      <CardText>Horizontal</CardText>
                      <CardSubtitle>
                        {formatNumber(
                          item.measuringPoint.readings[0].accelAbsoluteZ
                        )}{" "}
                        G
                      </CardSubtitle>
                    </InfoData>
                  </Info>
                </Card>

                <Card>
                  <CardTitle>Velocidade</CardTitle>

                  <Info>
                    <InfoData>
                      <CardText>Axial</CardText>
                      <CardSubtitle>
                        {formatNumber(
                          item.measuringPoint.readings[0].velAbsoluteX
                        )}{" "}
                        m/s²
                      </CardSubtitle>
                    </InfoData>

                    <InfoData>
                      <CardText>Vertical</CardText>
                      <CardSubtitle>
                        {formatNumber(
                          item.measuringPoint.readings[0].velAbsoluteY
                        )}{" "}
                        m/s²
                      </CardSubtitle>
                    </InfoData>

                    <InfoData>
                      <CardText>Horizontal</CardText>
                      <CardSubtitle>
                        {formatNumber(
                          item.measuringPoint.readings[0].velAbsoluteZ
                        )}{" "}
                        m/s²
                      </CardSubtitle>
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

                    <CardTitle>
                      {item.measuringPoint.readings[0].temperature} C
                    </CardTitle>
                  </Temperature>
                </TemperatureCard>
              </CardsContent>
            </>
          ) : item.measuringPoint.type === enums.MeasuringPoints.Type.Online &&
            item.measuringPoint.readings.length === 0 ? (
            <CardsContent>
              <Card>
                <CardTitle>Nenhuma leitura feita.</CardTitle>
              </Card>
            </CardsContent>
          ) : item.measuringPoint.type ===
            enums.MeasuringPoints.Type.PartTime ? (
            <>
              {item.measuringPoint.readings.length > 0 ? (
                <>
                  <Text>Últimas Medições Part-Time</Text>
                  <MeasuringPointPartTimeLastReadingsViewStepper>
                    {item.measuringPoint.readings.map(
                      (reading: any, i: number) => (
                        <MeasuringPointPartTimeLastReadingsStepper
                          key={reading.id}
                          id={reading.id}
                          lastOne={
                            i === item.measuringPoint.readings.length - 1
                          }
                          status={reading.securityStatus || "default"}
                          date={format(
                            new Date(reading.readingAt),
                            "dd 'de' MMMM 'de' yyyy",
                            { locale: ptBR }
                          )}
                          doneBy={reading.responsibleCompany.name}
                          diagnoseId={reading?.diagnoses[0]?.id}
                        />
                      )
                    )}
                  </MeasuringPointPartTimeLastReadingsViewStepper>
                </>
              ) : (
                <Text>
                  Ainda não temos nenhum registro de leitura para esse ponto de
                  medição
                </Text>
              )}
            </>
          ) : null}
          
          {item.measuringPoint.type === enums.MeasuringPoints.Type.Online &&
          item.measuringPoint.readings.length > 0 && (
          <>
          <Text>Gráficos</Text>

          <Graphics>
            <GraphicsButtons style={{ marginBottom: 25 }}>
              <GraphicButton
                onPress={() => handleGraphicButtonClick("A")}
                style={{
                  backgroundColor:
                    actionType === "A" ? THEME.colors.primary : "transparent",
                }}
              >
                <GraphicButtonText
                  style={{
                    color: actionType === "A" ? "white" : THEME.colors.text,
                  }}
                >
                  Aceleração RMS
                </GraphicButtonText>
              </GraphicButton>

              <GraphicButton
                onPress={() => handleGraphicButtonClick("V")}
                style={{
                  backgroundColor:
                    actionType === "V" ? THEME.colors.primary : "transparent",
                }}
              >
                <GraphicButtonText
                  style={{
                    color: actionType === "V" ? "white" : THEME.colors.text,
                  }}
                >
                  Velocidade RMS
                </GraphicButtonText>
              </GraphicButton>

              <GraphicButton
                onPress={() => handleGraphicButtonClick("T")}
                style={{
                  backgroundColor:
                    actionType === "T" ? THEME.colors.primary : "transparent",
                }}
              >
                <GraphicButtonText
                  style={{
                    color: actionType === "T" ? "white" : THEME.colors.text,
                  }}
                >
                  Temperatura
                </GraphicButtonText>
              </GraphicButton>
            </GraphicsButtons>

            {isChartLoading ? (
              <ContentLoader
                width={width}
                height={300}
                viewBox={`0 0 ${width} 300`}
                preserveAspectRatio="none"
                style={{ marginVertical: 16 }}
              >
                <Rect x="0" y="0" rx="0" ry="0" width={width} height={300} />
              </ContentLoader>
            ) : chartData && chartData.xAxis.length > 0 ? (
              <LargeAreaChart
                data={chartData}
                actionType={actionType}
                safeLines={item.measuringPoint || {}}
              />
            ) : (
              <Text>Sem dados para exibir no gráfico.</Text>
            )}
          </Graphics>
          </>)}
        </Content>
      )}
    </Container>
  );
}
