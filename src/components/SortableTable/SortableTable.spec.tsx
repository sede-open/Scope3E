import { render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { SortableTable } from '.';
import commonNamespace from '../../../locales/en/common.json';

type TableProps = React.ComponentProps<typeof SortableTable>;
describe('Sortable Table', () => {
  const tableDataTestId = 'table-test-id';
  const setup = (props: TableProps) => {
    return render(
      <I18nProvider lang="en" namespaces={{ common: commonNamespace }}>
        <SortableTable {...props} dataTestId={tableDataTestId} />
      </I18nProvider>
    );
  };

  const columnName = 'test';
  const getRows = (rowAmount: number) => {
    return Array.from(Array(rowAmount).keys()).map((v, i) => ({
      columns: [
        {
          cell: `value ${v + i}`,
          columnName,
        },
      ],
      rowName: `test-${v + i}`,
    }));
  };

  describe('with table data', () => {
    const cell = 'test header';

    const headers = [
      {
        columnName,
        cell,
      },
    ];
    it('should display headers', () => {
      const { getByText } = setup({
        headers,
        rows: [],
        defaultSortColumn: columnName,
      });
      expect(getByText(headers[0].cell));
    });

    it('should display rows', () => {
      const cellValue = 'a column value';
      const { getByText } = setup({
        headers,
        rows: [
          {
            columns: [
              {
                cell: cellValue,
                columnName,
              },
            ],
            rowName: 'test',
          },
        ],
        defaultSortColumn: columnName,
      });
      expect(getByText(cellValue));
    });

    describe('when rows < per page', () => {
      it('should hide pagination component', () => {
        const { queryByTitle } = setup({
          headers,
          rows: getRows(2),
          defaultSortColumn: columnName,
        });
        expect(queryByTitle('Left Arrow')).toBeNull();
      });
    });

    describe('when rows > per page', () => {
      it('should hide pagination component', () => {
        const { queryByTitle } = setup({
          headers,
          rows: getRows(40),
          defaultSortColumn: columnName,
        });
        expect(queryByTitle('Left Arrow')).toBeInTheDocument();
      });
    });
  });
});
