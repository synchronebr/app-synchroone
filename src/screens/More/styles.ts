import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const UserContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const UserImage = styled.Image`
  height: 72px;
  width: 72px;
  border-radius: 50px;
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.gray_light};
`;

export const UserInitials = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_light};
  height: 72px;
  width: 72px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

export const UserInitialsText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.largest};
`;

export const UserInfos = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10;
  margin: 0px 0px 20px 0px;
`;

export const UserInfosText = styled.View``;

export const UserInfosName = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.largest};
`;

export const UserInfosDesc = styled.Text`
  color: ${({ theme }) => theme.colors.gray_dark};
  font-size: ${({ theme }) => theme.fontSize.smaller};
`;

export const Buttons = styled.View`
  gap: 8px;
  padding: 0 20px;
`;
