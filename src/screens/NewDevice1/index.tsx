import { t } from "i18next";

import { 
  Container, 
  Content,
  Title,
} from "./styles";

import Header from "../../components/Pages/Header";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";

export function NewDevice1() {
  const navigation = useNavigation();
  return (
    <Container>
      <Header 
        variant="secondary" 
        title={t("index.deviceConfiguration")} 
        backIcon="back"
        backPress={() => navigation.goBack()}
      />

      <Content>
        <Title>{t('index.letStartSetupSelectDevicModelBeginConfiguration')}</Title>
        <Button 
          title={t('index.select')}
          onPress={ () => 
            navigation.navigate("NewDevice2")
          }
        />
      </Content>
    </Container>
  );
}
