import React from "react";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import NotificationsOutlineIcon from "../../assets/icons/notifications-outline.svg";
import { TotalNotifications } from "../TotalNotifications";

import { NotificationsButtonProps } from "./types";
import { Container, IconContainer, Content, Title, Subtitle } from "./styles";

export function NotificationsButton({ ...rest }: NotificationsButtonProps) {
  const THEME = useTheme();

  return (
    <Container {...rest}>
      <IconContainer>
        <NotificationsOutlineIcon height={RFValue(28)} width={RFValue(28)} />

        <TotalNotifications total={5} />
      </IconContainer>

      <Content>
        <Title>Notificações</Title>

        <Subtitle>5 novas notificações</Subtitle>
      </Content>
    </Container>
  );
}
