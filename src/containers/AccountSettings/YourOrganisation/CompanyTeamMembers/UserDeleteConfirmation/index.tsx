import { useCallback, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import Button from 'components/Button';
import { Text } from 'components/Text';
import { InputError } from 'components/InputError';
import { AlizarinCrimson, Tundora } from 'styles/colours';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { useDeleteUser } from 'mutations/user';
import { trackEvent } from 'utils/analytics';
import { TEAM_MEMBER_REMOVED } from 'utils/analyticsEvents';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';
import { IProps } from './types';

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
        title: t('accountSettings:remove-user-success-toast'),
      });
      trackEvent(TEAM_MEMBER_REMOVED, {
        companyId: userToDelete.company?.id,
      });
      onClose();
    },
  });

  const onDeleteUser = useCallback(async () => {
    if (apiError) {
      setApiError('');
    }

    await deleteUser({
      variables: {
        input: { id: userToDelete.id },
      },
    });
  }, [userToDelete, apiError]);

  const userName = `${userToDelete.firstName} ${userToDelete.lastName}`;

  return (
    <StyledComponents.ConfirmationContentWrapper
      data-testid={selectors.userDeleteConfirmation}
    >
      <StyledComponents.HeadingContainer>
        <StyledComponents.Heading>
          {t('accountSettings:remove-user-title')}
        </StyledComponents.Heading>
      </StyledComponents.HeadingContainer>
      <StyledComponents.TextContainer>
        <Text as="p" color={Tundora}>
          <Trans
            i18nKey="accountSettings:remove-user-description"
            components={{ bold: <b /> }}
            values={{ userName }}
          />
        </Text>
        <Text as="p" color={AlizarinCrimson}>
          {t('accountSettings:remove-user-warning')}
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
          data-testid={selectors.userDeleteCancel}
        >
          {t('accountSettings:remove-user-cancel-cta')}
        </Button>
        <Button
          width="auto"
          type="button"
          color="primary"
          data-testid={selectors.userDeleteConfirm}
          disabled={isDeleteUserLoading}
          onClick={onDeleteUser}
        >
          {t('accountSettings:remove-user-confirmation-cta')}
        </Button>
      </StyledComponents.StyledCTAContainer>
    </StyledComponents.ConfirmationContentWrapper>
  );
};
