import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import WhatsAppIcon from "../../assets/icons/whatsapp.svg";
import ArrowForwardIcon from "../../assets/icons/arrow-forward.svg";

import { WhatsAppButtonProps } from "./types";
import { Container, Content, Title, Subtitle } from "./styles";

export function WhatsAppButton({ ...rest }: WhatsAppButtonProps) {
  return (
    <Container {...rest}>
      <WhatsAppIcon height={RFValue(28)} width={RFValue(28)} />

      <Content>
        <Title>Precisa de ajuda?</Title>

        <Subtitle>Seguir para WhatsApp</Subtitle>
      </Content>

      <ArrowForwardIcon style={{ marginRight: 4 }} />
    </Container>
  );
}
