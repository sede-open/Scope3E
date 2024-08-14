import { boolean } from '@storybook/addon-knobs';
import { useState } from 'react';

import { CheckboxField } from '.';

export default {
  title: 'Form fields/CheckboxField',
  component: CheckboxField,
};

export const checkboxField = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <CheckboxField
      label="Checkbox field"
      id="some-id"
      isChecked={isChecked}
      isDisabled={boolean('isDisabled', false)}
      onChange={setIsChecked}
    />
  );
};
