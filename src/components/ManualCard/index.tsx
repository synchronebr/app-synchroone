import React from "react";
import { useTheme } from "styled-components/native";

import ArrowForwardIcon from "../../assets/icons/arrow-forward.svg";

import { ManualCardProps } from "./types";
import { Container, Title } from "./styles";

export function ManualCard({ title, ...rest }: ManualCardProps) {
  const THEME = useTheme();

  return (
    <Container {...rest}>
      <Title>{title}</Title>

      <ArrowForwardIcon
        fill={THEME.colors.gray_dark}
        height={12}
        width={12}
      />
    </Container>
  );
}
