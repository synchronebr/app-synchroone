import React, { useState } from "react";

import { WeekDayFilter } from "../../components/WeekDayFilter";
import { HistoryCard } from "../../components/HistoryCard";
import { useTheme } from "styled-components/native";

import { Container, WeekDayFilterContainer, Scroll, List, Content, Text } from "./styles";
import api from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { IDiagnose } from "../../services/dtos/IDiagnose";
import { Loading } from "../../components/Loading";

export function AlertsHistory() {
  const THEME = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const diagnoses = useQuery<IDiagnose[]>({
    queryKey: ["diagnoses", false],
    queryFn: async () => {
      const response = await api.get('/diagnoses', {
        params: {
          read: false,
          startDate: selectedDate,
          endDate: selectedDate.setHours(23, 59, 59, 999),
        }
      });
      return response?.data?.data;
    },
  })  

  return (
    <Container>
      <WeekDayFilterContainer>
        <WeekDayFilter selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      </WeekDayFilterContainer>

      <Content>
        <List
          data={diagnoses.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <HistoryCard item={item} />}
          ListEmptyComponent={
            diagnoses.isLoading ? 
            <Loading bgColor={'transparent'} color={THEME.colors.primary} />
            :
            <Content>
                <Text>Felizmente não temos nenhum diagnóstico criado para essa data</Text>
            </Content>
          }
        />
      </Content>
    </Container>
  );
}
