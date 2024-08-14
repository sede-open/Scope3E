import {
  CREATE_EMISSION_MUTATION,
  UPDATE_EMISSION_MUTATION,
} from 'containers/Modals/CorporateEmissionForm/mutations';
import { INEXPERIENCED_BASELINE_CREATE } from 'containers/Modals/InexperiencedEmissionsWizard/Steps/Summary/mutations';
import { GraphQLError } from 'graphql';
import {
  CorporateEmissionType,
  CreateCorporateEmissionInput,
  Scope2Type,
} from 'types/globalTypes';
import { USER_COMPANY_ID } from './constants';
import { getCorporateEmissionAccessMock } from './emissionAccess';

export const baselineMock = {
  year: new Date().getFullYear() - 1,
  companyId: USER_COMPANY_ID,
  id: '1223344',
  scope1: 1111,
  scope2: 2222,
  scope3: 3333,
  scope2Type: Scope2Type.MARKET,
  offset: 4444,
  examplePercentage: 100,
  headCount: null,
  type: CorporateEmissionType.BASELINE,
  verificationFileId: null,
  carbonIntensities: [],
};

export const inexperiencedBaselineMock = {
  year: new Date().getFullYear() - 1,
  companyId: USER_COMPANY_ID,
  id: '1223344',
  scope1: 2.615041,
  scope2: 0.067261,
  scope3: null,
  scope2Type: Scope2Type.LOCATION,
  offset: null,
  headCount: null,
  type: CorporateEmissionType.BASELINE,
  carbonIntensities: [],
};

export const verificationFileMock = {
  id: 'verificationFileMockId',
  originalFilename: 'some.pdf',
};

const corporateEmissionAccess = getCorporateEmissionAccessMock();

export const createBaselineMockFull = (
  inputOverrides: Partial<CreateCorporateEmissionInput> = {}
) => ({
  request: {
    query: CREATE_EMISSION_MUTATION,
    variables: {
      input: {
        year: baselineMock.year,
        companyId: baselineMock.companyId,
        scope1: baselineMock.scope1,
        scope2: baselineMock.scope2,
        scope3: baselineMock.scope3,
        scope2Type: baselineMock.scope2Type,
        offset: baselineMock.offset,
        headCount: baselineMock.headCount,
        type: CorporateEmissionType.BASELINE,
        verificationFileId: baselineMock.verificationFileId,
        carbonIntensities: [],
        corporateEmissionAccess,
        ...inputOverrides,
      },
    },
  },
  result: {
    data: { createEmission: baselineMock },
  },
});

export const createInexperiencedBaselineMockFull = {
  request: {
    query: INEXPERIENCED_BASELINE_CREATE,
    variables: {
      input: {
        year: inexperiencedBaselineMock.year,
        companyId: inexperiencedBaselineMock.companyId,
        scope1: inexperiencedBaselineMock.scope1,
        scope2: inexperiencedBaselineMock.scope2,
        scope3: inexperiencedBaselineMock.scope3,
        scope2Type: inexperiencedBaselineMock.scope2Type,
        offset: inexperiencedBaselineMock.offset,
        headCount: inexperiencedBaselineMock.headCount,
        type: CorporateEmissionType.BASELINE,
        corporateEmissionAccess,
      },
    },
  },
  result: {
    data: { createEmission: inexperiencedBaselineMock },
  },
};

export const createBaselineMockRequired = {
  request: {
    query: CREATE_EMISSION_MUTATION,
    variables: {
      input: {
        year: baselineMock.year,
        companyId: baselineMock.companyId,
        scope1: baselineMock.scope1,
        scope2: baselineMock.scope2,
        scope2Type: baselineMock.scope2Type,
        scope3: null,
        offset: null,
        headCount: null,
        type: CorporateEmissionType.BASELINE,
        verificationFileId: baselineMock.verificationFileId,
        carbonIntensities: [],
        corporateEmissionAccess,
      },
    },
  },
  result: {
    data: {
      createEmission: {
        ...baselineMock,
        scope3: null,
        offset: null,
        headCount: null,
      },
    },
  },
};

