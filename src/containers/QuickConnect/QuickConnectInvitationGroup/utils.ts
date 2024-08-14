import { CompanyRelationshipType } from 'types/globalTypes';

export const getColorTypeForGroupType = (
  groupType: CompanyRelationshipType
) => {
  switch (groupType) {
    case CompanyRelationshipType.CUSTOMER:
      return 'green';
    case CompanyRelationshipType.SUPPLIER:
      return 'blue';
    default:
      return 'blue';
  }
};
