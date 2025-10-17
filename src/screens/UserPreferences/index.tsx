import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Pages/Header";
import i18n, { t } from "i18next";
import {
  Container,
} from "./styles";

import {
  MailIcon,
  SmartphoneIcon
} from "lucide-react-native";
import WhatsAppIcon from "../../assets/icons/whatsapp.svg";

import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../../components/Loading";
import THEME from "../../global/styles/theme";
import { Switch } from "../../components/Forms/Switch";
import { StyleSheet, View, Text } from "react-native";
import { Toast } from "react-native-toast-notifications";
import api from "../../services/api";

export function UserPreferences() {
  const navigation = useNavigation();
  const { user, setUser, getUserDB } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState({ emails: false, sms: false, whatsapp: false, app: false, custom: false })

  useEffect(() => {
    if (user) {
      const prefs = (user.preferences || []).reduce((acc: any, pref: any) => {
        acc[pref.field] = pref.content === "1" ? true : false;
        return acc;
      }, {});

      setPreferences({
        emails: prefs.emails ?? true,
        sms: prefs.sms ?? true,
        whatsapp: prefs.whatsapp ?? true,
        app: prefs.app ?? true,
        custom: prefs.custom ?? false,
      });
    }
  }, [user]);

  const formatPreferences = () => {
    return [
      {
        code: "notification",
        field: "emails",
        name: "Initial",
        content: preferences.emails ? "1" : "0",
      },
      {
        code: "notification",
        field: "sms",
        name: "Initial",
        content: preferences.sms ? "1" : "0",
      },
      {
        code: "notification",
        field: "whatsapp",
        name: "Initial",
        content: preferences.whatsapp ? "1" : "0",
      },
      {
        code: "notification",
        field: "app",
        name: "Initial",
        content: preferences.app ? "1" : "0",
      },
      {
        code: "notification",
        field: "custom",
        name: "Initial",
        content: preferences.custom ? "1" : "0",
      },
    ];
  };

  const handleSave = async () => {
    setIsLoading(true);
    const formattedPreferences = formatPreferences();
    const payload = {
      preferences: formattedPreferences,
    } as any;
    
    try {
      const response = await api.put("/me", payload);

      if (response.status === 200 || response.status === 201) {
        Toast.show(t("index.preferencesSavedSuccess"));
        getUserDB();
        navigation.navigate("DashboardTab" as never, { screen: "More" } as never);
      }
    } catch (error) {
      Toast.show(t("index.contactAdministrator"), { type: "danger" });
    }
    setIsLoading(false);
  };

  if (isLoading)
      return <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />;

  return (
    <Container>
      <Header
        title={t('index.userPreferences')}
        backIcon="back"
        backPress={() => navigation.navigate("DashboardTab" as never, { screen: "More" } as never)}
      />

      <View style={styles.content}>
        <View style={styles.contentBlock}>
          <Text style={styles.title}>{t('index.notifications')}</Text>
          <View style={styles.contentSwitchs}>
            <View style={styles.cardContent}>
              <View style={styles.cardContentTitle}>
                <MailIcon size={40}/>
                <View>
                  <Text style={styles.cardTilte}>{t('index.email')}</Text>
                  <Text style={styles.cardSubtitle}>{t('index.notifyByEmail')}</Text>
                </View>
              </View>
              <View style={styles.cardSwitch}>
                <Switch
                  checked={preferences.emails}
                  onCheckedChange={() => { setPreferences(preference => ({...preference, emails: !preference.emails})) }}
                  size="md"                 // "sm" | "md" | "lg"
                  accessibilityLabel="Ativar"
                />
              </View>
            </View>


            <View style={styles.cardContent}>
              <View style={styles.cardContentTitle}>
                <WhatsAppIcon height={40} width={40} fill={THEME.colors.primary}/>
                <View>
                  <Text style={styles.cardTilte}>{t('index.whatsapp')}</Text>
                  <Text style={styles.cardSubtitle}>{t('index.notifyByWhatsApp')}</Text>
                </View>
              </View>
              <View style={styles.cardSwitch}>
                <Switch
                  checked={preferences.whatsapp}
                  onCheckedChange={() => { setPreferences(preference => ({...preference, whatsapp: !preference.whatsapp})) }}
                  size="md"                 // "sm" | "md" | "lg"
                  accessibilityLabel="Ativar"
                />
              </View>
            </View>


            <View style={styles.cardContent}>
              <View style={styles.cardContentTitle}>
                <SmartphoneIcon size={40}/>
                <View>
                  <Text style={styles.cardTilte}>{t('index.app')}</Text>
                  <Text style={styles.cardSubtitle}>{t('index.notifyByApp')}</Text>
                </View>
              </View>
              <View style={styles.cardSwitch}>
                <Switch
                  checked={preferences.app}
                  onCheckedChange={() => { setPreferences(preference => ({...preference, app: !preference.app})) }}
                  size="md"                 // "sm" | "md" | "lg"
                  accessibilityLabel="Ativar"
                />
              </View>
            </View>
          </View>
        </View>
        <Button title={t('index.save')} onPress={handleSave}/>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 8,
    fontSize: THEME.fontSize.largest,
    fontFamily: THEME.fonts.bold,
  },
  content: {
    flex: 1,
    // gap: 10,
    justifyContent: "space-between",
  },
  contentBlock: {
    flex: 1,
  },
  contentSwitchs: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: THEME.colors.gray,
    padding: 10,
    marginTop: 8,
    gap: 40,
    paddingVertical: 20,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  cardContentTitle: {
    flexDirection: "row",
    gap: 8,
  },
  cardTilte: {
  },
  cardSubtitle: {
    color: THEME.colors.gray_dark,
    fontSize: THEME.fontSize.smaller
  },
  cardSwitch: {
    justifyContent: "center"
  },
})
