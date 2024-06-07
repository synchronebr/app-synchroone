import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 128px;
  justify-content: center;
  margin-right: 20px;
  padding: 8px;
`;
