import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';

import {
  companyByDuns,
  companyByDunsQueryMockFail,
  companyByDunsQueryMockSuccess,
  dnbTypeaheadQueryMock,
  dnbTypeaheadSearchResult,
  dnbTypeaheadSearchResult2,
} from 'mocks/dnbSearch';
import { CompanyRelationshipType, CompanyStatus } from 'types/globalTypes';
import * as toast from 'utils/toast';
import {
  createCompanyRelationshipMock,
  createCompanyRelationshipMockError,
  getInviteAndConnectErrorMock,
  getInviteAndConnectSuccessMock,
} from 'mocks/companyRelationships';
import { USER_COMPANY_ID } from 'mocks/constants';
import { GraphQLError } from 'graphql';

import companyRelationshipsNamespace from '../../../../../locales/en/companyRelationships.json';
import formNamespace from '../../../../../locales/en/form.json';

import { InviteCompanyForm } from '.';
import { IProps } from './types';
import * as selectors from './selectors';
import {
  COMPANY_RELATIONSHIP_CONNECTED_ERROR,
  COMPANY_RELATIONSHIP_PENDING_ERROR,
  COMPANY_RELATIONSHIP_REJECTED_ERROR,
  USER_EXISTS_ERROR,
} from './constants';

const setup = (overrides: Partial<IProps> = {}, mocks: any[] = []) => {
  const props: IProps = {
    onClose: jest.fn(),
    companyId: USER_COMPANY_ID,
    relationshipType: CompanyRelationshipType.SUPPLIER,
    ...overrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        companyRelationships: companyRelationshipsNamespace,
        form: formNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <InviteCompanyForm {...props} />
      </MockedProvider>
    </I18nProvider>
  );
};

