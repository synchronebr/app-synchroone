import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";

import WarnIcon from "../../assets/icons/warn.svg";
import DangerIcon from "../../assets/icons/danger.svg";

import { AlertCardProps } from "./types";

import {
  Container,
  Content,
  Scroll,
  Divider,
  HeaderDiv,
  HeaderDivTitle,
  HeaderTitle,
  HeaderDescription,
  Title,
  AccordionSolutionDiv,
} from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import AccordionSolution from "../../components/Pages/AlertPrescriptionDetails/AccordionSolution";
import { enums } from "../../utils/enums";
import { t } from "i18next";
import Header from "../../components/Pages/Header";

export function AlertPrescriptionDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as AlertCardProps;
  const { data, securityStatus } = params;

  const THEME = useTheme();
  console.log('securityStatus',securityStatus)

  return (
    <Container>
      <Header
        title={t("index.prescription")}
        backIcon="back"
        backPress={() => navigation.goBack()}
      />
      <Content>
        <HeaderDiv>
          <HeaderDivTitle>
            { securityStatus === enums.Status.Warning && (<WarnIcon fill={THEME.colors.warning} />) }
            { securityStatus === enums.Status.Danger && (<DangerIcon fill={THEME.colors.danger} />) }
            
            <HeaderTitle>{data.causesType.title}</HeaderTitle>
          </HeaderDivTitle>
          
          <HeaderDescription>{data.causesType.description}</HeaderDescription>
        </HeaderDiv>

        <Divider />

        <Title>{t('index.recommendedInspections')}</Title>
        <Scroll>
          {data.solutions?.map(solution => (
            <AccordionSolutionDiv>
            <AccordionSolution 
              key={solution.solutionType.id}
              viewKey={`accordion-${solution.solutionType.id}`}
              title={solution.solutionType.title} 
              description={solution.solutionType.description} 
            />
            </AccordionSolutionDiv>
          ))}
        </Scroll>
      </Content>
    </Container>
  );
}
