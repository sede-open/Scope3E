import { ActionMeta, ValueType, Styles, OptionsType } from 'react-select';
import AsyncSelect from 'react-select/async';

import { AlizarinCrimson, Scorpion } from 'styles/colours';
import { InputLabel } from 'components/InputLabel';
import { InputError } from 'components/InputError';

import { SearchSelectOption } from './types';
import { CustomOption } from './CustomOption';
import { CustomDropdownIndicator } from './CustomDropdownIndicator';
import { CustomNoOptionsMessage } from './CustomNoOptionsMessage';
import { CustomClearIndicator } from './CustomClearIndicator';

interface IProps {
  value: SearchSelectOption;
  onChange: (
    value: ValueType<SearchSelectOption>,
    action: ActionMeta<SearchSelectOption>
  ) => void;
  loadOptions: (
    inputValue: string,
    callback: (options: OptionsType<SearchSelectOption>) => void
  ) => Promise<any> | void;
  id: string;
  name: string;
  inputLabel?: string;
  placeholder?: string;
  maxMenuHeight?: number;
  errorMessage?: string | React.ReactNode | React.ReactElement;
  isDisabled?: boolean;
}

const customStyles = ({ hasError }: { hasError: boolean }): Styles => ({
  control: (base, state) => ({
    ...base,
    boxShadow: 'none',
    borderColor: state.isFocused ? Scorpion : base.borderColor,
    '&:hover': {
      borderColor: state.isFocused ? Scorpion : base.borderColor,
    },
    ...(hasError ? { borderColor: AlizarinCrimson } : {}),
    borderRadius: '0px',
    minHeight: '54px',
    marginBottom: '8px',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 3,
    borderRadius: '0px',
  }),
});

const CLASSNAME = 'react-select';
const CLASSNAME_PREFIX = 'search';

export const SearchSelect = ({
  loadOptions,
  value,
  onChange,
  id,
  name,
  inputLabel,
  placeholder,
  maxMenuHeight,
  errorMessage,
  isDisabled,
}: IProps) => {
  const hasError = Boolean(errorMessage);
  const styles = customStyles({ hasError });
  return (
    <div>
      {inputLabel && <InputLabel htmlFor={id}>{inputLabel}</InputLabel>}
      <AsyncSelect
        isDisabled={isDisabled}
        styles={styles}
        inputId={id}
        name={name}
        placeholder={placeholder}
        loadOptions={loadOptions}
        value={value}
        onChange={onChange}
        className={CLASSNAME}
        classNamePrefix={CLASSNAME_PREFIX}
        maxMenuHeight={maxMenuHeight}
        isClearable
        components={{
          Option: CustomOption,
          NoOptionsMessage: CustomNoOptionsMessage,
          LoadingIndicator: () => null,
          DropdownIndicator: CustomDropdownIndicator,
          ClearIndicator: CustomClearIndicator,
        }}
      />
      <InputError data-testid={`${id}-error`}>{errorMessage}</InputError>
    </div>
  );
};

SearchSelect.defaultProps = {
  inputLabel: '',
  placeholder: undefined,
  maxMenuHeight: undefined,
  errorMessage: undefined,
};
