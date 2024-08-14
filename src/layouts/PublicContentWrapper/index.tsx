import styled from 'styled-components';
import { White } from 'styles/colours';

export const PublicContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  background: ${White};
  margin: 0 auto;
  transition: all 150ms linear;
  align-items: center;
`;
