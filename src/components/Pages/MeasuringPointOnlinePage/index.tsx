import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { t } from "i18next";
import { Toast } from "react-native-toast-notifications";
import {
  format,
  differenceInMinutes,
  subDays,
  addDays,
  addMinutes,
} from "date-fns";

import SensorSyncIcon from "../../../assets/icons/sensor-sync1.svg";
import ArrowForwardIcon from "../../../assets/icons/arrow-forward.svg";
import ThermometerIcon from "../../../assets/icons/thermometer.svg";

import theme from "../../../global/styles/theme";
import {
  getReadingsByMeasuringPoint,
} from "../../../services/MeasuringPoints";

import Tabs from "../Tabs";
import CardVibration from "./CardVibration";
import ContentLoader, { Rect } from "react-content-loader/native";
import { LargeAreaChart } from "../../Charts/LargeAreaChart";
import EmptyState from "../../EmptyState";
import { convertFloatToString } from "../../../utils/convertFloatToString";
import { useAuth } from "../../../hooks/useAuth";
import { formatDateByLocale } from "../../../utils/formatDateByLocale";
import { Button } from "../../Button";

interface IMeasuringPointOnlinePageProps {
  item: any;
  route: {
    params: {
      equipmentId: number | string;
      mesuringPointId: number | string;
    };
  };
}

