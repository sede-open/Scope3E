import { TooltipProps } from 'recharts';
import useTranslation from 'next-translate/useTranslation';
import {
  Tundora,
  CongressBlue,
  AlizarinCrimson,
  ShipCove,
  RockBlue,
} from 'styles/colours';
import { ToolTipRow } from 'components/ToolTipRow';

import { TooltipTitle, TooltipWrapper } from 'components/Tooltip';

// NOTE :: translations hook does not work within
// functional components rendered by recharts,
// so this had to be extracted

const UnitLabel = ({ translationLabel }: { translationLabel: string }) => {
  const { t } = useTranslation();
  return t(translationLabel);
};

const ConditionalScope = ({
  data,
  isPrediction,
}: {
  data: number | null;
  isPrediction: boolean;
}) => {
  if (data === null && isPrediction) {
    return (
      <>
        <ToolTipRow
          dataTestId="trendline-tooltip-scope3-empty-value"
          borderBackground={AlizarinCrimson}
          background={AlizarinCrimson}
          color={Tundora}
          label="dashboard:emissions-trendline-chart-legend-scope3"
          translationUnitLabel="dashboard:emissions-trendline-chart-tooltip-insufficient-data"
          value={' '}
        />
      </>
    );
  }

  return data && data > 0 ? (
    <ToolTipRow
      dataTestId="trendline-tooltip-scope3-value"
      borderBackground={RockBlue}
      background={RockBlue}
      color={Tundora}
      label="dashboard:emissions-trendline-chart-legend-scope3"
      value={data}
      translationUnitLabel="common:unit-mt-co2"
    />
  ) : null;
};

export const TrendlineTooltip = ({ payload }: TooltipProps) => {
  if (!payload || !payload.length) {
    return null;
  }

  const {
    payload: { isPrediction, scope1, scope2, scope3, year },
  } = payload[0];
  const titleLabelKey = isPrediction
    ? 'dashboard:emissions-trendline-chart-tooltip-prediction'
    : 'dashboard:emissions-trendline-chart-tooltip-historic';

  return (
    <TooltipWrapper>
      <TooltipTitle data-testid="trendline-tooltip-title" color={Tundora}>
        {year}
        <UnitLabel translationLabel={titleLabelKey} />
      </TooltipTitle>
      {scope1 !== 0 && (
        <ToolTipRow
          dataTestId="trendline-tooltip-scope1-value"
          borderBackground={CongressBlue}
          background={CongressBlue}
          color={Tundora}
          label="dashboard:emissions-trendline-chart-legend-scope1"
          value={scope1}
          translationUnitLabel="common:unit-mt-co2"
        />
      )}
      {scope1 === 0 && (
        <ToolTipRow
          dataTestId="trendline-tooltip-scope1-value"
          borderBackground={CongressBlue}
          background={CongressBlue}
          color={Tundora}
          label="dashboard:emissions-trendline-chart-legend-scope1"
          value="0"
          translationUnitLabel="common:unit-mt-co2"
        />
      )}
      {scope2 !== 0 && (
        <ToolTipRow
          dataTestId="trendline-tooltip-scope2-value"
          borderBackground={ShipCove}
          background={ShipCove}
          color={Tundora}
          label="dashboard:emissions-trendline-chart-legend-scope2"
          value={scope2}
          translationUnitLabel="common:unit-mt-co2"
        />
      )}
      {scope2 === 0 && (
        <ToolTipRow
          dataTestId="trendline-tooltip-scope2-value"
          borderBackground={ShipCove}
          background={ShipCove}
          color={Tundora}
          label="dashboard:emissions-trendline-chart-legend-scope2"
          value="0"
          translationUnitLabel="common:unit-mt-co2"
        />
      )}
      <ConditionalScope data={scope3} isPrediction={isPrediction} />
    </TooltipWrapper>
  );
};
