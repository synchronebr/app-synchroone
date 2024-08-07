import React, { useCallback, useState } from "react";
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
import { getEquipmentById } from "../../services/Equipments";
import { Toast } from "react-native-toast-notifications";
import { Loading } from "../../components/Loading";
import { IPiece } from "../../services/dtos/IPiece";

export function AssetDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [piece, setPiece] = useState<IPiece>(null);

  const THEME = useTheme();

  const params: AssetDetailsRouteProps = route.params as AssetDetailsRouteProps;

  async function loadScreen() {
    setIsLoading(true);

    try {
      const response = await getEquipmentById(Number(params.id));
      const data = response;
      setPiece(data);
    } catch (error) {
      Toast.show(
        "Houve um erro ao buscar o equipamento. Por favor, verifique sua conexão, ou tente novamente mais tarde.",
        { duration: 5000, type: "danger" }
      );
    } finally {
      setIsLoading(false);
    }
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
            source={piece?.image ? (piece.image) : (require("../../assets/images/asset-image.png"))}
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
                 <Text>0 results</Text>
              </Content>
            }
          />
        </Content>
          </>
        )}
        
    </Container>
  );
}
