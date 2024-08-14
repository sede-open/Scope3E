import { AdminCompaniesQuery_companies_data } from 'types/AdminCompaniesQuery';
import { CompanyStatus } from 'types/globalTypes';
import {
  getActiveCompanies,
  getPendingUserActivationCompanies,
  getVetoedCompanies,
  getVettingInProgressCompanies,
} from './utils';

describe('Companies utils', () => {
  describe('getVettingInProgressCompanies()', () => {
    it('should return only companies with status of VETTING_IN_PROGRESS', () => {
      const result = getVettingInProgressCompanies([
        { status: CompanyStatus.ACTIVE },
        { status: CompanyStatus.INVITATION_DECLINED },
        { status: CompanyStatus.PENDING_USER_ACTIVATION },
        { status: CompanyStatus.PENDING_USER_CONFIRMATION },
        { status: CompanyStatus.VETTING_IN_PROGRESS },
        { status: CompanyStatus.VETOED },
      ] as AdminCompaniesQuery_companies_data[]);

      expect(result).toHaveLength(1);
      expect(result[0].status).toEqual(CompanyStatus.VETTING_IN_PROGRESS);
    });
  });

  describe('getVetoedCompanies()', () => {
    it('should return only companies with status of VETOED', () => {
      const result = getVetoedCompanies([
        { status: CompanyStatus.ACTIVE },
        { status: CompanyStatus.INVITATION_DECLINED },
        { status: CompanyStatus.PENDING_USER_ACTIVATION },
        { status: CompanyStatus.PENDING_USER_CONFIRMATION },
        { status: CompanyStatus.VETTING_IN_PROGRESS },
        { status: CompanyStatus.VETOED },
      ] as AdminCompaniesQuery_companies_data[]);

      expect(result).toHaveLength(1);
      expect(result[0].status).toEqual(CompanyStatus.VETOED);
    });
  });

  describe('getActiveCompanies()', () => {
    it('should return companies with status of ACTIVE', () => {
      const result = getActiveCompanies([
        { status: CompanyStatus.ACTIVE },
        { status: CompanyStatus.INVITATION_DECLINED },
        { status: CompanyStatus.PENDING_USER_ACTIVATION },
        { status: CompanyStatus.PENDING_USER_CONFIRMATION },
        { status: CompanyStatus.VETTING_IN_PROGRESS },
        { status: CompanyStatus.VETOED },
      ] as AdminCompaniesQuery_companies_data[]);

      expect(result).toHaveLength(1);
    });
  });

  describe('getPendingUserActivationCompanies()', () => {
    it('should return companies with status of PENDING_USER_ACTIVATION', () => {
      const result = getPendingUserActivationCompanies([
        { status: CompanyStatus.ACTIVE },
        { status: CompanyStatus.INVITATION_DECLINED },
        { status: CompanyStatus.PENDING_USER_ACTIVATION },
        { status: CompanyStatus.PENDING_USER_CONFIRMATION },
        { status: CompanyStatus.VETTING_IN_PROGRESS },
        { status: CompanyStatus.VETOED },
      ] as AdminCompaniesQuery_companies_data[]);

      expect(result).toHaveLength(1);
    });
  });
});
