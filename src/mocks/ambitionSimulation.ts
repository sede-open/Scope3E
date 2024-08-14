import {
  CorporateEmissionType,
  Scope2Type,
  TargetStrategyType,
} from 'types/globalTypes';
import { SIMULATION_DATA_QUERY } from 'containers/AmbitionSimulation/queries';
import { CREATE_EMISSION_MUTATION } from 'containers/Modals/CorporateEmissionForm/mutations';

import { USER_COMPANY_ID } from './constants';
import { getCorporateEmissionAccessMock } from './emissionAccess';

export const target = {
  scope1And2Year: 2040,
  scope1And2Reduction: 50,
  scope3Year: 2040,
  scope3Reduction: 50,
  strategy: TargetStrategyType.MODERATE,
  includeCarbonOffset: true,
};

export const baseline = {
  id: 'baseline_id',
  year: 2018,
  scope1: 500,
  scope2: 600,
  scope3: 700,
  scope2Type: Scope2Type.MARKET,
  offset: 0,
  verificationFile: null,
  carbonIntensities: [],
};

export const latestCorporateEmission = {
  id: 'emission_id',
  year: 2019,
  scope1: 400,
  scope2: 600,
  scope3: 700,
  scope2Type: Scope2Type.MARKET,
  offset: 0,
  verificationFile: null,
  carbonIntensities: [],
};

export const simulationDataQuery = {
  request: {
    query: SIMULATION_DATA_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      target,
      baseline,
      latestCorporateEmission,
    },
  },
};

export const simulationNegativeDataQuery = {
  request: {
    query: SIMULATION_DATA_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      target,
      baseline,
      latestCorporateEmission: {
        ...latestCorporateEmission,
        scope1: 100,
        scope2: 100,
        scope3: 100,
      },
    },
  },
};

export const simulationDataQueryNoTarget = {
  request: {
    query: SIMULATION_DATA_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      target: null,
      baseline,
      latestCorporateEmission,
    },
  },
};

export const simulationDataQueryNoData = {
  request: {
    query: SIMULATION_DATA_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      target: null,
      baseline: null,
      latestCorporateEmission: null,
    },
  },
};

const corporateEmissionAccess = getCorporateEmissionAccessMock();

export const createBaselineMock = {
  request: {
    query: CREATE_EMISSION_MUTATION,
    variables: {
      input: {
        year: baseline.year,
        scope1: baseline.scope1,
        scope2: baseline.scope2,
        scope3: null,
        scope2Type: Scope2Type.MARKET,
        offset: null,
        companyId: USER_COMPANY_ID,
        headCount: null,
        type: CorporateEmissionType.BASELINE,
        verificationFileId: null,
        carbonIntensities: [],
        corporateEmissionAccess,
      },
    },
  },
  result: {
    data: {
      createEmission: {
        id: 'new_emission_id',
        type: CorporateEmissionType.BASELINE,
        year: baseline.year,
        scope1: baseline.scope1,
        scope2: baseline.scope2,
        scope3: null,
        scope2Type: Scope2Type.MARKET,
        offset: null,
        headCount: null,
        carbonIntensities: [],
      },
    },
  },
};
