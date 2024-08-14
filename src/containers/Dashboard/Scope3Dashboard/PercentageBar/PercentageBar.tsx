import { getPercentAllocated } from 'containers/Dashboard/Scope3Dashboard/utils';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  scope3Value: number;
  emissions: number | null;
}
export const PercentageBar = ({ scope3Value, emissions }: IProps) => (
  <StyledComponents.PercentageContainer
    data-testid={selectors.percentageContainer}
  >
    <StyledComponents.PercentageBar
      percentAllocated={getPercentAllocated(scope3Value, Number(emissions))}
    />
    <StyledComponents.Percentage>
      {getPercentAllocated(scope3Value, Number(emissions))}%
    </StyledComponents.Percentage>
  </StyledComponents.PercentageContainer>
);
