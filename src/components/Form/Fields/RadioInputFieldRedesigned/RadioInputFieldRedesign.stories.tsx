import { boolean } from '@storybook/addon-knobs';
import { RadioInputGroup } from 'components/Form/RadioInputGroup';
import { useState } from 'react';

import { RadioInputFieldRedesign } from '.';

export default {
  title: 'Form fields/RadioInputFieldRedesign',
  component: RadioInputFieldRedesign,
};

export const RADIO_GROUP_VALUES = {
  TRUE: 'true',
  FALSE: 'false',
};

export const radioInputField = () => {
  const [radioGroupValue, setRadioGroupValue] = useState('');

  return (
    <RadioInputGroup isVertical={boolean('isVertical', false)}>
      <RadioInputFieldRedesign
        hasError={boolean('Field 1 hasError', false)}
        id="some-id-1"
        isChecked={radioGroupValue === RADIO_GROUP_VALUES.TRUE}
        isDisabled={boolean('Field 1 isDisabled', false)}
        isVertical={boolean('isVertical', false)}
        label="RadioInput field 1"
        name="some-name"
        onChange={({ target: { value } }) => setRadioGroupValue(value)}
        value={RADIO_GROUP_VALUES.TRUE}
        tabIndex={0}
      />
      <RadioInputFieldRedesign
        hasError={boolean('Field 2 hasError', false)}
        id="some-id-2"
        isChecked={radioGroupValue === RADIO_GROUP_VALUES.FALSE}
        isDisabled={boolean('Field 2 isDisabled', false)}
        isVertical={boolean('isVertical', false)}
        label="RadioInput field 2"
        name="some-name"
        onChange={({ target: { value } }) => setRadioGroupValue(value)}
        value={RADIO_GROUP_VALUES.FALSE}
        tabIndex={-1}
      />
    </RadioInputGroup>
  );
};
