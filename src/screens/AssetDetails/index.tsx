import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { OneSignal } from "react-native-onesignal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";
import { useTheme } from "styled-components/native";
import CropPicker, { Image as CropImage } from "react-native-image-crop-picker";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { AssetDetailsCard } from "../../components/AssetDetailsCard";
import { MeasurementPointCard } from "../../components/MeasurementPointCard";
import { Loading } from "../../components/Loading";
import { AssetDetailHeaderIcon } from "../../components/AssetDetailsHeaderIcon";

import { useAuth } from "../../hooks/useAuth";
import ArrowForwardIcon from "../../assets/icons/arrow-forward.svg";

import api from "../../services/api";
import { SessionsResponse } from "../../services/Auth/types";

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

  const {
    AUTH_TOKEN_STORAGE_KEY,
    REFRESH_TOKEN_STORAGE_KEY,
    USER_STORAGE_KEY,
    setUser,
    logout,
  } = useAuth();

  function createAPIInterceptors() {
    api.interceptors.request.use(
      async (config) => {
        const authToken = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

        if (authToken)
          config.headers.Authorization = `Bearer ${authToken.replace(
            /"/g,
            ""
          )}`;

        return config;
      },
      async function (error) {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.error(error);

        if (error.response.status === 401) {
          if (error.response.data.code === "token.expired") {
            const currentAuthToken = await AsyncStorage.getItem(
              AUTH_TOKEN_STORAGE_KEY
            );
            const currentRefreshToken = await AsyncStorage.getItem(
              REFRESH_TOKEN_STORAGE_KEY
            );

            if (currentAuthToken && currentRefreshToken) {
              try {
                const response = await api.post("sessions/refreshToken", {
                  refreshToken: JSON.parse(currentRefreshToken),
                });

                if (response.status === 200) {
                  const data: SessionsResponse = response.data;

                  await AsyncStorage.setItem(
                    AUTH_TOKEN_STORAGE_KEY,
                    JSON.stringify(data.token)
                  );
                  await AsyncStorage.setItem(
                    REFRESH_TOKEN_STORAGE_KEY,
                    JSON.stringify(data.refreshToken)
                  );
                  await AsyncStorage.setItem(
                    USER_STORAGE_KEY,
                    JSON.stringify(data.user)
                  );
                }

                return api.request(error.config);
              } catch (error) {
                await logout();

                navigation.reset({
                  index: 0,
                  routes: [{ name: "Auth" as never }],
                });

                return;
              }
            }
          }

          // redirects user to login page

          // Perform navigation reset to Auth stack, preventing back navigation
          // navigationRef.current?.reset({
          //   index: 0,
          //   routes: [{ name: "Auth", params: { screen: "Login" } }],
          // });

          return;
        }

        return Promise.reject(error);
      }
    );
  }

  async function getToken() {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);

    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" as never }],
      });
    }
  }

  function initializeOneSignal() {
    OneSignal.initialize("5f7e98d9-9cca-4e86-8aaa-3de1e8fa36d7");
  }

  useEffect(() => {
    createAPIInterceptors();
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    initializeOneSignal();
  }, []);

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
        <ScrollView>
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

              <Content>
                <Text>Detalhes do Ativo</Text>

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
                  <DiagnosesButtonText>
                    Histórico de diagnósticos
                  </DiagnosesButtonText>
                  <ArrowForwardIcon
                    fill={THEME.colors.primary}
                    height={12}
                    width={12}
                  />
                </DiagnosesButton>

                <Text>Pontos de medição</Text>

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
            </>
          )}
        </ScrollView>
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
