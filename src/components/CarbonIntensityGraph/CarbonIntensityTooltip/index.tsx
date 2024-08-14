import { OnTargetLabel } from 'components/Charts/OnTargetLabel';
import { OffTargetLabel } from 'components/Charts/OffTargetLabel';
import {
  Tundora,
  EarlyDawn,
  FunGreen,
  CannonPink,
  EggWhite,
} from 'styles/colours';
import { round } from 'utils/number';

import { ToolTipRow } from 'components/ToolTipRow';
import { TooltipTitleBaselineLabel } from 'components/Charts/TooltipTitleBaselineLabel';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';
import { CarbonIntensityChartKey } from '../types';
import { IProps } from './types';

export const CarbonIntensityTooltip = ({ payload, baselineYear }: IProps) => {
  if (!payload) {
    return null;
  }

  const intensityTargetPayload = payload.find(
    (e) => e.dataKey === CarbonIntensityChartKey.TARGET_INTENSITIES
  );
  const actualIntensityPayload = payload.find(
    (e) => e.dataKey === CarbonIntensityChartKey.ACTUAL_INTENSITIES
  );
  const ieaPayload = payload.find(
    (e) => e.dataKey === CarbonIntensityChartKey.IEA
  );

  const isBaselineYear = payload[0]?.payload.year === baselineYear;

  if (!intensityTargetPayload && !actualIntensityPayload && !ieaPayload) {
    return null;
  }

  const intensityTarget =
    intensityTargetPayload?.payload[CarbonIntensityChartKey.TARGET_INTENSITIES];
  const actualIntensity =
    actualIntensityPayload?.payload[CarbonIntensityChartKey.ACTUAL_INTENSITIES];
  const iea = ieaPayload?.payload[CarbonIntensityChartKey.IEA];

  const hasTarget = typeof intensityTarget !== 'undefined';
  const hasActual = typeof actualIntensity !== 'undefined';
  const hasIEA = Array.isArray(iea);

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
      {hasActual && (
        <>
          <ToolTipRow
            dataTestId={selectors.actualIntensityLabel}
            borderBackground={CannonPink}
            background={CannonPink}
            color={Tundora}
            label="carbonIntensity:tooltip-label-actual-intensity"
            value={actualIntensity}
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
            label="carbonIntensity:tooltip-label-intensity-target"
            value={intensityTarget}
            translationUnitLabel="common:unit-mt-co2"
          />
        </>
      )}
      <StyledComponents.ToolTipContainer>
        {hasTarget && hasActual && intensityTarget >= actualIntensity ? (
          <OnTargetLabel />
        ) : (
          ''
        )}
        {hasTarget && hasActual && intensityTarget < actualIntensity ? (
          <OffTargetLabel target={intensityTarget} actual={actualIntensity} />
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
          content="carbonIntensity:tooltip-iea-max-value"
          minContent="carbonIntensity:tooltip-iea-min-value"
          label="carbonIntensity:tooltip-label-iea"
          value={round(iea[1], 1)}
          minValue={round(iea[0], 1)}
          translationUnitLabel="common:unit-mt-co2"
        />
      )}
    </StyledComponents.ToolTipWrapper>
  );
};

CarbonIntensityTooltip.defaultProps = {
  baselineYear: undefined,
};
