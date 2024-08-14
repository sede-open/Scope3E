import styled from 'styled-components';

import { Alto, abcdGray } from 'styles/colours';

export const Animation = styled.div`
  height: 1.25rem;
  animation: placeHolderShimmer 1.5s infinite;
  animation-timing-function: linear;

  @keyframes placeHolderShimmer {
    0% {
      background: linear-gradient(90deg, ${Alto} 0%, ${abcdGray} 100%);
    }
    25% {
      background: linear-gradient(90deg, ${Alto} 26.56%, ${abcdGray} 100%);
    }
    50% {
      background: linear-gradient(90deg, ${Alto} 68.23%, ${abcdGray} 100%);
    }
    100% {
      background: linear-gradient(90deg, ${abcdGray} 0%, ${Alto} 100%);
    }
  }
`;
