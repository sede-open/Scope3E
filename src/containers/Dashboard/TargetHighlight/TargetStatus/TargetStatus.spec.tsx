import { render } from '@testing-library/react';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';

import { TargetStatus, IProps } from '.';

import * as selectors from '../selectors';

jest.mock('effects/useAuthenticatedUser');

const setup = (overrides: Partial<IProps> = {}) => {
  const props = {
    mostRecentEmissionValue: 530000,
    targetAmbition: 325000,
    ...overrides,
  };
  return render(<TargetStatus {...props} />);
};

describe('TargetStatus', () => {
  beforeAll(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      canEditSupplyDashboard: true,
    }));
  });

  it('should display the percentage away from reaching the users target ambition', () => {
    const mostRecentEmissionValue = 530000;
    const targetAmbition = 325000;

    const percentage = Math.round(
      100 - 100 / (mostRecentEmissionValue / targetAmbition)
    );

    const { getByTestId } = setup({
      mostRecentEmissionValue,
      targetAmbition,
    });

    const targetNotReached = getByTestId(
      selectors.highlightTargetNotReachedStatus
    );
    expect(targetNotReached).toBeVisible();
    expect(targetNotReached).toHaveTextContent(String(percentage));
  });
});
