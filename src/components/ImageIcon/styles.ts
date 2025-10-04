// styles.ts
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 2px;
`;

interface ContentProps {
  focused?: boolean;
}

export const Content = styled.View<ContentProps>`
  width: 26px;        
  height: 26px;
  border-radius: 25px;  
  border-width: 1px;
  overflow: hidden;
  border-color: ${({ focused, theme }) => focused ? theme.colors.primary : theme.colors.gray_dark};
`;

export const Image = styled.Image`
  position: absolute;   
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;
