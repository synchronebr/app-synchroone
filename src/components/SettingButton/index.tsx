import React from "react";
import { useTheme } from "styled-components/native";

import ArrowForwardIcon from "../../assets/icons/arrow-forward.svg";

import { SettingButtonProps } from "./types";
import { Container, TextContainer, Title, Subtitle } from "./styles";

export function SettingButton({
  icon: Icon,
  title,
  subtitle,
  ...rest
}: SettingButtonProps) {
  const THEME = useTheme();

  return (
    <Container {...rest}>
      <Icon />

      <TextContainer>
        <Title>{title}</Title>
        {subtitle && (<Subtitle>{subtitle}</Subtitle>)}
      </TextContainer>

      <ArrowForwardIcon
        fill={THEME.colors.primary}
        height={12}
        width={12}
      />
    </Container>
  );
}
