import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";

import TuneIcon from "../../assets/icons/tune.svg";
import CrossIcon from "../../assets/icons/cross.svg";

import THEME from "../../global/styles/theme";
import api from "../../services/api";
import { IDiagnose } from "../../services/dtos/IDiagnose";

import { Container, List, Content, Text, Subtitle, SubtitleContent } from "./styles";
import { HistoryCard } from "../../components/HistoryCard";
import { useTheme } from "styled-components/native";
import { Loading } from "../../components/Loading";
import { useAccessLevels } from "../../hooks/useAccessLevels";
import Header from "../../components/Pages/Header";
import { t } from "i18next";
import Drawer from "../../components/Drawer";
import { DropdownWrapper } from "../ConfigureParameters/styles";
import Select from "../../components/Select";
import Checkboxes from "../../components/Checkboxes";
import { subDays } from "date-fns";

type IAlertsHistoryProps = {
  setReadingsCount: (value: number) => void;
};

const PAGE_SIZE = 10;

export function AlertsHistory({ setReadingsCount }: IAlertsHistoryProps) {
  const THEME = useTheme();
  const { getAccessLevelsData } = useAccessLevels();
  const { currentCompany } = getAccessLevelsData();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filter, setFilter] = useState('90');
  const [statusSelected, setStatusSelected] = useState<Array<any>>(['W', 'D']);
  const [filters, setFilters] = useState<{ startDate?: Date, endDate?: Date, status?: string[] }>({});

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
    queryKey: ["diagnoses", currentCompany?.companyId, filters],
    enabled: !!currentCompany?.companyId,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      console.log(filters);
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

  function openFilter() {
    setIsFiltersOpen(true);
  }

  function closeFilter() {
    setIsFiltersOpen(false);
  }

  function clearFilters() {
    closeFilter();
  }

  async function handleFilterSubmit() {
    const dateNow = new Date();
    let dateStart = subDays(dateNow, 90)
    switch (filter) {
      case '120':
        dateStart = subDays(dateNow, 120)
        break;
      case '90':
        dateStart = subDays(dateNow, 90)
        break;
      case '60':
        dateStart = subDays(dateNow, 60)
        break;
    }

    setFilters({
      startDate: dateStart,
      endDate: dateNow,
      status: statusSelected,
    });

    closeFilter()
  }

  return (
    <Container>
        <Header
          title={t('index.monitoredAssets')}
          rightContent={
            <>
              <TuneIcon width={24} height={24} fill={THEME.colors.dark} onPress={openFilter} />
            </>
          }
        />
      <SubtitleContent>
        <Subtitle>{t('index.lastValueDay', { value: 90 })}</Subtitle>
      </SubtitleContent>

      <Drawer
        isOpen={isFiltersOpen}
        position="center"
        maxHeightPercent={0.95}
        onRequestClose={closeFilter}
        animateOnFirstOpen={false}
        durationMs={200}
      >
        <View style={styles.filterWrapper}>
          <View style={styles.filterHeader}>
            <Text style={styles.title}>{t('index.diagnoseFilter')}</Text>
            <CrossIcon onPress={closeFilter} />
          </View>

          <View style={styles.filterContent}>
            <DropdownWrapper>
              <Select
                editable
                values={[
                  { label: t('index.lastValueDay', { value: 120 }), value: '120' },
                  { label: t('index.lastValueDay', { value: 90 }), value: '90' },
                  { label: t('index.lastValueDay', { value: 60 }), value: '60' }
                ]}
                selected={'90'}
                onSelect={(value) => setFilter(value)}
                label={t('index.period')}
                placeholder="Selecione um nível"
              />
            </DropdownWrapper>

            <Checkboxes 
              title="Status" 
              options={[
                { label: t('index.securityStatus-W'), value: 'W' },
              { label: t('index.securityStatus-D'), value: 'D' }
              ]} 
              value={statusSelected}
              onChange={setStatusSelected}
            />
          </View>

          <View>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleFilterSubmit}
              disabled={isFiltering}
            >
              <Text style={styles.applyButtonText}>
                {isFiltering ? t('index.applying') : t('index.applyFilter')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Drawer>

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
                    {t('index.noDiagnosis')}
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

const styles = StyleSheet.create({
  filterWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    backgroundColor: THEME.colors.light,
    padding: 16,
    borderRadius: 10,
  },
  filterHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  filterContent: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
  },
  title: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: THEME.fontSize.largest,
    textAlign: "center",
  },
  applyButton: {
    backgroundColor: THEME.colors.secondary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  applyButtonText: {
    color: THEME.colors.light,
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.larger,
  },
  clearFilterButton: {
    borderWidth: 1,
    borderColor: THEME.colors.gray,
    backgroundColor: THEME.colors.light,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
    width: "100%",
  },
  clearFilterButtonText: {
    color: THEME.colors.primary,
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.larger,
  },
});
