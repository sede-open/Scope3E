import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { InviteStatus } from 'types/globalTypes';
import { InvitationContainer } from './InvitationContainer';

import * as StyledComponents from '../styledComponents';
import * as selectors from '../../selectors';
import { InvitationType } from '../../types';

interface IProps {
  navigateBackFn: (() => void) | null;
  navigateForwardFn: () => void;
  invitations: InvitationType[];
  updateInviteStatus: (inviteId: string, newStatus: InviteStatus) => void;
}

export const Invitations = ({
  navigateBackFn,
  navigateForwardFn,
  invitations,
  updateInviteStatus,
}: IProps) => {
  const { t } = useTranslation();
  const [canSubmit, toggleCanSubmit] = useState(true);
  const [inviteControlsDisabled, toggleInviteControls] = useState(false);

  return (
    <>
      <StyledComponents.UserOnboardingCardInvitations>
        <StyledComponents.StepTitle>
          {t('userOnboarding:invitations-title')}
        </StyledComponents.StepTitle>
        <StyledComponents.StepIntro>
          {t('userOnboarding:invitations-intro')}
        </StyledComponents.StepIntro>

        {invitations.map((relationship) => (
          <div key={relationship.id}>
            <InvitationContainer
              dataTestId={selectors.getInviteSelector(relationship.id)}
              invite={relationship}
              key={relationship.id}
              toggleInviteControls={toggleInviteControls}
              inviteControlsDisabled={inviteControlsDisabled}
              toggleParentCanSubmit={toggleCanSubmit}
              updateInviteStatus={updateInviteStatus}
            />
          </div>
        ))}

        <StyledComponents.StepNavigation>
          {navigateBackFn !== null && (
            <StyledComponents.BackButton
              color="secondary"
              data-testid={selectors.backButton}
              onClick={navigateBackFn}
            >
              {t('userOnboarding:step-back-button')}
            </StyledComponents.BackButton>
          )}

          <StyledComponents.NextButton
            data-testid={selectors.submitButton}
            onClick={navigateForwardFn}
            disabled={!canSubmit}
          >
            {t('userOnboarding:onboarding-submit')}
          </StyledComponents.NextButton>
        </StyledComponents.StepNavigation>
      </StyledComponents.UserOnboardingCardInvitations>
    </>
  );
};
