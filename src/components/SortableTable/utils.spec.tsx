import { Row } from './types';
import {
  defaultSortFunction,
  DEFAULT_SHOULD_SORT_ASCENDING,
  getInitialSortConfig,
  paginate,
} from './utils';

describe('SortableTable utils', () => {
  enum ColumnNames {
    STATUS = 'STATUS',
    ACTIONS = 'ACTIONS',
  }

  const rowsWithNumberValues = [
    {
      rowName: '0',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: 4,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 5,
        },
      ],
    },
    {
      rowName: '2',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: 5,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 4,
        },
      ],
    },
    {
      rowName: '3',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: -1,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 6,
        },
      ],
    },
    {
      rowName: '4',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: 0,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 6,
        },
      ],
    },
  ];

  const rowsWithStringValues = [
    {
      rowName: '1',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: 4,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 'hello',
        },
      ],
    },
    {
      rowName: '2',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: 5,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 'hallo',
        },
      ],
    },
    {
      rowName: '3',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: -1,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 'allo',
        },
      ],
    },
    {
      rowName: '4',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: 0,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 'zallo',
        },
      ],
    },
  ];

  const rowsWithNullValues = [
    {
      rowName: '1',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: 4,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 'hello',
        },
      ],
    },
    {
      rowName: '2',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: 5,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 'hallo',
        },
      ],
    },
    {
      rowName: '3',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: -1,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: null,
        },
      ],
    },
    {
      rowName: '4',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: 0,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 'zallo',
        },
      ],
    },
  ];

  const rowsWithCustomSortValues = [
    {
      rowName: '1',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: 4,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 'hello',
          sortValue: 3,
        },
      ],
    },
    {
      rowName: '2',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: 5,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 'hallo',
          sortValue: 5,
        },
      ],
    },
    {
      rowName: '3',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: -1,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 'allo',
          sortValue: 10,
        },
      ],
    },
    {
      rowName: '4',
      columns: [
        {
          columnName: ColumnNames.ACTIONS,
          cell: 0,
        },
        {
          columnName: ColumnNames.STATUS,
          cell: 'zallo',
          sortValue: 1,
        },
      ],
    },
  ];

  describe(defaultSortFunction.name, () => {
    describe('when sorting ascending', () => {
      describe('when column values are numbers', () => {
        it('should sort by specified column name', () => {
          const result = defaultSortFunction({
            unsortedRows: [...rowsWithNumberValues],
            sortByColumn: ColumnNames.ACTIONS,
            isSortedAscending: true,
          });

          expect(result[0]).toEqual(rowsWithNumberValues[2]);
          expect(result[1]).toEqual(rowsWithNumberValues[3]);
          expect(result[2]).toEqual(rowsWithNumberValues[0]);
          expect(result[3]).toEqual(rowsWithNumberValues[1]);
        });
      });

      describe('when column values are strings', () => {
        it('should sort numbers in ascending order', () => {
          const result = defaultSortFunction({
            unsortedRows: [...rowsWithStringValues],
            sortByColumn: ColumnNames.STATUS,
            isSortedAscending: true,
          });

          expect(result[0]).toEqual(rowsWithStringValues[2]);
          expect(result[1]).toEqual(rowsWithStringValues[1]);
          expect(result[2]).toEqual(rowsWithStringValues[0]);
          expect(result[3]).toEqual(rowsWithStringValues[3]);
        });
      });

      describe('when column values contain null', () => {
        it('should put null values at the back of the array', () => {
          const result = defaultSortFunction({
            unsortedRows: [...rowsWithNullValues],
            sortByColumn: ColumnNames.STATUS,
            isSortedAscending: true,
          });

          expect(result[0]).toEqual(rowsWithNullValues[1]);
          expect(result[1]).toEqual(rowsWithNullValues[0]);
          expect(result[2]).toEqual(rowsWithNullValues[3]);
          expect(result[3]).toEqual(rowsWithNullValues[2]);
        });
      });

      describe('when columns have custom sort values', () => {
        it('should use the custom sort value instead of cell value', () => {
          const result = defaultSortFunction({
            unsortedRows: [...rowsWithCustomSortValues],
            sortByColumn: ColumnNames.STATUS,
            isSortedAscending: true,
          });

          expect(result[0]).toEqual(rowsWithCustomSortValues[3]);
          expect(result[1]).toEqual(rowsWithCustomSortValues[0]);
          expect(result[2]).toEqual(rowsWithCustomSortValues[1]);
          expect(result[3]).toEqual(rowsWithCustomSortValues[2]);
        });
      });
    });

    describe('when sorting descending', () => {
      describe('when column values are numbers', () => {
        it('should sort by specified column name', () => {
          const result = defaultSortFunction({
            unsortedRows: [...rowsWithNumberValues],
            sortByColumn: ColumnNames.ACTIONS,
            isSortedAscending: false,
          });

          expect(result[0]).toEqual(rowsWithNumberValues[1]);
          expect(result[1]).toEqual(rowsWithNumberValues[0]);
          expect(result[2]).toEqual(rowsWithNumberValues[3]);
          expect(result[3]).toEqual(rowsWithNumberValues[2]);
        });
      });

      describe('when column values are strings', () => {
        it('should sort numbers in ascending order', () => {
          const result = defaultSortFunction({
            unsortedRows: [...rowsWithStringValues],
            sortByColumn: ColumnNames.STATUS,
            isSortedAscending: false,
          });

          expect(result[0]).toEqual(rowsWithStringValues[3]);
          expect(result[1]).toEqual(rowsWithStringValues[0]);
          expect(result[2]).toEqual(rowsWithStringValues[1]);
          expect(result[3]).toEqual(rowsWithStringValues[2]);
        });
      });

      describe('when column values contain null', () => {
        it('should put null values at the back of the array', () => {
          const result = defaultSortFunction({
            unsortedRows: [...rowsWithNullValues],
            sortByColumn: ColumnNames.STATUS,
            isSortedAscending: false,
          });

          expect(result[0]).toEqual(rowsWithNullValues[3]);
          expect(result[1]).toEqual(rowsWithNullValues[0]);
          expect(result[2]).toEqual(rowsWithNullValues[1]);
          expect(result[3]).toEqual(rowsWithNullValues[2]);
        });
      });

      describe('when columns have custom sort values', () => {
        it('should use the custom sort value instead of cell value', () => {
          const result = defaultSortFunction({
            unsortedRows: [...rowsWithCustomSortValues],
            sortByColumn: ColumnNames.STATUS,
            isSortedAscending: false,
          });

          expect(result[0]).toEqual(rowsWithCustomSortValues[2]);
          expect(result[1]).toEqual(rowsWithCustomSortValues[1]);
          expect(result[2]).toEqual(rowsWithCustomSortValues[0]);
          expect(result[3]).toEqual(rowsWithCustomSortValues[3]);
        });
      });
    });
  });

  describe(getInitialSortConfig.name, () => {
    const defaultSortColumn = ColumnNames.ACTIONS;

    it('should return config with DEFAULT_SHOULD_SORT_ASCENDING direction', () => {
      const result = getInitialSortConfig({
        defaultSortColumn,
        headers: [],
      });

      expect(result.isSortedAscending).toBe(DEFAULT_SHOULD_SORT_ASCENDING);
    });

    it('should return config with defaultSortColumn as sortByColumn', () => {
      const result = getInitialSortConfig({
        defaultSortColumn,
        headers: [],
      });

      expect(result.sortByColumn).toBe(defaultSortColumn);
    });

    describe('when default sort column belongs to a sortable header', () => {
      describe('when the header has a custom sort function', () => {
        it('should return config with the custom function as sortFunction', () => {
          const sortFunction: <ColumnName extends string>(p: {
            unsortedRows: Row<ColumnName>[];
            sortByColumn: ColumnName;
            isSortedAscending: boolean;
          }) => Row<ColumnName>[] = ({ unsortedRows }) => unsortedRows;

          const result = getInitialSortConfig({
            defaultSortColumn,
            headers: [
              {
                cell: 'Header 1',
                columnName: defaultSortColumn,
                isSortable: true,
                sortFunction,
              },
            ],
          });

          expect(result.sortFunction).toBe(sortFunction);
        });
      });

      describe('when the default sort header has no custom sort function', () => {
        it('should return config with undefined as sortFunction', () => {
          const result = getInitialSortConfig({
            defaultSortColumn,
            headers: [
              {
                cell: 'Header 1',
                columnName: defaultSortColumn,
                isSortable: true,
              },
            ],
          });

          expect(result.sortFunction).toBeUndefined();
        });
      });
    });
  });

  describe('paginate', () => {
    it('should paginate if has more than one page', () => {
      const array = Array.from(Array(9).keys());
      const page1 = paginate<number>(array, 5, 1);
      expect(page1.length).toEqual(5);
      const page2 = paginate<number>(array, 5, 2);
      expect(page2.length).toEqual(4);
    });

    it('should paginate if has only one page', () => {
      const array = Array.from(Array(9).keys());
      const page1 = paginate<number>(array, 10, 1);
      expect(page1.length).toEqual(9);
    });
  });
});
