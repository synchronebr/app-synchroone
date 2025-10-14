import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Pages/Header";
import i18n, { t } from "i18next";
import {
  Container,
  CountryContent,
  CountryCard,
  CardInner,
  CardLeft,
  FlagWrapper,
  CardContent,
  CountryRow,
  CountryName,
} from "./styles";

import { RoundFlag } from "../../components/RoundFlag";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { getCountries } from "../../services/MasterData/Countries";
import { Loading } from "../../components/Loading";
import THEME from "../../global/styles/theme";

export function Countries() {
  const navigation = useNavigation();
  const { user, setUser, updateUser } = useAuth();
  const [countries, setCountries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getContriesData = async () => {
    const { data } = await getCountries();
    if (data) {
      setCountries(data);
    }
  }

  const [selected, setSelected] = useState<string>(user?.country);

  const handleAdvance = useCallback(async () => {
    setIsLoading(true);
    try {
      const userNew =  {...user, country: selected}
      setUser(userNew)

      await updateUser(userNew);
      navigation.navigate("DashboardTab" as never, { screen: "More" } as never);
    } catch (e) {
    }
    setIsLoading(false);
  }, [navigation, selected]);

  useEffect(() => {
    getContriesData();
  }, [])

  if (isLoading)
      return <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />;

  return (
    <Container>
      <Header
        title="Selecionar País"
        backIcon="back"
        backPress={() => navigation.goBack()}
      />

      <CountryContent>
        {countries && countries.map(country => (
          <CountryCard
            selected={selected === country.value}
            activeOpacity={0.9}
            onPress={() => setSelected(country.value)}
          >
            <CardInner>
              <CardLeft>
                <FlagWrapper>
                  {/* <RoundFlag country="BR" size={30}/> */}
                </FlagWrapper>
              </CardLeft>

              <CardContent>
                <CountryRow>
                  <CountryName numberOfLines={1}>{country.label}</CountryName>
                </CountryRow>
              </CardContent>
            </CardInner>
          </CountryCard>
        ))}
      </CountryContent>
      <Button title={t('index.save')} onPress={handleAdvance}/>
    </Container>
  );
}
