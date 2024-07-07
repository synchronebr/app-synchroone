import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Dropdown } from "../../components/Dropdown";
import { PickerData } from "../../components/Dropdown/types";
import { MinutesIntervalButton } from "../../components/MinutesIntervalButton";
import { Button } from "../../components/Button";

import {
  Container,
  Scroll,
  Form,
  DropdownWrapper,
  Text,
  MinutesInterval,
  ButtonWrapper,
} from "./styles";

export function ConfigureParameters() {
  const navigation = useNavigation();

  const areaData: PickerData[] = [
    {
      label: "Selecione a área",
      value: "1",
    },
  ];

  const sectorData: PickerData[] = [
    {
      label: "Selecione o setor",
      value: "1",
    },
  ];

  const machineData: PickerData[] = [
    {
      label: "Selecione a máquina",
      value: "1",
    },
  ];

  const assetData: PickerData[] = [
    {
      label: "Selecione o ativo",
      value: "1",
    },
  ];

  const measurementPointData: PickerData[] = [
    {
      label: "Selecione o ponto de medição",
      value: "1",
    },
  ];

  return (
    <Container>
      <Scroll>
        <Form>
          <DropdownWrapper>
            <Dropdown editable data={areaData} label="Área" />
          </DropdownWrapper>

          <DropdownWrapper>
            <Dropdown editable data={sectorData} label="Setor" />
          </DropdownWrapper>

          <DropdownWrapper>
            <Dropdown editable data={machineData} label="Máquina" />
          </DropdownWrapper>

          <DropdownWrapper>
            <Dropdown editable data={assetData} label="Ativo" />
          </DropdownWrapper>

          <DropdownWrapper>
            <Dropdown
              editable
              data={measurementPointData}
              label="Ponto de Medição"
            />
          </DropdownWrapper>

          <Text>Intervalo de Medição (minutos)</Text>

          <MinutesInterval>
            <MinutesIntervalButton title="10" />
            <MinutesIntervalButton title="20" />
            <MinutesIntervalButton title="30" />
            <MinutesIntervalButton title="60" />
            <MinutesIntervalButton title="120" />
          </MinutesInterval>
        </Form>

        <ButtonWrapper>
          <Button
            title="Avançar"
            onPress={() => navigation.navigate("ConfigureGateway" as never)}
          />
        </ButtonWrapper>
      </Scroll>
    </Container>
  );
}
