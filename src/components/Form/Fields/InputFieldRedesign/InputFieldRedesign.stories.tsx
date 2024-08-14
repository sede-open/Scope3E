import { text } from '@storybook/addon-knobs';
import { useState } from 'react';
import { InputFieldRedesign } from '.';

export default {
  title: 'Form fields/InputFieldRedesign',
  component: InputFieldRedesign,
};

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <InputFieldRedesign
      id="some-id"
      errorMessage={text('errorMessage', '')}
      label={text('label', 'Label')}
      name="some-name"
      placeholder={text('placeholder', 'Placeholder')}
      onChange={(newValue) => setValue(newValue)}
      value={value}
    />
  );
};
