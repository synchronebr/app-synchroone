import React, { useState, useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import TuneIcon from "../../assets/icons/tune.svg";
import CrossIcon from "../../assets/icons/cross.svg";
import THEME from "../../global/styles/theme";

import { Input } from "../../components/Input";
import { AssetCard } from "../../components/AssetCard";

import { Container, Header, List, Content, Filter } from "./styles";
import { getEquipments } from "../../services/Equipments";
import { Loading } from "../../components/Loading";
import Drawer from "../../components/Drawer";
import Select from "../../components/Select";
import { useAccessLevels } from "../../hooks/useAccessLevels";
import { useFocusEffect } from "@react-navigation/native";
import { getSectorsForSelect } from "../../services/Companies/Areas/Sectors";
import { getMachinesForSelect } from "../../services/Companies/Areas/Sectors/Machines";
import { getAreasForSelect } from "../../services/Companies/Areas";

export function Assets() {
  const { getAccessLevelsData } = useAccessLevels();
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [dataFilters, setDataFilters] = useState({
    companyId: 0,
    areaId: 0,
    sectorId: 0,
    machineId: 0,
    pieceId: 0,
    measuringPointId: 0,
  });
  const [areas, setAreas] = useState([]);
  const [machines, setMachines] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [responsibles, setResponsibles] = useState([]);

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedResponsible, setSelectedResponsible] = useState(null);

  const accessLevels = getAccessLevelsData();
  const { currentCompany } = accessLevels;

  // filters as params here because the way React updates states
  // is asynchronous, so we need to pass the filters as params,
  // otherwise the filters will be outdated (old state values were being used)
  const getEquips = async (filters) => {
    setIsLoading(true);
    console.log("filters", filters);

    const getEquipResponse = await getEquipments({
      companyId: accessLevels.currentCompany.companyId,
      ...filters,
    });
    const assets = getEquipResponse.data.data;

    setAssets(assets);
    setIsLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);

    getEquips({});
    setRefreshing(false);
  };

  function openFilter() {
    // if (isLoading) return;
    setIsFiltersOpen(true);
  }

  function closeFilter() {
    setIsFiltersOpen(false);
  }

  function clearFilters() {
    const clearedFilters = {
      areaId: null,
      machineId: null,
      sectorId: null,
      unitId: null,
      responsibleId: null,
      search: searchFieldValue,
    };

    setSelectedArea(null);
    setSelectedMachine(null);
    setSelectedSector(null);
    setSelectedUnit(null);
    setSelectedResponsible(null);

    closeFilter();
    getEquips(clearedFilters); // Pass cleared filters
  }

  function handleFilterSubmit() {
    const appliedFilters = {
      areaId: selectedArea,
      machineId: selectedMachine,
      sectorId: selectedSector,
      unitId: selectedUnit,
      responsibleId: selectedResponsible,
      search: searchFieldValue,
    };

    closeFilter();
    getEquips(appliedFilters); // Pass applied filters
  }

  const getAreas = async () => {
    const companyId = accessLevels.currentCompany.companyId;
    const items = await getAreasForSelect(Number(companyId));
    setAreas(items);
    setDataFilters((old) => ({ ...old, companyId: companyId }));
  };

  useEffect(() => {
    getAreas();
  }, []);

  const handleChangeAreas = useCallback(
    async (value: any) => {
      if (selectedArea === value) return; // Evita loop infinito se o valor já for o mesmo

      const id = Number(value);
      setSelectedArea(value); // Atualiza o estado primeiro

      try {
        const items = await getSectorsForSelect(dataFilters.companyId, id);
        setSectors(items);
        setDataFilters((old) => ({ ...old, areaId: id }));
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
      }
    },
    [selectedArea, dataFilters.companyId]
  );

  const handleChangeSector = useCallback(
    async (value: any) => {
      if (selectedSector === value) return; // Evita loop infinito se o valor já for o mesmo

      const id = Number(value);
      setSelectedSector(value);

      try {
        const items = await getMachinesForSelect(
          dataFilters.companyId,
          dataFilters.areaId,
          id
        );
        setMachines(items);
        setDataFilters((old) => ({ ...old, sectorId: id }));
      } catch (error) {
        console.error("Erro ao buscar maquinas:", error);
      }
    },
    [selectedSector, dataFilters.areaId]
  );

  const handleChangeMachine = async (value: any) => {
    setDataFilters((old) => ({ ...old, machineId: value }));
    setSelectedMachine(value);
  };

  useFocusEffect(
    useCallback(() => {
      getEquips({});
    }, [currentCompany])
  );

  return (
    <Container>
      <Header>
        <Input
          onChangeText={setSearchFieldValue}
          placeholder="Pesquisar ativo"
          searchable
          value={searchFieldValue}
          editable={!isLoading}
        />

        <Filter>
          <TuneIcon height={18} width={18} onPress={openFilter} />
        </Filter>

        <Drawer isOpen={isFiltersOpen} height="55%">
          <View style={styles.filterWrapper}>
            <View style={styles.filterHeader}>
              <Text style={styles.title}>Filtrar ativos</Text>
              <CrossIcon onPress={closeFilter} />
            </View>
            <View style={styles.filterContent}>
              <Select
                editable
                label="Área"
                placeholder="Selecione a área"
                selected={selectedArea}
                values={areas}
                onSelect={handleChangeAreas}
              />

              <Select
                editable
                label="Setor"
                placeholder="Selecione o setor"
                selected={selectedSector}
                values={sectors}
                onSelect={handleChangeSector}
              />

              <Select
                editable
                label="Máquina"
                placeholder="Selecione a máquina"
                selected={selectedMachine}
                values={machines}
                onSelect={handleChangeMachine}
              />

              {/* <Select
                editable
                label="Responsável"
                placeholder="Selecione o responsável"
                selected={selectedResponsible}
                values={responsibles.map((r) => ({
                  label: r.name,
                  value: r.id,
                }))}
                onSelect={(value) => handleValueChange("responsibles", value)}
              /> */}
            </View>
            <View>
              <TouchableOpacity
                style={styles.clearFilterButton}
                onPress={clearFilters}
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
          </View>
        </Drawer>
      </Header>

      {isLoading ? (
        <>
          <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
          <ActivityIndicator color={THEME.colors.light} />
        </>
      ) : (
        <>
          {assets.length > 0 ? (
            <List
              data={assets}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <AssetCard item={item} key={`asset-${item.id.toString()}`} />
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
});
