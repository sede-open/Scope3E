import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import { fireEvent, render, waitFor } from '@testing-library/react';

import * as toast from 'utils/toast';
import {
  createdExternalUser,
  getResendInviteFailMock,
  getResendInviteSuccessMock,
} from 'mocks/adminDashboard';
import { NEW_COMPANY_INVITE_RETRIGGERED } from 'utils/analyticsEvents';
import { trackEvent } from 'utils/analytics';
import * as analyticsEvents from 'utils/analytics';
import { CompanyStatus } from 'types/globalTypes';

import { UserUpdateActions, IProps } from './UserUpdateActions';
import commonNamespace from '../../../../../locales/en/common.json';
import * as selectors from '../../selectors';

jest.mock('utils/redirect');

const setup = (mocks: any = [], overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    setModalState: jest.fn(),
    user: {
      ...createdExternalUser,
      company: {
        ...createdExternalUser.company,
        status: CompanyStatus.PENDING_USER_CONFIRMATION,
      },
    },
    currentUserId: 'USER_ID',
    ...overrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        common: commonNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserUpdateActions {...props} />
      </MockedProvider>
    </I18nProvider>
  );
};

describe('UserUpdateActions', () => {
  describe('when user company status is PENDING_USER_CONFIRMATION', () => {
    it('should render resend invite button', () => {
      const { getByTestId } = setup([]);
      expect(getByTestId(selectors.resendInviteButton)).toBeInTheDocument();
    });
  });

  describe.each`
    companyStatus
    ${CompanyStatus.ACTIVE}
    ${CompanyStatus.INVITATION_DECLINED}
    ${CompanyStatus.PENDING_USER_ACTIVATION}
    ${CompanyStatus.VETOED}
    ${CompanyStatus.VETTING_IN_PROGRESS}
  `(
    'when user company status is $companyStatus',
    ({ companyStatus }: { companyStatus: CompanyStatus }) => {
      it('should not display resend invite button', () => {
        const { queryByTestId } = setup([], {
          user: {
            ...createdExternalUser,
            company: {
              ...createdExternalUser.company,
              status: companyStatus,
            },
          },
        });
        expect(queryByTestId(selectors.resendInviteButton)).toBeNull();
      });
    }
  );

  describe('when resend invite button is clicked', () => {
    describe('on success', () => {
      it('should show success toaster message', async () => {
        jest.spyOn(toast, 'displaySuccessMessage');
        jest.spyOn(analyticsEvents, 'trackEvent');

        const { getByTestId } = setup([
          getResendInviteSuccessMock({
            inputOverrides: { userId: createdExternalUser.id },
          }),
        ]);

        fireEvent.click(getByTestId(selectors.resendInviteButton));

        await waitFor(() => {
          expect(toast.displaySuccessMessage).toHaveBeenCalledWith({
            title: 'Invite has been resent',
          });
          expect(trackEvent).toHaveBeenCalledWith(
            NEW_COMPANY_INVITE_RETRIGGERED,
            {
              companyId: createdExternalUser.company.id,
            }
          );
        });
      });
    });

    describe('on failure', () => {
      it('should show failure toaster message', async () => {
        jest.spyOn(toast, 'displayErrorMessage');

        const { getByTestId } = setup([
          getResendInviteFailMock({
            inputOverrides: { userId: createdExternalUser.id },
          }),
        ]);

        fireEvent.click(getByTestId(selectors.resendInviteButton));

        await waitFor(() => {
          expect(toast.displayErrorMessage).toHaveBeenCalledWith({
            title: 'Could not resend the invite',
            subtitle: 'Please try again',
          });
        });
      });
    });
  });
});
