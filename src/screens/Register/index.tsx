import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "styled-components/native";
import * as yup from "yup";
import { Toast } from "react-native-toast-notifications";
import Icon from '@expo/vector-icons/MaterialIcons';

import LogoWhiteIconIcon from "../../assets/icons/logo-white-text.svg";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/useAuth";
import { requestUser } from "../../services/Auth";

import { FormData } from "./types";
import {
  Scroll,
  Container,
  Content,
  Title,
  Form,
  InputWrapper,
  ButtonWrapper,
  CreateAccountButton,
  CreateAccountButtonText,
  IconBack,
} from "./styles";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);

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
    company: yup
      .string()
      .trim()
      .required("Empresa é obrigatório."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function register(form) {
    const { email, company } = form;

    const request = {
      email,
      company,
    };

    const response = await requestUser(request);
    const data = response.data;

    if (response.status === 200) {
      return true;
    }

    return false;
  }

  async function handleRegister(formData: FormData) {
    setIsLoading(true);

    try {
      const reqRegister = await register(formData);

      if (reqRegister) {
        Toast.show(
          "Enviamos sua solicitção pra nossa equipe, será avaliado e liberado seu acesso.",
          { type: "success" }
        );
  
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" as never }],
        });
      } else {
        Toast.show(
          "Ocorreu um erro ao criar sua conta. Por favor, tente novamente mais tarde.",
          { type: "danger" }
        );
      }
    } catch (error) {
      Toast.show(
        "Ocorreu um erro ao criar sua conta. Por favor, tente novamente mais tarde.",
        { type: "danger" }
      );
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  return (
    <Scroll>
      <Container>
        <KeyboardAvoidingView behavior="position">
          {/* <Title>Synchroone</Title> */}
          <Content>
            <IconBack onPress={() => navigation.navigate('Login' as never)}>
              <Icon name="arrow-back" color="#ffffff" size={30} />
            </IconBack>

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
                        editable={!isLoading}
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
                  name="company"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={!isLoading}
                        error={errors?.email?.message}
                        errorTextColor={THEME.colors.light}
                        label="Empresa"
                        labelColor={THEME.colors.light}
                        onChangeText={onChange}
                        onSubmitEditing={() => handleSubmit(handleRegister)}
                        placeholder="Insira o nome de sua empresa"
                        value={value}
                      />
                    </>
                  )}
                />
              </InputWrapper>

              <ButtonWrapper>
                <Button
                  disabled={isLoading}
                  loading={isLoading}
                  onPress={handleSubmit(handleRegister)}
                  title="Solicitar conta"
                />
              </ButtonWrapper>
            </Form>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    </Scroll>
  );
}
