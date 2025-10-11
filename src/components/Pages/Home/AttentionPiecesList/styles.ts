import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Row = styled.View`
  padding: 16px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
  min-width: 0px; /* permite truncar textos */
  gap: 8px;
`;

export const AvatarWrap = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_light};
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const AvatarFallback = styled.Text`
  width: 100%;
  height: 100%;
  text-align: center;
  text-align-vertical: center;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray_dark};
`;

export const Texts = styled.View`
  min-width: 0px;
  flex-shrink: 1;
  /* padding: 0px 8px; */
`;

export const Title = styled.Text<{ $muted?: boolean }>`
  font-size: ${({ $muted, theme }) => ($muted ? theme.fontSize.smallest : theme.fontSize.smaller)};
  font-weight: 600;
  color: ${({ $muted, theme }) => ($muted ? theme.colors.gray : theme.colors.primary)};
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SubTitle = styled.Text`
  margin-top: 2px;
  font-size: ${({ theme }) => theme.fontSize.smallest};
  color: ${({ theme }) => theme.colors.gray_dark};
`;

export const Badge = styled.TouchableOpacity`
  padding: 2px 8px;
  border-radius: 4px;
  align-self: center;
`;

export const BadgeText = styled.Text`
  font-size: 12px;
  font-weight: 700;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray_light};
  margin-left: 68px; /* alinha com o início do texto após o avatar */
`;