export default function MeasuringPointOnlinePage({ item, route }: IMeasuringPointOnlinePageProps) {
  const THEME = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();
  const [tab, setTab] = useState('H');
  const [isChartLoading, setIsChartLoading] = useState(false);
  const { height, width } = useWindowDimensions();
  const [chartData, setChartData] = useState<any | null>(null);
  const [actionType, setActionType] = useState<string>("A");

  async function loadChartData(selectedActionType: string) {
    setIsChartLoading(true);
    try {
      const today = new Date();
      const tomorow = addDays(today, 1);
      const startDate = subDays(today, 30);

      const readingsResponse = await getReadingsByMeasuringPoint(
        Number(route.params.mesuringPointId),
        {
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(tomorow, "yyyy-MM-dd"),
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

  useEffect(() => {
    loadChartData(actionType);
  }, [actionType]);

  const lastReading = item.measuringPoint.readings[0];
  const device = item.measuringPoint?.device;

  return (
    <View style={styles.container}>
      <View style={styles.sensorContainer}>
        <View style={styles.sensorAboutContainer}>
          {device ? (
            <>
            <SensorSyncIcon height={120} width={60} />
            <View style={styles.sensorAboutTextContainer}>
              <Text style={styles.sensorAboutText}>{device?.code}</Text>
              <View>
                <Text>{t('index.minutesMin', { minutes: device?.readingWindow })}</Text>
                <Text style={styles.sensorAboutTextSmall}>{t('index.window')}</Text>
              </View>
              <TouchableOpacity style={styles.detalhesButton} onPress={() => navigation.navigate("Device", { code: device.code})}>
                <ArrowForwardIcon 
                  fill={THEME.colors.primary} 
                  height={8} 
                  width={8} 
                />
                <Text style={styles.sensorAboutTextContainer}>{t('index.details')}</Text>
              </TouchableOpacity>
            </View>
            </>
          ) : (
            <View style={styles.withoutSensorContainer}>
              <Text style={styles.withoutSensorTitle}>{t('index.assetAtRisk')}</Text>
              <Text style={styles.withoutSensorDescription}>{t('index.assetAtRiskDescription')}</Text>
            </View>
          )}
          
        </View>
        <View style={styles.buttonsContainer}>
          {device ? (
            <TouchableOpacity style={styles.button}>
              <Text>{t('index.requestReading')}</Text>
            </TouchableOpacity> 
          ) : (
            <TouchableOpacity style={styles.button}>
              <Text>{t('index.connectSensor')}</Text>
            </TouchableOpacity>
          )}
          <View style={styles.buttonsDataView}>
            <Text style={styles.buttonsDataViewTextBig}>{t('index.lastMeasurement')}</Text>
            <Text style={styles.buttonsDataViewTextNormal}>{formatDateByLocale(lastReading.readingAt, user?.locale)}</Text>
            {device && (<Text style={styles.buttonsDataViewTextSmall}>{t('index.next')} - {addMinutes(lastReading.readingAt, device?.readingWindow) > new Date() ? formatDateByLocale(addMinutes(lastReading.readingAt, device?.readingWindow), user?.locale) : formatDateByLocale(new Date(), user?.locale)}</Text>)}
          </View>
        </View>
      </View> 

      <Tabs 
        options={[
          { label: t('index.overview'), value: 'H' },
          { label: t('index.graphs'), value: 'G' },
        ]}
        value={tab}
        setValue={setTab}
      />

      {tab === 'H' && (
        <>
        <View style={styles.accelContainer}>
          <CardVibration title={t('index.axialAcceleration')} value={convertFloatToString(lastReading.accelAbsoluteX, 4, user?.locale) + ' G'} />
          <CardVibration title={t('index.horizontalAcceleration')} value={convertFloatToString(lastReading.accelAbsoluteY, 4, user?.locale) + ' G'} />
          <CardVibration title={t('index.verticalAcceleration')} value={convertFloatToString(lastReading.accelAbsoluteZ, 4, user?.locale) + ' G'} />
        </View>
        <View style={styles.accelContainer}>
          <CardVibration title={t('index.axialVelocity')} value={convertFloatToString(lastReading.velAbsoluteX, 4, user?.locale) + ' m/s²'} />
          <CardVibration title={t('index.verticalVelocity')} value={convertFloatToString(lastReading.velAbsoluteY, 4, user?.locale) + ' m/s²'} />
          <CardVibration title={t('index.horizontalVelocity')} value={convertFloatToString(lastReading.velAbsoluteZ, 4, user?.locale) + ' m/s²'} />
        </View>
        <View style={styles.accelContainer}>
          <View style={styles.temperatureContainer}>
            <Text>{t('index.temperature')}: </Text> 
            <ThermometerIcon height={16} width={24} />
            <Text>{lastReading.temperature} °C</Text> 
          </View>
        </View>
        </>
      )}

      {tab === 'G' && (
        <>
        <Tabs 
          options={[
            { label: t('index.RMSAcceleration'), value: 'A' },
            { label: t('index.RMSVelocity'), value: 'V' },
            { label: t('index.averageTemperature'), value: 'T' },
          ]}
          value={actionType}
          setValue={setActionType}
          smallText
        />

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
            actionType={actionType as any}
            safeLines={item.measuringPoint || {}}
          />
        ) : (
          // <Text>Sem dados para exibir no gráfico.</Text>
          <EmptyState
            title={t('index.noDataAvailable')}
          />
        )}
        </>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    gap: 16,
  },
  sensorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  sensorAboutContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: theme.colors.light,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    gap: 4,
  },
  withoutSensorContainer: {
    flex: 1,
    // backgroundColor: theme.colors.warning_light,
    borderRadius: 4,
    padding: 8,
    gap: 4,
  },
  withoutSensorTitle: {
    fontFamily: theme.fonts.semiBold,
  },
  withoutSensorDescription: {
    fontSize: theme.fontSize.smallest,
  },
  sensorAboutTextContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    fontSize: theme.fontSize.smaller,
  },
  sensorAboutText: {
    fontSize: theme.fontSize.normal,
  },
  sensorAboutTextSmall: {
    fontSize: theme.fontSize.smaller,
  },
  detalhesButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary_light,
    gap: 8,
    padding: 8,
    borderRadius: 5,
  },
  buttonsContainer: {
    flex: 1,
    borderRadius: 4,
    gap: 8,
    justifyContent: "space-around",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary_light,
    gap: 8,
    paddingHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonsDataView: {
    alignItems: "center",
    backgroundColor: theme.colors.light,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    paddingVertical: 10,
    gap: 4,
  },
  buttonsDataViewTextBig: {
    fontSize: theme.fontSize.larger,
  },
  buttonsDataViewTextNormal: {
    fontSize: theme.fontSize.smaller,
  },
  buttonsDataViewTextSmall: {
    fontSize: theme.fontSize.smallest,
    color: theme.colors.gray_dark,
  },
  accelContainer: {
    gap: 4,
  },
  temperatureContainer: {
    flex: 1,
    backgroundColor: theme.colors.primary_light,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: 8,
  },
  notConfigMPContainer: {
    flex: 1,
    alignSelf: 'stretch', 
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 20,
  },
  notConfigMPTitle: {
    fontFamily: theme.fonts.semiBold,
    fontSize: theme.fontSize.normal,
  },
  notConfigMPDesc: {

  },
});
