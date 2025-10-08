import React, { useCallback, useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useTheme } from "styled-components/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-notifications";
import { RotateCcwIcon, CirclePlayIcon, Clock4Icon, HardDriveIcon } from "lucide-react-native";
import {
  Container,
} from "./styles";

import { StyleSheet, useWindowDimensions, View, Text, TouchableOpacity } from "react-native";

import { Loading } from "../../components/Loading";
import theme from "../../global/styles/theme";
import { t } from "i18next";
import Header from "../../components/Pages/Header";

import WifiIcon from "../../assets/icons/wifi.svg";
import SensorSyncIcon from "../../assets/icons/sensor-sync1-cut.svg";
import IconStatusBall from "../../components/IconStatusBall";
import { formatDateByLocale } from "../../utils/formatDateByLocale";
import { useAuth } from "../../hooks/useAuth";

interface DeviceProps {
  route: {
    params: {
      equipmentId: number | string;
      mesuringPointId: number | string;
    };
  };
  navigation: any;
}

export function Device({
  route,
  navigation,
}: DeviceProps) {
  const { height, width } = useWindowDimensions();
  const THEME = useTheme();
  const { user } = useAuth();

  const [item, setItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // async function loadScreen() {
  //   setIsLoading(true);
  //   try {
  //     const response = await getMeasuringPointById(
  //       Number(route.params.equipmentId),
  //       Number(route.params.mesuringPointId)
  //     );
  //     setItem(response);
  //   } catch (error) {
  //     Toast.show(
  //       "Houve um erro ao buscar os dados. Por favor, verifique sua conexão, ou tente novamente mais tarde.",
  //       { duration: 5000, type: "danger" }
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  useFocusEffect(
    useCallback(() => {
      // loadScreen();
      console.log('id', route)
    }, [])
  );

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
        <Header
          title={t("index.vibrationSensor")}
          backIcon="back"
          backPress={() => navigation.goBack()}
          // rightContent={<TuneIcon width={24} height={24} fill={THEME.colors.dark} onPress={openFilter} />}
        />

        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerCard}>
              <WifiIcon height={30}/>
              <Text style={styles.headerCardSubtitle}>Sinal</Text>
            </View>
            <View style={styles.headerCard}>
              <Text style={styles.headerCardTitle}>{route.params.code}</Text>
            </View>
            <View style={styles.headerCard}>
              <Text style={styles.headerCardTitle}>90%</Text>
              <Text style={styles.headerCardSubtitle}>Bateria</Text>
            </View>
          </View>

          <View style={styles.pathContainer}>
            <Text style={styles.path}>FAB3 L3 AGREGADO- ME87.01</Text>
            <Text style={styles.pathTitle}>Tampa Traseira</Text>
          </View>

        </View>
          <View style={styles.infosContainer}>
            <View style={styles.infos}>
              <View style={styles.infosLine}>
                <View style={styles.infosIconContainer}>
                  <IconStatusBall status="O"/>
                </View>
                <View style={styles.infosTextContainer}>
                  <Text style={styles.infosTitle}>Status: </Text>
                  <Text style={styles.infosDesc}>Online</Text>
                </View>
              </View>

              <View style={styles.infosLine}>
                <View style={styles.infosIconContainer}>
                  <RotateCcwIcon size={15}/>
                </View>
                <View style={styles.infosTextContainer}>
                  <Text style={styles.infosTitle}>{t('index.last')}: </Text>
                  <Text style={styles.infosDesc}>{formatDateByLocale(new Date(), user?.locale)}</Text>
                </View>
              </View>

              <View style={styles.infosLine}>
                <View style={styles.infosIconContainer}>
                  <CirclePlayIcon size={15}/>
                </View>
                <View style={styles.infosTextContainer}>
                  <Text style={styles.infosTitle}>{t('index.next')}: </Text>
                  <Text style={styles.infosDesc}>{formatDateByLocale(new Date(), user?.locale)}</Text>
                </View>
              </View>

              <View style={styles.infosLine}>
                <View style={styles.infosIconContainer}>
                  <Clock4Icon size={15}/>
                </View>
                <View style={styles.infosTextContainer}>
                  <Text style={styles.infosTitle}>{t('index.window')}: </Text>
                  <Text style={styles.infosDesc}>{t('index.minutesMin', { minutes: 60 })}</Text>
                </View>
              </View>

              <View style={styles.infosLine}>
                <View style={styles.infosIconContainer}>
                  <HardDriveIcon size={15}/>
                </View>
                <View style={styles.infosTextContainer}>
                  <Text style={styles.infosTitle}>{t('index.gateway')}: </Text>
                  <Text style={styles.infosDesc}>Online</Text>
                </View>
              </View>

              <View style={styles.measuringInfosContainer}>
                <Text style={styles.measuringInfosTitle}>144</Text>
                <Text style={styles.measuringInfosSubitle}>{t('index.measurementsEveryHoursHours', { hours: 24 })}</Text>
              </View>

              <TouchableOpacity style={styles.button}>
                <Text>{t('index.editParameters')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infosImage}>
              <SensorSyncIcon height={520} width={170}/>
            </View>
          </View>
        {item ? (
          <>
          </>
        ) : (
          <>
          </>
        )}
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  header: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerCard: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCardTitle: {
    fontFamily: theme.fonts.semiBold,
  },
  headerCardSubtitle: {
    fontSize: theme.fontSize.smaller,
  },
  pathContainer: {
    marginTop: 50,
  },
  path: {
    color: theme.colors.gray,
  },
  pathTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 25,
  },
  infosContainer: {
    // flex: 1,
    marginTop: 20,
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infos: {
    flex: 1,
    marginTop: 20,
    gap: 25,
  },
  infosImage: {
    // marginLeft: 100,
  },
  infosLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infosIconContainer: {
    backgroundColor: theme.colors.primary_light,
    padding: 10,
    borderRadius: 50,
  },
  infosTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infosTitle: {
    fontFamily: theme.fonts.semiBold,
    fontSize: theme.fontSize.smaller,
  },
  infosDesc: {
    fontSize: theme.fontSize.smallest,
  },
  measuringInfosContainer: {
  },
  measuringInfosTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 40,
  },
  measuringInfosSubitle: {
    color: theme.colors.gray_dark,
  },
  button: {
    backgroundColor: theme.colors.primary_light,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})
