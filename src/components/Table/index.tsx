import { v4 as uuidV4 } from 'uuid';

import * as StyledComponents from './styledComponents';

type Row = any[] | any;

interface IProps {
  headers: string[];
  rows: Row[];
  testId?: string;
}

export const Table = ({ headers, rows, testId }: IProps) => (
  <StyledComponents.TableComponent data-testid={testId}>
    <thead>
      <tr>
        {headers.map((header) => (
          <StyledComponents.HeaderCell key={String(header)}>
            {header}
          </StyledComponents.HeaderCell>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={uuidV4()} data-testid={`${testId}-row`}>
          {Array.isArray(row)
            ? row.map((cell: string, cellIndex: number) => (
                <StyledComponents.Cell key={`${headers[cellIndex]}-${cell}`}>
                  {cell}
                </StyledComponents.Cell>
              ))
            : row}
        </tr>
      ))}
    </tbody>
  </StyledComponents.TableComponent>
);

Table.defaultProps = {
  testId: undefined,
};

export const { Cell } = StyledComponents;
