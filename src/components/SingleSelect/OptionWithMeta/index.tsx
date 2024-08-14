import { OptionProps } from 'react-select';

import { OptionType } from '..';
import * as StyledComponents from './styledComponents';

export const OptionWithMeta = ({
  data,
  innerRef,
  innerProps,
  isSelected,
}: OptionProps<OptionType>) => (
  <StyledComponents.OptionContainer
    ref={innerRef}
    {...innerProps}
    isSelected={isSelected}
  >
    <StyledComponents.Label>{data.label}</StyledComponents.Label>
    <StyledComponents.Meta>{data.meta}</StyledComponents.Meta>
  </StyledComponents.OptionContainer>
);
