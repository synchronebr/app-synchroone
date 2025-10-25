import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary_light};
  border-radius: 4px;
  padding: 2px;
  gap: 20;
`;

export const CardImage = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  height: 250px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  /* border-radius: 8px; */
  /* height: 108px; */
  /* width: 108px; */  
  height: 100%;
`;

export const CardText = styled.View`
  align-items: center;
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.larger};
`;

export const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.smaller};
  color: ${({ theme }) => theme.colors.gray_dark};
`;
