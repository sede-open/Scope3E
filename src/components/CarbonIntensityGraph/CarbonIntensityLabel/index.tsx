import { IProps } from './types';
import * as selectors from './selectors';

const TITLE_LINE_LENGTH = 45;

export const CarbonIntensityLabel = ({ title }: IProps) => {
  const maxTitleLength = TITLE_LINE_LENGTH * 2;
  const firstLineOfTitle = title.substring(0, TITLE_LINE_LENGTH);
  const secondLineOfTitle = title.substring(TITLE_LINE_LENGTH, maxTitleLength);
  const ellipsis = title.length > maxTitleLength ? '...' : '';
  let yPosition = 160;
  if (secondLineOfTitle) {
    yPosition = 150;
  }
  return (
    <text
      fontSize="12"
      x="70"
      y={yPosition}
      transform="rotate(-90, 70, 185)"
      className="recharts-text recharts-label"
      textAnchor="end"
      style={{ textAnchor: 'middle', fill: 'rgb(127, 127, 127)' }}
    >
      <tspan x="70" dy="0em" data-testid={selectors.intensityLabelLine1}>
        {firstLineOfTitle}
      </tspan>
      {secondLineOfTitle && (
        <tspan x="70" dy="1.335em" data-testid={selectors.intensityLabelLine2}>
          {`${secondLineOfTitle}${ellipsis}`}
        </tspan>
      )}
    </text>
  );
};
