import { gql, useQuery } from '@apollo/client';
import {
  AllCompanyRelationshipsQuery,
  AllCompanyRelationshipsQueryVariables,
} from 'types/AllCompanyRelationshipsQuery';
import {
  CompanyRelationshipsQuery,
  CompanyRelationshipsQueryVariables,
} from 'types/CompanyRelationshipsQuery';
import {
  CompanyRelationshipWithSharedDataQuery,
  CompanyRelationshipWithSharedDataQueryVariables,
} from 'types/CompanyRelationshipWithSharedDataQuery';

export const COMPANY_RELATIONSHIPS_QUERY = gql`
  query CompanyRelationshipsQuery(
    $companyId: UUID!
    $relationshipType: CompanyRelationshipType!
  ) {
    companyRelationships(
      companyId: $companyId
      relationshipType: $relationshipType
    ) {
      id
      inviteType
      status
      customer {
        id
        name
        companySectors {
          sectorType
          sector {
            name
          }
        }
        location
        status
      }
      supplier {
        id
        name
        companySectors {
          sectorType
          sector {
            name
          }
        }
        location
        status
      }
      note
      createdAt
      updatedAt
    }
  }
`;

export const COMPANY_RELATIONSHIPS_WITH_SHARED_QUERY = gql`
  query CompanyRelationshipWithSharedDataQuery(
    $companyId: UUID!
    $relationshipType: CompanyRelationshipType!
  ) {
    companyRelationships(
      companyId: $companyId
      relationshipType: $relationshipType
    ) {
      id
      inviteType
      status
      customer {
        id
        name
        companySectors {
          sectorType
          sector {
            name
          }
        }
        location
        status
      }
      supplier {
        id
        name
        companySectors {
          sectorType
          sector {
            name
          }
        }
        location
        status
      }
      ambitionPrivacyStatus
      emissionPrivacyStatus
      supplierApprover {
        firstName
        lastName
        email
      }
      customerApprover {
        firstName
        lastName
        email
      }
      note
      createdAt
      updatedAt
    }
  }
`;

export const useCompanyRelationshipsQuery = ({
  companyId,
  relationshipType,
}: CompanyRelationshipsQueryVariables) =>
  useQuery<CompanyRelationshipsQuery>(COMPANY_RELATIONSHIPS_QUERY, {
    variables: {
      companyId,
      relationshipType,
    },
  });

export const useCompanyRelationshipsWithSharedDataQuery = ({
  companyId,
  relationshipType,
}: CompanyRelationshipWithSharedDataQueryVariables) =>
  useQuery<CompanyRelationshipWithSharedDataQuery>(
    COMPANY_RELATIONSHIPS_WITH_SHARED_QUERY,
    {
      variables: {
        companyId,
        relationshipType,
      },
    }
  );

export const ALL_COMPANY_RELATIONSHIPS_QUERY = gql`
  query AllCompanyRelationshipsQuery($companyId: UUID!) {
    customer: companyRelationships(
      companyId: $companyId
      relationshipType: CUSTOMER
    ) {
      id
      status
      inviteType
      customer {
        status
      }
      supplier {
        status
      }
    }
    supplier: companyRelationships(
      companyId: $companyId
      relationshipType: SUPPLIER
    ) {
      id
      status
      inviteType
      customer {
        status
      }
      supplier {
        status
      }
    }
  }
`;

export const useAllCompanyRelationshipsQuery = ({
  companyId,
}: AllCompanyRelationshipsQueryVariables) =>
  useQuery<AllCompanyRelationshipsQuery>(ALL_COMPANY_RELATIONSHIPS_QUERY, {
    variables: {
      companyId,
    },
  });
