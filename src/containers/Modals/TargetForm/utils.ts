import { FieldError } from 'react-hook-form';
import moment from 'moment';

import { SaveTargetsTargetInstance, TargetType } from 'types/globalTypes';
import { OptionType } from 'components/SingleSelect';
import {
  AbsoluteFormValues,
  FIELD_KEYS,
  IncludeCarbonOffsetStatus,
  IntensityFormValues,
} from './types';

export const getErrorMessage = (t: any, fieldError?: FieldError) => {
  if (fieldError?.ref?.name.endsWith(FIELD_KEYS.INTENSITY_METRIC)) {
    switch (fieldError?.type) {
      case 'required':
        return t('form:intensity-metric-error-required');
      default:
        return '';
    }
  }
  if (fieldError?.ref?.name.endsWith(FIELD_KEYS.INCLUDE_CARBON_OFFSET)) {
    switch (fieldError?.type) {
      case 'required':
        return t('form:include-carbon-offset-error-required');
      default:
        return '';
    }
  }
  if (fieldError?.ref?.name.endsWith(FIELD_KEYS.STRATEGY)) {
    switch (fieldError?.type) {
      case 'required':
        return t('form:strategy-error-required');
      default:
        return '';
    }
  }
  switch (fieldError?.type) {
    case 'required':
      return t('form:error-required');
    case 'maxPercentage':
      return t('form:error-max-percentage');
    case 'scope3HasBeenSet':
      return t('form:scope-3-reduction-required');
    default:
      return '';
  }
};

export const getTargetYearOptions = () => {
  const startYear = moment().add(1, 'year').year();
  const endYear = moment().year(startYear).add(40, 'year').year();

  const yearOptions: OptionType[] = [];
  for (let i = startYear; i <= endYear; i += 1) {
    yearOptions.push({ value: i, label: i });
  }

  return yearOptions;
};

function instanceOfIntensityFormValues(
  object: AbsoluteFormValues | IntensityFormValues
): object is IntensityFormValues {
  return 'intensityMetric' in object;
}

export const getTargetDataForSaving = <
  T extends AbsoluteFormValues | IntensityFormValues
>(
  targets: T[],
  targetType: TargetType
): SaveTargetsTargetInstance[] => {
  return targets.reduce<SaveTargetsTargetInstance[]>(
    (acc: SaveTargetsTargetInstance[], cur: T): SaveTargetsTargetInstance[] => {
      if (
        !cur.strategy ||
        !cur.scope1And2Year?.value ||
        !cur.scope1And2Reduction ||
        !cur.scope1And2PrivacyType
      ) {
        return acc;
      }

      const includeCarbonOffset =
        cur.includeCarbonOffset === IncludeCarbonOffsetStatus.INCLUDED;

      const scope3Reduction =
        typeof cur.scope3Reduction === 'number' ? cur.scope3Reduction : null;
      const scope3Year = cur.scope3Year?.value || null;

      const intensityMetric = instanceOfIntensityFormValues(cur)
        ? cur.intensityMetric?.value
        : undefined;

      return [
        ...acc,
        {
          strategy: cur.strategy,
          scope1And2Year: cur.scope1And2Year.value,
          scope1And2Reduction: cur.scope1And2Reduction,
          scope3Year,
          scope3Reduction,
          targetType,
          includeCarbonOffset,
          intensityMetric,
          scope1And2PrivacyType: cur.scope1And2PrivacyType,
          scope3PrivacyType: cur.scope3PrivacyType,
        },
      ];
    },
    []
  );
};
