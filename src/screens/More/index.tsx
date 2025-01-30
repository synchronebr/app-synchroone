import React from "react";
import { useNavigation } from "@react-navigation/native";
import DeviceInfo from 'react-native-device-info';

import LabProfileIcon from "../../assets/icons/lab-profile.svg";
import HelpIcon from "../../assets/icons/help.svg";
import InfoIcon from "../../assets/icons/info.svg";

import { SettingButton } from "../../components/SettingButton";

import { useAuth } from "../../hooks/useAuth";

import { Container, Buttons } from "./styles";
import { Alert } from "react-native";

export function More() {
  const navigation = useNavigation();

  const { logout } = useAuth();

  async function handleLogout() {
    await logout();

    navigation.reset({
      index: 0,
      routes: [{ name: "Auth" as never }],
    });
  }

  async function showAbout() {
    const version = DeviceInfo.getVersion(); // Gets version from native files
    const buildNumber = DeviceInfo.getBuildNumber(); // Gets the build number

    Alert.alert(
      'Sobre',
      'Versão: '+version,
      [
        {
          text: 'OK', 
          onPress: () => {}
        },
      ],
      {cancelable: false},
    );
  }

  return (
    <Container>
      <Buttons>
        {/* <SettingButton
          onPress={() => navigation.navigate("Manuals" as never)}
          icon={() => (
            <LabProfileIcon height={RFValue(17)} width={RFValue(14)} />
          )}
          title="Acessar Manuais"
        /> */}
        {/* <SettingButton
          icon={() => <HelpIcon height={RFValue(18)} width={RFValue(18)} />}
          title="Ajuda"
        /> */}
        <SettingButton
          icon={() => <InfoIcon height={18} width={18} />}
          title="Meus Dados"
          onPress={() => navigation.navigate("MyData" as never)}
        />
        <SettingButton
          icon={() => <InfoIcon height={18} width={18} />}
          onPress={showAbout}
          title="Sobre"
        />
        <SettingButton
          icon={() => <InfoIcon height={18} width={18} />}
          title="Sair"
          onPress={handleLogout}
        />
      </Buttons>
    </Container>
  );
}
