// styles.ts
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px 20px 20px;
  position: relative; 
`;

export const LeftIcons = styled.View`
  flex-direction: row;
  align-items: center;
  width: 56px; 
  gap: 16px;
`;

export const LeftIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 56px; 
`;

export const RightIcons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  width: 56px; 
`;

export const TitleWrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  align-items: center; 
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.larger};
`;
