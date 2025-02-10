import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import NotificationsIcon from "../../assets/icons/notifications.svg";
import BlueLogoIcon from "../../assets/icons/blue-logo.svg";
import LogoWhiteIconIcon from "../../assets/icons/logo-white-text.svg";

import { TotalNotifications } from "../../components/TotalNotifications";
import { SynchroneSensorButton } from "../../components/SynchroneSensorButton";
import { NewGatewayButton } from "../../components/NewGatewayButton";
import { WhatsAppButton } from "../../components/WhatsAppButton";

import {
  Container,
  Header,
  Title,
  NotificationsIconContainer,
  GreetingsContainer,
  GreetingsMessage,
  Buttons,
} from "./styles";

export function Home() {
  const navigation = useNavigation();
  const THEME = useTheme();

  const notificationsIconSize = 22;

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
          {/* <TotalNotifications total={5} /> */}
          <TotalNotifications />
        </NotificationsIconContainer>
      </Header>

      <GreetingsContainer>
        <BlueLogoIcon width={36} height={68} />
        <GreetingsMessage>Bem-vindo ao Synchroone!</GreetingsMessage>
      </GreetingsContainer>

      <Buttons>
        <SynchroneSensorButton />
        <NewGatewayButton />
      </Buttons>

      <WhatsAppButton />
    </Container>
  );
}
