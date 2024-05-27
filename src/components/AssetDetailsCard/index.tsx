import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import BellRingingIcon from "../../assets/icons/bell-ringing.svg";

import { Container, Details, Title, Text, IconContainer } from "./styles";

export function AssetDetailsCard() {
  return (
    <Container>
      <Details>
        <Text>Tipo: Tipo</Text>
        <Text>Marca: Weg Trifásico de 4 polos</Text>
        <Text>Modelo: W22 IR3 Premium</Text>
      </Details>

      <IconContainer>
        <BellRingingIcon height={RFValue(18)} width={RFValue(18)} />
      </IconContainer>
    </Container>
  );
}
