import React, { useCallback, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { useTranslation } from "react-i18next";
import {
  CalendarIcon,
  SirenIcon,
  TriangleAlertIcon,
  CircleCheckBigIcon,
} from "lucide-react-native";

import CrossIcon from "../../assets/icons/cross.svg";
import NotificationsIcon from "../../assets/icons/notifications.svg";
import { Loading } from "../../components/Loading";
import { TotalNotifications } from "../../components/TotalNotifications";

import { getAllNotifications } from "../../services/Notifications";
import { GetAllNotificationsResponse } from "../../services/Notifications/types";

import {
  Container,
  Header,
  Title,
  NotificationsIconContainer,
  Content,
  ContentHeader,
  ContentHeaderTop,
  ContentHeaderTopTabs,
  CalendarContainer,
  CalendarText,
  ContentHeaderGraphContainer,
  ContentHeaderGraph,
  ContentHeaderGraphText,
  ContentHeaderGraphTextTitle,
  ContentHeaderGraphTextDesc,
  ContentView,
  ContentViewContainer,
  ContentViewBetween,
  ContentViewCenter,
  ContentViewFlex,
  ContentViewBigNumber,
  ContentViewBallCicle,
  ContentViewSmallText,
  ContentViewSmallTextMaxWidth,
  AssetsWarningContent,
  AssetsWarningTitle,
  AssetsWarningSubtitle,
  EmptyContainer,
  FilterWrapper,
  FilterWrapperTitle,
  FilterHeader,
  FilterContent,
  DropdownWrapper,
} from "./styles";

import Tabs from "../../components/Pages/Tabs";
import ProgressChart from "../../components/Charts/ProgressChart";
import AttentionPiecesList from "../../components/Pages/Home/AttentionPiecesList";
import BarChartDiagnosesAssets from "../../components/Pages/Home/BarChartDiagnosesAssets";
import { useAccessLevels } from "../../hooks/useAccessLevels";
import { getHomeScreen } from "../../services/Home";
import { GetHomeScreen } from "../../services/Home/types";
import { subDays } from "date-fns";
import { useAuth } from "../../hooks/useAuth";
import { convertFloatToStringByCountry } from "../../utils/convertFloatToStringByCountry";
import EmptyState from "../../components/EmptyState";
import Drawer from "../../components/Drawer";
import Select from "../../components/Select";
import { Button } from "../../components/Button";
import { convertStringToFloatByCountry } from "../../utils/convertStringToFloatByCountry";
import PeriodSelect from "../../components/Pages/Home/PeriodSelect";

export function HomeNew() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [unreadNotificationsTotal, setUnreadNotificationsTotal] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState("O");
  const [timeFilter, setTimeFilter] = useState("90");
  const [applyedTimeFilter, setApplyedTimeFilter] = useState("90");
  const [homeData, setHomeData] = useState<GetHomeScreen | null>(null);
  const [homePercent, setHomePercent] = useState({ diagnTotal: 0, diagnNormal: 0, diagnDanger: 0, diagnWarn: 0 })

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { getAccessLevelsData } = useAccessLevels();
  const accessLevels = getAccessLevelsData();

  const navigation = useNavigation();
  const THEME = useTheme();

  function closeFilter() {
    setIsFiltersOpen(false);
  }

  const notificationsIconSize = 22;

  async function getNotifications() {
    setIsLoading(true);
    const now = new Date();
    try {
      const response = await getHomeScreen({
        companyId: accessLevels.currentCompany.companyId,
        startDate: subDays(now, Number(applyedTimeFilter)),
        endDate: now,
        type: typeFilter,
      });
      if (response.status === 200) {
        const data = response.data as GetHomeScreen;
        setHomeData(data);

        const diagnTotal = (data.findCountStatus.warnDanger / data.findCountStatus.total) * 100;
        const diagnNormal = ((data.findCountStatus.total - data.findCountStatus.warnDanger) / data.findCountStatus.total) * 100;
        const diagnDanger = (data.findCountStatus.danger / data.findCountStatus.warnDanger) * 100;
        const diagnWarn = (data.findCountStatus.warning / data.findCountStatus.warnDanger) * 100;
        setHomePercent({
          diagnTotal: diagnTotal ? diagnTotal: 0,
          diagnNormal: diagnNormal ? diagnNormal : 0,
          diagnDanger: diagnDanger ? diagnDanger : 0,
          diagnWarn: diagnWarn ? diagnWarn : 0,
        })
      } else {
        setHomePercent({
          diagnTotal: 0, 
          diagnNormal: 0, 
          diagnDanger: 0, 
          diagnWarn: 0, 
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (accessLevels) getNotifications();
    }, [typeFilter, accessLevels, applyedTimeFilter])
  );

  if (isLoading)
    return <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />;

  return (
    <Container>
      <Header>
        <Entypo
          onPress={() => (navigation as any).openDrawer?.()}
          name="menu"
          size={24}
          color={THEME.colors.light}
        />
        <Title>Synchroone</Title>
        <NotificationsIconContainer onPress={() => (navigation as any).navigate("Notifications")}>
          <NotificationsIcon
            fill={THEME.colors.light}
            height={notificationsIconSize}
            width={notificationsIconSize}
          />
          {unreadNotificationsTotal && <TotalNotifications total={unreadNotificationsTotal} />}
        </NotificationsIconContainer>
      </Header>

      {/* Scroll para evitar corte do topo */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <Content >
          <ContentHeader>
            <ContentHeaderTop>
              <ContentHeaderTopTabs>
                <Tabs
                  options={[
                    { label: t('index.type-O'), value: "O" },
                    { label: t('index.type-P'), value: "P" },
                  ]}
                  setValue={setTypeFilter}
                  value={typeFilter}
                  smallText
                />
              </ContentHeaderTopTabs>

              <PeriodSelect
                value={applyedTimeFilter}
                onChange={(v) => setApplyedTimeFilter(v)}
                labelText={t("index.period")}
              />
            </ContentHeaderTop> 

            <ContentHeaderGraphContainer>
              <ContentHeaderGraph>
                <ProgressChart percent={homePercent.diagnTotal} size={84} />
              </ContentHeaderGraph>
              <ContentHeaderGraphText>
                <ContentHeaderGraphTextTitle>{t('index.diagnosedReadings')}</ContentHeaderGraphTextTitle>
                <ContentHeaderGraphTextDesc>
                  {t('index.analysisIndicate', { percent: convertFloatToStringByCountry(homePercent.diagnTotal, 2, user?.country) })}
                </ContentHeaderGraphTextDesc>
              </ContentHeaderGraphText>
            </ContentHeaderGraphContainer>
          </ContentHeader>

          {/* Cards */}
          <ContentView>
            <ContentViewContainer>
              <ContentViewBetween>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ContentViewBallCicle>
                    <CircleCheckBigIcon color={THEME.colors.primary} size={20} />
                  </ContentViewBallCicle>
                  <View style={{ width: 8 }} />
                  <ContentViewBigNumber>{homeData && homeData.findCountStatus.total ? homeData.findCountStatus.total : 0}</ContentViewBigNumber>
                </View>
                <ContentViewCenter>
                  <ContentHeaderGraphTextTitle>{t('index.readingsPerformed')}</ContentHeaderGraphTextTitle>
                  <ContentViewSmallText>{t('index.classifiedAsNormal', { percent: convertFloatToStringByCountry(homePercent.diagnNormal, 2, user?.country) })}</ContentViewSmallText>
                </ContentViewCenter>
              </ContentViewBetween>
            </ContentViewContainer>

            <ContentViewFlex>
              <ContentViewContainer>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ContentViewBallCicle>
                    <SirenIcon color={THEME.colors.danger} size={15} />
                  </ContentViewBallCicle>
                  <View style={{ width: 8 }} />
                  <ContentHeaderGraphTextTitle>{t('index.dangerReadings')}</ContentHeaderGraphTextTitle>
                </View>

                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }} >
                  <ContentViewBigNumber>{homeData?.findCountStatus.danger}</ContentViewBigNumber>
                  <View style={{ paddingHorizontal: 8 }}>
                    <ContentViewSmallTextMaxWidth>
                      <ContentViewSmallText>{t('index.classifiedAsDanger', { percent: convertFloatToStringByCountry(homePercent.diagnDanger, 2, user?.country)})}</ContentViewSmallText>
                    </ContentViewSmallTextMaxWidth>
                  </View>
                </View>
              </ContentViewContainer>

              <ContentViewContainer>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <ContentViewBallCicle>
                    <TriangleAlertIcon color={THEME.colors.warning_dark} size={15} />
                  </ContentViewBallCicle>
                  <ContentHeaderGraphTextTitle>{t('index.alarmReadings')}</ContentHeaderGraphTextTitle>
                </View>

                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }} >
                <ContentViewBigNumber>{homeData?.findCountStatus.warning}</ContentViewBigNumber>
                <View style={{ paddingHorizontal: 8 }}>
                  <ContentViewSmallTextMaxWidth>
                    <ContentViewSmallText>{t('index.classifiedAsAlarm', { percent: convertFloatToStringByCountry(homePercent.diagnWarn, 2, user?.country)})}</ContentViewSmallText>
                  </ContentViewSmallTextMaxWidth>
                </View>
                </View>
              </ContentViewContainer>
            </ContentViewFlex>

            <ContentViewContainer>
              <View>
                <AssetsWarningTitle>{t('index.assetsInAttention')}</AssetsWarningTitle>
                <AssetsWarningSubtitle>{t('index.assetsPendingDiagnoses', { count: homeData && homeData.attentionPieces.length > 0 ? homeData.attentionPieces.length : 0 })}</AssetsWarningSubtitle>
              </View>
              <View>
                {homeData && homeData.attentionPieces.length > 0 ? (
                  <AttentionPiecesList
                    items={homeData.attentionPieces}
                  />
                ) : (
                  <EmptyContainer>
                    <EmptyState 
                      icon="SquareActivity"
                      title={t('index.controlAllOk')}
                      description={t('index.assetsNoneAlert')}
                    />
                  </EmptyContainer>
                )}
              </View>
            </ContentViewContainer>

            <ContentViewContainer>
              <View>
                <AssetsWarningTitle>{t('index.assetsWithMostDiagnoses')}</AssetsWarningTitle>
                <AssetsWarningSubtitle>{t('index.diagnosesGeneratedIn', { count: homeData && homeData.diagnosesByPiece.length > 0 ? homeData.diagnosesByPiece.length : 0 })}</AssetsWarningSubtitle>
              </View>
              <View>
                {homeData && homeData.diagnosesByPiece.length > 0 ? (
                  <BarChartDiagnosesAssets 
                    items={homeData.diagnosesByPiece}
                  />
                ) : (
                  <EmptyContainer>
                    <EmptyState 
                      icon="ChartBarBigIcon"
                      title={t('index.dataNone')}
                      description={t('index.diagnosesNone')}
                    />
                  </EmptyContainer>
                )}
              </View>
            </ContentViewContainer>
          </ContentView>
        </Content>
      </ScrollView>
    </Container>
  );
}

export default HomeNew;
