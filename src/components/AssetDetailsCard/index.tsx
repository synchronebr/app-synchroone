import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import { TotalNotifications } from "../TotalNotifications";

import BellRingingIcon from "../../assets/icons/bell-ringing.svg";

import { Container, Details, Title, Text, IconContainer, Icon } from "./styles";
import { IPiece } from "../../services/dtos/IPiece";

interface IAssetDetailsCard {
  piece: IPiece;
}

export function AssetDetailsCard({ piece }: IAssetDetailsCard) {
  return (
    <Container>
      <Details>
        <Text>
          <Title>Tipo: </Title>{piece?.pieceType?.description}
        </Text>
        <Text>
          <Title>Marca: </Title>{piece?.brand}
        </Text>
        <Text>
          <Title>Modelo: </Title>{piece?.model}
        </Text>
      </Details>

      {/* <IconContainer>
        <Icon>
          <BellRingingIcon height={RFValue(18)} width={RFValue(18)} />
          <TotalNotifications total={1} />
        </Icon>
      </IconContainer> */}
    </Container>
  );
}
