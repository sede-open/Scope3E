import useTranslation from 'next-translate/useTranslation';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { Ranking } from 'components/Glyphs/Ranking';
import { Text } from 'components/Text';
import { Scorpion } from 'styles/colours';
import { useCompanyReductionRank } from 'containers/Dashboard/queries';
import { getNumberWithOrdinal } from 'utils/number';
import { getUserLocale } from 'utils/i18n';
import { RankVariance } from './RankVariance';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export interface IProps {
  lastYear: number;
}

export const RankHighlight = ({ lastYear }: IProps) => {
  const { t } = useTranslation();

  const { company } = useAuthenticatedUser();

  if (!company) {
    return null;
  }

  const previousYear = lastYear - 1;
  const { data } = useCompanyReductionRank({
    companyId: company.id,
    year: lastYear,
    previousYear,
  });

  const currentRank = data?.currentRank?.rank;
  const previousRank = data?.previousRank?.rank;
  const locale = getUserLocale();
  const rankDisplayValue = currentRank
    ? getNumberWithOrdinal(currentRank, locale)
    : '-';

  return (
    <StyledComponents.Container data-testid={selectors.highlightRank}>
      <Ranking />
      <StyledComponents.Information>
        <Text data-testid={selectors.highlightRankYear} color={Scorpion}>
          {t('dashboard:highlight-supplier-rank')} {lastYear}
        </Text>
        <StyledComponents.RankValue data-testid={selectors.highlightRankValue}>
          {rankDisplayValue}
        </StyledComponents.RankValue>
        {previousRank && previousYear && currentRank && (
          <RankVariance
            previousRank={previousRank}
            year={previousYear}
            currentRank={currentRank}
          />
        )}
      </StyledComponents.Information>
    </StyledComponents.Container>
  );
};
