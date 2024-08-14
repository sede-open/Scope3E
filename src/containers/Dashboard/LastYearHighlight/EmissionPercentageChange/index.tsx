import useTranslation from 'next-translate/useTranslation';

import { Text } from 'components/Text';
import { FunGreen, Scorpion, AlizarinCrimson } from 'styles/colours';

import * as StyledComponents from '../styledComponents';
import * as selectors from '../selectors';

export interface IProps {
  lastYearEmissionValue: number;
  historicYearEmissionValue: number;
  historicYear: number;
}

const DEFAULT_PERCENTAGE_VALUE = 0;

export const EmissionPercentageChange = ({
  lastYearEmissionValue,
  historicYearEmissionValue,
  historicYear,
}: IProps) => {
  const { t } = useTranslation();
  const percentageValue = Math.round(
    ((historicYearEmissionValue - lastYearEmissionValue) /
      historicYearEmissionValue) *
      100
  );

  if (!lastYearEmissionValue || !historicYearEmissionValue) {
    return null;
  }

  return (
    <StyledComponents.StyledWrapper data-testid={selectors.highlightChange}>
      <StyledComponents.PercentageChangeStatus>
        {percentageValue < DEFAULT_PERCENTAGE_VALUE ? (
          <StyledComponents.StyledText
            data-testid={selectors.highlightIncrease}
            color={AlizarinCrimson}
          >
            {Math.abs(percentageValue)}
            {'% '}
            {t('dashboard:highlight-last-year-increase')}
          </StyledComponents.StyledText>
        ) : (
          <StyledComponents.StyledText
            data-testid={selectors.highlightDecrease}
            color={percentageValue === 0 ? AlizarinCrimson : FunGreen}
          >
            {percentageValue}
            {'% '}
            {t('dashboard:highlight-last-year-decrease')}
          </StyledComponents.StyledText>
        )}
      </StyledComponents.PercentageChangeStatus>
      <Text color={Scorpion} data-testid={selectors.highlightYear}>
        {t('dashboard:highlight-last-year-from')} {historicYear}
      </Text>
    </StyledComponents.StyledWrapper>
  );
};
