
import React from "react";

import { Entypo, AntDesign } from "@expo/vector-icons";
import { ImageIconProps } from "./types";

import { useTheme } from "styled-components/native";

import { 
  Container, 
  Content,
  Image,
} from "./styles";
import { useAccessLevels } from "../../hooks/useAccessLevels";

export default function ImageIcon<T>({ 
  focused,
 }: ImageIconProps<T>) {

  const { getAccessLevels, getAccessLevelsData } = useAccessLevels();
  const accessLevels = getAccessLevelsData();

  const companyImage = accessLevels?.companies?.find(
    (company) => company.companyId === accessLevels?.currentCompany?.companyId
  )?.image;

  return (
    <Container>
      <Content focused={focused}>
        <Image
          resizeMode="cover"
          source={
            companyImage
              ? { uri: companyImage }
              : require("../../assets/images/app-icon.png")
          }
        />
      </Content>
    </Container>
  );
}
