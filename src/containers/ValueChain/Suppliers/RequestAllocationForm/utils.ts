import { CompanyRelationshipsQuery_companyRelationships } from 'types/CompanyRelationshipsQuery';

const sortRelationshipsBySupplierName = (
  relationship1: CompanyRelationshipsQuery_companyRelationships,
  relationship2: CompanyRelationshipsQuery_companyRelationships
) => relationship1.supplier.name.localeCompare(relationship2.supplier.name);

export const getCompanyOptions = (
  companyRelationships: CompanyRelationshipsQuery_companyRelationships[]
) =>
  companyRelationships
    .slice()
    .sort(sortRelationshipsBySupplierName)
    .map(({ supplier }) => ({
      label: supplier.name,
      value: supplier.id,
    }));
