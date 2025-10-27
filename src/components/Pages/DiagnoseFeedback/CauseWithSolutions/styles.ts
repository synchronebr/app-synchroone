import styled from "styled-components/native";

export const Card = styled.View`
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
`;
export const CardHeader = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_light};
  padding: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const CardHeaderLeft = styled.View`
  max-width: 90%;
`;
export const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.smaller + 1}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;
export const CardDesc = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.9;
  line-height: 18px;
`;
export const CardBody = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_light};
  gap: 8px;
  padding: 8px 12px 12px;
`;

export const SolutionsTitle = styled.Text`
  margin-top: 20px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSize.smaller + 1}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const SolutionsBlock = styled.View`
  margin-top: 10px;
  gap: 10px;
`;

export const SolutionCard = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 6px;
  padding: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray};
  gap: 10;
`;

export const SolutionTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const SolutionDesc = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.9;
  line-height: 18px;
`;

export const SolutionActions = styled.View`
  margin-top: 8px;
  gap: 8px;
`;
export const PillBtn = styled.TouchableOpacity<{active?: boolean}>`
  padding: 12px;
  border-radius: 999px;
  align-items: center;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.secondary : theme.colors.text_light};
`;

export const StatusBadge = styled.Text`
  margin-top: 8px;
  align-self: flex-start;
  padding: 6px 10px;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.light};
  background-color: ${({ theme }) => theme.colors.text_light};
`;
