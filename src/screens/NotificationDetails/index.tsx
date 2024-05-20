import React from "react";

import { Container, Header, Title, Subtitle, Text, Divider } from "./styles";

export function NotificationDetails() {
  return (
    <Container>
      <Header>
        <Title>Detalhes Notificação</Title>

        <Subtitle>há 5 min</Subtitle>
      </Header>

      <Text>
        Lorem ipsum dolor sit amet consectetur. Pretium sollicitudin id tempus
        viverra quis sem. Libero risus eget elementum elit pharetra ac odio
        pulvinar ac. Auctor lorem risus viverra semper non sed mi cras. Diam vel
        nec tortor volutpat.{" "}
      </Text>

      <Divider />

      <Title>Histórico de alertas</Title>
    </Container>
  );
}
