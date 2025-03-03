import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
})``;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray_dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  line-height: 18px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  line-height: 18px;
`;

export const Divider = styled.View`
  background-color: ${({ theme }) => theme.colors.gray};
  border-color: ${({ theme }) => theme.colors.gray};
  border-width: 0.5px;
  margin: 16px 0;
`;

export const HistoryCards = styled.View`
  gap: 16px;
  margin: 16px 0;
`;

export const SeeMoreButton = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})``;

export const SeeMore = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  line-height: 18px;
  text-align: right;
`;

export const ShareButtonContainer = styled.View`
  margin-bottom: 32px;
`;
