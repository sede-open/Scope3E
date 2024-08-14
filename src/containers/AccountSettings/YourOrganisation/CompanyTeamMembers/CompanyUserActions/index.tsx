import useTranslation from 'next-translate/useTranslation';
import { useCallback } from 'react';

import { UserStatus, RoleName } from 'types/globalTypes';
import * as StyledComponents from 'containers/AdminDashboard/AdminDashboardTable/styledComponents';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { trackEvent } from 'utils/analytics';
import { TEAM_MEMBER_INVITE_RESENT } from 'utils/analyticsEvents';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';

import * as selectors from '../../../selectors';
import { IProps } from './types';
import { ModalType } from '../types';
import { useResendAkamaiInvite } from '../mutations';

export const CompanyUserActions = ({
  setModalState,
  user,
  currentUserId,
}: IProps) => {
  const { t } = useTranslation();
  const {
    canRemoveCompanyMembers,
    canEditCompanyMembers,
  } = useAuthenticatedUser();

  const [
    resendInvite,
    { loading: isResendInviteLoading },
  ] = useResendAkamaiInvite({
    onError: () => {
      displayErrorMessage({
        title: t('accountSettings:resend-invite-error-toast'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('accountSettings:resend-invite-success-toast'),
      });
      trackEvent(TEAM_MEMBER_INVITE_RESENT, {
        companyId: user.company?.id,
      });
    },
  });

  const onEditUser = async () => {
    setModalState({
      isOpen: true,
      formType: ModalType.INVITE_USER_FORM,
      companyUserFormProps: {
        user,
      },
    });
  };

  const onRemoveUser = async () => {
    setModalState({
      isOpen: true,
      formType: ModalType.USER_DELETE_CONFIRMATION,
      userToDeleteProps: {
        user,
      },
    });
  };

  const onResendInvite = useCallback(async () => {
    await resendInvite({
      variables: {
        input: { userId: user.id },
      },
    });
  }, [resendInvite, user]);

  const isCurrentUser = currentUserId === user.id;

  const shouldDisplayEditBtn =
    user.status === UserStatus.ACTIVE && canEditCompanyMembers;
  const shouldDisplayResendInviteBtn = user.status === UserStatus.PENDING;

  const userRoles = user.roles?.map((role) => role.name) ?? [];
  const userIsAdmin = userRoles.includes(RoleName.ADMIN);

  if (isCurrentUser || userIsAdmin) {
    return null;
  }

  return (
    <StyledComponents.ButtonContainer key={user.id}>
      {shouldDisplayEditBtn && (
        <StyledComponents.TableButton
          data-testid={selectors.editUserButton}
          onClick={onEditUser}
          disabled={!canEditCompanyMembers}
        >
          {t('common:edit')}
        </StyledComponents.TableButton>
      )}
      {shouldDisplayResendInviteBtn && (
        <StyledComponents.TableButton
          data-testid={selectors.resendInviteButton}
          onClick={onResendInvite}
          disabled={!canEditCompanyMembers || isResendInviteLoading}
        >
          {t('common:resend')}
        </StyledComponents.TableButton>
      )}
      {(shouldDisplayEditBtn || shouldDisplayResendInviteBtn) &&
        canRemoveCompanyMembers && <div> / </div>}
      {canRemoveCompanyMembers && (
        <StyledComponents.TableButton
          data-testid={selectors.removeUserButton}
          onClick={onRemoveUser}
        >
          {t('common:remove')}
        </StyledComponents.TableButton>
      )}
    </StyledComponents.ButtonContainer>
  );
};
