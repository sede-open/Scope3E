import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import { SortableTable } from 'components/SortableTable';
import {
  CarbonIntensityMetricType,
  CompaniesBenchmarkOrderBy,
} from 'types/globalTypes';
import { CompaniesBenchmarkQuery_companiesBenchmark_data as CompaniesBenchmark } from 'types/CompaniesBenchmarkQuery';
import { SortTypes } from 'components/SortableTable/types';
import { Link } from 'components/Link';
import { useRouter } from 'next/router';
import { getCompanySize } from 'containers/CompanyOverview/utils';
import { NetworkCell } from './NetworkCell';
import * as StyledComponents from './styles';
import * as selectors from '../selectors';
import { NotApplicable } from './NotApplicable';
import { headerNames } from '../constants';

type Props = {
  isLoading: boolean;
  companiesBenchmark: CompaniesBenchmark[];
  total: number;
  onPageChange: (page: number) => void;
  onSort: (column: CompaniesBenchmarkOrderBy, direction: SortTypes) => void;
  intensityMetric: CarbonIntensityMetricType;
};

export const BenchmarkTable = ({
  isLoading,
  companiesBenchmark,
  total,
  onPageChange,
  onSort,
  intensityMetric,
}: Props) => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const header = headerNames.map((columnName) => {
    const million =
      intensityMetric === CarbonIntensityMetricType.USD_OF_REVENUE
        ? t('carbonIntensity:million')
        : '';

    return {
      columnName,
      cell: t(`companyOverview:benchmarkHeader.${columnName}`, {
        intensityMetric: `${million} ${t(
          `carbonIntensity:${intensityMetric}`
        )}`.toUpperCase(),
      }),
      isSortable: true,
    };
  });

  const valueOrNotApplicable = (num: number | null) => {
    if (num === null) {
      return <NotApplicable />;
    }
    return num;
  };

  const getColouredNumber = (value: number | null) => {
    if (value === null) {
      return <NotApplicable />;
    }

    return (
      <StyledComponents.ColouredNumber $value={value}>
        {value}
        {value ? '%' : ''}
      </StyledComponents.ColouredNumber>
    );
  };

  const transformedData = companiesBenchmark.map((benchmark) => {
    const columns = [
      {
        columnName: CompaniesBenchmarkOrderBy.COMPANY_NAME,
        cell: (
          <NextLink href={`/company/${benchmark.companyId}`}>
            <Link href={`/company/${benchmark.companyId}`}>
              {benchmark.companyName}
            </Link>
          </NextLink>
        ),
      },
      {
        columnName: CompaniesBenchmarkOrderBy.ESTIMATED_NUMBER_OF_EMPLOYEES,
        cell: getCompanySize(benchmark.estimatedNumberOfEmployees, t),
      },
      {
        columnName: CompaniesBenchmarkOrderBy.BASELINE_YEAR,
        cell: valueOrNotApplicable(benchmark.baselineYear),
      },
      {
        columnName: CompaniesBenchmarkOrderBy.TOTAL_EMISSION_VARIANCE,
        cell: getColouredNumber(benchmark.totalEmissionVariance),
      },
      {
        columnName: CompaniesBenchmarkOrderBy.ANNUAL_EMISSION_VARIANCE,
        cell: getColouredNumber(benchmark.annualEmissionVariance),
      },
      {
        columnName: CompaniesBenchmarkOrderBy.CARBON_INTENSITY_RATIO,
        cell: valueOrNotApplicable(benchmark.emissionToIntensityRatio),
      },
      {
        columnName: CompaniesBenchmarkOrderBy.COMPANY_RELATIONSHIP,
        cell: (
          <NetworkCell
            companyName={benchmark.companyName}
            companyDuns={benchmark.companyDuns}
            relationshipType={benchmark.companyRelationshipType}
            relationshipStatus={benchmark.companyRelationshipStatus}
          />
        ),
      },
    ];
    return {
      rowName: benchmark.companyId,
      columns,
      isHighlighted: benchmark.companyId === query.id,
    };
  });

  return (
    <StyledComponents.TableContainer>
      <SortableTable<CompaniesBenchmarkOrderBy>
        serverMode
        hasLargePaddingLeft
        dataTestId={selectors.benchmarkTable}
        loading={isLoading}
        headers={header}
        rows={transformedData}
        defaultSortColumn={CompaniesBenchmarkOrderBy.ANNUAL_EMISSION_VARIANCE}
        size={total}
        onPageChange={onPageChange}
        onSort={onSort}
      />
    </StyledComponents.TableContainer>
  );
};
