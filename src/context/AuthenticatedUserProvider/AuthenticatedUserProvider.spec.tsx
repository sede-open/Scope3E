import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { adminRole, editorRole, viewerRole } from 'mocks/adminDashboard';
import { GetMe } from 'types/GetMe';
import { UserStatus } from 'types/globalTypes';
import { AuthenticatedUserContext } from './AuthenticatedUserContext';
import { AuthenticatedUserProvider, GET_ME } from './AuthenticatedUserProvider';

describe('AuthenticatedUserProvider', () => {
  it('should provide user permissions from the API', async () => {
    const data: GetMe['me'] = {
      id: '3',
      email: 'john.smith@example.com',
      firstName: 'Test',
      lastName: 'McTest',
      expertiseDomain: null,
      company: null,
      roles: [adminRole, editorRole, viewerRole],
      status: UserStatus.ACTIVE,
      canEditSupplyDashboard: true,
      canViewUsersAdminDashboard: true,
      canViewCompaniesAdminDashboard: true,
      canViewSupplyDashboard: false,
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

    const mocks = [
      {
        request: { query: GET_ME },
        result: {
          data: {
            me: data,
          },
          errors: undefined,
        },
      },
    ];

    const { findByText, getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <AuthenticatedUserProvider>
          <AuthenticatedUserContext.Consumer>
            {(values) => (
              <>
                <div>
                  {`canEditSupplyDashboard: ${String(
                    values.canEditSupplyDashboard
                  )}`}
                </div>
                <div>
                  {`canViewUsersAdminDashboard: ${String(
                    values.canViewUsersAdminDashboard
                  )}`}
                </div>
                <div>
                  {`canViewCompaniesAdminDashboard: ${String(
                    values.canViewCompaniesAdminDashboard
                  )}`}
                </div>
                <div>
                  {`canViewSupplyDashboard: ${String(
                    values.canViewSupplyDashboard
                  )}`}
                </div>
              </>
            )}
          </AuthenticatedUserContext.Consumer>
        </AuthenticatedUserProvider>
      </MockedProvider>
    );

    expect(getByTestId('cog-spinner')).toBeInTheDocument();

    const canEditSupplyDashboard = await findByText(
      'canEditSupplyDashboard: true'
    );
    expect(canEditSupplyDashboard).toBeInTheDocument();
    const canViewUsersAdminDashboard = await findByText(
      'canViewUsersAdminDashboard: true'
    );
    expect(canViewUsersAdminDashboard).toBeInTheDocument();
    const canViewCompaniesAdminDashboard = await findByText(
      'canViewCompaniesAdminDashboard: true'
    );
    expect(canViewCompaniesAdminDashboard).toBeInTheDocument();
    const canViewSupplyDashboard = await findByText(
      'canViewSupplyDashboard: false'
    );
    expect(canViewSupplyDashboard).toBeInTheDocument();
  });

  it('should show a loading icon if access is denied', () => {
    const mocks = [
      {
        request: { query: GET_ME },
        result: {
          data: null,
          errors: [
            { extensions: { code: 'ACCESS_DENIED' }, message: 'Access denied' },
          ] as any,
        },
      },
    ];

    const { queryByText, getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <AuthenticatedUserProvider>Children</AuthenticatedUserProvider>
      </MockedProvider>
    );

    expect(queryByText('Children')).not.toBeInTheDocument();
    expect(getByTestId('cog-spinner')).toBeInTheDocument();
  });
});
