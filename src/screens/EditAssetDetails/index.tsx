import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Loading } from "../../components/Loading";
import { Dropdown } from "../../components/Dropdown";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import {
  getPiecesTypes as getPiecesTypesService,
  updatePieceData,
} from "../../services/Pieces";
import {
  GetPiecesTypesResponse,
  UpdatePieceData,
} from "../../services/Pieces/types";

import { EditAssetDetailsRouteProps, FormData } from "./types";
import { Container, Scroll, Form, Wrapper } from "./styles";
import { Toast } from "react-native-toast-notifications";
import { useAccessLevels } from "../../hooks/useAccessLevels";
import Select from "../../components/Select";

export function EditAssetDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPieceType, setSelectedPieceType] = useState<number | null>(
    null
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const modelInputRef = useRef<TextInput>();
  const navigation = useNavigation();
  const route = useRoute();
  const THEME = useTheme();

  const { getAccessLevelsData } = useAccessLevels();
  const accessLevels = getAccessLevelsData();

  const { id, description, type, brand, model } = route.params as EditAssetDetailsRouteProps;
  const [piecesTypesSelectData, setPiecesTypesSelectData] = useState(type);

  console.log(id, description,type, brand, model)

  const schema = yup.object().shape({
    brand: yup.string().trim().required("Marca obrigatória."),
    model: yup.string().trim().required("Modelo obrigatório."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      brand: brand,  
      model: model,  
    }
  });

  async function getPiecesTypes() {
    setIsLoading(true);
    try {
      const { data, status } = await getPiecesTypesService();

      if (status === 200) {
        const piecesTypesData = data as GetPiecesTypesResponse;

        if (piecesTypesData.length > 0) {
          const pickerData = [];

          piecesTypesData.map(({ id, description }) =>
            pickerData.push({
              label: description,
              value: String(id),
            })
          );

          setPiecesTypesSelectData(pickerData);
          setSelectedPieceType(Number(pickerData[0].value));

          setIsLoading(false);
        }
      }
    } catch (error) {}
  }

  async function handleUpdatePiece(formData: FormData) {
    setIsUpdating(true);

    const { brand, model } = formData;

    const request: UpdatePieceData = {
      // id,
      // description,
      type: selectedPieceType,
      brand,
      model,
    };

    try {
      await updatePieceData(
        accessLevels.currentCompany.companyId,
        id,
        request
      );

      setIsUpdating(false);

      Toast.show("Ativo atualizado com sucesso!", { type: "success" });
    } catch (error) {
      console.log(error);
      Toast.show(
        "Ocorreu um erro ao atualizar os dados do ativo selecionado. Por favor, verifique suas conexão e tente novamente.",
        { type: "danger" }
      );
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: description,
    });
  }, []);

  useEffect(() => {
    getPiecesTypes();
  }, []);

  if (isLoading)
    return (
      <Loading bgColor={THEME.colors.light} color={THEME.colors.primary} />
    );

  return (
    <Container>
      <Scroll>
        <Form>
          <Wrapper>
            <Select
                editable
                label="Tipo do Ativo"
                placeholder="Tipo do Ativo"
                selected={selectedPieceType}
                values={piecesTypesSelectData}
                onSelect={(value) => setSelectedPieceType(Number(value))}
              />
          </Wrapper>

          <Wrapper>
            <Controller
              name="brand"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isUpdating}
                    error={errors?.brand?.message}
                    label="Marca"
                    onChangeText={onChange}
                    onSubmitEditing={() => modelInputRef.current.focus()}
                    placeholder="Marca"
                    value={value}
                  />
                </>
              )}
            />
          </Wrapper>

          <Wrapper>
            <Controller
              name="model"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isUpdating}
                    error={errors?.model?.message}
                    label="Modelo"
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(handleUpdatePiece)}
                    placeholder="Marca"
                    ref={modelInputRef}
                    value={value}
                  />
                </>
              )}
            />
          </Wrapper>

          <Button
            title="Atualizar"
            onPress={handleSubmit(handleUpdatePiece)}
            disabled={isUpdating}
          />

          {isUpdating && (
            <ActivityIndicator size="large" color={THEME.colors.primary} />
          )}
        </Form>
      </Scroll>
    </Container>
  );
}
