import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useBLEManager } from "../../hooks/useBLEManager";

import { Dropdown } from "../../components/Dropdown";
import { PickerData } from "../../components/Dropdown/types";
import { MinutesIntervalButton } from "../../components/MinutesIntervalButton";
import { Button } from "../../components/Button";
import Select from "../../components/Select";
import { FormData } from "./types";

import {
  Container,
  Scroll,
  Form,
  DropdownWrapper,
  Text,
  MinutesInterval,
  ButtonWrapper,
  Content,
  ButtonTryAgain,
} from "./styles";
import { Loading } from "../../components/Loading";
import { getCompaniesForSelect } from "../../services/Companies";
import { getAreasForSelect } from "../../services/Companies/Areas";
import { getSectorsForSelect } from "../../services/Companies/Areas/Sectors";
import { getMachinesForSelect } from "../../services/Companies/Areas/Sectors/Machines";
import { getPiecesForSelect } from "../../services/Companies/Areas/Sectors/Machines/Pieces";
import { getMeasuringPointsForSelect } from "../../services/Companies/Areas/Sectors/Machines/Pieces/MeasuringPoints";
import api from "../../services/api";
import { Toast } from "react-native-toast-notifications";

export function ConfigureParameters( { route } ) {
  const THEME = useTheme();
  const navigation = useNavigation();
  const { allowed, isLoading, connectedDevice, getPermissions, scanDevices, sendCommand, disconnectDevice } = useBLEManager();
  const [interval, setInterval] = useState(60);
  const [data, setData] = useState({ companyId: 0, areaId: 0, sectorId: 0, machineId: 0, pieceId: 0, measuringPointId: 0 });
  const [companies, setCompanies] = useState([] as any[]);
  const [areas, setAreas] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [machines, setMachines] = useState([]);
  const [pieces, setPieces] = useState([]);
  const [measuringPoints, setMeasuringPoints] = useState([]);
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  const getCompanies = async () => {
    const companiesGet = await getCompaniesForSelect();
    setCompanies(companiesGet);
  }

  useEffect(() => {
    getCompanies();
    verifyConnecton()
  }, [])

  const handleChangeCompanies = async (value: any) => {
    const id = Number(value);
    const items = await getAreasForSelect(Number(value));
    setAreas(items);
    setData((old) => ({ ...old, companyId: id }));
  }

  const handleChangeAreas = async (value: any) => {
    const id = Number(value);
    const items = await getSectorsForSelect(data.companyId, id);
    setSectors(items);
    setData((old) => ({ ...old, areaId: id }));
  }

  const handleChangeSector = async (value: any) => {
    const id = Number(value);
    const items = await getMachinesForSelect(data.companyId, data.areaId, id);
    setMachines(items);
    setData((old) => ({ ...old, sectorId: id }));
  }

  const handleChangeMachine = async (value: any) => {
    const id = Number(value);
    const items = await getPiecesForSelect(data.companyId, data.areaId, data.sectorId, id);
    setPieces(items);
    console.log(items)
    setData((old) => ({ ...old, machineId: id }));
  }

  const handleChangePiece = async (value: any) => {
    const id = Number(value);
    const items = await getMeasuringPointsForSelect(data.companyId, data.areaId, data.sectorId, data.machineId, id);
    setMeasuringPoints(items);
    setData((old) => ({ ...old, pieceId: id }));
  }

  const handleChangeMeasuringPoint = async (value: any) => {
    const id = Number(value);
    setData((old) => ({ ...old, measuringPointId: id }));
  }

  const sendCommands = async () => {
    console.log(connectedDevice)
    if (!await connectedDevice.isConnected()) {
      await connectedDevice.connect()
    } 
    
    await connectedDevice.discoverAllServicesAndCharacteristics();
    sendCommand(connectedDevice, "SSYNC-OK");
    sendCommand(connectedDevice, `SN:${route.params.bluetoothDeviceName}`);
    // sendCommand(connectedDevice, "SN:A55EAC");
    sendCommand(connectedDevice, "PASS:5enh@SYNC24");
    sendCommand(connectedDevice, `SYNC-TD:${interval}`);
    // sendCommand(connectedDevice, `SYNC-TD:1`);
    sendCommand(connectedDevice, "SYNC-STH:100");
    sendCommand(connectedDevice, "SYNC-SM:10");
    sendCommand(connectedDevice, "SYNC-SI:300");
    sendCommand(connectedDevice, "SYNC-SME:10");
    sendCommand(connectedDevice, "SYNC-SB:10");
    sendCommand(connectedDevice, "SYNC-TPB:10");
    sendCommand(connectedDevice, "SYNC-TBLE:30");
    sendCommand(connectedDevice, "SYNC-FS:16");
    sendCommand(connectedDevice, "SYNC-BW:00");
    sendCommand(connectedDevice, "SYNC-AVD:123");
    sendCommand(connectedDevice, "SYNC-FINISH");
  }

  const verifyConnecton = async () => {
    if (!allowed) await getPermissions();
    const connectedByScan = await scanDevices(route.params.bluetoothDeviceName);
  }

  const schema = yup.object().shape({
    companyId: yup.string().required("Empresa é obrigatório"),
    areaId: yup.string().required("Area é obrigatório"),
    sectorId: yup.string().required("Setor é obrigatório"),
    machineId: yup.string().required("Máquina é obrigatório"),
    pieceId: yup.string().required("Peça é obrigatório"),
    measuringPointId: yup.string().required("Empresa é obrigatório"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleFormSubmit(formData: FormData) {
    setIsLoadingPost(true);

    try {
      await sendCommands()

      const url = `companies/${formData.companyId}/devices/${route.params.bluetoothDeviceName}/set-up`;
      // const url = `companies/${formData.companyId}/devices/SSYNC-AAA1/set-up`;
      const request = await api.post(url, {
        measuringPointId: Number(formData.measuringPointId),
        readingWindow: interval,
        scale: 16,
      });

      // console.log(request);
      Toast.show(
        "Novo sensor configurado com sucesso!",
        { type: "success" }
      );

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" as never }],
      });
      navigation.navigate("Home")
    } catch (error) {
      Toast.show(
        "Ocorreu um erro ao tentar configurar o sensor. Por favor, tente novamente.",
        { type: "danger" }
      );
      setIsLoadingPost(false);
      console.log(error)
    }
  }

  const handleTryConnectionDevice = async () => {
    await disconnectDevice();
    await scanDevices(route.params.bluetoothDeviceName);
  }

  return (
    <Container>
      {isLoading && (
        <Loading bgColor={'transparent'} color={THEME.colors.primary} />
      )}

      {!isLoading && !connectedDevice && (
        <Content>
          <Text>Não foi possível conectar com o sensor {route.params.bluetoothDeviceName}</Text>

          <ButtonTryAgain>
            <Button
              title="Tentar novamente"
              onPress={() => handleTryConnectionDevice()}
              // loading={isLoadingPost}
            />
          </ButtonTryAgain>
        </Content>
      )}

      {!isLoading && connectedDevice && (
        <Scroll>
        <Form>
          <DropdownWrapper>
            <Controller
              name="companyId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select 
                  editable 
                  values={companies}
                  selected={value}
                  onSelect={(value) => {onChange(value);handleChangeCompanies(value)}}
                  label="Empresa" 
                  error={errors?.companyId?.message}
                  errorTextColor={THEME.colors.danger}
                  placeholder="Selecione uma empresa"
                />
              )}
            />
          </DropdownWrapper>

          <DropdownWrapper>
            <Controller
                name="areaId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select 
                    editable 
                    values={areas}
                    selected={value}
                    onSelect={(value) => {onChange(value);handleChangeAreas(value)}}
                    label="Área" 
                    error={errors?.companyId?.message}
                    errorTextColor={THEME.colors.danger}
                    placeholder="Selecione uma area"
                  />
                )}
              />
          </DropdownWrapper>

          <DropdownWrapper>
            <Controller
              name="sectorId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select 
                  editable 
                  values={sectors}
                  selected={value}
                  onSelect={(value) => {onChange(value);handleChangeSector(value)}}
                  label="Setor" 
                  error={errors?.companyId?.message}
                  errorTextColor={THEME.colors.danger}
                  placeholder="Selecione uma setor"
                />
              )}
            />
          </DropdownWrapper>

          <DropdownWrapper>
            <Controller
              name="machineId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select 
                  editable 
                  values={machines}
                  selected={value}
                  onSelect={(value) => {onChange(value);handleChangeMachine(value)}}
                  label="Máquina" 
                  error={errors?.companyId?.message}
                  errorTextColor={THEME.colors.danger}
                  placeholder="Selecione uma máquina"
                />
              )}
            />
          </DropdownWrapper>

          <DropdownWrapper>
            <Controller
              name="pieceId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select 
                  editable 
                  values={pieces}
                  selected={value}
                  onSelect={(value) => {onChange(value);handleChangePiece(value)}}
                  label="Ativo" 
                  error={errors?.companyId?.message}
                  errorTextColor={THEME.colors.danger}
                  placeholder="Selecione uma ativo"
                />
              )}
            />
          </DropdownWrapper>

          <DropdownWrapper>
            <Controller
              name="measuringPointId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select 
                  editable 
                  values={measuringPoints}
                  selected={value}
                  onSelect={(value) => {onChange(value);handleChangeMeasuringPoint(value)}}
                  label="Ponto de Medição" 
                  error={errors?.companyId?.message}
                  errorTextColor={THEME.colors.danger}
                  placeholder="Selecione uma ponto de medição"
                />
              )}
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
            title="Salvar"
            onPress={handleSubmit(handleFormSubmit)}
            loading={isLoadingPost}
          />
        </ButtonWrapper>
      </Scroll>
      )}
    </Container>
  );
}
