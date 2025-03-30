import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* padding: 8px 0; */
`;

export const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const StatusIconContainer = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: ${(props) => props.color};
`;

export const InfoContainer = styled.View`
  flex-direction: column;
`;

export const InfoText = styled.Text`
  font-size: 14px;
  color: #374151;
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #64748B;
`;

export const StepperContainer = styled.View`
  width: 30px;
  align-self: left;
`;

export const StepperLine = styled.View`
  width: 2px;
  height: 12px;
  background-color: #d1d5db;
  align-self: center;
`;
