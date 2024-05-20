import React from "react";
import { useNavigation } from "@react-navigation/native";

import { NotificationCardNavigationProps } from "./types";
import { Container, Header, Title, Text } from "./styles";

export function NotificationCard() {
  const navigation = useNavigation<NotificationCardNavigationProps>();

  return (
    <Container onPress={() => navigation.navigate("NotificationDetails")}>
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
