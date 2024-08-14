import * as privateSolutionSelectors from 'containers/PrivateSolutions/selectors';
import { PrivateSolutionCard } from '../../../containers/PrivateSolutions/PrivateSolutionCard';
import { Solutions } from '../../../containers/PrivateSolutions/types';

import * as StyledComponents from './styledComponents';

interface IProps {
  solutions: Solutions[];
}

export const SolutionsGrid = ({ solutions }: IProps) => {
  return (
    <StyledComponents.GridBody
      data-testid={privateSolutionSelectors.recommendedSolutionsGrid}
    >
      {solutions.map((solutionId) => (
        <PrivateSolutionCard key={solutionId} solutionId={solutionId} />
      ))}
    </StyledComponents.GridBody>
  );
};
