import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { mockFlags } from 'jest-launchdarkly-mock';
import * as companyRelationshipsMocks from 'mocks/companyRelationships';
import I18nProvider from 'next-translate/I18nProvider';
import {
  CompanyRelationshipType,
  CompanyStatus,
  InviteStatus,
} from 'types/globalTypes';
import { getItem, setItem } from 'utils/sessionStorage';
import * as toast from 'utils/toast';
import {
  CompanyRelationshipsInvitesToast,
  HAS_USER_DISMISSED_INVITES_ALERT,
  INVITES_TOAST_ID,
} from '.';
import dashboardNamespace from '../../../../locales/en/dashboard.json';

jest.mock('utils/toast');
jest.mock('utils/sessionStorage');
jest.mock('effects/useAuthenticatedUser');

const setup = (mocks: any = []) => {
  render(
    <I18nProvider namespaces={{ dashboard: dashboardNamespace }}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyRelationshipsInvitesToast />
      </MockedProvider>
      ,
    </I18nProvider>
  );
};

const getPendingRelationship = (
  inviteType: CompanyRelationshipType,
  index: number
) => ({
  id: `${inviteType}-relationship-${index}`,
  status:
    inviteType === CompanyRelationshipType.CUSTOMER
      ? InviteStatus.AWAITING_CUSTOMER_APPROVAL
      : InviteStatus.AWAITING_SUPPLIER_APPROVAL,
  customer: {
    status: CompanyStatus.ACTIVE,
  },
  supplier: {
    status: CompanyStatus.ACTIVE,
  },
  inviteType,
});

const getRejectedRelationship = (
  inviteType: CompanyRelationshipType,
  index: number
) => ({
  id: `${inviteType}-relationship-${index}`,
  status:
    inviteType === CompanyRelationshipType.CUSTOMER
      ? InviteStatus.REJECTED_BY_CUSTOMER
      : InviteStatus.REJECTED_BY_SUPPLIER,
  customer: {
    status: CompanyStatus.ACTIVE,
  },
  supplier: {
    status: CompanyStatus.ACTIVE,
  },
  inviteType,
});

const getApprovedRelationship = (
  inviteType: CompanyRelationshipType,
  index: number
) => ({
  id: `${inviteType}-relationship-${index}`,
  status: InviteStatus.APPROVED,
  customer: {
    status: CompanyStatus.ACTIVE,
  },
  supplier: {
    status: CompanyStatus.ACTIVE,
  },
  inviteType,
});

