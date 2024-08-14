import styled from 'styled-components';

import { AlizarinCrimson, Alto, abcdGray } from 'styles/colours';
import { Cell } from 'components/Table';

export const TotalCell = styled(Cell)<{
  isOverAllocated?: boolean | undefined;
  $fontWeight?: string;
}>`
  background: ${abcdGray};
  border-top: 1px solid ${Alto};
  font-weight: ${({ $fontWeight }) => $fontWeight || '100'};
  padding: 1rem;

  ${({ isOverAllocated }) =>
    isOverAllocated &&
    `
    color: ${AlizarinCrimson};
  `}
`;

export const OverAllocatedMessageContainer = styled.span`
  font-weight: 400;
  padding-left: 1rem;
`;
