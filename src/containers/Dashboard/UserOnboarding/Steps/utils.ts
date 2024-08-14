import { CompanySectorsQuery_companySectors } from 'types/CompanySectorsQuery';
import { CompanySectorType } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import {
  ONBOARDING_JOURNEY_NAVIGATED_BACK,
  ONBOARDING_JOURNEY_NAVIGATED_FORWARD,
} from 'utils/analyticsEvents';
import { StepKeys } from './constants';

export const navigateForward = ({
  changeStepKey,
  targetStep,
}: {
  changeStepKey: (stepKey: StepKeys) => void;
  targetStep: StepKeys;
}) => {
  changeStepKey(targetStep);

  trackEvent(ONBOARDING_JOURNEY_NAVIGATED_FORWARD, {
    targetStep: StepKeys[targetStep],
  });
};

export const navigateBack = ({
  changeStepKey,
  targetStep,
}: {
  changeStepKey: (stepKey: StepKeys) => void;
  targetStep: StepKeys;
}) => {
  changeStepKey(targetStep);

  trackEvent(ONBOARDING_JOURNEY_NAVIGATED_BACK, {
    targetStep: StepKeys[targetStep],
  });
};

export const getOptionalProp = (key: string, value: string) =>
  value === '' ? {} : { [key]: value };

export const isPrimaryCompanySectorUpdated = (
  companySectors: CompanySectorsQuery_companySectors[]
) => {
  const primaryCompanySector = companySectors.find(
    ({ sectorType }) => sectorType === CompanySectorType.PRIMARY
  );

  return primaryCompanySector
    ? Boolean(primaryCompanySector.hasBeenUpdated)
    : false;
};
