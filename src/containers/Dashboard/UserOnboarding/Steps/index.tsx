import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { trackEvent } from 'utils/analytics';
import { ONBOARDING_JOURNEY_SUBMITTED } from 'utils/analyticsEvents';
import {
  ChangeCompanySector,
  CompanySectorsState,
  getInitialCompanySectorsState,
  getInitialSolutionInterestsState,
  getListString,
  getSectorNameTranslation,
  getSelectedSolutionInterests,
  getSolutionInterestIds,
  getSolutionInterestNames,
} from 'utils/userOnboarding';
import { displayErrorMessage } from 'utils/toast';
import { replaceElement } from 'utils/replaceElement';
import { CompanySectorType, InviteStatus, RoleName } from 'types/globalTypes';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import {
  useCombinedUserOnboardingMutation,
  useUpdateUserSolutionInterestsMutation,
} from 'mutations/userOnboarding';
import { removeNullishCompanySectors } from 'mutations/companySectors';
import { CompanySectorsQuery_companySectors } from 'types/CompanySectorsQuery';
import { SolutionInterestsQuery_solutionInterests } from 'types/SolutionInterestsQuery';
import { TagListState } from 'components/TagList';
import { Invitations } from './Invitations';
import { SolutionInterests } from './SolutionInterests';
import { CompanySectors } from './CompanySectors';
import { InvitationType } from '../types';
import { StepKeys } from './constants';
import * as StyledComponents from './styledComponents';
import { getOptionalProp, navigateBack, navigateForward } from './utils';
import * as selectors from '../selectors';

interface IProps {
  companySectors: CompanySectorsQuery_companySectors[];
  solutionInterests: SolutionInterestsQuery_solutionInterests[];
  invitations: InvitationType[];
}

const getIsCompanySectorsStepEnabled = ({
  companySectorsState,
  roles,
}: {
  companySectorsState: CompanySectorsState;
  roles: RoleName[];
}) =>
  roles.includes(RoleName.SUPPLIER_EDITOR) &&
  ![
    {
      sectorType: CompanySectorType.PRIMARY,
      id: companySectorsState[CompanySectorType.PRIMARY].id,
    },
    {
      sectorType: CompanySectorType.SECONDARY,
      id: companySectorsState[CompanySectorType.SECONDARY].id,
    },
  ].filter(removeNullishCompanySectors).length;

const getIsCompanyInvitationsStepEnabled = ({
  invitations,
  roles,
}: {
  invitations: InvitationType[];
  roles: RoleName[];
}) => roles.includes(RoleName.SUPPLIER_EDITOR) && invitations.length !== 0;

