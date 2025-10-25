import { t } from "i18next";

import { 
  Container, 
  Content,
} from "./styles";

import Header from "../../components/Pages/Header";
import { useNavigation } from "@react-navigation/native";
import { CardSelect } from "../../components/Pages/DeviceConfiguration/CardSelect";

const CARDS = [
  { image: require('../../assets/images/sensor-sync-v1.png'), title: 'Sync Alert', description: 'Sensor de vibração e temperatura' },
  { image: require('../../assets/images/gateway-cassia-x2000.png'), title: 'Sync Cassia X2000', description: 'Gateway Industrial' },
]

export function NewDevice2() {
  const navigation = useNavigation();
  return (
    <Container>
      <Header 
        title={t("index.deviceConfiguration")} 
        backIcon="back"
        backPress={() => navigation.goBack()}
      />

      <Content>
        {CARDS.map(card => (
          <CardSelect 
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </Content>
    </Container>
  );
}
