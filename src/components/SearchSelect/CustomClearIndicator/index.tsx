import { IndicatorProps } from 'react-select';

import { Cross } from 'components/Glyphs/Cross';

import { SearchSelectOption } from '../types';

import * as Styled from './styledComponents';

export const CustomClearIndicator = ({
  innerProps,
}: IndicatorProps<SearchSelectOption>) => (
  <Styled.Container {...innerProps}>
    <Cross />
  </Styled.Container>
);
