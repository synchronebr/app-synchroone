import React, { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subDays,
  startOfYear,
  endOfYear,
  endOfToday,
  startOfToday,
} from "date-fns";

import api from "../../services/api";
import { IDiagnose } from "../../services/dtos/IDiagnose";

import THEME from "../../global/styles/theme";
import {
  Container,
  WeekDayFilterContainer,
  List,
  Content,
  Text,
} from "./styles";
import Drawer from "../../components/Drawer";
import { WeekDayFilter } from "../../components/WeekDayFilter";
import { HistoryCard } from "../../components/HistoryCard";
import { useTheme } from "styled-components/native";
import CrossIcon from "../../assets/icons/cross.svg";
import { Loading } from "../../components/Loading";
import Select from "../../components/Select";
import Checkbox from "../../components/Checkbox";
import { useAlertFilter } from "../../hooks/useAlertFilter";
import { useAccessLevels } from "../../hooks/useAccessLevels";

type IAlertsHistoryProps = {
  setReadingsCount: (value: number) => void;
};

enum RangeFilters {
  CURRENT_WEEK = "current_week",
  CURRENT_MONTH = "current_month",
  LAST_WEEK = "last_week",
  LAST_MONTH = "last_month",
  CURRENT_YEAR = "current_year",
}

const RangeFiltersLabels = {
  [RangeFilters.CURRENT_WEEK]: "Semana atual",
  [RangeFilters.CURRENT_MONTH]: "Mês atual",
  [RangeFilters.LAST_WEEK]: "Semana anterior",
  [RangeFilters.LAST_MONTH]: "Mês anterior",
  [RangeFilters.CURRENT_YEAR]: "Ano atual",
};
enum HazardousnessFilters {
  D = "D",
  W = "W",
  A = "A",
  P = "P",
}

