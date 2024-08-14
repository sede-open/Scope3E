import { gql, useQuery } from '@apollo/client';
import { TaskListQuery, TaskListQueryVariables } from 'types/TaskListQuery';

export const TASK_LIST_QUERY = gql`
  query TaskListQuery($companyId: UUID!) {
    baseline(companyId: $companyId) {
      id
    }
    target(companyId: $companyId) {
      scope1And2Year
    }
    latestCorporateEmission(companyId: $companyId) {
      year
    }
    customerRelationships: companyRelationships(
      companyId: $companyId
      relationshipType: CUSTOMER
    ) {
      status
    }
    emissionAllocations(
      companyId: $companyId
      emissionAllocation: EMISSION_ALLOCATED_TO_CUSTOMERS
      statuses: [APPROVED, AWAITING_APPROVAL, REQUESTED]
    ) {
      id
      status
    }
    supplierRelationships: companyRelationships(
      companyId: $companyId
      relationshipType: SUPPLIER
    ) {
      status
    }
    companyPrivacy {
      allPlatform
      customerNetwork
      supplierNetwork
    }
  }
`;

export const useTaskListQuery = ({ companyId }: TaskListQueryVariables) =>
  useQuery<TaskListQuery>(TASK_LIST_QUERY, {
    variables: {
      companyId,
    },
    fetchPolicy: 'cache-and-network',
  });
