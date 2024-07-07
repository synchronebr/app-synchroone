import React from "react";

import { MinutesIntervalButtonProps } from "./types";
import { Container, Title } from "./styles";

export function MinutesIntervalButton({
  title,
  ...rest
}: MinutesIntervalButtonProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
