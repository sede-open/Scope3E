import styled from 'styled-components';
import { White } from 'styles/colours';
import { device } from 'styles/variables';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  background: ${White};
  padding: 0px 16px;
  transition: all 150ms linear;
  margin-top: 80px;

  @media ${device.tabletS} {
    margin: 160px 0 0 12px;
  }

  @media ${device.laptopS} {
    margin-top: 115px;
    align-items: center;
  }

  @media ${device.laptopL} {
    padding: 0;
    margin: 130px auto 0 auto;
    max-width: 1680px;
  }
`;

export const PageContentContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media ${device.laptopS} {
    padding: 50px 36px 0 0;
    width: 1110px;
  }
`;

export const GraphicContainer = styled.div`
  display: none;

  @media ${device.tabletS} {
    display: block;
    margin-right: 20px;
  }
  @media ${device.laptopS} {
    margin-right: 48px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 475px;

  @media ${device.tabletS} {
    margin: 0;
  }

  @media ${device.laptopS} {
    max-width: 648px;
  }
`;
