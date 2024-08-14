import { ReactChild } from 'react';

import { FormField } from 'components/Form/FormField';
import { CheckboxInput } from 'components/Form/Inputs/Checkbox';

import * as StyledComponents from './styledComponents';

interface IProps {
  id: string;
  isChecked: boolean;
  title: string | ReactChild;
  subtitle: string | ReactChild;
  icon: ReactChild;
  onChange: (value: boolean) => void;
  dataTestId?: string;
}

export const IllustratedCheckboxField = ({
  dataTestId,
  id,
  isChecked,
  title,
  subtitle,
  icon,
  onChange,
}: IProps) => (
  <FormField testIdPrefix={dataTestId || id}>
    <>
      <CheckboxInput
        dataTestId={dataTestId}
        isChecked={isChecked}
        onChange={onChange}
        id={id}
        name={id}
      />
      <StyledComponents.Label
        data-testid={`${dataTestId}-label`}
        htmlFor={id}
        isChecked={isChecked}
      >
        <StyledComponents.Inner>
          <StyledComponents.IconContainer>
            {icon}
          </StyledComponents.IconContainer>
          <StyledComponents.DescriptionContainer>
            <StyledComponents.Title>{title}</StyledComponents.Title>
            <StyledComponents.Subtitle>{subtitle}</StyledComponents.Subtitle>
          </StyledComponents.DescriptionContainer>
          <StyledComponents.CheckboxContainer>
            <StyledComponents.Checkbox isChecked={isChecked} />
          </StyledComponents.CheckboxContainer>
        </StyledComponents.Inner>
      </StyledComponents.Label>
    </>
  </FormField>
);

IllustratedCheckboxField.defaultProps = {
  dataTestId: undefined,
};
