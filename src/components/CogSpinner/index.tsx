import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

const CogSpinner = () => (
  <StyledComponents.StyledWrapper data-testid={selectors.cogSpinner}>
    <StyledComponents.LargeCog />
    <StyledComponents.SmallCog />
  </StyledComponents.StyledWrapper>
);

export default CogSpinner;
