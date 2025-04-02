import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { endOfToday, startOfToday } from "date-fns";

import api from "../../services/api";
import { IDiagnose } from "../../services/dtos/IDiagnose";

import { Container, List, Content, Text } from "./styles";
import { HistoryCard } from "../../components/HistoryCard";
import { useTheme } from "styled-components/native";
import { Loading } from "../../components/Loading";
import { useAccessLevels } from "../../hooks/useAccessLevels";

type IAlertsHistoryProps = {
  setReadingsCount: (value: number) => void;
};

export function AlertsHistory({ setReadingsCount }: IAlertsHistoryProps) {
  const THEME = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const { getAccessLevelsData } = useAccessLevels();
  const { currentCompany } = getAccessLevelsData();

  const diagnoses = useQuery<IDiagnose[]>({
    queryKey: ["diagnoses", startOfToday(), endOfToday(), false, false, false],
    queryFn: async () => {
      setIsLoading(true);
      let hazardousness = [...[], ...[], ...[].filter(Boolean)].join(",");

      if (!hazardousness) {
        hazardousness = null;
      }

      const response = await api.get("/diagnoses", {
        params: {
          read: false,
          companyId: currentCompany.companyId,
        },
      });

      const { count } = response.data?.data ?? {
        count: 0,
        diagnoses: [],
      };
      setReadingsCount(count);
      setIsLoading(false);

      return response?.data?.data?.data;
    },
  });

  const onRefresh = async () => {
    diagnoses.refetch();
  };

  useFocusEffect(
    useCallback(() => {
      diagnoses.refetch();
    }, [])
  );

  return (
    <Container>
      <Content>
        {isLoading ? (
          <Loading color={THEME.colors.primary} />
        ) : (
          <List
            data={diagnoses.data?.sort(
              (a, b) =>
                Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HistoryCard item={item} />}
            ListEmptyComponent={
              diagnoses.isLoading ? (
                <Loading bgColor={"transparent"} color={THEME.colors.primary} />
              ) : (
                <Content>
                  <Text
                    style={{
                      alignSelf: "center",
                      textAlign: "center",
                    }}
                  >
                    Felizmente não temos nenhum diagnóstico criado para esses
                    filtros.
                  </Text>
                </Content>
              )
            }
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                progressBackgroundColor={THEME.colors.primary}
                colors={["#FFF", "#FFF"]}
                refreshing={diagnoses.isLoading}
                onRefresh={onRefresh}
              />
            }
          />
        )}
      </Content>
    </Container>
  );
}
