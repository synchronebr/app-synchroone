import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import LabProfileIcon from "../../assets/icons/lab-profile.svg";
import HelpIcon from "../../assets/icons/help.svg";
import InfoIcon from "../../assets/icons/info.svg";

import { SettingButton } from "../../components/SettingButton";

import { Container, Buttons } from "./styles";

export function More() {
  return (
    <Container>
      <Buttons>
        <SettingButton
          icon={() => (
            <LabProfileIcon height={RFValue(17)} width={RFValue(14)} />
          )}
          title="Acessar Manuais"
        />
        <SettingButton
          icon={() => <HelpIcon height={RFValue(18)} width={RFValue(18)} />}
          title="Ajuda"
        />
        <SettingButton
          icon={() => <InfoIcon height={RFValue(18)} width={RFValue(18)} />}
          title="Sobre"
        />
      </Buttons>
    </Container>
  );
}
