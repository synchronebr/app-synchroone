import React from "react";
import { useNavigation } from "@react-navigation/native";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  NotificationCardNavigationProps,
  NotificationCardProps,
} from "./types";
import { Container, Header, Title, Text } from "./styles";

export function NotificationCard(props: NotificationCardProps) {
  const { title, content, createdAt } = props;

  const navigation = useNavigation<NotificationCardNavigationProps>();

  const secondsDifference = differenceInSeconds(new Date(), createdAt);

  return (
    <Container
      onPress={() => navigation.navigate("NotificationDetails", { ...props })}
    >
      <Header>
        <Title>{title}</Title>
        <Text>
          {secondsDifference < 60
            ? "Agora mesmo"
            : formatDistanceToNow(createdAt, { addSuffix: true, locale: ptBR })}
        </Text>
      </Header>

      <Text>{content}</Text>
    </Container>
  );
}
