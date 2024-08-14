import { useState } from 'react';

import { ProgressBar } from '.';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
};

export const progressBar = () => {
  const [percentage, setPercentage] = useState(50);

  const onChangePercentage = (value: string) => {
    if (Number(value) <= 100) {
      setPercentage(Number(value));
    }
  };

  return (
    <>
      <ProgressBar percentage={percentage} />

      <div
        style={{
          width: '50%',
          margin: '0 auto',
          padding: '100px 0',
        }}
      >
        <input
          id="percentage"
          max={100}
          name="percentage"
          type="number"
          onChange={({ target: { value } }) => onChangePercentage(value)}
          value={String(percentage)}
        />
      </div>
    </>
  );
};
