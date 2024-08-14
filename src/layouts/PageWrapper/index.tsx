import styled from 'styled-components';

import { White } from 'styles/colours';

export const PageWrapper = styled.div<{
  background?: string;
  fillHeight?: boolean;
}>`
  background: ${({ background }) => background ?? White};
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;

  ${({ fillHeight }) =>
    fillHeight &&
    `
    min-height: 100%;
  `}
`;

export const JustifiedPageWrapper = styled(PageWrapper)<{
  $justifyContent?: string;
}>`
  justify-content: ${({ $justifyContent }) => $justifyContent ?? 'unset'};
`;
