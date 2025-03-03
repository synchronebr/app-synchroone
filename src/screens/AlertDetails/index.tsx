import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
} from "react-native";

import { useTheme } from "styled-components/native";
import THEME from "../../global/styles/theme";
import { Loading } from "../../components/Loading";

import { ShareButton } from "../../components/ShareButton";
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
} from "./styles";
import { useRoute } from "@react-navigation/native";
import api from "../../services/api";
import { useQueries, useQuery } from "@tanstack/react-query";
import { IDiagnose } from "../../services/dtos/IDiagnose";

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
          <Title>{data?.title}</Title>

          <Subtitle>Há 5 min</Subtitle>
        </Header>

        <Text>{data?.description}</Text>

        <Divider />

        <Title>Histórico de alertas</Title>

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

        <ShareButtonContainer>
          <ShareButton />
        </ShareButtonContainer>
      </Scroll>
        
    )}
    </Container>
  );
}
