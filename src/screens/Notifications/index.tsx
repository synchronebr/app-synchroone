import React from "react";
import { useRoute } from "@react-navigation/native";

import TuneIcon from "../../assets/icons/tune.svg";

import { NotificationCard } from "../../components/NotificationCard";

import { NotificationsRouteProps } from "./types";
import { Container, TuneIconContainer, List, Content, Text } from "./styles";

export function Notifications() {
  const route = useRoute();
  const params = route.params as NotificationsRouteProps;

  return (
    <Container>
      <TuneIconContainer>
        <TuneIcon height={18} width={18} />
      </TuneIconContainer>

      <List
        data={Object.values(params)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NotificationCard {...item} />}
        ListEmptyComponent={
          <Content>
            <Text
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Nenhuma notificação para visualizar.
            </Text>
          </Content>
        }
      />
    </Container>
  );
}
