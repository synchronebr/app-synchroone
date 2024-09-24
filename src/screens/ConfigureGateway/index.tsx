import React, { useRef, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import WifiIcon from "../../assets/icons/wifi.svg";
import NetworkIcon from "../../assets/icons/network.svg";
import NetworkCableIcon from "../../assets/icons/network-cable.svg";

import { Input } from "../../components/Input";
import { useBLEManager } from "../../hooks/useBLEManager";

import { Button } from "../../components/Button";

import api from "../../services/api";
import { Toast } from "react-native-toast-notifications";

import { FormData } from "./types";
import {
  Scroll,
  Container,
  ConnectionButtons,
  Inputs,
  InputWrapper,
  ButtonWrapper,
} from "./styles";
import { KeyboardAvoidingView } from "react-native";
import { ConnectionTypeButton } from "../../components/ConnectionTypeButton";
import { TextInput } from "react-native-gesture-handler";

export function ConfigureGateway( { route } ) {
  const THEME = useTheme();
  const navigation = useNavigation();
  const { allowed, isLoading, connectedDevice, getPermissions, scanDevices, sendCommand } = useBLEManager();
  const [interval, setInterval] = useState(60);
  const [data, setData] = useState({ companyId: 0, areaId: 0, sectorId: 0, machineId: 0, pieceId: 0, measuringPointId: 0 });
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [isActive, setIsActive] = useState<string | number>(1);
  const passwordInputRef = useRef<TextInput>();

  const sendCommands = async (ssid, password) => {
    console.log(connectedDevice)
    if (!await connectedDevice.isConnected()) {
      await connectedDevice.connect()
    } 
    
    await connectedDevice.discoverAllServicesAndCharacteristics();
    sendCommand(connectedDevice, "SSYNC-OK#end");
    sendCommand(connectedDevice, `SN:${route.params.bluetoothDeviceName}#end`);
    sendCommand(connectedDevice, "PASS:5enh@SYNC24#end");
    sendCommand(connectedDevice, `SYNC-TD:10#end`);
    sendCommand(connectedDevice, "SYNC-MODE:1#end");
    sendCommand(connectedDevice, "SSID:${ssid}#end");
    sendCommand(connectedDevice, "PS:${password}#end");
    sendCommand(connectedDevice, "URL1:https://sensors.synchroone.com/sensors#end");
    sendCommand(connectedDevice, "URL2:https://sensors.synchroone.com/sensors/api_key#end");
    sendCommand(connectedDevice, "URL2:https://sensors.synchroone.com/sensors/gateways#end");
    sendCommand(connectedDevice, "API-KEY:d554752e-4e64-4efw-ac2d-d1vv996f627a#end");
    sendCommand(connectedDevice, "PORT:3334#end");
    sendCommand(connectedDevice, "APN:teste.com.br#end");
    sendCommand(connectedDevice, "SYNC-TPB:10#end");
    sendCommand(connectedDevice, "SYNC-TBLE:30#end");
    sendCommand(connectedDevice, "SYNC-FINISH#end");
  }

  const verifyConnecton = async () => {
    if (!allowed) await getPermissions();
    const connectedByScan = await scanDevices(route.params.bluetoothDeviceName);
  }

  useEffect(() => {
    verifyConnecton()
  }, [])

  const schema = yup.object().shape({
    isActive: yup.number(),
    ssid: yup.string().trim().test(
      'ssid-required',  
      "SSID é obrigatório", 
      function(value) {  
        return this.parent.isActive !== 1 || !!value;
      }
    ),
    password: yup.string().test(
      'password-required',  
      "Senha é obrigatória",  
      function(value) { 
        return this.parent.isActive !== 1 || !!value;
      }
    ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: 1,  
      ssid: '',     
      password: ''  
    }
  });

  async function handleFormSubmit(formData: FormData) {
    setIsLoadingPost(true);

    try {
      // await sendCommands(formData.ssid, formData.password)

      const url = `devices/${route.params.bluetoothDeviceName}/gateways/set-up`;
      // const url = `companies/${formData.companyId}/devices/SSYNC-AAA1`;
      const request = await api.post(url, {
        connectionType: formData.isActive,
      });

      Toast.show(
        "Novo gateway configurado com sucesso!",
        { type: "success" }
      );

      navigation.navigate("Home" as never);
    } catch (error) {
      Toast.show(
        "Ocorreu um erro ao tentar configurar o sensor. Por favor, tente novamente.",
        { type: "danger" }
      );
      setIsLoadingPost(false);
      console.log(error)
    }
  }

  return (
    <Scroll>
      <Container>
        <KeyboardAvoidingView behavior="position">

        <Controller
                name="isActive"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ConnectionButtons>
                    <ConnectionTypeButton
                      onPress={() => {setIsActive(1);onChange(1)}}
                      icon={WifiIcon}
                      title="WI-FI"
                      isActive={isActive === 1}
                    />
                    <ConnectionTypeButton
                      onPress={() => {setIsActive(2);onChange(2)}}
                      icon={NetworkIcon}
                      title="4G"
                      isActive={isActive === 2}
                    />
                    <ConnectionTypeButton
                      onPress={() => {setIsActive(3);onChange(3)}}
                      icon={NetworkCableIcon}
                      title="Cabo"
                      isActive={isActive === 3}
                    />
                  </ConnectionButtons>
                )}
              />

          <Inputs>
          {isActive === 1 && (
            <>
            <InputWrapper>
              <Controller
                name="ssid"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      error={errors?.ssid?.message}
                      label="SSID"
                      onChangeText={onChange}
                      onSubmitEditing={() => passwordInputRef.current.focus()}
                      placeholder="SSID"
                      value={value}
                    />
                  </>
                )}
              />
            </InputWrapper>

            <InputWrapper>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      error={errors?.password?.message}
                      label="Senha"
                      onChangeText={onChange}
                      onSubmitEditing={handleSubmit(handleFormSubmit)}
                      ref={passwordInputRef}
                      placeholder="Senha"
                      value={value}
                    />
                  </>
                )}
              />
            </InputWrapper>
            </>
          )}
          </Inputs>


          <ButtonWrapper>
            <Button onPress={handleSubmit(handleFormSubmit)} title="Avançar" />
          </ButtonWrapper>
        </KeyboardAvoidingView>
      </Container>
    </Scroll>
  );
}
