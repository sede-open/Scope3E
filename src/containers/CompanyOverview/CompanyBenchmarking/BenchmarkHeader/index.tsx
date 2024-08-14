import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { TextAction } from 'components/Text';
import {
  CarbonIntensityMetricType,
  CarbonIntensityType,
} from 'types/globalTypes';
import * as StyledComponents from './styles';
import { ReadMoreModal } from './ReadMoreModal';
import { IntensityMetricSelect } from './IntensityMetricSelect';
import * as selectors from '../selectors';

export type Props = {
  onSelect(
    intensityMetric: CarbonIntensityMetricType,
    intensityType: CarbonIntensityType
  ): void;
};

export const BenchmarkHeader = ({ onSelect }: Props) => {
  const { t } = useTranslation('companyOverview');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledComponents.BenchmarkHeaderContainer>
        <StyledComponents.BenchmarkTitle>
          {t('benchmarkHeaderTitle')}
        </StyledComponents.BenchmarkTitle>
        <StyledComponents.BenchmarkSubtitle>
          {t('benchmarkHeaderSubtitle')}
        </StyledComponents.BenchmarkSubtitle>
        <StyledComponents.BenchmarkHeaderFlex>
          <StyledComponents.BenchmarkDescriptionSection>
            <StyledComponents.BenchmarkDescription>
              {t('benchmarkHeaderDescription')}{' '}
              <TextAction
                data-testid={selectors.readMoreBtn}
                onClick={() => setIsOpen(true)}
              >
                {t('benchmarkHeaderReadMore')}
              </TextAction>
            </StyledComponents.BenchmarkDescription>
          </StyledComponents.BenchmarkDescriptionSection>
          <StyledComponents.IntensityDropdownSection>
            <IntensityMetricSelect onSelect={onSelect} />
          </StyledComponents.IntensityDropdownSection>
        </StyledComponents.BenchmarkHeaderFlex>
      </StyledComponents.BenchmarkHeaderContainer>
      <ReadMoreModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
