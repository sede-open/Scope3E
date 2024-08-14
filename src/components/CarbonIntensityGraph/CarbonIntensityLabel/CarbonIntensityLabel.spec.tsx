import { render } from '@testing-library/react';

import { CarbonIntensityLabel } from '.';
import { IProps } from './types';
import * as selectors from './selectors';

const setup = (overrides: Partial<IProps> = {}) => {
  const props = {
    title: 'Hello',
    ...overrides,
  };

  return render(
    <svg>
      <CarbonIntensityLabel {...props} />
    </svg>
  );
};

describe('CarbonIntensityLabel', () => {
  describe('when the title is shorter than 45 characters', () => {
    it('should display the title on one line', () => {
      const shortTitle = 'Hello';
      const { getByTestId, queryByTestId } = setup({ title: shortTitle });

      expect(getByTestId(selectors.intensityLabelLine1)).toHaveTextContent(
        shortTitle
      );
      expect(queryByTestId(selectors.intensityLabelLine2)).toBeNull();
    });
  });

  describe('when the title is longer than 45 characters', () => {
    it('should display the title on two lines', () => {
      const expectedFirstLine = 'Lorem ipsum dolor sit amet, consectetur adipi';
      const expectedSecondLine =
        'Duis aute irure dolor sit amet, consectetur a';
      const title = `${expectedFirstLine}${expectedSecondLine}`;

      const { getByTestId } = setup({ title });

      expect(getByTestId(selectors.intensityLabelLine1).textContent).toBe(
        expectedFirstLine
      );

      expect(getByTestId(selectors.intensityLabelLine2).textContent).toBe(
        expectedSecondLine
      );
    });
  });

  describe('when the title longer than 90 characters', () => {
    it('should display the title on two lines and add ellipsis', () => {
      const expectedFirstLine = 'Lorem ipsum dolor sit amet, consectetur adipi';
      const expectedSecondLine =
        'Duis aute irure dolor sit amet, consectetur a';
      const title = `${expectedFirstLine}${expectedSecondLine} some extra text beyond line 2`;

      const { getByTestId } = setup({ title });

      expect(getByTestId(selectors.intensityLabelLine1).textContent).toBe(
        expectedFirstLine
      );

      expect(getByTestId(selectors.intensityLabelLine2).textContent).toBe(
        `${expectedSecondLine}...`
      );
    });
  });
});