describe('InviteCompanyForm', () => {
  const searchTerm = 'example';
  const companyInputLabel = 'Select company';

  describe('when no fields have been filled', () => {
    it('should disable the submit button', async () => {
      const { findByTestId } = setup();

      const submitButton = await findByTestId(selectors.inviteCompanySubmit);
      expect(submitButton).toHaveAttribute('disabled');
    });
  });

  describe('when a user initialises the form with a company', () => {
    it('should disable the company field', () => {
      const { container } = setup({
        relationshipType: CompanyRelationshipType.CUSTOMER,
        initialCompany: {
          name: 'Big Corp.',
          duns: '123456789',
        },
      });

      const input = container.querySelector(
        '.search__single-value--is-disabled'
      );

      expect(input).toBeInTheDocument();
    });

    it('should render the initial company name in the company input field', () => {
      const { container } = setup({
        relationshipType: CompanyRelationshipType.CUSTOMER,
        initialCompany: {
          name: 'Big Corp.',
          duns: '123456789',
        },
      });

      const input = container.querySelector(
        '.search__single-value--is-disabled'
      );

      expect(input).toHaveTextContent('Big Corp.');
    });

    it('should not display the tooltip', async () => {
      const { queryByTestId } = setup({
        relationshipType: CompanyRelationshipType.CUSTOMER,
        initialCompany: {
          name: 'Big Corp.',
          duns: '123456789',
        },
      });
      expect(
        await queryByTestId('invite-company-tooltip-title')
      ).not.toBeInTheDocument();
    });
  });

  describe('when there is no initial company', () => {
    describe('when user wants to invite a customer', () => {
      it('should display "Invite Customer" title', async () => {
        const { findByText } = setup({
          relationshipType: CompanyRelationshipType.CUSTOMER,
        });
        expect(await findByText('Invite customer')).toBeInTheDocument();
      });

      describe('when user selects a company that exists', () => {
        it('should enable submit button', async () => {
          const { findByLabelText, getByLabelText, getByTestId } = setup(
            {
              relationshipType: CompanyRelationshipType.CUSTOMER,
            },
            [
              dnbTypeaheadQueryMock({ searchTerm }),
              companyByDunsQueryMockSuccess({
                duns: dnbTypeaheadSearchResult.duns,
              }),
            ]
          );

          fireEvent.change(await findByLabelText(companyInputLabel), {
            target: { value: searchTerm },
          });

          await selectEvent.select(
            getByLabelText(companyInputLabel),
            dnbTypeaheadSearchResult.primaryName
          );

          await waitFor(() =>
            expect(
              getByTestId(selectors.inviteCompanySubmit)
            ).not.toBeDisabled()
          );
        });

        describe('when user selects a vetoed company', () => {
          it('should display an error message', async () => {
            const companyByDunsMock = companyByDunsQueryMockSuccess(
              {
                duns: dnbTypeaheadSearchResult.duns,
              },
              {
                status: CompanyStatus.VETOED,
              }
            );
            const { findByLabelText, getByLabelText, getByTestId } = setup(
              {
                relationshipType: CompanyRelationshipType.CUSTOMER,
              },
              [dnbTypeaheadQueryMock({ searchTerm }), companyByDunsMock]
            );

            fireEvent.change(await findByLabelText(companyInputLabel), {
              target: { value: searchTerm },
            });

            await selectEvent.select(
              getByLabelText(companyInputLabel),
              dnbTypeaheadSearchResult.primaryName
            );

            await waitFor(() => {
              expect(
                getByTestId(selectors.companyInputError)
              ).toHaveTextContent(
                `We are currently unable to invite ${companyByDunsMock.result.data.companyByDuns.name} to join the Hub.`
              );
              expect(getByTestId(selectors.inviteCompanySubmit)).toBeDisabled();
            });
          });
        });

        describe('when the form is successfully submitted', () => {
          it('should display a success toaster message', async () => {
            jest.spyOn(toast, 'displaySuccessMessage');

            const { findByLabelText, getByLabelText, findByTestId } = setup(
              {
                relationshipType: CompanyRelationshipType.CUSTOMER,
              },
              [
                dnbTypeaheadQueryMock({ searchTerm }),
                companyByDunsQueryMockSuccess({
                  duns: dnbTypeaheadSearchResult.duns,
                }),
                createCompanyRelationshipMock({
                  inviteType: CompanyRelationshipType.CUSTOMER,
                  note: '',
                  supplierId: USER_COMPANY_ID,
                  customerId: companyByDuns.id,
                }),
              ]
            );

            fireEvent.change(await findByLabelText(companyInputLabel), {
              target: { value: searchTerm },
            });

            await selectEvent.select(
              getByLabelText(companyInputLabel),
              dnbTypeaheadSearchResult.primaryName
            );

            fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

            await waitFor(() => {
              expect(toast.displaySuccessMessage).toHaveBeenCalledWith({
                title: 'Invitation successfully sent',
                subtitle:
                  "You'll receive an email when your invitation is accepted",
              });
            });
          });
        });

        describe('when the form is unsuccessfully submitted', () => {
          it('should display a failure toaster message', async () => {
            jest.spyOn(toast, 'displayErrorMessage');

            const { findByLabelText, getByLabelText, findByTestId } = setup(
              {
                relationshipType: CompanyRelationshipType.CUSTOMER,
              },
              [
                dnbTypeaheadQueryMock({ searchTerm }),
                companyByDunsQueryMockSuccess({
                  duns: dnbTypeaheadSearchResult.duns,
                }),
                createCompanyRelationshipMockError({
                  inviteType: CompanyRelationshipType.CUSTOMER,
                  note: '',
                  supplierId: USER_COMPANY_ID,
                  customerId: companyByDuns.id,
                }),
              ]
            );

            fireEvent.change(await findByLabelText(companyInputLabel), {
              target: { value: searchTerm },
            });

            await selectEvent.select(
              getByLabelText(companyInputLabel),
              dnbTypeaheadSearchResult.primaryName
            );

            fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

            await waitFor(() => {
              expect(toast.displayErrorMessage).toHaveBeenCalledWith({
                title: 'Something went wrong',
                subtitle: 'Please try again',
              });
            });
          });

          describe('when an approved connection already exists with the company', () => {
            it('should display company input error message', async () => {
              const {
                findByLabelText,
                getByLabelText,
                findByTestId,
                getByTestId,
              } = setup(
                {
                  relationshipType: CompanyRelationshipType.CUSTOMER,
                },
                [
                  dnbTypeaheadQueryMock({ searchTerm }),
                  companyByDunsQueryMockSuccess({
                    duns: dnbTypeaheadSearchResult.duns,
                  }),
                  createCompanyRelationshipMockError(
                    {
                      inviteType: CompanyRelationshipType.CUSTOMER,
                      note: '',
                      supplierId: USER_COMPANY_ID,
                      customerId: companyByDuns.id,
                    },
                    COMPANY_RELATIONSHIP_CONNECTED_ERROR
                  ),
                ]
              );

              fireEvent.change(await findByLabelText(companyInputLabel), {
                target: { value: searchTerm },
              });

              await selectEvent.select(
                getByLabelText(companyInputLabel),
                dnbTypeaheadSearchResult.primaryName
              );

              fireEvent.click(
                await findByTestId(selectors.inviteCompanySubmit)
              );

              await waitFor(() => {
                expect(
                  getByTestId(selectors.companyInputError)
                ).toHaveTextContent(
                  'You are already connected with example Enterprises'
                );
              });
            });
          });

          describe('when a rejected connection already exists with the company', () => {
            it('should display company input error message', async () => {
              const {
                findByLabelText,
                getByLabelText,
                findByTestId,
                getByTestId,
              } = setup(
                {
                  relationshipType: CompanyRelationshipType.CUSTOMER,
                },
                [
                  dnbTypeaheadQueryMock({ searchTerm }),
                  companyByDunsQueryMockSuccess({
                    duns: dnbTypeaheadSearchResult.duns,
                  }),
                  createCompanyRelationshipMockError(
                    {
                      inviteType: CompanyRelationshipType.CUSTOMER,
                      note: '',
                      supplierId: USER_COMPANY_ID,
                      customerId: companyByDuns.id,
                    },
                    COMPANY_RELATIONSHIP_REJECTED_ERROR
                  ),
                ]
              );

              fireEvent.change(await findByLabelText(companyInputLabel), {
                target: { value: searchTerm },
              });

              await selectEvent.select(
                getByLabelText(companyInputLabel),
                dnbTypeaheadSearchResult.primaryName
              );

              fireEvent.click(
                await findByTestId(selectors.inviteCompanySubmit)
              );

              await waitFor(() => {
                expect(
                  getByTestId(selectors.companyInputError)
                ).toHaveTextContent(
                  'Your invitation has previously been declined by this company. Close the module, navigate to "STATUS" in the list and press "Re-send".'
                );
              });
            });
          });

          describe('when an awaiting approval connection already exists with the company', () => {
            it('should display company input error message', async () => {
              const {
                findByLabelText,
                getByLabelText,
                findByTestId,
                getByTestId,
              } = setup(
                {
                  relationshipType: CompanyRelationshipType.CUSTOMER,
                },
                [
                  dnbTypeaheadQueryMock({ searchTerm }),
                  companyByDunsQueryMockSuccess({
                    duns: dnbTypeaheadSearchResult.duns,
                  }),
                  createCompanyRelationshipMockError(
                    {
                      inviteType: CompanyRelationshipType.CUSTOMER,
                      note: '',
                      supplierId: USER_COMPANY_ID,
                      customerId: companyByDuns.id,
                    },
                    COMPANY_RELATIONSHIP_PENDING_ERROR
                  ),
                ]
              );

              fireEvent.change(await findByLabelText(companyInputLabel), {
                target: { value: searchTerm },
              });

              await selectEvent.select(
                getByLabelText(companyInputLabel),
                dnbTypeaheadSearchResult.primaryName
              );

              fireEvent.click(
                await findByTestId(selectors.inviteCompanySubmit)
              );

              await waitFor(() => {
                expect(
                  getByTestId(selectors.companyInputError)
                ).toHaveTextContent(
                  'An invitation has already been sent to this this company'
                );
              });
            });
          });
        });

        describe('when selected company has status of INVITATION_DECLINED', () => {
          const setupAndSelectCompany = async (mocks: any = []) => {
            const getters = setup(
              {
                relationshipType: CompanyRelationshipType.CUSTOMER,
              },
              [
                dnbTypeaheadQueryMock({ searchTerm }),
                companyByDunsQueryMockSuccess(
                  {
                    duns: dnbTypeaheadSearchResult.duns,
                  },
                  { status: CompanyStatus.INVITATION_DECLINED }
                ),
                ...mocks,
              ]
            );

            fireEvent.change(await getters.findByLabelText(companyInputLabel), {
              target: { value: searchTerm },
            });

            await selectEvent.select(
              getters.getByLabelText(companyInputLabel),
              dnbTypeaheadSearchResult.primaryName
            );

            return getters;
          };
          it('should display user detail inputs', async () => {
            const { getByTestId } = await setupAndSelectCompany();

            await waitFor(() => {
              expect(
                getByTestId(`${selectors.contactEmail}-input`)
              ).toBeInTheDocument();
              expect(
                getByTestId(`${selectors.contactFirstName}-input`)
              ).toBeInTheDocument();
              expect(
                getByTestId(`${selectors.contactLastName}-input`)
              ).toBeInTheDocument();
            });
          });

          describe('when the form is successfully submitted', () => {
            it('should show a success toaster', async () => {
              jest.spyOn(toast, 'displaySuccessMessage');

              const inviteMock = getInviteAndConnectSuccessMock({
                companyDuns: dnbTypeaheadSearchResult.duns,
                note: '',
              });
              const inviteInput = inviteMock.request.variables.input;

              const { findByTestId } = await setupAndSelectCompany([
                inviteMock,
              ]);

              fireEvent.change(
                await findByTestId(`${selectors.contactFirstName}-input`),
                { target: { value: inviteInput.firstName } }
              );
              fireEvent.change(
                await findByTestId(`${selectors.contactLastName}-input`),
                { target: { value: inviteInput.lastName } }
              );
              fireEvent.change(
                await findByTestId(`${selectors.contactEmail}-input`),
                { target: { value: inviteInput.email } }
              );

              fireEvent.click(
                await findByTestId(selectors.inviteCompanySubmit)
              );

              await waitFor(() => {
                expect(toast.displaySuccessMessage).toHaveBeenCalledWith({
                  title: 'Invitation successfully sent',
                  subtitle:
                    "You'll receive an email when your invitation is accepted",
                });
              });
            });
          });

          describe('when the form is submission fails', () => {
            it('should show a error toaster', async () => {
              jest.spyOn(toast, 'displayErrorMessage');

              const inviteMock = getInviteAndConnectErrorMock({
                companyDuns: dnbTypeaheadSearchResult.duns,
                note: '',
              });
              const inviteInput = inviteMock.request.variables.input;

              const { findByTestId } = await setupAndSelectCompany([
                inviteMock,
              ]);

              fireEvent.change(
                await findByTestId(`${selectors.contactFirstName}-input`),
                { target: { value: inviteInput.firstName } }
              );
              fireEvent.change(
                await findByTestId(`${selectors.contactLastName}-input`),
                { target: { value: inviteInput.lastName } }
              );
              fireEvent.change(
                await findByTestId(`${selectors.contactEmail}-input`),
                { target: { value: inviteInput.email } }
              );

              fireEvent.click(
                await findByTestId(selectors.inviteCompanySubmit)
              );

              await waitFor(() => {
                expect(toast.displayErrorMessage).toHaveBeenCalledWith({
                  title: 'Something went wrong',
                  subtitle: 'Please try again',
                });
              });
            });
          });
        });
      });
    });

    describe('when user wants to invite a supplier', () => {
      it('should display "Invite supplier" title', async () => {
        const { findByText } = setup({
          relationshipType: CompanyRelationshipType.CUSTOMER,
        });
        expect(await findByText('Invite customer')).toBeInTheDocument();
      });

      describe('when the form is successfully submitted', () => {
        it('should display a success toaster message', async () => {
          jest.spyOn(toast, 'displaySuccessMessage');

          const { findByLabelText, getByLabelText, findByTestId } = setup(
            {
              relationshipType: CompanyRelationshipType.SUPPLIER,
            },
            [
              dnbTypeaheadQueryMock({ searchTerm }),
              companyByDunsQueryMockSuccess({
                duns: dnbTypeaheadSearchResult.duns,
              }),
              createCompanyRelationshipMock({
                inviteType: CompanyRelationshipType.SUPPLIER,
                note: '',
                supplierId: companyByDuns.id,
                customerId: USER_COMPANY_ID,
              }),
            ]
          );

          fireEvent.change(await findByLabelText(companyInputLabel), {
            target: { value: searchTerm },
          });

          await selectEvent.select(
            getByLabelText(companyInputLabel),
            dnbTypeaheadSearchResult.primaryName
          );

          fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

          await waitFor(() => {
            expect(toast.displaySuccessMessage).toHaveBeenCalledWith({
              title: 'Invitation successfully sent',
              subtitle:
                "You'll receive an email when your invitation is accepted",
            });
          });
        });
      });

      describe('when the form is unsuccessfully submitted', () => {
        it('should display a failure toaster message', async () => {
          jest.spyOn(toast, 'displayErrorMessage');

          const { findByLabelText, getByLabelText, findByTestId } = setup(
            {
              relationshipType: CompanyRelationshipType.CUSTOMER,
            },
            [
              dnbTypeaheadQueryMock({ searchTerm }),
              companyByDunsQueryMockSuccess({
                duns: dnbTypeaheadSearchResult.duns,
              }),
              createCompanyRelationshipMockError({
                inviteType: CompanyRelationshipType.CUSTOMER,
                note: '',
                supplierId: USER_COMPANY_ID,
                customerId: companyByDuns.id,
              }),
            ]
          );

          fireEvent.change(await findByLabelText(companyInputLabel), {
            target: { value: searchTerm },
          });

          await selectEvent.select(
            getByLabelText(companyInputLabel),
            dnbTypeaheadSearchResult.primaryName
          );

          fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

          await waitFor(() => {
            expect(toast.displayErrorMessage).toHaveBeenCalledWith({
              title: 'Something went wrong',
              subtitle: 'Please try again',
            });
          });
        });

        describe('when an approved connection already exists with the company', () => {
          it('should display company input error message', async () => {
            const {
              findByLabelText,
              getByLabelText,
              findByTestId,
              getByTestId,
            } = setup(
              {
                relationshipType: CompanyRelationshipType.CUSTOMER,
              },
              [
                dnbTypeaheadQueryMock({ searchTerm }),
                companyByDunsQueryMockSuccess({
                  duns: dnbTypeaheadSearchResult.duns,
                }),
                createCompanyRelationshipMockError(
                  {
                    inviteType: CompanyRelationshipType.CUSTOMER,
                    note: '',
                    supplierId: USER_COMPANY_ID,
                    customerId: companyByDuns.id,
                  },
                  COMPANY_RELATIONSHIP_CONNECTED_ERROR
                ),
              ]
            );

            fireEvent.change(await findByLabelText(companyInputLabel), {
              target: { value: searchTerm },
            });

            await selectEvent.select(
              getByLabelText(companyInputLabel),
              dnbTypeaheadSearchResult.primaryName
            );

            fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

            await waitFor(() => {
              expect(
                getByTestId(selectors.companyInputError)
              ).toHaveTextContent(
                'You are already connected with example Enterprises'
              );
            });
          });
        });

        describe('when a rejected connection already exists with the company', () => {
          it('should display company input error message', async () => {
            const {
              findByLabelText,
              getByLabelText,
              findByTestId,
              getByTestId,
            } = setup(
              {
                relationshipType: CompanyRelationshipType.CUSTOMER,
              },
              [
                dnbTypeaheadQueryMock({ searchTerm }),
                companyByDunsQueryMockSuccess({
                  duns: dnbTypeaheadSearchResult.duns,
                }),
                createCompanyRelationshipMockError(
                  {
                    inviteType: CompanyRelationshipType.CUSTOMER,
                    note: '',
                    supplierId: USER_COMPANY_ID,
                    customerId: companyByDuns.id,
                  },
                  COMPANY_RELATIONSHIP_REJECTED_ERROR
                ),
              ]
            );

            fireEvent.change(await findByLabelText(companyInputLabel), {
              target: { value: searchTerm },
            });

            await selectEvent.select(
              getByLabelText(companyInputLabel),
              dnbTypeaheadSearchResult.primaryName
            );

            fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

            await waitFor(() => {
              expect(
                getByTestId(selectors.companyInputError)
              ).toHaveTextContent(
                'Your invitation has previously been declined by this company. Close the module, navigate to "STATUS" in the list and press "Re-send".'
              );
            });
          });
        });

        describe('when an awaiting approval connection already exists with the company', () => {
          it('should display company input error message', async () => {
            const {
              findByLabelText,
              getByLabelText,
              findByTestId,
              getByTestId,
            } = setup(
              {
                relationshipType: CompanyRelationshipType.CUSTOMER,
              },
              [
                dnbTypeaheadQueryMock({ searchTerm }),
                companyByDunsQueryMockSuccess({
                  duns: dnbTypeaheadSearchResult.duns,
                }),
                createCompanyRelationshipMockError(
                  {
                    inviteType: CompanyRelationshipType.CUSTOMER,
                    note: '',
                    supplierId: USER_COMPANY_ID,
                    customerId: companyByDuns.id,
                  },
                  COMPANY_RELATIONSHIP_PENDING_ERROR
                ),
              ]
            );

            fireEvent.change(await findByLabelText(companyInputLabel), {
              target: { value: searchTerm },
            });

            await selectEvent.select(
              getByLabelText(companyInputLabel),
              dnbTypeaheadSearchResult.primaryName
            );

            fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

            await waitFor(() => {
              expect(
                getByTestId(selectors.companyInputError)
              ).toHaveTextContent(
                'An invitation has already been sent to this this company'
              );
            });
          });
        });
      });

      describe('when selected company has status of INVITATION_DECLINED', () => {
        const setupAndSelectCompany = async (mocks: any = []) => {
          const getters = setup(
            {
              relationshipType: CompanyRelationshipType.SUPPLIER,
            },
            [
              dnbTypeaheadQueryMock({ searchTerm }),
              companyByDunsQueryMockSuccess(
                {
                  duns: dnbTypeaheadSearchResult.duns,
                },
                { status: CompanyStatus.INVITATION_DECLINED }
              ),
              ...mocks,
            ]
          );

          fireEvent.change(await getters.findByLabelText(companyInputLabel), {
            target: { value: searchTerm },
          });

          await selectEvent.select(
            getters.getByLabelText(companyInputLabel),
            dnbTypeaheadSearchResult.primaryName
          );

          return getters;
        };
        it('should display user detail inputs', async () => {
          const { getByTestId } = await setupAndSelectCompany();

          await waitFor(() => {
            expect(
              getByTestId(`${selectors.contactEmail}-input`)
            ).toBeInTheDocument();
            expect(
              getByTestId(`${selectors.contactFirstName}-input`)
            ).toBeInTheDocument();
            expect(
              getByTestId(`${selectors.contactLastName}-input`)
            ).toBeInTheDocument();
          });
        });

        describe('when the form is successfully submitted', () => {
          it('should show a success toaster', async () => {
            jest.spyOn(toast, 'displaySuccessMessage');

            const inviteMock = getInviteAndConnectSuccessMock({
              companyDuns: dnbTypeaheadSearchResult.duns,
              note: '',
              inviteType: CompanyRelationshipType.SUPPLIER,
            });
            const inviteInput = inviteMock.request.variables.input;

            const { findByTestId } = await setupAndSelectCompany([inviteMock]);

            fireEvent.change(
              await findByTestId(`${selectors.contactFirstName}-input`),
              { target: { value: inviteInput.firstName } }
            );
            fireEvent.change(
              await findByTestId(`${selectors.contactLastName}-input`),
              { target: { value: inviteInput.lastName } }
            );
            fireEvent.change(
              await findByTestId(`${selectors.contactEmail}-input`),
              { target: { value: inviteInput.email } }
            );

            fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

            await waitFor(() => {
              expect(toast.displaySuccessMessage).toHaveBeenCalledWith({
                title: 'Invitation successfully sent',
                subtitle:
                  "You'll receive an email when your invitation is accepted",
              });
            });
          });
        });

        describe('when the form is submission fails', () => {
          it('should show a error toaster', async () => {
            jest.spyOn(toast, 'displayErrorMessage');

            const inviteMock = getInviteAndConnectErrorMock({
              companyDuns: dnbTypeaheadSearchResult.duns,
              inviteType: CompanyRelationshipType.SUPPLIER,
              note: '',
            });
            const inviteInput = inviteMock.request.variables.input;

            const { findByTestId } = await setupAndSelectCompany([inviteMock]);

            fireEvent.change(
              await findByTestId(`${selectors.contactFirstName}-input`),
              { target: { value: inviteInput.firstName } }
            );
            fireEvent.change(
              await findByTestId(`${selectors.contactLastName}-input`),
              { target: { value: inviteInput.lastName } }
            );
            fireEvent.change(
              await findByTestId(`${selectors.contactEmail}-input`),
              { target: { value: inviteInput.email } }
            );

            fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

            await waitFor(() => {
              expect(toast.displayErrorMessage).toHaveBeenCalledWith({
                title: 'Something went wrong',
                subtitle: 'Please try again',
              });
            });
          });
        });
      });
    });

    describe('when user selects a company that does not exist', () => {
      const longName = Array(257).join('a');
      const shortName = 'a';

      const setupAndSelectCompany = async (
        overrides: Partial<IProps> = {},
        mocks: any[] = []
      ) => {
        const getters = setup(overrides, [
          dnbTypeaheadQueryMock({ searchTerm }),
          companyByDunsQueryMockFail({ duns: dnbTypeaheadSearchResult.duns }),
          ...mocks,
        ]);

        fireEvent.change(await getters.findByLabelText(companyInputLabel), {
          target: { value: searchTerm },
        });

        await selectEvent.select(
          getters.getByLabelText(companyInputLabel),
          dnbTypeaheadSearchResult.primaryName
        );

        return getters;
      };

      describe('when user enters an invalid email', () => {
        it('should show an input error message', async () => {
          const invalidEmail = 'tests@';
          const { findByTestId } = await setupAndSelectCompany();

          fireEvent.change(
            await findByTestId(`${selectors.contactEmail}-input`),
            { target: { value: invalidEmail } }
          );

          fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

          expect(
            await findByTestId(`${selectors.contactEmail}-error`)
          ).toHaveTextContent('Valid email address required');
        });
      });

      describe('when user enters firstName longer than 255 characters', () => {
        it('should show an input error message', async () => {
          const { findByTestId } = await setupAndSelectCompany();

          fireEvent.change(
            await findByTestId(`${selectors.contactFirstName}-input`),
            { target: { value: longName } }
          );

          fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

          expect(
            await findByTestId(`${selectors.contactFirstName}-error`)
          ).toHaveTextContent('Cannot be longer than 255 characters');
        });
      });

      describe('when user enters firstName shorter than 2 characters', () => {
        it('should show an input error message', async () => {
          const { findByTestId } = await setupAndSelectCompany();

          fireEvent.change(
            await findByTestId(`${selectors.contactFirstName}-input`),
            { target: { value: shortName } }
          );

          fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

          expect(
            await findByTestId(`${selectors.contactFirstName}-error`)
          ).toHaveTextContent('At least 2 characters are required');
        });
      });

      describe('when user enters lastName longer than 255 characters', () => {
        it('should show an input error message', async () => {
          const { findByTestId } = await setupAndSelectCompany();

          fireEvent.change(
            await findByTestId(`${selectors.contactLastName}-input`),
            { target: { value: longName } }
          );

          fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

          expect(
            await findByTestId(`${selectors.contactLastName}-error`)
          ).toHaveTextContent('Cannot be longer than 255 characters');
        });
      });

      describe('when user enters lastName shorter than 2 characters', () => {
        it('should show an input error message', async () => {
          const { findByTestId } = await setupAndSelectCompany();

          fireEvent.change(
            await findByTestId(`${selectors.contactLastName}-input`),
            { target: { value: shortName } }
          );

          fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

          expect(
            await findByTestId(`${selectors.contactLastName}-error`)
          ).toHaveTextContent('At least 2 characters are required');
        });
      });

      describe('when the form is successfully submitted', () => {
        it('should show a success toaster', async () => {
          jest.spyOn(toast, 'displaySuccessMessage');

          const inviteMock = getInviteAndConnectSuccessMock({
            companyDuns: dnbTypeaheadSearchResult.duns,
            note: '',
          });
          const inviteInput = inviteMock.request.variables.input;

          const { findByTestId } = await setupAndSelectCompany(
            {
              relationshipType: CompanyRelationshipType.CUSTOMER,
            },
            [inviteMock]
          );

          fireEvent.change(
            await findByTestId(`${selectors.contactFirstName}-input`),
            { target: { value: inviteInput.firstName } }
          );
          fireEvent.change(
            await findByTestId(`${selectors.contactLastName}-input`),
            { target: { value: inviteInput.lastName } }
          );
          fireEvent.change(
            await findByTestId(`${selectors.contactEmail}-input`),
            { target: { value: inviteInput.email } }
          );

          fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

          await waitFor(() => {
            expect(toast.displaySuccessMessage).toHaveBeenCalledWith({
              title: 'Invitation successfully sent',
              subtitle:
                "You'll receive an email when your invitation is accepted",
            });
          });
        });
      });

      describe('when the form is submission fails', () => {
        it('should show a error toaster', async () => {
          jest.spyOn(toast, 'displayErrorMessage');

          const inviteMock = getInviteAndConnectErrorMock({
            companyDuns: dnbTypeaheadSearchResult.duns,
            note: '',
          });
          const inviteInput = inviteMock.request.variables.input;

          const { findByTestId } = await setupAndSelectCompany(
            {
              relationshipType: CompanyRelationshipType.CUSTOMER,
            },
            [inviteMock]
          );

          fireEvent.change(
            await findByTestId(`${selectors.contactFirstName}-input`),
            { target: { value: inviteInput.firstName } }
          );
          fireEvent.change(
            await findByTestId(`${selectors.contactLastName}-input`),
            { target: { value: inviteInput.lastName } }
          );
          fireEvent.change(
            await findByTestId(`${selectors.contactEmail}-input`),
            { target: { value: inviteInput.email } }
          );

          fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

          await waitFor(() => {
            expect(toast.displayErrorMessage).toHaveBeenCalledWith({
              title: 'Something went wrong',
              subtitle: 'Please try again',
            });
          });
        });

        describe('when API returns user exists error', () => {
          it('should display email error message', async () => {
            const inviteMock = getInviteAndConnectErrorMock(
              {
                companyDuns: dnbTypeaheadSearchResult.duns,
                note: '',
              },
              [new GraphQLError(USER_EXISTS_ERROR)]
            );
            const inviteInput = inviteMock.request.variables.input;

            const { findByTestId, getByText } = await setupAndSelectCompany(
              {
                relationshipType: CompanyRelationshipType.CUSTOMER,
              },
              [inviteMock]
            );

            fireEvent.change(
              await findByTestId(`${selectors.contactFirstName}-input`),
              { target: { value: inviteInput.firstName } }
            );
            fireEvent.change(
              await findByTestId(`${selectors.contactLastName}-input`),
              { target: { value: inviteInput.lastName } }
            );
            fireEvent.change(
              await findByTestId(`${selectors.contactEmail}-input`),
              { target: { value: inviteInput.email } }
            );

            fireEvent.click(await findByTestId(selectors.inviteCompanySubmit));

            await waitFor(() =>
              expect(
                getByText(
                  'This email is already assigned to another company in our system. We advise you to confirm with your supplier their reporting corporate entity name and contact details.'
                )
              ).toBeInTheDocument()
            );
          });
        });
      });

      describe('when user then selects a company that does exist', () => {
        it('should hide user detail fields', async () => {
          const secondSearchTerm = 'Hello';
          const {
            findByTestId,
            findByLabelText,
            getByLabelText,
            queryByTestId,
          } = await setupAndSelectCompany(
            {
              relationshipType: CompanyRelationshipType.CUSTOMER,
            },
            [
              dnbTypeaheadQueryMock({ searchTerm: secondSearchTerm }, [
                dnbTypeaheadSearchResult2,
              ]),
              companyByDunsQueryMockSuccess({
                duns: dnbTypeaheadSearchResult2.duns,
              }),
            ]
          );

          expect(
            await findByTestId(`${selectors.contactFirstName}-input`)
          ).toBeInTheDocument();
          expect(
            await findByTestId(`${selectors.contactLastName}-input`)
          ).toBeInTheDocument();
          expect(
            await findByTestId(`${selectors.contactEmail}-input`)
          ).toBeInTheDocument();

          fireEvent.change(await findByLabelText(companyInputLabel), {
            target: { value: secondSearchTerm },
          });

          await selectEvent.select(
            getByLabelText(companyInputLabel),
            dnbTypeaheadSearchResult2.primaryName
          );

          await waitFor(() => {
            expect(
              queryByTestId(`${selectors.contactFirstName}-input`)
            ).toBeNull();
            expect(
              queryByTestId(`${selectors.contactLastName}-input`)
            ).toBeNull();
            expect(queryByTestId(`${selectors.contactEmail}-input`)).toBeNull();
          });
        });
      });
    });

    it('should render an info tooltip above the company field', async () => {
      const { findByTestId } = setup({
        relationshipType: CompanyRelationshipType.CUSTOMER,
      });
      expect(
        await findByTestId('invite-company-tooltip-title')
      ).toBeInTheDocument();
    });
  });
});
