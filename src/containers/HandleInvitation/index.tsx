import { useCallback, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { displayErrorMessage } from 'utils/toast';
import { SquaresGraphic } from 'components/Glyphs/SquaresGraphic';
import { ConfirmationSquaresGraphic } from 'components/Glyphs/ConfirmationSquaresGraphic';
import {
  useAcceptCompanyInviteMutation,
  useDeclineCompanyInviteMutation,
} from './mutations';
import {
  ContentType,
  ContentState,
  IHandleInvitationFormValues,
  ACTION_IDS,
} from './types';
import { HandleInvitationForm } from './HandleInvitationForm';
import { HandleInvitationPageTitle } from './HandleInvitationPageTitle/HandleInvitationPageTitle';

import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export const HandleInvitation = () => {
  const { t } = useTranslation();
  const { company } = useAuthenticatedUser();
  const [apiError, setApiError] = useState('');
  const [contentState, setContentState] = useState<ContentState>({
    contentType: ContentType.HANDLE_INVITATION_FORM,
  });
  const isInvitationFormContent =
    contentState.contentType === ContentType.HANDLE_INVITATION_FORM;

  if (!company) {
    return null;
  }

  const acceptedConfirmation = () => {
    setContentState({
      contentType: ContentType.ACCEPTED_CONFIRMATION,
    });
  };

  const declinedConfirmation = () => {
    setContentState({
      contentType: ContentType.DECLINED_CONFIRMATION,
    });
  };

  const [acceptCompanyInvite] = useAcceptCompanyInviteMutation({
    onError: (err) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('common:save-toast-error'),
      });
    },
    onCompleted: () => {
      acceptedConfirmation();
    },
  });

  const [declineCompanyInvite] = useDeclineCompanyInviteMutation({
    onError: (err) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('common:save-toast-error'),
      });
    },
    onCompleted: () => {
      declinedConfirmation();
    },
  });

  const onSubmit = useCallback(
    async ({ reason, action }: IHandleInvitationFormValues) => {
      const companyId = company?.id;
      const selectedDeclineReason = reason?.label;
      const isDeclineAction = action === ACTION_IDS.DECLINE;
      if (isDeclineAction) {
        await declineCompanyInvite({
          variables: {
            input: {
              companyId,
              reason: selectedDeclineReason,
            },
          },
        });
      } else {
        await acceptCompanyInvite({
          variables: {
            input: {
              companyId,
            },
          },
        });
      }
    },
    []
  );

  return (
    <StyledComponents.Wrapper
      data-testid={selectors.handleInviationPageContainer}
    >
      <StyledComponents.PageContentContainer>
        <StyledComponents.GraphicContainer>
          {isInvitationFormContent ? (
            <div data-testid={selectors.squaresGraphic}>
              <SquaresGraphic title={t('handleInvitation:squares-graphic')} />
            </div>
          ) : (
            <div data-testid={selectors.confirmationSquaresGraphic}>
              <ConfirmationSquaresGraphic
                title={t('handleInvitation:confirmation-squares-graphic')}
              />
            </div>
          )}
        </StyledComponents.GraphicContainer>
        <StyledComponents.ContentWrapper>
          {isInvitationFormContent ? (
            <HandleInvitationForm
              onSubmit={onSubmit}
              apiError={apiError}
              company={company}
              type={contentState.contentType}
            />
          ) : (
            <HandleInvitationPageTitle type={contentState.contentType} />
          )}
        </StyledComponents.ContentWrapper>
      </StyledComponents.PageContentContainer>
    </StyledComponents.Wrapper>
  );
};
