/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InviteStatus, CompanyRelationshipType } from "./globalTypes";

// ====================================================
// GraphQL query operation: NetworkPendingInvitesQuery
// ====================================================

export interface NetworkPendingInvitesQuery_networkSummary_pendingInvitations {
  updatedAt: any | null;
  createdAt: any;
  note: string | null;
  supplierName: string;
  status: InviteStatus;
  customerName: string;
  inviteType: CompanyRelationshipType;
  id: any;
}

export interface NetworkPendingInvitesQuery_networkSummary {
  pendingInvitations: NetworkPendingInvitesQuery_networkSummary_pendingInvitations[];
}

export interface NetworkPendingInvitesQuery {
  networkSummary: NetworkPendingInvitesQuery_networkSummary;
}
