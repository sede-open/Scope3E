import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import getConfig from 'next/config';
import { GraphQLError } from 'graphql';

import * as toast from 'utils/toast';
import { trackEvent } from 'utils/analytics';
import { ONBOARDING_JOURNEY_SUBMITTED } from 'utils/analyticsEvents';
import {
  CompanyRelationshipType,
  CompanySectorType,
  CompanyStatus,
  InviteStatus,
  RoleName,
  SolutionInterestsSystemName,
} from 'types/globalTypes';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as userSolutionInterestsMocks from 'mocks/userSolutionInterests';
import * as userOnboardingMocks from 'mocks/userOnboarding';
import * as companySectorsMocks from 'mocks/companySectors';
import * as sectorsMocks from 'mocks/sectors';
import * as solutionInterestsMocks from 'mocks/solutionInterests';
import { USER_COMPANY_ID } from 'mocks/constants';
import { viewerRole, editorRole } from 'mocks/adminDashboard';
import * as featureFlags from 'utils/featureFlags';

import sectorsNamespace from '../../../../locales/en/sectors.json';
import solutionInterestsNamespace from '../../../../locales/en/solutionInterests.json';
import userOnboardingNamespace from '../../../../locales/en/userOnboarding.json';
import * as selectors from './selectors';
import { UserOnboarding } from '.';

const mockReload = jest.fn();

jest.mock('effects/useAuthenticatedUser');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    reload: mockReload,
  })),
}));
jest.mock('utils/analytics');

const setup = (mocks: any[]) =>
  render(
    <I18nProvider
      namespaces={{
        sectors: sectorsNamespace,
        solutionInterests: solutionInterestsNamespace,
        userOnboarding: userOnboardingNamespace,
      }}
    >
      <MockedProvider
        mocks={[solutionInterestsMocks.solutionInterestsMock, ...mocks]}
        addTypename={false}
      >
        <UserOnboarding />
      </MockedProvider>
    </I18nProvider>
  );

const user = {
  canEditSupplyDashboard: true,
  firstName: 'Test',
  company: { id: USER_COMPANY_ID, name: 'CoolCo Inc' },
  role: { name: RoleName.SUPPLIER_EDITOR },
  roles: [editorRole, viewerRole],
};

const populateCompanySectorsStep = async ({
  hasExistingPrimarySector,
  findByText,
  findByTestId,
}: {
  hasExistingPrimarySector: boolean;
  findByText: any;
  findByTestId: any;
  queryByTestId: any;
}) => {
  expect(await findByText('Which is your sector?')).toBeInTheDocument();
  expect(await findByTestId(selectors.stepTracker)).toBeInTheDocument();

  if (!hasExistingPrimarySector) {
    await act(async () => {
      fireEvent.click(
        await findByTestId(`${CompanySectorType.PRIMARY}-dropdown-input`)
      );
    });

    const firstSectorOption = await findByTestId(
      'PRIMARY-dropdown-list-item-0'
    );

    expect(firstSectorOption).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(firstSectorOption);
    });
  }
};

const submitCompanySectorsStep = async ({
  findByTestId,
  queryByTestId,
}: {
  findByTestId: any;
  queryByTestId: any;
}) => {
  expect(await findByTestId(selectors.submitButton)).not.toBeDisabled();

  await act(async () => {
    fireEvent.click(await findByTestId(selectors.submitButton));
  });

  expect(queryByTestId(selectors.backButton)).toBeInTheDocument();
};

const completeUserSolutionInterestsStep = async ({
  findByText,
  findByTestId,
}: {
  findByText: any;
  findByTestId: any;
}) => {
  expect(
    await findByText('What solutions are you interested in exploring?')
  ).toBeInTheDocument();

  expect(await findByTestId(selectors.submitButton)).toBeDisabled();

  expect(await findByText('Carbon capture')).toBeInTheDocument();
  expect(await findByText('Fuel switch')).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(await findByText('Carbon capture'));
  });

  expect(await findByTestId(selectors.submitButton)).not.toBeDisabled();
};

const updateSolutionInterestsInput = {
  solutionInterestIds: [
    solutionInterestsMocks.getSolutionInterestId(
      SolutionInterestsSystemName.CARBON_CAPTURE
    ),
  ],
};

