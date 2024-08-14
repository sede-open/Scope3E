import styled from 'styled-components';

import { Link } from 'components/Link';
import { AlizarinCrimson, Mandy } from 'styles/colours';

export const InputErrorLink = styled(Link)`
  color: ${AlizarinCrimson};

  &:hover,
  &:active,
  &:focus {
    color: ${Mandy};
  }
`;
