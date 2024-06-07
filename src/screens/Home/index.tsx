import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

import NotificationsIcon from "../../assets/icons/notifications.svg";
import BlueLogoIcon from "../../assets/icons/blue-logo.svg";

import { TotalNotifications } from "../../components/TotalNotifications";
import { SynchroneSensorButton } from "../../components/SynchroneSensorButton";
import { NotificationsButton } from "../../components/NotificationsButton";
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

  const notificationsIconSize = RFValue(22);

  return (
    <Container>
      <Header>
        <Title>Synchroone</Title>

        <NotificationsIconContainer
          onPress={() => navigation.navigate("Notifications" as never)}
        >
          <NotificationsIcon
            height={notificationsIconSize}
            width={notificationsIconSize}
          />
          <TotalNotifications total={5} />
        </NotificationsIconContainer>
      </Header>

      <GreetingsContainer>
        <BlueLogoIcon width={RFValue(46)} height={RFValue(68)} />
        <GreetingsMessage>Bem-vindo ao Synchroone!</GreetingsMessage>
      </GreetingsContainer>

      <Buttons>
        <SynchroneSensorButton />
        <NotificationsButton />
      </Buttons>

      <WhatsAppButton />
    </Container>
  );
}
