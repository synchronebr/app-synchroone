import React from "react";
import { TouchableOpacityProps } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Container, Details, Title, Text } from "./styles";
import { IPiece } from "../../services/dtos/IPiece";
import { useTheme } from "styled-components/native";

interface IAssetDetailsCard extends TouchableOpacityProps {
  piece: IPiece;
}

export function AssetDetailsCard({ piece, ...rest }: IAssetDetailsCard) {
  const THEME = useTheme();

  return (
    <Container {...rest}>
      <Details>
        <Text>
          <Title>Tipo: </Title>
          {piece && piece.pieceType ? piece.pieceType.description : "-"}
        </Text>
        <Text>
          <Title>Marca: </Title>
          {piece && piece.brand ? piece.brand : "-"}
        </Text>
        <Text>
          <Title>Modelo: </Title>
          {piece && piece.model ? piece.model : "-"}
        </Text>
      </Details>

      <FontAwesome name="edit" size={24} color={THEME.colors.primary} />
    </Container>
  );
}
