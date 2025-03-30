import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

import { useTheme } from "styled-components/native";
import { Loading } from "../../components/Loading";

import { AlertCardNavigationProps, AlertCardProps } from "./types";

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
  HistoryCards,
  SeeMoreButton,
  SeeMore,
  ShareButtonContainer,
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
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/api";
import { useQueries, useQuery } from "@tanstack/react-query";
import { IDiagnose } from "../../services/dtos/IDiagnose";
import DangerIcon from "../../assets/icons/danger.svg";
import WarnIcon from "../../assets/icons/warn.svg";
import BookOpenCheckIcon from "../../assets/icons/book-open-check.svg";
import { useAuth } from "../../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SessionsResponse } from "../../services/Auth/types";
import { OneSignal } from "react-native-onesignal";

const STATUS_HAZARDOUSNESS: Record<string, { title: string }> = {
  D: {
    title: "Perigo",
  },
  W: {
    title: "Alerta",
  },
};

export function AlertDetails() {
  const navigation = useNavigation<AlertCardNavigationProps>();
  const route = useRoute();
  const params = route.params as AlertCardProps;
  const { item } = params;

  const THEME = useTheme();

  const { isLoading, data } = useQuery<IDiagnose>({
    queryKey: ["diagnose", item],
    queryFn: async () => {
      const response = await api.get(`/diagnoses/${item.id}`);
      return response.data || {};
    },
  });

  const setRead = async () => {
    try {
      await api.post(`/diagnoses/${item.id}/read`);
    } catch (error) {}
  };

  const {
    AUTH_TOKEN_STORAGE_KEY,
    REFRESH_TOKEN_STORAGE_KEY,
    USER_STORAGE_KEY,
    setUser,
    logout,
  } = useAuth();

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
      async function (error) {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.error(error);

        if (error.response.status === 401) {
          if (error.response.data.code === "token.expired") {
            const currentAuthToken = await AsyncStorage.getItem(
              AUTH_TOKEN_STORAGE_KEY
            );
            const currentRefreshToken = await AsyncStorage.getItem(
              REFRESH_TOKEN_STORAGE_KEY
            );

            if (currentAuthToken && currentRefreshToken) {
              try {
                const response = await api.post("sessions/refreshToken", {
                  refreshToken: JSON.parse(currentRefreshToken),
                });

                if (response.status === 200) {
                  const data: SessionsResponse = response.data;

                  await AsyncStorage.setItem(
                    AUTH_TOKEN_STORAGE_KEY,
                    JSON.stringify(data.token)
                  );
                  await AsyncStorage.setItem(
                    REFRESH_TOKEN_STORAGE_KEY,
                    JSON.stringify(data.refreshToken)
                  );
                  await AsyncStorage.setItem(
                    USER_STORAGE_KEY,
                    JSON.stringify(data.user)
                  );
                }

                return api.request(error.config);
              } catch (error) {
                await logout();

                navigation.reset({
                  index: 0,
                  routes: [{ name: "Auth" as never }],
                });

                return;
              }
            }
          }

          return;
        }

        return Promise.reject(error);
      }
    );
  }

  async function getToken() {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);

    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" as never }],
      });
    }
  }

  function initializeOneSignal() {
    OneSignal.initialize("5f7e98d9-9cca-4e86-8aaa-3de1e8fa36d7");
  }

  useEffect(() => {
    createAPIInterceptors();
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    initializeOneSignal();
  }, []);

  useEffect(() => {
    setRead();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <View style={{ marginTop: 50 }}>
          <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
          <ActivityIndicator color={THEME.colors.light} />
        </View>
      ) : (
        <>
          {data ? (
            <Scroll>
              <PieceDiv>
                <PieceText>
                  {item.reading.measuringPoint.piece.description}
                </PieceText>
                <PiecePath>{`${item.reading.measuringPoint.piece.machine.sector.area.company.name} > ${item.reading.measuringPoint.piece.machine.sector.area.name} > ${item.reading.measuringPoint.piece.machine.sector.name} > ${item.reading.measuringPoint.piece.machine.name}`}</PiecePath>
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

              <CardsInfo>
                <CardInfo hazardousness={data?.hazardousness}>
                  <CardInfoTitle>Criticidade</CardInfoTitle>
                  <CardInfoSubtitle>
                    {STATUS_HAZARDOUSNESS[data.hazardousness]?.title}
                  </CardInfoSubtitle>
                </CardInfo>
                <CardInfo hazardousness={data?.hazardousness}>
                  <CardInfoTitle>Chance</CardInfoTitle>
                  <CardInfoSubtitle>{data?.percent}%</CardInfoSubtitle>
                </CardInfo>
                <CardInfo hazardousness={data?.hazardousness}>
                  <CardInfoTitle>Status</CardInfoTitle>
                  <CardInfoSubtitle>
                    {data?.read ? "Avaliado" : "Pendente"}
                  </CardInfoSubtitle>
                </CardInfo>
              </CardsInfo>

              <Divider />

              <Title>Possíveis causas</Title>

              <CardCauses>
                {data?.causes.map((cause) => (
                  <>
                    <CardCause>
                      <CardCauseTitle>Nível de óleo baixo</CardCauseTitle>
                      <CardCauseButton
                        onPress={() =>
                          navigation.navigate("AlertPrescriptionDetails", {
                            item: cause,
                          })
                        }
                      >
                        <BookOpenCheckIcon fill={THEME.colors.gray} />
                        <CardCauseTitle>Prescrição</CardCauseTitle>
                      </CardCauseButton>
                    </CardCause>
                    <Divider />
                  </>
                ))}
              </CardCauses>

              {/* <Title>Histórico de alertas</Title> */}

              {/* <HistoryCards>
            <HistoryCard isLastCard type="danger" />
            <HistoryCard type="warning" />
            <HistoryCard type="warning" />
  
            {seeMore && (
              <>
                <HistoryCard type="success" />
                <HistoryCard type="success" />
                <HistoryCard type="success" />
              </>
            )}
  
            <SeeMoreButton onPress={() => setSeeMore(!seeMore)}>
              <SeeMore>{!seeMore ? "Ver mais" : "Ver menos"}</SeeMore>
            </SeeMoreButton>
          </HistoryCards> */}

              {/* <ShareButtonContainer>
            <ShareButton />
          </ShareButtonContainer> */}
            </Scroll>
          ) : (
            <Scroll>
              <Text>Dados não encontrados</Text>
            </Scroll>
          )}
        </>
      )}
    </Container>
  );
}
