import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  /* justify-content: center; */
  margin-bottom: 24px;
  padding: 24px 20px 10px 10px;
`;

export const HeaderTextDiv = styled.View`
  flex: 1;
`;

export const Logo = styled.Image`
  border-radius: 8px;
  height: 56px;
  width: 56px;
`;

export const CompanyName = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.larger}px;
`;

export const AccessLevel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const Title = styled.Text`
  margin: 0px 0px 0px 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const TitleSecond = styled.Text`
  margin: 24px 0px 0px 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const LeftItemButtons = styled.View`
  gap: 20;
`;

export const LeftItemButton = styled.TouchableOpacity`
  flex-direction: row;
  gap: 10;
  align-items: center;
`;

export const LeftItemButtonText = styled.View`

`;

export const LeftItemButtonTitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const LeftItemButtonSubtitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray_dark};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.smallest}px;
`;

export const FooterContent = styled.TouchableOpacity`
  flex-direction: row;
  gap: 10;
  align-items: center;
  margin: 20px 10px;
  padding-top: 10px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_dark};
`;

