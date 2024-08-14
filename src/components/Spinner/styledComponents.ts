import styled, { keyframes } from 'styled-components';
import { prop } from 'styled-tools';

import { CongressBlue, Alto } from 'styles/colours';

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div.attrs({
  size: '1.5rem',
})<{ $size?: string }>`
  width: ${prop('$size')};
  height: ${prop('$size')};
  border-radius: 50%;
  position: relative;
  border: 4px solid ${Alto};
  border-right: 4px solid ${CongressBlue};
  animation: ${spin} 1s linear infinite;
`;
