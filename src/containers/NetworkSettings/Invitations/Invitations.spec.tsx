import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthenticatedUserContext } from 'context/AuthenticatedUserProvider/AuthenticatedUserContext';
import {
  getCustomerNetworkInvites,
  getSupplierNetworkInvites,
} from 'mocks/companyRelationships';
import { getGetMeMock } from 'mocks/me';
import { networkPendingInviteMock } from 'mocks/networkPendingInvite';
import { updateCompanyRelationshipMutationMock } from 'mocks/userOnboarding';
import I18nProvider from 'next-translate/I18nProvider';
import { act } from 'react-dom/test-utils';
import { InviteStatus } from 'types/globalTypes';
import * as toast from 'utils/toast';
import { Invitations } from '.';
import companyRelationshipNamespace from '../../../../locales/en/companyRelationships.json';

const networkInviteSelector = /company-relationships-invite-/;

describe('Invitation', () => {
  const relationshipMocks = networkPendingInviteMock({
    pendingInvitations: [
      ...getCustomerNetworkInvites(),
      ...getSupplierNetworkInvites(),
    ],
  });

  const setup = (
    mocks: any[] = [],
    meMock = getGetMeMock({ canEditCompanyRelationships: true })
  ) => {
    return render(
      <I18nProvider
        namespaces={{ companyRelationships: companyRelationshipNamespace }}
      >
        <AuthenticatedUserContext.Provider value={meMock.result.data.me}>
          <MockedProvider mocks={[meMock, ...mocks]}>
            <Invitations />
          </MockedProvider>
        </AuthenticatedUserContext.Provider>
      </I18nProvider>
    );
  };

  describe('when user has edit permission', () => {
    it('should be able to accept invite', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const mock = updateCompanyRelationshipMutationMock(
        '34',
        InviteStatus.APPROVED,
        {
          id: 34,
        }
      );
      const { findAllByText } = setup([relationshipMocks, mock]);
      const acceptButtons = await findAllByText(
        companyRelationshipNamespace['invite-button-accept']
      );
      await waitFor(() => {
        expect(acceptButtons).toHaveLength(3);
      });
      await act(async () => {
        await userEvent.click(acceptButtons[0]);
      });
      expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'You are now connected to User Company',
        })
      );
    });
    it('should be able to reject invite', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const mock = updateCompanyRelationshipMutationMock(
        '34',
        InviteStatus.REJECTED_BY_CUSTOMER,
        {
          id: 34,
        }
      );
      const { findAllByText } = setup([relationshipMocks, mock]);
      const rejectButtons = await findAllByText(
        companyRelationshipNamespace['invite-button-reject']
      );
      await waitFor(() => {
        expect(rejectButtons).toHaveLength(3);
      });
      await act(async () => {
        await userEvent.click(rejectButtons[0]);
      });
      expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Invitation rejected',
        })
      );
    });
  });

  describe('when invites are > 3', () => {
    it('should display 3 invites with show more button', async () => {
      const localRelationshipMocks = networkPendingInviteMock({
        pendingInvitations: [
          ...getCustomerNetworkInvites(),
          ...getCustomerNetworkInvites(),
          ...getSupplierNetworkInvites(),
        ],
      });
      const { findAllByTestId, getByText } = setup([localRelationshipMocks]);
      const networkInvites = await findAllByTestId(networkInviteSelector);
      expect(networkInvites.length).toEqual(3);
      const showMore = getByText(
        companyRelationshipNamespace['incoming-relationships-show-all-button']
      );
      expect(showMore).toBeInTheDocument();
    });

    it('should show more invites when the button is clicked', async () => {
      const localRelationshipMocks = networkPendingInviteMock({
        pendingInvitations: [
          ...getCustomerNetworkInvites(),
          ...getCustomerNetworkInvites(),
          ...getSupplierNetworkInvites(),
        ],
      });
      const { findAllByTestId, findByText } = setup([localRelationshipMocks]);
      const showMore = await findByText(
        companyRelationshipNamespace['incoming-relationships-show-all-button']
      );
      await userEvent.click(showMore);
      const networkInvites = await findAllByTestId(networkInviteSelector);
      expect(networkInvites.length).toEqual(11);
    });
  });

  describe('when invites are <= 3', () => {
    it('should not display show more when invites are <= 3', async () => {
      const localRelationshipMocks = networkPendingInviteMock({
        pendingInvitations: [...getCustomerNetworkInvites().splice(0, 3)],
      });
      const { findAllByTestId, queryByText } = setup([localRelationshipMocks]);
      const networkInvites = await findAllByTestId(networkInviteSelector);
      expect(networkInvites.length).toEqual(3);
      const showMore = queryByText(
        companyRelationshipNamespace['incoming-relationships-show-all-button']
      );
      expect(showMore).not.toBeInTheDocument();
    });
  });
});
