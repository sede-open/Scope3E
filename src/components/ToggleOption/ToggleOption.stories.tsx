import { useState } from 'react';

import { ToggleOption } from '.';

export default {
  title: 'ToggleOption',
  component: ToggleOption,
};

export const toggleOptionLabel = () => {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = () => setIsChecked(!isChecked);

  return (
    <div
      style={{
        maxWidth: '405px',
      }}
    >
      <ToggleOption
        id="some-id"
        isChecked={isChecked}
        onChange={onChange}
        title="Toggle Option Label"
        text="Custom toggle option label to be passed into a react-select component. The onChange callback should be used to update the value of the select."
      />
    </div>
  );
};
