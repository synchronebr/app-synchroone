import React from "react";
import styled, { useTheme } from "styled-components/native";
import { View, Text } from "react-native";
import DynamicIcon from "../DynamicIcon";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  ItemContainer,
  LeftContainer,
  StatusIconContainer,
  InfoContainer,
  InfoText,
  BoldText,
  DateText,
  StepperContainer,
  StepperLine,
} from "./styles";

import { MeasurementPointCardNavigationProps } from "./types";
import ArrowForwardIcon from "../../assets/icons/arrow-forward.svg";

// const CleanListWithStepper = ({ children, style }) => {
//   return <Container style={style}>{children}</Container>;
// };

const statusMapping = {
  D: { color: "#EF4444", title: "Perigo", iconName: "siren" },
  S: { color: "#10B981", title: "Seguro", iconName: "check-icon" },
  W: { color: "#F59E0B", title: "Alarme", iconName: "alert-triangle" },
  default: { color: "#64748B", title: "Offline", iconName: "minus-circled" },
};

export const MeasuringPointPartTimeLastReadingsStepper = ({ id, status, date, doneBy, lastOne=false, diagnoseId=undefined }) => {
  const navigation = useNavigation<MeasurementPointCardNavigationProps>();
  const statusDetails = statusMapping[status] || statusMapping.default;

  const THEME = useTheme();

  const navigateToDiagnose = (diagnoseId) => {
    console.log('teste..1')
    if (diagnoseId) {
      console.log('teste..2')
      navigation.navigate("AlertDetails", { id: diagnoseId })
    } else {
      console.log('teste..3')
    }
  }

  return (
    <Container onPress={() => navigateToDiagnose(diagnoseId)}>
      <ItemContainer>
        <LeftContainer>
          <StatusIconContainer color={statusDetails.color}>
            <DynamicIcon iconName={statusDetails.iconName} size={16} color="white" />
          </StatusIconContainer>
          <InfoContainer>
            <InfoText>
              <BoldText>{doneBy}</BoldText> 
            </InfoText>
            <InfoText>
              <BoldText>Status da Medição:</BoldText> {statusDetails.title}
            </InfoText>
            <InfoText>
              {date}
            </InfoText>
          </InfoContainer>
        </LeftContainer>
        {diagnoseId && (
        <ArrowForwardIcon 
          fill={THEME.colors.primary} 
          height={12} 
          width={12} 
        />
        )}
      </ItemContainer>
      {!lastOne && (
        <StepperContainer>
          <StepperLine />
        </StepperContainer>
      )}
    </Container>
  );
};
