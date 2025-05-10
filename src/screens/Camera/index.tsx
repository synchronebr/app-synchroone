import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { CameraType, Camera as ExpoCamera } from "expo-camera";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import ImagePicker from "react-native-image-crop-picker";
import { Toast } from "react-native-toast-notifications";

import { Loading } from "../../components/Loading";

import { updatePieceImage } from "../../services/Companies/Pieces/MeasuringPoints";

import { Container, CloseIcon, FlashIcon, TakePicture } from "./styles";

export function Camera() {
  const [flashMode, setFlashMode] = useState<"on" | "off">("off");
  const [isCroppingImage, setIsCroppingImage] = useState(false);
  const [isSendingImage, setIsSendingImage] = useState(false);

  const cameraRef = useRef(null);

  const navigation = useNavigation();
  const route = useRoute();
  const THEME = useTheme();

  const params = route.params;

  async function sendImagem(imageUri: string) {
    setIsSendingImage(true);

    const formData = new FormData();

    formData.append("image", {
      uri: imageUri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const { status } = await updatePieceImage(
        params.piece.company.id,
        params.piece.id,
        formData
      );

      if (status === 200) {
        Toast.show("Foto salva com sucesso!", {
          type: "success",
        });
      }
    } catch (error) {
      Toast.show(
        "Houve um erro ao enviar a imagem. Por favor, verifique sua conexão, ou tente novamente mais tarde."
      );
    } finally {
      navigation.goBack();
    }

    setIsSendingImage(false);
  }

  async function openCropper(uri: string) {
    const croppedImage = await ImagePicker.openCropper({
      compressImageMaxHeight: 1000,
      compressImageMaxWidth: 1000,
      compressImageQuality: 0.7,
      cropping: true,
      height: 1000,
      mediaType: "photo",
      path: uri,
      width: 1000,
    });

    if (croppedImage && croppedImage.path) {
      await sendImagem(croppedImage.path);
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

  if (isSendingImage) return <Loading />;

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
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="close" size={36} color={THEME.colors.light} />
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
