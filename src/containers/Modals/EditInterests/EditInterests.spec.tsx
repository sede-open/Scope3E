import { act, fireEvent, render, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { MockedProvider } from '@apollo/client/testing';

import * as toast from 'utils/toast';
import { trackEvent } from 'utils/analytics';
import { EDIT_USER_DETAILS_SUBMITTED } from 'utils/analyticsEvents';
import {
  CompanySectorType,
  SolutionInterestsSystemName,
} from 'types/globalTypes';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import * as userOnboardingMocks from 'mocks/userOnboarding';
import * as sectorsMocks from 'mocks/sectors';
import { solutionInterests } from 'mocks/solutionInterests';
import * as solutionInterestsMocks from 'mocks/solutionInterests';
import * as userSolutionInterestsMocks from 'mocks/userSolutionInterests';
import * as meMocks from 'mocks/me';
import { USER_COMPANY_ID, USER_COMPANY_NAME } from 'mocks/constants';

import accountSettingsNamespace from '../../../../locales/en/accountSettings.json';
import commonNamespace from '../../../../locales/en/common.json';
import modalsNamespace from '../../../../locales/en/modals.json';
import solutionInterestsNamespace from '../../../../locales/en/solutionInterests.json';
import sectorsNamespace from '../../../../locales/en/sectors.json';

import * as selectors from './selectors';
import { EditInterests } from '.';

jest.mock('utils/analytics');

const closeModal = jest.fn();

const sectorName = 'Chemicals and allied products';

const setup = (mocks: any[]) =>
  render(
    <I18nProvider
      namespaces={{
        modals: modalsNamespace,
        common: commonNamespace,
        accountSettings: accountSettingsNamespace,
        solutionInterests: solutionInterestsNamespace,
        sectors: sectorsNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticatedUserProvider>
          <EditInterests
            closeModal={closeModal}
            translationPrefix="accountSettings"
          />
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );

const userSolutionInterests = [
  {
    id: 'some-id-1',
    solutionInterest: solutionInterests[1],
  },
  {
    id: 'some-id-2',
    solutionInterest: solutionInterests[3],
  },
];

const updateSolutionInterestsInput = {
  solutionInterestIds: [
    solutionInterestsMocks.getSolutionInterestId(
      SolutionInterestsSystemName.BEHAVIOUR_CHANGE
    ),
  ],
};

const getSelectSolutionInterests = async ({
  findByText,
  submitButton,
}: {
  findByText: any;
  submitButton: HTMLElement;
}) => {
  await act(async () => {
    // Deselect previously selected solutions
    fireEvent.click(await findByText('Carbon capture'));
    fireEvent.click(await findByText('Material and process efficiency'));
  });

  expect(submitButton).toBeDisabled();

  await act(async () => {
    // This is the only selected solution when submitting
    fireEvent.click(await findByText('Behaviour change'));
  });
};

describe('EditInterests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each`
    canEditSupplyDashboard | roleName
    ${true}                | ${'Editor'}
    ${false}               | ${'Viewer'}
  `(
    'should display the edit user interests interface for $roleName users',
    async ({ canEditSupplyDashboard }: { canEditSupplyDashboard: boolean }) => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const expectedSuccessToastPayload = {
        title: 'Account details successfully updated',
        subtitle: '',
      };

      const { findByTestId, findByText } = setup([
        meMocks.getGetMeMock({
          canEditSupplyDashboard,
        }),
        userOnboardingMocks.getCombinedSolutionInterestsQueryMock(
          userSolutionInterests
        ),
        userOnboardingMocks.getCombinedSectorsQueryMock([
          {
            id: 'some-company-sector-id',
            sector: {
              id: sectorsMocks.getSectorId(sectorName),
              name: sectorName,
            },
            sectorType: CompanySectorType.PRIMARY,
            hasBeenUpdated: false,
          },
        ]),
        userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMock(
          updateSolutionInterestsInput.solutionInterestIds
        ),
        userOnboardingMocks.getCombinedUserOnboardingMutationMock(
          {
            companyId: USER_COMPANY_ID,
            sectors: [
              {
                id: sectorsMocks.getSectorId(sectorName),
                sectorType: CompanySectorType.PRIMARY,
              },
            ],
          },
          updateSolutionInterestsInput
        ),
      ]);

      expect(
        await findByTestId(selectors.solutionInterestsTitle)
      ).toBeInTheDocument();

      const submitButton = await findByTestId(selectors.editInterestsSubmit);

      expect(submitButton).not.toBeDisabled();

      // Assert & select solution interests
      await getSelectSolutionInterests({ findByText, submitButton });

      expect(submitButton).not.toBeDisabled();

      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expectedSuccessToastPayload
        );
        expect(closeModal).toHaveBeenCalled();

        expect(trackEvent).toHaveBeenCalledWith(
          ...[
            EDIT_USER_DETAILS_SUBMITTED,
            {
              companyId: USER_COMPANY_ID,
              companyName: USER_COMPANY_NAME,
              solutionInterests: 'Behaviour change',
            },
          ]
        );
      });
    }
  );
});

describe('when the submission returns an error', () => {
  it('should display the edit user interests interface for Viewer users', async () => {
    jest.spyOn(toast, 'displayErrorMessage');
    const expectedErrorToastPayload = {
      title: 'Something went wrong',
      subtitle: 'Please try again',
    };

    const { findByTestId, findByText } = setup([
      meMocks.getGetMeMock({
        canEditSupplyDashboard: false,
      }),
      userOnboardingMocks.getCombinedSolutionInterestsQueryMock(
        userSolutionInterests
      ),
      userOnboardingMocks.getCombinedSectorsQueryMock([]),
      userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMockError(
        updateSolutionInterestsInput.solutionInterestIds
      ),
    ]);

    await act(async () => {
      fireEvent.click(await findByText('Fuel switch'));
      fireEvent.click(await findByText('Behaviour change'));
      fireEvent.click(await findByText('Carbon capture'));
    });

    const submitButton = await findByTestId(selectors.editInterestsSubmit);

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(toast.displayErrorMessage).toHaveBeenCalledWith(
        expectedErrorToastPayload
      );
    });
  });
});
