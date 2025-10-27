// src/screens/AlertsHistory/index.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import { subDays } from "date-fns";
import { t } from "i18next";
import { useTheme } from "styled-components/native";

import Header from "../../components/Pages/Header";
import Drawer from "../../components/Drawer";
import Select from "../../components/Select";
import Checkboxes from "../../components/Checkboxes";
import { HistoryCard } from "../../components/HistoryCard";
import { Loading } from "../../components/Loading";

import TuneIcon from "../../assets/icons/tune.svg";
import CrossIcon from "../../assets/icons/cross.svg";

import THEME_CONST from "../../global/styles/theme";
import api from "../../services/api";
import { IDiagnose } from "../../services/dtos/IDiagnose";
import { useAccessLevels } from "../../hooks/useAccessLevels";

import { Container, List, Content, Text, Subtitle, SubtitleContent } from "./styles";
import { DropdownWrapper } from "../ConfigureParameters/styles";

type IAlertsHistoryProps = {
  setReadingsCount: (value: number) => void;
};

type Filters = {
  startDate: Date;
  endDate: Date;
  status: string[];
  lastDays: 60 | 90 | 120;
};

const PAGE_SIZE = 10;

export function AlertsHistory({ setReadingsCount }: IAlertsHistoryProps) {
  const THEME = useTheme();
  const { getAccessLevelsData } = useAccessLevels();
  const { currentCompany } = getAccessLevelsData();

  // -------- Drawer / UI
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // -------- Filtros: CONFIRMADO (API) + RASCUNHO (UI)
  const [committedFilters, setCommittedFilters] = useState<Filters>(() => {
    const now = new Date();
    return { startDate: subDays(now, 90), endDate: now, status: ["W", "D"], lastDays: 90 };
  });
  const [draftFilters, setDraftFilters] = useState<Filters>(committedFilters);

  // -------- Lista / paginação (manual)
  const [items, setItems] = useState<IDiagnose[]>([]);
  const [page, setPage] = useState(0); // 0-based (seu backend espera page-1)
  const [hasNextPage, setHasNextPage] = useState(true);

  const [isLoading, setIsLoading] = useState(true);          // primeiro load
  const [isRefreshing, setIsRefreshing] = useState(false);   // pull-to-refresh
  const [isFetchingMore, setIsFetchingMore] = useState(false); // onEndReached

  // Erro do último fetch (para bloquear loops e exibir retry)
  const [fetchError, setFetchError] = useState<null | { status?: number; message?: string; pageTried: number }>(null);

  // Para ignorar respostas “atrasadas”
  const requestSeq = useRef(0);

  // Helpers de filtro
  const startISO = useMemo(() => committedFilters.startDate.toISOString(), [committedFilters.startDate]);
  const endISO = useMemo(() => committedFilters.endDate.toISOString(), [committedFilters.endDate]);
  const statusArr = useMemo(() => committedFilters.status.slice().sort(), [committedFilters.status]);

  function openFilter() {
    setDraftFilters(committedFilters);
    setIsFiltersOpen(true);
  }
  function closeFilter() {
    setIsFiltersOpen(false);
  }

  function applyDraft() {
    const now = new Date();
    const next: Filters = {
      ...draftFilters,
      startDate: subDays(now, draftFilters.lastDays),
      endDate: now,
    };
    setCommittedFilters(next);
    // reset de paginação e lista
    setItems([]);
    setPage(0);
    setHasNextPage(true);
    setFetchError(null);
  }

  async function handleFilterSubmit() {
    setIsApplying(true);
    applyDraft();
    setIsApplying(false);
    closeFilter();
  }

  // ========= Fetch (manual) =========

  async function fetchPage(targetPage: number, mode: "initial" | "refresh" | "more") {
    // Evita chamadas redundantes
    if (mode === "more" && (!hasNextPage || isFetchingMore)) return;

    // Limpamos o erro ao iniciar nova tentativa
    setFetchError(null);

    if (mode === "initial") setIsLoading(true);
    if (mode === "refresh") setIsRefreshing(true);
    if (mode === "more") setIsFetchingMore(true);

    const mySeq = ++requestSeq.current;

    try {
      const search = new URLSearchParams();
      search.append("companyId", String(currentCompany!.companyId));
      search.append("page", String(targetPage)); // seu backend usa page-1; como começamos em 0, ok
      search.append("pageSize", String(PAGE_SIZE));
      search.append("startDate", startISO);
      search.append("endDate", endISO);
      statusArr.forEach((s) => search.append("securityStatusIn", s));

      const qs = search.toString();
      console.log("QUERY_STRING =>", qs);

      const response = await api.get(`/diagnoses?${qs}`);

      // Se enquanto isso houve outro fetch, ignora este (race)
      if (mySeq !== requestSeq.current) return;

      const result = response.data.data as {
        data: IDiagnose[];
        total: number;
        totalRead: number;
        totalUnread: number;
      };

      const newItems = result.data ?? [];
      const total = result.total ?? 0;

      if (targetPage === 0) {
        setItems(newItems);
        setReadingsCount(result.totalUnread ?? 0);
      } else {
        setItems((prev) => [...prev, ...newItems]);
      }

      const totalPages = Math.ceil(total / PAGE_SIZE);
      setHasNextPage(targetPage + 1 < totalPages);
      setPage(targetPage);
    } catch (err: any) {
      // Guarda info do erro e BLOQUEIA a paginação para não loopar
      const status = err?.response?.status;
      const message = err?.message ?? "Request failed";
      setFetchError({ status, message, pageTried: targetPage });

      // Se erro veio do onEndReached, bloqueia próxima página até clique no retry
      if (mode === "more") {
        setHasNextPage(false);
      }
    } finally {
      if (mySeq === requestSeq.current) {
        setIsLoading(false);
        setIsRefreshing(false);
        setIsFetchingMore(false);
      }
    }
  }

  // 1) Primeiro load + sempre que filtros confirmados mudarem
  useEffect(() => {
    if (!currentCompany?.companyId) return;
    fetchPage(0, "initial");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startISO, endISO, statusArr.join("|"), currentCompany?.companyId]);

  // Pull-to-refresh
  function onRefresh() {
    fetchPage(0, "refresh");
  }

  // Infinite scroll
  function onEndReached() {
    if (isFetchingMore || !hasNextPage) return;
    fetchPage(page + 1, "more");
  }

  // Retry controlado (aparece no rodapé quando há erro)
  function retryLast() {
    if (!fetchError) return;
    // Reabilita paginação e tenta novamente a mesma página
    setHasNextPage(true);
    fetchPage(fetchError.pageTried, fetchError.pageTried === 0 ? "initial" : "more");
  }

  const allItems = items.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)));

  return (
    <Container>
      <Header
        title={t("index.monitoredAssets")}
        rightContent={<TuneIcon width={24} height={24} fill={THEME.colors.dark} onPress={openFilter} />}
      />

      <SubtitleContent>
        <Subtitle>{t("index.lastValueDay", { value: committedFilters.lastDays })}</Subtitle>
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
            <Text style={styles.title}>{t("index.diagnoseFilter")}</Text>
            <CrossIcon onPress={closeFilter} />
          </View>

          <View style={styles.filterContent}>
            <DropdownWrapper>
              <Select
                editable
                values={[
                  { label: t("index.lastValueDay", { value: 120 }), value: "120" },
                  { label: t("index.lastValueDay", { value: 90 }), value: "90" },
                  { label: t("index.lastValueDay", { value: 60 }), value: "60" },
                ]}
                selected={String(draftFilters.lastDays)} // rascunho — não busca
                onSelect={(v) =>
                  setDraftFilters((f) => ({ ...f, lastDays: Number(v) as 60 | 90 | 120 }))
                }
                label={t("index.period")}
                placeholder={t('index.selectLevel')}
              />
            </DropdownWrapper>

            <Checkboxes
              title="Status"
              options={[
                { label: t("index.securityStatus-W"), value: "W" },
                { label: t("index.securityStatus-D"), value: "D" },
              ]}
              value={draftFilters.status} // rascunho — não busca
              onChange={(vals) => setDraftFilters((f) => ({ ...f, status: vals }))}
            />
          </View>

          <View>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleFilterSubmit}
              disabled={isApplying}
            >
              <Text style={styles.applyButtonText}>
                {isApplying ? t("index.applying") : t("index.applyFilter")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Drawer>

      <Content>
        {isLoading ? (
          <View style={styles.loading}>
            <Loading color={THEME.colors.primary} />
          </View>
        ) : (
          <List
            data={allItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HistoryCard item={item} />}
            ListEmptyComponent={
              isRefreshing ? (
                <Loading bgColor="transparent" color={THEME.colors.primary} />
              ) : (
                <Content>
                  <Text style={{ textAlign: "center" }}>{t("index.noDiagnosis")}</Text>
                </Content>
              )
            }
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                progressBackgroundColor={THEME.colors.primary}
                colors={["#FFF"]}
                refreshing={isRefreshing}
                onRefresh={onRefresh}
              />
            }
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingMore ? <Loading bgColor="transparent" color={THEME.colors.primary}  /> : null}
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
    backgroundColor: THEME_CONST.colors.light,
    padding: 16,
    borderRadius: 4,
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
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontFamily: THEME_CONST.fonts.semiBold,
    fontSize: THEME_CONST.fontSize.largest,
    textAlign: "center",
  },
  applyButton: {
    backgroundColor: THEME_CONST.colors.secondary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  applyButtonText: {
    color: THEME_CONST.colors.light,
    fontFamily: THEME_CONST.fonts.medium,
    fontSize: THEME_CONST.fontSize.larger,
  },
  loading: {
    marginTop: 20,
  },
});
