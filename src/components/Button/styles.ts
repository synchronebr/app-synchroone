import styled, { css } from "styled-components/native";

interface ContainerProps {
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<ContainerProps>`
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 12px 16px;

  ${({ theme, variant }) => {
    switch (variant) {
      case "secondary":
        return css`
          background-color: ${theme.colors.primary};
        `;
      case "outline":
        return css`
          background-color: transparent;
          border: 1.5px solid ${theme.colors.secondary};
        `;
      case "danger":
        return css`
          background-color: ${theme.colors.error};
        `;
      case "success":
        return css`
          background-color: ${theme.colors.success};
        `;
      default:
        return css`
          background-color: ${theme.colors.secondary};
        `;
    }
  }}
`;

interface TitleProps {
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
}

export const Title = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.smaller}px;
  text-align: center;

  ${({ theme, variant }) => {
    switch (variant) {
      case "outline":
        return css`
          color: ${theme.colors.primary};
        `;
      default:
        return css`
          color: ${theme.colors.light};
        `;
    }
  }}
`;
