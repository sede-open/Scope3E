import useTranslation from 'next-translate/useTranslation';
import { EmptyState } from 'containers/Dashboard/Scope3Dashboard/EmptyState';
import { Scope3DashboardAllocationsQuery_emissionAllocations } from 'types/Scope3DashboardAllocationsQuery';
import { formatInteger } from 'utils/number';
import { PercentageBar } from 'containers/Dashboard/Scope3Dashboard/PercentageBar/PercentageBar';
import { sortSectorsByEmissionTotal } from '../utils';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  allocations: Scope3DashboardAllocationsQuery_emissionAllocations[];
  selectedYear: number;
  emissionsTotal: number | null;
}

export const Sectors = ({
  allocations,
  selectedYear,
  emissionsTotal,
}: IProps) => {
  const { t } = useTranslation();
  const scope3Value = emissionsTotal ?? 0;
  const allocationYear = allocations.find(({ year }) => year === selectedYear);
  const isAllocationsEmpty = allocations.length === 0 || !allocationYear;

  const sectorTabData = sortSectorsByEmissionTotal(allocations);

  return (
    <div data-testid={selectors.sectorsContainer}>
      {isAllocationsEmpty ? (
        <EmptyState
          title={t('scope3Dashboard:sectors-empty-state-title')}
          subtext={t('scope3Dashboard:sectors-empty-state-subtext')}
        />
      ) : (
        <StyledComponents.SectorDataWrapper>
          {sectorTabData.map((entry) => (
            <StyledComponents.RowContainer
              key={entry.primarySector}
              data-testid={selectors.sectorsRow}
            >
              <StyledComponents.TextOuterContainer>
                <StyledComponents.SectorName
                  data-testid={selectors.sectorsName}
                >
                  {t('scope3Dashboard:sector')} - {entry.primarySector}
                </StyledComponents.SectorName>
                <StyledComponents.TotalEmissions
                  data-testid={selectors.sectorsTotalEmissions}
                >
                  {formatInteger(Number(entry.emissions))}{' '}
                  {t('common:unit-mt-co2')}
                </StyledComponents.TotalEmissions>
              </StyledComponents.TextOuterContainer>
              <PercentageBar
                scope3Value={scope3Value}
                emissions={entry.emissions}
              />
            </StyledComponents.RowContainer>
          ))}
        </StyledComponents.SectorDataWrapper>
      )}
    </div>
  );
};
