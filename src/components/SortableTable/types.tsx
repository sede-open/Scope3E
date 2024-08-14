export type ColumnCell = React.ReactElement | string | number | null;

export type Column<ColumnName extends string> = {
  columnName: ColumnName;
  cell: ColumnCell;
  sortValue?: string | number | null;
};

export type Row<ColumnName extends string> = {
  rowName: string;
  columns: Column<ColumnName>[];
  isHighlighted?: boolean;
};

export type TableSortFunction<ColumnName extends string> = (params: {
  unsortedRows: Row<ColumnName>[];
  sortByColumn: ColumnName;
  isSortedAscending: boolean;
}) => Row<ColumnName>[];

export type SortableHeader<ColumnName extends string> = {
  columnName: ColumnName;
  cell: string;
  isSortable?: boolean;
  sortFunction?: TableSortFunction<ColumnName>;
};

export type IProps<ColumnName extends string> = {
  headers: SortableHeader<ColumnName>[];
  rows: Row<ColumnName>[];
  onPageChange?: (page: number) => void;
  onSort?: (column: ColumnName, direction: SortTypes) => void;
  dataTestId?: string;
  defaultSortColumn: ColumnName;
  summaryRow?: React.ReactElement;
  hasLargePaddingLeft?: boolean;
  perPage?: number;
  size?: number;
  loading?: boolean;
  serverMode?: boolean; // Pagination and sorting done by server
};

export type SortConfigType<ColumnName extends string> = {
  sortByColumn: ColumnName;
  isSortedAscending: boolean;
  sortFunction?: TableSortFunction<ColumnName>;
};

export interface PaginationProps {
  perPage: number;
  page: number;
  size: number;
  onPageChange: (page: number) => void;
}

export interface ISortConfig<ColumnName extends string> {
  sortByColumn: string;
  sortFunction: TableSortFunction<ColumnName> | undefined;
  isSortedAscending: boolean;
}

export enum SortTypes {
  ASC,
  DESC,
}
