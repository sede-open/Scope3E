import { render } from '@testing-library/react';
import { adminRole, editorRole, viewerRole } from 'mocks/adminDashboard';
import { GetMe_me as Me } from 'types/GetMe';
import { UserStatus } from 'types/globalTypes';
import { AuthenticatedUserContext } from './AuthenticatedUserContext';

const userFixture: Me = {
  id: '1',
  firstName: 'Test',
  lastName: 'McTest',
  expertiseDomain: null,
  email: 'test@example.com',
  company: null,
  roles: [adminRole, editorRole, viewerRole],
  status: UserStatus.ACTIVE,
  canViewUsersAdminDashboard: true,
  canViewCompaniesAdminDashboard: true,
  canViewSupplyDashboard: true,
  canEditSupplyDashboard: true,
  canViewCompanyRelationships: true,
  canEditCompanyRelationships: true,
  canViewEmissionAllocations: true,
  canEditEmissionAllocations: true,
  canEditCompanySectors: true,
  canInviteNewCompanyMembers: true,
  canEditCompanyMembers: true,
  canRemoveCompanyMembers: true,
  canSubmitDataPrivacyInfo: true,
  preferences: {
    suppressTaskListPrompt: false,
  },
  launchDarklyHash: '',
};

describe('AuthenticatedUserContext', () => {
  it('should provide user permissions', () => {
    render(
      <AuthenticatedUserContext.Provider value={userFixture}>
        <AuthenticatedUserContext.Consumer>
          {(permissions) => {
            expect(permissions.canViewUsersAdminDashboard).toBe(true);
            expect(permissions.canViewCompaniesAdminDashboard).toBe(true);
            expect(permissions.canViewSupplyDashboard).toBe(true);
            expect(permissions.canEditSupplyDashboard).toBe(true);
            expect(permissions.canViewCompanyRelationships).toBe(true);
            expect(permissions.canEditCompanyRelationships).toBe(true);
            expect(permissions.canViewEmissionAllocations).toBe(true);
            expect(permissions.canEditEmissionAllocations).toBe(true);
            expect(permissions.canEditCompanySectors).toBe(true);
            expect(permissions.canInviteNewCompanyMembers).toBe(true);

            return <div />;
          }}
        </AuthenticatedUserContext.Consumer>
      </AuthenticatedUserContext.Provider>
    );
  });

  it('should ensure that all permissions are false by default', () => {
    render(
      <AuthenticatedUserContext.Consumer>
        {(permissions) => {
          expect(permissions.canViewUsersAdminDashboard).toBe(false);
          expect(permissions.canViewCompaniesAdminDashboard).toBe(false);
          expect(permissions.canViewSupplyDashboard).toBe(false);
          expect(permissions.canEditSupplyDashboard).toBe(false);

          return <div />;
        }}
      </AuthenticatedUserContext.Consumer>
    );
  });
});
