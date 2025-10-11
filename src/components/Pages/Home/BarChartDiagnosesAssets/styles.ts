import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  width: 100%;
`;

export const Item = styled.View`
  min-width: 0px;
  flex-direction: column;
  margin-bottom: 8px;
`;

export const Head = styled.View`
  margin-bottom: 4px;
  min-width: 0px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.normal};
  font-weight: 600;
  color: ${({ theme }) => theme?.colors?.primary ?? "rgba(17,24,39,1)"};
  flex-shrink: 1;
  min-width: 0px;
`;

export const SubTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.smallest};
  color: ${({ theme }) => theme?.colors?.gray_dark ?? "rgba(107,114,128,1)"};
  margin-top: 2px;
  flex-shrink: 1;
  min-width: 0px;
`;

export const Track = styled.View`
  position: relative;
  width: 100%;
  height: 16px;
  border-radius: 4px;
  overflow: hidden;
  border-width: 1px;
`;

export const Fill = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
`;

export const FillValue = styled.Text`
  position: absolute;
  right: 8px;
  top: 60%;
  /* translateY(-50%) no RN = usar lineHeight/position — aqui centralizamos por padding */
  transform: translateY(-8px);
  font-size: 7px;
  font-weight: 700;
  color: #ffffff;
`;
