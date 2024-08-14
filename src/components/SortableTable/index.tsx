import { Spinner } from 'components/Spinner';
import { useMemo, useRef, useState } from 'react';
import { SortArrow } from './SortArrow';
import * as StyledComponents from './styledComponents';
import { TableBottomNav } from './TableBottomNav';
import { IProps, SortableHeader, SortTypes, TableSortFunction } from './types';
import {
  defaultSortFunction,
  DEFAULT_SHOULD_SORT_ASCENDING,
  getInitialSortConfig,
  paginate,
  truncate,
} from './utils';

type SortConfig<T extends string> = {
  sortByColumn: T;
  sortFunction?: TableSortFunction<T>;
  isSortedAscending: boolean;
};

export const SortableTable: <ColumnName extends string>(
  p: IProps<ColumnName>
) => React.ReactElement<IProps<ColumnName>> = ({
  headers,
  rows: propRows,
  dataTestId,
  defaultSortColumn,
  summaryRow,
  hasLargePaddingLeft,
  onPageChange: onPageChangeProp,
  onSort,
  size,
  loading,
  perPage = 15,
  serverMode,
}) => {
  const [page, setPage] = useState(1);

  const rowSize = size ?? propRows.length;

  const tableReference = useRef<HTMLTableElement>(null);

  const [sortConfig, setSortConfig] = useState<
    SortConfig<typeof defaultSortColumn>
  >(
    getInitialSortConfig<typeof defaultSortColumn>({
      defaultSortColumn,
      headers,
    })
  );

  const rows = useMemo(() => {
    if (serverMode) {
      return propRows;
    }
    const sortedRows = sortConfig?.sortFunction
      ? sortConfig.sortFunction({
          unsortedRows: propRows,
          sortByColumn: sortConfig.sortByColumn,
          isSortedAscending: sortConfig.isSortedAscending,
        })
      : propRows;
    if (size) {
      return paginate(sortedRows, perPage, 1);
    }
    const result = paginate(sortedRows, perPage, page);
    return result;
  }, [size, paginate, propRows, perPage, page, sortConfig, serverMode]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
    if (tableReference.current) {
      // scrolls to top of table
      tableReference.current.scrollIntoView();
      // scroll 73 pixel highers as the fixed heading hides the top of the table
      window.scrollBy(0, -73);
    }
    if (onPageChangeProp) {
      onPageChangeProp(pageNumber);
    }
  };

  const onHeaderClick = (header: SortableHeader<typeof defaultSortColumn>) => {
    if (header.isSortable) {
      const isAlreadySelected = sortConfig.sortByColumn === header.columnName;
      const sortFunction = header.sortFunction ?? defaultSortFunction;
      const updatedSortConfig: SortConfig<any> = {
        sortByColumn: header.columnName,
        sortFunction,
        isSortedAscending: isAlreadySelected
          ? !sortConfig.isSortedAscending
          : DEFAULT_SHOULD_SORT_ASCENDING,
      };

      setSortConfig(updatedSortConfig);

      if (onSort) {
        onSort(
          updatedSortConfig.sortByColumn,
          updatedSortConfig.isSortedAscending ? SortTypes.ASC : SortTypes.DESC
        );
      }
      setPage(1);
    }
  };

  return (
    <>
      <StyledComponents.TableComponent
        data-testid={dataTestId}
        hasLargePaddingLeft={hasLargePaddingLeft}
        ref={tableReference}
      >
        <thead>
          <tr>
            {headers.map((header) => {
              const isColumnSelectedForSort =
                sortConfig.sortByColumn === header.columnName;
              const shouldDisplaySortArrowDown =
                sortConfig.sortByColumn === header.columnName
                  ? sortConfig.isSortedAscending
                  : true;
              const headerId = `header-${header.columnName}`;

              return (
                <StyledComponents.HeaderCell
                  key={headerId}
                  data-testid={headerId}
                  isClickable={header.isSortable}
                  onClick={() => onHeaderClick(header)}
                >
                  <StyledComponents.HeaderCellInner
                    isSelected={isColumnSelectedForSort}
                  >
                    {header.cell}
                    {header.isSortable && (
                      <SortArrow
                        shouldDisplay={isColumnSelectedForSort}
                        shouldDisplayDown={shouldDisplaySortArrowDown}
                      />
                    )}
                  </StyledComponents.HeaderCellInner>
                </StyledComponents.HeaderCell>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <StyledComponents.TableSpinnerContainer>
              <Spinner $size="3rem" />
            </StyledComponents.TableSpinnerContainer>
          )}
          {!loading &&
            rows.map(({ columns, rowName, isHighlighted }) => (
              <StyledComponents.TableRow
                $isHighlighted={isHighlighted}
                key={rowName}
                data-testid={`${dataTestId}-row`}
              >
                {columns.map((cell) => (
                  <StyledComponents.Cell
                    key={`rowcell-${rowName}-${cell.columnName}`}
                    data-testid={`rowcell-${rowName}-${cell.columnName}`}
                    title={typeof cell.cell === 'string' ? cell.cell : ''}
                  >
                    {typeof cell.cell === 'string'
                      ? truncate(cell.cell)
                      : cell.cell}
                  </StyledComponents.Cell>
                ))}
              </StyledComponents.TableRow>
            ))}
          {!loading && summaryRow && (
            <tr data-testid={`${dataTestId}-summary-row`}>{summaryRow}</tr>
          )}
        </tbody>
      </StyledComponents.TableComponent>
      {rowSize > perPage && (
        <TableBottomNav
          page={page}
          perPage={perPage}
          size={rowSize}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export const { Cell } = StyledComponents;
