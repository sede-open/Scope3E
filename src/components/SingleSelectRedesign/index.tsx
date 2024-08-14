import {
  Input,
  Label,
} from 'components/Form/Fields/InputFieldRedesign/styledComponents';
import Icon from 'components/Icon';
import { ISingleSelectProps, SingleSelect } from 'components/SingleSelect';
import { SilverChalice, Tundora } from 'styles/colours';
import * as StyledComponents from './styledComponents';

interface ISingleSelectRedesignProps extends ISingleSelectProps {
  label: string;
}

const DropdownIndicator = ({ innerRef, innerProps }: any) => (
  <StyledComponents.ArrowContainer ref={innerRef} {...innerProps}>
    <Icon src="/redesign-arrow-down.svg" alt="arrow-down" size={16} />
  </StyledComponents.ArrowContainer>
);

export const SingleSelectRedesign = ({
  label,
  ...rest
}: ISingleSelectRedesignProps) => {
  return (
    <StyledComponents.SelectContainer>
      <Label htmlFor={rest.name}>{label}</Label>
      <SingleSelect
        {...rest}
        inputId={rest.name}
        components={{
          DropdownIndicator,
          Input,
        }}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: `1px solid ${SilverChalice}`,
            fontSize: '1.0625rem',
            color: Tundora,
          }),
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            padding: '6px 10px !important',
          }),
        }}
      />
    </StyledComponents.SelectContainer>
  );
};
