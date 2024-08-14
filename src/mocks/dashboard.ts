import {
  CARBON_INTENSITY_QUERY,
  COMPANY_REDUCTION_RANK_QUERY,
  DASHBOARD_DATA_QUERY,
  REDUCTION_RANK_QUERY,
} from 'containers/Dashboard/queries';
import { ACTIVATE_USER_AND_COMPANY_MUTATION } from 'mutations/activation';
import {
  CorporateEmissionType,
  Scope2Type,
  TargetStrategyType,
  UserStatus,
} from 'types/globalTypes';
import { USER_COMPANY_ID } from './constants';

export const currentYear = 2020;
export const lastYear = currentYear - 1;
export const allRankQuery = {
  request: {
    query: REDUCTION_RANK_QUERY,
    variables: {
      year: lastYear,
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: { corporateEmissionRanks: [] },
  },
};
export const carbonIntensityQuery = {
  request: {
    query: CARBON_INTENSITY_QUERY,
    variables: {
      years: [2016, 2017, 2018, 2019],
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: { corporateCarbonIntensityComparisons: [] },
  },
};

export const companyRankQuery = {
  request: {
    query: COMPANY_REDUCTION_RANK_QUERY,
    variables: {
      year: lastYear,
      previousYear: lastYear - 1,
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: { currentRank: null, previousRank: null },
  },
};

export const noEmissionsQueryMock = {
  request: {
    query: DASHBOARD_DATA_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      corporateEmissions: [],
      target: null,
      companyDataPrivacyCompleteness: {
        isComplete: true,
      },
    },
  },
};

export const emissionsQueryMock = (resultOverrides = {}) => ({
  request: {
    query: DASHBOARD_DATA_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      corporateEmissions: [
        {
          id: 'emissionId',
          type: CorporateEmissionType.BASELINE,
          scope1: 1223,
          scope2: 1333,
          scope3: 1256,
          scope2Type: Scope2Type.MARKET,
          offset: 1000,
          examplePercentage: 5,
          headCount: 10,
          year: 2017,
          verificationFile: null,
          carbonIntensities: [],
        },
        {
          id: 'emissionId2',
          type: CorporateEmissionType.ACTUAL,
          scope1: 1223,
          scope2: 1333,
          scope3: 1256,
          scope2Type: Scope2Type.MARKET,
          offset: 1000,
          examplePercentage: 5,
          headCount: 10,
          year: 2018,
          verificationFile: null,
          carbonIntensities: [],
        },
      ],
      target: {
        scope1And2Year: 2016,
        scope1And2Reduction: 60,
        scope3Year: 2016,
        scope3Reduction: 60,
        strategy: TargetStrategyType.AGGRESSIVE,
        includeCarbonOffset: false,
      },
      companyDataPrivacyCompleteness: {
        isComplete: true,
      },
      ...resultOverrides,
    },
  },
});

export const multipleEmissionsQueryMock = {
  request: {
    query: DASHBOARD_DATA_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      corporateEmissions: [
        {
          id: 'emissionId',
          type: CorporateEmissionType.BASELINE,
          scope1: 1223,
          scope2: 1333,
          scope3: 1256,
          scope2Type: Scope2Type.MARKET,
          offset: 1000,
          examplePercentage: 5,
          headCount: 10,
          year: 2017,
          verificationFile: null,
          carbonIntensities: [],
        },
        {
          id: 'emissionId2',
          type: CorporateEmissionType.ACTUAL,
          scope1: 1223,
          scope2: 1333,
          scope3: 1256,
          scope2Type: Scope2Type.MARKET,
          offset: 1000,
          examplePercentage: 5,
          headCount: 10,
          year: 2018,
          verificationFile: null,
          carbonIntensities: [],
        },
        {
          id: 'emissionId3',
          type: CorporateEmissionType.ACTUAL,
          scope1: 1223,
          scope2: 1333,
          scope3: 1256,
          scope2Type: Scope2Type.MARKET,
          offset: 1000,
          examplePercentage: 5,
          headCount: 10,
          year: 2019,
          verificationFile: null,
          carbonIntensities: [],
        },
      ],
      target: {
        scope1And2Year: 2016,
        scope1And2Reduction: 60,
        scope3Year: 2016,
        scope3Reduction: 60,
        strategy: TargetStrategyType.AGGRESSIVE,
        includeCarbonOffset: false,
      },
      companyDataPrivacyCompleteness: {
        isComplete: true,
      },
    },
  },
};

export const getDashboardQueryNoTarget = (scope3: number | null = 1256) => ({
  request: {
    query: DASHBOARD_DATA_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      corporateEmissions: [
        {
          id: 'emissionId',
          type: CorporateEmissionType.BASELINE,
          scope1: 1223,
          scope2: 1333,
          scope3,
          scope2Type: Scope2Type.MARKET,
          offset: 1000,
          examplePercentage: 5,
          headCount: 10,
          year: 2018,
          verificationFile: null,
          carbonIntensities: [],
        },
      ],
      target: null,
      companyDataPrivacyCompleteness: {
        isComplete: true,
      },
    },
  },
});

export const activateUserAndCompanyMutationMock = {
  request: {
    query: ACTIVATE_USER_AND_COMPANY_MUTATION,
  },
  newData: jest.fn(() => ({
    data: {
      activateUserAndCompany: {
        id: 'USER_ID',
        status: UserStatus.ACTIVE,
      },
    },
  })),
};
