import React from "react";

import { Container, Header, Title, Text } from "./styles";

export function NotificationCard() {
  return (
    <Container>
      <Header>
        <Title>Notificação</Title>
        <Text>há 5 min</Text>
      </Header>

      <Text>
        Lorem ipsum dolor sit amet consectetur. Pretium sollicitudin id tempus
        viverra quis sem...
      </Text>
    </Container>
  );
}
