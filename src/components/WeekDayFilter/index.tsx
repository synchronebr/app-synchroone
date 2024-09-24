import React from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { ptBR } from 'date-fns/locale';

import { Container, WeekDay, Day, DateDiv } from "./styles";
import { View } from "react-native";

interface IWeekDayFilterProps {
  selectedDate: Date; 
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function WeekDayFilter({ selectedDate, setSelectedDate }: IWeekDayFilterProps) {
  const today = format(selectedDate, 'EEE', { locale: ptBR }); // 'ter' para terça-feira, por exemplo
  const weekStart = startOfWeek(new Date(), { locale: ptBR });

  const days = Array.from({ length: 7 }).map((_, i) =>
    addDays(weekStart, i)
  );

  return (
    <Container>
      {days.map((day, index) => (
        <WeekDay key={index} onPress={() => {setSelectedDate(day)}}>
            <Day isSelected={format(day, 'EEE', { locale: ptBR }) === today}>{format(day, 'EEE', { locale: ptBR }).toUpperCase().slice(0, 3)}</Day>
            <DateDiv isSelected={format(day, 'EEE', { locale: ptBR }) === today}>{format(day, 'dd')}</DateDiv>
        </WeekDay>
      ))}
    </Container>
  );
}
