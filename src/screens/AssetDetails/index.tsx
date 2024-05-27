import React from "react";

import { AssetDetailsCard } from "../../components/AssetDetailsCard";
import { MeasurementPointCard } from "../../components/MeasurementPointCard";

import {
  Container,
  Header,
  Image,
  Asset,
  Title,
  Subtitle,
  Content,
  Text,
  MeasurementPoints,
} from "./styles";

export function AssetDetails() {
  return (
    <Container>
      <Header>
        <Image
          resizeMode="cover"
          source={require("../../assets/images/asset-image.png")}
        />

        <Asset>
          <Title>Motor Bomba Calderaria 2</Title>
          <Subtitle>MEBC2</Subtitle>
        </Asset>
      </Header>

      <Content>
        <Text>Detalhes do Ativo</Text>

        <AssetDetailsCard />

        <Text>Pontos de medição</Text>

        <MeasurementPoints>
          <MeasurementPointCard />
          <MeasurementPointCard />
          <MeasurementPointCard />
          <MeasurementPointCard />
          <MeasurementPointCard />
        </MeasurementPoints>
      </Content>
    </Container>
  );
}
