import { boolean, text } from '@storybook/addon-knobs';
import { useState } from 'react';

import { InputField } from '.';

export default {
  title: 'Form fields/InputField',
  component: InputField,
};

export const inputField = () => {
  const [fieldValue, setFieldValue] = useState('');

  return (
    <InputField
      errorMessage={text('errorMessage', '')}
      label="Input field"
      id="some-id"
      isDisabled={boolean('isDisabled', false)}
      name="some-name"
      onChange={setFieldValue}
      value={fieldValue}
    />
  );
};
