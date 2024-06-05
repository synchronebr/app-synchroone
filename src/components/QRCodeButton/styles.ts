import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 128px;
  justify-content: center;
  margin-right: 20px;
  padding: ${Platform.OS === "android" ? 10 : 8}px;
`;
