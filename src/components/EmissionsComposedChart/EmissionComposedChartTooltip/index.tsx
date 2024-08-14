import { TooltipProps } from 'recharts';
import {
  Tundora,
  EarlyDawn,
  CongressBlue,
  EggWhite,
  FunGreen,
  MorningGlory,
} from 'styles/colours';
import { round } from 'utils/number';

import { ToolTipRow } from 'components/ToolTipRow';
import { OnTargetLabel } from 'components/Charts/OnTargetLabel';
import { OffTargetLabel } from 'components/Charts/OffTargetLabel';
import { TooltipTitleBaselineLabel } from 'components/Charts/TooltipTitleBaselineLabel';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export interface IProps extends TooltipProps {
  includeCarbonOffset?: boolean;
  baselineYear?: number;
}

export const EmissionsTooltip = ({
  payload,
  baselineYear,
  includeCarbonOffset,
}: IProps) => {
  if (!payload) {
    return null;
  }

  const targetEmission = payload.find(
    (e) => e.dataKey === 'totalTargetEmission'
  );
  const netEmissions = payload.find((e) => e.dataKey === 'netEmissions');
  const grossEmissions = payload.find((e) => e.dataKey === 'grossEmissions');
  const ieaPayload = payload.find((e) => e.dataKey === 'iea');

  const isBaselineYear = payload[0]?.payload.year === baselineYear;

  if (!targetEmission && !netEmissions && !ieaPayload && !grossEmissions) {
    return null;
  }

  const target = targetEmission?.payload.totalTargetEmission;
  const net = netEmissions?.payload.netEmissions;
  const gross = grossEmissions?.payload.grossEmissions;
  const iea = ieaPayload?.payload.iea;

  const hasTarget = typeof target !== 'undefined';
  const hasNet = typeof net !== 'undefined';
  const hasGross = typeof gross !== 'undefined';
  const hasIEA = Array.isArray(iea);

  const targetComparisonEmission = includeCarbonOffset === true ? net : gross;

  return (
    <StyledComponents.ToolTipWrapper>
      <StyledComponents.ToolTipContainer>
        <StyledComponents.Title
          data-testid={selectors.yearLabel}
          color={Tundora}
        >
          {payload[0]?.payload.year}
          {isBaselineYear && <TooltipTitleBaselineLabel />}
        </StyledComponents.Title>
      </StyledComponents.ToolTipContainer>
      {hasNet && (
        <>
          <ToolTipRow
            dataTestId={selectors.netEmissionsLabel}
            borderBackground={CongressBlue}
            background={CongressBlue}
            color={Tundora}
            label="emissionsOverviewChart:tooltip-label-net-emissions"
            value={net}
            translationUnitLabel="common:unit-mt-co2"
          />
        </>
      )}

      {hasGross && (
        <>
          <ToolTipRow
            dataTestId={selectors.grossEmissionsLabel}
            borderBackground={MorningGlory}
            background={MorningGlory}
            color={Tundora}
            label="emissionsOverviewChart:tooltip-label-gross-emissions"
            value={gross}
            translationUnitLabel="common:unit-mt-co2"
          />
        </>
      )}

      {hasTarget && (
        <>
          <ToolTipRow
            dataTestId={selectors.targetLabel}
            borderBackground={FunGreen}
            background={FunGreen}
            color={Tundora}
            label="emissionsOverviewChart:tooltip-label-corporate-target"
            value={target}
            translationUnitLabel="common:unit-mt-co2"
          />
        </>
      )}
      <StyledComponents.ToolTipContainer>
        {hasTarget &&
        targetComparisonEmission &&
        target >= targetComparisonEmission ? (
          <OnTargetLabel />
        ) : (
          ''
        )}
        {hasTarget &&
        targetComparisonEmission &&
        target < targetComparisonEmission ? (
          <OffTargetLabel target={target} actual={targetComparisonEmission} />
        ) : (
          ''
        )}
      </StyledComponents.ToolTipContainer>
      {hasIEA && (
        <ToolTipRow
          dataTestId={selectors.ieaMaxLabel}
          minDataTestId={selectors.ieaMinLabel}
          borderBackground={EggWhite}
          background={EarlyDawn}
          color={Tundora}
          content="emissionsOverviewChart:tooltip-iea-max-value"
          minContent="emissionsOverviewChart:tooltip-iea-min-value"
          label="emissionsOverviewChart:tooltip-label-iea"
          value={round(iea[1], 1)}
          minValue={round(iea[0], 1)}
          translationUnitLabel="common:unit-mt-co2"
        />
      )}
    </StyledComponents.ToolTipWrapper>
  );
};

EmissionsTooltip.defaultProps = {
  includeCarbonOffset: undefined,
  baselineYear: undefined,
};
