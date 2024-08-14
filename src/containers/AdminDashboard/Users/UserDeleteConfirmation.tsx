import { useCallback, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { UsersQuery_users_data as User } from 'types/UsersQuery';
import Button from 'components/Button';
import { Text } from 'components/Text';
import { InputError } from 'components/InputError';
import { AlizarinCrimson } from 'styles/colours';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { useDeleteUser } from 'mutations/user';
import * as StyledComponents from '../styledComponents';
import * as selectors from '../selectors';

interface IProps {
  onClose: () => void;
  userToDelete?: User;
}

export const UserDeleteConfirmation = ({ onClose, userToDelete }: IProps) => {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState('');
  const [deleteUser, { loading: isDeleteUserLoading }] = useDeleteUser({
    onError: (err) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('common:delete-toast-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:delete-toast-success'),
      });
      onClose();
    },
  });

  const onDeleteUser = useCallback(async () => {
    if (userToDelete) {
      await deleteUser({
        variables: {
          input: { id: userToDelete.id },
        },
      });
    }
  }, [userToDelete]);

  return (
    <StyledComponents.ConfirmationContentWrapper
      data-testid={selectors.userDeleteConfirmation}
    >
      <StyledComponents.HeadingContainer>
        <StyledComponents.Heading>
          {t('usersAdminDashboard:user-delete-title')}
        </StyledComponents.Heading>
      </StyledComponents.HeadingContainer>
      <StyledComponents.TextContainer>
        <Text as="p">
          {t('usersAdminDashboard:user-delete-text[0]')}{' '}
          {userToDelete?.firstName} {userToDelete?.lastName}?
        </Text>
        <Text as="p" color={AlizarinCrimson}>
          {t('usersAdminDashboard:user-delete-text[1]')}
        </Text>
      </StyledComponents.TextContainer>
      <StyledComponents.ApiErrorWrapper>
        {apiError && (
          <InputError data-testid={selectors.userDeleteApiError}>
            {apiError}
          </InputError>
        )}
      </StyledComponents.ApiErrorWrapper>
      <StyledComponents.StyledCTAContainer>
        <Button
          width="auto"
          color="secondary"
          disabled={isDeleteUserLoading}
          onClick={onClose}
        >
          {t('usersAdminDashboard:user-delete-cancel')}
        </Button>
        <Button
          width="auto"
          type="button"
          color="primary"
          data-testid={selectors.userDeleteConfirm}
          disabled={isDeleteUserLoading}
          onClick={onDeleteUser}
        >
          {t('usersAdminDashboard:user-delete-confirm')}
        </Button>
      </StyledComponents.StyledCTAContainer>
    </StyledComponents.ConfirmationContentWrapper>
  );
};

UserDeleteConfirmation.defaultProps = {
  userToDelete: undefined,
};
