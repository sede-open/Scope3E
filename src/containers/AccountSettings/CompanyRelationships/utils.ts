import { CompanyRelationshipsQuery_companyRelationships } from 'types/CompanyRelationshipsQuery';

interface IProps {
  relationship: CompanyRelationshipsQuery_companyRelationships;
  companyId: string;
}

export const getRelationshipCompany = ({ relationship, companyId }: IProps) => {
  const { customer, supplier } = relationship;
  return [customer, supplier].filter(({ id }) => id !== companyId)[0];
};
