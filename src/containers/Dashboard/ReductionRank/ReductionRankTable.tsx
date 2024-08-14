import useTranslation from 'next-translate/useTranslation';

import { ReductionRankQuery_corporateEmissionRanks as Rank } from 'types/ReductionRankQuery';
import { TH } from 'layouts/Table';
import { EmptyComponent } from 'components/EmptyComponent';
import Icon from 'components/Icon';

import { ReductionRankRow } from './ReductionRankRow';
import { ReductionRankLoader } from './ReductionRankLoader';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  ranks: Rank[];
  companyName: string;
  isLoading: boolean;
}

export const ReductionRankTable = ({
  ranks,
  companyName,
  isLoading,
}: IProps) => {
  const { t } = useTranslation();

  const tableHeaders = [
    t('emissionRankTable:table-header-rank'),
    t('emissionRankTable:table-header-company'),
    t('emissionRankTable:table-header-sector'),
    t('emissionRankTable:table-header-reduction'),
    t('emissionRankTable:table-header-data-verified'),
  ];

  return (
    <>
      <StyledComponents.Scroll>
        {isLoading || ranks.length > 0 ? (
          <StyledComponents.StyledTable>
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <TH align="left" key={header}>
                    {header}
                  </TH>
                ))}
              </tr>
            </thead>

            {isLoading && (
              <ReductionRankLoader columnLength={tableHeaders.length} />
            )}

            {!isLoading && (
              <tbody data-testid={selectors.rankTableBody}>
                {ranks.map((rank, index) => {
                  const rowsToRender = [
                    <ReductionRankRow
                      key={rank.id}
                      rank={rank}
                      companyName={companyName}
                      index={index + 1}
                    />,
                  ];
                  return rowsToRender;
                })}
              </tbody>
            )}
          </StyledComponents.StyledTable>
        ) : (
          <EmptyComponent
            dataTestId={selectors.rankTableEmpty}
            title={t('emissionRankTable:empty-state-title')}
            message={t('emissionRankTable:empty-state-message')}
          />
        )}
      </StyledComponents.Scroll>

      <StyledComponents.InfoContainer>
        <StyledComponents.InfoImage>
          <Icon
            alt="Information icon"
            src="/info-blue-outline.svg"
            size="24px"
          />
        </StyledComponents.InfoImage>
        <StyledComponents.InfoText>
          {t('emissionRankTable:explanation-text')}
        </StyledComponents.InfoText>
      </StyledComponents.InfoContainer>
    </>
  );
};
