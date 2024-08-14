import { fireEvent, render } from '@testing-library/react';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as emissionPathCardSelectors from 'components/EmissionPathCards/selectors';

import * as editorSelectors from './EditorEmptyState/selectors';
import { EmptyState } from '.';

jest.mock('effects/useAuthenticatedUser');

describe('EmptyState', () => {
  it('should render ViewerEmptyState by default', () => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      canEditSupplyDashboard: false,
    }));
    const { getByTestId } = render(<EmptyState />);

    expect(getByTestId('dashboard-empty-state-viewer')).toBeInTheDocument();
  });
  it('should render EditorEmptyState if user has edit permission', () => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      canEditSupplyDashboard: true,
    }));
    const { getByTestId } = render(<EmptyState />);

    expect(
      getByTestId(editorSelectors.emptyStateContainer)
    ).toBeInTheDocument();
  });

  it('should track experience user button click', async () => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      canEditSupplyDashboard: true,
    }));
    const { getByTestId } = render(<EmptyState />);

    expect(
      getByTestId(editorSelectors.emptyStateContainer)
    ).toBeInTheDocument();

    fireEvent.click(
      getByTestId(emissionPathCardSelectors.experiencedUserButton)
    );
  });
});
