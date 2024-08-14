import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { RoleName, AuthProvider } from 'types/globalTypes';
import Modal from 'components/Modal';
import RedirectTo from 'components/RedirectTo';
import Button from 'components/Button';
import CogSpinner from 'components/CogSpinner';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { UserDeleteConfirmation } from './UserDeleteConfirmation';
import ExternalUserForm from '../ExtenalUserForm';
import { ModalState, ModalType } from '../types';
import { IExternalUserFormValues } from '../ExtenalUserForm/types';
import { useCreateUser, useEditUser } from '../mutations';
import { UsersTable } from './UsersTable/UsersTable';
import { useAdminCompaniesQuery, useUsersQuery } from '../queries';
import * as StyledComponents from '../styledComponents';
import * as selectors from '../selectors';

export const UsersDashboard = () => {
  const LIMIT = 1000;
  const { t } = useTranslation();
  const {
    canViewUsersAdminDashboard,
    canViewCompaniesAdminDashboard,
    roles,
  } = useAuthenticatedUser();
  const [apiError, setApiError] = useState('');
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
  });
  const userToDelete = modalState.deleteUserFormProps?.user;
  const externalUserToEdit = modalState.externalUserFormProps?.user;

  if (!canViewUsersAdminDashboard && canViewCompaniesAdminDashboard) {
    return <RedirectTo url="/admin-dashboard/companies" />;
  }

  if (!canViewUsersAdminDashboard) {
    return <RedirectTo url="/forbidden" />;
  }

  const openExternalUserFormModal = () => {
    setModalState({
      isOpen: true,
      formType: ModalType.EXTERNAL_USER_FORM,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
    });
    setApiError('');
  };

  const {
    data: usersData,
    loading: isUsersLoading,
    fetchMore: fetchMoreUsers,
  } = useUsersQuery({
    offset: 0,
    limit: LIMIT,
  });

  useEffect(() => {
    if (usersData && usersData.users.data.length < usersData.users.count) {
      fetchMoreUsers({
        variables: {
          offset: usersData.users.data.length,
          limit: LIMIT,
        },
      });
    }
  }, [usersData?.users, fetchMoreUsers]);

  const {
    data: companiesData,
    loading: isCompaniesLoading,
    fetchMore: fetchMoreCompanies,
  } = useAdminCompaniesQuery({
    offset: 0,
    limit: LIMIT,
  });

  useEffect(() => {
    if (
      companiesData &&
      companiesData.companies.data.length < companiesData.companies.total
    ) {
      fetchMoreCompanies({
        variables: {
          offset: companiesData.companies.data.length,
          limit: LIMIT,
        },
      });
    }
  }, [companiesData?.companies, fetchMoreCompanies]);

  const [createUser] = useCreateUser({
    onError: (err) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('common:save-toast-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:save-toast-success'),
      });
      closeModal();
    },
  });

  const [editUser] = useEditUser({
    onError: (err) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('common:save-toast-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:save-toast-success'),
      });
      closeModal();
    },
  });

  if (isUsersLoading) {
    return <CogSpinner />;
  }

  if (!usersData || !companiesData) {
    return null;
  }

  const adminRole = roles.find((role) => role.name === RoleName.ADMIN);

  const onExternalUserSubmit = async (payload: IExternalUserFormValues) => {
    if (externalUserToEdit) {
      await editUser({
        variables: {
          input: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            roleName: payload.roleId.value as RoleName,
            companyId: payload.companyId.value,
          },
        },
      });
    } else {
      await createUser({
        variables: {
          input: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            roleName: payload.roleId.value as RoleName,
            companyId: payload.companyId.value,
            authProvider: payload.email.endsWith('@example.com')
              ? AuthProvider.PORT
              : AuthProvider.AKAMAI,
          },
        },
      });
    }
  };

  return (
    <div data-testid={selectors.usersDashboard}>
      <StyledComponents.Header>
        <StyledComponents.FlexWrapper>
          <StyledComponents.Heading>
            {t('usersAdminDashboard:users-dashboard-heading')}
          </StyledComponents.Heading>
          {adminRole && (
            <Button
              width="auto"
              color="primary"
              data-testid={selectors.addNewUserButton}
              onClick={openExternalUserFormModal}
            >
              {t('usersAdminDashboard:add-new-user')}
            </Button>
          )}
        </StyledComponents.FlexWrapper>
        <StyledComponents.Subtitle>
          {t('usersAdminDashboard:users-dashboard-subtitle')}
        </StyledComponents.Subtitle>
      </StyledComponents.Header>
      <UsersTable
        usersList={usersData.users.data}
        setModalState={setModalState}
      />
      <Modal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.formType === ModalType.EXTERNAL_USER_FORM && (
          <ExternalUserForm
            onClose={closeModal}
            companies={companiesData.companies.data}
            onSubmit={onExternalUserSubmit}
            user={externalUserToEdit}
            isLoading={isUsersLoading || isCompaniesLoading}
            apiError={apiError}
          />
        )}
        {modalState.formType === ModalType.DELETE_USER_FORM && (
          <UserDeleteConfirmation
            onClose={closeModal}
            userToDelete={userToDelete}
          />
        )}
      </Modal>
    </div>
  );
};
export default UsersDashboard;
