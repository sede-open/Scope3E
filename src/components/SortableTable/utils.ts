import { ColumnCell, Row, SortableHeader, SortConfigType } from './types';

export const DEFAULT_SHOULD_SORT_ASCENDING = true;

export const truncate = (str: string | ColumnCell) =>
  String(str).length > 50 ? `${String(str).substring(0, 45)}...` : str;

type SortValue = number | string | null;

const sortAscendingOrder = (a?: SortValue, b?: SortValue) => {
  if (!a && a !== 0) {
    return 1;
  }

  if (!b && b !== 0) {
    return -1;
  }

  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  return 0;
};

const sortDescendingOrder = (a?: SortValue, b?: SortValue) => {
  if (!a && a !== 0) {
    return 1;
  }

  if (!b && b !== 0) {
    return -1;
  }

  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }

  return 0;
};

const getSortValue = (
  customSortValue?: string | number | null,
  cellValue?: ColumnCell
) => {
  if (customSortValue) {
    return customSortValue;
  }

  if (typeof cellValue === 'string' || typeof cellValue === 'number') {
    return cellValue;
  }

  return null;
};

export const defaultSortFunction: <ColumnName extends string>(p: {
  unsortedRows: Row<ColumnName>[];
  sortByColumn: ColumnName;
  isSortedAscending: boolean;
}) => Row<ColumnName>[] = ({ unsortedRows, sortByColumn, isSortedAscending }) =>
  unsortedRows.sort((a, b) => {
    const aColumn = a.columns.find(
      (column) => column.columnName === sortByColumn
    );
    const bColumn = b.columns.find(
      (column) => column.columnName === sortByColumn
    );

    const aColumnValue = getSortValue(aColumn?.sortValue, aColumn?.cell);
    const bColumnValue = getSortValue(bColumn?.sortValue, bColumn?.cell);

    return isSortedAscending
      ? sortAscendingOrder(aColumnValue, bColumnValue)
      : sortDescendingOrder(aColumnValue, bColumnValue);
  });

export const getInitialSortConfig: <ColumnName extends string>(params: {
  defaultSortColumn: ColumnName;
  headers: SortableHeader<ColumnName>[];
}) => SortConfigType<ColumnName> = ({ defaultSortColumn, headers }) => {
  const headerColumnToSortBy = headers.find(
    (header) => header.columnName === defaultSortColumn
  );

  const baseConfig = {
    sortByColumn: defaultSortColumn,
    sortFunction: headerColumnToSortBy?.sortFunction,
    isSortedAscending: DEFAULT_SHOULD_SORT_ASCENDING,
  };

  return {
    ...baseConfig,
  };
};

export const paginate = <T>(data: T[], perPage: number, page: number) => {
  return data.slice((page - 1) * perPage, page * perPage);
};
