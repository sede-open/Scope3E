import { IndicatorProps } from 'react-select';

import { Spinner } from 'components/Spinner';

import { SearchSelectOption } from '../types';

import * as Styled from './styledComponents';

export const CustomDropdownIndicator = ({
  innerProps,
  selectProps: { isLoading },
}: IndicatorProps<SearchSelectOption>) => (
  <Styled.Container {...innerProps}>
    {isLoading ? <Spinner /> : <Styled.SearchIcon />}
  </Styled.Container>
);
