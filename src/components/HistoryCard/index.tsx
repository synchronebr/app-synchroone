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
import { format } from "date-fns";

export function HistoryCard({ isLastCard, item }: HistoryCardProps) {
  return (
    <Container>
      <Progress>
        <Circle isLastCard={isLastCard} />
        <Line />
      </Progress>
      <Card type={item.hazardousness}>
        <Header>
          <Title>{item.title}</Title>
          <Time>{format(item.createdAt, 'hh:mm')}</Time>
        </Header>

        <Content>
          <Text>
            {item.description}
          </Text>
        </Content>
      </Card>
    </Container>
  );
}
