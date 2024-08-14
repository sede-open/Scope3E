import { render, fireEvent } from '@testing-library/react';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { USER_COMPANY_ID } from 'mocks/constants';
import { AmbitionSimulationPrompt } from '.';

jest.mock('effects/useAuthenticatedUser');

const company = {
  id: USER_COMPANY_ID,
  name: 'Some Company Ltd',
};

describe('AmbitionSimulationPrompt', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company,
    }));
  });

  it('should trigger closeModal when cancel btn is clicked', () => {
    const closeModal = jest.fn();
    const { getByTestId } = render(
      <AmbitionSimulationPrompt closeModal={closeModal} />
    );

    fireEvent.click(getByTestId('new-baseline-success-close'));

    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
