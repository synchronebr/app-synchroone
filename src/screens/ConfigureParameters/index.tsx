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
import { getMeasuringPointsForSelect } from "../../services/Companies/Pieces/MeasuringPoints";
import api from "../../services/api";
import { Toast } from "react-native-toast-notifications";
import { getPathsForSelect } from "../../services/Companies/Paths";
import { useAccessLevels } from "../../hooks/useAccessLevels";
import { getPiecesForSelect } from "../../services/Companies/Pieces";
import { useAuth } from "../../hooks/useAuth";
import { t } from "i18next";

export function ConfigureParameters( { route } ) {
  const { user } = useAuth();
  const THEME = useTheme();
  const navigation = useNavigation();
  const { getAccessLevelsData } = useAccessLevels();
  const { currentCompany } = getAccessLevelsData();
  const { allowed, isLoading, connectedDevice, getPermissions, scanDevices, sendCommand, disconnectDevice } = useBLEManager();
  const [interval, setInterval] = useState(60);
  const [data, setData] = useState({ companyId: 0, pieceId: 0, measuringPointId: 0 });
  const [paths, setPaths] = useState([] as any[]);
  // const [pathsAux, setPathsAux] = useState([] as string[]);
  const [pathLevels, setPathLevels] = useState<any[][]>([]);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [pathFinished, setPathFinished] = useState(false);
  const [pieces, setPieces] = useState([]);
  const [measuringPoints, setMeasuringPoints] = useState([]);
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  const getLocation = async () => {
    const items = await getPathsForSelect(currentCompany?.companyId);
    setPathLevels([items]); 
    setSelectedPaths([""]);
    setData((old) => ({ ...old, companyId: currentCompany?.companyId }));

    const pieces = await getPiecesForSelect(currentCompany?.companyId);
    console.log(pieces)
    console.log('currentCompany?.companyId', currentCompany?.companyId)
    setPieces(pieces);
  }

  useEffect(() => {
    getLocation();
    verifyConnecton()
  }, [])

  const handleChangePathLevel = async (levelIndex: number, value: any) => {
    if (!value || value == '') return;
    if (selectedPaths[levelIndex] === value) return;
  
    const newSelectedPaths = [...selectedPaths];
    newSelectedPaths[levelIndex] = value;
    newSelectedPaths.splice(levelIndex + 1);
    setSelectedPaths(newSelectedPaths); 
  
    const newPathLevels = [...pathLevels];
    newPathLevels.splice(levelIndex + 1); 
    setPathLevels(newPathLevels);       
  
    const items = await getPathsForSelect(currentCompany?.companyId, Number(value));
  
    const pieces = await getPiecesForSelect(currentCompany?.companyId, Number(value));
    setPieces(pieces);

    if (!items || items.length === 0) {
      console.log('buscar pieces...')
      setPathFinished(true);
      return;
    }
  
    setPathLevels((prev) => {
      const updated = [...prev];
      updated[levelIndex + 1] = items;
      return updated;
    });

    setPathFinished(false);
  };

  const handleChangePiece = async (value: any) => {
    const id = Number(value);
    const items = await getMeasuringPointsForSelect(currentCompany?.companyId, id);
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
    await sendCommand(connectedDevice, "SSYNC-OK");
    await sendCommand(connectedDevice, `SN:${route.params.bluetoothDeviceName}`);
    await sendCommand(connectedDevice, "PASS:5enh@SYNC24");
    await sendCommand(connectedDevice, `SYNC-TD:${interval}`);
    await sendCommand(connectedDevice, "SYNC-STH:100");
    await sendCommand(connectedDevice, "SYNC-SM:10");
    await sendCommand(connectedDevice, "SYNC-SI:300");
    await sendCommand(connectedDevice, "SYNC-SME:10");
    await sendCommand(connectedDevice, "SYNC-SB:10");
    await sendCommand(connectedDevice, "SYNC-TPB:10");
    await sendCommand(connectedDevice, "SYNC-TBLE:30");
    await sendCommand(connectedDevice, "SYNC-FS:16");
    await sendCommand(connectedDevice, "SYNC-BW:00");
    await sendCommand(connectedDevice, "SYNC-AVD:123");
    await sendCommand(connectedDevice, "SYNC-FINISH");
  }

  const verifyConnecton = async () => {
    if (!allowed) await getPermissions();
    const connectedByScan = await scanDevices(route.params.bluetoothDeviceName);
  }

  const schema = yup.object().shape({
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

      const url = `companies/${currentCompany?.companyId}/devices/${route.params.bluetoothDeviceName}/set-up`;
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
        routes: [{ name: "HomeNew" as never }],
      });
      navigation.navigate("HomeNew")
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
          <Text>{route.params.bluetoothDeviceName}</Text>
          {pathLevels?.map((path, i) => (
            <DropdownWrapper key={i}>
              <Select
                editable
                values={path}
                selected={selectedPaths[i]}
                onSelect={(value) => handleChangePathLevel(i, value)}
                label={t('index.level', { level: i + 1 })}
                placeholder={t('index.selectLevel')}
              />
            </DropdownWrapper>
          ))}

          <Form>
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
                  error={errors?.pieceId?.message}
                  errorTextColor={THEME.colors.danger}
                  placeholder="Selecione uma ativo"
                />
              )}
            />
          </DropdownWrapper>
          
          {measuringPoints && measuringPoints.length > 0 && (
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
                    error={errors?.measuringPointId?.message}
                    errorTextColor={THEME.colors.danger}
                    placeholder="Selecione uma ponto de medição"
                  />
                )}
              />
            </DropdownWrapper>
          )}

          {measuringPoints && measuringPoints.length > 0 && (
            <>
            <Text>Intervalo de Medição (minutos)</Text>

            <MinutesInterval>
              { user && user.isAdmin && (
                <>
                <MinutesIntervalButton title="2" selected={interval===2} onPress={() => setInterval(2)}/>
                <MinutesIntervalButton title="5" selected={interval===5} onPress={() => setInterval(5)}/>
                </>
              ) }
              <MinutesIntervalButton title="10" selected={interval===10} onPress={() => setInterval(10)}/>
              <MinutesIntervalButton title="20" selected={interval===20} onPress={() => setInterval(20)}/>
              <MinutesIntervalButton title="30" selected={interval===30} onPress={() => setInterval(30)}/>
              <MinutesIntervalButton title="60" selected={interval===60} onPress={() => setInterval(60)}/>
              <MinutesIntervalButton title="120" selected={interval===120} onPress={() => setInterval(120)}/>
            </MinutesInterval>
            </>
          )}

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
