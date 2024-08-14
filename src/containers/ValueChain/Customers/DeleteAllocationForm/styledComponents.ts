import styled from 'styled-components';

import { Text } from 'components/Text';
import { CTAContainer } from 'components/CTAContainer';

export const TextContainer = styled.div`
  max-width: 406px;
  margin-bottom: 2rem;

  ${Text} {
    line-height: 1.7;
  }
`;

export const StyledCTAContainer = styled(CTAContainer)`
  width: 100%;
`;
