import React from "react";

import { WeekDayFilter } from "../../components/WeekDayFilter";
import { HistoryCard } from "../../components/HistoryCard";

import { Container, WeekDayFilterContainer, Scroll } from "./styles";

export function AlertsHistory() {
  return (
    <Container>
      <WeekDayFilterContainer>
        <WeekDayFilter />
      </WeekDayFilterContainer>

      <Scroll>
        <HistoryCard isLastCard type="danger" />
        <HistoryCard type="warning" />
        <HistoryCard type="warning" />
        <HistoryCard type="success" />
        <HistoryCard type="success" />
        <HistoryCard type="success" />
      </Scroll>
    </Container>
  );
}
