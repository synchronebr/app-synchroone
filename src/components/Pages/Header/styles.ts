// styles.ts
import styled from "styled-components/native";

interface IProps {
  variant: string;
}

export const Container = styled.View<IProps>`
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'secondary':
        return theme.colors.primary
    
      default:
        return theme.colors.light
    }
  }};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px 20px 20px;
  position: relative; 
  height: 60;
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

export const Title = styled.Text<IProps>`
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'secondary':
        return theme.colors.light
    
      default:
        return theme.colors.primary
    }
  }};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.larger};
`;
