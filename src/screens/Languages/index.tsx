import React, { useCallback, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import Header from "../../components/Pages/Header";
import i18n, { t } from "i18next";
import {
  Container,
  LanguageContent,
  LanguageCard,
  CardInner,
  CardLeft,
  FlagWrapper,
  FlagImage,
  CardContent,
  LanguageRow,
  LanguageName,
  LanguageSmall,
  Footer,
} from "./styles";

type LangCode = "pt-BR" | "en-US" | "es-ES";

import { RoundFlag } from "../../components/RoundFlag";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../../components/Loading";
import THEME from "../../global/styles/theme";

export function Languages() {
  const navigation = useNavigation();
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [selected, setSelected] = useState<string>(user?.locale);

  const handleAdvance = useCallback(async () => {
    setIsLoading(true);
    try {
      await i18n.changeLanguage(selected);
      setUser(user => ({...user, locale: selected}))
    } catch (e) {
      console.log("changeLanguage error:", e);
    }
    navigation.navigate("Countries" as never);
    setIsLoading(false);
  }, [navigation, selected]);

  // cartões fixos (sem array/lista)

  if (isLoading)
      return <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />;
  
  return (
    <Container>
      <Header
        title="Selecionar Idioma"
        backIcon="back"
        backPress={() => navigation.navigate("DashboardTab" as never, { screen: "More" } as never)}
      />

      <LanguageContent>

      {/* Português */}
      <LanguageCard
        selected={selected === "pt-BR"}
        activeOpacity={0.9}
        onPress={() => setSelected("pt-BR")}
      >
        <CardInner>
          <CardLeft>
            <FlagWrapper>
              {/* <RoundFlag country="BR" size={30}/> */}
            </FlagWrapper>
          </CardLeft>

          <CardContent>
            <LanguageRow>
              <LanguageName numberOfLines={1}>Português</LanguageName>
              <LanguageSmall> (pt-BR)</LanguageSmall>
            </LanguageRow>
          </CardContent>
        </CardInner>
      </LanguageCard>

      {/* Inglês */}
      <LanguageCard
        selected={selected === "en-US"}
        activeOpacity={0.9}
        onPress={() => setSelected("en-US")}
      >
        <CardInner>
          <CardLeft>
            <FlagWrapper>
              {/* <RoundFlag country="US" size={30}/> */}
            </FlagWrapper>
          </CardLeft>

          <CardContent>
            <LanguageRow>
              <LanguageName numberOfLines={1}>Inglês</LanguageName>
              <LanguageSmall> (en-US)</LanguageSmall>
            </LanguageRow>
          </CardContent>
        </CardInner>
      </LanguageCard>

      {/* Espanhol */}
      <LanguageCard
        selected={selected === "es-ES"}
        activeOpacity={0.9}
        onPress={() => setSelected("es-ES")}
      >
        <CardInner>
          <CardLeft>
            <FlagWrapper>
              {/* <RoundFlag country="ES" size={30}/> */}
            </FlagWrapper>
          </CardLeft>

          <CardContent>
            <LanguageRow>
              <LanguageName numberOfLines={1}>Espanhol</LanguageName>
              <LanguageSmall> (es-ES)</LanguageSmall>
            </LanguageRow>
          </CardContent>
        </CardInner>
      </LanguageCard>

      </LanguageContent>
      {/* <Footer>
        <FooterButton onPress={handleAdvance} activeOpacity={0.9}>
          <FooterButtonText>Avançar</FooterButtonText>
        </FooterButton>
      </Footer> */}
      <Footer>
        <Button title={t('index.next')} onPress={handleAdvance}/>
      </Footer>
    </Container>
  );
}
