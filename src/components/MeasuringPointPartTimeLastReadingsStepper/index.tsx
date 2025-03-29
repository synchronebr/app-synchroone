import React from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import DynamicIcon from "../DynamicIcon";

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

// const CleanListWithStepper = ({ children, style }) => {
//   return <Container style={style}>{children}</Container>;
// };

const statusMapping = {
  D: { color: "#EF4444", title: "Perigo", iconName: "siren" },
  S: { color: "#10B981", title: "Seguro", iconName: "check-icon" },
  W: { color: "#F59E0B", title: "Alarme", iconName: "alert-triangle" },
  default: { color: "#64748B", title: "Offline", iconName: "minus-circled" },
};

export const MeasuringPointPartTimeLastReadingsStepper = ({ status, date, doneBy, lastOne=false }) => {
  const statusDetails = statusMapping[status] || statusMapping.default;

  return (
    <Container>
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
      </ItemContainer>
      {!lastOne && (
        <StepperContainer>
          <StepperLine />
        </StepperContainer>
      )}
    </Container>
  );
};
