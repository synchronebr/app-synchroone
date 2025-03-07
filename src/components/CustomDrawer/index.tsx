import { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { Loading } from "../Loading";

import { useAccessLevels } from "../../hooks/useAccessLevels";

import { updateCurrentCompany } from "../../services/AccessLevels";
import { UpdateCurrentCompanyRequest } from "../../services/AccessLevels/types";

import {
  Container,
  Header,
  HeaderTextDiv,
  Logo,
  CompanyName,
  AccessLevel,
  Title,
  TitleSecond,
} from "./styles";
import { margin } from "polished";

export function CustomDrawer(props: DrawerContentComponentProps) {
  const [isLoading, setIsLoading] = useState(true);

  const THEME = useTheme();

  const { getAccessLevels, getAccessLevelsData } = useAccessLevels();
  const accessLevels = getAccessLevelsData();

  async function getDrawerContentData() {
    setIsLoading(true);

    try {
      await getAccessLevels();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSelectCompany(id: string) {
    setIsLoading(true);

    try {
      const request: UpdateCurrentCompanyRequest = {
        preferences: [
          {
            code: "sideBar",
            field: "company",
            name: "Initial",
            content: id,
          },
        ],
      };

      const { status } = await updateCurrentCompany(request);

      if (status === 200) await getAccessLevels();

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const companyImage = accessLevels?.companies?.find(
    (company) => company.companyId === accessLevels?.currentCompany?.companyId
  )?.image;

  const companies = accessLevels && accessLevels?.companies?.filter((company) => company.companyId !== accessLevels?.currentCompany?.companyId && company.companyType !== 'TP' )
  const companiesPartTime = accessLevels && accessLevels?.companies?.filter((company) => company.companyId !== accessLevels?.currentCompany?.companyId && company.companyType === 'TP' )

  useEffect(() => {
    getDrawerContentData();
  }, []);

  if (isLoading || !accessLevels)
    return (
      <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
    );

  return (
    <Container>
      <Header>
        <Logo
          resizeMode="contain"
          source={
            companyImage
              ? { uri: companyImage }
              : require("../../assets/images/app-icon.png")
          }
        />

        <HeaderTextDiv>
          <CompanyName>
            {accessLevels?.currentCompany?.companyName}
          </CompanyName>
          <AccessLevel>
            {accessLevels?.currentCompany?.accessLevel}
          </AccessLevel>
        </HeaderTextDiv>
      </Header>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        {companies?.length > 0 && (
          <>
          <Title>Empresas</Title>
          {companies.map((company) => (
              <DrawerItem
                key={company.companyId}
                label={company.companyName}
                labelStyle={{
                  color: THEME.colors.primary,
                  fontFamily: THEME.fonts.medium,
                  margin: 0.05,
                }}
                onPress={() =>
                  handleSelectCompany(company.companyId.toString())
                }
              />
          ))}
          </>
        )}

        {companiesPartTime?.length > 0 && (
          <>
          <TitleSecond>Part Time</TitleSecond>
          {companiesPartTime.map((company) => (
                <DrawerItem
                  key={company.companyId}
                  label={company.companyName}
                  labelStyle={{
                    color: THEME.colors.primary,
                    fontFamily: THEME.fonts.medium,
                    margin: 0.05,
                  }}
                  onPress={() =>
                    handleSelectCompany(company.companyId.toString())
                  }
                />
            ))}
          </>
        )}
      </DrawerContentScrollView>
    </Container>
  );
}
