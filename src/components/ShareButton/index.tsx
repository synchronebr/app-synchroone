import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import ShareIcon from "../../assets/icons/share.svg";

import { Container, Title } from "./styles";

export function ShareButton() {
  return (
    <Container>
      <ShareIcon height={RFValue(20)} width={RFValue(18)} />

      <Title>Compartilhar notificação</Title>
    </Container>
  );
}
