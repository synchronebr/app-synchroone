import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";

import WarnIcon from "../../assets/icons/warn.svg";
import DangerIcon from "../../assets/icons/danger.svg";

import { AlertCardProps } from "./types";

import {
  Container,
  Scroll,
  Divider,
  HeaderDiv,
  Header,
  HeaderTitle,
  HeaderDescription,
  Title,
  AccordionSolutionDiv,
} from "./styles";
import { useRoute } from "@react-navigation/native";
import AccordionSolution from "../../components/Pages/AlertPrescriptionDetails/AccordionSolution";
import { enums } from "../../utils/enums";

export function AlertPrescriptionDetails() {
  const route = useRoute();
  const params = route.params as AlertCardProps;
  const { data, securityStatus } = params;

  const THEME = useTheme();
  console.log('securityStatus',securityStatus)

  return (
    <Container>
      <HeaderDiv>
        <Header>
          { securityStatus === enums.Status.Warning && (<WarnIcon fill={THEME.colors.gray} />) }
          { securityStatus === enums.Status.Danger && (<DangerIcon fill={THEME.colors.danger} />) }
          
          <HeaderTitle>{data.causesType.title}</HeaderTitle>
        </Header>
        
        <HeaderDescription>{data.causesType.description}</HeaderDescription>
      </HeaderDiv>

      <Divider />

      <Title>Inspeções recomendadas</Title>
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
    </Container>
  );
}
