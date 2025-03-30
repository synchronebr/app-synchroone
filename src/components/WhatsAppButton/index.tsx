import React from "react";
import { Linking } from "react-native";
import { useTheme } from "styled-components/native";
import { Toast } from "react-native-toast-notifications";

import WhatsAppIcon from "../../assets/icons/whatsapp.svg";
import ArrowForwardIcon from "../../assets/icons/arrow-forward.svg";

import { Container, Content, Title, Subtitle } from "./styles";

export function WhatsAppButton() {
  const THEME = useTheme();

  async function handleOpenWhatsApp() {
    const phoneNumber = "+554791168382";
    const url = `whatsapp://send?phone=${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        return Linking.openURL(url);
      } else {
        Toast.show("O WhatsApp não está instalado no teu dispositivo.");
      }
    } catch (error) {
      console.log(error);
      Toast.show("Erro ao abrir o WhatsApp.");
    }
  }

  return (
    <Container onPress={handleOpenWhatsApp}>
      <WhatsAppIcon height={28} width={28} />

      <Content>
        <Title>Precisa de ajuda?</Title>

        <Subtitle>Seguir para WhatsApp</Subtitle>
      </Content>

      <ArrowForwardIcon
        style={{ marginRight: 4 }}
        fill={THEME.colors.primary}
        height={15}
        width={15}
      />
    </Container>
  );
}
