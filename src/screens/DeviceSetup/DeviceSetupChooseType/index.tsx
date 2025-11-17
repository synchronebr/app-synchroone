import { t } from "i18next";

import { 
  Container, 
  Content,
} from "./styles";

import Header from "../../../components/Pages/Header";
import { useNavigation } from "@react-navigation/native";
import { CardSelect } from "../../../components/Pages/DeviceConfiguration/CardSelect";

const CARDS = [
  { image: require('../../../assets/images/sensor-sync-v1.png'), title: 'Sync Alert', description: 'Sensor de vibração e temperatura', next: 'DeviceSetupOptionConfig' },
  { image: require('../../../assets/images/gateway-cassia-x2000.png'), title: 'Sync Cassia X2000', description: 'Gateway Industrial', next: 'NewDevice4' },
]

export function DeviceSetupChooseType() {
  const navigation = useNavigation();

  const goNext = (next: string) => {
    navigation.navigate(next)
  }

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
            onPress={() => goNext(card.next)}
          />
        ))}
      </Content>
    </Container>
  );
}
