import { Solutions } from 'containers/PrivateSolutions/types';
import { SolutionStoryMapping } from 'interfaces/Solutions';
import { getItem, setItem } from './sessionStorage';

// Maps Solutions to Stories for Display in Solutions Page
export const solutionStoryMappings = (): Partial<SolutionStoryMapping> => ({
  [Solutions.SUSTAINABLE_AVIATION]: [6, 9, 10, 23],
  [Solutions.TELEMATICS]: [2],
  [Solutions.EMOBILITY]: [0, 4, 13, 18, 19],
  [Solutions.VESSELS_SOFTWARE]: [7],
  [Solutions.IMMERSION_COOLING]: [29],
  [Solutions.INSTA_FREIGHT]: [14],
  [Solutions.CORPORATE_POWER_PURCHASE_AGREEMENTS]: [25, 26],
  [Solutions.RENEWABLE_ENERGY_CERTIFICATES]: [27, 28],
});

export const setSessionSolutionStories = (
  solutionStory: Partial<SolutionStoryMapping>
) => {
  setItem('solution-stories', JSON.stringify(solutionStory));
};

export const getSessionSolutionStories = (): null | Partial<
  SolutionStoryMapping
> => {
  const solutionStories = getItem('solution-stories');
  if (solutionStories === null) {
    return null;
  }
  return JSON.parse(solutionStories) as Partial<SolutionStoryMapping>;
};
