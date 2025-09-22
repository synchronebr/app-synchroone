
import React from "react";

import { Entypo, MaterialIcons } from "@expo/vector-icons";
import TuneIcon from "../../assets/icons/tune.svg";

import THEME from "../../global/styles/theme";
import { AccordionProps } from "./types";
import { Container } from "./styles";

export default function IconDynamic<T>({ 
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
          size={24}
        />
      )}

      {icon === 'add-a-photo' && (
        <MaterialIcons
          style={{ padding: 6 }}
          color={THEME.colors.primary}
          name="add-a-photo"
          onPress={onPress}
          size={16}
        />
      )}

      {icon === 'add-photo-alternate' && (
        <MaterialIcons
          style={{ padding: 6 }}
          color={THEME.colors.primary}
          name="add-photo-alternate"
          onPress={onPress}
          size={16}
        />
      )}
    </Container>
  );
}
