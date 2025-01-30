import React from "react";

import ShareIcon from "../../assets/icons/share.svg";

import { Container, Title } from "./styles";

export function ShareButton() {
  return (
    <Container>
      <ShareIcon height={20} width={18} />

      <Title>Compartilhar notificação</Title>
    </Container>
  );
}
