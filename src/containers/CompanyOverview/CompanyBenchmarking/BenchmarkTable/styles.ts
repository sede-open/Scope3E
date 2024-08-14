import styled from 'styled-components';
import {
  AlizarinCrimson,
  Alto,
  FunGreen,
  abcdGray,
  White,
} from 'styles/colours';

export const TableContainer = styled.div`
  border-left: 1px solid ${Alto};
  border-right: 1px solid ${Alto};
  border-bottom: 1px solid ${Alto};

  tr:nth-child(odd) {
    background: ${abcdGray};
  }

  tr:nth-child(even) {
    background: ${White};
  }
`;

export const ColouredNumber = styled.span<{ $value: number }>`
  color: ${({ $value }) => {
    if ($value < 0) return FunGreen;
    if ($value > 0) return AlizarinCrimson;
    return 'auto';
  }};
`;
