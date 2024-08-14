import useTranslation from 'next-translate/useTranslation';
import { Text } from 'components/Text';
import { AlizarinCrimson, FunGreen, Scorpion } from 'styles/colours';
import { getNumberWithOrdinal } from 'utils/number';
import { getUserLocale } from 'utils/i18n';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export interface IProps {
  previousRank: number;
  currentRank: number;
  year: number;
}

export const getLabel = (rankVariance: number, previousRank: number) => {
  const { t } = useTranslation();
  const locale = getUserLocale();
  const previousRankDisplayValue = getNumberWithOrdinal(previousRank, locale);

  if (rankVariance !== 0) {
    return `${t('dashboard:you-were')} ${previousRankDisplayValue}`;
  }

  return t('dashboard:no-variation');
};

const getLabelColor = (previousRank: number, currentRank: number) => {
  if (
    previousRank > currentRank ||
    (previousRank === currentRank && currentRank === 1)
  ) {
    return FunGreen;
  }

  return AlizarinCrimson;
};

export const RankVariance = ({ previousRank, currentRank, year }: IProps) => {
  const { t } = useTranslation();
  const rankVariance = currentRank - previousRank;
  const label = getLabel(rankVariance, previousRank);
  const labelColor = getLabelColor(previousRank, currentRank);

  return (
    <Text size="14px" color={Scorpion} data-testid={selectors.rankVariance}>
      <StyledComponents.VariationInfo
        data-testid={selectors.rankVarianceInfo}
        as="span"
        color={labelColor}
      >
        {label}
      </StyledComponents.VariationInfo>{' '}
      {t('dashboard:in')} {year}
    </Text>
  );
};
