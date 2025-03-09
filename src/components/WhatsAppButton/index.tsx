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

  function handleSendPushNotification() {
    const url = 'https://api.onesignal.com/notifications?c=push';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: 'Key os_v2_app_l57jrwm4zjhincvkhxq6r6rw27wlnvi2vjwecmvlpzztiyesdvxook6y45sy6h4xmq6ndfznwmal3zdtmzrgysn6pjonyspgjwfspkq',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        app_id: '5f7e98d9-9cca-4e86-8aaa-3de1e8fa36d7',
        contents: {en: 'Your message body here.'},
        include_external_user_ids: ['jacksonmichalak@gmail.com']
      })
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));
  }

  return (
    <Container onPress={handleSendPushNotification}>
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
