import React from "react";
import { useNavigation } from "@react-navigation/native";
import DeviceInfo from 'react-native-device-info';

import LabProfileIcon from "../../assets/icons/lab-profile.svg";
import HelpIcon from "../../assets/icons/help.svg";
import InfoIcon from "../../assets/icons/info.svg";
import { FileTextIcon, MapPinIcon, User2Icon, EllipsisIcon } from "lucide-react-native";

import { SettingButton } from "../../components/SettingButton";

import { useAuth } from "../../hooks/useAuth";

import { Container, UserContent, UserImage, UserInitials, UserInitialsText, UserInfos, UserInfosText, UserInfosName, UserInfosDesc, Buttons } from "./styles";
import { Alert, TouchableOpacity } from "react-native";
import Header from "../../components/Pages/Header";
import { t } from "i18next";
import { useAccessLevels } from "../../hooks/useAccessLevels";

export function More() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { getAccessLevelsData } = useAccessLevels();

  const { logout } = useAuth();

  async function handleLogout() {
    await logout();

    navigation.reset({
      index: 0,
      routes: [{ name: "Auth" as never }],
    });
  }

  async function handleLanguages() {
    navigation.reset({
      index: 0,
      routes: [{ name: "Languages" as never }],
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

  function getInitials(name: string) {
    if (!name) return '';

    return name
      .trim()
      .split(/\s+/) // separa por espaços
      .filter(w => w.length > 2) // ignora palavras curtas tipo "de", "da", "do"
      .map(w => w[0].toUpperCase()) // pega a primeira letra
      .slice(0, 2) // mantém só duas iniciais
      .join('');
  }

  async function getAccessLabel(): Promise<string> {
    const accessLevel = await getAccessLevelsData();
    switch (accessLevel.currentCompany.type) {
      case "TTP":
        return t('index.technicalAccess');
      case "UDF":
        return t('index.clientAccess');
      case "ATP":
        return t('index.thirdPartyAdminAccess');
      case "ADM":
        return t('index.adminAccess');
      default:
        return t('index.clientAccess'); // fallback
    }
  }

  return (
    <Container>

      <Header title={t("index.myAccount") ?? "Minha conta"} />

      <UserContent>
        <UserInfos>
          {user && user.avatar ? (
            <UserImage source={{ uri: user.avatar}}/>
          ) : (
            <UserInitials>
              <UserInitialsText>{getInitials(user?.name)}</UserInitialsText>
            </UserInitials>
          ) }
          <UserInfosText>
            <UserInfosName>{user?.name}</UserInfosName>
            <UserInfosDesc>{getAccessLabel()}</UserInfosDesc>
          </UserInfosText>
        </UserInfos>
        <TouchableOpacity><EllipsisIcon onPress={() => navigation.navigate("MyData" as never)} size={30} /></TouchableOpacity>
      </UserContent>

      <Buttons>
        <SettingButton
          icon={() => <InfoIcon height={22} width={22} />}
          title={t('index.about')}
          subtitle={t('index.appVersioning')}
          onPress={showAbout}
        />
        <SettingButton
          icon={() => <FileTextIcon height={22} width={22} />}
          title={t('index.manuals')}
          subtitle={t('index.manualList')}
        />
        <SettingButton
          icon={() => <MapPinIcon height={22} width={22} />}
          title={t('index.language')}
          subtitle={t('index.selectLanguageAndTimezone')}
          onPress={handleLanguages}
        />
        <SettingButton
          icon={() => <User2Icon height={22} width={22} />}
          title={t('index.userPreferences')}
          subtitle={t('index.customizePreferences')}
        />
      </Buttons>
    </Container>
  );
}
