import React from "react";
import { Linking } from "react-native";
import { useTheme } from "styled-components/native";
import { Toast } from "react-native-toast-notifications";

import WhatsAppIcon from "../../assets/icons/whatsapp.svg";
import ArrowForwardIcon from "../../assets/icons/arrow-forward.svg";

import { Container, Content, Title, Subtitle } from "./styles";
import { t } from "i18next";

export function WhatsAppButton() {
  const THEME = useTheme();

  async function handleOpenWhatsApp() {
    const phoneNumber = "+5547991352586";
    const url = `whatsapp://send?phone=${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        return Linking.openURL(url);
      } else {
        Toast.show(t('home.notinstalledWhatsApp'));
      }
    } catch (error) {
      console.log(error);
      Toast.show(t('home.errorOpenWhatsApp'));
    }
  }

  return (
    <Container onPress={handleOpenWhatsApp}>
      <WhatsAppIcon height={28} width={28} />

      <Content>
        <Title>{t('home.needHelp')}</Title>

        <Subtitle>{t('home.needHelpSubtite')}</Subtitle>
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
