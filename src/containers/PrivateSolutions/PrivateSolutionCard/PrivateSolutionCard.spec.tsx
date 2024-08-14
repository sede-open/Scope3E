import { PropsWithChildren } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { user } from 'mocks/privateSolutions';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { trackEvent } from 'utils/analytics';
import { PRIVATE_SOLUTIONS_SELECTED_EVENT } from 'utils/analyticsEvents';

import { Solutions } from '../types';
import { PrivateSolutionCard } from '.';
import * as selectors from './selectors';

jest.mock('next/link', () => {
  return ({ children }: PropsWithChildren<{}>) => children;
});
jest.mock('utils/analytics');
jest.mock('effects/useAuthenticatedUser');

describe('PrivateSolutionCard', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
      () => user
    );
  });

  it('should track the correct trackEvent when solution card is clicked', async () => {
    const { findByTestId } = render(
      <PrivateSolutionCard solutionId={Solutions.LUBRICANT_SOLUTIONS} />
    );

    const solutionsCard = await findByTestId(selectors.buttonAnchor);

    fireEvent.click(solutionsCard);

    await waitFor(() => {
      expect(trackEvent).toHaveBeenCalledWith(
        PRIVATE_SOLUTIONS_SELECTED_EVENT,
        {
          title: `privateSolutions:${Solutions.LUBRICANT_SOLUTIONS}-card-title`,
          company: user.company.name,
          sector: user.company.companySectors[0].sector.name,
        }
      );
    });
  });
});
