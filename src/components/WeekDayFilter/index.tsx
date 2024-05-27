import React from "react";

import { Container, WeekDay, Day, Date } from "./styles";

export function WeekDayFilter() {
  return (
    <Container>
      <WeekDay>
        <Day>Seg</Day>
        <Date>11</Date>
      </WeekDay>

      <WeekDay>
        <Day isSelected={true}>Ter</Day>
        <Date isSelected={true}>12</Date>
      </WeekDay>

      <WeekDay>
        <Day>Qua</Day>
        <Date>13</Date>
      </WeekDay>

      <WeekDay>
        <Day>Qui</Day>
        <Date>14</Date>
      </WeekDay>

      <WeekDay>
        <Day>Sex</Day>
        <Date>15</Date>
      </WeekDay>

      <WeekDay>
        <Day>Sáb</Day>
        <Date>16</Date>
      </WeekDay>

      <WeekDay>
        <Day>Dom</Day>
        <Date>17</Date>
      </WeekDay>
    </Container>
  );
}
