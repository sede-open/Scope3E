import { TooltipProps } from 'recharts';
import { TooltipTitle, TooltipWrapper } from 'components/Tooltip';
import { ToolTipRow } from 'components/ToolTipRow';
import { CongressBlue, Tundora } from 'styles/colours';

export const ChartTooltip = ({ payload }: TooltipProps) => {
  if (!payload || !payload.length) {
    return null;
  }
  const {
    payload: { year, emissions },
  } = payload[0];

  return (
    <TooltipWrapper>
      <TooltipTitle>{year}</TooltipTitle>
      <ToolTipRow
        borderBackground={CongressBlue}
        background={CongressBlue}
        color={Tundora}
        label="companyOverview:emissionsAllocated"
        value={emissions}
        translationUnitLabel="common:unit-mt-co2"
      />
    </TooltipWrapper>
  );
};
