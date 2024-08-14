import styled from 'styled-components';
import { CongressBlue, abcdGray } from 'styles/colours';
import { Text } from 'components/Text';

export const PercentageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Percentage = styled(Text).attrs({ color: CongressBlue })`
  line-height: 20px;
`;

export const PercentageBar = styled.div<{ percentAllocated?: number }>`
  background-color: ${abcdGray};
  height: 9px;
  width: 90%;
  background: ${({ percentAllocated }) =>
    `linear-gradient(to right, ${CongressBlue} ${percentAllocated}%, ${abcdGray} 0%)`};
`;
