import React, { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import {
  subDays,
} from "date-fns";
import { useRoute } from "@react-navigation/native";

import api from "../../services/api";
import { IDiagnose } from "../../services/dtos/IDiagnose";

import THEME from "../../global/styles/theme";
import {
  Container,
  List,
  Content,
  Text,
} from "./styles";
import { HistoryCard } from "../../components/HistoryCard";
import { useTheme } from "styled-components/native";
import { Loading } from "../../components/Loading";
import { useAccessLevels } from "../../hooks/useAccessLevels";

type IDiagnosesByPieceProps = {
  id: number;
};

export function DiagnosesByPiece() {
  const THEME = useTheme();
    const route = useRoute();
    const params = route.params as IDiagnosesByPieceProps;
    const { id } = params;

  const { getAccessLevelsData } = useAccessLevels();
  const { currentCompany } = getAccessLevelsData();

  const diagnoses = useQuery<IDiagnose[]>({
    queryKey: [
      "diagnoses",
    ],
    queryFn: async () => {
      const response = await api.get("/diagnoses", {
        params: {
          read: false,
          startDate: subDays(new Date(), 30).toISOString().split("T")[0],
          endDate: new Date().toISOString().split("T")[0],
          companyId: currentCompany.companyId,
          pieceId: id,
        },
      });

      const { count } = response.data?.data ?? {
        count: 0,
        diagnoses: [],
      };
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
      <View style={styles.rangeFilterContainer}>
        <Text style={styles.rangeFilterLabel}>
          Diagóstico do último mes
        </Text>
      </View>

      <Content>
          <List
            data={diagnoses.data}
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
                    Felizmente não temos nenhum diagnóstico criado para esse Ativo
                    filtros.
                  </Text>
                </Content>
              )
            }
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={diagnoses.isLoading} onRefresh={onRefresh} />
            }
          />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  rangeFilterLabel: {
    alignSelf: "center",
    fontSize: THEME.fontSize.larger,
    fontFamily: THEME.fonts.semiBold,
    color: THEME.colors.dark,
  },
  rangeFilterContainer: {
    paddingVertical: 5,
  },
});