export const Steps = ({
  companySectors,
  solutionInterests,
  invitations: rawInvitations,
}: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { company: userCompany, roles } = useAuthenticatedUser();
  const companyId = userCompany?.id;
  const companyName = userCompany?.name;

  if (!companyId || !roles.length) {
    return null;
  }
  const roleNames = roles.map((role) => role.name);

  const initialCompanySectorsState = getInitialCompanySectorsState(
    companySectors
  );
  const initialUserSolutionInterestsState = getInitialSolutionInterestsState(
    solutionInterests
  );
  const isCompanySectorsStepEnabled = getIsCompanySectorsStepEnabled({
    roles: roleNames,
    companySectorsState: initialCompanySectorsState,
  });
  const isInvitationsStepEnabled = getIsCompanyInvitationsStepEnabled({
    invitations: rawInvitations,
    roles: roleNames,
  });

  const initialStepKey = isCompanySectorsStepEnabled
    ? StepKeys.CompanySectors
    : StepKeys.SolutionInterests;

  const [companySectorsState, updateCompanySectorsState] = useState<
    CompanySectorsState
  >(initialCompanySectorsState);
  const [missingSolutionValue, updateMissingSolutionValue] = useState('');
  const [hasSubmitted, updateHasSubmitted] = useState(false);
  const [solutionInterestsState, updateSolutionInterestsState] = useState<
    TagListState
  >(initialUserSolutionInterestsState);
  const [stepKey, changeStepKey] = useState<StepKeys>(initialStepKey);
  const [invitations, updateInvitations] = useState<InvitationType[]>([
    ...rawInvitations,
  ]);

  const getEnabledStepsOrdered = () => {
    const stepsEnabled = [];

    if (isCompanySectorsStepEnabled) {
      stepsEnabled.push(StepKeys.CompanySectors);
    }

    stepsEnabled.push(StepKeys.SolutionInterests);

    if (isInvitationsStepEnabled) {
      stepsEnabled.push(StepKeys.Invitations);
    }

    return stepsEnabled;
  };

  const stepNumber = getEnabledStepsOrdered().indexOf(stepKey) + 1;

  const updateInviteStatus = (inviteId: string, newStatus: InviteStatus) => {
    const invite = invitations.find((invitation) => invitation.id === inviteId);
    if (!invite) {
      return;
    }

    const index = invitations.indexOf(invite);

    const updatedInvitations = replaceElement(invitations, index, {
      ...invite,
      status: newStatus,
    });

    updateInvitations(updatedInvitations);
  };

  const mutationOptions = {
    onError: () => {
      displayErrorMessage({
        title: t('userOnboarding:form-toast-save-title-error'),
        subtitle: t('userOnboarding:form-toast-save-subtitle-error'),
      });
      updateHasSubmitted(false);
    },
    onCompleted: () => {
      router.reload();
    },
  };

  const [
    combinedOnboardingUpdate,
    { loading: isCombinedOnboardingUpdateLoading },
  ] = useCombinedUserOnboardingMutation(mutationOptions);

  const [
    updateUserSolutionInterests,
    { loading: isUpdateUserSolutionInterestsLoading },
  ] = useUpdateUserSolutionInterestsMutation(mutationOptions);

  const onChangeCompanySector = ({
    sectorType,
    value,
  }: ChangeCompanySector) => {
    updateCompanySectorsState({
      ...companySectorsState,
      [sectorType]: {
        name: value.label,
        id: value.id,
      },
    });
  };

  const onChangeSolutionTag = (tagKey: string, value: boolean) => {
    updateSolutionInterestsState({
      ...solutionInterestsState,
      [tagKey]: value,
    });
  };

  const onSubmit = async () => {
    updateHasSubmitted(true);

    const selectedSolutionInterests = getSelectedSolutionInterests({
      solutionInterests,
      solutionInterestsState,
    });
    const selectedSolutionInterestIds = getSolutionInterestIds(
      selectedSolutionInterests
    );
    const selectedSolutionInterestNames = getSolutionInterestNames({
      t,
      solutionInterests: selectedSolutionInterests,
    });

    if (isCompanySectorsStepEnabled) {
      await combinedOnboardingUpdate({
        variables: {
          companySectorsInput: {
            companyId,
            sectors: [
              {
                sectorType: CompanySectorType.PRIMARY,
                id: companySectorsState[CompanySectorType.PRIMARY].id,
              },
              {
                sectorType: CompanySectorType.SECONDARY,
                id: companySectorsState[CompanySectorType.SECONDARY].id,
              },
            ].filter(removeNullishCompanySectors),
          },
          userSolutionInterestsInput: {
            solutionInterestIds: selectedSolutionInterestIds,
          },
        },
      });
    } else {
      await updateUserSolutionInterests({
        variables: {
          input: {
            solutionInterestIds: selectedSolutionInterestIds,
          },
        },
      });
    }

    trackEvent(ONBOARDING_JOURNEY_SUBMITTED, {
      companyId,
      companyName,
      ...getOptionalProp('missingSolutionText', missingSolutionValue),
      primaryCompanySector: getSectorNameTranslation({
        t,
        sectorName: companySectorsState[CompanySectorType.PRIMARY].name,
      }),
      secondaryCompanySector: getSectorNameTranslation({
        t,
        sectorName: companySectorsState[CompanySectorType.SECONDARY].name,
      }),
      solutionInterests: getListString(selectedSolutionInterestNames),
    });
  };

  const IsSubmitting =
    hasSubmitted ||
    isCombinedOnboardingUpdateLoading ||
    isUpdateUserSolutionInterestsLoading;

  return (
    <StyledComponents.StepContainer>
      <StyledComponents.StepTracker data-testid={selectors.stepTracker}>
        {t('userOnboarding:step-tracker', {
          stepNumber,
          totalSteps: getEnabledStepsOrdered().length,
        })}
      </StyledComponents.StepTracker>
      {stepKey === StepKeys.CompanySectors && (
        <CompanySectors
          onChange={onChangeCompanySector}
          navigateForwardFn={() =>
            navigateForward({
              changeStepKey,
              targetStep: StepKeys.SolutionInterests,
            })
          }
          navigateBackFn={null}
          state={companySectorsState}
        />
      )}
      {stepKey === StepKeys.SolutionInterests && (
        <SolutionInterests
          isSubmitting={IsSubmitting}
          onChangeMissingSolutionValue={updateMissingSolutionValue}
          missingSolutionValue={missingSolutionValue}
          navigateForwardFn={
            isInvitationsStepEnabled
              ? () =>
                  navigateForward({
                    changeStepKey,
                    targetStep: StepKeys.Invitations,
                  })
              : onSubmit
          }
          navigateBackFn={
            isCompanySectorsStepEnabled
              ? () =>
                  navigateBack({
                    changeStepKey,
                    targetStep: StepKeys.CompanySectors,
                  })
              : null
          }
          onChangeSolutionTag={onChangeSolutionTag}
          solutionInterestsState={solutionInterestsState}
          isFinalStep={isInvitationsStepEnabled}
        />
      )}
      {stepKey === StepKeys.Invitations && (
        <Invitations
          navigateForwardFn={onSubmit}
          navigateBackFn={() =>
            navigateBack({
              changeStepKey,
              targetStep: StepKeys.SolutionInterests,
            })
          }
          invitations={invitations}
          updateInviteStatus={updateInviteStatus}
        />
      )}
    </StyledComponents.StepContainer>
  );
};
