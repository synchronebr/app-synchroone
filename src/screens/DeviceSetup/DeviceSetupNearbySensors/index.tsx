import { t } from "i18next";

import { 
  Container, 
  Content,
  Title,
  Description,
} from "./styles";

import Header from "../../../components/Pages/Header";
import { useNavigation } from "@react-navigation/native";
import { CardSelect } from "../../../components/Pages/DeviceConfiguration/CardSelect";
import { ScrollView } from "react-native";

export function DeviceSetupNearbySensors() {
  const navigation = useNavigation();


  return (
    <Container>
      <Header 
        title={t("index.deviceConfiguration")} 
        backIcon="back"
        backPress={() => navigation.goBack()}
      />

      <ScrollView>
        <Content>
        </Content>
      </ScrollView>
    </Container>
  );
}
