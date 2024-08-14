import { OptionProps } from 'react-select';

import { SearchSelectOption } from '../types';
import * as StyledCompoments from './styledComponents';

export const CustomOption = ({
  innerRef,
  innerProps,
  data: { label, metaLabels, tag },
}: OptionProps<SearchSelectOption>) => (
  <StyledCompoments.Container ref={innerRef} {...innerProps}>
    <StyledCompoments.Label>{label}</StyledCompoments.Label>
    {metaLabels &&
      metaLabels.map((metaLabel: string) => (
        <StyledCompoments.Meta key={metaLabel}>
          {metaLabel}
        </StyledCompoments.Meta>
      ))}
    {tag && (
      <StyledCompoments.Tag type={tag.type}>{tag.name}</StyledCompoments.Tag>
    )}
  </StyledCompoments.Container>
);
