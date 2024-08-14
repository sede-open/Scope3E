import styled from 'styled-components';
import { White } from 'styles/colours';

import { device } from 'styles/variables';

export const Header = styled.header`
  display: flex;
  width: 100%;
  padding: 22px 16px;
  margin: 0 auto;
  transition: all 150ms linear;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  position: fixed;
  z-index: 6;
  background-color: ${White};

  @media ${device.tabletS} {
    padding: 24px;
    align-items: center;
  }
`;

export const LogoContainer = styled.div`
  width: 270px;
  cursor: pointer;
  @media ${device.tabletS} {
    width: 327px;
  }
`;

export const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media ${device.tabletS} {
    width: auto;
  }
`;
