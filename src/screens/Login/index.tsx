import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "styled-components/native";
import * as yup from "yup";
import { Toast } from "react-native-toast-notifications";

import LogoWhiteIconIcon from "../../assets/icons/logo-white-text.svg";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/useAuth";

import { FormData } from "./types";
import {
  Scroll,
  Container,
  Content,
  Form,
  InputWrapper,
  ButtonWrapper,
  CreateAccountButton,
  CreateAccountButtonText,
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

export function Login() {
  const [isLogginIn, setIsLoggingIn] = useState(false);

  const passwordInputRef = useRef<TextInput>();
  const navigation = useNavigation();

  const THEME = useTheme();

  const { login } = useAuth();

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

    try {
      await login(formData);

      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" as never }],
      });
    } catch (error) {
      console.log(error)
      Toast.show(
        "Ocorreu um erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.",
        { type: "danger" }
      );
      setIsLoggingIn(false);
    }
  }

  return (
    <Scroll>
      <Container>
        <KeyboardAvoidingView behavior="position">
          {/* <Title>Synchroone</Title> */}
          <Content>
            <LogoWhiteIconIcon height={RFValue(50)} width={'100%'} />

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

              <CreateAccountButton onPress={() => navigation.navigate('Register')}>
                <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
              </CreateAccountButton>

              <ButtonWrapper>
                <Button
                  disabled={isLogginIn}
                  loading={isLogginIn}
                  onPress={handleSubmit(handleLogin)}
                  title="Entrar"
                />
              </ButtonWrapper>
            </Form>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    </Scroll>
  );
}
