/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExpertiseDomain, CompanyStatus, CompanySectorType, RoleName, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMe
// ====================================================

export interface GetMe_me_company_companySectors_sector {
  name: string;
  id: any;
}

export interface GetMe_me_company_companySectors {
  sectorType: CompanySectorType;
  sector: GetMe_me_company_companySectors_sector;
}

export interface GetMe_me_company {
  id: any;
  name: string;
  location: string | null;
  status: CompanyStatus;
  dnbRegion: string | null;
  dnbCountry: string | null;
  dnbCountryIso: string | null;
  dnbPostalCode: string | null;
  dnbAddressLineOne: string | null;
  dnbAddressLineTwo: string | null;
  companySectors: GetMe_me_company_companySectors[] | null;
}

export interface GetMe_me_roles {
  id: any;
  name: RoleName;
}

export interface GetMe_me_preferences {
  suppressTaskListPrompt: boolean;
}

export interface GetMe_me {
  id: any;
  email: string;
  firstName: string;
  lastName: string;
  expertiseDomain: ExpertiseDomain | null;
  company: GetMe_me_company | null;
  roles: GetMe_me_roles[];
  status: UserStatus;
  canViewUsersAdminDashboard: boolean;
  canViewCompaniesAdminDashboard: boolean;
  canViewSupplyDashboard: boolean;
  canEditSupplyDashboard: boolean;
  canViewCompanyRelationships: boolean;
  canEditCompanyRelationships: boolean;
  canViewEmissionAllocations: boolean;
  canEditEmissionAllocations: boolean;
  canEditCompanySectors: boolean;
  canInviteNewCompanyMembers: boolean;
  canEditCompanyMembers: boolean;
  canRemoveCompanyMembers: boolean;
  canSubmitDataPrivacyInfo: boolean;
  preferences: GetMe_me_preferences | null;
  launchDarklyHash: string;
}

export interface GetMe {
  me: GetMe_me;
}
