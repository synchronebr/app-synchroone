import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { FormData } from "./types";
import {
  Container,
  Scroll,
  Title,
  Form,
  InputWrapper,
  ButtonWrapper,
} from "./styles";
import { useTheme } from "styled-components/native";

export function Login() {
  const [isLogginIn, setIsLoggingIn] = useState(false);

  const passwordInputRef = useRef<TextInput>();

  const THEME = useTheme();

  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required("E-mail obrigatório.")
      .email("E-mail inválido."),
    password: yup.string().trim().required("Senha obrigatória."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleLogin(formData: FormData) {
    setIsLoggingIn(true);

    setIsLoggingIn(false);
  }

  return (
    <Container>
      <Scroll>
        <Title>Synchroone</Title>

        <Form>
          <InputWrapper>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLogginIn}
                    error={errors?.email?.message}
                    errorTextColor={THEME.colors.light}
                    label="E-mail"
                    labelColor={THEME.colors.light}
                    onChangeText={onChange}
                    onSubmitEditing={() => passwordInputRef.current.focus()}
                    placeholder="Insira seu e-mail"
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
                    editable={!isLogginIn}
                    error={errors?.password?.message}
                    errorTextColor={THEME.colors.light}
                    label="Senha"
                    labelColor={THEME.colors.light}
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(handleLogin)}
                    placeholder="Insira sua senha"
                    secureTextEntry
                    ref={passwordInputRef}
                    value={value}
                  />
                </>
              )}
            />
          </InputWrapper>

          <ButtonWrapper>
            <Button
              disabled={isLogginIn}
              loading={isLogginIn}
              onPress={handleSubmit(handleLogin)}
              title="Entrar"
            />
          </ButtonWrapper>
        </Form>
      </Scroll>
    </Container>
  );
}
