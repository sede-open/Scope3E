import styled from 'styled-components';
import { device } from 'styles/variables';

export const SolutionDisplayMobileLayout = styled.div`
  max-width: 343px;
  margin: 0 auto;

  @media ${device.tabletS} {
    display: none;
  }
`;

export const SolutionDisplayTabletLayout = styled.div`
  display: none;

  @media ${device.tabletS} {
    display: block;
    margin: 0 auto;
  }

  @media ${device.laptopS} {
    max-width: 1128px;
  }
`;
