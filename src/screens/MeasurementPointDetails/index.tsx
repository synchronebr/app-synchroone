import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { LastMeasurementCard } from "../../components/LastMeasurementCard";

import {
  Container,
  Header,
  Image,
  Asset,
  Detail,
  Title,
  Subtitle,
  Content,
  Text,
} from "./styles";

export function MeasurementPointDetails() {
  const navigation = useNavigation();

  const THEME = useTheme();

  return (
    <Container>
      <Header>
        <Image
          resizeMode="cover"
          source={require("../../assets/images/asset-image.png")}
        />

        <Entypo
          color={THEME.colors.light}
          name="chevron-left"
          onPress={() => navigation.goBack()}
          size={32}
          style={{
            position: "absolute",
            left: 8,
            top: 16,
          }}
        />

        <Asset>
          <Detail>
            <Title>13102</Title>
            <Subtitle>Medições</Subtitle>
          </Detail>

          <Detail>
            <Title>60 min</Title>
            <Subtitle>Janela</Subtitle>
          </Detail>

          <Detail>
            <Title>33:02 min</Title>
            <Subtitle>Próxima</Subtitle>
          </Detail>
        </Asset>
      </Header>

      <Content>
        <Text>Última medição</Text>

        <LastMeasurementCard />
      </Content>
    </Container>
  );
}
