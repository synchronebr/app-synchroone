import React, { useCallback, useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-notifications";
import {
  format,
  differenceInMinutes,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import { LargeAreaChart } from "../../components/Charts/LargeAreaChart";

import {
  Container,
  Content,
  CardsContent,
  Card,
  CardTitle,
  CardText,
  MeasuringPointPartTimeLastReadingsViewStepper,
} from "./styles";

import { StyleSheet, useWindowDimensions, View, Text } from "react-native";
import { MeasuringPointPartTimeLastReadingsStepper } from "../../components/MeasuringPointPartTimeLastReadingsStepper";
import { enums } from "../../utils/enums";
import {
  getMeasuringPointById,
} from "../../services/MeasuringPoints";
import { Loading } from "../../components/Loading";
import HeaderImage from "../../components/Pages/HeaderImage";
import theme from "../../global/styles/theme";
import { t } from "i18next";
import MeasuringPointOnlinePage from "../../components/Pages/MeasuringPointOnlinePage";
import { Button } from "../../components/Button";

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
  const [isLoading, setIsLoading] = useState(false);

  async function loadScreen() {
    setIsLoading(true);
    try {
      const response = await getMeasuringPointById(
        Number(route.params.equipmentId),
        Number(route.params.mesuringPointId)
      );
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

  useFocusEffect(
    useCallback(() => {
      loadScreen();
    }, [])
  );


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

  if (isLoading)
    return (
      <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
    );

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
        {item ? (
          <>
          <HeaderImage 
            pieceName={item.measuringPoint.name}
            pathName={item.measuringPoint.piece.description}
            securityStatus={item.measuringPoint.securityStatus}
            imageURL={item
                  ? item.measuringPoint.type === enums.MeasuringPoints.Type.PartTime
                    ? require('../../assets/images/white-technician-machine.jpg')
                    : require('../../assets/images/white-mp-sensor.png')
                  : require('../../assets/images/white-mp-sensor.png')}
            isLoading={isLoading}
            withoutChangeImage
          />

          {item && (
            <Content>
              {item.measuringPoint.type === enums.MeasuringPoints.Type.Online &&
                item.measuringPoint.readings.length > 0 ? (
                <MeasuringPointOnlinePage item={item} route={route}/>
              ) : item.measuringPoint.type === enums.MeasuringPoints.Type.Online &&
                item.measuringPoint.readings.length === 0 ? (
                <CardsContent>
                  <Card>
                    <CardTitle>{t('index.measurementPointUnmonitored')}</CardTitle>
                    <CardText>{t('index.linkSyncAlertMP')}</CardText>
                  </Card>
                  <Button title={t('index.deviceConfiguration')} />
                </CardsContent>
              ) : item.measuringPoint.type ===
                enums.MeasuringPoints.Type.PartTime ? (
                <>
                  {item.measuringPoint.readings.length > 0 ? (
                    <View style={styles.container}>
                      <View style={styles.infosContainer}>
                        <View style={styles.infoContent}>
                          <Text style={styles.infoTextTitle}>{t('index.frequency')}</Text>
                          <Text style={styles.infoTextInfo}>{t('index.xDays', { days: 3 })}</Text>
                        </View>
                        <View style={styles.infoContent}>
                          <Text style={styles.infoTextTitle}>{t('index.last')}</Text>
                          <Text style={styles.infoTextInfo}>{t('index.xDaysAgo', { days: 3 })}</Text>
                        </View>
                        <View style={styles.infoContent}>
                          <Text style={styles.infoTextTitle}>{t('index.measurements')}</Text>
                          <Text style={styles.infoTextInfo}>32</Text>
                        </View>
                      </View>

                      <View style={styles.lastReadingContainer}>
                        <Text>{t('index.lastPartTimeMeasurements')}</Text>
                      </View>

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
                    </View>
                  ) : (
                    <Text>
                      {t('index.weDonotHaveReadingMP')}
                    </Text>
                  )}
                </>
              ) : null}
            </Content>
          )} 
          </>
         ) : (<></>)}
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    gap: 10,
  },
  infosContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: theme.colors.light,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 4,
  },
  infoContent: {
    flex: 1,
    flexDirection: 'column',
    gap: 0,
    alignItems: "center",
    // marginHorizontal: 20,
    paddingVertical: 16,
    // justifyContent: "center",
  },
  infoTextTitle: {
    fontSize: 12,
    color: theme.colors.primary,
  },
  infoTextInfo: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  lastReadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: theme.colors.light,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 4,
  },
})
