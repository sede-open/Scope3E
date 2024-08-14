import { CORPORATE_EMISSIONS_QUERY } from 'containers/ValueChain/queries';
import { CorporateEmissionType, Scope2Type } from 'types/globalTypes';
import { CorporateEmissionsQuery_corporateEmissions as CorporateEmission } from 'types/CorporateEmissionsQuery';
import { DashboardDataQuery_corporateEmissions as DashboardCorporateEmission } from 'types/DashboardDataQuery';

import { USER_COMPANY_ID } from './constants';

export const userCompany = {
  id: USER_COMPANY_ID,
};

export const getCorporateEmission = (
  overrides: Partial<DashboardCorporateEmission> = {}
) => ({
  year: new Date().getFullYear() - 1,
  id: '1223344',
  scope1: 1111,
  scope2: 2222,
  scope3: 3333,
  scope2Type: Scope2Type.MARKET,
  offset: 4444,
  examplePercentage: 100,
  headCount: 10,
  type: CorporateEmissionType.BASELINE,
  verificationFile: null,
  carbonIntensities: [],
  ...overrides,
});

export const getCorporateEmissions = (
  corporateEmissions: CorporateEmission[]
) => ({
  request: {
    query: CORPORATE_EMISSIONS_QUERY,
    variables: {
      companyId: userCompany.id,
    },
  },
  result: {
    data: {
      corporateEmissions,
    },
  },
});
