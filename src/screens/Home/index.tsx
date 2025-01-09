import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

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
          {/* <TotalNotifications total={5} /> */}
          <TotalNotifications />
        </NotificationsIconContainer>
      </Header>

      <GreetingsContainer>
        <BlueLogoIcon width={RFValue(36)} height={RFValue(68)} />
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
