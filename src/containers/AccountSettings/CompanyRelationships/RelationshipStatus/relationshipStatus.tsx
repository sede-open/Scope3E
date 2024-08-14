import { Status } from 'components/Status';
import { CompanyRelationshipDisplayStatus } from '../types';

interface IProps {
  status: CompanyRelationshipDisplayStatus;
}

export const RelationshipStatus = ({ status }: IProps) => {
  return (
    <Status
      status={status}
      translationNamespace="companyRelationships"
      statusControls={null}
    />
  );
};
