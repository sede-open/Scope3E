import {
  act,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';

import {
  EmissionAllocationDirection,
  EmissionAllocationMethod,
  EmissionAllocationStatus,
} from 'types/globalTypes';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as emissionAllocationsMocks from 'mocks/emissionAllocations';
import * as companyRelationshipsMocks from 'mocks/companyRelationships';
import * as corporateEmissionsMocks from 'mocks/corporateEmissions';
import * as updateEmissionAllocationMocks from 'mocks/updateEmissionAllocation';
import { formatInteger, formatOneDecimalPlace } from 'utils/number';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import * as toast from 'utils/toast';
import { getSerialisedExpects } from 'utils/tests';
import { ModalContentType } from 'containers/types';
import * as corporateEmissionFormSelectors from 'containers/Modals/CorporateEmissionForm/selectors';
import * as pendingAllocationSelectors from 'components/PendingAllocation/selectors';
import valueChainNamespace from '../../../../locales/en/valueChain.json';
import commonNamespace from '../../../../locales/en/common.json';
import { PendingAllocations } from '.';
import * as selectors from '../selectors';

jest.mock('effects/useAuthenticatedUser');
jest.mock('utils/toast');

const setModalState = jest.fn();

const setup = (mocks: any[]) =>
  render(
    <I18nProvider
      namespaces={{
        valueChain: valueChainNamespace,
        common: commonNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <ModalProvider>
          <PendingAllocations setModalState={setModalState} />
        </ModalProvider>
      </MockedProvider>
    </I18nProvider>
  );

const getAllocationMethodString = (status: string) =>
  valueChainNamespace[
    `allocation-method-${status}` as keyof typeof valueChainNamespace
  ];

const { userCompany } = companyRelationshipsMocks;
const commonMockArgs = {
  emissionAllocation:
    EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
};

describe('Supply chain - Pending requests', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: userCompany.id },
      canEditSupplyDashboard: true,
    }));
  });

  describe('when there are no pending supplier emission allocations', () => {
    it('should display the empty view', async () => {
      const mocks = [
        emissionAllocationsMocks.getPendingEmissionAllocationsMock({
          ...commonMockArgs,
          requested: [],
          awaitingApproval: [],
        }),
        corporateEmissionsMocks.getCorporateEmissions([]),
      ];

      const { findByTestId } = setup(mocks);

      expect(
        await findByTestId(selectors.pendingAllocationsEmptyView)
      ).toBeInTheDocument();
    });
  });

  describe('when there are pending emission allocations', () => {
    const awaitingApprovalAllocation = {
      ...emissionAllocationsMocks.approvedEmissionAllocation,
      allocationMethod: EmissionAllocationMethod.ECONOMICAL,
      status: EmissionAllocationStatus.AWAITING_APPROVAL,
    };

    const awaitingApprovalEmissionAllocations = [awaitingApprovalAllocation];

    const awaitingAllocationRequest = {
      ...emissionAllocationsMocks.approvedEmissionAllocation,
      status: EmissionAllocationStatus.REQUESTED,
    };

    const awaitingAllocationRequests = [awaitingAllocationRequest];

    const getFormattedEmissions = (emissions: number) =>
      `${formatInteger(emissions)} tCO2e`;
    const getFormattedByOneDecimalPlaceEmissions = (emissions: number) =>
      `${formatOneDecimalPlace(emissions)} tCO2e`;

    describe('and there is historical emission data corresponding to the allocation year', () => {
      const corporateEmission = {
        id: 'emission-0',
        scope1: 123,
        scope2: 123,
        scope3: 123,
        offset: 0,
        year: 2020,
      };
      const corporateEmissions = [corporateEmission];

      describe('when there are awaiting approval allocations', () => {
        it('should correctly display in a Pending Allocation', async () => {
          const mocks = [
            emissionAllocationsMocks.getPendingEmissionAllocationsMock({
              ...commonMockArgs,
              requested: [],
              awaitingApproval: awaitingApprovalEmissionAllocations,
            }),
            corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
          ];
          const { findByTestId } = setup(mocks);

          const pendingAllocation = await findByTestId(
            selectors.pendingAllocation
          );

          const expects = getSerialisedExpects([
            async () =>
              expect(
                await within(pendingAllocation).findByText(
                  awaitingApprovalAllocation.supplier!.name
                )
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).findByText('26 Feb 2021')
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).findByText(
                  getFormattedByOneDecimalPlaceEmissions(
                    awaitingApprovalAllocation.emissions!
                  )
                )
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).findByText(
                  getAllocationMethodString(
                    awaitingApprovalAllocation.allocationMethod
                  )
                )
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).findByTestId(
                  pendingAllocationSelectors.getAcceptButtonSelector(
                    selectors.pendingAllocation
                  )
                )
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).findByTestId(
                  pendingAllocationSelectors.getRejectButtonSelector(
                    selectors.pendingAllocation
                  )
                )
              ).toBeInTheDocument(),
          ]);

          await expects;
        });

        describe('when the user does not have edit permission', () => {
          beforeEach(() => {
            ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
              () => ({
                company: { id: userCompany.id },
                canEditSupplyDashboard: false,
              })
            );
          });

          it('should not display the Accept or Reject buttons', async () => {
            const mocks = [
              emissionAllocationsMocks.getPendingEmissionAllocationsMock({
                ...commonMockArgs,
                requested: [],
                awaitingApproval: awaitingApprovalEmissionAllocations,
              }),
              corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
            ];
            const { findByTestId } = setup(mocks);

            const pendingAllocation = await findByTestId(
              selectors.pendingAllocation
            );

            const expects = getSerialisedExpects([
              async () =>
                expect(
                  await within(pendingAllocation).queryByTestId(
                    pendingAllocationSelectors.getAcceptButtonSelector(
                      selectors.pendingAllocation
                    )
                  )
                ).not.toBeInTheDocument(),
              async () =>
                expect(
                  await within(pendingAllocation).queryByTestId(
                    pendingAllocationSelectors.getRejectButtonSelector(
                      selectors.pendingAllocation
                    )
                  )
                ).not.toBeInTheDocument(),
            ]);

            await expects;
          });
        });

        describe('when an allocation is successfully rejected', () => {
          it('should display the success toast message', async () => {
            jest.spyOn(toast, 'displaySuccessMessage');
            const expectedSuccessToastPayload = {
              title: 'Emissions rejected',
              subtitle: "We'll inform your supplier of your decision",
            };

            const mocks = [
              emissionAllocationsMocks.getPendingEmissionAllocationsMock({
                ...commonMockArgs,
                requested: [],
                awaitingApproval: awaitingApprovalEmissionAllocations,
              }),
              corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
              updateEmissionAllocationMocks.getRejectEmissionAllocationMock({
                id: awaitingApprovalAllocation.id,
                status: EmissionAllocationStatus.REJECTED,
              }),
              emissionAllocationsMocks.getPendingEmissionAllocationsMock({
                ...commonMockArgs,
                requested: [],
                awaitingApproval: awaitingApprovalEmissionAllocations,
              }),
            ];
            const { findByTestId } = setup(mocks);

            const rejectButton = await findByTestId(
              pendingAllocationSelectors.getRejectButtonSelector(
                selectors.pendingAllocation
              )
            );

            await act(async () => {
              await fireEvent.click(rejectButton);
            });

            await waitFor(() => {
              expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
                expectedSuccessToastPayload
              );
            });
          });
        });

        describe('when an allocation rejection returns an error', () => {
          it('should display the error toast message', async () => {
            jest.spyOn(toast, 'displayErrorMessage');
            const expectedErrorToastPayload = {
              title: 'Something went wrong',
              subtitle: 'Please try again',
            };

            const mocks = [
              emissionAllocationsMocks.getPendingEmissionAllocationsMock({
                ...commonMockArgs,
                requested: [],
                awaitingApproval: awaitingApprovalEmissionAllocations,
              }),
              corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
              updateEmissionAllocationMocks.getRejectEmissionAllocationMockError(
                {
                  id: awaitingApprovalAllocation.id,
                  status: EmissionAllocationStatus.REJECTED,
                  customerEmissionId: corporateEmission.id,
                }
              ),
            ];
            const { findByTestId } = setup(mocks);

            const rejectButton = await findByTestId(
              pendingAllocationSelectors.getRejectButtonSelector(
                selectors.pendingAllocation
              )
            );

            await act(async () => {
              await fireEvent.click(rejectButton);
            });

            await waitFor(() => {
              expect(toast.displayErrorMessage).toHaveBeenCalledWith(
                expectedErrorToastPayload
              );
            });
          });
        });
      });

      describe('when there are allocations requests from customers', () => {
        it('should correctly display in a Pending Allocation', async () => {
          const mocks = [
            emissionAllocationsMocks.getPendingEmissionAllocationsMock({
              ...commonMockArgs,
              requested: awaitingAllocationRequests,
              awaitingApproval: [],
            }),
            corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
          ];
          const { findByTestId } = setup(mocks);

          const pendingAllocation = await findByTestId(
            selectors.pendingAllocation
          );

          const expects = getSerialisedExpects([
            async () =>
              expect(
                await within(pendingAllocation).findByText(
                  awaitingAllocationRequest.customer.name
                )
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).findByText('26 Feb 2021')
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).findByText(
                  awaitingAllocationRequest.note!
                )
              ).toBeInTheDocument(),

            async () =>
              expect(
                await within(pendingAllocation).findByTestId(
                  pendingAllocationSelectors.getAcceptButtonSelector(
                    selectors.pendingAllocation
                  )
                )
              ).toBeInTheDocument(),
          ]);

          await expects;
        });

        describe('when the user does not have edit permission', () => {
          beforeEach(() => {
            ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
              () => ({
                company: { id: userCompany.id },
                canEditSupplyDashboard: false,
              })
            );
          });

          it('should not display the Allocate button', async () => {
            const mocks = [
              emissionAllocationsMocks.getPendingEmissionAllocationsMock({
                ...commonMockArgs,
                requested: awaitingAllocationRequests,
                awaitingApproval: [],
              }),
              corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
            ];
            const { queryByText } = setup(mocks);

            await waitFor(() =>
              expect(
                queryByText(
                  pendingAllocationSelectors.getAcceptButtonSelector(
                    selectors.pendingAllocation
                  )
                )
              ).not.toBeInTheDocument()
            );
          });
        });

        describe('when an allocation request is successfully dismissed', () => {
          it('should display the success toast message', async () => {
            jest.spyOn(toast, 'displaySuccessMessage');
            const expectedSuccessToastPayload = {
              title: 'Request successfully dismissed',
            };

            const mocks = [
              emissionAllocationsMocks.getPendingEmissionAllocationsMock({
                ...commonMockArgs,
                requested: awaitingAllocationRequests,
                awaitingApproval: [],
              }),
              corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
              updateEmissionAllocationMocks.getRejectEmissionAllocationMock({
                id: awaitingAllocationRequest.id,
                status: EmissionAllocationStatus.REQUEST_DISMISSED,
                customerEmissionId: corporateEmission.id,
              }),
              emissionAllocationsMocks.getPendingEmissionAllocationsMock({
                ...commonMockArgs,
                requested: awaitingAllocationRequests,
                awaitingApproval: [],
              }),
            ];
            const { findByTestId } = setup(mocks);

            const rejectButton = await findByTestId(
              pendingAllocationSelectors.getRejectButtonSelector(
                selectors.pendingAllocation
              )
            );

            await act(async () => {
              await fireEvent.click(rejectButton);
            });

            await waitFor(() => {
              expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
                expectedSuccessToastPayload
              );
            });
          });
        });

        describe('when an allocation request dismissal returns an error', () => {
          it('should display the error toast message', async () => {
            jest.spyOn(toast, 'displayErrorMessage');
            const expectedErrorToastPayload = {
              title: 'Something went wrong',
              subtitle: "We couldn't dismiss the request. Try again later.",
            };

            const mocks = [
              emissionAllocationsMocks.getPendingEmissionAllocationsMock({
                ...commonMockArgs,
                requested: awaitingAllocationRequests,
                awaitingApproval: [],
              }),
              corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
              updateEmissionAllocationMocks.getRejectEmissionAllocationMockError(
                {
                  id: awaitingApprovalAllocation.id,
                  status: EmissionAllocationStatus.REQUEST_DISMISSED,
                  customerEmissionId: corporateEmission.id,
                }
              ),
            ];
            const { findByTestId } = setup(mocks);

            const rejectButton = await findByTestId(
              pendingAllocationSelectors.getRejectButtonSelector(
                selectors.pendingAllocation
              )
            );

            await act(async () => {
              await fireEvent.click(rejectButton);
            });

            await waitFor(() => {
              expect(toast.displayErrorMessage).toHaveBeenCalledWith(
                expectedErrorToastPayload
              );
            });
          });
        });
      });
    });

    describe('when there is no historical emission data corresponding to the allocation year ', () => {
      describe('when there are allocation waiting for approval', () => {
        const corporateEmission = {
          id: 'emission-0',
          scope1: 123,
          scope2: 123,
          scope3: 123,
          offset: 0,
          year: 1967,
        };

        const corporateEmissions = [corporateEmission];

        it('should display the Pending Allocation isMissingEmissions view', async () => {
          const mocks = [
            emissionAllocationsMocks.getPendingEmissionAllocationsMock({
              ...commonMockArgs,
              requested: [],
              awaitingApproval: awaitingApprovalEmissionAllocations,
            }),
            corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
          ];
          const { findByTestId } = setup(mocks);

          const pendingAllocation = await findByTestId(
            selectors.pendingAllocation
          );

          const expects = getSerialisedExpects([
            async () =>
              expect(
                await within(pendingAllocation).findByText(
                  awaitingApprovalAllocation.supplier!.name
                )
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).findByText('26 Feb 2021')
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).queryByText(
                  getFormattedEmissions(awaitingApprovalAllocation.emissions!)
                )
              ).not.toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).queryByText(
                  getAllocationMethodString(
                    awaitingApprovalAllocation.allocationMethod
                  )
                )
              ).not.toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).queryByText(
                  pendingAllocationSelectors.getAcceptButtonSelector(
                    selectors.pendingAllocation
                  )
                )
              ).not.toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).queryByText(
                  pendingAllocationSelectors.getRejectButtonSelector(
                    selectors.pendingAllocation
                  )
                )
              ).not.toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).findByText(
                  "You don't have corporate emissions for 2020."
                )
              ).toBeInTheDocument(),
          ]);

          await expects;

          await act(async () => {
            fireEvent.click(
              await within(pendingAllocation).findByText('add emissions')
            );
          });

          expect(
            await findByTestId(
              corporateEmissionFormSelectors.getEmissionFormTestId(
                ModalContentType.NEW_ACTUAL
              )
            )
          ).toBeInTheDocument();
        });
      });

      describe('when there are allocation requests', () => {
        const corporateEmission = {
          id: 'emission-0',
          scope1: 123,
          scope2: 123,
          scope3: 123,
          offset: 0,
          year: 1967,
        };

        const corporateEmissions = [corporateEmission];

        it('should display the Pending Allocation isMissingEmissions view', async () => {
          const mocks = [
            emissionAllocationsMocks.getPendingEmissionAllocationsMock({
              ...commonMockArgs,
              requested: awaitingAllocationRequests,
              awaitingApproval: [],
            }),
            corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
          ];
          const { findByTestId } = setup(mocks);

          const pendingAllocation = await findByTestId(
            selectors.pendingAllocation
          );

          const expects = getSerialisedExpects([
            async () =>
              expect(
                await within(pendingAllocation).findByText(
                  awaitingAllocationRequest.customer.name
                )
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).findByText('26 Feb 2021')
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).queryByText(
                  awaitingAllocationRequest.note!
                )
              ).not.toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).queryByText(
                  pendingAllocationSelectors.getAcceptButtonSelector(
                    selectors.pendingAllocation
                  )
                )
              ).not.toBeInTheDocument(),
            async () =>
              expect(
                await within(pendingAllocation).findByText(
                  "You don't have corporate emissions for 2020."
                )
              ).toBeInTheDocument(),
          ]);

          await expects;

          await act(async () => {
            fireEvent.click(
              await within(pendingAllocation).findByText('add emissions')
            );
          });

          expect(
            await findByTestId(
              corporateEmissionFormSelectors.getEmissionFormTestId(
                ModalContentType.NEW_ACTUAL
              )
            )
          ).toBeInTheDocument();
        });
      });
    });
  });
});
