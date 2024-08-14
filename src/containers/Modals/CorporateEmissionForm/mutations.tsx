import { gql, useMutation, MutationHookOptions } from '@apollo/client';
import {
  UpdateCorporateEmission,
  UpdateCorporateEmissionVariables,
} from 'types/UpdateCorporateEmission';
import {
  CreateCorporateEmission,
  CreateCorporateEmissionVariables,
} from 'types/CreateCorporateEmission';

export const CREATE_EMISSION_MUTATION = gql`
  mutation CreateCorporateEmission($input: CreateCorporateEmissionInput!) {
    createCorporateEmission(input: $input) {
      id
      type
      year
      scope1
      scope2
      scope2Type
      scope3
      offset
      examplePercentage
      headCount
      type
      carbonIntensities {
        intensityMetric
        intensityValue
      }
      corporateEmissionAccess {
        scope1And2
        scope3
        publicLink
        carbonOffsets
        carbonIntensity
      }
    }
  }
`;

export const useCreateCorporateEmission = (
  options: MutationHookOptions<
    CreateCorporateEmission,
    CreateCorporateEmissionVariables
  > = {}
) =>
  useMutation<CreateCorporateEmission, CreateCorporateEmissionVariables>(
    CREATE_EMISSION_MUTATION,
    {
      ...options,
      refetchQueries: [
        'DashboardDataQuery',
        'ReductionRankQuery',
        'CompanyReductionRankQuery',
        'CarbonIntensityQuery',
        'SimulationDataQuery',
        'CorporateEmissionsQuery',
        'TaskListQuery',
      ],
    }
  );

export const UPDATE_EMISSION_MUTATION = gql`
  mutation UpdateCorporateEmission($input: UpdateCorporateEmissionInput!) {
    updateCorporateEmission(input: $input) {
      id
      type
      year
      scope1
      scope2
      scope2Type
      scope3
      offset
      examplePercentage
      headCount
      carbonIntensities {
        intensityMetric
        intensityValue
      }
    }
  }
`;

export const useUpdateCorporateEmission = (
  options: MutationHookOptions<
    UpdateCorporateEmission,
    UpdateCorporateEmissionVariables
  > = {}
) =>
  useMutation<UpdateCorporateEmission, UpdateCorporateEmissionVariables>(
    UPDATE_EMISSION_MUTATION,
    {
      ...options,
      // as an actual emission may be deleted in the process of
      // updating the baseline, refetching the whole list
      refetchQueries: [
        'DashboardDataQuery',
        'ReductionRankQuery',
        'CompanyReductionRankQuery',
        'CarbonIntensityQuery',
        'SimulationDataQuery',
        'TaskListQuery',
      ],
    }
  );
