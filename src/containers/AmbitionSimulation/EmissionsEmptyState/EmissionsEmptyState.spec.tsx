import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import * as meMocks from 'mocks/me';
import * as emissionPathSelectSelectors from 'containers/Modals/EmissionPathSelect/selectors';

import * as selectors from '../selectors';
import { EmissionsEmptyState } from '.';

const setup = (mocks: any[]) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthenticatedUserProvider>
        <ModalProvider>
          <EmissionsEmptyState />
        </ModalProvider>
      </AuthenticatedUserProvider>
    </MockedProvider>
  );

describe('EmissionsEmptyState', () => {
  describe('when user has canEditSupplyDashboard permission', () => {
    it('should not render add emission button', async () => {
      const { queryByTestId } = setup([
        meMocks.getGetMeMock({ canEditSupplyDashboard: false }),
      ]);

      await waitFor(() => {
        expect(
          queryByTestId(selectors.emissionsEmptyStateBtn)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('when user has canEditSupplyDashboard permission', () => {
    it('should render add emission button', async () => {
      const { findByTestId } = setup([meMocks.getGetMeMock()]);

      expect(
        await findByTestId(selectors.emissionsEmptyStateBtn)
      ).toBeInTheDocument();
    });

    it('should render the Emission Path Select modal when the add emission button is clicked', async () => {
      const { findByTestId } = setup([meMocks.getGetMeMock()]);

      await act(async () => {
        fireEvent.click(await findByTestId(selectors.emissionsEmptyStateBtn));
      });

      expect(
        await findByTestId(emissionPathSelectSelectors.container)
      ).toBeInTheDocument();
    });
  });
});
