import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 60px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 26px;
  text-align: center;
`;

export const NotificationsIconContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})``;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_light};
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  padding-bottom: 24px;
  flex: 1;
`;

export const ContentHeader = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  padding: 20px;
  margin-bottom: 10px;
`;

export const ContentHeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const ContentHeaderTopTabs = styled.View`
  width: 160px;
`;

export const CalendarContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  padding: 4px 8px;
  border-radius: 6px;
  border-color: ${({ theme }) => theme.colors.primary_light};
`;

export const CalendarText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.smallest};
  color: ${({ theme }) => theme.colors.gray_dark};
`;

export const ContentHeaderGraphContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContentHeaderGraph = styled.View`
  width: 84px;
  height: 84px;
  justify-content: center;
  align-items: center;
`;

export const ContentHeaderGraphText = styled.View`
  flex: 1;
  min-width: 0;
  margin-left: 10px;
`;

export const ContentHeaderGraphTextTitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray_dark};
  font-weight: 600;
`;

export const ContentHeaderGraphTextDesc = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  flex-wrap: wrap;
`;

export const ContentView = styled.View`
  padding: 0 10px;
  gap: 10px;
`;

export const ContentViewContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 12px;
  border-radius: 8px;
  flex: 1;
  gap: 8;
`;

export const ContentViewBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContentViewCenter = styled.View`
  align-items: center;
`;

export const ContentViewFlex = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
`;

export const ContentViewBigNumber = styled.Text`
  font-size: 28px;
  line-height: 34px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const ContentViewBallCicle = styled.View`
  padding: 6px;
  background-color: ${({ theme }) => theme.colors.primary_light};
  border-radius: 100px;
`;

export const ContentViewSmallText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.smallest};
  color: ${({ theme }) => theme.colors.primary};
`;

export const ContentViewSmallTextMaxWidth = styled.Text`
  max-width: 100px;
`;

export const AssetsWarningContent = styled.View`
`;

export const AssetsWarningTitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray_dark};
`;

export const AssetsWarningSubtitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.smaller};
`;
export const EmptyContainer = styled.View`
  padding: 20px 10px;
`;

export const FilterWrapper = styled.View`
  display: "flex";
  flex-direction: column;
  justify-content: space-between;
  width: "100%";
  height: "100%";
  background-color: ${({ theme }) => theme.colors.light};
  padding: 16px;
  border-radius: 10px;
`;

export const FilterHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const FilterContent = styled.View`
  flex: 1;
  flex-direction: "column";
  gap: 10;
`;

export const FilterWrapperTitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const DropdownWrapper = styled.View``;
