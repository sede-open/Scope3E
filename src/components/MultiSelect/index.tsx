import { ReactNode } from 'react';
import Select, {
  FormatOptionLabelMeta,
  OptionsType,
  ValueType,
} from 'react-select';
import { SelectComponents } from 'react-select/src/components';
import { Alto, Gallery, SilverChalice, Tundora } from 'styles/colours';
import * as StyledComponents from './styledComponents';

export type OptionType<T = any> = {
  value: string;
  label: string;
  metadata?: T;
};

interface IProps {
  options: OptionsType<OptionType>;
  value: ValueType<OptionType>;
  name: string;
  inputId?: string;
  placeholder?: string;
  defaultValue?: OptionType;
  isDisabled?: boolean;
  isClearable?: boolean;
  onChange?: (value: ValueType<OptionType>) => void;
  formatOptionLabel?:
    | ((
        option: OptionType,
        labelMeta: FormatOptionLabelMeta<OptionType>
      ) => ReactNode)
    | undefined;
  components?: Partial<SelectComponents<OptionType>>;
  multiSelectLimit?: number;
  noOptionsMessage?: () => string;
}

export const MultiSelect = ({
  options,
  name,
  value,
  isDisabled,
  isClearable,
  defaultValue,
  placeholder,
  inputId,
  onChange,
  formatOptionLabel,
  components,
  multiSelectLimit,
  noOptionsMessage,
}: IProps) => {
  return (
    <StyledComponents.StyledContainer>
      <Select
        noOptionsMessage={noOptionsMessage}
        inputId={inputId}
        onChange={onChange}
        className="react-select"
        classNamePrefix="multi"
        defaultValue={defaultValue}
        value={value}
        isDisabled={isDisabled}
        isClearable={isClearable}
        placeholder={placeholder}
        name={name}
        components={components}
        formatOptionLabel={formatOptionLabel}
        isOptionDisabled={() =>
          multiSelectLimit && Array.isArray(value)
            ? value.length >= multiSelectLimit
            : false
        }
        isMulti
        options={options}
        indicatorSeparator={false}
        hideSelectedOptions={false}
        theme={(theme) => ({
          ...theme,
          borderRadius: 4,
          colors: {
            ...theme.colors,
            primary: SilverChalice,
            primary25: Gallery,
            neutral20: Alto,
            neutral50: Gallery,
            neutral80: Tundora,
          },
        })}
      />
    </StyledComponents.StyledContainer>
  );
};

MultiSelect.defaultProps = {
  isDisabled: false,
  isClearable: false,
  onChange: undefined,
  defaultValue: undefined,
  placeholder: undefined,
  inputId: undefined,
};
