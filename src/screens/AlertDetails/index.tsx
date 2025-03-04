import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
} from "react-native";

import { useTheme } from "styled-components/native";
import { Loading } from "../../components/Loading";

import { AlertCardProps } from "./types";

import {
  Container,
  Scroll,
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
import { useRoute } from "@react-navigation/native";
import api from "../../services/api";
import { useQueries, useQuery } from "@tanstack/react-query";
import { IDiagnose } from "../../services/dtos/IDiagnose";
import DangerIcon from "../../assets/icons/danger.svg";
import BookOpenCheckIcon from "../../assets/icons/book-open-check.svg";

export function AlertDetails() {
  const route = useRoute();
  const params = route.params as AlertCardProps;
  const { item } = params;

  const THEME = useTheme();
  // const [isLoading, setIsLoading] = useState(true);

  const { isLoading, data } = useQuery<IDiagnose>({
    queryKey: [
      "diagnose",
      item,
    ],
    queryFn: async () => {
      const response = await api.get(`/diagnoses/${item.id}`);
      return response.data || {};
    },
  });

  useEffect(() => {console.log('dt-----', data)}, [data])

  return (
    <Container>
      {isLoading ? (
        <View>
          <Loading
            bgColor={THEME.colors.light}
            color={THEME.colors.primary}
          />
          <ActivityIndicator color={THEME.colors.light} />
        </View>
      ) : 
      (
      <Scroll>
        <Header>
          <DangerIcon fill={THEME.colors.gray} />
          <Title>{data?.title}</Title>
        </Header>

        <Divider />

        <DiagnoseDescription>
          <DiagnoseDescriptionTitleDiv>
            <DangerIcon fill={THEME.colors.gray} />
            <DiagnoseDescriptionTitle>Falha Identificada (Perigo)</DiagnoseDescriptionTitle>
          </DiagnoseDescriptionTitleDiv>
          <DiagnoseDescriptionSubtitle>{data?.description}</DiagnoseDescriptionSubtitle>
        </DiagnoseDescription>

        <Divider />

        <CardsInfo>
          <CardInfo>
            <CardInfoTitle>Criticidade</CardInfoTitle>
            <CardInfoSubtitle>{data?.percent}</CardInfoSubtitle>
          </CardInfo>
          <CardInfo>
            <CardInfoTitle>Chance</CardInfoTitle>
            <CardInfoSubtitle>{data?.percent}</CardInfoSubtitle>
          </CardInfo>
          <CardInfo>
            <CardInfoTitle>Status</CardInfoTitle>
            <CardInfoSubtitle>{data?.percent}</CardInfoSubtitle>
          </CardInfo>
        </CardsInfo>

        <Divider />

        <Title>Possíveis causas</Title >

        <CardCauses>
          <CardCause>
            <CardCauseTitle>Nível de óleo baixo</CardCauseTitle>
            <CardCauseButton>
              <BookOpenCheckIcon fill={THEME.colors.gray}/>
              <CardCauseTitle>Prescrição</CardCauseTitle>
            </CardCauseButton>
          </CardCause>
          <Divider />
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
        
    )}
    </Container>
  );
}
