import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Camera as ExpoCamera } from "expo-camera";
import { Toast } from "react-native-toast-notifications";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import {
  updateEquipmentFavoriteStatus,
} from "../../../services/Equipments";

import { HeaderProps } from "./types";
import {
  Container,
  Image,
  TopBar,
  RightIcons,
  Asset,
  Title,
  Subtitle,
} from "./styles";
import IconDynamicBall from "../../IconDynamicBall";
import { Camera } from "../../Camera";

export default function HeaderImage<T>({
  pieceName,
  pathName,
  imageURL,
  securityStatus,
  setOpenCamera,
  updateImage,
}: HeaderProps<T>) {
  const THEME = useTheme();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [, requestPermission] = ExpoCamera.useCameraPermissions();

  async function loadImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      await sendImagem(result);
    }
  }

  async function getCameraPermission() {
    const { granted } = await requestPermission();

    if (granted) setOpenCamera(true);
  }

  return (
    <Container>
      <Image
        resizeMode="cover"
        source={{
          uri: imageURL
            ? imageURL
            : "https://synchroone.s3.amazonaws.com/blue-machine-sensor.png",
        }}
      />

      {/* Header sobreposto */}
      <TopBar edges={["top"]} pointerEvents="box-none">
        <IconDynamicBall icon="chevron-left" onPress={() => navigation.navigate("Assets" as never)}/>

        <RightIcons>
          <IconDynamicBall icon="add-a-photo" onPress={getCameraPermission}/>
          <IconDynamicBall icon="add-photo-alternate" onPress={loadImage}/>
        </RightIcons>
      </TopBar>

      {/* Faixa inferior com título/subtítulo */}
      <Asset status={securityStatus}>
        <Title>{pieceName}</Title>
        <Subtitle>{pathName}</Subtitle>
      </Asset>
    </Container>
  );
}
