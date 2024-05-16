import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

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
  const [isSensorActive, setIsSensorActive] = useState(false);

  return (
    <Container>
      <Header>
        <Title>Synchrone</Title>

        <NotificationsIconContainer>
          <NotificationsIcon height={RFValue(22)} width={RFValue(22)} />
          <TotalNotifications total={5} />
        </NotificationsIconContainer>
      </Header>

      <GreetingsContainer>
        <BlueLogoIcon width={RFValue(46)} height={RFValue(68)} />
        <GreetingsMessage>Bem-vindo ao Synchrone!</GreetingsMessage>
      </GreetingsContainer>

      <Buttons>
        <SynchroneSensorButton
          isActive={isSensorActive}
          onPress={() => setIsSensorActive(!isSensorActive)}
        />
        <NotificationsButton />
      </Buttons>

      <WhatsAppButton />
    </Container>
  );
}
