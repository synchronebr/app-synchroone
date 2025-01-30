import React from "react";
import { useTheme } from "styled-components/native";

import BellRingingIcon from "../../assets/icons/bell-ringing.svg";
import BellRingingFilledIcon from "../../assets/icons/bell-ringing-filled.svg";

import { TotalNotifications } from "../TotalNotifications";

import { TabBarCenterButtonProps } from "./types";
import { Container, BellRingingIconContainer } from "./styles";

export function TabBarCenterButton({ isFocused, readingsCount }: TabBarCenterButtonProps) {
  const THEME = useTheme();

  return (
    <Container
      style={{
        elevation: 8,
        shadowColor: THEME.colors.dark,
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.2,
      }}
    >
      <BellRingingIconContainer>
        {isFocused ? (
          <BellRingingFilledIcon height={24} width={24} />
        ) : (
          <BellRingingIcon height={24} width={24} />
        )}

        <TotalNotifications total={readingsCount} />
      </BellRingingIconContainer>
    </Container>
  );
}
