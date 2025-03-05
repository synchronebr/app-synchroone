import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";

import WarnIcon from "../../assets/icons/warn.svg";

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

export function AlertPrescriptionDetails() {
  const route = useRoute();
  const params = route.params as AlertCardProps;
  const { item } = params;

  const THEME = useTheme();

  return (
    <Container>
      <HeaderDiv>
        <Header>
          <WarnIcon fill={THEME.colors.gray} />
          <HeaderTitle>{item.causesType.title}</HeaderTitle>
        </Header>
        
        <HeaderDescription>{item.causesType.description}</HeaderDescription>
      </HeaderDiv>

      <Divider />

      <Title>Inspeções recomendadas</Title>
      <Scroll>
        {item.solutions?.map(solution => (
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
