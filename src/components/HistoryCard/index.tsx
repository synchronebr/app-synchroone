import React from "react";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

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

export function HistoryCard({ isLastCard, item, ...rest }: HistoryCardProps) {
  return (
    <Container {...rest}>
      <Progress>
        <Circle type={item.hazardousness} isLastCard={isLastCard} />
        <Line type={item.hazardousness} />
      </Progress>
      <Card type={item.hazardousness}>
        <Header>
          <Title type={item.hazardousness}>{item.title}</Title>
        </Header>

        <Content>
          <Text type={item.hazardousness}>{item.description}</Text>
        </Content>

        <Content>
        <Time type={item.hazardousness}>{format(item.createdAt, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}</Time>
        </Content>
      </Card>
    </Container>
  );
}
