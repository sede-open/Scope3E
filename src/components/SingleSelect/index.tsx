import { CSSProperties, useCallback } from 'react';
import Select, {
  MenuPlacement,
  OptionsType,
  SelectComponentsConfig,
  ValueType,
} from 'react-select';

import { Alto, Gallery, SilverChalice, Tundora } from 'styles/colours';

import * as StyledComponents from './styledComponents';
import { OptionType } from './types';

export enum SingleSelectClassNamePrefix {
  SINGLE = 'single',
  SINGLE_WIDE = 'single-wide',
}

type StylesType = {
  [key: string]: (provided: CSSProperties) => unknown;
};

export interface ISingleSelectProps {
  classNamePrefix?: SingleSelectClassNamePrefix;
  components?: SelectComponentsConfig<OptionType>;
  dataTestId?: string;
  defaultValue?: OptionType;
  hasError?: boolean;
  inputId?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  isMenuOpen?: boolean;
  isSearchable?: boolean;
  isThin?: boolean;
  removeValueContainerPadding?: boolean;
  maxMenuHeight?: number;
  menuPlacement?: MenuPlacement;
  name: string;
  onChange?: (value: OptionType) => void;
  options: OptionsType<OptionType>;
  placeholder?: string | null;
  selectedPrefix?: string;
  styles?: StylesType;
  value: ValueType<OptionType>;
}

export const SingleSelect = ({
  classNamePrefix = SingleSelectClassNamePrefix.SINGLE,
  components,
  dataTestId,
  defaultValue,
  hasError,
  inputId,
  isClearable,
  isDisabled,
  isMenuOpen,
  isSearchable,
  isThin,
  removeValueContainerPadding,
  maxMenuHeight,
  menuPlacement,
  name,
  onChange,
  options,
  placeholder,
  selectedPrefix,
  styles,
  value,
}: ISingleSelectProps) => {
  const onChangeHandler = useCallback(
    (selectedOption: ValueType<OptionType>) => {
      if (onChange) {
        onChange(selectedOption as OptionType);
      }
    },
    [onChange]
  );
  return (
    <StyledComponents.StyledContainer
      classNamePrefix={classNamePrefix}
      content={selectedPrefix}
      data-testid={dataTestId}
      hasError={hasError}
      isThin={isThin}
      removeValueContainerPadding={removeValueContainerPadding}
    >
      <Select
        className="react-select"
        classNamePrefix={classNamePrefix}
        components={components}
        defaultValue={defaultValue}
        hideSelectedOptions={false}
        indicatorSeparator={false}
        inputId={inputId}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        maxMenuHeight={maxMenuHeight}
        menuIsOpen={isMenuOpen}
        menuPlacement={menuPlacement}
        name={name}
        onChange={onChangeHandler}
        options={options}
        placeholder={placeholder}
        styles={styles}
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
        value={value}
      />
    </StyledComponents.StyledContainer>
  );
};

SingleSelect.defaultProps = {
  classNamePrefix: SingleSelectClassNamePrefix.SINGLE,
  components: undefined,
  dataTestId: undefined,
  defaultValue: undefined,
  hasError: false,
  inputId: undefined,
  isClearable: false,
  isDisabled: false,
  isMenuOpen: undefined,
  isSearchable: false,
  isThin: false,
  removeValueContainerPadding: false,
  maxMenuHeight: undefined,
  menuPlacement: 'bottom',
  onChange: undefined,
  placeholder: undefined,
  selectedPrefix: undefined,
  styles: undefined,
};

export type { OptionType };
