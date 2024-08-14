import { MockedProvider } from '@apollo/client/testing';
import {
  act,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { cogSpinner } from 'components/CogSpinner/selectors';
import * as emissionPathOptionUserButton from 'components/EmissionPathCards/selectors';
import { TASK_IDS } from 'components/TaskList/constants';
import * as selectors from 'components/TaskList/selectors';
import { Tasks } from 'components/TaskList/types';
import * as corporateEmissionFormSelectors from 'containers/Modals/CorporateEmissionForm/selectors';
import * as editInterestsModalSelectors from 'containers/Modals/EditInterests/selectors';
import * as emissionPathSelectSelectors from 'containers/Modals/EmissionPathSelect/selectors';
import * as targetFormSelectors from 'containers/Modals/TargetForm/selectors';
import { ModalContentType } from 'containers/types';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { mockFlags } from 'jest-launchdarkly-mock';
import * as corporateEmissionFormMocks from 'mocks/corporateEmissionForm';
import * as meMocks from 'mocks/me';
import * as taskListMocks from 'mocks/taskList';
import * as userOnboardingMocks from 'mocks/userOnboarding';
import I18nProvider from 'next-translate/I18nProvider';
import { useRouter } from 'next/router';
import {
  CorporateEmissionType,
  EmissionAllocationStatus,
  InviteStatus,
} from 'types/globalTypes';
import * as analyticsEvents from 'utils/analytics';
import {
  TASK_LIST_ALLOCATE_EMISSIONS_TO_CUSTOMER_CLICKED,
  TASK_LIST_AMBITION_TASK_CLICKED,
  TASK_LIST_AREAS_OF_INTEREST_TASK_CLICKED,
  TASK_LIST_BASELINE_TASK_CLICKED,
  TASK_LIST_CONNECT_TO_CUSTOMER_CLICKED,
  TASK_LIST_CONNECT_TO_SUPPLIER_CLICKED,
  TASK_LIST_LAST_YEAR_TASK_CLICKED,
} from 'utils/analyticsEvents';
import { getCurrentYear } from 'utils/date';
import { TaskListContainer } from '.';
import taskListNamespace from '../../../locales/en/taskList.json';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock('utils/date');
const mockRouter = {
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);
const setup = (mocks: any[]) =>
  render(
    <I18nProvider
      namespaces={{
        taskList: taskListNamespace,
      }}
    >
      <MockedProvider
        mocks={[
          userOnboardingMocks.getCombinedSolutionInterestsQueryMock([]),
          meMocks.getGetMeMock(),
          ...mocks,
        ]}
        addTypename={false}
      >
        <AuthenticatedUserProvider>
          <ModalProvider>
            <TaskListContainer />
          </ModalProvider>
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );

const CURRENT_YEAR = new Date().getFullYear();
const INCOMPLETE_TASK_ICON_LABEL = 'Incomplete task icon';
const COMPLETE_TASK_ICON_LABEL = 'Completed task icon';
const DISABLED_TASK_ICON_LABEL = 'Disabled task icon';

const assertTaskIncomplete = async ({
  findByTestId,
  testId,
}: {
  findByTestId: any;
  testId: string;
}) => {
  const task = await findByTestId(selectors.getTaskTestId(testId));

  await waitFor(() => {
    expect(task).not.toHaveTextContent(COMPLETE_TASK_ICON_LABEL);
    expect(task).toHaveTextContent(INCOMPLETE_TASK_ICON_LABEL);
  });
};

const assertTaskComplete = async ({
  findByTestId,
  testId,
}: {
  findByTestId: any;
  testId: string;
}) => {
  const task = await findByTestId(selectors.getTaskTestId(testId));

  await waitFor(() => {
    expect(task).toHaveTextContent(COMPLETE_TASK_ICON_LABEL);
    expect(
      within(task).queryByTestId(selectors.taskDescription)
    ).not.toBeInTheDocument();
  });
};

const assertTaskDisabled = async ({
  findByTestId,
  testId,
  queryByTestId,
}: {
  findByTestId: any;
  testId: string;
  queryByTestId: any;
}) => {
  const task = await findByTestId(selectors.getTaskTestId(testId));

  await waitFor(() => {
    expect(task).toHaveTextContent(DISABLED_TASK_ICON_LABEL);

    expect(
      queryByTestId(selectors.getButtonTestId(testId))
    ).not.toBeInTheDocument();
  });
};

const lastYear = CURRENT_YEAR - 1;
describe('TaskListContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFlags({ isNetworkPageEnabled: false });
  });

  describe('Areas of interest task', () => {
    const testId = TASK_IDS[Tasks.AREAS_OF_INTEREST];

    describe('when taskList data is not loading', () => {
      it('should display areas of interest task item as complete', async () => {
        const { findByTestId } = setup([
          taskListMocks.getTaskListQueryMock({}),
        ]);

        await assertTaskComplete({ findByTestId, testId });
      });

      it('should open the Edit interests modal when the task is clicked', async () => {
        jest.spyOn(analyticsEvents, 'trackEvent');
        const { findByTestId } = setup([
          taskListMocks.getTaskListQueryMock({
            baseline: {
              id: 'some-baseline-id',
            },
          }),
        ]);

        const areasOfInterestButton = await findByTestId(
          selectors.getButtonTestId(selectors.getTaskTestId(testId))
        );

        act(() => {
          fireEvent.click(areasOfInterestButton);
        });

        const editInterestsModal = await findByTestId(
          editInterestsModalSelectors.editInterests
        );

        expect(editInterestsModal).toBeInTheDocument();
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          TASK_LIST_AREAS_OF_INTEREST_TASK_CLICKED
        );
      });
    });
  });

  describe('Baseline task', () => {
    const testId = TASK_IDS[Tasks.BASELINE];

    describe('when there is no baseline data', () => {
      it('should display baseline task item as incomplete', async () => {
        const { findByTestId } = setup([
          taskListMocks.getTaskListQueryMock({}),
        ]);

        await assertTaskIncomplete({ findByTestId, testId });
      });

      it('should open the Emission Path Select modal when the task is clicked', async () => {
        jest.spyOn(analyticsEvents, 'trackEvent');
        const { findByTestId } = setup([
          taskListMocks.getTaskListQueryMock({}),
        ]);

        const baselineButton = await findByTestId(
          selectors.getButtonTestId(selectors.getTaskTestId(testId))
        );

        act(() => {
          fireEvent.click(baselineButton);
        });

        const corporateEmissionFormModal = await findByTestId(
          emissionPathSelectSelectors.container
        );

        expect(corporateEmissionFormModal).toBeInTheDocument();
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          TASK_LIST_BASELINE_TASK_CLICKED
        );
      });
    });

    describe('when there is baseline data', () => {
      it('should display baseline task item as complete', async () => {
        const { findByTestId } = setup([
          taskListMocks.getTaskListQueryMock({
            baseline: {
              id: 'some-baseline-id',
            },
          }),
        ]);

        await assertTaskComplete({ findByTestId, testId });
      });

      it('should open the Edit Baseline Emission Form modal when the task is clicked', async () => {
        jest.spyOn(analyticsEvents, 'trackEvent');
        const { findByTestId } = setup([
          taskListMocks.getTaskListQueryMock({
            baseline: {
              id: 'some-baseline-id',
            },
          }),
        ]);

        const baselineButton = await findByTestId(
          selectors.getButtonTestId(selectors.getTaskTestId(testId))
        );

        act(() => {
          fireEvent.click(baselineButton);
        });

        const corporateEmissionFormModal = await findByTestId(
          corporateEmissionFormSelectors.getEmissionFormTestId(
            ModalContentType.EDIT_BASELINE
          )
        );

        expect(corporateEmissionFormModal).toBeInTheDocument();
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          TASK_LIST_BASELINE_TASK_CLICKED
        );
      });
    });
  });

  describe('Ambition task', () => {
    const testId = TASK_IDS[Tasks.AMBITION];

    describe('when there is no baseline data', () => {
      it('should display ambition task items as disabled', async () => {
        const { findByTestId, queryByTestId } = setup([
          taskListMocks.getTaskListQueryMock({}),
        ]);

        await assertTaskDisabled({ findByTestId, testId, queryByTestId });
      });
    });

    describe('when there is baseline data', () => {
      describe('and when there is no target data', () => {
        it('should display ambition task item as incomplete', async () => {
          const { findByTestId } = setup([
            taskListMocks.getTaskListQueryMock({
              baseline: {
                id: 'some-baseline-id',
              },
            }),
          ]);

          await assertTaskIncomplete({ findByTestId, testId });
        });

        it('should open the Target form when the task is clicked', async () => {
          jest.spyOn(analyticsEvents, 'trackEvent');
          ((getCurrentYear as unknown) as jest.Mock).mockImplementation(
            () => CURRENT_YEAR
          );

          const { findByTestId } = setup([
            taskListMocks.getTaskListQueryMock({
              baseline: {
                id: 'some-baseline-id',
              },
            }),
          ]);

          const ambitionButton = await findByTestId(
            selectors.getButtonTestId(selectors.getTaskTestId(testId))
          );

          act(() => {
            fireEvent.click(ambitionButton);
          });

          const targetFormModal = await findByTestId(
            targetFormSelectors.targetForm
          );

          expect(targetFormModal).toBeInTheDocument();
          expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
            TASK_LIST_AMBITION_TASK_CLICKED
          );
        });
      });

      describe('and when there is target data', () => {
        it('should display ambition task item as complete', async () => {
          const { findByTestId } = setup([
            taskListMocks.getTaskListQueryMock({
              baseline: {
                id: 'some-baseline-id',
              },
              target: {
                scope1And2Year: 123,
              },
            }),
          ]);

          await assertTaskComplete({ findByTestId, testId });
        });
      });

      it('should open the Target form when the task is clicked', async () => {
        jest.spyOn(analyticsEvents, 'trackEvent');
        ((getCurrentYear as unknown) as jest.Mock).mockImplementation(
          () => CURRENT_YEAR
        );

        const { findByTestId } = setup([
          taskListMocks.getTaskListQueryMock({
            baseline: {
              id: 'some-baseline-id',
            },
            target: {
              scope1And2Year: 123,
            },
          }),
        ]);

        const ambitionButton = await findByTestId(
          selectors.getButtonTestId(selectors.getTaskTestId(testId))
        );

        act(() => {
          fireEvent.click(ambitionButton);
        });

        const targetFormModal = await findByTestId(
          targetFormSelectors.targetForm
        );

        expect(targetFormModal).toBeInTheDocument();
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          TASK_LIST_AMBITION_TASK_CLICKED
        );
      });
    });
  });

  describe('Last year emissions task', () => {
    const testId = TASK_IDS[Tasks.LAST_YEAR_EMISSIONS];

    describe('when there is no baseline data', () => {
      it('should display latest year emissions task items as disabled', async () => {
        const { findByTestId, queryByTestId } = setup([
          taskListMocks.getTaskListQueryMock({}),
        ]);

        await assertTaskDisabled({ findByTestId, testId, queryByTestId });
      });
    });

    describe('when there is baseline data', () => {
      describe('and when there is no latestCorporateEmission data', () => {
        it('should display latest year emissions task item as incomplete', async () => {
          const { findByTestId } = setup([
            taskListMocks.getTaskListQueryMock({
              baseline: {
                id: 'some-baseline-id',
              },
            }),
          ]);

          await assertTaskIncomplete({ findByTestId, testId });
        });

        it('should open the Add new emission Form modal with last year selected when the task is clicked - experienced user flow ', async () => {
          jest.spyOn(analyticsEvents, 'trackEvent');
          ((getCurrentYear as unknown) as jest.Mock).mockImplementation(
            () => CURRENT_YEAR
          );

          const { findByTestId } = setup([
            taskListMocks.getTaskListQueryMock({
              baseline: {
                id: 'some-baseline-id',
              },
            }),
            corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
              corporateEmissions: [
                {
                  ...corporateEmissionFormMocks.corporateEmission,
                  type: CorporateEmissionType.ACTUAL,
                },
              ],
            }),
          ]);

          const latestYearEmissionsButton = await findByTestId(
            selectors.getButtonTestId(selectors.getTaskTestId(testId))
          );

          act(() => {
            fireEvent.click(latestYearEmissionsButton);
          });

          const emissionFlowOptionModel = await findByTestId(
            emissionPathSelectSelectors.container
          );

          expect(emissionFlowOptionModel).toBeInTheDocument();
          act(() => {
            fireEvent.click(emissionFlowOptionModel);
          });

          const experiencedUserBtn = await findByTestId(
            emissionPathOptionUserButton.experiencedUserButton
          );

          expect(experiencedUserBtn).toBeInTheDocument();
          act(() => {
            fireEvent.click(experiencedUserBtn);
          });

          const corporateEmissionFormModal = await findByTestId(
            corporateEmissionFormSelectors.getEmissionFormTestId(
              ModalContentType.NEW_ACTUAL
            )
          );

          expect(corporateEmissionFormModal).toBeInTheDocument();

          await waitFor(async () => {
            expect(
              await findByTestId(corporateEmissionFormSelectors.yearSelect)
            ).toHaveTextContent(lastYear.toString());
            expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
              TASK_LIST_LAST_YEAR_TASK_CLICKED
            );
          });
        });
      });

      describe('and when there is latestCorporateEmission data', () => {
        describe('and the latest corporate emission is not for last year', () => {
          it('should display latest year emissions task item as incomplete', async () => {
            ((getCurrentYear as unknown) as jest.Mock).mockImplementation(
              () => CURRENT_YEAR
            );

            const { findByTestId } = setup([
              taskListMocks.getTaskListQueryMock({
                baseline: {
                  id: 'some-baseline-id',
                },
                latestCorporateEmission: {
                  year: CURRENT_YEAR - 2,
                },
              }),
            ]);

            await assertTaskIncomplete({ findByTestId, testId });
          });
        });

        describe('and the latest corporate emission is for last year', () => {
          it('should display latest year emissions task item as complete', async () => {
            ((getCurrentYear as unknown) as jest.Mock).mockImplementation(
              () => CURRENT_YEAR
            );

            const { findByTestId } = setup([
              taskListMocks.getTaskListQueryMock({
                baseline: {
                  id: 'some-baseline-id',
                },
                latestCorporateEmission: {
                  year: CURRENT_YEAR - 1,
                },
              }),
            ]);

            await assertTaskComplete({ findByTestId, testId });
          });
        });

        it('should open the Edit emission Form modal with last year selected when the task is clicked', async () => {
          jest.spyOn(analyticsEvents, 'trackEvent');
          ((getCurrentYear as unknown) as jest.Mock).mockImplementation(
            () => CURRENT_YEAR
          );

          const { findByTestId } = setup([
            taskListMocks.getTaskListQueryMock({
              baseline: {
                id: 'some-baseline-id',
              },
              latestCorporateEmission: {
                year: lastYear,
              },
            }),
            corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
              corporateEmissions: [
                {
                  ...corporateEmissionFormMocks.corporateEmission,
                  type: CorporateEmissionType.ACTUAL,
                },
              ],
            }),
          ]);

          const latestYearEmissionsButton = await findByTestId(
            selectors.getButtonTestId(selectors.getTaskTestId(testId))
          );

          act(() => {
            fireEvent.click(latestYearEmissionsButton);
          });

          const corporateEmissionFormModal = await findByTestId(
            corporateEmissionFormSelectors.getEmissionFormTestId(
              ModalContentType.EDIT_ACTUAL
            )
          );

          expect(corporateEmissionFormModal).toBeInTheDocument();

          await waitFor(async () => {
            expect(
              await findByTestId(corporateEmissionFormSelectors.yearSelect)
            ).toHaveTextContent(lastYear.toString());
            expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
              TASK_LIST_LAST_YEAR_TASK_CLICKED
            );
          });
        });
      });
    });
  });

  describe('Customer relationships task', () => {
    const testId = TASK_IDS[Tasks.CUSTOMER_RELATIONSHIPS];

    describe('when there is no customerRelationships data', () => {
      it('should display customer relationships task item as incomplete', async () => {
        const { findByTestId } = setup([
          taskListMocks.getTaskListQueryMock({}),
        ]);

        await assertTaskIncomplete({ findByTestId, testId });
      });
    });

    describe('when there is customerRelationships data', () => {
      describe('and all relationship statuses are rejected', () => {
        it('should display customer relationships task item as incomplete', async () => {
          const { findByTestId } = setup([
            taskListMocks.getTaskListQueryMock({
              customerRelationships: [
                {
                  status: InviteStatus.REJECTED_BY_CUSTOMER,
                },
                {
                  status: InviteStatus.REJECTED_BY_CUSTOMER,
                },
              ],
            }),
          ]);

          await assertTaskIncomplete({ findByTestId, testId });
        });
      });
    });

    describe('and at least one relationship is not rejected', () => {
      it('should display customer relationships task item as complete', async () => {
        const { findByTestId } = setup([
          taskListMocks.getTaskListQueryMock({
            customerRelationships: [
              {
                status: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
              },
              {
                status: InviteStatus.APPROVED,
              },
            ],
          }),
        ]);

        await assertTaskComplete({ findByTestId, testId });
      });
    });

    it('should track event analytics when the task is clicked', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');

      const { findByTestId } = setup([taskListMocks.getTaskListQueryMock({})]);

      const connectToCustomerButton = await findByTestId(
        selectors.getButtonTestId(selectors.getTaskTestId(testId))
      );

      act(() => {
        fireEvent.click(connectToCustomerButton);
      });

      await waitFor(async () => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          TASK_LIST_CONNECT_TO_CUSTOMER_CLICKED
        );
      });
    });
  });

  describe('Customer allocations task', () => {
    const testId = TASK_IDS[Tasks.CUSTOMER_ALLOCATIONS];

    describe('when there is no valid customerRelationships data', () => {
      it('should display customer allocations task items as disabled', async () => {
        const { findByTestId, queryByTestId } = setup([
          taskListMocks.getTaskListQueryMock({}),
        ]);

        await assertTaskDisabled({ findByTestId, testId, queryByTestId });
      });
    });

    describe('when there is valid customerRelationships data', () => {
      describe('and when there is no emissionAllocations data', () => {
        it('should display customer allocations task item as incomplete', async () => {
          const { findByTestId } = setup([
            taskListMocks.getTaskListQueryMock({
              customerRelationships: [
                {
                  status: InviteStatus.APPROVED,
                },
              ],
            }),
          ]);

          await assertTaskIncomplete({ findByTestId, testId });
        });
      });

      describe('and when there is no approved emissionAllocations data', () => {
        it('should display customer allocations task item as incomplete', async () => {
          const { findByTestId } = setup([
            taskListMocks.getTaskListQueryMock({
              customerRelationships: [
                {
                  status: InviteStatus.APPROVED,
                },
              ],
              emissionAllocations: [
                {
                  id: 'some-allocation-id',
                  status: EmissionAllocationStatus.REQUESTED,
                },
                {
                  id: 'another-allocation-id',
                  status: EmissionAllocationStatus.REJECTED,
                },
              ],
            }),
          ]);

          await assertTaskIncomplete({ findByTestId, testId });
        });
      });

      describe('and when there is at least one approved emissionAllocations data', () => {
        it('should display customer allocations task item as complete', async () => {
          const { findByTestId } = setup([
            taskListMocks.getTaskListQueryMock({
              customerRelationships: [
                {
                  status: InviteStatus.APPROVED,
                },
              ],
              emissionAllocations: [
                {
                  id: 'some-allocation-id',
                  status: EmissionAllocationStatus.APPROVED,
                },
                {
                  id: 'another-allocation-id',
                  status: EmissionAllocationStatus.AWAITING_APPROVAL,
                },
              ],
            }),
          ]);

          await assertTaskComplete({ findByTestId, testId });
        });
      });

      it('should track event analytics when the task is clicked', async () => {
        jest.spyOn(analyticsEvents, 'trackEvent');

        const { findByTestId, queryByTestId } = setup([
          taskListMocks.getTaskListQueryMock({
            customerRelationships: [
              {
                status: InviteStatus.APPROVED,
              },
            ],
          }),
        ]);
        await waitFor(async () => {
          const loader = queryByTestId(cogSpinner);
          expect(loader).toBeNull();
        });
        const allocateEmissionsButton = await findByTestId(
          selectors.getButtonTestId(selectors.getTaskTestId(testId))
        );
        await act(async () => {
          await userEvent.click(allocateEmissionsButton);
        });

        await waitFor(async () => {
          expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
            TASK_LIST_ALLOCATE_EMISSIONS_TO_CUSTOMER_CLICKED
          );
        });
      });
    });
  });

  describe('Supplier relationships task', () => {
    const testId = TASK_IDS[Tasks.SUPPLIER_RELATIONSHIPS];

    describe('when there is no supplierRelationships data', () => {
      it('should display supplier relationships task item as incomplete', async () => {
        const { findByTestId } = setup([
          taskListMocks.getTaskListQueryMock({}),
        ]);

        await assertTaskIncomplete({ findByTestId, testId });
      });
    });

    describe('when there is supplierRelationships data', () => {
      describe('and all relationship statuses are rejected', () => {
        it('should display supplier relationships task item as incomplete', async () => {
          const { findByTestId } = setup([
            taskListMocks.getTaskListQueryMock({
              supplierRelationships: [
                {
                  status: InviteStatus.REJECTED_BY_SUPPLIER,
                },
                {
                  status: InviteStatus.REJECTED_BY_SUPPLIER,
                },
              ],
            }),
          ]);

          await assertTaskIncomplete({ findByTestId, testId });
        });
      });
    });

    describe('and at least one relationship is not rejected', () => {
      it('should display supplier relationships task item as complete', async () => {
        const { findByTestId } = setup([
          taskListMocks.getTaskListQueryMock({
            supplierRelationships: [
              {
                status: InviteStatus.AWAITING_SUPPLIER_APPROVAL,
              },
              {
                status: InviteStatus.APPROVED,
              },
            ],
          }),
        ]);

        await assertTaskComplete({ findByTestId, testId });
      });
    });

    it('should track event analytics when the task is clicked', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');

      const { findByTestId } = setup([taskListMocks.getTaskListQueryMock({})]);

      const connectToCustomerButton = await findByTestId(
        selectors.getButtonTestId(selectors.getTaskTestId(testId))
      );

      act(() => {
        fireEvent.click(connectToCustomerButton);
      });

      await waitFor(async () => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          TASK_LIST_CONNECT_TO_SUPPLIER_CLICKED
        );
      });
    });
  });
});
