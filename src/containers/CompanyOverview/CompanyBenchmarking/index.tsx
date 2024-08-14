import { useEffect, useState } from 'react';
import { SortTypes } from 'components/SortableTable/types';
import {
  CarbonIntensityMetricType,
  CarbonIntensityType,
  CompaniesBenchmarkOrderBy,
  OrderBy,
} from 'types/globalTypes';
import { useCompaniesBenchmarkLazyQuery } from '../queries';
import { BenchmarkHeader } from './BenchmarkHeader';
import { BenchmarkTable } from './BenchmarkTable';
import * as StyledComponents from './styles';
import { initBenchmarkQueryVars } from './constants';

type Props = {
  companyId: string;
};
export const CompanyBenchmarking = ({ companyId }: Props) => {
  const [offset, setOffset] = useState(initBenchmarkQueryVars.offset);
  const [orderBy, setOrderBy] = useState(initBenchmarkQueryVars.orderBy);
  const [order, setOrder] = useState(initBenchmarkQueryVars.order);
  const [intensityMetric, setIntensityMetric] = useState(
    initBenchmarkQueryVars.intensityMetric
  );
  const [intensityType, setIntensityType] = useState(
    initBenchmarkQueryVars.intensityType
  );

  const [
    fetchCompaniesBenchmark,
    { data = { companiesBenchmark: { total: 0, data: [] } }, loading },
  ] = useCompaniesBenchmarkLazyQuery();

  useEffect(() => {
    const input = {
      selectedCompanyId: companyId,
      limit: initBenchmarkQueryVars.limit,
      offset,
      intensityMetric,
      intensityType,
      order,
      orderBy,
    };
    fetchCompaniesBenchmark({
      variables: {
        input,
      },
    });
  }, [
    companyId,
    initBenchmarkQueryVars.limit,
    offset,
    orderBy,
    order,
    intensityMetric,
    intensityType,
  ]);

  const handlePageChange = (page: number) => {
    setOffset((page - 1) * initBenchmarkQueryVars.limit);
  };
  const handleSort = (
    column: CompaniesBenchmarkOrderBy,
    direction: SortTypes
  ) => {
    const newOrder = direction === SortTypes.ASC ? OrderBy.ASC : OrderBy.DESC;
    setOffset(0);
    setOrderBy(column);
    setOrder(newOrder);
  };

  const handleSelect = (
    metric: CarbonIntensityMetricType,
    type: CarbonIntensityType
  ) => {
    setOffset(0);
    setIntensityMetric(metric);
    setIntensityType(type);
  };

  return (
    <StyledComponents.BenchmarkingContainer>
      <BenchmarkHeader onSelect={handleSelect} />
      <BenchmarkTable
        isLoading={loading}
        companiesBenchmark={data.companiesBenchmark.data}
        total={data.companiesBenchmark.total}
        onPageChange={handlePageChange}
        onSort={handleSort}
        intensityMetric={intensityMetric}
      />
    </StyledComponents.BenchmarkingContainer>
  );
};
