import React from "react";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { useNavigation } from "@react-navigation/native";

import { HistoryCardNavigationProps, HistoryCardProps } from "./types";
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
  TextPath,
} from "./styles";

export function HistoryCard({ isLastCard, item, ...rest }: HistoryCardProps) {
  const navigation = useNavigation<HistoryCardNavigationProps>();
  return (
    <Container {...rest} onPress={() => navigation.navigate("AlertDetails", { id: item.id })}>
      <Progress>
        <Circle read={item.read} type={item.hazardousness} isLastCard={isLastCard} />
        <Line type={item.hazardousness} />
      </Progress>
      <Card type={item.hazardousness}>
        <Header>
          <Title>{item.reading.measuringPoint.piece.description} - {item.title}</Title>
        </Header>

        <Content>
          {/* <TextPath>{`${item.reading.measuringPoint.piece.path?.title}`} </TextPath> */}
          <TextPath>{`${item.reading.type === 'O' ? 'Online' : 'Part-time'}`} </TextPath>
          
        </Content>

        <Content>
          <Text>{item.description}</Text>
        </Content>

        <Content>
        <Time>{format(item.createdAt, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}</Time>
        </Content>
      </Card>
    </Container>
  );
}
