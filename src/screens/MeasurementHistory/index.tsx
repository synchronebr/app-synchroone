import React from "react";

import { HistoryCard } from "../../components/HistoryCard";

import { Container, Scroll } from "./styles";

export function MeasurementHistory() {
  return (
    <Container>
      <Scroll>
        <HistoryCard type="danger" />
        <HistoryCard type="warning" />
        <HistoryCard type="warning" />
        <HistoryCard type="success" />
        <HistoryCard type="success" />
        <HistoryCard type="success" />
      </Scroll>
    </Container>
  );
}
