import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import { TotalNotifications } from "../TotalNotifications";

import BellRingingIcon from "../../assets/icons/bell-ringing.svg";

import { Container, Details, Title, Text, IconContainer, Icon } from "./styles";

export function AssetDetailsCard() {
  return (
    <Container>
      <Details>
        <Text>
          <Title>Tipo: </Title>Tipo
        </Text>
        <Text>
          <Title>Marca: </Title>Weg Trifásico de 4 polos
        </Text>
        <Text>
          <Title>Modelo: </Title>W22 IR3 Premium
        </Text>
      </Details>

      <IconContainer>
        <Icon>
          <BellRingingIcon height={RFValue(18)} width={RFValue(18)} />
          <TotalNotifications total={1} />
        </Icon>
      </IconContainer>
    </Container>
  );
}
