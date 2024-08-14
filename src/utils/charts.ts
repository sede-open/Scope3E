import { EmissionChartData } from 'components/EmissionsComposedChart/utils';
import { TargetChartData } from './emissions';
import { IEAChartData } from './iea';

export const getYAxisHighestPoint = ({
  actualEmissions = [],
  ieaData = [],
  targetData = [],
}: {
  actualEmissions?: EmissionChartData[];
  ieaData?: IEAChartData[];
  targetData?: TargetChartData[];
}) => {
  let emissionsHighestPoint = 0;
  actualEmissions.forEach((emission) => {
    if (
      emission.grossEmissions &&
      emission.grossEmissions > emissionsHighestPoint
    ) {
      emissionsHighestPoint = emission.grossEmissions;
    }
  });

  let ieaHighestPoint = 0;
  ieaData.forEach((ieaDataPoint) => {
    if (
      ieaDataPoint.iea &&
      ieaDataPoint.iea[1] &&
      ieaDataPoint.iea[1] > ieaHighestPoint
    ) {
      [, ieaHighestPoint] = ieaDataPoint.iea;
    }
  });

  let targetHighestPoint = 0;
  targetData.forEach((target) => {
    if (
      target.totalTargetEmission &&
      target.totalTargetEmission > targetHighestPoint
    ) {
      targetHighestPoint = target.totalTargetEmission;
    }
  });

  const highestPoint = Math.max(
    emissionsHighestPoint,
    ieaHighestPoint,
    targetHighestPoint
  );

  return Math.ceil(highestPoint);
};

export function findByYear(
  this: { year: number },
  { year: dataYear }: Partial<{ year: number }>
) {
  return dataYear === this.year;
}
