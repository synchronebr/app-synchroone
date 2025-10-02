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
  HeaderDiagnose,
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
import Header from "../../components/Pages/Header";
import { t } from "i18next";

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

  useEffect(() => {
    async function initialize() {
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

  function initializeOneSignal() {
    OneSignal.initialize("5f7e98d9-9cca-4e86-8aaa-3de1e8fa36d7");
  }

  return (
    <Container>
      <Header
        title={t("index.diagnoseDetails")}
        backIcon="back"
        backPress={() => navigation.goBack()}
      />
      {isLoading ? (
        <View style={{ marginTop: 50 }}>
          <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
          <ActivityIndicator color={THEME.colors.light} />
        </View>
      ) : data ? (
        <Scroll>
          <PieceDiv>
            <PieceText>
              {data.reading.measuringPoint.piece.description} - {data.reading.measuringPoint.piece.pathNames.join(" - ")}
            </PieceText>
            <PiecePath>
              {data.reading.measuringPoint.piece.company.name}
              {/* {`${data.reading.measuringPoint.piece.machine.sector.area.company.name} > ${data.reading.measuringPoint.piece.machine.sector.area.name} > ${data.reading.measuringPoint.piece.machine.sector.name} > ${data.reading.measuringPoint.piece.machine.name}`} */}
            </PiecePath>
          </PieceDiv>

          <Divider />

          <HeaderDiagnose>
            {data.hazardousness === "D" && (
              <DangerIcon fill={THEME.colors.danger} />
            )}
            {data.hazardousness === "W" && (
              <WarnIcon fill={THEME.colors.warning} />
            )}
            <Title>{data?.title}</Title>
          </HeaderDiagnose>

          <Divider />

          <DiagnoseDescription>
            <DiagnoseDescriptionTitleDiv>
              {/* <DangerIcon fill={THEME.colors.gray} /> */}
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
                    <CardCauseTitle>{t('index.prescription')}</CardCauseTitle>
                  </CardCauseButton>
                </CardCause>
                <Divider />
              </React.Fragment>
            ))}
          </CardCauses>
        </Scroll>
      ) : (
        <Scroll>
          <Text>{t('index.dataNotFound')}</Text>
        </Scroll>
      )}
    </Container>
  );
}
