import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import WifiIcon from "../../assets/icons/wifi.svg";
import NetworkIcon from "../../assets/icons/network.svg";
import NetworkCableIcon from "../../assets/icons/network-cable.svg";

import { ConnectionTypeButton } from "../../components/ConnectionTypeButton";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { FormData } from "./types";
import {
  Scroll,
  Container,
  ConnectionButtons,
  Inputs,
  InputWrapper,
  ButtonWrapper,
} from "./styles";

export function ConfigureGateway() {
  const [isActive, setIsActive] = useState<string | number>(null);

  const passwordInputRef = useRef<TextInput>();

  const schema = yup.object().shape({
    ssid: yup.string().trim().required("SSID obrigatório."),
    password: yup.string().trim().required("Senha obrigatória."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleAdvance(formData: FormData) {
    console.log(formData);
  }

  return (
    <Scroll>
      <Container>
        <KeyboardAvoidingView behavior="position">
          <ConnectionButtons>
            <ConnectionTypeButton
              onPress={() => setIsActive(1)}
              icon={WifiIcon}
              title="WI-FI"
              isActive={isActive === 1}
            />
            <ConnectionTypeButton
              onPress={() => setIsActive(2)}
              icon={NetworkIcon}
              title="4G"
              isActive={isActive === 2}
            />
            <ConnectionTypeButton
              onPress={() => setIsActive(3)}
              icon={NetworkCableIcon}
              title="Cabo"
              isActive={isActive === 3}
            />
          </ConnectionButtons>

          <Inputs>
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
                      onSubmitEditing={handleSubmit(handleAdvance)}
                      ref={passwordInputRef}
                      placeholder="Senha"
                      value={value}
                    />
                  </>
                )}
              />
            </InputWrapper>
          </Inputs>

          <ButtonWrapper>
            <Button onPress={handleSubmit(handleAdvance)} title="Avançar" />
          </ButtonWrapper>
        </KeyboardAvoidingView>
      </Container>
    </Scroll>
  );
}
