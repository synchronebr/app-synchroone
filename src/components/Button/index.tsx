import React from "react";

import { ButtonProps } from "./types";
import { Container, Title } from "./styles";

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
