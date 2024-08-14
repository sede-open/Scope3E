import useTranslation from 'next-translate/useTranslation';

import { SortableTable } from 'components/SortableTable';
import { Row, SortableHeader } from 'components/SortableTable/types';

import * as selectors from '../selectors';
import * as StyledComponents from './styledComponents';

interface IProps<ColumnName extends string> {
  headers: SortableHeader<ColumnName>[];
  rows: Row<ColumnName>[];
  defaultSortColumn: ColumnName;
  summaryRow: React.ReactElement;
}

export const AllocationsTable: <ColumnName extends string>(
  p: IProps<ColumnName>
) => React.ReactElement<IProps<ColumnName>> = ({
  headers,
  rows,
  defaultSortColumn,
  summaryRow,
}) => {
  const { t } = useTranslation();

  return (
    <StyledComponents.TableContainer>
      <SortableTable
        headers={headers.map((header) => ({
          ...header,
          cell: header.cell ? t(header.cell).toUpperCase() : '',
        }))}
        rows={rows}
        dataTestId={selectors.emissionAllocationsTable}
        defaultSortColumn={defaultSortColumn}
        summaryRow={summaryRow}
      />
    </StyledComponents.TableContainer>
  );
};
