import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primary_light};
`;

export const CardHeader = styled.TouchableOpacity.attrs({ activeOpacity: 0.9 })`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary_light};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CardHeaderLeft = styled.View`
  flex-direction: column;
  gap: 4px;
  max-width: 90%;
`;

export const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.smaller + 1}px;
  color: ${({ theme }) => theme.colors.dark};
`;

export const CardDesc = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  opacity: 0.9;
  line-height: 18px;
`;

export const CardBody = styled.View`
  gap: 8px;
  padding: 10px 12px 12px;
  background-color: ${({ theme }) => theme.colors.primary_light};
`;

export const StatusRow = styled.View`
  /* margin-top: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px; */
`;

export const ChevronBtn = styled(Feather)`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.dark};
`;

export const Footer = styled.View`
  margin-top: 16px;
`;
