
import React from "react";

import { Entypo, MaterialIcons } from "@expo/vector-icons";

import THEME from "../../global/styles/theme";
import { AccordionProps } from "./types";
import { Container } from "./styles";

export default function IconDynamicBall<T>({ 
  icon,
  onPress,
 }: AccordionProps<T>) {

  return (
    <Container>
      {icon === 'chevron-left' && (
        <Entypo
          color={THEME.colors.primary}
          name="chevron-left"
          onPress={onPress}
          size={32}
        />
      )}

      {icon === 'add-a-photo' && (
        <MaterialIcons
          style={{ padding: 8 }}
          color={THEME.colors.primary}
          name="add-a-photo"
          onPress={onPress}
          size={20}
        />
      )}

      {icon === 'add-photo-alternate' && (
        <MaterialIcons
          style={{ padding: 6 }}
          color={THEME.colors.primary}
          name="add-photo-alternate"
          onPress={onPress}
          size={24}
        />
      )}
    </Container>
  );
}
