import React from "react";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../hooks/useAuth";

import { Container, TextDiv, Text, SubText, ButtonWrapper } from "./styles";
import { ButtonDelete } from "../../components/ButtonDelete";
import { Alert } from "react-native";

export function MyData() {
  const navigation = useNavigation();

  const { user, deleteRegister } = useAuth();

  const handleDeleteUser = () => {
    Alert.alert(
      'Deletar cadastro',
      'Tem certeza que deseja deletar o seu cadastro?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK', 
          onPress: () => deleteRegister()
        },
      ],
      {cancelable: false},
    );
  }

  return (
    <Container>
      <TextDiv>
        <Text>Nome:</Text>
        <SubText>{user?.name}</SubText>
      </TextDiv>
      <TextDiv>
        <Text>Email:</Text>
        <SubText>{user?.email}</SubText>
      </TextDiv>
      <TextDiv>
        <Text>Telefone:</Text>
        <SubText>{user?.phone}</SubText>
      </TextDiv>

      <ButtonWrapper>
        <ButtonDelete onPress={handleDeleteUser} title="Deletar cadastro" />
      </ButtonWrapper>
    </Container>
  );
}
