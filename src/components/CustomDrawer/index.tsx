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

import { Container, Header, Logo, CompanyName, AccessLevel } from "./styles";

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

  useEffect(() => {
    getDrawerContentData();
  }, []);

  if (isLoading || !accessLevels)
    return (
      <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
    );

  return (
    <Container>
      <DrawerContentScrollView {...props}>
        <Header>
          <Logo
            resizeMode="contain"
            source={
              companyImage
                ? { uri: companyImage }
                : require("../../assets/images/app-icon.png")
            }
          />

          <CompanyName>{accessLevels?.currentCompany?.companyName}</CompanyName>
          <AccessLevel>{accessLevels?.currentCompany?.accessLevel}</AccessLevel>
        </Header>

        <DrawerItemList {...props} />

        {accessLevels &&
          accessLevels?.companies
            .filter(
              (company) =>
                company.companyId !== accessLevels?.currentCompany?.companyId
            )
            .map((company) => (
              <DrawerItem
                label={company.companyName}
                labelStyle={{
                  color: THEME.colors.primary,
                  fontFamily: THEME.fonts.medium,
                }}
                onPress={() =>
                  handleSelectCompany(company.companyId.toString())
                }
              />
            ))}
      </DrawerContentScrollView>
    </Container>
  );
}
