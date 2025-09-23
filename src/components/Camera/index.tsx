import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  type CameraViewRef,
} from "expo-camera";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import CropPicker from "react-native-image-crop-picker";
import type { ComponentRef } from "react";

import { Loading } from "../../components/Loading";
import { Container, CloseIcon, FlashIcon, TakePicture } from "./styles";
import IconDynamicBall from "../IconDynamicBall";

interface ICamera {
  close: () => void;
  sendImage?: (image: any) => void;
}

export function Camera({ close, sendImage }: ICamera) {
  const [flashMode, setFlashMode] = useState<"on" | "off">("off");
  const [isCroppingImage, setIsCroppingImage] = useState(false);

  type CameraInstance = ComponentRef<typeof CameraView>;
  const cameraRef = useRef<CameraInstance>(null);
  const THEME = useTheme();

  async function openCropper(uri: string) {
    const cropped = await CropPicker.openCropper({
      compressImageMaxHeight: 1000,
      compressImageMaxWidth: 1000,
      compressImageQuality: 0.7,
      cropping: true,
      height: 1000,
      mediaType: "photo",
      path: uri,
      width: 1000,
    });

    if (cropped?.path) {
      sendImage?.(cropped);
      close();
    }
  }

  async function handleTakePicture() {
    setIsCroppingImage(true);
    try {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 1 });
      if (photo?.uri) {
        await openCropper(photo.uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCroppingImage(false);
    }
  }

  const handleFlash = () => {
    setFlashMode(flashMode === "on" ? "off" : "on");
    console.log('entrou')
  }

  return (
    <Container>
      <CameraView
        ref={cameraRef}
        style={styles.cameraView}
        facing="back"
        enableTorch={flashMode === "on"}
        autofocus="on"
      >
        <CloseIcon disabled={isCroppingImage}>
          <IconDynamicBall icon="chevron-left" onPress={close} />
        </CloseIcon>

        <FlashIcon disabled={isCroppingImage} >
          <IconDynamicBall 
            icon={flashMode === "on" ? "flash" : "flash-off"} 
            onPress={handleFlash}
          />
        </FlashIcon>

        <TakePicture disabled={isCroppingImage} onPress={handleTakePicture}>
          <FontAwesome name="circle" size={96} color={THEME.colors.light} />
        </TakePicture>
      </CameraView>
    </Container>
  );
}

export const styles = StyleSheet.create({
  cameraView: { flex: 1 },
});
