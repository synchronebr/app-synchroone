import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OneSignal } from "react-native-onesignal";

import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import { IDiagnose } from "../../services/dtos/IDiagnose";
import { AlertCardNavigationProps, AlertCardProps } from "./types";
import { SessionsResponse } from "../../services/Auth/types";

import DangerIcon from "../../assets/icons/danger.svg";
import WarnIcon from "../../assets/icons/warn.svg";
import BookOpenCheckIcon from "../../assets/icons/book-open-check.svg";
import { Loading } from "../../components/Loading";

import {
  Container,
  Scroll,
  PieceDiv,
  PieceText,
  PiecePath,
  Header,
  Title,
  Subtitle,
  Text,
  Divider,
  DiagnoseDescription,
  DiagnoseDescriptionTitleDiv,
  DiagnoseDescriptionTitle,
  DiagnoseDescriptionSubtitle,
  CardsInfo,
  CardInfo,
  CardInfoTitle,
  CardInfoSubtitle,
  CardCauses,
  CardCause,
  CardCauseTitle,
  CardCauseButton,
} from "./styles";

const STATUS_HAZARDOUSNESS = {
  D: { title: "Perigo" },
  W: { title: "Alerta" },
};

export function AlertDetails() {
  const navigation = useNavigation<AlertCardNavigationProps>();
  const route = useRoute();
  const params = route.params as AlertCardProps;
  const { id } = params;
  const THEME = useTheme();
  const { isLoading, data } = useQuery<IDiagnose>({
    queryKey: ["diagnose", id],
    queryFn: async () => {
      const response = await api.get(`/diagnoses/${id}`);
      return response.data || {};
    },
  });

  const {
    AUTH_TOKEN_STORAGE_KEY,
    REFRESH_TOKEN_STORAGE_KEY,
    USER_STORAGE_KEY,
    setUser,
    logout,
  } = useAuth();

  useEffect(() => {
    async function initialize() {
      createAPIInterceptors();
      getToken();
      initializeOneSignal();
      setRead();
    }
    initialize();
  }, []);

  const setRead = async () => {
    try {
      await api.post(`/diagnoses/${id}/read`);
    } catch (error) {
      console.error("Error marking as read", error);
    }
  };

  function createAPIInterceptors() {
    api.interceptors.request.use(
      async (config) => {
        const authToken = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
        if (authToken)
          config.headers.Authorization = `Bearer ${authToken.replace(
            /"/g,
            ""
          )}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 401 &&
          error.response.data?.code === "token.expired"
        ) {
          try {
            const refreshToken = await AsyncStorage.getItem(
              REFRESH_TOKEN_STORAGE_KEY
            );
            if (refreshToken) {
              const response = await api.post("sessions/refreshToken", {
                refreshToken: JSON.parse(refreshToken),
              });
              if (response.status === 200) {
                const {
                  token,
                  refreshToken: newRefreshToken,
                  user,
                }: SessionsResponse = response.data;
                await AsyncStorage.multiSet([
                  [AUTH_TOKEN_STORAGE_KEY, JSON.stringify(token)],
                  [REFRESH_TOKEN_STORAGE_KEY, JSON.stringify(newRefreshToken)],
                  [USER_STORAGE_KEY, JSON.stringify(user)],
                ]);
                return api.request(error.config);
              }
            }
          } catch (err) {
            await logout();
            navigation.reset({ index: 0, routes: [{ name: "Auth" as never }] });
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async function getToken() {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (token && userData) setUser(JSON.parse(userData));
    else navigation.reset({ index: 0, routes: [{ name: "Auth" as never }] });
  }

  function initializeOneSignal() {
    OneSignal.initialize("5f7e98d9-9cca-4e86-8aaa-3de1e8fa36d7");
  }

  return (
    <Container>
      {isLoading ? (
        <View style={{ marginTop: 50 }}>
          <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
          <ActivityIndicator color={THEME.colors.light} />
        </View>
      ) : data ? (
        <Scroll>
          <PieceDiv>
            <PieceText>
              {data.reading.measuringPoint.piece.description}
            </PieceText>
            <PiecePath>
              {/* {`${data.reading.measuringPoint.piece.machine.sector.area.company.name} > ${data.reading.measuringPoint.piece.machine.sector.area.name} > ${data.reading.measuringPoint.piece.machine.sector.name} > ${data.reading.measuringPoint.piece.machine.name}`} */}
            </PiecePath>
          </PieceDiv>

          <Divider />

          <Header>
            {data.hazardousness === "D" && (
              <DangerIcon fill={THEME.colors.danger} />
            )}
            {data.hazardousness === "W" && (
              <WarnIcon fill={THEME.colors.warning} />
            )}
            <Title>{data?.title}</Title>
          </Header>

          <Divider />

          <DiagnoseDescription>
            <DiagnoseDescriptionTitleDiv>
              <DangerIcon fill={THEME.colors.gray} />
              <DiagnoseDescriptionTitle>
                Falha Identificada (
                {STATUS_HAZARDOUSNESS[data.hazardousness]?.title})
              </DiagnoseDescriptionTitle>
            </DiagnoseDescriptionTitleDiv>
            <DiagnoseDescriptionSubtitle>
              {data?.description}
            </DiagnoseDescriptionSubtitle>
          </DiagnoseDescription>

          <Divider />

          <Title>Possíveis causas</Title>
          <CardCauses>
            {data?.causes.map((cause, index) => (
              <React.Fragment key={index}>
                <CardCause>
                  <View style={{ flex: 1 }}>
                    <CardCauseTitle>{cause.causesType.title}</CardCauseTitle>
                  </View>
                  <CardCauseButton
                    onPress={() =>
                      navigation.navigate("AlertPrescriptionDetails", {
                        data: cause,
                        securityStatus: data.hazardousness,
                      })
                    }
                  >
                    <BookOpenCheckIcon fill={THEME.colors.gray} />
                    <CardCauseTitle>Prescrição</CardCauseTitle>
                  </CardCauseButton>
                </CardCause>
                <Divider />
              </React.Fragment>
            ))}
          </CardCauses>
        </Scroll>
      ) : (
        <Scroll>
          <Text>Dados não encontrados</Text>
        </Scroll>
      )}
    </Container>
  );
}
