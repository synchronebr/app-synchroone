import React from "react";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

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
        height={RFValue(12)}
        width={RFValue(12)}
      />
    </Container>
  );
}
