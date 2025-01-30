import React from "react";

import TuneIcon from "../../assets/icons/tune.svg";

import { NotificationCard } from "../../components/NotificationCard";

import { Container, TuneIconContainer, List, Content, Text } from "./styles";

export function Notifications() {
  const data = [];

  return (
    <Container>
      <TuneIconContainer>
        <TuneIcon height={18} width={18} />
      </TuneIconContainer>

      <List
        data={data}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <NotificationCard />}
        ListEmptyComponent={
          false ?
            <Loading bgColor={'transparent'} color={THEME.colors.primary} />
            :
            <Content>
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                }}
              >
                Nenhuma notificação para visualizar.
              </Text>
            </Content>
        }
      />
    </Container>
  );
}
