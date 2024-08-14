import useTranslation from 'next-translate/useTranslation';
import * as StyledComponents from './styledComponents';

export const Statistics = () => {
  const { t } = useTranslation('publicHome');
  return (
    <StyledComponents.StatisticsBackground>
      <StyledComponents.StatisticsBlock>
        <StyledComponents.StatisticsNumber>
          24,000
        </StyledComponents.StatisticsNumber>
        <StyledComponents.StatisticsMetric>
          {t('suppliers')}
        </StyledComponents.StatisticsMetric>
      </StyledComponents.StatisticsBlock>
      <StyledComponents.StatisticsBlock>
        <StyledComponents.StatisticsNumber>
          ~150
        </StyledComponents.StatisticsNumber>
        <StyledComponents.StatisticsMetric>
          {t('companiesMonth')}
        </StyledComponents.StatisticsMetric>
      </StyledComponents.StatisticsBlock>
      <StyledComponents.StatisticsBlock>
        <StyledComponents.StatisticsNumber>
          10,720
        </StyledComponents.StatisticsNumber>
        <StyledComponents.StatisticsMetric>
          {t('millionTonsCO2')}
        </StyledComponents.StatisticsMetric>
      </StyledComponents.StatisticsBlock>
      <StyledComponents.StatisticsBlock>
        <StyledComponents.StatisticsNumber>
          70%
        </StyledComponents.StatisticsNumber>
        <StyledComponents.StatisticsMetric>
          {t('usersSettingTargets')}
        </StyledComponents.StatisticsMetric>
      </StyledComponents.StatisticsBlock>
    </StyledComponents.StatisticsBackground>
  );
};
