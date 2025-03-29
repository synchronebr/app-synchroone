import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
} from "react-native";

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

const STATUS_HAZARDOUSNESS: Record<string, { title: string; }> = {
  D: {
    title: 'Perigo',
  },
  W: {
    title: 'Alerta',
  },
};

export function AlertDetails() {
  const navigation = useNavigation<AlertCardNavigationProps>();
  const route = useRoute();
  const params = route.params as AlertCardProps;
  const { id } = params;

  const THEME = useTheme();

  const { isLoading, data } = useQuery<IDiagnose>({
    queryKey: [
      "diagnose",
      id,
    ],
    queryFn: async () => {
      const response = await api.get(`/diagnoses/${id}`);
      return response.data || {};
    },
  });

  const setRead = async () => {
    try {
      await api.post(`/diagnoses/${id}/read`);
    } catch (error) {}
  }

  useEffect(() => {
    setRead();
  }, [])

  return (
    <Container>
      {isLoading ? (
        <View style={{ marginTop: 50 }}>
          <Loading
            bgColor={THEME.colors.light}
            color={THEME.colors.primary}
          />
          <ActivityIndicator color={THEME.colors.light} />
        </View>
      ) : 
      (
        <>
        {data ? (
          <Scroll>
          <PieceDiv>
            <PieceText>{data.reading.measuringPoint.piece.description}</PieceText>
            <PiecePath>{
                `${data.reading.measuringPoint.piece.machine.sector.area.company.name} > ${data.reading.measuringPoint.piece.machine.sector.area.name} > ${data.reading.measuringPoint.piece.machine.sector.name} > ${data.reading.measuringPoint.piece.machine.name}`
            }</PiecePath>
          </PieceDiv>
  
          <Divider />

          <Header>
            {data.hazardousness === 'D' && (<DangerIcon fill={THEME.colors.danger} />)}
            {data.hazardousness === 'W' && (<WarnIcon fill={THEME.colors.warning} />)}
            
            <Title>{data?.title}</Title>
          </Header>
  
          <Divider />
  
          <DiagnoseDescription>
            <DiagnoseDescriptionTitleDiv>
              <DangerIcon fill={THEME.colors.gray} />
              <DiagnoseDescriptionTitle>Falha Identificada ({STATUS_HAZARDOUSNESS[data.hazardousness]?.title})</DiagnoseDescriptionTitle>
            </DiagnoseDescriptionTitleDiv>
            <DiagnoseDescriptionSubtitle>{data?.description}</DiagnoseDescriptionSubtitle>
          </DiagnoseDescription>
  
          <Divider />
  
          <CardsInfo>
            <CardInfo hazardousness={data?.hazardousness}>
              <CardInfoTitle>Criticidade</CardInfoTitle>
              <CardInfoSubtitle>{STATUS_HAZARDOUSNESS[data.hazardousness]?.title}</CardInfoSubtitle>
            </CardInfo>
            <CardInfo hazardousness={data?.hazardousness}>
              <CardInfoTitle>Chance</CardInfoTitle>
              <CardInfoSubtitle>{data?.percent}%</CardInfoSubtitle>
            </CardInfo>
            <CardInfo hazardousness={data?.hazardousness}>
              <CardInfoTitle>Status</CardInfoTitle>
              <CardInfoSubtitle>{data?.read ? 'Avaliado' : 'Pendente'}</CardInfoSubtitle>
            </CardInfo>
          </CardsInfo>
  
          <Divider />
  
          <Title>Possíveis causas</Title >
  
          <CardCauses>
            {data?.causes.map(cause => (
              <>
              <CardCause>
                <CardCauseTitle>Nível de óleo baixo</CardCauseTitle>
                <CardCauseButton onPress={() => navigation.navigate("AlertPrescriptionDetails", { data: cause })}>
                  <BookOpenCheckIcon fill={THEME.colors.gray}/>
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
      )
    }
    </Container>
  );
}
