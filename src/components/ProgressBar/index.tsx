import { round } from 'utils/number';

import * as StyledComponents from './styledComponents';

interface IProps {
  dataTestId?: string;
  percentage: number;
}

export const ProgressBar = ({ dataTestId, percentage }: IProps) => {
  const roundedValue = round(percentage, 1) ?? 0;

  return (
    <StyledComponents.ProgressBar
      data-testid={dataTestId}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={roundedValue}
      role="progressbar"
      percentageValue={roundedValue}
    >
      <StyledComponents.ValueContainer
        percentageValue={roundedValue}
      >{`${roundedValue}%`}</StyledComponents.ValueContainer>
    </StyledComponents.ProgressBar>
  );
};

ProgressBar.defaultProps = {
  dataTestId: undefined,
};
