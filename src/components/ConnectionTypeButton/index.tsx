import React from "react";

import { ConnectionButtonProps } from "./types";
import { Container, Title } from "./styles";

export function ConnectionTypeButton({
  icon: Icon,
  title,
  isActive,
  ...rest
}: ConnectionButtonProps) {
  return (
    <Container isActive={isActive} {...rest}>
      <Icon />

      <Title>{title}</Title>
    </Container>
  );
}
