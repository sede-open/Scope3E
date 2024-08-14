import { MockedProvider } from '@apollo/client/testing';
import {
  act,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react';
import * as inviteSelectors from 'components/Invite/selectors';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { mockFlags } from 'jest-launchdarkly-mock';
import * as companyRelationshipsMocks from 'mocks/companyRelationships';
import * as meMocks from 'mocks/me';
import I18nProvider from 'next-translate/I18nProvider';
import { AlizarinCrimson, CongressBlue, TahitiGold } from 'styles/colours';
import {
  CompanyRelationshipType,
  CompanyStatus,
  InviteStatus,
} from 'types/globalTypes';
import { getSerialisedExpects } from 'utils/tests';
import * as toast from 'utils/toast';
import { CompanyRelationships } from '.';
import companyRelationshipsNamespace from '../../../../locales/en/companyRelationships.json';
import * as createRelationshipFormSelectors from './CreateRelationshipForm/selectors';
import { TableColumnNames } from './OutgoingRelationships/types';
import * as selectors from './selectors';
import { CompanyRelationshipDisplayStatus } from './types';

const setup = (relationshipType: CompanyRelationshipType, mocks: any[]) =>
  render(
    <I18nProvider
      namespaces={{ companyRelationships: companyRelationshipsNamespace }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticatedUserProvider>
          <CompanyRelationships relationshipType={relationshipType} />
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );

const { externalCompany, userCompany } = companyRelationshipsMocks;
const getStatusString = (status: string) =>
  companyRelationshipsNamespace[
    `status-${status}` as keyof typeof companyRelationshipsNamespace
  ];

const relationshipTemplate = {
  id: 'some-relationship-id',
  inviteType: CompanyRelationshipType.CUSTOMER,
  status: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
  customer: userCompany,
  supplier: externalCompany,
  note: 'Please connect with me as my supplier',
};

describe('CompanyRelationships', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFlags({ networkPage: false });
  });

  describe('when suppliers tab is selected', () => {
    const relationships = companyRelationshipsMocks.getSupplierRelationships();

    const mock = companyRelationshipsMocks.getCompanyRelationshipsMock(
      CompanyRelationshipType.SUPPLIER,
      [...relationships]
    );

    describe('when company name header is clicked', () => {
      it('should sort rows by company name in an ascending order', async () => {
        const {
          findAllByTestId,
          findByTestId,
        } = setup(CompanyRelationshipType.SUPPLIER, [
          mock,
          meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
        ]);

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.COMPANY_NAME}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.companyRelationshipsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(relationships[1].supplier.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(relationships[2].supplier.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(relationships[0].supplier.name)
          ).toBeInTheDocument();
        });
      });

      describe('when company name header is clicked again', () => {
        it('should sort rows by company name in an descending order', async () => {
          const {
            findAllByTestId,
            findByTestId,
          } = setup(CompanyRelationshipType.SUPPLIER, [
            mock,
            meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
          ]);

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.COMPANY_NAME}`)
          );

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.COMPANY_NAME}`)
          );

          const allocationRows = await findAllByTestId(
            `${selectors.companyRelationshipsTable}-row`
          );

          await waitFor(() => {
            expect(
              within(allocationRows[0]).getByText(
                relationships[0].supplier.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[1]).getByText(
                relationships[2].supplier.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[2]).getByText(
                relationships[1].supplier.name
              )
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe('when sector header is clicked', () => {
      it('should sort rows by sector in an ascending order', async () => {
        const {
          findAllByTestId,
          findByTestId,
        } = setup(CompanyRelationshipType.SUPPLIER, [
          mock,
          meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
        ]);

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.SECTOR}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.companyRelationshipsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(relationships[0].supplier.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(relationships[2].supplier.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(relationships[1].supplier.name)
          ).toBeInTheDocument();
        });
      });

      describe('when sector header is clicked again', () => {
        it('should sort rows by sector in an descending order', async () => {
          const {
            findAllByTestId,
            findByTestId,
          } = setup(CompanyRelationshipType.SUPPLIER, [
            mock,
            meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
          ]);

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.SECTOR}`)
          );

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.SECTOR}`)
          );

          const allocationRows = await findAllByTestId(
            `${selectors.companyRelationshipsTable}-row`
          );

          await waitFor(() => {
            expect(
              within(allocationRows[0]).getByText(
                relationships[1].supplier.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[1]).getByText(
                relationships[2].supplier.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[2]).getByText(
                relationships[0].supplier.name
              )
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe('when location header is clicked', () => {
      it('should sort rows by location in an ascending order', async () => {
        const {
          findAllByTestId,
          findByTestId,
        } = setup(CompanyRelationshipType.SUPPLIER, [
          mock,
          meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
        ]);

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.LOCATION}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.companyRelationshipsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(relationships[1].supplier.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(relationships[0].supplier.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(relationships[2].supplier.name)
          ).toBeInTheDocument();
        });
      });

      describe('when location header is clicked again', () => {
        it('should sort rows by location in an descending order', async () => {
          const {
            findAllByTestId,
            findByTestId,
          } = setup(CompanyRelationshipType.SUPPLIER, [
            mock,
            meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
          ]);

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.LOCATION}`)
          );

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.LOCATION}`)
          );

          const allocationRows = await findAllByTestId(
            `${selectors.companyRelationshipsTable}-row`
          );

          await waitFor(() => {
            expect(
              within(allocationRows[0]).getByText(
                relationships[2].supplier.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[1]).getByText(
                relationships[0].supplier.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[2]).getByText(
                relationships[1].supplier.name
              )
            ).toBeInTheDocument();
          });
        });
      });
    });
  });

  describe('when customers tab is selected', () => {
    const relationships = companyRelationshipsMocks.getCustomerRelationships();

    const mock = companyRelationshipsMocks.getCompanyRelationshipsMock(
      CompanyRelationshipType.CUSTOMER,
      [...relationships]
    );

    it('should sort relationships by status INVITATION_SENT -> INVITATION_DECLINED -> CONNECTED -> VETOED', async () => {
      const { findAllByTestId } = setup(CompanyRelationshipType.CUSTOMER, [
        mock,
        meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
      ]);

      const allocationRows = await findAllByTestId(
        `${selectors.companyRelationshipsTable}-row`
      );

      await waitFor(() => {
        expect(
          within(allocationRows[0]).getByText(relationships[0].customer.name)
        ).toBeInTheDocument();
        expect(
          within(allocationRows[1]).getByText(relationships[3].customer.name)
        ).toBeInTheDocument();
        expect(
          within(allocationRows[2]).getByText(relationships[1].customer.name)
        ).toBeInTheDocument();
        expect(
          within(allocationRows[3]).getByText(relationships[2].customer.name)
        ).toBeInTheDocument();
      });
    });

    describe('when status header is clicked', () => {
      it('should sort relationships by status VETOED -> CONNECTED -> INVITATION_DECLINED -> INVITATION_SENT', async () => {
        const {
          findAllByTestId,
          findByTestId,
        } = setup(CompanyRelationshipType.CUSTOMER, [
          mock,
          meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
        ]);

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.STATUS}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.companyRelationshipsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(relationships[2].customer.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(relationships[1].customer.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(relationships[3].customer.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[3]).getByText(relationships[0].customer.name)
          ).toBeInTheDocument();
        });
      });
    });

    describe('when company name header is clicked', () => {
      it('should sort rows by company name in an ascending order', async () => {
        const {
          findAllByTestId,
          findByTestId,
        } = setup(CompanyRelationshipType.CUSTOMER, [
          mock,
          meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
        ]);

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.COMPANY_NAME}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.companyRelationshipsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(relationships[1].customer.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(relationships[3].customer.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(relationships[0].customer.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[3]).getByText(relationships[2].customer.name)
          ).toBeInTheDocument();
        });
      });

      describe('when company name header is clicked again', () => {
        it('should sort rows by company name in an descending order', async () => {
          const {
            findAllByTestId,
            findByTestId,
          } = setup(CompanyRelationshipType.CUSTOMER, [
            mock,
            meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
          ]);

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.COMPANY_NAME}`)
          );

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.COMPANY_NAME}`)
          );

          const allocationRows = await findAllByTestId(
            `${selectors.companyRelationshipsTable}-row`
          );

          await waitFor(() => {
            expect(
              within(allocationRows[0]).getByText(
                relationships[2].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[1]).getByText(
                relationships[0].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[2]).getByText(
                relationships[3].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[3]).getByText(
                relationships[1].customer.name
              )
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe('when sector header is clicked', () => {
      it('should sort rows by sector in an ascending order', async () => {
        const {
          findAllByTestId,
          findByTestId,
        } = setup(CompanyRelationshipType.CUSTOMER, [
          mock,
          meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
        ]);

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.SECTOR}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.companyRelationshipsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(relationships[0].customer.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(relationships[3].customer.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(relationships[1].customer.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[3]).getByText(relationships[2].customer.name)
          ).toBeInTheDocument();
        });
      });

      describe('when sector header is clicked again', () => {
        it('should sort rows by sector in an descending order', async () => {
          const {
            findAllByTestId,
            findByTestId,
          } = setup(CompanyRelationshipType.CUSTOMER, [
            mock,
            meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
          ]);

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.SECTOR}`)
          );

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.SECTOR}`)
          );

          const allocationRows = await findAllByTestId(
            `${selectors.companyRelationshipsTable}-row`
          );

          await waitFor(() => {
            expect(
              within(allocationRows[0]).getByText(
                relationships[2].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[1]).getByText(
                relationships[1].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[2]).getByText(
                relationships[3].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[3]).getByText(
                relationships[0].customer.name
              )
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe('when location header is clicked', () => {
      it('should sort rows by location in an ascending order', async () => {
        const {
          findAllByTestId,
          findByTestId,
        } = setup(CompanyRelationshipType.CUSTOMER, [
          mock,
          meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
        ]);

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.LOCATION}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.companyRelationshipsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(relationships[1].customer.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(relationships[0].customer.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(relationships[3].customer.name)
          ).toBeInTheDocument();
          expect(
            within(allocationRows[3]).getByText(relationships[2].customer.name)
          ).toBeInTheDocument();
        });
      });

      describe('when location header is clicked again', () => {
        it('should sort rows by location in an descending order', async () => {
          const {
            findAllByTestId,
            findByTestId,
          } = setup(CompanyRelationshipType.CUSTOMER, [
            mock,
            meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
          ]);

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.LOCATION}`)
          );

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.LOCATION}`)
          );

          const allocationRows = await findAllByTestId(
            `${selectors.companyRelationshipsTable}-row`
          );

          await waitFor(() => {
            expect(
              within(allocationRows[0]).getByText(
                relationships[2].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[1]).getByText(
                relationships[3].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[2]).getByText(
                relationships[0].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[3]).getByText(
                relationships[1].customer.name
              )
            ).toBeInTheDocument();
          });
        });
      });
    });
  });

  describe("when a relationship's inviteType matches the relationshipType", () => {
    [
      {
        relationshipType: CompanyRelationshipType.CUSTOMER,
        relationship: {
          id: 'some-relationship-id',
          inviteType: CompanyRelationshipType.CUSTOMER,
          status: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
          customer: externalCompany,
          supplier: userCompany,
          note: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        relationshipType: CompanyRelationshipType.SUPPLIER,
        relationship: {
          id: 'some-relationship-id',
          inviteType: CompanyRelationshipType.SUPPLIER,
          status: InviteStatus.AWAITING_SUPPLIER_APPROVAL,
          customer: userCompany,
          supplier: externalCompany,
          note: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    ].forEach(({ relationshipType, relationship }) => {
      it('should display in the relationships table', async () => {
        const mock = companyRelationshipsMocks.getCompanyRelationshipsMock(
          relationshipType,
          [relationship]
        );
        const { findByTestId } = setup(relationshipType, [
          mock,
          meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
        ]);

        const relationshipsTable = await findByTestId(
          selectors.companyRelationshipsTable
        );

        const expects = getSerialisedExpects([
          async () =>
            expect(
              await within(relationshipsTable).findByText(externalCompany.name)
            ).toBeInTheDocument(),
          async () =>
            expect(
              await within(relationshipsTable).findByText(
                externalCompany.companySectors[0].sector.name
              )
            ).toBeInTheDocument(),
          async () =>
            expect(
              await within(relationshipsTable).findByText(
                externalCompany.location
              )
            ).toBeInTheDocument(),
          async () =>
            expect(
              await within(relationshipsTable).findByText('Invitation sent')
            ).toBeInTheDocument(),
        ]);

        await expects;
      });
    });

    describe('and the user has edit permission', () => {
      describe('when the status of a relationship is "Rejected"', () => {
        const relationshipType = CompanyRelationshipType.SUPPLIER;
        const relationship = {
          id: 'some-relationship-id',
          inviteType: CompanyRelationshipType.SUPPLIER,
          status: InviteStatus.REJECTED_BY_SUPPLIER,
          customer: userCompany,
          supplier: externalCompany,
          note: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const mock = companyRelationshipsMocks.getCompanyRelationshipsMock(
          relationshipType,
          [relationship]
        );

        it('should display the "Re-send" button', async () => {
          const { findByText } = setup(relationshipType, [
            mock,
            meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
          ]);

          const rejectedCell = await (
            await findByText(
              getStatusString(
                CompanyRelationshipDisplayStatus.INVITATION_DECLINED
              )
            )
          ).closest('td');

          expect(rejectedCell).toBeInTheDocument();

          if (rejectedCell) {
            expect(
              await within(rejectedCell).queryByText(getStatusString('re-send'))
            ).toBeInTheDocument();
          }
        });

        describe('when a "Re-send" button is clicked ', () => {
          it('should display the Create Relationship form', async () => {
            const { findByTestId, findByText } = setup(relationshipType, [
              mock,
              meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
            ]);

            const rejectedCell = await (
              await findByText(
                getStatusString(
                  CompanyRelationshipDisplayStatus.INVITATION_DECLINED
                )
              )
            ).closest('td');

            expect(rejectedCell).toBeInTheDocument();

            if (rejectedCell) {
              const reSendButton = await within(rejectedCell).queryByText(
                getStatusString('re-send')
              );

              if (reSendButton) {
                act(() => {
                  fireEvent.click(reSendButton);
                });

                expect(
                  await findByTestId(
                    createRelationshipFormSelectors.createRelationshipForm
                  )
                ).toBeInTheDocument();
              }
            }
          });
        });
      });

      describe.each`
        relationshipStatus                         | expectedDisplayStatus
        ${InviteStatus.AWAITING_SUPPLIER_APPROVAL} | ${'Invitation sent'}
        ${InviteStatus.APPROVED}                   | ${'Connected'}
      `(
        'when company relationship is $relationshipStatus',
        ({
          relationshipStatus,
          expectedDisplayStatus,
        }: {
          relationshipStatus: InviteStatus;
          expectedDisplayStatus: string;
        }) => {
          it('should not display the "Re-send" button', async () => {
            const relationshipType = CompanyRelationshipType.SUPPLIER;
            const relationship = {
              id: 'some-relationship-id',
              inviteType: CompanyRelationshipType.SUPPLIER,
              status: relationshipStatus,
              customer: userCompany,
              supplier: externalCompany,
              note: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            const mock = companyRelationshipsMocks.getCompanyRelationshipsMock(
              relationshipType,
              [relationship]
            );

            const { findByText } = setup(relationshipType, [
              mock,
              meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
            ]);

            const statusCell = await (
              await findByText(expectedDisplayStatus)
            ).closest('td');

            expect(statusCell).toBeInTheDocument();

            if (statusCell) {
              expect(
                await within(statusCell).queryByText(getStatusString('re-send'))
              ).not.toBeInTheDocument();
            }
          });
        }
      );
    });
  });

  describe('when invitation was sent to a customer', () => {
    describe.each`
      companyStatus                              | displayText              | displayColour
      ${CompanyStatus.ACTIVE}                    | ${'Invitation sent'}     | ${CongressBlue}
      ${CompanyStatus.INVITATION_DECLINED}       | ${'Invitation declined'} | ${AlizarinCrimson}
      ${CompanyStatus.PENDING_USER_ACTIVATION}   | ${'Invitation sent'}     | ${CongressBlue}
      ${CompanyStatus.PENDING_USER_CONFIRMATION} | ${'Invitation sent'}     | ${CongressBlue}
      ${CompanyStatus.VETOED}                    | ${'Vetoed'}              | ${TahitiGold}
      ${CompanyStatus.VETTING_IN_PROGRESS}       | ${'Invitation sent'}     | ${CongressBlue}
    `(
      'when customer status is $companyStatus',
      ({
        companyStatus,
        displayText,
        displayColour,
      }: {
        companyStatus: CompanyStatus;
        displayColour: string;
        displayText: string;
      }) => {
        it('should display the correct status label', async () => {
          const relationshipType = CompanyRelationshipType.CUSTOMER;
          const relationship = {
            ...relationshipTemplate,
            inviteType: relationshipType,
            status: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
            customer: { ...externalCompany, status: companyStatus },
            supplier: userCompany,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          const mock = companyRelationshipsMocks.getCompanyRelationshipsMock(
            relationshipType,
            [relationship]
          );
          const { findByText } = setup(relationshipType, [
            mock,
            meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
          ]);

          const relationshipLabel = await findByText(displayText);
          expect(relationshipLabel).toBeInTheDocument();
          expect(relationshipLabel).toHaveStyle(`color: ${displayColour}`);
        });
      }
    );
  });

  describe('when invitation was sent to a supplier', () => {
    describe.each`
      companyStatus                              | displayText              | displayColour
      ${CompanyStatus.ACTIVE}                    | ${'Invitation sent'}     | ${CongressBlue}
      ${CompanyStatus.INVITATION_DECLINED}       | ${'Invitation declined'} | ${AlizarinCrimson}
      ${CompanyStatus.PENDING_USER_ACTIVATION}   | ${'Invitation sent'}     | ${CongressBlue}
      ${CompanyStatus.PENDING_USER_CONFIRMATION} | ${'Invitation sent'}     | ${CongressBlue}
      ${CompanyStatus.VETOED}                    | ${'Vetoed'}              | ${TahitiGold}
      ${CompanyStatus.VETTING_IN_PROGRESS}       | ${'Invitation sent'}     | ${CongressBlue}
    `(
      'when customer status is $companyStatus',
      ({
        companyStatus,
        displayText,
        displayColour,
      }: {
        companyStatus: CompanyStatus;
        displayColour: string;
        displayText: string;
      }) => {
        it('should display the correct status label', async () => {
          const relationshipType = CompanyRelationshipType.SUPPLIER;
          const relationship = {
            ...relationshipTemplate,
            inviteType: CompanyRelationshipType.SUPPLIER,
            status: InviteStatus.AWAITING_SUPPLIER_APPROVAL,
            customer: userCompany,
            supplier: { ...externalCompany, status: companyStatus },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          const mock = companyRelationshipsMocks.getCompanyRelationshipsMock(
            relationshipType,
            [relationship]
          );
          const { findByText } = setup(relationshipType, [
            mock,
            meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
          ]);

          const relationshipLabel = await findByText(displayText);
          expect(relationshipLabel).toBeInTheDocument();
          expect(relationshipLabel).toHaveStyle(`color: ${displayColour}`);
        });
      }
    );
  });

  [
    {
      relationshipType: CompanyRelationshipType.SUPPLIER,
      relationship: {
        ...relationshipTemplate,
        inviteType: CompanyRelationshipType.CUSTOMER,
        status: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
        customer: userCompany,
        supplier: externalCompany,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    {
      relationshipType: CompanyRelationshipType.CUSTOMER,
      relationship: {
        ...relationshipTemplate,
        inviteType: CompanyRelationshipType.SUPPLIER,
        status: InviteStatus.AWAITING_SUPPLIER_APPROVAL,
        customer: externalCompany,
        supplier: userCompany,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  ].forEach(({ relationship, relationshipType }) => {
    describe(`when a relationship's inviteType (${relationship.inviteType}}) does not match the relationshipType (${relationshipType})`, () => {
      it('should not display in the relationships table', () => {
        const mock = companyRelationshipsMocks.getCompanyRelationshipsMock(
          relationshipType,
          [relationship]
        );
        const { queryByText } = setup(relationshipType, [
          mock,
          meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
        ]);

        expect(
          queryByText(selectors.companyRelationshipsTable)
        ).not.toBeInTheDocument();
      });

      describe('and when the status is APPROVED', () => {
        it('should display in the relationships table', async () => {
          const approvedRelationship = {
            ...relationship,
            status: InviteStatus.APPROVED,
          };
          const mock = companyRelationshipsMocks.getCompanyRelationshipsMock(
            relationshipType,
            [approvedRelationship]
          );
          const { findByTestId } = setup(relationshipType, [
            mock,
            meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
          ]);

          const relationshipsTable = await findByTestId(
            selectors.companyRelationshipsTable
          );

          const expects = getSerialisedExpects([
            async () =>
              expect(
                await within(relationshipsTable).findByText(
                  externalCompany.name
                )
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(relationshipsTable).findByText(
                  externalCompany.companySectors[0].sector.name
                )
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(relationshipsTable).findByText(
                  externalCompany.location
                )
              ).toBeInTheDocument(),
            async () =>
              expect(
                await within(relationshipsTable).findByText(
                  getStatusString(CompanyRelationshipDisplayStatus.CONNECTED)
                )
              ).toBeInTheDocument(),
          ]);

          await expects;
        });
      });

      it('should display in the Invite list Card', async () => {
        const mock = companyRelationshipsMocks.getCompanyRelationshipsMock(
          relationshipType,
          [relationship]
        );
        const { findByTestId } = setup(relationshipType, [
          mock,
          meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
        ]);

        const pendingInvitesCard = await findByTestId(
          selectors.pendingInvitesCard
        );

        const expects = getSerialisedExpects([
          async () =>
            expect(
              await within(pendingInvitesCard).findByText(externalCompany.name)
            ).toBeInTheDocument(),

          async () =>
            expect(
              await within(pendingInvitesCard).findByText(relationship.note)
            ).toBeInTheDocument(),
        ]);

        await expects;
      });

      describe('when the user has edit permission', () => {
        describe('when the Accept button is clicked', () => {
          it('should update the relationship status to APPROVED', async () => {
            const mocks = [
              companyRelationshipsMocks.getCompanyRelationshipsMock(
                relationshipType,
                [relationship]
              ),
              companyRelationshipsMocks.getUpdateCompanyRelationshipMock({
                id: relationship.id,
                status: InviteStatus.APPROVED,
              }),
              companyRelationshipsMocks.getEmptyCompanyRelationshipsMock(
                relationshipType
              ),
              meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
            ];
            const { findByTestId } = setup(relationshipType, mocks);

            const pendingInvitesCard = await findByTestId(
              selectors.pendingInvitesCard
            );
            const pendingInvite = await within(pendingInvitesCard).findByTestId(
              selectors.getInviteSelector(relationship.id)
            );

            expect(
              await within(pendingInvite).findByText(externalCompany.name)
            ).toBeInTheDocument();

            const acceptButton = await within(pendingInvite).findByTestId(
              inviteSelectors.acceptButton
            );

            act(() => {
              fireEvent.click(acceptButton);
            });

            await waitFor(() => {
              expect(pendingInvite).not.toBeInTheDocument();
            });
          });

          it('should display the accept success toast message', async () => {
            jest.spyOn(toast, 'displaySuccessMessage');
            const expectedSuccessToastPayload = {
              title: `You are now connected to ${externalCompany.name}`,
            };

            const mocks = [
              companyRelationshipsMocks.getCompanyRelationshipsMock(
                relationshipType,
                [relationship]
              ),
              companyRelationshipsMocks.getUpdateCompanyRelationshipMock({
                id: relationship.id,
                status: InviteStatus.APPROVED,
              }),
              companyRelationshipsMocks.getEmptyCompanyRelationshipsMock(
                relationshipType
              ),
              meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
            ];
            const { findByTestId } = setup(relationshipType, mocks);

            const pendingInvitesCard = await findByTestId(
              selectors.pendingInvitesCard
            );
            const pendingInvite = await within(pendingInvitesCard).findByTestId(
              selectors.getInviteSelector(relationship.id)
            );

            expect(
              await within(pendingInvite).findByText(externalCompany.name)
            ).toBeInTheDocument();

            const acceptButton = await within(pendingInvite).findByTestId(
              inviteSelectors.acceptButton
            );

            await act(async () => {
              fireEvent.click(acceptButton);

              await waitFor(() => {
                expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
                  expect.objectContaining(expectedSuccessToastPayload)
                );
              });
            });
          });

          it('should disable the Accept & Reject buttons', async () => {
            const mocks = [
              companyRelationshipsMocks.getCompanyRelationshipsMock(
                relationshipType,
                [relationship]
              ),
              companyRelationshipsMocks.getUpdateCompanyRelationshipMock({
                id: relationship.id,
                status: InviteStatus.APPROVED,
              }),
              companyRelationshipsMocks.getEmptyCompanyRelationshipsMock(
                relationshipType
              ),
              meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
            ];
            const { findByTestId } = setup(relationshipType, mocks);

            const pendingInvitesCard = await findByTestId(
              selectors.pendingInvitesCard
            );
            const pendingInvite = await within(pendingInvitesCard).findByTestId(
              selectors.getInviteSelector(relationship.id)
            );

            expect(
              await within(pendingInvite).findByText(externalCompany.name)
            ).toBeInTheDocument();

            const acceptButton = await within(pendingInvite).findByTestId(
              inviteSelectors.acceptButton
            );
            const rejectButton = await within(pendingInvite).findByTestId(
              inviteSelectors.rejectButton
            );

            act(() => {
              fireEvent.click(acceptButton);
            });
            expect(acceptButton).toHaveAttribute('disabled');
            expect(rejectButton).toHaveAttribute('disabled');
          });
        });

        describe('when the Reject button is clicked', () => {
          it(`should update the relationship status to REJECTED_BY_${relationshipType}}`, async () => {
            const newStatus =
              relationshipType === CompanyRelationshipType.CUSTOMER
                ? InviteStatus.REJECTED_BY_SUPPLIER
                : InviteStatus.REJECTED_BY_CUSTOMER;
            const mocks = [
              companyRelationshipsMocks.getCompanyRelationshipsMock(
                relationshipType,
                [relationship]
              ),
              companyRelationshipsMocks.getUpdateCompanyRelationshipMock({
                id: relationship.id,
                status: newStatus,
              }),
              companyRelationshipsMocks.getEmptyCompanyRelationshipsMock(
                relationshipType
              ),
              meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
            ];
            const { findByTestId } = setup(relationshipType, mocks);

            const pendingInvitesCard = await findByTestId(
              selectors.pendingInvitesCard
            );
            const pendingInvite = await within(pendingInvitesCard).findByTestId(
              selectors.getInviteSelector(relationship.id)
            );

            expect(
              await within(pendingInvite).findByText(externalCompany.name)
            ).toBeInTheDocument();

            const rejectButton = await within(pendingInvite).findByTestId(
              inviteSelectors.rejectButton
            );

            act(() => {
              fireEvent.click(rejectButton);
            });

            await waitFor(() => {
              expect(pendingInvite).not.toBeInTheDocument();
            });
          });

          it('should display the reject success toast message', async () => {
            jest.spyOn(toast, 'displaySuccessMessage');
            const expectedSuccessToastPayload = {
              title: 'Invitation rejected',
              subtitle: `We’ll inform ${externalCompany.name} of your decision`,
            };

            const newStatus =
              relationshipType === CompanyRelationshipType.CUSTOMER
                ? InviteStatus.REJECTED_BY_SUPPLIER
                : InviteStatus.REJECTED_BY_CUSTOMER;
            const mocks = [
              companyRelationshipsMocks.getCompanyRelationshipsMock(
                relationshipType,
                [relationship]
              ),
              companyRelationshipsMocks.getUpdateCompanyRelationshipMock({
                id: relationship.id,
                status: newStatus,
              }),
              companyRelationshipsMocks.getEmptyCompanyRelationshipsMock(
                relationshipType
              ),
              meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
            ];
            const { findByTestId } = setup(relationshipType, mocks);

            const pendingInvitesCard = await findByTestId(
              selectors.pendingInvitesCard
            );
            const pendingInvite = await within(pendingInvitesCard).findByTestId(
              selectors.getInviteSelector(relationship.id)
            );

            expect(
              await within(pendingInvite).findByText(externalCompany.name)
            ).toBeInTheDocument();

            const rejectButton = await within(pendingInvite).findByTestId(
              inviteSelectors.rejectButton
            );

            act(() => {
              fireEvent.click(rejectButton);
            });

            await waitFor(() => {
              expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
                expect.objectContaining(expectedSuccessToastPayload)
              );
            });
          });

          it('should disable the Accept & Reject buttons', async () => {
            const mocks = [
              companyRelationshipsMocks.getCompanyRelationshipsMock(
                relationshipType,
                [relationship]
              ),
              companyRelationshipsMocks.getUpdateCompanyRelationshipMock({
                id: relationship.id,
                status: InviteStatus.APPROVED,
              }),
              companyRelationshipsMocks.getEmptyCompanyRelationshipsMock(
                relationshipType
              ),
              meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
            ];
            const { findByTestId } = setup(relationshipType, mocks);

            const pendingInvitesCard = await findByTestId(
              selectors.pendingInvitesCard
            );
            const pendingInvite = await within(pendingInvitesCard).findByTestId(
              selectors.getInviteSelector(relationship.id)
            );

            expect(
              await within(pendingInvite).findByText(externalCompany.name)
            ).toBeInTheDocument();

            const acceptButton = await within(pendingInvite).findByTestId(
              inviteSelectors.acceptButton
            );
            const rejectButton = await within(pendingInvite).findByTestId(
              inviteSelectors.rejectButton
            );

            act(() => {
              fireEvent.click(rejectButton);
            });
            expect(acceptButton).toHaveAttribute('disabled');
            expect(rejectButton).toHaveAttribute('disabled');
          });
        });

        [
          [relationship],
          [
            relationship,
            {
              ...relationship,
              id: `${relationship.id}-2`,
            },
          ],
        ].forEach((relationships) => {
          describe(`when there ${relationships.length > 1 ? 'are' : 'is'} ${
            relationships.length
          } invite${relationships.length > 1 ? 's' : ''}`, () => {
            it('should not display the "Show all" button', () => {
              const newStatus =
                relationshipType === CompanyRelationshipType.CUSTOMER
                  ? InviteStatus.REJECTED_BY_SUPPLIER
                  : InviteStatus.REJECTED_BY_CUSTOMER;
              const mocks = [
                companyRelationshipsMocks.getCompanyRelationshipsMock(
                  relationshipType,
                  relationships
                ),
                companyRelationshipsMocks.getUpdateCompanyRelationshipMock({
                  id: relationship.id,
                  status: newStatus,
                }),
                companyRelationshipsMocks.getEmptyCompanyRelationshipsMock(
                  relationshipType
                ),
                meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
              ];
              const { queryByTestId } = setup(relationshipType, mocks);

              expect(
                queryByTestId(selectors.showAllButton)
              ).not.toBeInTheDocument();
            });
          });
        });

        describe('when there are more than 2 invites', () => {
          const relationships = [
            relationship,
            {
              ...relationship,
              id: `${relationship.id}-2`,
            },
            {
              ...relationship,
              id: `${relationship.id}-3`,
            },
            {
              ...relationship,
              id: `${relationship.id}-4`,
            },
          ];

          it('should display the "Show all" button', async () => {
            const newStatus =
              relationshipType === CompanyRelationshipType.CUSTOMER
                ? InviteStatus.REJECTED_BY_SUPPLIER
                : InviteStatus.REJECTED_BY_CUSTOMER;
            const mocks = [
              companyRelationshipsMocks.getCompanyRelationshipsMock(
                relationshipType,
                relationships
              ),
              companyRelationshipsMocks.getUpdateCompanyRelationshipMock({
                id: relationship.id,
                status: newStatus,
              }),
              companyRelationshipsMocks.getEmptyCompanyRelationshipsMock(
                relationshipType
              ),
              meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
            ];
            const { findByTestId } = setup(relationshipType, mocks);

            expect(
              await findByTestId(selectors.showAllButton)
            ).toBeInTheDocument();
          });

          it('should only display the first two relationships', async () => {
            const newStatus =
              relationshipType === CompanyRelationshipType.CUSTOMER
                ? InviteStatus.REJECTED_BY_SUPPLIER
                : InviteStatus.REJECTED_BY_CUSTOMER;
            const mocks = [
              companyRelationshipsMocks.getCompanyRelationshipsMock(
                relationshipType,
                relationships
              ),
              companyRelationshipsMocks.getUpdateCompanyRelationshipMock({
                id: relationship.id,
                status: newStatus,
              }),
              companyRelationshipsMocks.getEmptyCompanyRelationshipsMock(
                relationshipType
              ),
              meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
            ];
            const { findByTestId, queryByTestId } = setup(
              relationshipType,
              mocks
            );

            const expects = getSerialisedExpects([
              async () =>
                expect(
                  await findByTestId(
                    selectors.getInviteSelector(relationships[0].id)
                  )
                ).toBeInTheDocument(),
              async () =>
                expect(
                  await findByTestId(
                    selectors.getInviteSelector(relationships[1].id)
                  )
                ).toBeInTheDocument(),
              () =>
                expect(
                  queryByTestId(
                    selectors.getInviteSelector(relationships[2].id)
                  )
                ).not.toBeInTheDocument(),
              () =>
                expect(
                  queryByTestId(
                    selectors.getInviteSelector(relationships[3].id)
                  )
                ).not.toBeInTheDocument(),
            ]);

            await expects;
          });

          describe('when the "Show all" button is clicked', () => {
            it('should display all relationships', async () => {
              const newStatus =
                relationshipType === CompanyRelationshipType.CUSTOMER
                  ? InviteStatus.REJECTED_BY_SUPPLIER
                  : InviteStatus.REJECTED_BY_CUSTOMER;
              const mocks = [
                companyRelationshipsMocks.getCompanyRelationshipsMock(
                  relationshipType,
                  relationships
                ),
                companyRelationshipsMocks.getUpdateCompanyRelationshipMock({
                  id: relationship.id,
                  status: newStatus,
                }),
                companyRelationshipsMocks.getEmptyCompanyRelationshipsMock(
                  relationshipType
                ),
                meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
              ];
              const { findByTestId } = setup(relationshipType, mocks);
              const findAllButton = await findByTestId(selectors.showAllButton);

              act(() => {
                fireEvent.click(findAllButton);
              });

              const expects = getSerialisedExpects([
                async () =>
                  expect(
                    await findByTestId(
                      selectors.getInviteSelector(relationships[0].id)
                    )
                  ).toBeInTheDocument(),
                async () =>
                  expect(
                    await findByTestId(
                      selectors.getInviteSelector(relationships[1].id)
                    )
                  ).toBeInTheDocument(),
                async () =>
                  expect(
                    await findByTestId(
                      selectors.getInviteSelector(relationships[2].id)
                    )
                  ).toBeInTheDocument(),
                async () =>
                  expect(
                    await findByTestId(
                      selectors.getInviteSelector(relationships[3].id)
                    )
                  ).toBeInTheDocument(),
              ]);

              await expects;
            });
          });

          it('should hide the "Show all" button', async () => {
            const newStatus =
              relationshipType === CompanyRelationshipType.CUSTOMER
                ? InviteStatus.REJECTED_BY_SUPPLIER
                : InviteStatus.REJECTED_BY_CUSTOMER;
            const mocks = [
              companyRelationshipsMocks.getCompanyRelationshipsMock(
                relationshipType,
                relationships
              ),
              companyRelationshipsMocks.getUpdateCompanyRelationshipMock({
                id: relationship.id,
                status: newStatus,
              }),
              companyRelationshipsMocks.getEmptyCompanyRelationshipsMock(
                relationshipType
              ),
              meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
            ];
            const { findByTestId } = setup(relationshipType, mocks);
            const findAllButton = await findByTestId(selectors.showAllButton);

            act(() => {
              fireEvent.click(findAllButton);
            });

            expect(findAllButton).not.toBeInTheDocument();
          });
        });
      });

      describe('when the user does not have edit permission', () => {
        it('should not display the Accept or Reject button', async () => {
          const mocks = [
            companyRelationshipsMocks.getCompanyRelationshipsMock(
              relationshipType,
              [relationship]
            ),
            meMocks.getGetMeMock({ canEditCompanyRelationships: false }),
          ];
          const { findByTestId } = setup(relationshipType, mocks);

          const pendingInvitesCard = await findByTestId(
            selectors.pendingInvitesCard
          );
          const pendingInvite = await within(pendingInvitesCard).findByTestId(
            selectors.getInviteSelector(relationship.id)
          );

          expect(
            await within(pendingInvite).findByText(externalCompany.name)
          ).toBeInTheDocument();

          expect(
            await within(pendingInvite).queryByTestId(
              inviteSelectors.acceptButton
            )
          ).not.toBeInTheDocument();
          expect(
            await within(pendingInvite).queryByTestId(
              inviteSelectors.rejectButton
            )
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('when there are no relationships to display', () => {
    [
      CompanyRelationshipType.SUPPLIER,
      CompanyRelationshipType.CUSTOMER,
    ].forEach((relationshipType) => {
      const mock = companyRelationshipsMocks.getEmptyCompanyRelationshipsMock(
        relationshipType
      );

      it('should not render the customer relationship table', () => {
        const { queryByTestId } = setup(relationshipType, [
          mock,
          meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
        ]);

        expect(
          queryByTestId(selectors.companyRelationshipsTable)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('when the user does not have edit permission', () => {
    const relationshipType = CompanyRelationshipType.SUPPLIER;
    const relationship = {
      id: 'some-relationship-id',
      inviteType: CompanyRelationshipType.SUPPLIER,
      status: InviteStatus.AWAITING_SUPPLIER_APPROVAL,
      customer: userCompany,
      supplier: externalCompany,
      note: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const mock = companyRelationshipsMocks.getCompanyRelationshipsMock(
      relationshipType,
      [relationship]
    );

    it('should not display the "Connect" button', async () => {
      const { queryByTestId } = setup(relationshipType, [
        mock,
        meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
      ]);

      await waitFor(() => {
        expect(queryByTestId(selectors.inviteButton)).not.toBeInTheDocument();
      });
    });

    it('should not display "Re-send" buttons for rejected connection requests', async () => {
      const { queryByText } = setup(relationshipType, [
        mock,
        meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
      ]);

      await waitFor(() => {
        expect(queryByText('Re-send')).not.toBeInTheDocument();
      });
    });
  });

  it('should display new company invite form', async () => {
    const {
      findByTestId,
      queryByTestId,
    } = setup(CompanyRelationshipType.SUPPLIER, [
      meMocks.getGetMeMock({ canEditCompanyRelationships: true }),
    ]);

    expect(
      await findByTestId(selectors.newInviteFormButton)
    ).toBeInTheDocument();
    expect(queryByTestId(selectors.inviteButton)).toBeNull();
  });
});
