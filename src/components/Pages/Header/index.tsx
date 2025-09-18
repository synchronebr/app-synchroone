
import React from "react";

import { Entypo, AntDesign } from "@expo/vector-icons";
import { HeaderProps } from "./types";

import { useTheme } from "styled-components/native";

import { 
  Container, 
  LeftIcons,
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
        {backIcon === "entypo" && (<Entypo onPress={() => backPress()} name="menu" size={24} color={THEME.colors.primary} />)}
        {backIcon === "back" && (<AntDesign onPress={() => backPress()} name="left" size={24} color={THEME.colors.primary} />)}
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