describe('UserOnboarding', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
      () => user
    );
    ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
      publicRuntimeConfig: {
        ENVIRONMENT: featureFlags.Environments.LOCAL,
      },
    }));

    jest.spyOn(toast, 'displayErrorMessage');
  });

  describe('when a new user is completing the onboarding journey', () => {
    it('should require a primary sector on the company sectors step', async () => {
      const { findByTestId, findByText, queryByTestId } = setup([
        sectorsMocks.sectorsMock(),
        userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
        companySectorsMocks.getCompanySectorsMock([]),
        userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMock(
          updateSolutionInterestsInput.solutionInterestIds
        ),
      ]);

      await populateCompanySectorsStep({
        hasExistingPrimarySector: false,
        findByTestId,
        findByText,
        queryByTestId,
      });

      expect(await findByTestId(selectors.submitButton)).not.toBeDisabled();

      await act(async () => {
        fireEvent.click(await findByTestId(selectors.submitButton));
      });
    });

    it('should require at least one solution interest on the solutions interests step', async () => {
      const { findByTestId, findByText, queryByTestId } = setup([
        sectorsMocks.sectorsMock(50, 1, null, [
          'Coating, engraving and allied services',
          'Telephone communication',
          'Arrangement of passenger transportation',
          'Petroleum and petroleum products, nec',
        ]),
        userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
        companySectorsMocks.getCompanySectorsMock([]),
        userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMock(
          updateSolutionInterestsInput.solutionInterestIds
        ),
        userOnboardingMocks.getCombinedUserOnboardingMutationMock(
          {
            companyId: USER_COMPANY_ID,
            sectors: [
              {
                sectorType: CompanySectorType.PRIMARY,
                id: 'Coating, engraving and allied services-id',
              },
            ],
          },
          {
            solutionInterestIds:
              updateSolutionInterestsInput.solutionInterestIds,
          }
        ),
      ]);

      await populateCompanySectorsStep({
        hasExistingPrimarySector: false,
        findByTestId,
        findByText,
        queryByTestId,
      });

      await submitCompanySectorsStep({
        findByTestId,
        queryByTestId,
      });

      await completeUserSolutionInterestsStep({
        findByTestId,
        findByText,
      });

      await act(async () => {
        fireEvent.click(await findByTestId(selectors.submitButton));
      });

      await waitFor(() => {
        expect(mockReload).toHaveBeenCalled();
      });

      expect(toast.displayErrorMessage).not.toHaveBeenCalled();
    });
  });

  describe('when a company has already set their sectors', () => {
    it('should start at the user solution interests step', async () => {
      const { findByTestId, findByText } = setup([
        sectorsMocks.sectorsMock(),
        userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
        companySectorsMocks.getCompanySectorsMock([
          {
            id: 'some-company-sector-id',
            sector: {
              id: 'the-machinery-sector-id',
              name: 'Machinery, equipment and supplies',
            },
            sectorType: CompanySectorType.PRIMARY,
            hasBeenUpdated: true,
          },
        ]),
        userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMock(
          updateSolutionInterestsInput.solutionInterestIds
        ),
      ]);

      expect(await findByTestId(selectors.headerContainer)).toHaveTextContent(
        `Welcome, ${user.firstName}`
      );

      await completeUserSolutionInterestsStep({
        findByTestId,
        findByText,
      });

      const missingSolutionText = 'Dog grooming';
      fireEvent.input(
        await findByTestId(`${selectors.missingSolutionTextarea}-input`),
        { target: { value: missingSolutionText } }
      );

      // Submit
      await act(async () => {
        fireEvent.click(await findByTestId(selectors.submitButton));
      });

      await waitFor(() => {
        expect(trackEvent).toHaveBeenCalledWith(
          ...[
            ONBOARDING_JOURNEY_SUBMITTED,
            {
              companyId: user.company.id,
              companyName: user.company.name,
              missingSolutionText,
              primaryCompanySector: 'Machinery, equipment and supplies',
              secondaryCompanySector: null,
              solutionInterests: 'Carbon capture',
            },
          ]
        );
      });

      await waitFor(() => {
        expect(mockReload).toHaveBeenCalled();
      });

      expect(toast.displayErrorMessage).not.toHaveBeenCalled();
    });
  });

  describe('when the submit data mutation fails', () => {
    it('should display the error displayErrorMessage toast', async () => {
      const expectedErrorToastPayload = {
        title: 'Something went wrong',
        subtitle: 'Please try again',
      };

      const { findByTestId, findByText } = setup([
        sectorsMocks.sectorsMock(),
        userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
        companySectorsMocks.getCompanySectorsMock([
          {
            id: 'some-company-sector-id',
            sector: {
              id: 'some-sector-id',
              name: 'Machinery, equipment and supplies',
            },
            sectorType: CompanySectorType.PRIMARY,
            hasBeenUpdated: true,
          },
        ]),
        userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMockError(
          updateSolutionInterestsInput.solutionInterestIds
        ),
      ]);

      await completeUserSolutionInterestsStep({
        findByTestId,
        findByText,
      });

      await act(async () => {
        fireEvent.click(await findByTestId(selectors.submitButton));
      });

      await waitFor(() => {
        expect(toast.displayErrorMessage).toHaveBeenCalledWith(
          expectedErrorToastPayload
        );
      });

      await waitFor(() => {
        expect(mockReload).not.toHaveBeenCalled();
      });
    });
  });

  describe('connect with network step', () => {
    describe('when the user has invites', () => {
      const customerInviteId = '';
      const supplierInviteId = '';

      const customerInviteStub = {
        id: customerInviteId,
        inviteType: CompanyRelationshipType.CUSTOMER,
        status: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
        supplier: {
          name: 'The BBC',
          status: CompanyStatus.ACTIVE,
        },
        customer: {
          name: user.company.name,
          status: CompanyStatus.ACTIVE,
        },
      };

      const supplierInviteStub = {
        id: supplierInviteId,
        inviteType: CompanyRelationshipType.SUPPLIER,
        status: InviteStatus.AWAITING_SUPPLIER_APPROVAL,
        supplier: {
          name: user.company.name,
          status: CompanyStatus.ACTIVE,
        },
        customer: {
          name: 'Channel 4',
          status: CompanyStatus.ACTIVE,
        },
      };

      it('should render a 3 step wizard', async () => {
        const { findByTestId } = setup([
          sectorsMocks.sectorsMock(50, 1, null, [
            'Coating, engraving and allied services',
            'Telephone communication',
            'Arrangement of passenger transportation',
            'Petroleum and petroleum products, nec',
          ]),
          userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
          companySectorsMocks.getCompanySectorsMock([]),
          userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMock(
            updateSolutionInterestsInput.solutionInterestIds
          ),
          userOnboardingMocks.getCompanyRelationshipsUserOnboardingMock({
            customer: [supplierInviteStub],
            supplier: [customerInviteStub],
          }),
        ]);

        expect(await findByTestId(selectors.stepTracker)).toHaveTextContent(
          '1 of 3'
        );
      });

      it('should display invitations on the third step', async () => {
        const { findByTestId, findByText, queryByTestId } = setup([
          sectorsMocks.sectorsMock(50, 1, null, [
            'Coating, engraving and allied services',
            'Telephone communication',
            'Arrangement of passenger transportation',
            'Petroleum and petroleum products, nec',
          ]),
          userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
          companySectorsMocks.getCompanySectorsMock([]),
          userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMock(
            updateSolutionInterestsInput.solutionInterestIds
          ),
          userOnboardingMocks.getCompanyRelationshipsUserOnboardingMock({
            customer: [supplierInviteStub],
            supplier: [customerInviteStub],
          }),
        ]);

        await populateCompanySectorsStep({
          hasExistingPrimarySector: false,
          findByTestId,
          findByText,
          queryByTestId,
        });

        await submitCompanySectorsStep({
          findByTestId,
          queryByTestId,
        });

        await completeUserSolutionInterestsStep({
          findByTestId,
          findByText,
        });

        await act(async () => {
          fireEvent.click(await findByTestId(selectors.submitButton));
        });

        const customerInviteComponent = await findByTestId(
          `user-onboarding-invite-${customerInviteId}`
        );
        const supplierInviteComponent = await findByTestId(
          `user-onboarding-invite-${supplierInviteId}`
        );
        expect(customerInviteComponent).toBeInTheDocument();
        expect(supplierInviteComponent).toBeInTheDocument();

        expect(
          await findByTestId(`invite-company-name-${customerInviteId}`)
        ).toHaveTextContent('The BBC');
        expect(
          await findByTestId(`invite-company-name-${supplierInviteId}`)
        ).toHaveTextContent('Channel 4');
      });

      it('should submit combinedUserOnboarding data at the end of the third step', async () => {
        const { findByTestId, findByText, queryByTestId } = setup([
          sectorsMocks.sectorsMock(50, 1, null, [
            'Coating, engraving and allied services',
            'Telephone communication',
            'Arrangement of passenger transportation',
            'Petroleum and petroleum products, nec',
          ]),
          userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
          companySectorsMocks.getCompanySectorsMock([]),
          userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMock(
            updateSolutionInterestsInput.solutionInterestIds
          ),
          userOnboardingMocks.getCompanyRelationshipsUserOnboardingMock({
            customer: [supplierInviteStub],
            supplier: [customerInviteStub],
          }),
          userOnboardingMocks.getCombinedUserOnboardingMutationMock(
            {
              companyId: USER_COMPANY_ID,
              sectors: [
                {
                  sectorType: CompanySectorType.PRIMARY,
                  id: 'Coating, engraving and allied services-id',
                },
              ],
            },
            {
              solutionInterestIds:
                updateSolutionInterestsInput.solutionInterestIds,
            }
          ),
        ]);

        await populateCompanySectorsStep({
          hasExistingPrimarySector: false,
          findByTestId,
          findByText,
          queryByTestId,
        });

        await submitCompanySectorsStep({
          findByTestId,
          queryByTestId,
        });

        await completeUserSolutionInterestsStep({
          findByTestId,
          findByText,
        });

        /* Proceed to step 3 */
        await act(async () => {
          fireEvent.click(await findByTestId(selectors.submitButton));
        });

        /* Click submit on step 3 */
        await act(async () => {
          fireEvent.click(await findByTestId(selectors.submitButton));
        });

        await waitFor(() => {
          expect(mockReload).toHaveBeenCalled();
        });

        expect(toast.displayErrorMessage).not.toHaveBeenCalled();
      });

      it('should make a connection request when the user clicks "connect"', async () => {
        jest.spyOn(toast, 'displaySuccessMessage');
        const { findByTestId, findByText, queryByTestId } = setup([
          sectorsMocks.sectorsMock(50, 1, null, [
            'Coating, engraving and allied services',
            'Telephone communication',
            'Arrangement of passenger transportation',
            'Petroleum and petroleum products, nec',
          ]),
          userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
          companySectorsMocks.getCompanySectorsMock([]),
          userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMock(
            updateSolutionInterestsInput.solutionInterestIds
          ),
          userOnboardingMocks.getCompanyRelationshipsUserOnboardingMock({
            customer: [supplierInviteStub],
            supplier: [customerInviteStub],
          }),
          userOnboardingMocks.updateCompanyRelationshipMutationMock(
            supplierInviteId,
            InviteStatus.APPROVED,
            {
              id: supplierInviteId,
            }
          ),
        ]);

        await populateCompanySectorsStep({
          hasExistingPrimarySector: false,
          findByTestId,
          findByText,
          queryByTestId,
        });

        await submitCompanySectorsStep({
          findByTestId,
          queryByTestId,
        });

        await completeUserSolutionInterestsStep({
          findByTestId,
          findByText,
        });

        /* Proceed to step 3 */
        await act(async () => {
          fireEvent.click(await findByTestId(selectors.submitButton));
        });

        await act(async () => {
          fireEvent.click(
            await findByTestId(`${selectors.connectButton}-${supplierInviteId}`)
          );
        });

        expect(
          await findByTestId(`${selectors.connectButton}-${supplierInviteId}`)
        ).toHaveAttribute('data-is-selected', 'true');

        expect(
          await findByTestId(`${selectors.connectButton}-${customerInviteId}`)
        ).toHaveAttribute('data-is-selected', 'false');

        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'You are now connected to Channel 4',
          })
        );
      });

      it('should render an error when the connection request fails', async () => {
        const { findByTestId, findByText, queryByTestId } = setup([
          sectorsMocks.sectorsMock(50, 1, null, [
            'Coating, engraving and allied services',
            'Telephone communication',
            'Arrangement of passenger transportation',
            'Petroleum and petroleum products, nec',
          ]),
          userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
          companySectorsMocks.getCompanySectorsMock([]),
          userSolutionInterestsMocks.getUpdateUserSolutionInterestsMutationMock(
            updateSolutionInterestsInput.solutionInterestIds
          ),
          userOnboardingMocks.getCompanyRelationshipsUserOnboardingMock({
            customer: [supplierInviteStub],
            supplier: [customerInviteStub],
          }),
          userOnboardingMocks.updateCompanyRelationshipMutationMock(
            supplierInviteId,
            InviteStatus.APPROVED,
            null,
            [new GraphQLError('Boom!')]
          ),
        ]);

        await populateCompanySectorsStep({
          hasExistingPrimarySector: false,
          findByTestId,
          findByText,
          queryByTestId,
        });

        await submitCompanySectorsStep({
          findByTestId,
          queryByTestId,
        });

        await completeUserSolutionInterestsStep({
          findByTestId,
          findByText,
        });

        /* Proceed to step 3 */
        await act(async () => {
          fireEvent.click(await findByTestId(selectors.submitButton));
        });

        await act(async () => {
          fireEvent.click(
            await findByTestId(`${selectors.connectButton}-${supplierInviteId}`)
          );
        });

        expect(
          await findByTestId(`${selectors.connectButton}-${supplierInviteId}`)
        ).toHaveAttribute('data-is-selected', 'false');

        expect(
          await findByTestId(`${selectors.connectButton}-${customerInviteId}`)
        ).toHaveAttribute('data-is-selected', 'false');

        expect(await findByTestId(selectors.apiError)).toHaveTextContent(
          'Something went wrong please try again to connect'
        );
      });
    });

    describe('when the user has no invites', () => {
      /* This is tested implicitly by the tests which submit data after solution interests */
    });
  });
});
