import styled from 'styled-components';
import { White, Alto } from 'styles/colours';
import { headerHeight } from 'styles/variables';

export const StyledHeader = styled.header`
  border-bottom: 1px solid ${Alto};
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 6;
`;

export const StyledWrapper = styled.div`
  align-items: center;
  background: ${White};
  display: flex;
  flex-direction: row;
  height: ${headerHeight}px;
  padding: 0rem 1rem;
  width: 100%;
`;

export const LogoContainer = styled.div`
  display: flex;
`;
