import { gql, useMutation, MutationHookOptions } from '@apollo/client';
import {
  DeleteCorporateEmission,
  DeleteCorporateEmissionVariables,
} from 'types/DeleteCorporateEmission';

export const DELETE_EMISSION_MUTATION = gql`
  mutation DeleteCorporateEmission($input: DeleteCorporateEmissionInput!) {
    deleteCorporateEmission(input: $input)
  }
`;

export const useDeleteCorporateEmission = (
  options: MutationHookOptions<
    DeleteCorporateEmission,
    DeleteCorporateEmissionVariables
  > = {}
) =>
  useMutation<DeleteCorporateEmission, DeleteCorporateEmissionVariables>(
    DELETE_EMISSION_MUTATION,
    {
      ...options,
      refetchQueries: [
        'DashboardDataQuery',
        'ReductionRankQuery',
        'CompanyReductionRankQuery',
        'CarbonIntensityQuery',
      ],
    }
  );
