import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";
import { ptBR } from "date-fns/locale";

import { markNotificationAsRead as markNotificationAsReadService } from "../../services/Notifications";

import { NotificationDetailsRouteProps } from "./types";
import {
  Container,
  Scroll,
  Header,
  Title,
  Subtitle,
  Text,
  Divider,
} from "./styles";

export function NotificationDetails() {
  const route = useRoute();
  const params = route.params as NotificationDetailsRouteProps;
  const { id, read, createdAt, title, content } = params;

  const secondsDifference = differenceInSeconds(new Date(), createdAt);

  async function markNotificationAsRead() {
    if (read) return;

    try {
      await markNotificationAsReadService(id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    markNotificationAsRead();
  }, []);

  return (
    <Container>
      <Scroll>
        <Header>
          <Title>{title}</Title>

          <Subtitle>
            {secondsDifference < 60
              ? "Agora mesmo"
              : formatDistanceToNow(createdAt, {
                  addSuffix: true,
                  locale: ptBR,
                })}
          </Subtitle>
        </Header>

        <Text>{content}</Text>

        <Divider />
      </Scroll>
    </Container>
  );
}
