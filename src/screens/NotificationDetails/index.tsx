import React, { useState } from "react";

import { HistoryCard } from "../../components/HistoryCard";
import { ShareButton } from "../../components/ShareButton";

import {
  Container,
  Scroll,
  Header,
  Title,
  Subtitle,
  Text,
  Divider,
  HistoryCards,
  SeeMoreButton,
  SeeMore,
  ShareButtonContainer,
} from "./styles";

export function NotificationDetails() {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <Container>
      <Scroll>
        <Header>
          <Title>Detalhes Notificação</Title>

          <Subtitle>há 5 min</Subtitle>
        </Header>

        <Text>
          Lorem ipsum dolor sit amet consectetur. Pretium sollicitudin id tempus
          viverra quis sem. Libero risus eget elementum elit pharetra ac odio
          pulvinar ac. Auctor lorem risus viverra semper non sed mi cras. Diam
          vel nec tortor volutpat.{" "}
        </Text>

        <Divider />

        <Title>Histórico de alertas</Title>

        <HistoryCards>
          <HistoryCard isLastCard type="danger" />
          <HistoryCard type="warning" />
          <HistoryCard type="warning" />

          {seeMore && (
            <>
              <HistoryCard type="success" />
              <HistoryCard type="success" />
              <HistoryCard type="success" />
            </>
          )}

          <SeeMoreButton onPress={() => setSeeMore(!seeMore)}>
            <SeeMore>{!seeMore ? "Ver mais" : "Ver menos"}</SeeMore>
          </SeeMoreButton>
        </HistoryCards>

        <ShareButtonContainer>
          <ShareButton />
        </ShareButtonContainer>
      </Scroll>
    </Container>
  );
}
