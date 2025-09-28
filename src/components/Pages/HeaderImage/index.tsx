import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useCameraPermissions } from "expo-camera";

import * as ImagePicker from "expo-image-picker";

const fallback = require('../../../assets/images/blue-machine-sensor.png');

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
import ContentLoader, { Rect } from "react-content-loader/native";
import { useWindowDimensions } from "react-native";

export default function HeaderImage<T>({
  pieceName,
  pathName,
  imageURL,
  securityStatus,
  setOpenCamera,
  isLoading,
  sendImage,
}: HeaderProps<T>) {
  const THEME = useTheme();
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [, requestPermission] = useCameraPermissions();
    
  const source =
    typeof imageURL === 'string' && imageURL.trim().length > 0
      ? { uri: imageURL }
      : fallback;

  function expoToCropLike(a: { uri: string; mimeType?: string }) {
    return { path: a.uri, mime: a.mimeType ?? "image/jpeg" }; // cria um objeto com 'path'
  }

  async function loadImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const a = result.assets[0];
      const image = expoToCropLike(a);
      if (image && sendImage) await sendImage(image);
    }
  }

  async function getCameraPermission() {
    const { granted } = await requestPermission();

    if (granted && setOpenCamera) setOpenCamera(true);
  }

  return (
    <Container>
      {isLoading ? (
      <ContentLoader viewBox={`0 0 ${width}`}>
        <Rect x="1" y="1" rx="10" ry="10" width={width} height="200" />
      </ContentLoader>
      ) : (
        <>
        <Image
          resizeMode="cover"
          source={source}
        />

        <TopBar edges={["top"]} pointerEvents="box-none">
          <IconDynamicBall icon="chevron-left" onPress={() => navigation.goBack()}/>

          <RightIcons>
            <IconDynamicBall icon="add-a-photo" onPress={getCameraPermission}/>
            <IconDynamicBall icon="add-photo-alternate" onPress={loadImage}/>
          </RightIcons>
        </TopBar>

        <Asset status={securityStatus}>
          <Title>{pieceName}</Title>
          <Subtitle>{pathName}</Subtitle>
        </Asset> 
        </>
      )}
    </Container>
  );
}
