import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

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
  List,
} from "./styles";
import { AssetDetailsRouteProps } from "./types";
import { getEquipmentById, updateEquipmentFavoriteStatus } from "../../services/Equipments";
import { Toast } from "react-native-toast-notifications";
import { Loading } from "../../components/Loading";
import { IPiece } from "../../services/dtos/IPiece";
import { useFavoriteAsset } from "../../hooks/useFavoriteAsset";
import { AssetDetailHeaderIcon } from "../../components/AssetDetailsHeaderIcon";
import api from "../../services/api";

export function AssetDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [piece, setPiece] = useState<IPiece>(null);
  const [ isFavorite, setIsFavorite ] = useState(true);

  const THEME = useTheme();

  const params: AssetDetailsRouteProps = route.params as AssetDetailsRouteProps;

  async function loadScreen() {
    setIsLoading(true);

    try {
      const response = await getEquipmentById(Number(params.id));
      const data = response;
      setPiece(data);
      setIsFavorite(data.isFavorite);
    } catch (error) {
      Toast.show(
        "Houve um erro ao buscar o equipamento. Por favor, verifique sua conexão, ou tente novamente mais tarde.",
        { duration: 5000, type: "danger" }
      );
    } finally {
      setIsLoading(false);
    }
  }

  function toggleIsFavorite () {
    setIsFavorite(!isFavorite);
    updateEquipmentFavoriteStatus(piece.id, !isFavorite)
      .catch(_ => {})
  }

  useFocusEffect(
    useCallback(() => {
      loadScreen();
    }, [])
  );

  if (isLoading) return <Loading />;

  return (
    <Container>
        {piece && (
          <>
        <Header>
          <Image
            resizeMode="cover"
            source={{uri: piece?.image ? (piece.image) : ("https://synchroone.s3.amazonaws.com/blue-machine-sensor.png")}}
          />

          <Entypo
            color={THEME.colors.light}
            name="chevron-left"
            onPress={() => navigation.goBack()}
            size={32}
            style={{
              position: "absolute",
              left: 8,
              top: 16,
            }}
          />
          <View style={{
            position: "absolute",
            right: 8,
            top: 16,
          }}>
            <AssetDetailHeaderIcon
                isFavorite={isFavorite}
                toggleIsFavorite={toggleIsFavorite}
            />
          </View>

          <Asset>
            <Title>{piece?.description}</Title>
            <Subtitle>{piece?.machine.name}</Subtitle>
          </Asset>
        </Header>

        <Content>
          <Text>Detalhes do Ativo</Text>

          <AssetDetailsCard piece={piece} />

          <Text>Pontos de medição</Text>

          <List
            data={piece.measuringPoints}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MeasurementPointCard item={item} />}
            ListEmptyComponent={
              isLoading ?
              <Loading />
              :
              <Content>
                 <Text>Nenhum ponto de medição</Text>
              </Content>
            }
          />
        </Content>
          </>
        )}

    </Container>
  );
}