export const createBaselineMockError = {
  request: {
    query: CREATE_EMISSION_MUTATION,
    variables: {
      input: {
        year: baselineMock.year,
        companyId: baselineMock.companyId,
        scope1: baselineMock.scope1,
        scope2: baselineMock.scope2,
        scope3: null,
        scope2Type: baselineMock.scope2Type,
        offset: null,
        headCount: null,
        verificationFileId: baselineMock.verificationFileId,
        type: CorporateEmissionType.BASELINE,
        carbonIntensities: [],
        corporateEmissionAccess,
      },
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Baseline exists')],
  },
};

export const createActualMockFull = (
  inputOverrides: Partial<CreateCorporateEmissionInput> = {}
) => ({
  request: {
    query: CREATE_EMISSION_MUTATION,
    variables: {
      input: {
        year: baselineMock.year,
        companyId: baselineMock.companyId,
        scope1: baselineMock.scope1,
        scope2: baselineMock.scope2,
        scope3: baselineMock.scope3,
        scope2Type: baselineMock.scope2Type,
        offset: baselineMock.offset,
        headCount: baselineMock.headCount,
        type: CorporateEmissionType.ACTUAL,
        verificationFileId: baselineMock.verificationFileId,
        carbonIntensities: [],
        corporateEmissionAccess,
        ...inputOverrides,
      },
    },
  },
  result: {
    data: { createEmission: baselineMock, type: CorporateEmissionType.ACTUAL },
  },
});

export const createActualWithFileMock = {
  request: {
    query: CREATE_EMISSION_MUTATION,
    variables: {
      input: {
        year: baselineMock.year,
        companyId: baselineMock.companyId,
        scope1: baselineMock.scope1,
        scope2: baselineMock.scope2,
        scope3: null,
        scope2Type: Scope2Type.MARKET,
        offset: null,
        headCount: null,
        type: CorporateEmissionType.ACTUAL,
        verificationFileId: verificationFileMock.id,
        carbonIntensities: [],
        corporateEmissionAccess,
      },
    },
  },
  result: {
    data: { createEmission: baselineMock },
  },
};

export const createActualWithFileFailMock = {
  request: {
    query: CREATE_EMISSION_MUTATION,
    variables: {
      input: {
        year: baselineMock.year,
        companyId: baselineMock.companyId,
        scope1: baselineMock.scope1,
        scope2: baselineMock.scope2,
        scope3: null,
        scope2Type: Scope2Type.MARKET,
        offset: null,
        headCount: null,
        type: CorporateEmissionType.ACTUAL,
        verificationFileId: verificationFileMock.id,
        carbonIntensities: [],
        corporateEmissionAccess,
      },
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('Emission exists for the year')],
  },
};

export const updateEmissionWithFileMock = {
  request: {
    query: UPDATE_EMISSION_MUTATION,
    variables: {
      input: {
        id: baselineMock.id,
        year: baselineMock.year,
        scope1: baselineMock.scope1,
        scope2: baselineMock.scope2,
        scope3: baselineMock.scope3,
        scope2Type: baselineMock.scope2Type,
        offset: baselineMock.offset,
        headCount: baselineMock.headCount,
        type: baselineMock.type,
        verificationFileId: verificationFileMock.id,
        carbonIntensities: [],
        corporateEmissionAccess,
      },
    },
  },
  result: {
    data: { updateEmission: baselineMock },
  },
};

export const updateEmissionRemoveFileMock = {
  request: {
    query: UPDATE_EMISSION_MUTATION,
    variables: {
      input: {
        id: baselineMock.id,
        year: baselineMock.year,
        scope1: baselineMock.scope1,
        scope2: baselineMock.scope2,
        scope3: baselineMock.scope3,
        scope2Type: baselineMock.scope2Type,
        offset: baselineMock.offset,
        headCount: baselineMock.headCount,
        verificationFileId: null,
        type: baselineMock.type,
        carbonIntensities: [],
        corporateEmissionAccess,
      },
    },
  },
  result: {
    data: { updateEmission: baselineMock },
  },
};

export const updateBaselineMockFull = {
  request: {
    query: UPDATE_EMISSION_MUTATION,
    variables: {
      input: {
        id: baselineMock.id,
        year: baselineMock.year,
        scope1: baselineMock.scope1,
        scope2: baselineMock.scope2,
        scope3: baselineMock.scope3,
        scope2Type: Scope2Type.LOCATION,
        offset: baselineMock.offset,
        headCount: baselineMock.headCount,
        verificationFileId: baselineMock.verificationFileId,
        type: baselineMock.type,
        carbonIntensities: [],
        corporateEmissionAccess,
      },
    },
  },
  result: {
    data: { updateEmission: baselineMock },
  },
};
