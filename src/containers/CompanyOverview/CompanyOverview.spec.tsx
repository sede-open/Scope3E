import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import {
  defaultCompanyProfile,
  getCompanyOverviewQueryMock,
  companyOverviewQueryWithError,
} from 'mocks/companyOverview';
import I18nProvider from 'next-translate/I18nProvider';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { CompanyRelationshipType } from 'types/globalTypes';
import { emissionAllocationsAsCustomer } from 'mocks/emissionAllocations';
import companyOverviewNamespace from '../../../locales/en/companyOverview.json';
import { CompanyOverview, IProps } from '.';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');

describe('CompanyOverview', () => {
  const setup = (
    props: Partial<IProps> = {},
    mocks: MockedResponse[] = [getCompanyOverviewQueryMock()]
  ) => {
    return render(
      <I18nProvider
        namespaces={{
          companyOverview: companyOverviewNamespace,
        }}
      >
        <MockedProvider mocks={mocks} addTypename={false}>
          <CompanyOverview
            companyId={props.companyId || defaultCompanyProfile.id}
          />
        </MockedProvider>
      </I18nProvider>
    );
  };

  describe('Charts', () => {
    describe('when an error occurs', () => {
      it('shows unexpected error message', async () => {
        const errorMessage = 'An error occurred';
        const { queryByText, queryByTestId } = setup(
          {
            companyId: defaultCompanyProfile.id,
          },
          [companyOverviewQueryWithError(errorMessage)]
        );
        await waitFor(() => {
          expect(queryByText(errorMessage)).toBeInTheDocument();
          expect(
            queryByTestId(selectors.companyOverviewPage)
          ).not.toBeInTheDocument();
        });
      });
    });
    describe('not found redirection', () => {
      it('when the company profile is not active', () => {
        const { queryByTestId } = setup({}, [
          getCompanyOverviewQueryMock({
            isActive: false,
          }),
        ]);

        expect(
          queryByTestId(selectors.companyOverviewPage)
        ).not.toBeInTheDocument();
      });
    });
    describe('empty views', () => {
      describe('show invite and share view', () => {
        beforeEach(() => {
          (useAuthenticatedUser as jest.Mock).mockReturnValueOnce({
            company: {
              id: 'user-company-id',
            },
          });
        });
        it('when the user has no access, but the company allows the customers', async () => {
          const { queryByTestId } = setup(
            {
              companyId: defaultCompanyProfile.id,
            },
            [
              getCompanyOverviewQueryMock({
                isActive: true,
                isPublic: false,
                activeRelationship: null,
                companyPrivacy: {
                  allPlatform: false,
                  customerNetwork: true,
                  supplierNetwork: false,
                },
              }),
            ]
          );
          await waitFor(() => {
            expect(
              queryByTestId(selectors.emptyViewInvite)
            ).toBeInTheDocument();
            expect(
              queryByTestId(selectors.chartsContainer)
            ).not.toBeInTheDocument();
          });
        });
        it('when the user has no access, but the company allows the suppliers', async () => {
          const { queryByTestId } = setup(
            {
              companyId: defaultCompanyProfile.id,
            },
            [
              getCompanyOverviewQueryMock({
                isActive: true,
                isPublic: false,
                activeRelationship: null,
                companyPrivacy: {
                  allPlatform: false,
                  customerNetwork: false,
                  supplierNetwork: true,
                },
              }),
            ]
          );
          await waitFor(() => {
            expect(
              queryByTestId(selectors.emptyViewInvite)
            ).toBeInTheDocument();
            expect(
              queryByTestId(selectors.chartsContainer)
            ).not.toBeInTheDocument();
          });
        });
      });
    });
    describe('send data share request view', () => {
      it('when the company has all settings private', async () => {
        const { queryByTestId } = setup(
          {
            companyId: defaultCompanyProfile.id,
          },
          [
            getCompanyOverviewQueryMock({
              isActive: true,
              isPublic: false,
              activeRelationship: null,
              companyPrivacy: {
                allPlatform: false,
                customerNetwork: false,
                supplierNetwork: false,
              },
            }),
          ]
        );
        await waitFor(() => {
          expect(queryByTestId(selectors.emptyViewRequest)).toBeInTheDocument();
          expect(
            queryByTestId(selectors.chartsContainer)
          ).not.toBeInTheDocument();
        });
      });
      it('when the company has a relationship but still no access to the data', async () => {
        const { queryByTestId } = setup(
          {
            companyId: defaultCompanyProfile.id,
          },
          [
            getCompanyOverviewQueryMock({
              isActive: true,
              isPublic: false,
              activeRelationship: CompanyRelationshipType.CUSTOMER,
              companyPrivacy: {
                allPlatform: false,
                customerNetwork: true,
                supplierNetwork: false,
              },
            }),
          ]
        );
        await waitFor(() => {
          expect(queryByTestId(selectors.emptyViewRequest)).toBeInTheDocument();
          expect(
            queryByTestId(selectors.chartsContainer)
          ).not.toBeInTheDocument();
        });
      });
    });
    describe('shows charts', () => {
      it('when the user has access to the data', async () => {
        const { queryByTestId } = setup(
          {
            companyId: defaultCompanyProfile.id,
          },
          [
            getCompanyOverviewQueryMock({
              isPublic: true,
            }),
          ]
        );
        await waitFor(() => {
          expect(queryByTestId(selectors.chartsContainer)).toBeInTheDocument();
          expect(
            queryByTestId(selectors.emptyViewContainer)
          ).not.toBeInTheDocument();
        });
      });
      it('when the company has emission allocations to the user company', async () => {
        const { queryByTestId } = setup(
          {
            companyId: defaultCompanyProfile.id,
          },
          [
            getCompanyOverviewQueryMock(
              {
                isPublic: false,
              },
              undefined,
              undefined,
              emissionAllocationsAsCustomer as any
            ),
          ]
        );
        await waitFor(() => {
          expect(queryByTestId(selectors.chartsContainer)).toBeInTheDocument();
          expect(
            queryByTestId(selectors.emptyViewContainer)
          ).not.toBeInTheDocument();
        });
      });
    });
  });
});
