import React from "react";

import { ManualCard } from "../../components/ManualCard";

import { Container, List } from "./styles";

export function Manuals() {
  const manuais = [
    "Manual 1",
    "Manual 2",
    "Manual 3",
    "Manual 4",
    "Manual 5",
    "Manual 6",
    "Manual 7",
    "Manual 8",
    "Manual 9",
    "Manual 10",
  ];

  return (
    <Container>
      <List
        data={manuais}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <ManualCard title={item} />}
      />
    </Container>
  );
}
