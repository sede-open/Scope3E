import useTranslation from 'next-translate/useTranslation';

import {
  Azure,
  ShipCove,
  RockBlue,
  MorningGlory,
  FunGreen,
  Fuego,
} from 'styles/colours';
import { ChartLegend } from 'components/Charts/ChartLegend';

export interface IProps {
  shouldShowTotalAmbition: boolean;
  isScope3TargetFormData: boolean;
  isEmissionOffsetData: boolean;
  isScope1And2TargetFormData: boolean;
}

export const Legend = ({
  shouldShowTotalAmbition,
  isScope3TargetFormData,
  isEmissionOffsetData,
  isScope1And2TargetFormData,
}: IProps) => {
  const { t } = useTranslation();

  const shouldShowNonOffsetLegends =
    !shouldShowTotalAmbition &&
    isScope1And2TargetFormData &&
    isScope3TargetFormData;

  const shouldShowOffsetOrNonScope3Legends =
    (shouldShowTotalAmbition || !isScope3TargetFormData) &&
    isScope1And2TargetFormData;

  const legends = [
    {
      name: t('emissionsOverviewChart:bar-chart-legend-scope1'),
      colour: Azure,
      isVisible: true,
    },
    {
      name: t('emissionsOverviewChart:bar-chart-legend-scope2'),
      colour: ShipCove,
      isVisible: true,
    },
    {
      name: t('emissionsOverviewChart:bar-chart-legend-scope3'),
      colour: RockBlue,
      isVisible: true,
    },
    {
      name: t('emissionsOverviewChart:bar-chart-legend-offsets'),
      colour: MorningGlory,
      isVisible: isEmissionOffsetData,
    },
    {
      name: t(
        'emissionsOverviewChart:bar-chart-legend-scope1-and-2-target-emission'
      ),
      colour: FunGreen,
      isVisible: shouldShowNonOffsetLegends,
    },
    {
      name: t('emissionsOverviewChart:bar-chart-legend-scope3-target-emission'),
      colour: Fuego,
      isVisible: shouldShowNonOffsetLegends,
    },
    {
      name: t('emissionsOverviewChart:bar-chart-legend-your-ambition'),
      colour: FunGreen,
      isVisible: shouldShowOffsetOrNonScope3Legends,
    },
  ];

  return <ChartLegend legends={legends} />;
};
