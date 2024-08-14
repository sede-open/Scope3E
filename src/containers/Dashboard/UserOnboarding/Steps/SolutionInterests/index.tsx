import useTranslation from 'next-translate/useTranslation';

import { TagList, TagListState } from 'components/TagList';
import { TextareaField } from 'components/Form/Fields/TextareaField';

import * as selectors from '../../selectors';
import * as StyledComponents from '../styledComponents';

interface IProps {
  isSubmitting: boolean;
  missingSolutionValue: string;
  navigateBackFn: (() => void) | null;
  navigateForwardFn: (() => void) | any;
  onChangeSolutionTag: (tagKey: string, value: boolean) => void;
  onChangeMissingSolutionValue: (value: string) => void;
  solutionInterestsState: TagListState;
  isFinalStep: boolean;
}

const MISSING_SOLUTION_ID = 'missing-solution';
const MAX_MISSING_SOLUTION_LENGTH = 50;

export const SolutionInterests = ({
  isSubmitting,
  missingSolutionValue,
  navigateBackFn,
  navigateForwardFn,
  onChangeSolutionTag,
  onChangeMissingSolutionValue,
  solutionInterestsState,
  isFinalStep,
}: IProps) => {
  const { t } = useTranslation();

  const hasSelectedAnyTag = Object.keys(solutionInterestsState)
    .map((tagKey) => solutionInterestsState[tagKey])
    .some((tagValue: boolean) => tagValue);

  const isSubmitDisabled = !hasSelectedAnyTag || isSubmitting;

  const getSubmitButtonTitle = isFinalStep
    ? t('userOnboarding:solution-interests-submit')
    : t('userOnboarding:onboarding-submit');

  return (
    <>
      <StyledComponents.UserOnboardingCardIntersets>
        <StyledComponents.StepTitle
          data-testid={selectors.userSolutionInterestsStep}
        >
          {t('userOnboarding:solution-interests-title')}
        </StyledComponents.StepTitle>
        <StyledComponents.StepIntro>
          {t('userOnboarding:solution-interests-intro')}
        </StyledComponents.StepIntro>

        <StyledComponents.TagListContainer>
          <TagList
            tagListState={solutionInterestsState}
            onChange={onChangeSolutionTag}
            translationPrefix="solutionInterests:"
          />
        </StyledComponents.TagListContainer>

        <TextareaField
          dataTestId={selectors.missingSolutionTextarea}
          hasCharacterCount
          id={MISSING_SOLUTION_ID}
          isOptional
          label={t('userOnboarding:missing-solution-interest')}
          maxLength={MAX_MISSING_SOLUTION_LENGTH}
          name={MISSING_SOLUTION_ID}
          onChange={onChangeMissingSolutionValue}
          rows={1}
          value={missingSolutionValue}
        />

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
            disabled={isSubmitDisabled}
            onClick={navigateForwardFn}
          >
            {getSubmitButtonTitle}
          </StyledComponents.NextButton>
        </StyledComponents.StepNavigation>
      </StyledComponents.UserOnboardingCardIntersets>
    </>
  );
};
