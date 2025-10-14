import styled from "styled-components/native";
import { StyleSheet, View } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const ContentPadding = styled.View`
  padding: 10px 0px 0px 0px;
`;

export const Title = styled.Text`
  background-color: ${({ theme }) => theme.colors.primary_light};
  text-align: center;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
`;

export const HeaderSpacing = styled.View`
  height: 10px;
`;

export const ListSeparator = styled.View`
  height: 10px;
`;

export const SectionSeparator = styled.View`
  height: 16px;
`;

export const CompanyContent = styled.TouchableOpacity<{ selected?: boolean }>`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray};
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 4px;
  gap: 10px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary_light : "transparent"};
`;

export const CompanyImageWrapper = styled.View`
  height: 36px;
  width: 36px;
  border-radius: 8px;
  overflow: hidden;
`;

export const CompanyImage = styled.Image`
  height: 100%;
  width: 100%;
`;

export const VerticalDivider = styled.View`
  width: ${StyleSheet.hairlineWidth}px;
  align-self: stretch;
  background-color: ${({ theme }) => theme.colors.gray};
`;

export const CompanyText = styled.Text`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;
