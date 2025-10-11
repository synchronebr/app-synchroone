import { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { RepeatIcon, ScanQrCodeIcon, LogOutIcon } from "lucide-react-native";
import WhatsAppIcon from "../../assets/icons/whatsapp.svg";

import { Loading } from "../Loading";

import { useAccessLevels } from "../../hooks/useAccessLevels";


import {
  Container,
  Header,
  HeaderTextDiv,
  Logo,
  CompanyName,
  AccessLevel,
  Title,
  TitleSecond,
  LeftItemButtons,
  LeftItemButton,
  LeftItemButtonText,
  LeftItemButtonTitle,
  LeftItemButtonSubtitle,
  FooterContent,
} from "./styles";
import { t } from "i18next";
import { Linking } from "react-native";
import { Toast } from "react-native-toast-notifications";
import { useAuth } from "../../hooks/useAuth";

export function CustomDrawer(props: DrawerContentComponentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const { logout } = useAuth();

  const THEME = useTheme();

  const { getAccessLevels, getAccessLevelsData } = useAccessLevels();
  const accessLevels = getAccessLevelsData();

  async function getDrawerContentData() {
    setIsLoading(true);

    try {
      await getAccessLevels();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const companyImage = accessLevels?.companies?.find(
    (company) => company.companyId === accessLevels?.currentCompany?.companyId
  )?.image;

  useEffect(() => {
    getDrawerContentData();
  }, []);

  if (isLoading || !accessLevels)
    return (
      <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
    );

  return (
    <Container>
      <Header 
        onPress={() => {
          props.navigation.closeDrawer?.();
          props.navigation.dispatch(
            CommonActions.navigate({
              name: 'Dashboard',      
              params: { screen: 'Companies' }, 
            })
          );
        }}
      >
        <Logo
          resizeMode="contain"
          source={
            companyImage
              ? { uri: companyImage }
              : require("../../assets/images/app-icon.png")
          }
        />

        <HeaderTextDiv>
          <CompanyName>{accessLevels?.currentCompany?.companyName}</CompanyName>
          <AccessLevel>{accessLevels?.currentCompany?.accessLevel}</AccessLevel>
        </HeaderTextDiv>
        <RepeatIcon color={THEME.colors.primary} size={20} />
      </Header>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

          <LeftItemButtons>
            <LeftItemButton 
              onPress={() => {
                props.navigation.closeDrawer?.();
                props.navigation.dispatch(
                  CommonActions.navigate({
                    name: 'Dashboard',      
                    params: {
                      screen: 'QRCodeScanner',        
                      params: {                        
                        nextPage: 'AssetDetails',
                      },
                    },
                  })
                );
              }}
            >
              <ScanQrCodeIcon color={THEME.colors.primary} size={30} />
              <LeftItemButtonText>
                <LeftItemButtonTitle>{t('index.qrCode')}</LeftItemButtonTitle>
                <LeftItemButtonSubtitle>{t('index.scanDeviceQRCode')}</LeftItemButtonSubtitle>
              </LeftItemButtonText>
            </LeftItemButton>

            <LeftItemButton
              onPress={async () => {
                const phoneNumber = "+5547991352586";
                const url = `whatsapp://send?phone=${phoneNumber}`;
            
                try {
                  const supported = await Linking.canOpenURL(url);
            
                  if (supported) {
                    return Linking.openURL(url);
                  } else {
                    Toast.show(t('index.notinstalledWhatsApp'));
                  }
                } catch (error) {
                  console.log(error);
                  Toast.show(t('index.errorOpenWhatsApp'));
                }
              }}
            >
              <WhatsAppIcon fill={THEME.colors.primary} height={28} width={28} />
              <LeftItemButtonText>
                <LeftItemButtonTitle>{t('index.needHelp')}</LeftItemButtonTitle>
                <LeftItemButtonSubtitle>{t('index.goWhatsApp')}</LeftItemButtonSubtitle>
              </LeftItemButtonText>
            </LeftItemButton>
          </LeftItemButtons>
      </DrawerContentScrollView>

      <FooterContent
        onPress={async () => {
          await logout();

          navigation.reset({
            index: 0,
            routes: [{ name: "Auth" as never }],
          });
        }}  
      >
        <LogOutIcon color={THEME.colors.primary} size={30} />
        <LeftItemButtonText>
          <LeftItemButtonTitle>{t('index.exit')}</LeftItemButtonTitle>
          <LeftItemButtonSubtitle>{t('index.exitApplication')}</LeftItemButtonSubtitle>
        </LeftItemButtonText>
      </FooterContent>
    </Container>
  );
}
