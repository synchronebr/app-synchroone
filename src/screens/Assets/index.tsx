import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import TuneIcon from "../../assets/icons/tune.svg";
import CrossIcon from "../../assets/icons/cross.svg";
import THEME from "../../global/styles/theme";

import { Input } from "../../components/Input";
import { AssetCard } from "../../components/AssetCard";

import {
  Container,
  SearchContainer,
  List,
  Content,
  DropdownWrapper,
} from "./styles";
import { getEquipments } from "../../services/Equipments";
import { Loading } from "../../components/Loading";
import Drawer from "../../components/Drawer";
import Select from "../../components/Select";
import { useAccessLevels } from "../../hooks/useAccessLevels";
import { useFocusEffect } from "@react-navigation/native";
import { getPathsForSelect } from "../../services/Companies/Paths";
import Header from "../../components/Pages/Header";
import { QRCodeButton } from "../../components/QRCodeButton";

const DEBUG = false;

/** -----------------------------
 * Tipos e Estados Normalizados
 * ------------------------------*/
type NormAsset = {
  raw: any;          // asset original para render no Card
  id: string;        // id do asset (string)
  text: string;      // "code + description" em lowercase para busca
  pathIds: string[]; // ids de path (strings) detectados no asset
};

export function Assets() {
  const { getAccessLevelsData } = useAccessLevels();
  const { currentCompany } = getAccessLevelsData();
  const navigation = useNavigation();

  /** -----------------------------
   * Estados base
   * ------------------------------*/
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);     // load inicial / refresh
  const [isFiltering, setIsFiltering] = useState(false); // aplicar filtro
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [assets, setAssets] = useState<any[]>([]);       // mantém se for útil em outros lugares
  const [normAssets, setNormAssets] = useState<NormAsset[]>([]);
  const [pathIndex, setPathIndex] = useState<Record<string, number[]>>({}); // pid -> [índices em normAssets]
  const [refreshing, setRefreshing] = useState(false);

  /** -----------------------------
   * Filtro por paths
   * ------------------------------*/
  const [appliedPaths, setAppliedPaths] = useState<string[]>([]);      // cadeia aplicada (nível 1..n)
  const [appliedTarget, setAppliedTarget] = useState<Set<string>>(new Set()); // conjunto alvo (selecionados + descendentes)
  const [descCache, setDescCache] = useState<Record<string, string[]>>({});    // cache de descendentes

  /** -----------------------------
   * Drawer (seleção temporária)
   * ------------------------------*/
  const [pathLevels, setPathLevels] = useState<any[][]>([]);   // opções por nível
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);

  /** -----------------------------
   * Debounce da busca
   * ------------------------------*/
  useEffect(() => {
    const t = setTimeout(() => setDebouncedTerm(searchFieldValue.trim().toLowerCase()), 120);
    return () => clearTimeout(t);
  }, [searchFieldValue]);

  /** -----------------------------
   * Carregamento inicial
   * ------------------------------*/
  useFocusEffect(
    useCallback(() => {
      loadTopLevel();
      loadAssets();
    }, [currentCompany?.companyId])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAssets();
    setRefreshing(false);
  };

  async function loadTopLevel() {
    const items = await getPathsForSelect(currentCompany?.companyId);
    setPathLevels([items ?? []]);
    if (DEBUG) console.log("TOP LEVEL OPTIONS:", items?.slice?.(0, 3));
  }

  /** -----------------------------
   * Extração de pathIds (robusta; usada só no load)
   * ------------------------------*/
  function extractAllPathIds(asset: any): string[] {
    const out = new Set<string>();
    const toStr = (v: any) => String(v);

    const tryPush = (v: any) => {
      if (v === undefined || v === null || v === "") return;
      out.add(toStr(v));
    };

    const readNode = (node: any) => {
      if (!node || typeof node !== "object") return;

      // campos comuns
      tryPush(node?.id);
      tryPush(node?.value);
      tryPush(node?.pathId ?? node?.path_id);
      tryPush(node?.nodeId ?? node?.node_id);

      // arrays comuns
      const arrays = [
        node.paths,
        node.pathIds,
        node.path_ids,
        node.ancestors,
        node.parents,
        node.children,
      ].filter(Boolean);

      for (const arr of arrays) {
        if (Array.isArray(arr)) {
          for (const el of arr) {
            if (typeof el === "object") {
              readNode(el);
            } else {
              tryPush(el);
            }
          }
        }
      }

      // varrer recursivamente o resto (measuringPoint, piece, etc.)
      for (const k of Object.keys(node)) {
        const v = (node as any)[k];
        if (!v) continue;
        if (Array.isArray(v)) {
          for (const el of v) if (typeof el === "object") readNode(el);
        } else if (typeof v === "object") {
          readNode(v);
        }
      }
    };

    readNode(asset);
    return Array.from(out);
  }

  /** -----------------------------
   * Load de assets + normalização + índice invertido
   * ------------------------------*/
  async function loadAssets() {
    try {
      setIsLoading(true);
      const res = await getEquipments({ companyId: currentCompany.companyId });
      const list = res?.data?.data ?? [];
      setAssets(list);

      const nextNorm: NormAsset[] = [];
      const nextIndex: Record<string, number[]> = {};

      for (let i = 0; i < list.length; i++) {
        const a = list[i];
        const id = String(a?.id ?? i);
        const text = `${a?.code ?? ""} ${a?.description ?? ""}`.toLowerCase();
        const pathIds = extractAllPathIds(a).map(String);

        nextNorm.push({ raw: a, id, text, pathIds });

        // índice invertido (evita duplicata do mesmo path no mesmo asset)
        const unique = new Set(pathIds);
        unique.forEach((pid) => {
          if (!nextIndex[pid]) nextIndex[pid] = [];
          nextIndex[pid].push(i); // índice do nextNorm
        });
      }

      setNormAssets(nextNorm);
      setPathIndex(nextIndex);

      if (DEBUG) {
        console.log("norm sample:", nextNorm[0]);
        const anyKey = Object.keys(nextIndex)[0];
        console.log("index sample:", anyKey, "->", nextIndex[anyKey]?.slice(0, 10));
      }
    } catch (e) {
      if (DEBUG) console.log("Erro getEquipments", e);
      setAssets([]);
      setNormAssets([]);
      setPathIndex({});
    } finally {
      setIsLoading(false);
    }
  }

  /** -----------------------------
   * Descendentes com cache
   * ------------------------------*/
  async function getAllDescendants(companyId: number, rootId: string): Promise<string[]> {
    if (descCache[rootId]) return descCache[rootId];

    const acc: string[] = [];
    const seen = new Set<string>();

    async function dfs(id: string) {
      if (seen.has(id)) return;
      seen.add(id);

      const children = await getPathsForSelect(companyId, Number(id));
      if (!children?.length) return;

      for (const ch of children) {
        const cid = String(ch?.value ?? ch?.id);
        acc.push(cid);
        await dfs(cid);
      }
    }

    await dfs(rootId);
    setDescCache((prev) => ({ ...prev, [rootId]: acc }));
    if (DEBUG) console.log("DESC CACHE BUILT for", rootId, "size:", acc.length);
    return acc;
  }

  async function prewarmDescendantsIfNeeded(rootId: string) {
    const id = String(rootId);
    if (!descCache[id]) {
      try {
        await getAllDescendants(currentCompany.companyId, id);
      } catch {}
    }
  }

  async function hydrateLevelsFor(applied: string[]) {
    // garante nível 0
    if (!pathLevels[0]?.length) {
      const top = await getPathsForSelect(currentCompany?.companyId);
      setPathLevels([top ?? []]);
    }

    // carrega sequencialmente as opções dos níveis seguintes
    let levels = pathLevels.length ? [...pathLevels] : [pathLevels[0] ?? []];

    for (let i = 0; i < applied.length; i++) {
      const id = applied[i];
      if (!levels[i + 1]) {
        const children = await getPathsForSelect(currentCompany?.companyId, Number(id));
        levels[i + 1] = children ?? [];
      }
      if (i === applied.length - 1) prewarmDescendantsIfNeeded(id);
    }

    setPathLevels(levels);
  }

  /** -----------------------------
   * Drawer handlers
   * ------------------------------*/
  function openFilter() {
    setSelectedPaths(appliedPaths);
    hydrateLevelsFor(appliedPaths);
    setIsFiltersOpen(true);
  }

  function closeFilter() {
    setIsFiltersOpen(false);
  }

  function clearFilters() {
    setSelectedPaths([]);
    setAppliedPaths([]);
    setAppliedTarget(new Set());
    closeFilter();
  }

  const handleChangePathLevel = async (levelIndex: number, value: any) => {
    if (!value && value !== 0) return;
    if (selectedPaths[levelIndex] === value) return;

    const newSelected = [...selectedPaths];
    newSelected[levelIndex] = String(value);
    newSelected.splice(levelIndex + 1);
    setSelectedPaths(newSelected);

    const newLevels = [...pathLevels];
    newLevels.splice(levelIndex + 1);
    setPathLevels(newLevels);

    // carrega próximo nível
    const items = await getPathsForSelect(currentCompany?.companyId, Number(value));
    if (items?.length) {
      setPathLevels((prev) => {
        const updated = [...prev];
        updated[levelIndex + 1] = items;
        return updated;
      });
    }

    // pré-aquecer descendentes do nó selecionado (melhora "Aplicar")
    prewarmDescendantsIfNeeded(String(value));
  };

  async function handleFilterSubmit() {
    const cleaned = selectedPaths.filter((v) => v != null && v !== "").map(String);

    if (cleaned.length === 0) {
      setAppliedPaths([]);
      setAppliedTarget(new Set());
      closeFilter();
      return;
    }

    setIsFiltering(true);

    const deepest = cleaned[cleaned.length - 1];

    // usa descendentes do cache (instantâneo)
    const cachedDesc = descCache[deepest] ?? [];
    const target = new Set<string>([...cleaned, ...cachedDesc]);

    setAppliedPaths(cleaned);
    setAppliedTarget(target);
    closeFilter();

    // completa cache em background e amplia alvo
    try {
      if (!descCache[deepest]) {
        const desc = await getAllDescendants(currentCompany.companyId, deepest);
        if (desc?.length) {
          setAppliedTarget((prev) => new Set([...Array.from(prev), ...desc]));
        }
      }
    } finally {
      setIsFiltering(false);
    }
  }

  /** -----------------------------
   * Filtro turbo (índice invertido)
   * ------------------------------*/
  const filteredAssets = useMemo(() => {
    const term = debouncedTerm;
    const hasText = term.length > 0;

    // sem path aplicado → só texto
    if (appliedTarget.size === 0) {
      if (!hasText) return normAssets.map((n) => n.raw);
      return normAssets.filter((n) => n.text.includes(term)).map((n) => n.raw);
    }

    // com path aplicado → união de candidatos pelo índice
    const candidateIndexSet = new Set<number>();
    appliedTarget.forEach((pid) => {
      const arr = pathIndex[pid];
      if (arr && arr.length) {
        for (let i = 0; i < arr.length; i++) candidateIndexSet.add(arr[i]);
      }
    });

    if (candidateIndexSet.size === 0) return [];

    const candidates = Array.from(candidateIndexSet).map((idx) => normAssets[idx]);

    const afterText = hasText
      ? candidates.filter((n) => n.text.includes(term))
      : candidates;

    return afterText.map((n) => n.raw);
  }, [normAssets, pathIndex, appliedTarget, debouncedTerm]);

  /** -----------------------------
   * Render
   * ------------------------------*/
  return (
    <Container>
      <Header
        title="Ativos Monitorados"
        rightContent={
          <>
            <QRCodeButton />
            <TuneIcon width={24} height={24} fill={THEME.colors.dark} onPress={openFilter} />
          </>
        }
      />

      <SearchContainer>
        <Input
          onChangeText={setSearchFieldValue}
          placeholder="Pesquisar ativo"
          searchable
          value={searchFieldValue}
          editable={!isLoading && !isFiltering}
          style={{ width: "100%" }}
        />

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
              <Text style={styles.title}>Filtrar ativos</Text>
              <CrossIcon onPress={closeFilter} />
            </View>

            <View style={styles.filterContent}>
              {pathLevels?.map((path, i) => (
                <DropdownWrapper key={i}>
                  <Select
                    editable
                    values={path}
                    selected={selectedPaths[i]}
                    onSelect={(value) => handleChangePathLevel(i, value)}
                    label={`Nível ${i + 1}`}
                    placeholder="Selecione um nível"
                  />
                </DropdownWrapper>
              ))}
            </View>

            <View>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleFilterSubmit}
                disabled={isFiltering}
              >
                <Text style={styles.applyButtonText}>
                  {isFiltering ? "Aplicando..." : "Aplicar filtro"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearFilterButton}
                onPress={clearFilters}
                disabled={isFiltering}
              >
                <Text style={styles.clearFilterButtonText}>Limpar filtro</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Drawer>
      </SearchContainer>

      {(isLoading || isFiltering) ? (
        <>
          <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
          <ActivityIndicator color={THEME.colors.primary} />
        </>
      ) : (
        <>
          {filteredAssets.length > 0 ? (
            <List
              data={filteredAssets}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <AssetCard item={item} key={`asset-${item.id}`} />
              )}
              refreshControl={
                <RefreshControl
                  progressBackgroundColor={THEME.colors.primary}
                  colors={["#FFF", "#FFF"]}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          ) : (
            <Content>
              <Text>Você ainda não cadastrou um ativo...</Text>
            </Content>
          )}
        </>
      )}

    </Container>
  );
}

/** -----------------------------
 * Styles
 * ------------------------------*/
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
  filterContent: {},
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
