import React from "react";

import { HistoryCardProps } from "./types";
import {
  Container,
  Progress,
  Circle,
  Line,
  Card,
  Header,
  Title,
  Time,
  Content,
  Text,
} from "./styles";

export function HistoryCard({ isLastCard, type }: HistoryCardProps) {
  return (
    <Container>
      <Progress>
        <Circle isLastCard={isLastCard} />
        <Line />
      </Progress>
      <Card type={type}>
        <Header>
          <Title>Desbalanceamento</Title>
          <Time>12:00</Time>
        </Header>

        <Content>
          <Text>
            Possível desbalaceaemento da máquina detectado. Chance de quebra
            estimada em 32%.
          </Text>
        </Content>
      </Card>
    </Container>
  );
}
