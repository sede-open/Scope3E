import { MouseEvent } from 'react';

import { CheckBoxSlider } from 'components/CheckBoxSlider';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  id: string;
  isChecked: boolean;
  onChange: () => void;
  title: string;
  text: string;
}

export const ToggleOption = ({
  id,
  isChecked,
  onChange,
  title,
  text,
}: IProps) => {
  const onClick = (e: MouseEvent) => {
    // Prevent react-select from swallowing the click event and closing
    e.stopPropagation();
    e.preventDefault();

    onChange();
  };

  return (
    <StyledComponents.ToggleOptionContainer
      data-testid={selectors.getToggleOptionSelector(id)}
    >
      <StyledComponents.TextContainer>
        <StyledComponents.Title>{title}</StyledComponents.Title>
        <StyledComponents.Text>{text}</StyledComponents.Text>
      </StyledComponents.TextContainer>

      <CheckBoxSlider
        dataTestId={selectors.checkboxSlider}
        isChecked={isChecked}
        name={id}
        onClick={onClick}
        title={title}
      />
    </StyledComponents.ToggleOptionContainer>
  );
};
