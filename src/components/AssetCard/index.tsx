import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import ArrowForwardIcon from "../../assets/icons/arrow-forward.svg";

import { AssetCardNavigationProps, AssetCardProps } from "./types";
import {
  Container,
  Image,
  Content,
  Title,
  Subtitle,
  Text,
  LastMeasurementInfo,
  LastMeasurementText,
  CardStatusSafe,
  CardStatusSafeText,
  Elipses,
  DangerElipse,
  WarningElipse,
  SuccessElipse,
  InvalidElipse,
  LastMeasurementSubText,
} from "./styles";

export function AssetCard({ item, ...rest }: AssetCardProps) {
  const navigation = useNavigation<AssetCardNavigationProps>();
  const THEME = useTheme();

  return (
    <Container onPress={() => navigation.navigate("AssetDetails", { id: item.id })} {...rest} status={item.securityStatus}>
      <Image
        source={item.image ? { uri: item.image } : require('../../assets/images/blue-machine-sensor.png')}
      />
      {item.securityStatus === 'S' && (<CardStatusSafe status={item.securityStatus}><CardStatusSafeText>Seguro</CardStatusSafeText></CardStatusSafe>)}
      {item.securityStatus === 'W' && (<CardStatusSafe status={item.securityStatus}><CardStatusSafeText>Alerta</CardStatusSafeText></CardStatusSafe>)}
      {item.securityStatus === 'D' && (<CardStatusSafe status={item.securityStatus}><CardStatusSafeText>Perigo</CardStatusSafeText></CardStatusSafe>)}
      {item.securityStatus === 'IN' && (<CardStatusSafe status={item.securityStatus}><CardStatusSafeText>Não Monitorado</CardStatusSafeText></CardStatusSafe>)}
      <Content>
        <Title>{item.pathNames?.length
          ? `${item.description} - ${item.pathNames.join(" - ")}`
          : item.description}
        </Title>

        <Subtitle>{item.path?.title}</Subtitle>

        {/* <Text>5 sensores</Text> */}

        {/* {item?.readings?.length > 0 && ( */}
        <LastMeasurementInfo>
          <LastMeasurementText>Últimas medições:</LastMeasurementText>
          <Elipses>
            <>
            {item.readings && item.readings.length > 0 ? (
              <>
              {item.readings?.slice(0, 8).sort((a, b) => a.id - b.id).map(reading => (
                <React.Fragment key={reading.id}>
                  {reading.securityStatus === 'S' && (<SuccessElipse />)}
                  {reading.securityStatus === 'W' && (<WarningElipse />)}
                  {reading.securityStatus === 'D' && (<DangerElipse />)}
                  {reading.securityStatus === 'IN' && (<InvalidElipse />)}
                </React.Fragment>
              ))}
              </>
            ) : (
            <LastMeasurementSubText>Sem medições</LastMeasurementSubText>
            )}
            </>
          </Elipses>
        </LastMeasurementInfo>
        {/* )} */}

      </Content>

      <ArrowForwardIcon
        fill={THEME.colors.primary}
        height={12}
        width={12}
      />
    </Container>
  );
}
