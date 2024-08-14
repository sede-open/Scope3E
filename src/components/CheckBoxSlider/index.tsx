import { MouseEvent } from 'react';
import * as StyledComponents from './styledComponents';

interface IProps {
  name: string;
  dataTestId?: string;
  disabled?: boolean;
  isChecked?: boolean;
  onChange?: () => void;
  onClick?: (e: MouseEvent) => void;
  title: string;
}

export const CheckBoxSlider = ({
  name,
  dataTestId,
  disabled,
  isChecked = false,
  onChange,
  onClick,
  title,
}: IProps) => (
  <StyledComponents.Wrapper>
    <StyledComponents.CheckBoxLabel onClick={onClick}>
      <StyledComponents.CheckBoxTitle>{title}</StyledComponents.CheckBoxTitle>
      <StyledComponents.CheckBox
        id={name}
        name={name}
        type="checkbox"
        data-testid={dataTestId}
        disabled={disabled}
        checked={isChecked}
        onChange={onChange}
        readOnly={!onChange}
      />

      <StyledComponents.Slider />
    </StyledComponents.CheckBoxLabel>
  </StyledComponents.Wrapper>
);

CheckBoxSlider.defaultProps = {
  dataTestId: undefined,
  disabled: false,
  isChecked: false,
  onChange: undefined,
  onClick: undefined,
};
