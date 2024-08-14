import { SELECT_YEAR_STEP_QUERY } from 'containers/Modals/InexperiencedEmissionsWizard/Steps/SelectYear/queries';
import { INEXPERIENCED_BASELINE_CREATE } from 'containers/Modals/InexperiencedEmissionsWizard/Steps/Summary/mutations';
import { GraphQLError } from 'graphql';
import { CorporateEmissionType, Scope2Type } from 'types/globalTypes';
import { InexperiencedBaselineCreateVariables } from 'types/InexperiencedBaselineCreate';
import { SelectYearStepQuery_corporateEmissions as Emission } from 'types/SelectYearStepQuery';
import { USER_COMPANY_ID } from './constants';
import { getCorporateEmissionAccessMock } from './emissionAccess';
import { baselineMock } from './emissions';

export const getCreateBaselineMock = (
  overrides: Partial<InexperiencedBaselineCreateVariables['input']>
) => ({
  request: {
    query: INEXPERIENCED_BASELINE_CREATE,
    variables: {
      input: {
        year: 2020,
        companyId: '',
        scope1: 0,
        scope2: 0,
        type: CorporateEmissionType.BASELINE,
        scope2Type: Scope2Type.MARKET,
        scope3: null,
        offset: null,
        headCount: null,
        corporateEmissionAccess: getCorporateEmissionAccessMock(),
        ...overrides,
      },
    },
  },
  result: {
    data: { createEmission: baselineMock },
  },
});

export const getCreateBaselineErrorMock = (
  overrides: Partial<InexperiencedBaselineCreateVariables['input']>
) => ({
  request: {
    query: INEXPERIENCED_BASELINE_CREATE,
    variables: {
      input: {
        year: 2020,
        companyId: '',
        scope1: 0,
        scope2: 0,
        type: CorporateEmissionType.BASELINE,
        scope2Type: Scope2Type.MARKET,
        scope3: null,
        offset: null,
        headCount: null,
        corporateEmissionAccess: getCorporateEmissionAccessMock(),
        ...overrides,
      },
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Oopsy')],
  },
});

export const getSelectYearStepQueryMock = ({
  corporateEmissions = [],
}: {
  corporateEmissions?: Emission[];
}) => ({
  request: {
    query: SELECT_YEAR_STEP_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      corporateEmissions,
    },
  },
});

export const corporateBaselineEmission: Emission = {
  year: new Date().getFullYear() - 1,
  id: '1223344',
  type: CorporateEmissionType.BASELINE,
};

export const corporateActualEmission: Emission = {
  year: new Date().getFullYear() - 1,
  id: '4433221',
  type: CorporateEmissionType.ACTUAL,
};
