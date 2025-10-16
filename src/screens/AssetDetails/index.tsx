import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { Toast } from "react-native-toast-notifications";
import { useTheme } from "styled-components/native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { AssetDetailsCard } from "../../components/AssetDetailsCard";
import { MeasurementPointCard } from "../../components/MeasurementPointCard";
import { Loading } from "../../components/Loading";

import ArrowForwardIcon from "../../assets/icons/arrow-forward.svg";

import {
  getEquipmentById,
  updateEquipmentFavoriteStatus,
} from "../../services/Equipments";
import { IReading } from "../../services/dtos/IReading";
import { IPiece } from "../../services/dtos/IPiece";
import { updatePieceImage } from "../../services/Companies/Pieces/MeasuringPoints";

import { AssetDetailsRouteProps } from "./types";
import {
  Container,
  Content,
  Text,
  List,
  DiagnosesButton,
  DiagnosesButtonText,
} from "./styles";
import HeaderImage from "../../components/Pages/HeaderImage";
import { Camera } from "../../components/Camera";
import { t } from "i18next";

export function AssetDetails() {
  const { height, width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [piece, setPiece] = useState<IPiece>(null);
  const [isFavorite, setIsFavorite] = useState(true);
  const [readings, setReadings] = useState([]);
  const [openCamera, setOpenCamera] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const route = useRoute();
  const navigation = useNavigation();

  const THEME = useTheme();

  const params: AssetDetailsRouteProps = route.params as AssetDetailsRouteProps;

  function toggleIsFavorite() {
    setIsFavorite(!isFavorite);
    updateEquipmentFavoriteStatus(piece.id, !isFavorite).catch((_) => { });
  }

  async function loadScreen() {
    setIsLoading(true);

    try {
      const response = await getEquipmentById(Number(params.id));
      const data = response;
      setPiece(data);
      setIsFavorite(data.isFavorite);
    } catch (error) {
      Toast.show(
        "Houve um erro ao buscar o equipamento. Por favor, verifique sua conexão, ou tente novamente mais tarde.",
        { duration: 5000, type: "danger" }
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function sendImage(croppedImage: any) {
    setIsLoadingImage(true);
    console.log(croppedImage, croppedImage.path, croppedImage.uri)
    try {
      const formData = new FormData();

      formData.append("image", {
        uri: croppedImage.path,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      const { status } = await updatePieceImage(
        piece.company.id,
        piece.id,
        formData
      );

      if (status === 200) {
        Toast.show("Foto salva com sucesso!", {
          type: "success",
        });
        setImageURL(croppedImage.path);
      }
    } catch (error) {
      Toast.show(
        "Houve um erro ao enviar a imagem. Por favor, verifique sua conexão, ou tente novamente mais tarde."
      );
    }
    setIsLoadingImage(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadScreen();
    }, [])
  );

  const buildReadings = async () => {
    setImageURL(piece.image);
    const items = [] as IReading[];
    if (piece.measuringPoints) {
      const mapMP = piece.measuringPoints.map((mp) => {
        mp.readings?.map((reading) => {
          items.push(reading);
        });
      });
      await Promise.all(mapMP);

      items.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      setReadings(items);
    }
  };

  useEffect(() => {
    if (piece) buildReadings();
  }, [piece]);

  // if (isLoading) return <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />;

  return (
    <Container>
      {isLoading ? (
        <ContentLoader viewBox={`0 0 ${width} ${height}`}>
          <Rect x="1" y="10" rx="10" ry="10" width={width} height="200" />
          <Rect x="1" y="230" rx="10" ry="10" width={width} height="100" />
          <Rect x="1" y="350" rx="10" ry="10" width={width} height="100" />
          <Rect x="1" y="470" rx="10" ry="10" width={width} height="100" />
        </ContentLoader>
      ) : (
        <>
        {openCamera ? (
          <Camera close={() => setOpenCamera(false)} sendImage={sendImage}/>
        ) : (
        <>
          {piece && (
            <>
              <HeaderImage 
                pieceName={piece.description}
                pathName={piece.path?.title}
                securityStatus={piece.securityStatus}
                imageURL={imageURL}
                setOpenCamera={setOpenCamera}
                isLoading={isLoadingImage}
                sendImage={sendImage}
              />

              <ScrollView>
              <Content>
                <Text>{t('index.pieceDetails')}</Text>

                <AssetDetailsCard
                  onPress={() =>
                    navigation.navigate("EditAssetDetails", {
                      id: piece?.id,
                      description: piece?.description,
                      type: piece?.type,
                      brand: piece?.brand,
                      model: piece?.model,
                    })
                  }
                  piece={piece}
                />

                <DiagnosesButton
                  onPress={() =>
                    navigation.navigate("DiagnosesByPiece", { id: piece.id })
                  }
                >
                  <DiagnosesButtonText>{t('index.diagnosesHistory')}</DiagnosesButtonText>
                  <ArrowForwardIcon
                    fill={THEME.colors.primary}
                    height={12}
                    width={12}
                  />
                </DiagnosesButton>

                <Text>{t('index.measuringPointsTitle')}</Text>

                <List
                  data={piece.measuringPoints}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <MeasurementPointCard equipmentId={piece.id} item={item} />
                  )}
                  ListEmptyComponent={
                    isLoading ? (
                      <Loading />
                    ) : (
                      <View>{/* <Text>Nenhum ponto de medição</Text> */}</View>
                    )
                  }
                />
              </Content>
              </ScrollView>
            </>
          )}
        </>
        )}
        </>
      )}
    </Container>
  );
}

export const styles = StyleSheet.create({
  backIcon: {
    position: "absolute",
    left: 8,
    top: 16,
  },
  icons: {
    flexDirection: "row",
    gap: 8,
    position: "absolute",
    right: 8,
    top: 16,
  },
  icon: {
    padding: 8,
  },
});
