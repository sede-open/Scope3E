import useTranslation from 'next-translate/useTranslation';
import { formatInteger } from 'utils/number';
import { EmptyState } from 'containers/Dashboard/Scope3Dashboard/EmptyState';
import { Scope3DashboardAllocationsQuery_emissionAllocations } from 'types/Scope3DashboardAllocationsQuery';
import { PercentageBar } from 'containers/Dashboard/Scope3Dashboard/PercentageBar/PercentageBar';
import { getCategoryName, sortCategoriesByEmissionTotal } from '../utils';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  allocations: Scope3DashboardAllocationsQuery_emissionAllocations[];
  selectedYear: number;
  emissionsTotal: number | null;
}

export const Categories = ({
  allocations,
  selectedYear,
  emissionsTotal,
}: IProps) => {
  const { t } = useTranslation();
  const scope3Value = emissionsTotal ?? 0;
  const allocationYear = allocations.find(({ year }) => year === selectedYear);
  const isAllocationsEmpty = allocations.length === 0 || !allocationYear;

  const categoriesTabData = sortCategoriesByEmissionTotal(allocations);

  return (
    <div data-testid={selectors.categoriesContainer}>
      {isAllocationsEmpty ? (
        <EmptyState
          title={t('scope3Dashboard:categories-empty-state-title')}
          subtext={t('scope3Dashboard:categories-empty-state-subtext')}
        />
      ) : (
        <StyledComponents.CategoryDataWrapper>
          {categoriesTabData.map((entry) => (
            <StyledComponents.RowContainer
              data-testid={selectors.categoriesRow}
              key={entry.category?.id}
            >
              <StyledComponents.TextOuterContainer>
                <StyledComponents.TextInnerContainer>
                  <StyledComponents.CategoryOrder>
                    {t('scope3Dashboard:category')} {entry.category?.order} -
                  </StyledComponents.CategoryOrder>
                  <StyledComponents.CategoryName
                    data-testid={selectors.categoriesName}
                  >
                    {getCategoryName(t, entry.category?.systemName)}
                  </StyledComponents.CategoryName>
                </StyledComponents.TextInnerContainer>
                <StyledComponents.TotalEmissions
                  data-testid={selectors.categoriesTotalEmissions}
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
        </StyledComponents.CategoryDataWrapper>
      )}
    </div>
  );
};
