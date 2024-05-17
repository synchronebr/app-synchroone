import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import TuneIcon from "../../assets/icons/tune.svg";

import { NotificationCard } from "../../components/NotificationCard";

import { Container, TuneIconContainer, List } from "./styles";

export function Notifications() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Container>
      <TuneIconContainer>
        <TuneIcon height={RFValue(18)} width={RFValue(18)} />
      </TuneIconContainer>

      <List
        data={data}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <NotificationCard />}
      />
    </Container>
  );
}
