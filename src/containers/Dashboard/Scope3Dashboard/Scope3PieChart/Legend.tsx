import useTranslation from 'next-translate/useTranslation';

import { Alto, CongressBlue } from 'styles/colours';
import { ChartLegend } from 'components/Charts/ChartLegend';
import { InfoTooltipBody } from 'components/InfoToolTip';

const getTooltipContent = (body: string) => (
  <InfoTooltipBody>{body}</InfoTooltipBody>
);

export const Legend = () => {
  const { t } = useTranslation();

  const legends = [
    {
      name: t('scope3Dashboard:pie-chart-legend-unallocated'),
      colour: Alto,
      isVisible: true,
      infoTooltipContent: getTooltipContent(
        t('scope3Dashboard:pie-chart-legend-unallocated-info-message')
      ),
      ariaLabel: t('scope3Dashboard:pie-chart-legend-unallocated'),
    },
    {
      name: t('scope3Dashboard:pie-chart-legend-allocated'),
      colour: CongressBlue,
      isVisible: true,
      infoTooltipContent: getTooltipContent(
        t('scope3Dashboard:pie-chart-legend-allocated-info-message')
      ),
      ariaLabel: t('scope3Dashboard:pie-chart-legend-allocated'),
    },
  ];

  return <ChartLegend legends={legends} />;
};
