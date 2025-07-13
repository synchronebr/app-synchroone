import React, { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

const PAGE_SIZE = 10;

export function DiagnosesByPiece() {
  const THEME = useTheme();
    const route = useRoute();
    const params = route.params as IDiagnosesByPieceProps;
    const { id } = params;

  const { getAccessLevelsData } = useAccessLevels();
  const { currentCompany } = getAccessLevelsData();

  const diagnoses = useInfiniteQuery<
    { items: IDiagnose[]; nextPage?: number },
    Error
  >({
    queryKey: ["diagnoses", currentCompany?.companyId],
    enabled: !!currentCompany?.companyId,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<{
        data: {
          data: IDiagnose[];
          total: number;
          totalRead: number;
          totalUnread: number;
        }
      }>("/diagnoses", {
        params: {
          companyId: currentCompany.companyId,
          pieceId: id,
          page: pageParam - 1,
          pageSize: PAGE_SIZE,
        },
      });

      const result = response.data.data; 
      const items = result.data;         
      const total = result.totalUnread;
      const totalPages = Math.ceil(total / PAGE_SIZE);

      return {
        items,
        nextPage: pageParam < totalPages ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const onRefresh = async () => {
    diagnoses.refetch();
  };

  useFocusEffect(
    useCallback(() => {
      diagnoses.refetch();
    }, [])
  );

  const allItems = diagnoses.data?.pages.flatMap((p) => p.items) ?? [];
  return (
    <Container>
      <View style={styles.rangeFilterContainer}>
        <Text style={styles.rangeFilterLabel}>
          Diagóstico do último mes
        </Text>
      </View>

      <Content>
          <List
            data={allItems}
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
