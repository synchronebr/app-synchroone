import React, { useCallback, useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Camera as ExpoCamera } from "expo-camera";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { OneSignal } from "react-native-onesignal";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { AssetDetailHeaderIcon } from "../../components/AssetDetailsHeaderIcon";

import { useAuth } from "../../hooks/useAuth";

import api from "../../services/api";
import { SessionsResponse } from "../../services/Auth/types";
import {
  getEquipmentById,
  updateEquipmentFavoriteStatus,
} from "../../services/Equipments";
import { IReading } from "../../services/dtos/IReading";
import { IPiece } from "../../services/dtos/IPiece";
import { updatePieceImage } from "../../services/Companies/Areas/Sectors/Machines/Pieces/MeasuringPoints";

import { AssetDetailsRouteProps } from "./types";
import {
  Container,
  Header,
  Image,
  Icon,
  Asset,
  Title,
  Subtitle,
  Content,
  Text,
  List,
} from "./styles";

export function AssetDetails() {
  const { height, width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [piece, setPiece] = useState<IPiece>(null);
  const [isFavorite, setIsFavorite] = useState(true);
  const [readings, setReadings] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const [, requestPermission] = ExpoCamera.useCameraPermissions();
  const THEME = useTheme();

  const params: AssetDetailsRouteProps = route.params as AssetDetailsRouteProps;

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

  function toggleIsFavorite() {
    setIsFavorite(!isFavorite);
    updateEquipmentFavoriteStatus(piece.id, !isFavorite).catch((_) => {});
  }

  async function getCameraPermission() {
    const { granted } = await requestPermission();

    if (granted) navigation.navigate("Camera", { piece });
  }

  async function sendImagem(result: ImagePicker.ImagePickerResult) {
    try {
      const imageUri = result.assets[0].uri;

      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      const maxSizeInBytes = 3 * 1024 * 1024;

      if (fileInfo.size > maxSizeInBytes) {
        Toast.show("A imagem excede 3MB. Escolha uma imagem menor.");
        return;
      }

      const formData = new FormData();

      formData.append("image", {
        uri: result.assets[0].uri,
        name: result.assets[0].fileName || "photo.jpg",
        type: result.assets[0].mimeType || "image/jpeg",
      });

      const { status } = await updatePieceImage(
        piece.machine.sector.area.company.id,
        piece.machine.sector.area.id,
        piece.machine.sector.id,
        piece.machine.id,
        piece.id,
        formData
      );

      if (status === 200) {
        Toast.show("Foto salva com sucesso!", {
          type: "success",
        });

        loadScreen();
      }
    } catch (error) {
      console.log(error);
      Toast.show(
        "Houve um erro ao enviar a imagem. Por favor, verifique sua conexão, ou tente novamente mais tarde."
      );
    }
  }

  async function loadImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      await sendImagem(result);
    }
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

  useFocusEffect(
    useCallback(() => {
      loadScreen();
    }, [])
  );

  const buildReadings = async () => {
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
    console.log(piece);
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
      <ScrollView>
        {piece && (
          <>
            <Header>
              <Image
                resizeMode="cover"
                source={{
                  uri: piece?.image
                    ? piece.image
                    : "https://synchroone.s3.amazonaws.com/blue-machine-sensor.png",
                }}
              />

              <Icon style={styles.backIcon}>
                <Entypo
                  color={THEME.colors.primary}
                  name="chevron-left"
                  onPress={() => navigation.navigate("Assets" as never)}
                  size={32}
                  // style={styles.backIcon}
                />
              </Icon>

              <View style={styles.icons}>
                <Icon>
                  <MaterialIcons
                    style={styles.icon}
                    color={THEME.colors.primary}
                    name="add-a-photo"
                    onPress={getCameraPermission}
                    size={24}
                  />
                </Icon>

                <Icon>
                  <MaterialIcons
                    style={styles.icon}
                    color={THEME.colors.primary}
                    name="add-photo-alternate"
                    onPress={loadImage}
                    size={24}
                  />
                </Icon>

                {/* <View>
                  <AssetDetailHeaderIcon
                    isFavorite={isFavorite}
                    toggleIsFavorite={toggleIsFavorite}
                  />
                </View> */}
              </View>

              <Asset status={readings[0]?.securityStatus}>
                <Title>{piece?.description}</Title>
                <Subtitle>{piece?.machine.name}</Subtitle>
              </Asset>
            </Header>

            <Content>
              <Text>Detalhes do Ativo</Text>

              <AssetDetailsCard piece={piece} />

              <Text>Pontos de medição</Text>

              <List
                data={piece.measuringPoints}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MeasurementPointCard equipmentId={piece.id} item={item} />}
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
