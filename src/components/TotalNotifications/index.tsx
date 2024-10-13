import React from "react";

import { TotalNotificationsProps } from "./types";
import { Container, Text } from "./styles";

export function TotalNotifications({ total }: TotalNotificationsProps) {
  if (!total)
     return null;

  return (
    <Container>
      <Text>{total}</Text>
    </Container>
  );
}
