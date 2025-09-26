import React, { useCallback, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { useTranslation } from 'react-i18next';

import NotificationsIcon from "../../assets/icons/notifications.svg";
import BlueLogoIcon from "../../assets/icons/blue-logo.svg";

import { Loading } from "../../components/Loading";
import { TotalNotifications } from "../../components/TotalNotifications";
import { SynchroneSensorButton } from "../../components/SynchroneSensorButton";
import { NewGatewayButton } from "../../components/NewGatewayButton";
import { WhatsAppButton } from "../../components/WhatsAppButton";

import { getAllNotifications } from "../../services/Notifications";
import { GetAllNotificationsResponse } from "../../services/Notifications/types";

import {
  Container,
  Header,
  Title,
  NotificationsIconContainer,
  GreetingsContainer,
  GreetingsMessage,
  Buttons,
} from "./styles";
import { View, Text } from "react-native";

export function Home() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [unreadNotificationsTotal, setUnreadNotificationsTotal] = useState<
    number | null
  >(null);

  const navigation = useNavigation();
  const THEME = useTheme();

  const notificationsIconSize = 22;

  async function getNotifications() {
    setIsLoading(true);

    try {
      const response = await getAllNotifications();

      if (response.status === 200) {
        const { quantity } = response.data as GetAllNotificationsResponse;
        setUnreadNotificationsTotal(quantity.unread);
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
      <Header>
        <Entypo
          onPress={() => navigation.openDrawer()}
          name="menu"
          size={24}
          color={THEME.colors.primary}
        />

        <Title>Synchroone</Title>

        <NotificationsIconContainer
          onPress={() => navigation.navigate("Notifications" as never)}
        >
          <NotificationsIcon
            height={notificationsIconSize}
            width={notificationsIconSize}
          />
          {unreadNotificationsTotal && (
            <TotalNotifications total={unreadNotificationsTotal} />
          )}
        </NotificationsIconContainer>
      </Header>

      <GreetingsContainer>
        <BlueLogoIcon width={36} height={68} />
        <GreetingsMessage>{t('home.welcomeSynchroone')}</GreetingsMessage>
      </GreetingsContainer>

      <Buttons>
        <SynchroneSensorButton />
        <NewGatewayButton />
      </Buttons>

      <WhatsAppButton />

      {/* <View style={{ padding: 30, flex: 1, flexDirection: 'row', gap: 30, height: 50 }} >
        <Text onPress={() => i18n.changeLanguage('pt')} style={{ padding: 10, backgroundColor: 'silver', height: 50 }}>PT</Text>
        <Text onPress={() => i18n.changeLanguage('en')} style={{ padding: 10, backgroundColor: 'silver', height: 50 }}>EN</Text>
        <Text onPress={() => i18n.changeLanguage('es')} style={{ padding: 10, backgroundColor: 'silver', height: 50 }}>ES</Text>
      </View> */}
    </Container>
  );
}
