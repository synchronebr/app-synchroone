import React, { useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";

import { useBLEManager } from "../../hooks/useBLEManager";

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
  Content,
} from "./styles";
import { Loading } from "../../components/Loading";

export function ConfigureParameters( { route } ) {
  const THEME = useTheme();
  const navigation = useNavigation();
  const { allowed, isLoading, connectedDevice, getPermissions, scanDevices, sendCommand } = useBLEManager();
  const [notFoundDevice, setNotFoundDevice] = useState(false);
  const [interval, setInterval] = useState(60);

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

  const sendCommands = async () => {
    console.log(connectedDevice)
    if (!await connectedDevice.isConnected()) {
      await connectedDevice.connect()
    } 
    
    await connectedDevice.discoverAllServicesAndCharacteristics();
    sendCommand(connectedDevice, "SSYNC-OK");
    // sendCommand(connectedDevice, `SN:${params.bluetoothDeviceName}`);
    sendCommand(connectedDevice, "SN:150993");
    sendCommand(connectedDevice, "PASS:150993");
    sendCommand(connectedDevice, `SYNC-TD:${interval}`);
    sendCommand(connectedDevice, "SYNC-STH:100");
    sendCommand(connectedDevice, "SYNC-SM:10");
    sendCommand(connectedDevice, "SYNC-SI:100");
    sendCommand(connectedDevice, "SYNC-SME:10");
    sendCommand(connectedDevice, "SYNC-SB:10");
    sendCommand(connectedDevice, "SYNC-TPB:10");
    sendCommand(connectedDevice, "SYNC-TBLE:30");
    sendCommand(connectedDevice, "SYNC-FINISH");
  }

  const handleSubmit = () => {
    sendCommands()
  }

  const verifyConnecton = async () => {
    if (!allowed) await getPermissions();
    const connectedByScan = await scanDevices(route.params.bluetoothDeviceName);
  }

  useEffect(() => {
    verifyConnecton()
  }, [])

  return (
    <Container>
      {isLoading && (
        <Loading bgColor={'transparent'} color={THEME.colors.primary} />
      )}

      {!isLoading && !connectedDevice && (
        <Content>
          <Text>Não foi possível encontrar o sensor {route.params.bluetoothDeviceName}, tente novamente</Text>
        </Content>
      )}

      {!isLoading && connectedDevice && (
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
            <MinutesIntervalButton title="10" selected={interval===10} onPress={() => setInterval(10)}/>
            <MinutesIntervalButton title="20" selected={interval===20} onPress={() => setInterval(20)}/>
            <MinutesIntervalButton title="30" selected={interval===30} onPress={() => setInterval(30)}/>
            <MinutesIntervalButton title="60" selected={interval===60} onPress={() => setInterval(60)}/>
            <MinutesIntervalButton title="120" selected={interval===120} onPress={() => setInterval(120)}/>
          </MinutesInterval>
        </Form>

        <ButtonWrapper>
          <Button
            title="Avançar"
            // onPress={() => navigation.navigate("ConfigureGateway" as never)}
            onPress={() => handleSubmit()}
          />
        </ButtonWrapper>
      </Scroll>
      )}
    </Container>
  );
}
