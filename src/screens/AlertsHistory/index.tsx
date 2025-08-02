import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
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

const PAGE_SIZE = 10;

export function AlertsHistory({ setReadingsCount }: IAlertsHistoryProps) {
  const THEME = useTheme();
  const { getAccessLevelsData } = useAccessLevels();
  const { currentCompany } = getAccessLevelsData();

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useInfiniteQuery<
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
          companyId: currentCompany?.companyId,
          page: pageParam - 1,
          pageSize: PAGE_SIZE,
        },
      });

      const result = response.data.data; 
      const items = result.data;         
      const total = result.totalUnread;

      if (pageParam === 1) {
        setReadingsCount(total);
      }

      const totalPages = Math.ceil(total / PAGE_SIZE);

      return {
        items,
        nextPage: pageParam < totalPages ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const allItems = data?.pages.flatMap((p) => p.items) ?? [];
  return (
    <Container>
      <Content>
        {isLoading ? (
          <Loading color={THEME.colors.primary} />
        ) : (
          <List
            data={allItems.sort(
              (a, b) =>
                Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HistoryCard item={item} />}
            ListEmptyComponent={
              isRefetching ? (
                <Loading bgColor="transparent" color={THEME.colors.primary} />
              ) : (
                <Content>
                  <Text style={{ textAlign: "center" }}>
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
                colors={["#FFF"]}
                refreshing={isRefetching}
                onRefresh={refetch}
              />
            }
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <Loading color={THEME.colors.primary} />
              ) : null
            }
          />
        )}
      </Content>
    </Container>
  );
}
