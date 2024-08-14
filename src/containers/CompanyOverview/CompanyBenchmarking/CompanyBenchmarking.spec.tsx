import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import { render, waitFor } from '@testing-library/react';
import { benchmarkCompanies, getCompanyBenchmarkMock } from 'mocks/benchmark';
import {
  CompaniesBenchmarkOrderBy,
  CompanyRelationshipType,
  InviteStatus,
} from 'types/globalTypes';
import * as queries from '../queries';
import companyOverviewNamespace from '../../../../locales/en/companyOverview.json';
import carbonIntensityNamespace from '../../../../locales/en/carbonIntensity.json';
import { CompanyBenchmarking } from '.';
import { headerNames } from './constants';
import * as selectors from './selectors';
import { getCompanySize } from '../utils';

const setup = (mocks: any = []) => {
  return render(
    <I18nProvider
      namespaces={{
        companyOverview: companyOverviewNamespace,
        carbonIntensity: carbonIntensityNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyBenchmarking companyId="company-id" />
      </MockedProvider>
    </I18nProvider>
  );
};

describe('CompanyBenchmarking', () => {
  describe('fetches the companies benchmark data', () => {
    it('calls useCompaniesBenchmarkLazyQuery and renders the benchmark table with header and rows', async () => {
      const spyUseCompaniesBenchmarkLazyQuery = jest.spyOn(
        queries,
        'useCompaniesBenchmarkLazyQuery'
      );
      const { getByTestId, getAllByTestId } = setup([
        getCompanyBenchmarkMock(benchmarkCompanies),
      ]);
      expect(spyUseCompaniesBenchmarkLazyQuery).toBeCalled();
      headerNames.forEach((headerName) => {
        expect(getByTestId(`header-${headerName}`)).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(getAllByTestId(`${selectors.benchmarkTable}-row`).length).toBe(
          benchmarkCompanies.length
        );
      });
    });
    it('renders the company names correctly', async () => {
      const { getByTestId } = setup([
        getCompanyBenchmarkMock(benchmarkCompanies),
      ]);

      await waitFor(() => {
        benchmarkCompanies.forEach((benchmark) => {
          const companyNameColumn = getByTestId(
            `rowcell-${benchmark.companyId}-${CompaniesBenchmarkOrderBy.COMPANY_NAME}`
          );
          const companyNameLink = companyNameColumn.querySelector('a');
          expect(companyNameLink).toHaveAttribute(
            'href',
            `/company/${benchmark.companyId}`
          );
          expect(companyNameColumn).toHaveTextContent(benchmark.companyName);
        });
      });
    });
    it('renders company size correctly', async () => {
      const { getByTestId } = setup([
        getCompanyBenchmarkMock(benchmarkCompanies),
      ]);

      await waitFor(() => {
        benchmarkCompanies.forEach((benchmark) => {
          const companySizeColumn = getByTestId(
            `rowcell-${benchmark.companyId}-${CompaniesBenchmarkOrderBy.ESTIMATED_NUMBER_OF_EMPLOYEES}`
          );

          const t = (key: string) => {
            return key
              ? companyOverviewNamespace.size[
                  key
                    .split('.')
                    .pop() as keyof typeof companyOverviewNamespace.size
                ]
              : '-';
          };

          expect(companySizeColumn).toHaveTextContent(
            getCompanySize(benchmark.estimatedNumberOfEmployees, t)
          );
        });
      });
    });
    it('renders baseline year correctly', async () => {
      const { getByTestId } = setup([
        getCompanyBenchmarkMock(benchmarkCompanies),
      ]);

      await waitFor(() => {
        benchmarkCompanies.forEach((benchmark) => {
          const baselineYearColumn = getByTestId(
            `rowcell-${benchmark.companyId}-${CompaniesBenchmarkOrderBy.BASELINE_YEAR}`
          );
          expect(baselineYearColumn).toHaveTextContent(
            benchmark.baselineYear?.toString() ??
              companyOverviewNamespace.notApplicable
          );
        });
      });
    });
    it('renders total and annual emission variance data correctly', async () => {
      const { getByTestId } = setup([
        getCompanyBenchmarkMock(benchmarkCompanies),
      ]);

      const getExpectedValue = (value: number | null) => {
        if (value === null) {
          return companyOverviewNamespace.notApplicable;
        }
        if (value === 0) {
          return '0';
        }
        return `${value}%`;
      };

      await waitFor(() => {
        benchmarkCompanies.forEach((benchmark) => {
          expect(
            getByTestId(
              `rowcell-${benchmark.companyId}-${CompaniesBenchmarkOrderBy.TOTAL_EMISSION_VARIANCE}`
            )
          ).toHaveTextContent(
            getExpectedValue(benchmark.totalEmissionVariance)
          );
          expect(
            getByTestId(
              `rowcell-${benchmark.companyId}-${CompaniesBenchmarkOrderBy.ANNUAL_EMISSION_VARIANCE}`
            )
          ).toHaveTextContent(
            getExpectedValue(benchmark.annualEmissionVariance)
          );
        });
      });
    });
    it('renders intensity ratio correctly', async () => {
      const { getByTestId } = setup([
        getCompanyBenchmarkMock(benchmarkCompanies),
      ]);

      await waitFor(() => {
        benchmarkCompanies.forEach((benchmark) => {
          expect(
            getByTestId(
              `rowcell-${benchmark.companyId}-${CompaniesBenchmarkOrderBy.CARBON_INTENSITY_RATIO}`
            )
          ).toHaveTextContent(
            benchmark.emissionToIntensityRatio !== null
              ? benchmark.emissionToIntensityRatio.toString()
              : companyOverviewNamespace.notApplicable
          );
        });
      });
    });
    it('renders network connection correctly', async () => {
      const { getByTestId } = setup([
        getCompanyBenchmarkMock(benchmarkCompanies),
      ]);

      const getTextContent = (
        relationshipType: CompanyRelationshipType | null,
        relationshipStatus: InviteStatus | null
      ) => {
        if (
          relationshipType === CompanyRelationshipType.SUPPLIER &&
          relationshipStatus === InviteStatus.APPROVED
        ) {
          return companyOverviewNamespace.yourSupplier;
        }
        if (
          relationshipType === CompanyRelationshipType.CUSTOMER &&
          relationshipStatus === InviteStatus.APPROVED
        ) {
          return companyOverviewNamespace.yourCustomer;
        }
        if (
          (relationshipType === CompanyRelationshipType.CUSTOMER &&
            relationshipStatus === InviteStatus.AWAITING_CUSTOMER_APPROVAL) ||
          (relationshipType === CompanyRelationshipType.SUPPLIER &&
            relationshipStatus === InviteStatus.AWAITING_SUPPLIER_APPROVAL)
        ) {
          return companyOverviewNamespace.invitationSent;
        }
        if (
          (relationshipType === CompanyRelationshipType.CUSTOMER &&
            relationshipStatus === InviteStatus.AWAITING_SUPPLIER_APPROVAL) ||
          (relationshipType === CompanyRelationshipType.SUPPLIER &&
            relationshipStatus === InviteStatus.AWAITING_CUSTOMER_APPROVAL)
        ) {
          return companyOverviewNamespace.invitationReceived;
        }

        return companyOverviewNamespace.invite;
      };

      await waitFor(() => {
        benchmarkCompanies.forEach((benchmark) => {
          expect(
            getByTestId(
              `rowcell-${benchmark.companyId}-${CompaniesBenchmarkOrderBy.COMPANY_RELATIONSHIP}`
            )
          ).toHaveTextContent(
            getTextContent(
              benchmark.companyRelationshipType,
              benchmark.companyRelationshipStatus
            )
          );
        });
      });
    });
  });
});
