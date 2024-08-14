import styled from 'styled-components';

import { device } from 'styles/variables';
import { Text } from 'components/Text';
import { Button } from 'components/Button';

export const TextWrapper = styled.div`
  text-align: left;
  width: 100%;

  @media ${device.tabletM} {
    width: 46.5rem;
  }
`;

export const Header = styled(Text)`
  margin-bottom: 0.5rem;
  font-size: 24px;

  @media ${device.tabletM} {
    font-size: 32px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  margin-top: 2rem;
`;

export const StyledButton = styled(Button)`
  text-decoration: none;
`;
