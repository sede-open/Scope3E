import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { Alto, CongressBlue, abcdGray, Tundora, White } from 'styles/colours';
import { device } from 'styles/variables';
import { SortArrowWrapper } from './SortArrow/styledComponents';

export const TableComponent = styled.table.attrs({
  cellSpacing: 0,
  cellPadding: 0,
})<{ hasLargePaddingLeft?: boolean }>`
  border-top: 1px solid ${Alto};
  width: 100%;
  border-collapse: collapse;

  th {
    background-color: ${White};
  }
  th:first-child,
  tr td:first-child {
    padding-left: ${ifProp({ hasLargePaddingLeft: true }, '3rem', '1.3rem')};
  }
  th:last-child,
  tr td:last-child {
    padding-right: 3rem;
  }

  tr:nth-child(odd) {
    background: ${abcdGray};
  }
`;

export const Cell = styled.td<{ isClickable?: boolean }>`
  color: ${Tundora};
  font-size: 0.875rem;
  padding: 1rem;
  text-align: left;
  vertical-align: top;
  cursor: ${ifProp({ isClickable: true }, 'pointer', 'default')};
  max-width: 195px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  height: 72px;
  vertical-align: middle;

  :hover {
    ${SortArrowWrapper} {
      opacity: 0.5;
    }
  }
  @media ${device.laptopM} {
    max-width: 275px;
  }
`;

export const HeaderCell = styled(Cell).attrs({
  as: 'th',
})`
  border-bottom: 1px solid ${Alto};
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 1.1rem;
  padding-top: 1.3rem;
`;

export const HeaderCellInner = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: ${ifProp({ isSelected: true }, '700', '400')};
`;

export const TableSpinnerContainer = styled.div`
  height: 3rem;
  & > div {
    position: absolute;
    left: calc(50% - 1.5rem);
  }
`;

export const TableRow = styled.tr<{ $isHighlighted?: boolean }>`
  ${ifProp({ $isHighlighted: true }, `border-left: 8px solid ${CongressBlue};`)}
`;
