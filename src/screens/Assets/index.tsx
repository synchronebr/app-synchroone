import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { ActivityIndicator, View, Text } from "react-native";

import TuneIcon from "../../assets/icons/tune.svg";

import { Input } from "../../components/Input";
import { AssetCard } from "../../components/AssetCard";

import { Container, Header, List, Content } from "./styles";
import { getEquipments } from "../../services/Equipments";
import { useTheme } from "styled-components";
import { Loading } from "../../components/Loading";

export function Assets() {
  const THEME = useTheme();
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [assets, setAssets] = useState([]);

  const getEquips = async () => {
    setIsLoading(true);
    const getEquipReq = await getEquipments();
    setAssets(getEquipReq.data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getEquips();
  }, [])

  return (
    <Container>
      <Header>
        <Input
          onChangeText={setSearchFieldValue}
          placeholder="Pesquisar ativo"
          searchable
          value={searchFieldValue}
        />

        <TuneIcon height={RFValue(18)} width={RFValue(18)} />
      </Header>

      {isLoading ? (
        <ActivityIndicator color={THEME.colors.light} />
      ) : (
        <>
        {assets.length > 0 ? (
          <List
            data={assets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <AssetCard item={item} />}
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
