import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { headerHeight, subheaderHeight } from 'styles/variables';

export const PageContent = styled.div<{
  withBottomPadding?: boolean;
  withSubheader?: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  width: 1168px;
  max-width: 100%;
  padding-right: 1.5625rem;
  padding-left: 1.5625rem;
  padding-bottom: ${({ withBottomPadding }) =>
    withBottomPadding ? '2rem' : 0};
  padding-top: ${ifProp(
    { withSubheader: true },
    headerHeight + subheaderHeight,
    headerHeight
  )}px;
`;
