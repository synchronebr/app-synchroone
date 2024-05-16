import React from "react";

import { TotalNotificationsProps } from "./types";
import { Container, Text } from "./styles";

export function TotalNotifications({ total }: TotalNotificationsProps) {
  return (
    <Container>
      <Text>{total}</Text>
    </Container>
  );
}
