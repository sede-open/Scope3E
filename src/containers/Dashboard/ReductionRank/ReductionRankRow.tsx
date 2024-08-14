import useTranslation from 'next-translate/useTranslation';

import { Text } from 'components/Text';
import { Scorpion, FunGreen, AlizarinCrimson } from 'styles/colours';
import { ReductionRankType } from 'types/globalTypes';
import { ReductionRankQuery_corporateEmissionRanks as Rank } from 'types/ReductionRankQuery';
import { TD } from 'layouts/Table';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export const NAME_PLACEHOLDER = '*************';

interface IProps {
  rank: Rank;
  companyName: string;
  index: number;
}

export const ReductionRankRow = ({ rank, companyName, index }: IProps) => {
  const { t } = useTranslation();

  const { primarySector } = rank;

  const isSelected = rank.rankType === ReductionRankType.SELECTED;
  const isDataVerified =
    rank.hasVerificationFile && rank.hasPreviousYearVerificationFile;

  const reductionPercentageValue =
    Math.round(rank.reductionPercentage * 100) / 100;
  const positivePercentage =
    reductionPercentageValue === 0 ? (
      <Text color={Scorpion}>{reductionPercentageValue}%</Text>
    ) : (
      <Text color={AlizarinCrimson}>+{reductionPercentageValue}%</Text>
    );
  const reductionPercentage =
    reductionPercentageValue < 0 ? (
      <Text color={FunGreen}>{reductionPercentageValue}%</Text>
    ) : (
      positivePercentage
    );

  return (
    <StyledComponents.Tr
      key={rank.id}
      data-testid={selectors.getRankTableRow(rank.id)}
      isSelected={isSelected}
    >
      <TD data-testid={selectors.rankTableRowRank}>
        <b>
          {'# '}
          {index}
        </b>
      </TD>
      <TD data-testid={selectors.rankTableRowCompany}>
        <b>
          {isSelected ? (
            companyName
          ) : (
            <Text color={Scorpion}>{NAME_PLACEHOLDER}</Text>
          )}
        </b>
      </TD>
      <TD data-testid={selectors.rankTableRowSector}>
        {primarySector ?? '---'}
      </TD>
      <TD data-testid={selectors.rankTableRowReductionPercentage}>
        {reductionPercentage}
      </TD>
      <TD data-testid={selectors.rankTableDataVerificationSector}>
        {isDataVerified
          ? t('emissionRankTable:is-data-verified-yes')
          : t('emissionRankTable:is-data-verified-no')}
      </TD>
    </StyledComponents.Tr>
  );
};
