import React from "react";

import { MinutesIntervalButtonProps } from "./types";
import { Container, Title } from "./styles";

export function MinutesIntervalButton({
  title,
  selected,
  ...rest
}: MinutesIntervalButtonProps) {
  return (
    <Container selected={selected} {...rest}>
      <Title selected={selected}>{title}</Title>
    </Container>
  );
}
