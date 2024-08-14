import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import I18nProvider from 'next-translate/I18nProvider';
import { CompanyRelationshipType, InviteStatus } from 'types/globalTypes';
import { NetworkPendingInvitesQuery_networkSummary_pendingInvitations } from 'types/NetworkPendingInvitesQuery';
import { NetworkInvite } from '.';
import companyRelationshipNamespace from '../../../../locales/en/companyRelationships.json';
import { customerIconSelector, supplierIconSelector } from './selectors';

type NetworkInviteProps = Partial<React.ComponentProps<typeof NetworkInvite>>;

const mockInvite = (
  overrides?: Partial<
    NetworkPendingInvitesQuery_networkSummary_pendingInvitations
  >
) => {
  const invite: NetworkPendingInvitesQuery_networkSummary_pendingInvitations = {
    id: 'inviteId',
    inviteType: CompanyRelationshipType.CUSTOMER,
    status: InviteStatus.APPROVED,
    customerName: 'test customer name',
    supplierName: 'test supplier name',
    note: null,
    createdAt: undefined,
    updatedAt: undefined,
    ...overrides,
  };
  return invite;
};
describe('Network Invite', () => {
  const setup = (props?: NetworkInviteProps) => {
    return render(
      <I18nProvider
        namespaces={{ companyRelationships: companyRelationshipNamespace }}
      >
        <NetworkInvite
          invite={mockInvite()}
          isDisabled={false}
          onAccept={() => {}}
          onReject={() => {}}
          shouldDisplayControls
          {...props}
        />
      </I18nProvider>
    );
  };
  describe('when invite is from supplier', () => {
    it('should display supplier name, title and icon', () => {
      const invite = mockInvite();
      const { queryByText, queryByTestId } = setup({ invite });
      const displayName = queryByText(invite.supplierName);
      expect(displayName?.textContent).toEqual(invite.supplierName);
      const title = queryByText(
        companyRelationshipNamespace['invite-title-supplier']
      );
      expect(title?.textContent).toEqual('Supplier');
      expect(queryByTestId(supplierIconSelector)).toBeInTheDocument();
    });
  });

  describe('when invite is from customer', () => {
    it('should display customer name, title and icon', () => {
      const invite = mockInvite({
        inviteType: CompanyRelationshipType.SUPPLIER,
      });
      const { queryByText, queryByTestId } = setup({ invite });
      const displayName = queryByText(invite.customerName);
      expect(displayName?.textContent).toEqual(invite.customerName);
      const title = queryByText(
        companyRelationshipNamespace['invite-title-customer']
      );
      expect(title?.textContent).toEqual('Customer');
      expect(queryByTestId(customerIconSelector)).toBeInTheDocument();
    });
  });

  describe('when component is disabled', () => {
    it('should disable the accept and reject button', () => {
      const { queryByText } = setup({ isDisabled: true });
      expect(
        queryByText(companyRelationshipNamespace['invite-button-reject'])
      ).toBeDisabled();
      expect(
        queryByText(companyRelationshipNamespace['invite-button-accept'])
      ).toBeDisabled();
    });
  });

  describe('when controls are false', () => {
    it('should not render the accept and reject button', () => {
      const { queryByText } = setup({ shouldDisplayControls: false });
      expect(
        queryByText(companyRelationshipNamespace['invite-button-reject'])
      ).not.toBeInTheDocument();
      expect(
        queryByText(companyRelationshipNamespace['invite-button-accept'])
      ).not.toBeInTheDocument();
    });
  });

  describe('when buttons render and not disabled', () => {
    it('should accept an invite', async () => {
      const acceptFn = jest.fn();
      const { getByText } = setup({ onAccept: acceptFn });
      const acceptButton = getByText(
        companyRelationshipNamespace['invite-button-accept']
      );
      await userEvent.click(acceptButton);
      const invite = mockInvite();
      expect(acceptFn).toHaveBeenCalledWith(invite.id, invite.supplierName);
    });

    it('should reject an invite', async () => {
      const rejectFn = jest.fn();
      const { getByText } = setup({ onReject: rejectFn });
      const rejectButton = getByText(
        companyRelationshipNamespace['invite-button-reject']
      );
      await userEvent.click(rejectButton);
      const invite = mockInvite();
      expect(rejectFn).toHaveBeenCalledWith(
        invite.id,
        invite.supplierName,
        true
      );
    });
  });
});
