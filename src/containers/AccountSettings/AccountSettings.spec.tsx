import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { AuthenticatedUserContext } from 'context/AuthenticatedUserProvider/AuthenticatedUserContext';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';
import * as meMocks from 'mocks/me';
import * as solutionInterestsMocks from 'mocks/solutionInterests';
import * as userCardDetailsMock from 'mocks/userCardDetails';
import * as userOnboardingMocks from 'mocks/userOnboarding';
import * as userSolutionInterestsMocks from 'mocks/userSolutionInterests';
import I18nProvider from 'next-translate/I18nProvider';
import getConfig from 'next/config';
import { GetMe_me } from 'types/GetMe';
import {
  ExpertiseDomain,
  SolutionInterestsSystemName,
} from 'types/globalTypes';
import { Environments } from 'utils/featureFlags';
import * as toast from 'utils/toast';
import { AccountSettings } from '.';
import accountSettingsNamespace from '../../../locales/en/accountSettings.json';
import rolesNamespace from '../../../locales/en/roles.json';
import solutionInterestsNamespace from '../../../locales/en/solutionInterests.json';
import { AccountSettingsRoutes } from './constants';
import * as userDetailsFormSelectors from './PersonalPreferences/UserDetailsModalForm/selectors';
import * as selectors from './selectors';

jest.mock('next/config');

const updateSolutionInterestsInput = {
  solutionInterestIds: [
    solutionInterestsMocks.getSolutionInterestId(
      SolutionInterestsSystemName.BEHAVIOUR_CHANGE
    ),
  ],
};
const setup = (
  mocks: any,
  userContextValue: GetMe_me = meMocks.getGetMeMock().result.data.me
) => {
  const wrapper = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <ModalProvider>
        <AccountSettings
          selectedTab={AccountSettingsRoutes.PersonalPreferences}
        />
      </ModalProvider>
    </MockedProvider>
  );

  return render(
    <I18nProvider
      namespaces={{
        accountSettings: accountSettingsNamespace,
        solutionInterests: solutionInterestsNamespace,
        roles: rolesNamespace,
      }}
    >
      <AuthenticatedUserContext.Provider
        value={{
          ...userContextValue,
        }}
      >
        {wrapper}
      </AuthenticatedUserContext.Provider>
    </I18nProvider>
  );
};

describe('AccountSettingUserDetailsCard', () => {
  beforeAll(() => {
    resetLDMocks();
    mockFlags({ isNetworkPageEnabled: false });
  });
  beforeEach(() => {
    ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
      publicRuntimeConfig: {
        ENVIRONMENT: Environments.LOCAL,
      },
    }));
  });

  it('should display user Name', async () => {
    const { findByTestId } = setup(
      [userOnboardingMocks.getCombinedSolutionInterestsQueryMock([])],
      (userCardDetailsMock.userDetails as unknown) as GetMe_me
    );
    expect(
      await findByTestId(selectors.personalPreferences)
    ).toBeInTheDocument();
    const userName = await findByTestId(selectors.userName);
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveTextContent(
      `${userCardDetailsMock.userDetails.firstName} ${userCardDetailsMock.userDetails.lastName}`
    );
  });

  describe('Domain expertise', () => {
    it.each`
      expertiseDomain                         | content
      ${ExpertiseDomain.SUSTAINABILITY}       | ${'Sustainability'}
      ${ExpertiseDomain.PROCUREMENT}          | ${'Procurement'}
      ${ExpertiseDomain.FINANCE}              | ${'Finance'}
      ${ExpertiseDomain.BUSINESS_DEVELOPMENT} | ${'Business Development'}
      ${ExpertiseDomain.OTHER}                | ${'Other'}
    `(
      'displays the domain expertise of the user',
      async ({ expertiseDomain, content }) => {
        const { findByTestId, queryByTestId } = setup([], ({
          ...userCardDetailsMock.userDetails,
          expertiseDomain,
        } as unknown) as GetMe_me);
        const expertise = await findByTestId(selectors.userDomainExpertise);

        expect(expertise).toHaveTextContent(content);
        expect(
          queryByTestId(selectors.addDomainExpertiseBtn)
        ).not.toBeInTheDocument();
      }
    );
    it("displays Add button when the user doesn't have expertise, opens the user details form modal on click", async () => {
      const { findByTestId, queryByTestId } = setup([]);
      expect(
        queryByTestId(selectors.userDomainExpertise)
      ).not.toBeInTheDocument();

      fireEvent.click(await findByTestId(selectors.addDomainExpertiseBtn));
      expect(
        await findByTestId(userDetailsFormSelectors.userDetailsForm)
      ).toBeInTheDocument();
    });
  });

  it('should display user Email', async () => {
    const { findByTestId } = setup([
      userOnboardingMocks.getCombinedSolutionInterestsQueryMock([]),
    ]);
    const userEmail = await findByTestId(selectors.userEmail);
    expect(userEmail).toBeInTheDocument();
    expect(userEmail).toHaveTextContent(userCardDetailsMock.userDetails.email);
  });

  it('should display user Role', async () => {
    const { findByTestId } = setup([
      userOnboardingMocks.getCombinedSolutionInterestsQueryMock([]),
    ]);
    const userRole = await findByTestId(selectors.userRoleName);
    expect(userRole).toBeInTheDocument();
    expect(userRole).toHaveTextContent(
      'SETH Administrator (only for support team) (Can manage their company data, supply chain network and team members, but will also have access to the SETH admin board)'
    );
  });

  it('should open the user details form on Edit details button click', async () => {
    const { findByTestId } = setup([
      userOnboardingMocks.getCombinedSolutionInterestsQueryMock([]),
    ]);
    fireEvent.click(await findByTestId(selectors.editDetailsBtn));
    expect(
      await findByTestId(userDetailsFormSelectors.userDetailsForm)
    ).toBeInTheDocument();
  });
});

