import React, { useEffect, useState, useCallback } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import TuneIcon from "../../assets/icons/tune.svg";
import CrossIcon from "../../assets/icons/cross.svg";
import THEME from "../../global/styles/theme";

import { Input } from "../../components/Input";
import { AssetCard } from "../../components/AssetCard";

import { Container, Header, List, Content } from "./styles";
import { getEquipments } from "../../services/Equipments";
import { useTheme, withTheme } from "styled-components";
import { Loading } from "../../components/Loading";
import Drawer from "../../components/Drawer";
import Select from "../../components/Select";

export function Assets() {
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [assets, setAssets] = useState([]);

  const [areas, setAreas] = useState([]);
  const [machines, setMachines] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [units, setUnits] = useState([]);
  const [responsibles, setResponsibles] = useState([]);

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedResponsible, setSelectedResponsible] = useState(null);

  // filters as params here because the way React updates states
  // is asynchronous, so we need to pass the filters as params,
  // otherwise the filters will be outdated (old state values were being used)
  const getEquips = useCallback(async (filters) => {
    setIsLoading(true);

    const getEquipResponse = await getEquipments(filters);
    const { filters: responseFilters, items: assets } = getEquipResponse.data.data;

    setAssets(assets);
    setAreas(responseFilters.areas);
    setMachines(responseFilters.machines);
    setSectors(responseFilters.sectors);
    setUnits(responseFilters.units);
    setResponsibles(responseFilters.responsibles);

    setIsLoading(false);
  }, []);

  function openFilter() {
    if (isLoading) return;
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

  const setters = {
    'areas': setSelectedArea,
    'machines': setSelectedMachine,
    'sectors': setSelectedSector,
    'units': setSelectedUnit,
    'responsibles': setSelectedResponsible,
  };

  function handleValueChange(key: string, value: any) {
    setters[key](value);
  }

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

        <TuneIcon height={RFValue(18)} width={RFValue(18)} onPress={openFilter} />

        <Drawer isOpen={isFiltersOpen} height="85%">
          <View style={styles.filterWrapper}>
            <View style={styles.filterHeader}>
              <Text style={styles.title}>Filtrar ativos</Text>
              <CrossIcon onPress={closeFilter} />
            </View>
            <View>
              <Select
                label="Unidade"
                placeholder="Selecione a unidade"
                selected={selectedUnit}
                values={units.map(u => ({ label: u.name, value: u.id }))}
                onSelect={(value) => handleValueChange('units', value)}
              />

              <Select
                label="Área"
                placeholder="Selecione a área"
                selected={selectedArea}
                values={areas.map(a => ({ label: a.name, value: a.id }))}
                onSelect={(value) => handleValueChange('areas', value)}
              />

              <Select
                label="Setor"
                placeholder="Selecione o setor"
                selected={selectedSector}
                values={sectors.map(s => ({ label: s.name, value: s.id }))}
                onSelect={(value) => handleValueChange('sectors', value)}
              />

              <Select
                label="Máquina"
                placeholder="Selecione a máquina"
                selected={selectedMachine}
                values={machines.map(m => ({ label: m.name, value: m.id }))}
                onSelect={(value) => handleValueChange('machines', value)}
              />

              <Select
                label="Responsável"
                placeholder="Selecione o responsável"
                selected={selectedResponsible}
                values={responsibles.map(r => ({ label: r.name, value: r.id }))}
                onSelect={(value) => handleValueChange('responsibles', value)}
              />

              <TouchableOpacity style={styles.clearFilterButton} onPress={clearFilters}>
                <Text style={styles.clearFilterButtonText}>Limpar filtro</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.applyButton} onPress={handleFilterSubmit}>
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
              renderItem={({ item }) => <AssetCard item={item} key={`asset-${item.id.toString()}`} />}
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
    width: "100%",
    height: "100%",
    backgroundColor: THEME.colors.light,
    padding: 16,
    paddingBottom: 0,
    borderRadius: 10,
  },
  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: THEME.fontSize.larger
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
    fontSize: THEME.fontSize.larger
  },
})
