import { UPDATE_EMISSION_MUTATION } from 'containers/Modals/CorporateEmissionForm/mutations';
import { DATA_PRIVACY_WIZARD_QUERY } from 'containers/PrivacyUpdateWizard/queries';
import { GraphQLError } from 'graphql';
import {
  DataPrivacyWizardQuery,
  DataPrivacyWizardQueryVariables,
} from 'types/DataPrivacyWizardQuery';
import { UpdateCorporateEmissionInput } from 'types/globalTypes';
import { UpdateCorporateEmission_updateCorporateEmission as UpdateCorporateEmissionResult } from 'types/UpdateCorporateEmission';

export const dataPrivacyWizardMock = (
  { companyId }: DataPrivacyWizardQueryVariables,
  companyDataPrivacyCompleteness?: DataPrivacyWizardQuery['companyDataPrivacyCompleteness'],
  corporateEmissions?: DataPrivacyWizardQuery['corporateEmissions'],
  targets?: DataPrivacyWizardQuery['targets'],
  errors?: GraphQLError[] | null
) => ({
  request: {
    query: DATA_PRIVACY_WIZARD_QUERY,
    variables: {
      companyId,
    },
  },
  result: {
    data:
      companyDataPrivacyCompleteness || corporateEmissions || targets
        ? {
            ...(companyDataPrivacyCompleteness
              ? { companyDataPrivacyCompleteness }
              : {}),
            ...(corporateEmissions ? { corporateEmissions } : {}),
            ...(targets ? { targets } : {}),
          }
        : undefined,
    errors,
  },
});

export const updateEmissionMutationMock = (
  input: UpdateCorporateEmissionInput,
  data?: UpdateCorporateEmissionResult,
  errors?: GraphQLError[]
) => ({
  request: {
    query: UPDATE_EMISSION_MUTATION,
    variables: {
      input,
    },
  },
  result: {
    ...(data ? { data: { updateEmission: data } } : {}),
    ...(errors
      ? { errors: [new GraphQLError('Emission exists for the year')] }
      : {}),
  },
});
