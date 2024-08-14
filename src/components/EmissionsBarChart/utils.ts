import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { TargetChartData } from 'utils/emissions';

export const emissionsBarStackId = 'emissionsBarStack';
export const targetBarStackId = 'targetBarStack';
export const chartStackOffsetType = 'sign';

export enum EmissionsBarChartKeys {
  SCOPE1 = 'scope1',
  SCOPE2 = 'scope2',
  SCOPE3 = 'scope3',
  OFFSET = 'offset',
  SCOPE1_2_TARGET_EMISSION = 'scope1And2TargetEmission',
  SCOPE3_TARGET_EMISSION = 'scope3TargetEmission',
  TOTAL_TARGET_EMISSION = 'totalTargetEmission',
  YEAR = 'year',
}

export type EmissionsOverviewBarChartData = {
  [EmissionsBarChartKeys.YEAR]?: number;
  [EmissionsBarChartKeys.SCOPE1]?: number;
  [EmissionsBarChartKeys.SCOPE2]?: number;
  [EmissionsBarChartKeys.SCOPE3]?: number;
  [EmissionsBarChartKeys.OFFSET]?: number;
};

export const getBarChartEmissionsData = (
  emissions: Emission[]
): EmissionsOverviewBarChartData[] =>
  emissions.map((emission) => {
    // offset value to be displayed as a negative value on bar chart
    const reversedOffsetValue = emission.offset && emission.offset * -1;

    return {
      [EmissionsBarChartKeys.YEAR]: emission.year,
      [EmissionsBarChartKeys.SCOPE1]: emission.scope1,
      [EmissionsBarChartKeys.SCOPE2]: emission.scope2,
      [EmissionsBarChartKeys.SCOPE3]: emission.scope3 ?? undefined,
      [EmissionsBarChartKeys.OFFSET]: reversedOffsetValue ?? undefined,
    };
  });

export const mergeEmissionsAndTargetData = (
  barChartTargetData: TargetChartData[],
  barChartEmissionsData: EmissionsOverviewBarChartData[]
) => {
  const mergedData = barChartTargetData.map((targetData) => {
    const emissionsData = barChartEmissionsData.find(
      (item) => targetData.year === item.year
    );
    return { ...targetData, ...emissionsData };
  });

  return mergedData;
};

export const getBarSize = (yearDiffence: number) => {
  if (yearDiffence >= 20 && yearDiffence <= 30) {
    return 10;
  }
  if (yearDiffence >= 31) {
    return 7;
  }
  return 12;
};
