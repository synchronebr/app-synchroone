import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 128px;
  height: ${RFValue(56)}px;
  justify-content: center;
  margin-bottom: ${RFValue(22)}px;
  padding: 10px;
  width: ${RFValue(56)}px;
`;
