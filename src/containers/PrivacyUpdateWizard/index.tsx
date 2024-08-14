import { useMemo, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { UnexpectedError } from 'containers/UnexpectedError';
import Icon from 'components/Icon';
import { InfoAlert } from 'components/InfoAlert';
import { ProgressBar } from 'components/ProgressBar';
import RedirectTo from 'components/RedirectTo';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import CogSpinner from 'components/CogSpinner';

import { EntityTypeHeader } from './EntityTypeHeader';
import { DataPrivacyWizardSteps } from './types';
import { useDataPrivacyWizardData } from './queries';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';
import {
  calculateProgressPercentage,
  dataPrivacyAbsoluteTargetToAbsoluteStepData,
  dataPrivacyCorporateEmissionToEmissionStepData,
  dataPrivacyIntensityTargetToIntensityStepData,
  filterEmissionsMissingCorporateEmissionAccess,
  filterTargetsMissingPrivacyType,
  getNumberOfRequiredStepsFromNumMissingTargets,
} from './utils';
import { ActiveStep } from './ActiveStep';

const companyDataPrivacyCompletenessDefaults = {
  isComplete: true,
  numCorporateEmissionAccessMissing: 0,
  numIntensityTargetPrivacyTypeMissing: 0,
  numAbsoluteTargetPrivacyTypeMissing: 0,
};

export const PrivacyUpdateWizard = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const user = useAuthenticatedUser();
  const companyId: string = user?.company?.id;
  if (!companyId) {
    return null;
  }
  if (!user.canSubmitDataPrivacyInfo) {
    return <RedirectTo url="/forbidden" />;
  }

  const [stepIndex, setStepIndex] = useState(0);

  const { data, error } = useDataPrivacyWizardData({ companyId });

  const {
    isComplete,
    numCorporateEmissionAccessMissing,
    numIntensityTargetPrivacyTypeMissing,
    numAbsoluteTargetPrivacyTypeMissing,
  } =
    data?.companyDataPrivacyCompleteness ??
    companyDataPrivacyCompletenessDefaults;

  const steps: DataPrivacyWizardSteps[] = useMemo(() => {
    const emissions = (data?.corporateEmissions ?? [])
      .filter(filterEmissionsMissingCorporateEmissionAccess)
      .map(dataPrivacyCorporateEmissionToEmissionStepData);

    const absoluteTargets = (data?.targets?.absolute ?? [])
      .filter(filterTargetsMissingPrivacyType)
      .map(dataPrivacyAbsoluteTargetToAbsoluteStepData);

    const intensityTargets = (data?.targets?.intensity ?? [])
      .filter(filterTargetsMissingPrivacyType)
      .map(dataPrivacyIntensityTargetToIntensityStepData);

    return [...emissions, ...absoluteTargets, ...intensityTargets];
  }, [data]);

  if (!steps) {
    return <CogSpinner />;
  }

  const activeStep = steps[stepIndex];

  if (error) {
    return <UnexpectedError errorMessage={error.message} />;
  }

  if (isComplete) {
    return <RedirectTo url="/dashboard" />;
  }

  const totalNumStepsToComplete =
    numCorporateEmissionAccessMissing +
    getNumberOfRequiredStepsFromNumMissingTargets(
      numAbsoluteTargetPrivacyTypeMissing
    ) +
    getNumberOfRequiredStepsFromNumMissingTargets(
      numIntensityTargetPrivacyTypeMissing
    );

  const onBackClick = () => {
    setStepIndex(stepIndex - 1);
  };

  const onNextClick = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      router.push({
        pathname: '/dashboard',
        query: { refetch: true },
      });
    }
  };

  return (
    <>
      <StyledComponents.ProgressBarContainer>
        <ProgressBar
          dataTestId={selectors.progressBar}
          percentage={calculateProgressPercentage(
            stepIndex,
            totalNumStepsToComplete
          )}
        />
      </StyledComponents.ProgressBarContainer>
      <StyledComponents.WizardContainer>
        <StyledComponents.HeaderContainer>
          {steps.length > 0 && (
            <EntityTypeHeader entityType={steps[stepIndex].stepType} />
          )}
          <StyledComponents.CloseButtonContainer>
            <Link href="/dashboard" passHref>
              <StyledComponents.CloseButton type="button" as="a">
                <Icon src="/cross.svg" alt="Close window" size={36} />
              </StyledComponents.CloseButton>
            </Link>
          </StyledComponents.CloseButtonContainer>
        </StyledComponents.HeaderContainer>
        <StyledComponents.WizardBodyContainer>
          <StyledComponents.FormContainer>
            <ActiveStep
              companyId={companyId}
              step={activeStep}
              onBackClick={onBackClick}
              onNextClick={onNextClick}
              isFirstStep={stepIndex === 0}
              isFinalStep={stepIndex === steps.length - 1}
            />
          </StyledComponents.FormContainer>
          <StyledComponents.InfoBox>
            <InfoAlert
              selectorPrefix="data-privacy-wizard"
              title={t(`dataPrivacyWizard:info-alert-title`)}
              paragraphs={t(
                `dataPrivacyWizard:info-alert-paragraphs`,
                {},
                { returnObjects: true }
              )}
            />
          </StyledComponents.InfoBox>
        </StyledComponents.WizardBodyContainer>
      </StyledComponents.WizardContainer>
    </>
  );
};
