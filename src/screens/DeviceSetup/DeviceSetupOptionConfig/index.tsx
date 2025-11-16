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
import { useCameraPermissions } from "expo-camera";

export function DeviceSetupOptionConfig() {
  const [, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();

  async function getCameraPermission() {
    const { granted } = await requestPermission();
  
    if (granted) {
      navigation.navigate("QRCodeScanner" as never, {
        nextPage: "DeviceSetupStartPairingProtocol",
      });
    }
  } 

  const goNearby = () => {

  }

  return (
    <Container>
      <Header 
        title={t("index.deviceConfiguration")} 
        backIcon="back"
        backPress={() => navigation.goBack()}
      />

      <ScrollView>
        <Content>
          <Title>{t('index.activePlaceholder')}</Title>
          <Description>{t('index.yourSmartphoneWillOpenBluetoothConnectionBeginPairing')}</Description>
            <CardSelect 
              image={require('../../../assets/images/sensor-sync-v1.png')}
              title={t('index.scanQRCode')}
              description={t('index.scanQRCode')}
              onPress={getCameraPermission}
            />
            <CardSelect 
              image={require('../../../assets/images/search-devices.png')}
              title={t('index.nearbyDevices')}
              description={t('index.searchDevicePlaceholder')}
              onPress={goNearby}
            />
        </Content>
      </ScrollView>
    </Container>
  );
}
