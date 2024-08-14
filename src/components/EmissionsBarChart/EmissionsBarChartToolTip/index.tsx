import useTranslation from 'next-translate/useTranslation';
import { TooltipProps } from 'recharts';
import {
  Azure,
  FunGreen,
  Fuego,
  Tundora,
  ShipCove,
  RockBlue,
  MorningGlory,
} from 'styles/colours';

import { TooltipTitleBaselineLabel } from 'components/Charts/TooltipTitleBaselineLabel';
import { ToolTipRow } from 'components/ToolTipRow';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export interface IProps extends TooltipProps {
  isScope3TargetFormData?: boolean;
  isOffsetTargetFormData?: boolean;
  baselineYear?: number;
}

const UnitLabel = ({ translationLabel }: { translationLabel: string }) => {
  const { t } = useTranslation();
  return t(translationLabel);
};

export const EmissionsBarChartTooltip = ({
  payload,
  baselineYear,
  isScope3TargetFormData,
  isOffsetTargetFormData,
}: IProps) => {
  if (!payload || !payload.length) {
    return null;
  }

  const {
    payload: {
      scope1,
      scope2,
      scope3,
      year,
      offset,
      scope1And2TargetEmission,
      scope3TargetEmission,
      totalTargetEmission,
    },
  } = payload[0];

  const isBaselineYear = year === baselineYear;

  return (
    <StyledComponents.Wrapper>
      <StyledComponents.YearContainer>
        <StyledComponents.Year data-testid={selectors.yearLabel}>
          {year}
          {isBaselineYear && <TooltipTitleBaselineLabel />}
        </StyledComponents.Year>
      </StyledComponents.YearContainer>

      <StyledComponents.CategoryContainer>
        {(scope1 || scope2) && (
          <StyledComponents.TooltipColumn>
            <StyledComponents.Category>
              <UnitLabel translationLabel="emissionsOverviewChart:bar-chart-historic-data-title" />
            </StyledComponents.Category>
            {scope1 && (
              <ToolTipRow
                dataTestId={selectors.scope1Label}
                borderBackground={Azure}
                background={Azure}
                color={Tundora}
                label="emissionsOverviewChart:bar-chart-legend-scope1"
                value={scope1}
                translationUnitLabel="common:unit-mt-co2"
              />
            )}
            {scope2 && (
              <ToolTipRow
                dataTestId={selectors.scope2Label}
                borderBackground={ShipCove}
                background={ShipCove}
                color={Tundora}
                label="emissionsOverviewChart:bar-chart-legend-scope2"
                value={scope2}
                translationUnitLabel="common:unit-mt-co2"
              />
            )}
            {scope3 && (
              <ToolTipRow
                dataTestId={selectors.scope3Label}
                borderBackground={RockBlue}
                background={RockBlue}
                color={Tundora}
                label="emissionsOverviewChart:bar-chart-legend-scope3"
                value={scope3}
                translationUnitLabel="common:unit-mt-co2"
              />
            )}

            {offset && (
              <ToolTipRow
                dataTestId={selectors.offsetLabel}
                borderBackground={MorningGlory}
                background={MorningGlory}
                color={Tundora}
                label="emissionsOverviewChart:bar-chart-legend-offsets"
                value={offset}
                translationUnitLabel="common:unit-mt-co2"
              />
            )}
          </StyledComponents.TooltipColumn>
        )}

        {scope1And2TargetEmission && (
          <StyledComponents.TooltipColumn>
            <StyledComponents.Category>
              <UnitLabel translationLabel="emissionsOverviewChart:bar-chart-ambition-title" />
            </StyledComponents.Category>

            {!isOffsetTargetFormData && (
              <>
                {isScope3TargetFormData && (
                  <ToolTipRow
                    dataTestId={selectors.scope1And2TargetLabel}
                    borderBackground={FunGreen}
                    background={FunGreen}
                    color={Tundora}
                    value={scope1And2TargetEmission}
                    translationUnitLabel="common:unit-mt-co2"
                    label="emissionsOverviewChart:bar-chart-tooltip-scope1-and-2-target-emission"
                  />
                )}
                <StyledComponents.Spacer />
                {!isScope3TargetFormData && (
                  <ToolTipRow
                    dataTestId={selectors.scope1And2TargetLabel}
                    borderBackground={FunGreen}
                    background={FunGreen}
                    color={Tundora}
                    value={scope1And2TargetEmission}
                    translationUnitLabel="common:unit-mt-co2"
                    label="emissionsOverviewChart:bar-chart-legend-your-ambition"
                  />
                )}
              </>
            )}

            {!isOffsetTargetFormData && isScope3TargetFormData && (
              <ToolTipRow
                dataTestId={selectors.scope3TargetLabel}
                borderBackground={Fuego}
                background={Fuego}
                color={Tundora}
                label="emissionsOverviewChart:bar-chart-legend-scope3"
                value={scope3TargetEmission}
                translationUnitLabel="common:unit-mt-co2"
              />
            )}

            {isOffsetTargetFormData && (
              <ToolTipRow
                dataTestId={selectors.totalTargetEmissionsLabel}
                borderBackground={FunGreen}
                background={FunGreen}
                color={Tundora}
                label="emissionsOverviewChart:bar-chart-legend-your-ambition"
                value={totalTargetEmission}
                translationUnitLabel="common:unit-mt-co2"
              />
            )}
          </StyledComponents.TooltipColumn>
        )}
      </StyledComponents.CategoryContainer>
    </StyledComponents.Wrapper>
  );
};
