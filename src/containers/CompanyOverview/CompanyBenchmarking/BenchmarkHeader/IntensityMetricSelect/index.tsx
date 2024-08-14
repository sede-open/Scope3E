import { useState, useEffect } from 'react';
import { SingleSelect } from 'components/SingleSelect';
import { getCarbonIntensityMetricOptions } from 'containers/Modals/CorporateEmissionForm/CarbonIntensities/utils';
import { useCarbonIntensityConfig } from 'effects/useCarbonIntensityConfig';
import useTranslation from 'next-translate/useTranslation';
import {
  CarbonIntensityMetricType,
  CarbonIntensityType,
} from 'types/globalTypes';
import * as StyledComponents from '../styles';

type IntensityOption = {
  label: string;
  value: string;
};

type Props = {
  onSelect(
    intensityMetric: CarbonIntensityMetricType,
    intensityType: CarbonIntensityType
  ): void;
};

export const IntensityMetricSelect = ({ onSelect }: Props) => {
  const { t } = useTranslation();
  const ESTIMATED = '(estimated)';
  const [intensityMetric, setIntensityMetric] = useState<IntensityOption>({
    label: t(
      `carbonIntensity:${CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES}`
    ),
    value: `${CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES}${ESTIMATED}`,
  });

  useEffect(() => {
    if (intensityMetric.value.endsWith(ESTIMATED)) {
      const metric = intensityMetric.value.slice(0, 0 - ESTIMATED.length);
      onSelect(
        metric as CarbonIntensityMetricType,
        CarbonIntensityType.ESTIMATED
      );
    } else {
      onSelect(
        intensityMetric.value as CarbonIntensityMetricType,
        CarbonIntensityType.USER_SUBMITTED
      );
    }
  }, [intensityMetric, ESTIMATED]);

  const handleSelect = (value: { label?: string; value?: string }) => {
    if (typeof value.label === 'string' && typeof value.value === 'string') {
      setIntensityMetric(value as IntensityOption);
    }
  };

  const carbonIntensityConfig = useCarbonIntensityConfig();
  const carbonIntensityOptions = getCarbonIntensityMetricOptions(
    carbonIntensityConfig,
    t,
    []
  );

  const estimatedCarbonIntensities = {
    label: t('carbonIntensity:estimated'),
    options: [
      {
        label: t(
          `carbonIntensity:${CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES}`
        ),
        value: `${CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES}${ESTIMATED}`,
      },
      {
        label: t(`carbonIntensity:${CarbonIntensityMetricType.USD_OF_REVENUE}`),
        value: `${CarbonIntensityMetricType.USD_OF_REVENUE}${ESTIMATED}`,
      },
    ],
  };

  return (
    <>
      <StyledComponents.IntensityDropdownLabel>
        {t('companyOverview:intensityDropdownLabel')}
      </StyledComponents.IntensityDropdownLabel>
      <SingleSelect
        name="carbon-intensity-metrics"
        options={[estimatedCarbonIntensities, ...carbonIntensityOptions]}
        onChange={handleSelect}
        value={intensityMetric}
      />
    </>
  );
};
