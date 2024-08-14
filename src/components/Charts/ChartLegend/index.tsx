import { Gray } from 'styles/colours';
import { InfoToolTip } from 'components/InfoToolTip';

import * as StyledComponents from './styledComponents';
import { ChartLegendJustification, IProps } from './types';

export const ChartLegend = ({
  legends,
  justifyItems = ChartLegendJustification.CENTRE,
}: IProps) => (
  <StyledComponents.Container justifyItems={justifyItems}>
    {legends.map((legend) => {
      const isClickable = legend.onClick != null;
      return (
        legend.isVisible && (
          <StyledComponents.Legend key={legend.name} data-testid={legend.name}>
            <StyledComponents.LegendDot colour={legend.colour} />
            {legend.infoTooltipContent ? (
              <InfoToolTip
                color={Gray}
                id={`${legend.name}-tooltip`}
                title={legend.name}
                content={legend.infoTooltipContent}
                offset={{
                  top: 0,
                  left: -35,
                  bottom: 0,
                  right: 0,
                }}
                ariaLabel={legend.ariaLabel}
              />
            ) : (
              <StyledComponents.LegendName
                isClickable={isClickable}
                onClick={legend.onClick}
              >
                {legend.name}
              </StyledComponents.LegendName>
            )}
          </StyledComponents.Legend>
        )
      );
    })}
  </StyledComponents.Container>
);
