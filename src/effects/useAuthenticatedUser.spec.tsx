import { fireEvent, render } from '@testing-library/react';
import { AuthenticatedUserContext } from 'context/AuthenticatedUserProvider/AuthenticatedUserContext';
import { adminRole, editorRole, viewerRole } from 'mocks/adminDashboard';
import { GetMe_me as Me } from 'types/GetMe';
import { UserStatus } from 'types/globalTypes';
import { useAuthenticatedUser } from './useAuthenticatedUser';

describe('useAuthenticatedUser', () => {
  interface IProps {
    onClick: (user: Me) => void;
  }

  const TestComponent = ({ onClick }: IProps) => {
    const currentUser = useAuthenticatedUser();
    return (
      <button type="button" onClick={() => onClick(currentUser)}>
        click me
      </button>
    );
  };

  it('should provide user from the user context provider', async () => {
    const userFixture: Me = {
      id: '1',
      firstName: 'Test',
      lastName: 'McTest',
      email: 'test@example.com',
      expertiseDomain: null,
      company: null,
      roles: [adminRole, editorRole, viewerRole],
      status: UserStatus.ACTIVE,
      canViewUsersAdminDashboard: true,
      canViewCompaniesAdminDashboard: true,
      canViewSupplyDashboard: false,
      canEditSupplyDashboard: false,
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

    const click = (jest.fn() as unknown) as (user: Me) => void;

    const { findByText } = render(
      <AuthenticatedUserContext.Provider value={userFixture}>
        <TestComponent onClick={click} />
      </AuthenticatedUserContext.Provider>
    );

    fireEvent.click(await findByText('click me'));
    expect(click).toHaveBeenCalledWith(userFixture);
  });

  it('should provide all user permissions initially set to false (when no provider is present)', async () => {
    const click = (jest.fn() as unknown) as (user: Me) => void;

    const { findByText } = render(<TestComponent onClick={click} />);

    fireEvent.click(await findByText('click me'));

    expect(click).toHaveBeenCalledWith(
      expect.objectContaining({
        canViewUsersAdminDashboard: false,
        canViewCompaniesAdminDashboard: false,
        canViewSupplyDashboard: false,
        canEditSupplyDashboard: false,
      })
    );
  });
});
