import { CSSProperties, FC, useState } from 'react';
import { Dropdown } from 'styled-dropdown-component';
import Button, { ButtonColour } from 'components/Button';

import * as StyledComponents from './styledComponents';

type DropdownOption = {
  label: React.ReactNode;
  value: any;
};

export type DropDownButtonWidthType = 'large' | 'auto';

export const getDropDownButtonWidthSize = (size?: DropDownButtonWidthType) => {
  switch (size) {
    case 'large':
      return '10rem';
    case 'auto':
      return 'auto';
    default:
      return '';
  }
};

interface IProps {
  buttonColour?: ButtonColour;
  dataTestId?: string;
  name?: string | React.ReactNode;
  options: DropdownOption[];
  onSelect: (value: any) => void;
  buttonSize?: DropDownButtonWidthType;
  dropdownMenuStyles?: CSSProperties;
}

export const SimpleDropdown: FC<IProps> = ({
  buttonColour,
  dataTestId,
  name,
  options,
  onSelect,
  buttonSize,
  dropdownMenuStyles,
  children,
}) => {
  const [hidden, setHidden] = useState(true);
  return (
    <Dropdown>
      {children ? (
        <div role="presentation" onClick={() => setHidden(!hidden)}>
          {children}
        </div>
      ) : (
        <Button
          width={getDropDownButtonWidthSize(buttonSize)}
          color={buttonColour}
          data-testid={dataTestId}
          onClick={() => setHidden(!hidden)}
        >
          {name}
        </Button>
      )}

      <StyledComponents.StyledDropdownMenu
        style={dropdownMenuStyles}
        hidden={hidden}
        toggle={() => setHidden(!hidden)}
      >
        {options.map((option) => (
          <StyledComponents.StyledDropdownItem
            key={String(option.value)}
            data-testid={String(option.value)}
            onClick={() => {
              onSelect(option.value);
              setHidden(!hidden);
            }}
          >
            {option.label}
          </StyledComponents.StyledDropdownItem>
        ))}
      </StyledComponents.StyledDropdownMenu>
    </Dropdown>
  );
};

SimpleDropdown.defaultProps = {
  buttonColour: 'secondary',
  dataTestId: undefined,
  buttonSize: undefined,
};
