import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
  padding: 20px;
`;

export const Buttons = styled.View`
  /* flex-direction: row; */
  gap: 8px;
  /* margin-bottom: 16px; */
  flex: 1;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  background-color: #0369a11a;
  border-radius: 16px;
  gap: 10px;
  padding: 16px;
`;

export const ButtonTitle = styled.Text`
`;

export const BLEOptionContainer = styled.ScrollView`
  gap: 8px;
  /* margin-top: 16px; */
  flex: 1;
  /* justify-content: center; */
  height: 50px;
`;

export const BLEOption = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  background-color:${({ theme }) => theme.colors.dark};
  border-radius: 8px;
  gap: 10px;
  padding: 16px;
  margin-top: 16px;
`;

export const BLEOptionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.light};
`;
