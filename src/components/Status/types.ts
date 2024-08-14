import { CompanyRelationshipDisplayStatus } from 'containers/AccountSettings/CompanyRelationships/types';
import { CompanyDisplayStatus } from 'containers/AdminDashboard/Companies/CompaniesTable/types';
import { ReactChild } from 'react';

import { EmissionAllocationStatus, UserStatus } from 'types/globalTypes';

export type StatusType =
  | EmissionAllocationStatus
  | UserStatus
  | CompanyDisplayStatus
  | CompanyRelationshipDisplayStatus;

export interface IProps {
  translationNamespace: string;
  status: StatusType;
  statusControls: ReactChild | null;
  statusSuffix?: string;
}