export function AlertsHistory({ setReadingsCount }: IAlertsHistoryProps) {
  const THEME = useTheme();
  const { isFilterOpen, setIsFilterOpen } = useAlertFilter();

  const [isLoading, setIsLoading] = useState(false);
  const [initRange, setInitRange] = useState(startOfToday());
  const [endRange, setEndRange] = useState(endOfToday());

  const [selectedRangeFilter, setSelectedRangeFilter] = useState(
    RangeFilters.CURRENT_WEEK
  );

  const [dangerChecked, setDangerChecked] = useState(false);
  const [alertChecked, setAlertChecked] = useState(false);
  const [severeChecked, setSevereChecked] = useState(false);

  const { getAccessLevelsData } = useAccessLevels();
  const { currentCompany } = getAccessLevelsData();

  const diagnoses = useQuery<IDiagnose[]>({
    queryKey: [
      "diagnoses",
      initRange,
      endRange,
      dangerChecked,
      alertChecked,
      severeChecked,
    ],
    queryFn: async () => {
      setIsLoading(true);
      let hazardousness = [
        ...(dangerChecked ? [HazardousnessFilters.D] : []),
        ...(severeChecked ? [HazardousnessFilters.P] : []),
        ...(alertChecked
          ? [HazardousnessFilters.W, HazardousnessFilters.A]
          : []
        ).filter(Boolean),
      ].join(",");

      if (!hazardousness) {
        hazardousness = null;
      }

      const response = await api.get("/diagnoses", {
        params: {
          read: false,
          startDate: initRange.toISOString().split("T")[0],
          endDate: endRange.toISOString().split("T")[0],
          ...(hazardousness ? { hazardousness } : {}),
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

  function closeFilter() {
    setIsFilterOpen(false);
  }

  function changeDataValue(date: Date) {
    setInitRange(startOfDay(date));
    setEndRange(endOfDay(date));
  }

  function applyFilters({
    range,
    alert,
    danger,
    severe,
  }: {
    range: RangeFilters;
    alert: boolean;
    danger: boolean;
    severe: boolean;
  }) {
    setDangerChecked(danger);
    setAlertChecked(alert);
    setSevereChecked(severe);
    setSelectedRangeFilter(range);

    switch (range) {
      case RangeFilters.CURRENT_WEEK:
        setInitRange(startOfToday());
        setEndRange(endOfToday());
        break;

      case RangeFilters.CURRENT_MONTH:
        setInitRange(startOfMonth(new Date()));
        setEndRange(endOfMonth(new Date()));
        break;

      case RangeFilters.LAST_WEEK:
        setInitRange(startOfWeek(subDays(new Date(), 7)));
        setEndRange(endOfWeek(subDays(new Date(), 7)));
        break;

      case RangeFilters.LAST_MONTH:
        const lastMonth = subDays(new Date(), new Date().getDate());
        setInitRange(startOfMonth(lastMonth));
        setEndRange(endOfMonth(lastMonth));
        break;

      case RangeFilters.CURRENT_YEAR:
        setInitRange(startOfYear(new Date()));
        setEndRange(endOfYear(new Date()));
        break;

      default:
        break;
    }

    diagnoses.refetch();
  }

  function clearFilters() {
    setSelectedRangeFilter(RangeFilters.CURRENT_WEEK);
    setDangerChecked(false);
    setAlertChecked(false);
    setInitRange(startOfToday());
    setEndRange(endOfToday());
    closeFilter();
  }

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
      {selectedRangeFilter === RangeFilters.CURRENT_WEEK ? (
        <WeekDayFilterContainer>
          <WeekDayFilter
            selectedDate={new Date(initRange)}
            setSelectedDate={changeDataValue}
          />
        </WeekDayFilterContainer>
      ) : (
        <View style={styles.rangeFilterContainer}>
          <Text style={styles.rangeFilterLabel}>
            Listando alertas para: {RangeFiltersLabels[selectedRangeFilter]}
          </Text>
        </View>
      )}

      <Content>
        {/* {isLoading ? (
          <View>
            <Loading
              bgColor={THEME.colors.light}
              color={THEME.colors.primary}
            />
            <ActivityIndicator color={THEME.colors.light} />
          </View>
        ) : ( */}
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
                    Felizmente não temos nenhum diagnóstico criado para esses
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
        {/* )} */}
      </Content>

      <AlertFiltersDrawer
        isOpen={isFilterOpen}
        closeDrawer={closeFilter}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />
    </Container>
  );
}

type AlertFiltersDrawerProps = {
  isOpen: boolean;
  closeDrawer: () => void;
  applyFilters: (filters: {
    range: RangeFilters;
    alert: boolean;
    danger: boolean;
    severe: boolean;
  }) => void;
  clearFilters: () => void;
};
function AlertFiltersDrawer({
  isOpen,
  closeDrawer,
  applyFilters,
  clearFilters,
}: AlertFiltersDrawerProps) {
  const [selectedRangeFilter, setSelectedRangeFilter] = useState<RangeFilters>(
    RangeFilters.CURRENT_WEEK
  );
  const [dangerChecked, setDangerChecked] = useState(false);
  const [alertChecked, setAlertChecked] = useState(false);
  const [severeChecked, setSevereChecked] = useState(false);

  function handleFilterSubmit() {
    applyFilters({
      range: selectedRangeFilter,
      alert: alertChecked,
      severe: severeChecked,
      danger: dangerChecked,
    });
    closeDrawer();
  }

  function handleClearFilters() {
    setSelectedRangeFilter(RangeFilters.CURRENT_WEEK);
    setAlertChecked(false);
    setSevereChecked(false);
    setDangerChecked(false);
    clearFilters();
    closeDrawer();
  }

  return (
    <Drawer isOpen={isOpen} height="62%">
      <View style={styles.filterWrapper}>
        <View style={styles.filterHeader}>
          <Text style={styles.title}>Filtrar alertas</Text>
          <CrossIcon onPress={closeDrawer} />
        </View>

        <Select
          label="Período"
          placeholder="Selecione um período"
          editable
          selected={selectedRangeFilter}
          values={Object.entries(RangeFiltersLabels).map(([value, label]) => ({
            label,
            value,
          }))}
          onSelect={(value) => setSelectedRangeFilter(value as RangeFilters)}
        />

        <View style={styles.container}>
          <Text style={styles.label}>Criticidade</Text>

          <Checkbox
            label="Alerta"
            checked={alertChecked}
            onChange={setAlertChecked}
          />
          <Checkbox
            label="Grave"
            checked={severeChecked}
            onChange={setSevereChecked}
          />
          <Checkbox
            label="Perigo"
            checked={dangerChecked}
            onChange={setDangerChecked}
          />
        </View>

        <TouchableOpacity
          style={styles.clearFilterButton}
          onPress={handleClearFilters}
        >
          <Text style={styles.clearFilterButtonText}>Limpar filtro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleFilterSubmit}
        >
          <Text style={styles.applyButtonText}>Aplicar filtro</Text>
        </TouchableOpacity>
      </View>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  filterWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: THEME.colors.light,
    padding: 16,
    paddingBottom: 0,
    borderRadius: 10,
  },
  filterHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
    marginTop: 5,
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
    marginTop: 20,
    width: "100%",
  },
  clearFilterButtonText: {
    color: THEME.colors.primary,
    fontFamily: THEME.fonts.medium,
    fontSize: THEME.fontSize.larger,
  },
  container: {
    marginTop: 16,
  },
  label: {
    fontSize: THEME.fontSize.largest,
    fontFamily: THEME.fonts.semiBold,
    marginBottom: 6,
    color: THEME.colors.dark,
  },
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
