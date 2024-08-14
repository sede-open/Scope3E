import useTranslation from 'next-translate/useTranslation';
import { ISolution } from 'interfaces/Solutions';

import { SolutionsCard } from './SolutionsCard';

export interface IProps {
  solutionsLength?: number;
}

export const SolutionsDisplay = ({ solutionsLength }: IProps) => {
  const { t } = useTranslation();

  const solutionCards: ISolution[] = t(
    'publicSolutions:solution-cards',
    {},
    { returnObjects: true }
  );
  const totalSolutionsLength = solutionCards.length;
  const solutionsRangeStart = totalSolutionsLength - Number(solutionsLength);

  const truncatedSolutionCards = solutionCards
    .slice(solutionsRangeStart, totalSolutionsLength)
    .reverse();

  return (
    <>
      {truncatedSolutionCards.map((solution, index) => (
        <SolutionsCard
          isMostRecentlyAddedSolution={index === solutionCards.length}
          key={solution.title}
          solution={solution}
        />
      ))}
    </>
  );
};

SolutionsDisplay.defaultProps = {
  solutionsLength: undefined,
};
