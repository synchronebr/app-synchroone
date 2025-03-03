import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import TuneIcon from "../../assets/icons/tune.svg";

import { Loading } from "../../components/Loading";
import { NotificationCard } from "../../components/NotificationCard";

import { getAllNotifications } from "../../services/Notifications";
import {
  GetAllNotificationsResponse,
  GetNotificationByIDResponse,
} from "../../services/Notifications/types";

import { Container, TuneIconContainer, List, Content, Text } from "./styles";

export function Notifications() {
  const THEME = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const [allNotifications, setAllNotifications] = useState<
    GetNotificationByIDResponse[]
  >([]);

  async function getNotifications() {
    setIsLoading(true);

    try {
      const response = await getAllNotifications();

      if (response.status === 200) {
        const { notifications } = response.data as GetAllNotificationsResponse;

        setAllNotifications(notifications);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, [])
  );

  if (isLoading)
    return (
      <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
    );

  return (
    <Container>
      <TuneIconContainer>
        <TuneIcon height={18} width={18} />
      </TuneIconContainer>

      <List
        data={allNotifications}
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
