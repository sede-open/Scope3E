import Button from 'components/Button';
import Modal from 'components/Modal';
import { TextBold, TextNormal } from 'components/Text';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { useAccountSettingsData } from '../../queries';
import * as selectors from '../../selectors';
import { CompanyMembersTable } from './CompanyMembersTable';
import InviteForm from './InviteForm';
import * as StyledComponents from './styledComponents';
import { ModalState, ModalType } from './types';
import { UserDeleteConfirmation } from './UserDeleteConfirmation';

export const CompanyTeamMembers = () => {
  const { t } = useTranslation();
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
  });
  const companyUserToEdit = modalState.companyUserFormProps?.user;
  const companyUserToDelete = modalState.userToDeleteProps?.user;

  const openUserInviteFormModal = () => {
    setModalState({
      isOpen: true,
      formType: ModalType.INVITE_USER_FORM,
    });
  };
  const closeModal = () => {
    setModalState({
      isOpen: false,
    });
  };

  const user = useAuthenticatedUser();
  const companyId = user.company?.id;

  if (!companyId) {
    return null;
  }

  const { data: accountSettingsData } = useAccountSettingsData();

  if (!accountSettingsData?.companyUsers) {
    return null;
  }

  return (
    <>
      <StyledComponents.CompanyTeamMembersWrapper
        data-testid={selectors.companyInviteTable}
      >
        <StyledComponents.CompanyTeamMembersHeadingWrapper>
          <StyledComponents.HeaderContainer>
            <TextBold>
              {t(
                'accountSettings:your-organisation-company-team-members-header'
              )}
            </TextBold>
          </StyledComponents.HeaderContainer>
          <StyledComponents.SubHeaderContainer>
            <TextNormal>
              {t(
                'accountSettings:your-organisation-company-team-members-sub-header'
              )}
            </TextNormal>
          </StyledComponents.SubHeaderContainer>
        </StyledComponents.CompanyTeamMembersHeadingWrapper>
        {user.canInviteNewCompanyMembers && (
          <Button
            data-testid={selectors.inviteFormButton}
            color="primary"
            onClick={openUserInviteFormModal}
            type="button"
          >
            {t(
              'accountSettings:your-organisation-company-table-invite-new-member-button'
            )}
          </Button>
        )}
      </StyledComponents.CompanyTeamMembersWrapper>

      <CompanyMembersTable
        usersList={accountSettingsData.companyUsers}
        setModalState={setModalState}
      />

      <Modal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.formType === ModalType.INVITE_USER_FORM && (
          <InviteForm onClose={closeModal} companyUser={companyUserToEdit} />
        )}
        {modalState.formType === ModalType.USER_DELETE_CONFIRMATION &&
          companyUserToDelete && (
            <UserDeleteConfirmation
              onClose={closeModal}
              userToDelete={companyUserToDelete}
            />
          )}
      </Modal>
    </>
  );
};
