import styled from 'styled-components';
import { SeaGreen, Supernova } from 'styles/colours';
import { device } from 'styles/variables';

export const DecorativeSquares = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;

  @media ${device.tabletS} {
    margin-right: 48px;
    min-width: 107px;
  }
`;

export const YellowSquareContainer = styled.div`
  display: flex;
  min-width: 52px;

  @media ${device.tabletS} {
    min-width: 107px;
  }
`;

export const GreenSquareContainer = styled.div`
  display: flex;
  min-width: 52px;
  justify-content: flex-end;

  @media ${device.tabletS} {
    min-width: 107px;
  }
`;

export const GreenSquare = styled.div`
  display: flex;
  background-color: ${SeaGreen};

  width: 17px;
  height: 17px;

  @media ${device.tabletS} {
    width: 35px;
    height: 35px;
  }
`;

export const YellowSquare = styled.div`
  display: flex;
  background-color: ${Supernova};

  width: 36px;
  height: 36px;

  @media ${device.tabletS} {
    width: 72px;
    height: 72px;
  }
`;
