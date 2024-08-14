import I18nProvider from 'next-translate/I18nProvider';
import { render } from '@testing-library/react';

import { AdminCompaniesQuery_companies_data as Company } from 'types/AdminCompaniesQuery';
import { companies } from 'mocks/adminDashboard';
import { CompanyStatus } from 'types/globalTypes';

import companiesAdminDashboardNamespace from '../../../../../locales/en/companiesAdminDashboard.json';
import { CompanyDisplayStatus } from './types';
import { getCompanyDisplayStatus, getCompanyStatus } from './utils';

describe('CompaniesTable utils', () => {
  describe('getCompanyDisplayStatus()', () => {
    it.each`
      companyStatus                            | expectedDisplayStatus
      ${CompanyStatus.VETTING_IN_PROGRESS}     | ${CompanyDisplayStatus.PENDING}
      ${CompanyStatus.VETOED}                  | ${CompanyDisplayStatus.VETOED}
      ${CompanyStatus.PENDING_USER_ACTIVATION} | ${CompanyDisplayStatus.PENDING_USER_ACTIVATION}
      ${CompanyStatus.ACTIVE}                  | ${CompanyDisplayStatus.ACTIVE}
    `(
      'when company status is $companyStatus, it should display $expectedDisplayStatus',
      ({
        companyStatus,
        expectedDisplayStatus,
      }: {
        companyStatus: CompanyStatus;
        expectedDisplayStatus: CompanyDisplayStatus;
      }) => {
        const result = getCompanyDisplayStatus(companyStatus);
        expect(result).toBe(expectedDisplayStatus);
      }
    );
  });

  describe('getCompanyStatus()', () => {
    const setup = (company: Company) =>
      render(
        <I18nProvider
          namespaces={{
            companiesAdminDashboard: companiesAdminDashboardNamespace,
          }}
        >
          <div>{getCompanyStatus(company)}</div>
        </I18nProvider>
      );

    describe('when company status is VETTING_IN_PROGRESS', () => {
      const pendingCompany = {
        ...companies[0],
        status: CompanyStatus.VETTING_IN_PROGRESS,
        updatedAt: 'Tue Oct 20 2021 11:34:42 GMT+0100 (British Summer Time)',
      };

      it('should display "Pending since" status with date', () => {
        const { getByText } = setup(pendingCompany);
        expect(getByText('Pending since 20 October 2021')).toBeInTheDocument();
      });
    });

    describe('when company status is ACTIVE', () => {
      const approvedCompany = {
        ...companies[0],
        status: CompanyStatus.ACTIVE,
      };

      it('should display "Active" status', () => {
        const { getByText } = setup(approvedCompany);
        expect(getByText('Active')).toBeInTheDocument();
      });
    });

    describe('when company status is PENDING_USER_ACTIVATION', () => {
      const approvedCompany = {
        ...companies[0],
        status: CompanyStatus.PENDING_USER_ACTIVATION,
      };

      it('should display "Pending user activation" status', () => {
        const { getByText } = setup(approvedCompany);
        expect(getByText('Pending user activation')).toBeInTheDocument();
      });
    });

    describe('when company status is VETOED', () => {
      const vetoedCompany = {
        ...companies[0],
        status: CompanyStatus.VETOED,
      };

      it('should display "Vetoed" status', () => {
        const { getByText } = setup(vetoedCompany);
        expect(getByText('Vetoed')).toBeInTheDocument();
      });
    });
  });
});