describe('CompanyRelationshipsInvitesToast', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockFlags({ isNetworkPageEnabled: false });
  });

  describe('when the user does not have edit permission', () => {
    it('should not display a toast message', async () => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          company: {
            id: companyRelationshipsMocks.userCompany.id,
          },
          canEditSupplyDashboard: false,
        })
      );

      const mockDisplayCtaMessage = jest.spyOn(toast, 'displayCtaMessage');

      setup([
        companyRelationshipsMocks.getAllCompanyRelationshipsQueryMock(
          [getPendingRelationship(CompanyRelationshipType.SUPPLIER, 0)],
          [getPendingRelationship(CompanyRelationshipType.CUSTOMER, 0)]
        ),
      ]);

      await waitFor(() => {});

      expect(mockDisplayCtaMessage).not.toHaveBeenCalled();
    });
  });

  describe('when there are no company relationships', () => {
    it('should not display a toast message', async () => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          company: {
            id: companyRelationshipsMocks.userCompany.id,
          },
          canEditSupplyDashboard: true,
        })
      );

      const mockDisplayCtaMessage = jest.spyOn(toast, 'displayCtaMessage');

      setup([
        companyRelationshipsMocks.getAllCompanyRelationshipsQueryMock([], []),
      ]);

      await waitFor(() => {});

      expect(mockDisplayCtaMessage).not.toHaveBeenCalled();
    });
  });

  describe('when the user has dismissed the toast', () => {
    it('should not display a toast message', async () => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          company: {
            id: companyRelationshipsMocks.userCompany.id,
          },
          canEditSupplyDashboard: true,
        })
      );
      ((getItem as unknown) as jest.Mock).mockImplementation(() => 'true');

      const mockDisplayCtaMessage = jest.spyOn(toast, 'displayCtaMessage');

      setup([
        companyRelationshipsMocks.getAllCompanyRelationshipsQueryMock(
          [getPendingRelationship(CompanyRelationshipType.SUPPLIER, 0)],
          [getPendingRelationship(CompanyRelationshipType.CUSTOMER, 0)]
        ),
      ]);

      await waitFor(() => {});

      expect(mockDisplayCtaMessage).not.toHaveBeenCalled();
    });
  });

  describe('when there are company relationships, but none are pending incoming invites ', () => {
    it('should not display a toast message', async () => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          company: {
            id: companyRelationshipsMocks.userCompany.id,
          },
          canEditSupplyDashboard: true,
        })
      );

      ((getItem as unknown) as jest.Mock).mockImplementation(() => null);

      const mockDisplayCtaMessage = jest.spyOn(toast, 'displayCtaMessage');

      setup([
        companyRelationshipsMocks.getAllCompanyRelationshipsQueryMock(
          [
            getPendingRelationship(CompanyRelationshipType.CUSTOMER, 0),
            getApprovedRelationship(CompanyRelationshipType.SUPPLIER, 0),
            getRejectedRelationship(CompanyRelationshipType.SUPPLIER, 0),
          ],
          [
            getPendingRelationship(CompanyRelationshipType.SUPPLIER, 0),
            getApprovedRelationship(CompanyRelationshipType.CUSTOMER, 0),
            getRejectedRelationship(CompanyRelationshipType.CUSTOMER, 0),
          ]
        ),
      ]);

      await waitFor(() => {});

      expect(mockDisplayCtaMessage).not.toHaveBeenCalled();
    });
  });

  describe('when there are any pending incoming invites', () => {
    it('should display a toast message', async () => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          company: {
            id: companyRelationshipsMocks.userCompany.id,
          },
          canEditSupplyDashboard: true,
        })
      );

      ((getItem as unknown) as jest.Mock).mockImplementation(() => null);

      const mockDisplayCtaMessage = jest.spyOn(toast, 'displayCtaMessage');

      setup([
        companyRelationshipsMocks.getAllCompanyRelationshipsQueryMock(
          [
            getPendingRelationship(CompanyRelationshipType.SUPPLIER, 0),
            getPendingRelationship(CompanyRelationshipType.CUSTOMER, 0),
            getApprovedRelationship(CompanyRelationshipType.SUPPLIER, 0),
            getRejectedRelationship(CompanyRelationshipType.SUPPLIER, 0),
          ],
          [
            getPendingRelationship(CompanyRelationshipType.CUSTOMER, 0),
            getApprovedRelationship(CompanyRelationshipType.CUSTOMER, 0),
            getRejectedRelationship(CompanyRelationshipType.CUSTOMER, 0),
          ]
        ),
      ]);

      await waitFor(() => {
        expect(mockDisplayCtaMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'You have 2 outstanding requests to review',
            subtitle: 'For more details go to your company account page',
            options: {
              onClose: expect.any(Function),
              toastId: INVITES_TOAST_ID,
            },
          })
        );
      });
    });
  });

  describe('when the toast message is dismissed', () => {
    it('call sessionStorage.setItem', async () => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          company: {
            id: companyRelationshipsMocks.userCompany.id,
          },
          canEditSupplyDashboard: true,
        })
      );

      ((getItem as unknown) as jest.Mock).mockImplementation(() => null);

      const mockDisplayCtaMessage = jest.spyOn(toast, 'displayCtaMessage');

      setup([
        companyRelationshipsMocks.getAllCompanyRelationshipsQueryMock(
          [
            getPendingRelationship(CompanyRelationshipType.SUPPLIER, 0),
            getApprovedRelationship(CompanyRelationshipType.SUPPLIER, 0),
          ],
          [
            getPendingRelationship(CompanyRelationshipType.CUSTOMER, 0),
            getApprovedRelationship(CompanyRelationshipType.CUSTOMER, 0),
          ]
        ),
      ]);

      await waitFor(() => {
        const onClose =
          mockDisplayCtaMessage.mock.calls[0][0].options?.onClose || (() => {});
        onClose({});

        expect(setItem).toHaveBeenCalledWith(
          HAS_USER_DISMISSED_INVITES_ALERT,
          'true'
        );
      });
    });
  });
});
