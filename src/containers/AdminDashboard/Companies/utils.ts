import { AdminCompaniesQuery_companies_data } from 'types/AdminCompaniesQuery';
import { CompanyStatus } from 'types/globalTypes';

export const getVettingInProgressCompanies = (
  companies: AdminCompaniesQuery_companies_data[]
) => companies.filter((e) => e.status === CompanyStatus.VETTING_IN_PROGRESS);

export const getVetoedCompanies = (
  companies: AdminCompaniesQuery_companies_data[]
) => companies.filter((e) => e.status === CompanyStatus.VETOED);

export const getPendingUserActivationCompanies = (
  companies: AdminCompaniesQuery_companies_data[]
) =>
  companies.filter((e) => e.status === CompanyStatus.PENDING_USER_ACTIVATION);

export const getActiveCompanies = (
  companies: AdminCompaniesQuery_companies_data[]
) => companies.filter((e) => e.status === CompanyStatus.ACTIVE);
