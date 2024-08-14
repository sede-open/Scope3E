import { TD } from 'layouts/Table';

import * as selectors from '../selectors';

import * as StyledComponents from './styledComponents';

export const DEFAULT_NUMBER_OF_ROWS = 7;

interface IProps {
  columnLength: number;
}

export const ReductionRankLoader = ({ columnLength }: IProps) => (
  <tbody data-testid={selectors.loaderTableBody}>
    {Array.from({ length: DEFAULT_NUMBER_OF_ROWS }, (_, k) => (
      <tr data-testid={selectors.reductionsRankLoaderRow} key={k}>
        {Array.from({ length: columnLength }, (__, i) => (
          <TD data-testid={selectors.reductionsRankLoaderCell} key={i}>
            <StyledComponents.Animation />
          </TD>
        ))}
      </tr>
    ))}
  </tbody>
);
