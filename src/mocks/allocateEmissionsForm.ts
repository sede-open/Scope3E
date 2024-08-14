import { ALLOCATE_EMISSIONS_FORM_QUERY } from 'containers/ValueChain/queries';
import { CompanyRelationshipsQuery_companyRelationships } from 'types/CompanyRelationshipsQuery';
import { CorporateEmissionsQuery_corporateEmissions } from 'types/CorporateEmissionsQuery';
import { CompanyRelationshipType, InviteStatus } from 'types/globalTypes';
import { USER_COMPANY_ID } from './constants';

export const userCompany = {
  id: USER_COMPANY_ID,
};

export const getAllocateEmissionsFormMock = ({
  corporateEmissions,
  relationships,
  relationshipType,
}: {
  corporateEmissions: CorporateEmissionsQuery_corporateEmissions[];
  relationships: CompanyRelationshipsQuery_companyRelationships[];
  relationshipType: CompanyRelationshipType;
}) => ({
  request: {
    query: ALLOCATE_EMISSIONS_FORM_QUERY,
    variables: {
      companyId: userCompany.id,
      relationshipType,
      status: InviteStatus.APPROVED,
    },
  },
  result: {
    data: {
      corporateEmissions,
      companyRelationships: relationships,
    },
  },
});
