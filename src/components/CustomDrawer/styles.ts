import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  /* justify-content: center; */
  margin-bottom: 4px;
  padding: 24px 8px;
`;

export const HeaderTextDiv = styled.View`
  width: 200px;
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
