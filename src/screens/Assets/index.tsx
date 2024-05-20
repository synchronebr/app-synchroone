import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import TuneIcon from "../../assets/icons/tune.svg";

import { Input } from "../../components/Input";
import { AssetCard } from "../../components/AssetCard";

import { Container, Header, List } from "./styles";

export function Assets() {
  const [searchFieldValue, setSearchFieldValue] = useState("");

  const assets = [1, 2, 3, 4, 5, 6];
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

      <List
        data={assets}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <AssetCard />}
      />
    </Container>
  );
}
