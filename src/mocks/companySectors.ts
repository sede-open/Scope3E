import { UPDATE_COMPANY_SECTORS_MUTATION } from 'mutations/companySectors';
import { COMPANY_SECTORS_QUERY } from 'queries/userOnboarding';
import { CompanySectorsQuery_companySectors } from 'types/CompanySectorsQuery';
import { UpdateCompanySectorsInput } from 'types/globalTypes';

import { USER_COMPANY_ID } from './constants';

export const getCompanySectorsMock = (
  companySectors: CompanySectorsQuery_companySectors[]
) => ({
  request: {
    query: COMPANY_SECTORS_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      companySectors,
    },
  },
});

export const updateCompanySectorsMutationMock = (
  companySectorsInput: UpdateCompanySectorsInput
) => ({
  request: {
    query: UPDATE_COMPANY_SECTORS_MUTATION,
    variables: {
      companySectorsInput,
    },
  },
  result: {
    data: null,
  },
});
