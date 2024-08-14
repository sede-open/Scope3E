import { useQuery, gql } from '@apollo/client';
import {
  SelectYearStepQuery,
  SelectYearStepQueryVariables,
} from 'types/SelectYearStepQuery';

export const SELECT_YEAR_STEP_QUERY = gql`
  query SelectYearStepQuery($companyId: UUID!) {
    corporateEmissions(companyId: $companyId) {
      id
      type
      year
    }
  }
`;

export const useSelectYearStepQuery = ({
  companyId,
}: SelectYearStepQueryVariables) =>
  useQuery<SelectYearStepQuery>(SELECT_YEAR_STEP_QUERY, {
    variables: {
      companyId,
    },
    fetchPolicy: 'cache-and-network',
  });
