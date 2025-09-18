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
import QRCodeScannerIcon from "../../assets/icons/qr-code-scanner.svg";
import CrossIcon from "../../assets/icons/cross.svg";
import THEME from "../../global/styles/theme";

import { Input } from "../../components/Input";
import { AssetCard } from "../../components/AssetCard";

import { Container, SearchContainer, List, Content, Filter, DropdownWrapper } from "./styles";
import { getEquipments } from "../../services/Equipments";
import { Loading } from "../../components/Loading";
import Drawer from "../../components/Drawer";
import Select from "../../components/Select";
import { useAccessLevels } from "../../hooks/useAccessLevels";
import { useFocusEffect } from "@react-navigation/native";
import { getPathsForSelect } from "../../services/Companies/Paths";
import Header from "../../components/Pages/Header";
// import { getSectorsForSelect } from "../../services/Companies/Areas/Sectors";
// import { getMachinesForSelect } from "../../services/Companies/Areas/Sectors/Machines";
// import { getAreasForSelect } from "../../services/Companies/Areas";

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

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedResponsible, setSelectedResponsible] = useState(null);

  const [pathLevels, setPathLevels] = useState<any[][]>([]);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [pathFinished, setPathFinished] = useState(false);

  const accessLevels = getAccessLevelsData();
  const { currentCompany } = accessLevels;

  const getFirstFilters = async () => {
    const items = await getPathsForSelect(currentCompany?.companyId);
    setPathLevels([items]); 
  }
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
    closeFilter();
    console.log('selectedPaths', selectedPaths)
    console.log('assets', assets)
    // setAssets
  }

  const handleChangePathLevel = async (levelIndex: number, value: any) => {
    if (!value || value == '') return;
    if (selectedPaths[levelIndex] === value) return;
  
    const newSelectedPaths = [...selectedPaths];
    newSelectedPaths[levelIndex] = value;
    newSelectedPaths.splice(levelIndex + 1);
    setSelectedPaths(newSelectedPaths); 
  
    const newPathLevels = [...pathLevels];
    newPathLevels.splice(levelIndex + 1); 
    setPathLevels(newPathLevels);       
  
    const items = await getPathsForSelect(currentCompany?.companyId, Number(value));

    if (!items || items.length === 0) {
      console.log('buscar pieces...')
      setPathFinished(true);
      return;
    }
  
    setPathLevels((prev) => {
      const updated = [...prev];
      updated[levelIndex + 1] = items;
      return updated;
    });

    setPathFinished(false);
  };
  useFocusEffect(
    useCallback(() => {
      getEquips({});
      getFirstFilters();
    }, [currentCompany])
  );

  return (
    <Container>
      <Header 
        title="Ativos Monitorados" 
        backIcon="back" 
        rightContent={
          <>
            <QRCodeScannerIcon width={24} height={24} fill={THEME.colors.dark} />
            <TuneIcon width={24} height={24} fill={THEME.colors.dark} onPress={openFilter}/>
          </>
        }
      />

      <SearchContainer>
        <Input
          onChangeText={setSearchFieldValue}
          placeholder="Pesquisar ativo"
          searchable
          value={searchFieldValue}
          editable={!isLoading}
          style={{ width: '100%' }}
        />

        <Drawer isOpen={isFiltersOpen} height="55%">
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
      </SearchContainer>

      {isLoading ? (
        <>
          <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
          <ActivityIndicator color={THEME.colors.light} />
        </>
      ) : (
        <>
          {assets.length > 0 ? (
            <List
              data={assets.filter((asset) =>
                asset?.description
                  ?.toLowerCase()
                  ?.includes(searchFieldValue.toLowerCase())
              )}
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
