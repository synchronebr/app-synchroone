import React from "react";

import { HistoryCardProps } from "./types";
import { Container, Header, Title, Time, Content, Text } from "./styles";

export function HistoryCard({ type }: HistoryCardProps) {
  return (
    <Container type={type}>
      <Header>
        <Title>Desbalanceamento</Title>
        <Time>12:00</Time>
      </Header>

      <Content>
        <Text>
          Posivel desbalaceaemento da máquina detectado. Chance de quebra
          estimada em 32%.
        </Text>
      </Content>
    </Container>
  );
}
