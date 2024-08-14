import { SolutionsDisplay } from 'components/SolutionsDisplay';

import { SolutionCards } from './SolutionCards';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export const SolutionsTopThree = () => {
  return (
    <div data-testid={selectors.solutionsTopThree}>
      <StyledComponents.SolutionDisplayMobileLayout>
        <SolutionsDisplay solutionsLength={3} />
      </StyledComponents.SolutionDisplayMobileLayout>
      <StyledComponents.SolutionDisplayTabletLayout>
        <SolutionCards />
      </StyledComponents.SolutionDisplayTabletLayout>
    </div>
  );
};
