import styled from 'styled-components';

import { Alto, Tundora } from 'styles/colours';

export const TableComponent = styled.table.attrs({
  cellSpacing: 0,
  cellPadding: 0,
})`
  border-top: 1px solid ${Alto};
  width: 100%;
`;

export const Cell = styled.td`
  color: ${Tundora};
  font-size: 0.875rem;
  padding: 1.3rem;
  text-align: left;
  vertical-align: top;
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
  text-transform: uppercase;
  white-space: nowrap;
`;