describe('when the edit solution interest submission returns an error', () => {
  it('should display the toast error message for user', async () => {
    jest.spyOn(toast, 'displayErrorMessage');
    const expectedErrorToastPayload = {
      title: 'We couldn’t update your areas interest, please try again',
      options: {
        toastId: 'userSolutionInterestMutation',
      },
    };

    const { findByText } = setup([
      meMocks.getGetMeMock(),
      userOnboardingMocks.getCombinedSolutionInterestsQueryMock([]),
      userOnboardingMocks.getCombinedSectorsQueryMock([]),
      userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMockError(
        updateSolutionInterestsInput.solutionInterestIds
      ),
    ]);

    await act(async () => {
      fireEvent.click(await findByText('Behaviour change'));
    });

    await act(async () => {
      // there is a debounce on the update solutions mutation
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    await waitFor(() => {
      expect(toast.displayErrorMessage).toHaveBeenCalledWith(
        expectedErrorToastPayload
      );
    });
  });
});

describe('when the edit solution interest is saved successfully ', () => {
  beforeAll(() => {
    resetLDMocks();
    mockFlags({ isNetworkPageEnabled: false });
  });
  it('should display the toast success message for user', async () => {
    jest.spyOn(toast, 'displaySuccessMessage');

    const expectedSuccessToastPayload = {
      title: 'Areas of interest successfully updated',
      options: {
        toastId: 'userSolutionInterestMutation',
      },
    };

    const { findByText } = setup([
      meMocks.getGetMeMock(),
      userOnboardingMocks.getCombinedSolutionInterestsQueryMock([]),
      userOnboardingMocks.getCombinedSectorsQueryMock([]),
      userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMock(
        updateSolutionInterestsInput.solutionInterestIds
      ),
    ]);

    fireEvent.click(await findByText('Behaviour change'));

    await act(async () => {
      // there is a debounce on the update solutions mutation
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    await waitFor(async () => {
      expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
        expectedSuccessToastPayload
      );
    });
  });
});

describe('User detail editing', () => {
  beforeAll(() => {
    resetLDMocks();
    mockFlags({ isNetworkPageEnabled: false });
  });
  it('should display edit details button', () => {
    const { queryByTestId } = setup([], meMocks.getGetMeMock().result.data.me);
    const editDetailsBtn = queryByTestId(selectors.editDetailsBtn);
    expect(editDetailsBtn).toBeInTheDocument();
  });

  it('should display domain expertise section', async () => {
    const { queryByTestId } = setup([]);
    const domainExpertiseSection = queryByTestId(
      selectors.domainExpertiseSection
    );
    expect(domainExpertiseSection).toBeInTheDocument();
  });
});
