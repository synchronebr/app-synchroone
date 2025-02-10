import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-bottom: 4px;
  padding: 24px 12px;
`;

export const Logo = styled.Image`
  border-radius: 16px;
  height: 96px;
  width: 96px;
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
