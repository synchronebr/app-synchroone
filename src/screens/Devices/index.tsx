import React, { useMemo, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useWindowDimensions } from "react-native";
import { Toast } from "react-native-toast-notifications";
import { t } from "i18next";

import { 
  Container, 
  Content,
  TabsContent,
  ScrollArea,
  ContentCards,
  Footer,
} from "./styles";

import Header from "../../components/Pages/Header";
import Tabs from "../../components/Pages/Tabs";
import { Button } from "../../components/Button";
import DeviceCard from "../../components/Pages/Devices/DeviceCard";
import { useNavigation } from "@react-navigation/native";
import { EmptyContainer } from "../Home/styles";
import EmptyState from "../../components/EmptyState";

const H_PADDING = 20;     // mesmo padding horizontal do <Content />
const CARD_HEIGHT = 80;   // altura de cada card
const GAP = 10;           // mesmo gap do ContentCards

function SkeletonDevices({ width, rows = 6 }: { width: number; rows?: number }) {
  const skeletonHeight = rows * CARD_HEIGHT + (rows - 1) * GAP;
  return (
    <ContentLoader
      width={width}
      height={skeletonHeight}
      viewBox={`0 0 ${width} ${skeletonHeight}`}
      backgroundColor="#E9ECEF"
      foregroundColor="#F8F9FA"
      speed={1.2}
      style={{ marginTop: 10 }}
      testID="devices-skeleton"
    >
      {Array.from({ length: rows }).map((_, i) => {
        const y = i * (CARD_HEIGHT + GAP);
        return <Rect key={i} x={0} y={y} rx={8} ry={8} width={width} height={CARD_HEIGHT} />;
      })}
    </ContentLoader>
  );
}

export function Devices() {
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [tabs, setTabs] = useState<'N' | 'L'>('L');
  const navigation = useNavigation();

  const contentWidth = useMemo(() => Math.max(0, width - (H_PADDING * 2)), [width]);

  return (
    <Container>
      <Header title={t("index.deviceConfiguration")} />

      <Content>
        <TabsContent>
          <Tabs 
            options={[ 
              { label: t('index.nearbyDevices'), value: 'N' },
              { label: t('index.deviceList'), value: 'L' },
            ]}
            setValue={(v) => setTabs(v as 'N' | 'L')}
            value={tabs}
          />
        </TabsContent>

        {/* Área que rola */}
        <ScrollArea
          style={{ flex: 1 }}
          contentContainerStyle={{
            marginTop: 0,
            paddingBottom: 0,  
            rowGap: GAP,  
          }}
          showsVerticalScrollIndicator
        >
          {isLoading ? (
            <SkeletonDevices width={contentWidth} rows={6} />
          ) : (
            // <ContentCards>
            //   <DeviceCard device={{ code: 'SSYNC-AAA1', battery: 100, readingWindow: 10, status: '', connectionStatus: 'ON' }}  signal="L" type={tabs} />
            //   <DeviceCard device={{ code: 'SSYNC-AAA2', battery: 100, readingWindow: 10, status: '', connectionStatus: 'OF' }}  signal="M" type={tabs} />
            //   <DeviceCard device={{ code: 'SSYNC-AAA3', battery: 100, readingWindow: 10, status: '', connectionStatus: 'NC' }}  signal="H" type={tabs} />
            //   <DeviceCard device={{ code: 'SSYNC-AAA4', battery: 100, readingWindow: 10, status: '', connectionStatus: 'NG' }}  signal="H" type={tabs} />
            //   <DeviceCard device={{ code: 'SSYNC-AAA5', battery: 100, readingWindow: 10, status: '', connectionStatus: 'NC' }}  signal="H" type={tabs} />
            //   <DeviceCard device={{ code: 'SSYNC-AAA6', battery: 100, readingWindow: 10, status: '', connectionStatus: 'NC' }}  signal="H" type={tabs} />
            //   <DeviceCard device={{ code: 'SSYNC-AAA7', battery: 100, readingWindow: 10, status: '', connectionStatus: 'NC' }}  signal="H" type={tabs} />
            // </ContentCards>
            <>
            <EmptyContainer>
                <EmptyState
                  title={t('index.deviceConfiguration')}
                  description={t('index.errorLoadDevices')}
                />
            </EmptyContainer>
            </>
          )}
        </ScrollArea>

        <Footer>
          {/* <Button title={t('index.newDevice')} onPress={() => {
            // navigation.navigate("DeviceSetupStack", {
            //   screen: "NewDevice1",
            // });
          }}/> */}
        </Footer>
      </Content>
    </Container>
  );
}
