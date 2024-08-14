import { CompanyRelationshipDisplayStatus } from 'containers/AccountSettings/CompanyRelationships/types';
import { CompanyDisplayStatus } from 'containers/AdminDashboard/Companies/CompaniesTable/types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import {
  AlizarinCrimson,
  Azure,
  CongressBlue,
  FunGreen,
  TahitiGold,
} from 'styles/colours';
import { EmissionAllocationStatus, UserStatus } from 'types/globalTypes';
import { StatusType } from './types';

export const statusToColour: {
  [key in StatusType]: string;
} = {
  [EmissionAllocationStatus.APPROVED]: FunGreen,
  [EmissionAllocationStatus.REJECTED]: AlizarinCrimson,
  [EmissionAllocationStatus.REQUEST_DISMISSED]: AlizarinCrimson,
  [EmissionAllocationStatus.AWAITING_APPROVAL]: CongressBlue,
  [EmissionAllocationStatus.REQUESTED]: CongressBlue,
  [UserStatus.ACTIVE]: FunGreen,
  [UserStatus.PENDING]: AlizarinCrimson,
  [CompanyDisplayStatus.ACTIVE]: FunGreen,
  [CompanyDisplayStatus.PENDING_USER_ACTIVATION]: TahitiGold,
  [CompanyDisplayStatus.PENDING]: Azure,
  [CompanyDisplayStatus.VETOED]: AlizarinCrimson,
  [CompanyRelationshipDisplayStatus.CONNECTED]: FunGreen,
  [CompanyRelationshipDisplayStatus.INVITATION_DECLINED]: AlizarinCrimson,
  [CompanyRelationshipDisplayStatus.VETOED]: TahitiGold,
  [CompanyRelationshipDisplayStatus.INVITATION_SENT]: CongressBlue,
};

export const StatusContainer = styled.span`
  white-space: nowrap;
`;

export const StatusText = styled.span<{
  status: StatusType;
  withStatusControls: boolean;
}>`
  color: ${({ status }) => statusToColour[status]};
  margin-right: ${ifProp({ withStatusControls: true }, '8px')};
`;

export const StatusTextLink = styled.a<{
  status: StatusType;
  withStatusControls: boolean;
}>`
  color: ${({ status }) => statusToColour[status]};
  margin-right: ${ifProp({ withStatusControls: true }, '8px')};
`;

export const ReSend = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: inherit;
  margin-left: 8px;
  text-decoration: underline;
  padding: 0;

  &:active {
    color: inherit;
  }
`;
