import { useState } from 'react';
import { ApolloError } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';

import { useUpdateCompanyRelationshipMutation } from 'containers/AccountSettings/CompanyRelationships/mutations';
import { Spinner } from 'components/Spinner';
import { InputError } from 'components/InputError';
import { displaySuccessMessage } from 'utils/toast';
import { CompanyRelationshipsOnboardingQuery_customer } from 'types/CompanyRelationshipsOnboardingQuery';
import { CompanyRelationshipType, InviteStatus } from 'types/globalTypes';

import * as StyledComponents from '../styledComponents';
import * as selectors from '../../selectors';

interface ToastContent {
  title: string;
  subtitle?: string;
  options: {
    onClose: () => void;
  };
}

interface IProps {
  dataTestId?: string;
  invite: CompanyRelationshipsOnboardingQuery_customer;
  toggleInviteControls: (state: boolean) => void;
  toggleParentCanSubmit: (state: boolean) => void;
  inviteControlsDisabled: boolean;
  updateInviteStatus: (inviteId: string, newStatus: InviteStatus) => void;
}

export const InvitationContainer = ({
  dataTestId,
  invite,
  toggleInviteControls,
  inviteControlsDisabled,
  toggleParentCanSubmit,
  updateInviteStatus,
}: IProps) => {
  const { t } = useTranslation();
  const [isSelected, setIsSelected] = useState(
    invite.status === InviteStatus.APPROVED
  );
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const [toastContent, setToastContent] = useState<ToastContent | null>(null);
  const clearToastContent = () => setToastContent(null);

  const isInviteFromSupplier =
    invite.inviteType === CompanyRelationshipType.CUSTOMER;

  const companyName = isInviteFromSupplier
    ? invite.supplier.name
    : invite.customer.name;

  const inviteTitle = isInviteFromSupplier
    ? t('userOnboarding:invitations-supplier-label')
    : t('userOnboarding:invitations-customer-label');

  const mutationOptions = {
    onError: (err: ApolloError) => {
      toggleInviteControls(false);
      setApiError(err.message);
      toggleParentCanSubmit(true);
      setIsSelected(false);
      setIsLoading(false);
    },
    onCompleted: () => {
      toggleParentCanSubmit(true);
      setIsLoading(false);
      if (toastContent) {
        displaySuccessMessage(toastContent);
      }
      updateInviteStatus(invite.id, InviteStatus.APPROVED);
    },
    refetchQueries: () => [],
  };

  const [updateCompanyRelationship] = useUpdateCompanyRelationshipMutation(
    mutationOptions
  );

  const onConnect = async (id: string) => {
    setIsLoading(true);
    toggleParentCanSubmit(false);
    setToastContent({
      title: t('userOnboarding:incoming-relationship-connect-success', {
        companyName,
      }),
      options: {
        onClose: clearToastContent,
      },
    });
    setApiError('');
    await updateCompanyRelationship({
      variables: {
        input: {
          id,
          status: InviteStatus.APPROVED,
        },
      },
    });
  };

  const handleClick = () => {
    if (isSelected) {
      return;
    }
    onConnect(invite.id);
    setIsSelected(true);
  };

  return (
    <>
      <StyledComponents.RowContainer>
        <StyledComponents.InputContainer
          data-testid={dataTestId}
          hasError={!!apiError}
        >
          <StyledComponents.ContentWrapper>
            <StyledComponents.TextContainer>
              <StyledComponents.InviterTitle>
                {inviteTitle}
              </StyledComponents.InviterTitle>
              <StyledComponents.CompanyName
                data-testid={`${selectors.connectCompanyName}-${invite.id}`}
              >
                {companyName}
              </StyledComponents.CompanyName>
            </StyledComponents.TextContainer>
            <StyledComponents.ConnectButton
              color="primary"
              data-testid={`${selectors.connectButton}-${invite.id}`}
              disabled={inviteControlsDisabled}
              onClick={handleClick}
              isSelected={isSelected}
              data-is-selected={isSelected}
            >
              {isSelected
                ? t('userOnboarding:invitations-button-text-connected')
                : t('userOnboarding:invitations-button-text')}
            </StyledComponents.ConnectButton>
          </StyledComponents.ContentWrapper>
        </StyledComponents.InputContainer>
        {isLoading ? (
          <StyledComponents.LoadingSpinnerContainer>
            <Spinner />
          </StyledComponents.LoadingSpinnerContainer>
        ) : null}
      </StyledComponents.RowContainer>
      {apiError && (
        <StyledComponents.ApiErrorWrapper>
          <InputError data-testid={selectors.apiError}>
            {t('userOnboarding:invitations-api-error')}
          </InputError>
        </StyledComponents.ApiErrorWrapper>
      )}
    </>
  );
};

InvitationContainer.defaultProps = {
  dataTestId: undefined,
};
