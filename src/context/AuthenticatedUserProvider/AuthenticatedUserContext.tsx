import { createContext } from 'react';
import { GetMe_me as Me } from 'types/GetMe';
import { UserStatus } from 'types/globalTypes';

export const defaultUser = {
  id: '',
  firstName: '',
  lastName: '',
  expertiseDomain: null,
  email: '',
  canEditSupplyDashboard: false,
  canViewUsersAdminDashboard: false,
  canViewCompaniesAdminDashboard: false,
  canViewSupplyDashboard: false,
  canEditCompanySectors: false,
  canInviteNewCompanyMembers: false,
  canViewCompanyRelationships: false,
  canEditCompanyRelationships: false,
  canViewEmissionAllocations: false,
  canEditEmissionAllocations: false,
  canEditCompanyMembers: false,
  canRemoveCompanyMembers: false,
  canSubmitDataPrivacyInfo: false,
  company: null,
  role: null,
  roles: [],
  status: UserStatus.PENDING,
  preferences: {
    suppressTaskListPrompt: false,
  },
  launchDarklyHash: '',
};

export const AuthenticatedUserContext = createContext<Me>(defaultUser);
