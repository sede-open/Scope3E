import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import {
  getListString,
  getSelectedSolutionInterests,
  getSolutionInterestIds,
  getSolutionInterestNames,
} from 'utils/userOnboarding';

import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { EDIT_USER_DETAILS_SUBMITTED } from 'utils/analyticsEvents';
import { trackEvent } from 'utils/analytics';
import { TransText } from 'utils/TransText';
import { useCombinedSolutionInterestsQuery } from 'queries/userOnboarding';
import { useUpdateUserSolutionInterestsMutation } from 'mutations/userOnboarding';
import { CTAContainer } from 'components/CTAContainer';
import { ModalForm } from 'components/ModalForm';
import { TagListState } from 'components/TagList';
import Button from 'components/Button';
import Modal from 'components/Modal';

import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';
import { SolutionInterests } from './SolutionInterests';

export interface IProps {
  closeModal: () => void;
  hasIntroText?: boolean;
  translationPrefix?: string;
}

export const EditInterests = ({
  closeModal,
  hasIntroText,
  translationPrefix,
}: IProps) => {
  const { t } = useTranslation();

  const { company: userCompany } = useAuthenticatedUser();
  const companyId = userCompany?.id;

  if (!companyId) {
    return null;
  }

  const mutationOptions = {
    onError: () => {
      displayErrorMessage({
        title: t('common:toast-error-title'),
        subtitle: t('common:toast-error-subtitle'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t(
          `${translationPrefix}:edit-interests-form-toast-save-title-success`
        ),
        subtitle: t(
          `${translationPrefix}:edit-interests-form-toast-save-subtitle-success`
        ),
      });

      closeModal();
    },
  };

  // SolutionInterests
  const {
    data: combinedSolutionInterestsData,
    loading: isCombinedSolutionInterestsDataLoading,
  } = useCombinedSolutionInterestsQuery();

  const solutionInterests =
    combinedSolutionInterestsData?.solutionInterests || [];
  const userSolutionInterests =
    combinedSolutionInterestsData?.userSolutionInterests || [];

  const [solutionInterestsState, updateSolutionInterestsState] = useState<
    TagListState
  >({});

  const hasSelectedAnyTag = Object.keys(solutionInterestsState)
    .map((tagKey) => solutionInterestsState[tagKey])
    .some((tagValue: boolean) => tagValue);

  // Mutation
  const [
    updateUserSolutionInterests,
    { loading: isUpdateUserSolutionInterestsLoading },
  ] = useUpdateUserSolutionInterestsMutation(mutationOptions);

  const onSubmit = async () => {
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

    await updateUserSolutionInterests({
      variables: {
        input: {
          solutionInterestIds: selectedSolutionInterestIds,
        },
      },
    });

    trackEvent(EDIT_USER_DETAILS_SUBMITTED, {
      companyName: userCompany?.name,
      companyId,
      solutionInterests: getListString(selectedSolutionInterestNames),
    });
  };

  const isDisabled = !hasSelectedAnyTag;
  const isSubmitting = isUpdateUserSolutionInterestsLoading;
  const introText = t(
    `${translationPrefix}:edit-interests-form-intro`,
    {},
    { returnObjects: true }
  );

  return (
    <Modal isOpen onClose={closeModal}>
      <ModalForm
        dataTestId={selectors.editInterests}
        isLoading={isCombinedSolutionInterestsDataLoading}
        title={t('modals:edit-interests-form-title')}
        onSubmit={onSubmit}
      >
        {hasIntroText && (
          <StyledComponents.IntroText data-testid={selectors.introText}>
            {introText[0]}
            <br />
            <TransText
              text={introText[1]}
              components={{
                link: (
                  <StyledComponents.MailtoLink
                    href={`mailto:${t('modals:support-email')}`}
                    target="_blank"
                  />
                ),
              }}
            />
          </StyledComponents.IntroText>
        )}

        <StyledComponents.Columns>
          <SolutionInterests
            updateState={updateSolutionInterestsState}
            solutionInterests={solutionInterests}
            state={solutionInterestsState}
            userSolutionInterests={userSolutionInterests}
          />
        </StyledComponents.Columns>

        <CTAContainer>
          <Button
            width="auto"
            color="secondary"
            data-testid={selectors.editInterestsCancel}
            disabled={isSubmitting}
            onClick={closeModal}
          >
            {t('modals:cancel')}
          </Button>
          <Button
            width="auto"
            type="submit"
            color="primary"
            data-testid={selectors.editInterestsSubmit}
            disabled={isDisabled}
          >
            {t('modals:save-changes')}
          </Button>
        </CTAContainer>
      </ModalForm>
    </Modal>
  );
};

EditInterests.defaultProps = {
  hasIntroText: false,
  translationPrefix: 'common',
};
