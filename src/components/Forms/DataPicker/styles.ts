// components/DatePicker/styles.ts
import styled, { css } from "styled-components/native";

export const Wrapper = styled.View``;

export const Label = styled.Text`
  margin-bottom: 6px;
  font-size: 14px;
  opacity: 0.8;
`;

export const Button = styled.TouchableOpacity<{ hasError?: boolean, disabled?: boolean }>`
  height: 44px;
  border-width: 1px;
  border-radius: 5px;
  padding: 0 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${({ theme, hasError, disabled }) => css`
    background: ${theme.colors?.light ?? "#fff"};
    border-color: ${hasError ? theme.colors?.danger : disabled ? theme.colors?.gray : theme.colors?.gray_dark};
  `}
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const CalendarIcon = styled.Text`
  font-size: 16px;
`;

export const BtnText = styled.Text<{ $placeholder?: boolean, disabled?: boolean }>`
  font-size: 16px;
  ${({ $placeholder, disabled, theme }) =>
    $placeholder || disabled
      ? css`color: ${theme.colors?.dark ?? "#6b7280"}; opacity: 0.6;`
      : css`color: ${theme.colors?.dark ?? "#111827"};`}
`;

export const Clear = styled.TouchableOpacity`
  padding: 6px;
  margin-left: 8px;
`;

export const ClearText = styled.Text`
  font-size: 18px;
  line-height: 18px;
  opacity: 0.6;
`;

export const ErrorText = styled.Text`
  margin-top: 6px;
  color: #ef4444;
  font-size: 12px;
`;

export const Backdrop = styled.View`
  flex: 1;
  background: rgba(0,0,0,0.35);
`;

export const Sheet = styled.View`
  position: absolute;
  left: 16px;
  right: 16px;
  top: 15%;
  background: ${({ theme }) => theme.colors?.light ?? "#fff"};
  border-radius: 16px;
  overflow: hidden;
  elevation: 4;
`;

export const SheetHeader = styled.View`
  padding: 14px 16px 8px;
`;

export const SheetTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 12px 14px;
`;

export const Ghost = styled.TouchableOpacity`
  padding: 10px 12px;
  border-radius: 10px;
`;

export const GhostText = styled.Text`
  font-size: 14px;
`;

export const Primary = styled.TouchableOpacity`
  padding: 10px 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors?.primary ?? "#111827"};
`;

export const PrimaryText = styled.Text`
  color: #fff;
  font-weight: 600;
`;
