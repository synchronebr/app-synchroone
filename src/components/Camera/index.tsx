import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { CameraType, Camera as ExpoCamera } from "expo-camera";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import CropPicker, { Image as CropImage } from "react-native-image-crop-picker";

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

  const cameraRef = useRef(null);
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
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
      });

      await openCropper(uri);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCroppingImage(false);
    }
  }

  return (
    <Container>
      <ExpoCamera
        style={styles.cameraView}
        flashMode={ExpoCamera.Constants.FlashMode[flashMode]}
        ref={cameraRef}
        type={CameraType.back}
      >
        <CloseIcon
          disabled={isCroppingImage}
          // onPress={close}
        >
          <IconDynamicBall icon="chevron-left" onPress={close}/>
        </CloseIcon>


        <FlashIcon
          disabled={isCroppingImage}
          onPress={() => setFlashMode(flashMode === "on" ? "off" : "on")}
        >
          <Ionicons
            name={flashMode === "off" ? "flash-off" : "flash"}
            size={36}
            color={THEME.colors.light}
          />
        </FlashIcon>

        <TakePicture disabled={isCroppingImage} onPress={handleTakePicture}>
          <FontAwesome name="circle" size={96} color={THEME.colors.light} />
        </TakePicture>
      </ExpoCamera>
    </Container>
  );
}

export const styles = StyleSheet.create({
  cameraView: {
    flex: 1,
  },
});
