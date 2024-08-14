import styled from 'styled-components';
import { ifProp } from 'styled-tools';

export const SortArrowWrapper = styled.div<{
  shouldDisplayDown: boolean;
  shouldDisplay: boolean;
}>`
  min-width: 20px;
  display: inline;
  padding-left: 5px;

  opacity: ${ifProp({ shouldDisplay: true }, '1 !important', '0')};

  svg {
    ${ifProp({ shouldDisplayDown: true }, 'transform: rotate(180deg);', '')}
  }
`;
