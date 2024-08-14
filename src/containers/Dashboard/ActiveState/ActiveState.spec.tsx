import {
  render,
  fireEvent,
  waitFor,
  within,
  act,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import getConfig from 'next/config';
import I18nProvider from 'next-translate/I18nProvider';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import * as localStorage from 'utils/localStorage';
import redirect from 'utils/redirect';
import { getCurrentYear, getSecondsInNumberOfDays } from 'utils/date';
import { Environments } from 'utils/featureFlags';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { TaskListContext } from 'context/TaskListProvider/TaskListContext';
import { ModalContentType } from 'containers/types';
import * as dashboardMocks from 'mocks/dashboard';
import * as companyRelationshipsMocks from 'mocks/companyRelationships';
import * as meMocks from 'mocks/me';
import * as targetMocks from 'mocks/target';
import * as targetFormSelectors from 'containers/Modals/TargetForm/selectors';
import * as emissionsOverviewSelectors from 'containers/Dashboard/EmissionsOverview/selectors';
import * as corporateEmissionFormSelectors from 'containers/Modals/CorporateEmissionForm/selectors';
import * as taskListModalSelectors from 'containers/Modals/TaskListPrompt/selectors';
import * as dataPrivacyInfoModalSelectors from 'containers/Modals/MissingDataPrivacyInfoPrompt/selectors';
import * as emissionPathCardSelectors from 'components/EmissionPathCards/selectors';
import * as emissionPathSelectSelectors from 'containers/Modals/EmissionPathSelect/selectors';
import { cogSpinner } from 'components/CogSpinner/selectors';

import taskListNamespace from '../../../../locales/en/taskList.json';
import dashboardNamespace from '../../../../locales/en/dashboard.json';

import { ActiveState } from '.';

jest.mock('utils/localStorage');
jest.mock('utils/redirect');
jest.mock('utils/date', () => {
  const originalModule = jest.requireActual('utils/date');

  return {
    __esModule: true,
    ...originalModule,
    getCurrentYear: jest.fn(),
  };
});
jest.mock('next/config');

const setIsTaskListOpen = jest.fn();

const setup = (mocks: any = []) =>
  render(
    <I18nProvider
      namespaces={{
        taskList: taskListNamespace,
        dashboard: dashboardNamespace,
      }}
    >
      <MockedProvider
        mocks={[
          dashboardMocks.allRankQuery,
          dashboardMocks.companyRankQuery,
          dashboardMocks.carbonIntensityQuery,
          companyRelationshipsMocks.getAllCompanyRelationshipsQueryMock([], []),
          ...mocks,
        ]}
        addTypename={false}
      >
        <AuthenticatedUserProvider>
          <ModalProvider>
            <TaskListContext.Provider
              value={{
                isTaskListOpen: false,
                setIsTaskListOpen,
                toggleIsTaskListOpen: jest.fn(),
              }}
            >
              <ActiveState />
            </TaskListContext.Provider>
          </ModalProvider>
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );

describe('ActiveState', () => {
  beforeAll(() => {
    ((getCurrentYear as unknown) as jest.Mock).mockImplementation(
      () => dashboardMocks.currentYear
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
    resetLDMocks();
    mockFlags({ isDataPrivacyInfoWizardEnabled: true });
  });

  it('should render the dashboard if user has canEditSupplyDashboard permission', async () => {
    const { findByTestId } = setup([
      meMocks.getGetMeMock({
        canEditSupplyDashboard: true,
      }),
      dashboardMocks.noEmissionsQueryMock,
    ]);
    expect(await findByTestId('dashboard-page')).toBeInTheDocument();
  });

  it('should render the dashboard if user has canViewSupplyDashboard permission', async () => {
    const { findByTestId } = setup([
      meMocks.getGetMeMock({
        canViewSupplyDashboard: true,
      }),
      dashboardMocks.noEmissionsQueryMock,
    ]);
    expect(await findByTestId('dashboard-page')).toBeInTheDocument();
  });

  it('should redirect user if they do not have canEditSupplyDashboard and canViewSupplyDashboard permission', async () => {
    setup([
      meMocks.getGetMeMock({
        canEditSupplyDashboard: false,
        canViewSupplyDashboard: false,
      }),
      dashboardMocks.noEmissionsQueryMock,
    ]);

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/forbidden');
    });
  });

  it('should allow the user to click and open the submissions option form', async () => {
    const { getByTestId, findByTestId } = setup([
      meMocks.getGetMeMock(),
      dashboardMocks.noEmissionsQueryMock,
    ]);

    const modalToggle = await findByTestId(
      emissionPathCardSelectors.experiencedUserButton
    );

    fireEvent.click(modalToggle);

    const submissionsOptionForm = getByTestId(
      corporateEmissionFormSelectors.getEmissionFormTestId(
        ModalContentType.NEW_BASELINE
      )
    );
    await waitFor(() => expect(submissionsOptionForm).toBeVisible());
  });

  it('should render emissions overview when emissions exist', async () => {
    const { findByTestId } = setup([
      meMocks.getGetMeMock(),
      dashboardMocks.emissionsQueryMock(),
    ]);
    expect(
      await findByTestId(emissionsOverviewSelectors.emissionsOverview)
    ).toBeInTheDocument();
  });

  it('should NOT render emissions overview when emissions exist', async () => {
    const { queryByTestId } = setup([
      meMocks.getGetMeMock(),
      dashboardMocks.noEmissionsQueryMock,
    ]);
    await waitFor(() =>
      expect(
        queryByTestId(emissionsOverviewSelectors.emissionsOverview)
      ).not.toBeInTheDocument()
    );
  });

  it('should render emissions rank table when emissions exist', async () => {
    const { findByTestId } = setup([
      meMocks.getGetMeMock(),
      dashboardMocks.emissionsQueryMock(),
    ]);
    expect(await findByTestId('rank-table')).toBeInTheDocument();
  });

  it('should NOT render emissions rank table when emissions do not exist', async () => {
    const { queryByTestId } = setup([
      meMocks.getGetMeMock(),
      dashboardMocks.noEmissionsQueryMock,
    ]);
    await waitFor(() =>
      expect(queryByTestId('rank-table')).not.toBeInTheDocument()
    );
  });

  it('should NOT render emissions rank table when emissions do not exist', async () => {
    const { queryByTestId } = setup([
      meMocks.getGetMeMock(),
      dashboardMocks.noEmissionsQueryMock,
    ]);
    await waitFor(() =>
      expect(queryByTestId('carbon-intensity')).not.toBeInTheDocument()
    );
  });

  describe('last year highlight', () => {
    const previousYear = '2019';

    it('should not be displayed if no emissions exist', async () => {
      const { findByTestId, queryByTestId } = setup([
        meMocks.getGetMeMock(),
        dashboardMocks.noEmissionsQueryMock,
      ]);
      await findByTestId('dashboard-page');
      expect(
        queryByTestId('highlight-last-year-emission')
      ).not.toBeInTheDocument();
    });

    describe('no entry for last year', () => {
      it('should open a new actual form', async () => {
        const { findByTestId, getByTestId } = setup([
          meMocks.getGetMeMock(),
          dashboardMocks.emissionsQueryMock(),
        ]);
        expect(
          (await findByTestId('highlight-last-year-emission')).textContent
        ).toContain('-');

        fireEvent.click(getByTestId('highlight-last-year-add'));

        const emissionFlowOptionModel = await findByTestId(
          emissionPathSelectSelectors.container
        );

        expect(emissionFlowOptionModel).toBeInTheDocument();
        act(() => {
          fireEvent.click(emissionFlowOptionModel);
        });

        const experiencedUserBtn = await findByTestId(
          emissionPathCardSelectors.experiencedUserButton
        );

        expect(experiencedUserBtn).toBeInTheDocument();
        act(() => {
          fireEvent.click(experiencedUserBtn);
        });

        expect(
          await findByTestId(
            corporateEmissionFormSelectors.getEmissionFormTestId(
              ModalContentType.NEW_ACTUAL
            )
          )
        ).toBeVisible();

        expect(getByTestId('emission-form-title').textContent).toBe(
          'corporateEmissionForm:actual-new-title'
        );

        expect(getByTestId('emission-form-year').textContent).toContain(
          previousYear
        );

        expect(
          (getByTestId('corp-emissions-form-scope1') as HTMLInputElement).value
        ).toBe('');
        expect(
          (getByTestId('corp-emissions-form-scope2') as HTMLInputElement).value
        ).toBe('');
        expect(
          (getByTestId('corp-emissions-form-scope3') as HTMLInputElement).value
        ).toBe('');
      });
    });
  });

  describe('target highlight', () => {
    it('should open add form for when target does not exists', async () => {
      const { findByTestId, getByTestId } = setup([
        meMocks.getGetMeMock(),
        dashboardMocks.getDashboardQueryNoTarget(),
      ]);
      expect(
        (await findByTestId('highlight-target-emission')).textContent
      ).toContain('-');

      fireEvent.click(getByTestId('highlight-target-add'));

      expect(await findByTestId('target-form')).toBeVisible();
    });

    it('should not be displayed if no emissions exist', async () => {
      const { findByTestId, queryByTestId } = setup([
        meMocks.getGetMeMock(),
        dashboardMocks.noEmissionsQueryMock,
      ]);
      await findByTestId('dashboard-page');
      expect(
        queryByTestId('highlight-target-emission')
      ).not.toBeInTheDocument();
    });
  });

  describe('Target Form', () => {
    describe('when historic scope 3 baseline emissions do not exist', () => {
      it('should display an alert and not scope 3 reduction input', async () => {
        const dashboardDataQueryMock = dashboardMocks.getDashboardQueryNoTarget(
          null
        );
        const { findByTestId, getByTestId, queryByTestId } = setup([
          meMocks.getGetMeMock(),
          dashboardDataQueryMock,
          targetMocks.getTargetFormDataMock({
            corporateEmissions:
              dashboardDataQueryMock.result.data.corporateEmissions,
          }),
        ]);
        expect(
          (await findByTestId('highlight-target-emission')).textContent
        ).toContain('-');

        fireEvent.click(getByTestId('highlight-target-add'));

        expect(await findByTestId('target-form')).toBeVisible();

        fireEvent.click(
          await findByTestId(targetFormSelectors.addAbsoluteAmbitionBtn)
        );

        expect(
          await findByTestId(targetFormSelectors.alertTitle)
        ).toBeInTheDocument();
        expect(
          queryByTestId(targetFormSelectors.scopeThreeReductionInput)
        ).not.toBeInTheDocument();
      });

      describe('when historic scope 3 baseline emissions do exist', () => {
        it('should display scope 3 reduction input and not display an alert', async () => {
          const { findByTestId, getByTestId, queryByTestId } = setup([
            meMocks.getGetMeMock(),
            dashboardMocks.getDashboardQueryNoTarget(),
          ]);
          expect(
            (await findByTestId('highlight-target-emission')).textContent
          ).toContain('-');

          fireEvent.click(getByTestId('highlight-target-add'));

          expect(await findByTestId('target-form')).toBeVisible();

          fireEvent.click(
            await findByTestId(targetFormSelectors.addAbsoluteAmbitionBtn)
          );

          expect(
            await findByTestId(targetFormSelectors.scopeThreeReductionInput)
          ).toBeInTheDocument();
          expect(
            queryByTestId(targetFormSelectors.alertTitle)
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Task List Modal', () => {
    const CONDITION_NO_EMISSIONS = 'no emissions';
    const CONDITION_WITH_EMISSIONS = 'emissions';

    it.each`
      suppressTaskListPrompt | mock                                   | condition
      ${false}               | ${dashboardMocks.noEmissionsQueryMock} | ${CONDITION_NO_EMISSIONS}
      ${true}                | ${dashboardMocks.noEmissionsQueryMock} | ${CONDITION_NO_EMISSIONS}
      ${false}               | ${dashboardMocks.emissionsQueryMock()} | ${CONDITION_WITH_EMISSIONS}
    `(
      'when there are $condition and preferences.suppressTaskListPrompt is "$suppressTaskListPrompt" the Task List Modal should not display',
      async ({
        suppressTaskListPrompt,
        mock,
      }: {
        suppressTaskListPrompt: boolean;
        mock: any;
      }) => {
        ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
          publicRuntimeConfig: {
            ENVIRONMENT: Environments.DEV,
          },
        }));

        const { queryByTestId } = setup([
          meMocks.getGetMeMock({
            preferences: {
              suppressTaskListPrompt,
            },
          }),
          mock,
        ]);

        await waitFor(() => {
          expect(
            queryByTestId(taskListModalSelectors.taskListModal)
          ).not.toBeInTheDocument();
        });
      }
    );

    describe.each`
      environment
      ${Environments.DEV}
      ${Environments.LOCAL}
      ${Environments.STAGING}
    `(
      'In $environment environment',
      ({ environment }: { environment: string }) => {
        it('when there are emissions and preferences.suppressTaskListPrompt is "false" the Task List "Welcome back" Modal should display', async () => {
          ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
            publicRuntimeConfig: {
              ENVIRONMENT: environment,
            },
          }));

          const { findByTestId } = setup([
            meMocks.getGetMeMock({
              preferences: {
                suppressTaskListPrompt: false,
              },
            }),
            dashboardMocks.emissionsQueryMock(),
          ]);

          expect(
            within(
              await findByTestId(taskListModalSelectors.taskListModal)
            ).queryByText('Welcome back')
          ).toBeInTheDocument();
        });
      }
    );

    describe('In production environment', () => {
      it('when there are emissions and preferences.suppressTaskListPrompt is "false" the Task List Modal should not display', async () => {
        ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
          publicRuntimeConfig: {
            ENVIRONMENT: Environments.PROD,
          },
        }));

        const { queryByTestId } = setup([
          meMocks.getGetMeMock({
            preferences: {
              suppressTaskListPrompt: false,
            },
          }),
          dashboardMocks.emissionsQueryMock(),
        ]);

        await waitFor(() => {
          expect(
            queryByTestId(taskListModalSelectors.taskListModal)
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Missing Data Privacy Info Modal', () => {
    const firstName = 'Matt';

    beforeEach(() => {
      ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
        publicRuntimeConfig: {
          ENVIRONMENT: Environments.STAGING,
        },
      }));
    });

    it('should not render the modal when the Task List Modal is rendered', async () => {
      const { findByTestId } = setup([
        meMocks.getGetMeMock({
          preferences: {
            suppressTaskListPrompt: false,
          },
        }),
        dashboardMocks.emissionsQueryMock({
          companyDataPrivacyCompleteness: {
            isComplete: false,
          },
        }),
      ]);

      expect(
        within(
          await findByTestId(taskListModalSelectors.taskListModal)
        ).queryByText('Welcome back')
      ).toBeInTheDocument();
    });

    describe('when the task list modal is supressed', () => {
      describe('when the user has the "canSubmitDataPrivacyInfo" permission', () => {
        it('should render the modal when the data privacy info is incomplete', async () => {
          const { queryByTestId, findByTestId } = setup([
            meMocks.getGetMeMock({
              preferences: {
                suppressTaskListPrompt: true,
              },
              canSubmitDataPrivacyInfo: true,
              firstName,
            }),
            dashboardMocks.emissionsQueryMock({
              companyDataPrivacyCompleteness: {
                isComplete: false,
              },
            }),
          ]);

          expect(
            await queryByTestId(taskListModalSelectors.taskListModal)
          ).not.toBeInTheDocument();

          expect(
            within(
              await findByTestId(
                dataPrivacyInfoModalSelectors.missingDataPrivacyInfoModal
              )
            ).queryByText(`Welcome back, ${firstName}`)
          ).toBeInTheDocument();
        });
      });

      describe('when the user does not have the "canSubmitDataPrivacyInfo" permission', () => {
        it('should not render the modal when the data privacy info is incomplete', async () => {
          const { queryByTestId } = setup([
            meMocks.getGetMeMock({
              preferences: {
                suppressTaskListPrompt: true,
              },
              canSubmitDataPrivacyInfo: false,
              firstName,
            }),
            dashboardMocks.emissionsQueryMock({
              companyDataPrivacyCompleteness: {
                isComplete: false,
              },
            }),
          ]);

          await waitFor(() => {
            expect(queryByTestId(cogSpinner)).not.toBeInTheDocument();
          });

          expect(
            await queryByTestId(taskListModalSelectors.taskListModal)
          ).not.toBeInTheDocument();

          expect(
            await queryByTestId(
              dataPrivacyInfoModalSelectors.missingDataPrivacyInfoModal
            )
          ).not.toBeInTheDocument();
        });
      });

      describe('when the feature is not enabled', () => {
        it('should not render the data privacy info modal', async () => {
          mockFlags({ isDataPrivacyInfoWizardEnabled: false });
          ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
            publicRuntimeConfig: {
              ENVIRONMENT: Environments.PROD,
            },
          }));

          const { queryByTestId } = setup([
            meMocks.getGetMeMock({
              preferences: {
                suppressTaskListPrompt: true,
              },
              canSubmitDataPrivacyInfo: true,
              firstName,
            }),
            dashboardMocks.emissionsQueryMock({
              companyDataPrivacyCompleteness: {
                isComplete: false,
              },
            }),
          ]);

          await waitFor(() => {
            expect(queryByTestId(cogSpinner)).not.toBeInTheDocument();
          });

          expect(
            await queryByTestId(taskListModalSelectors.taskListModal)
          ).not.toBeInTheDocument();

          await waitFor(async () => {
            expect(
              await queryByTestId(
                dataPrivacyInfoModalSelectors.missingDataPrivacyInfoModal
              )
            ).not.toBeInTheDocument();
          });
        });
      });
    });

    describe('when the modal has been snoozed in local storage', () => {
      it('should not render the modal when the modal has been snoozed less than 24 hours ago', async () => {
        const today = new Date().setHours(0, 0, 0, 0).toString();

        (localStorage.getItem as jest.Mock).mockReturnValue(today);

        const { queryByTestId } = setup([
          meMocks.getGetMeMock({
            preferences: {
              suppressTaskListPrompt: true,
            },
            canSubmitDataPrivacyInfo: true,
            firstName,
          }),
          dashboardMocks.emissionsQueryMock({
            companyDataPrivacyCompleteness: {
              isComplete: false,
            },
          }),
        ]);

        await waitFor(() => {
          expect(queryByTestId(cogSpinner)).not.toBeInTheDocument();
        });

        expect(
          await queryByTestId(taskListModalSelectors.taskListModal)
        ).not.toBeInTheDocument();

        await waitFor(async () => {
          expect(
            await queryByTestId(
              dataPrivacyInfoModalSelectors.missingDataPrivacyInfoModal
            )
          ).not.toBeInTheDocument();
        });
      });

      it('should render the modal when the snooze value is more than 24 hours ago', async () => {
        const snoozedUntil = (
          new Date().getTime() -
          getSecondsInNumberOfDays(2) * 1000
        ).toString();

        (localStorage.getItem as jest.Mock).mockReturnValue(snoozedUntil);

        const { queryByTestId, findByTestId } = setup([
          meMocks.getGetMeMock({
            preferences: {
              suppressTaskListPrompt: true,
            },
            canSubmitDataPrivacyInfo: true,
            firstName,
          }),
          dashboardMocks.emissionsQueryMock({
            companyDataPrivacyCompleteness: {
              isComplete: false,
            },
          }),
        ]);

        expect(
          await queryByTestId(taskListModalSelectors.taskListModal)
        ).not.toBeInTheDocument();

        expect(
          within(
            await findByTestId(
              dataPrivacyInfoModalSelectors.missingDataPrivacyInfoModal
            )
          ).queryByText(`Welcome back, ${firstName}`)
        ).toBeInTheDocument();
      });
    });
  });
});
