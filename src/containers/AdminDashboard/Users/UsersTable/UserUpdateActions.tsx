import useTranslation from 'next-translate/useTranslation';

import { CompanyStatus } from 'types/globalTypes';
import { UsersQuery_users_data as User } from 'types/UsersQuery';
import * as StyledComponents from 'containers/AdminDashboard/AdminDashboardTable/styledComponents';
import { useResendUserInvite } from 'containers/AdminDashboard/mutations';
import { NEW_COMPANY_INVITE_RETRIGGERED } from 'utils/analyticsEvents';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { trackEvent } from 'utils/analytics';

import { ModalType, ModalState } from '../../types';
import * as selectors from '../../selectors';

export interface IProps {
  setModalState: (state: ModalState) => void;
  user: User;
  currentUserId: string;
}

export const UserUpdateActions = ({
  setModalState,
  user,
  currentUserId,
}: IProps) => {
  const { t } = useTranslation();

  const onEditExternalUser = async () => {
    setModalState({
      isOpen: true,
      formType: ModalType.EXTERNAL_USER_FORM,
      externalUserFormProps: {
        user,
      },
    });
  };

  const onDeleteUser = async () => {
    setModalState({
      isOpen: true,
      formType: ModalType.DELETE_USER_FORM,
      deleteUserFormProps: {
        user,
      },
    });
  };

  const [
    resendUserInvite,
    { loading: resendInviteLoading },
  ] = useResendUserInvite({
    onError: () => {
      displayErrorMessage({
        title: t('common:invite-resend-fail-title'),
        subtitle: t('common:invite-resend-fail-subtitle'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:invite-resend-success'),
      });
      trackEvent(NEW_COMPANY_INVITE_RETRIGGERED, {
        companyId: user.company?.id,
      });
    },
  });

  const handleResendInvite = async () => {
    resendUserInvite({
      variables: {
        input: {
          userId: user.id,
        },
      },
    });
  };

  const handleEditUser = onEditExternalUser;

  const isUserCompanyStillToConfirm =
    user.company?.status === CompanyStatus.PENDING_USER_CONFIRMATION;

  return (
    <>
      {currentUserId !== user.id && (
        <StyledComponents.ButtonContainer key={user.id}>
          {isUserCompanyStillToConfirm ? (
            <StyledComponents.TableButton
              data-testid={selectors.resendInviteButton}
              onClick={handleResendInvite}
              disabled={resendInviteLoading}
            >
              {t('common:resend-invite')}
            </StyledComponents.TableButton>
          ) : (
            <>
              <StyledComponents.TableButton
                data-testid={`edit-${selectors.userModalToggle}`}
                onClick={handleEditUser}
              >
                {t('common:edit')}
              </StyledComponents.TableButton>

              <div> / </div>
              <StyledComponents.TableButton
                data-testid={`delete-${selectors.userModalToggle}`}
                onClick={onDeleteUser}
              >
                {t('common:delete')}
              </StyledComponents.TableButton>
            </>
          )}
        </StyledComponents.ButtonContainer>
      )}
    </>
  );
};
