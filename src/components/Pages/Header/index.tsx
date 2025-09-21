
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
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Header<T>({ 
  title, 
  backIcon, 
  backPress, 
  leftContent,
  rightContent,
 }: HeaderProps<T>) {
  const THEME = useTheme();

  return (
    <Container>
      <LeftIcons>
      {backIcon && (
        <>
        {backIcon === "entypo" && (<LeftIcon onPress={() => backPress()} ><Entypo name="menu" size={24} color={THEME.colors.primary} /></LeftIcon>)}
        {backIcon === "back" && (<LeftIcon onPress={() => backPress()} ><AntDesign name="left" size={24} color={THEME.colors.primary} /></LeftIcon>)}
        </>
      )}
      {leftContent}
      </LeftIcons>
      
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>

      <RightIcons>
        {rightContent}
      </RightIcons>
    </Container>
  );
}
