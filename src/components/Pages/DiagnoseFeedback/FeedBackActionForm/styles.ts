import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 12px 16px;
  gap: 26;
`;

/* Linha com label + switch */
export const SwitchRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.larger};
  font-weight: 500;
`;

/* Wrapper dos campos que ficam abaixo do switch quando ativo */
export const FieldBlock = styled.View`
  padding: 8px;
  gap: 12px;
`;

export const Field = styled.View``;

export const FieldLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.normal};
  font-weight: 500;
  margin-bottom: 6px;
`;

export const DateButton = styled.Pressable`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_light};
  border-radius: 8px;
  padding: 10px 12px;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const DateText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 15px;
`;

export const DatePickerContainer = styled.View`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_light};
  border-radius: 10px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.light};
  margin-top: 8px;
`;

export const PickerRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

export const PickerCancel = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.gray_dark};
  padding: 6px 10px;
  border-radius: 8px;
  margin-right: 8px;
`;

export const PickerConfirm = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 6px 10px;
  border-radius: 8px;
`;

export const PickerCancelText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const PickerConfirmText = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-weight: 600;
`;

export const PickerText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
`;

export const DowntimeRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const DowntimeInput = styled.TextInput`
  width: 90px;
  height: 44px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray};
  border-radius: 8px;
  padding: 0 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.light};
`;

export const UnitWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const UnitChip = styled.Pressable<{ active?: boolean }>`
  padding: 0 12px;
  height: 44px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.gray_light};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary_light : theme.colors.light};
  justify-content: center;
`;

export const UnitText = styled.Text<{ active?: boolean }>`
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.primary};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? "600" : "400")};
`;

export const SectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  margin: 12px 0 8px;
`;
