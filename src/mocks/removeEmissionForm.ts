import { GraphQLError } from 'graphql';
import { CorporateEmissionType, Scope2Type } from 'types/globalTypes';
import { RemoveEmissionFormQuery_corporateEmissions as Emission } from 'types/RemoveEmissionFormQuery';
import { DELETE_EMISSION_MUTATION } from 'containers/Dashboard/mutations';
import { REMOVE_EMISSION_FORM_QUERY } from 'containers/Modals/RemoveEmissionForm/queries';

import { USER_COMPANY_ID } from './constants';

export const emissionId = 'emissionId';

export const baseEmission = {
  id: emissionId,
  type: CorporateEmissionType.ACTUAL,
  scope1: 0,
  scope2: 0,
  scope3: 0,
  scope2Type: Scope2Type.MARKET,
  offset: 0,
  examplePercentage: 0,
  headCount: 0,
  year: 2017,
  verificationFile: null,
};

export const getEmission = (
  year: number,
  emissionType: CorporateEmissionType
): Emission => ({
  id: emissionId,
  year,
  scope1: 1000,
  scope2: 1000,
  scope3: 1000,
  offset: null,
  headCount: null,
  scope2Type: Scope2Type.MARKET,
  examplePercentage: null,
  type: emissionType,
  verificationFile: null,
  carbonIntensities: [],
});

export const getRemoveEmissionFormQueryMock = (emissions: Emission[]) => ({
  request: {
    query: REMOVE_EMISSION_FORM_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      corporateEmissions: emissions,
    },
  },
});

export const deleteSuccessMock = {
  request: {
    query: DELETE_EMISSION_MUTATION,
    variables: {
      input: {
        id: emissionId,
      },
    },
  },
  result: {
    data: { updateteEmission: emissionId },
  },
};

export const MOCK_ERROR_MESSAGE = 'error';

export const deleteMockError = {
  request: {
    query: DELETE_EMISSION_MUTATION,
    variables: {
      input: {
        id: emissionId,
      },
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('error')],
  },
};
