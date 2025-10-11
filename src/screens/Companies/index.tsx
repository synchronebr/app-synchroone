import React, { useCallback, useMemo, useState, useDeferredValue } from "react";
import { SectionList, ListRenderItemInfo, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import Header from "../../components/Pages/Header";
import { t } from "i18next";
import { Input } from "../../components/Input";
import {
  Container,
  Title,
  CompanyContent,
  CompanyImageWrapper,
  CompanyImage,
  VerticalDivider,
  CompanyText,
  ListSeparator,
  SectionSeparator,
  HeaderSpacing,
  ContentPadding,
} from "./styles";
import { useAccessLevels } from "../../hooks/useAccessLevels";
import { updateCurrentCompany } from "../../services/AccessLevels";
import { Company, UpdateCurrentCompanyRequest } from "../../services/AccessLevels/types";

const norm = (s: string) =>
  (s ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

const CompanyRow = React.memo(function CompanyRow({
  item,
  selected,
  onSelect,
  isLoading,
}: {
  item: Company;
  selected: boolean;
  onSelect: (id: string | number) => void;
  isLoading: boolean;
}) {
  return (
    <CompanyContent
      selected={selected}
      disabled={isLoading}
      onPress={() => onSelect(item.companyId)}
    >
      <CompanyImageWrapper>
        <CompanyImage
          resizeMode="cover"
          source={
            item.image
              ? { uri: item.image }
              : require("../../assets/images/app-icon.png")
          }
        />
      </CompanyImageWrapper>

      <VerticalDivider />

      <CompanyText numberOfLines={1}>{item.companyName}</CompanyText>

      {isLoading ? <ActivityIndicator style={{ marginLeft: 8 }} /> : null}
    </CompanyContent>
  );
}, (prev, next) => {
  return (
    prev.selected === next.selected &&
    prev.isLoading === next.isLoading &&
    String(prev.item.companyId) === String(next.item.companyId) &&
    prev.item.companyName === next.item.companyName &&
    prev.item.image === next.item.image
  );
});

const SectionHeader = React.memo(function SectionHeader({ title }: { title: string }) {
  return (
    <>
      <HeaderSpacing />
      <Title>{title}</Title>
    </>
  );
});

export function Companies() {
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | number | null>(null);
  const deferredSearch = useDeferredValue(search);

  const navigation = useNavigation();
  const THEME = useTheme();

  // Seu hook pode variar; mantenho compatibilidade com versões antigas
  const accessHook = useAccessLevels() as any;
  const getAccessLevelsData = accessHook?.getAccessLevelsData ?? (() => undefined);
  const refreshAccessLevels = accessHook?.refreshAccessLevels;
  const getAccessLevels = accessHook?.getAccessLevels;

  const accessLevels = getAccessLevelsData();
  const allRaw = (accessLevels?.companies ?? []) as Company[];

  // Pré-processa com haystack
  const all: Company[] = useMemo(
    () =>
      allRaw.map((c) => ({
        ...c,
        _haystack: norm(
          [
            c.companyName,
            String(c.companyId ?? ""),
          ]
            .filter(Boolean)
            .join(" ")
        ),
      })),
    [allRaw]
  );

  const tokens = useMemo(
    () => norm(deferredSearch).split(/\s+/).filter(Boolean),
    [deferredSearch]
  );

  const matches = useCallback(
    (c: Company) => (tokens.length === 0 ? true : tokens.every((tk) => c._haystack!.includes(tk))),
    [tokens]
  );

  const { dataP, dataO } = useMemo(() => {
    const p: Company[] = [];
    const o: Company[] = [];
    for (const c of all) {
      if (!matches(c)) continue;
      (c.companyType === "TP" ? p : o).push(c);
    }
    return { dataP: p, dataO: o };
  }, [all, matches]);

  const sections = useMemo(() => {
    const arr: Array<{ title: string; data: Company[] }> = [];
    if (dataP.length) arr.push({ title: t("index.type-P") ?? "Part Time", data: dataP });
    if (dataO.length) arr.push({ title: t("index.type-O") ?? "Operacional", data: dataO });
    return arr;
  }, [dataP, dataO]);

  const keyExtractor = useCallback((item: Company) => String(item.companyId), []);

  const handleSelectCompany = useCallback(
    async (id: string | number) => {
      if (loadingId) return; // evita duplo clique
      try {
        setLoadingId(id);

        const request: UpdateCurrentCompanyRequest = {
          preferences: [
            {
              code: "sideBar",
              field: "company",
              name: "Initial",
              content: id.toString(),
            },
          ],
        };

        const { status, data } = await updateCurrentCompany(request);

        if (status >= 200 && status < 300) {
          // tenta o "refresh" novo; senão, cai para o antigo
          if (typeof refreshAccessLevels === "function") {
            await refreshAccessLevels();
          } else if (typeof getAccessLevels === "function") {
            await getAccessLevels();
          }
          navigation.goBack?.();
        } else {
          console.log("Falha ao trocar empresa:", status, data);
        }
      } catch (err) {
        console.log("Erro ao trocar empresa:", err);
      } finally {
        setLoadingId(null);
      }
    },
    [loadingId, navigation, refreshAccessLevels, getAccessLevels]
  );

  const currentId = String(accessLevels?.currentCompany?.companyId ?? "");

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Company>) => {
      const selected = currentId === String(item.companyId);
      return (
        <CompanyRow
          item={item}
          selected={!!selected}
          onSelect={handleSelectCompany}
          isLoading={String(loadingId) === String(item.companyId)}
        />
      );
    },
    [currentId, handleSelectCompany, loadingId]
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string } }) => <SectionHeader title={section.title} />,
    []
  );

  return (
    <Container>
      <Header
        title={t("index.selectCompany") ?? "Selecionar empresa"}
        backIcon="back"
        backPress={() => navigation.goBack()}
      />

      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={
          <ContentPadding>
            <Input
              onChangeText={setSearch}
              placeholder={t("index.search") ?? "Pesquisar..."}
              value={search}
              editable
              style={{ width: "100%" }}
              // se o seu Input aceitar "returnKeyType" e "onSubmitEditing", pode adicionar
            />
          </ContentPadding>
        }
        ItemSeparatorComponent={ListSeparator}
        SectionSeparatorComponent={sections.length > 1 ? SectionSeparator : undefined}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 20 }}
        keyboardShouldPersistTaps="handled"
        // Tuning de virtualização
        initialNumToRender={12}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        removeClippedSubviews
      />
    </Container>
  );
}
