
import React from "react";

import { Entypo, AntDesign } from "@expo/vector-icons";
import { HeaderProps } from "./types";

import { useTheme } from "styled-components/native";

import { 
  Container, 
  LeftIcons,
  LeftIcon,
  TitleWrapper,
  Title,
  RightIcons,
} from "./styles";

export default function Header<T>({ 
  title, 
  variant = 'primary',
  backIcon, 
  backPress, 
  leftContent,
  rightContent,
 }: HeaderProps<T>) {
  const THEME = useTheme();

  const colors = {
    'primary': { color: THEME.colors.primary },
    'secondary': { color: THEME.colors.light },
  }

  return (
    <Container variant={variant}>
      <LeftIcons>
      {backIcon && (
        <>
        {backIcon === "entypo" && (<LeftIcon onPress={() => backPress?.()} ><Entypo name="menu" size={24} color={colors[variant].color} /></LeftIcon>)}
        {backIcon === "back" && (<LeftIcon onPress={() => backPress?.()} ><Entypo color={colors[variant].color} name="chevron-left" size={24} /></LeftIcon>)}
        </>
      )}
      {leftContent}
      </LeftIcons>
      
      <TitleWrapper>
        <Title variant={variant}>{title}</Title>
      </TitleWrapper>

      <RightIcons>
        {rightContent}
      </RightIcons>
    </Container>
  );
}
