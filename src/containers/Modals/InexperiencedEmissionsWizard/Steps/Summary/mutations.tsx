import { gql, useMutation, MutationHookOptions } from '@apollo/client';
import {
  InexperiencedBaselineCreate,
  InexperiencedBaselineCreateVariables,
} from 'types/InexperiencedBaselineCreate';

export const INEXPERIENCED_BASELINE_CREATE = gql`
  mutation InexperiencedBaselineCreate($input: CreateCorporateEmissionInput!) {
    createCorporateEmission(input: $input) {
      id
      type
      year
      scope1
      scope2
      scope2Type
      scope3
      offset
    }
  }
`;

export const useCreateInexperiencedBaseline = (
  options: MutationHookOptions<
    InexperiencedBaselineCreate,
    InexperiencedBaselineCreateVariables
  > = {}
) =>
  useMutation<
    InexperiencedBaselineCreate,
    InexperiencedBaselineCreateVariables
  >(INEXPERIENCED_BASELINE_CREATE, {
    ...options,
    refetchQueries: [
      'DashboardDataQuery',
      'ReductionRankQuery',
      'CompanyReductionRankQuery',
      'CarbonIntensityQuery',
      'SimulationDataQuery',
      'TaskListQuery',
    ],
  });
