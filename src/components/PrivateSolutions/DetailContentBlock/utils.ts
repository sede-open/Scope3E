import { Solutions } from 'containers/PrivateSolutions/types';
import { ISolution } from 'interfaces/Solutions';
import {
  getSessionSolutionStories,
  setSessionSolutionStories,
  solutionStoryMappings,
} from 'utils/solutionStory';
import { ContentBlockType, IContentBlockItem } from './types';

const getRandomStoryId = (
  storyIds: number[]
): { id: number; index: number } => {
  const index = Math.floor(Math.random() * storyIds.length);
  return { id: storyIds[index], index };
};

export const injectQuoteAndStoryIntoContentItems = (
  preFormattedContentItems: IContentBlockItem[],
  hasQuote: boolean,
  hasStory: boolean
): IContentBlockItem[] => {
  let titleCounter = 0;
  const contentItems: IContentBlockItem[] = [];
  preFormattedContentItems.forEach((ci) => {
    if (ci.type === ContentBlockType.TITLE) {
      titleCounter += 1;

      // Inject Story into position before 2nd Title
      if (titleCounter === 2 && hasStory) {
        contentItems.push({ type: ContentBlockType.STORY, content: '' });
        contentItems.push(ci);
        return;
      }

      // Injects Quote into correct position before 4th Title
      if (titleCounter === 4 && hasQuote) {
        contentItems.push({ type: ContentBlockType.QUOTE, content: '' });
        contentItems.push(ci);
        return;
      }
    }
    contentItems.push(ci);
  });
  return contentItems;
};

export const getStory = (
  solutionId: Solutions,
  t: any
): undefined | ISolution => {
  // Gets the story ids that are mapped to this solution, if there is one.
  const storyIds = solutionStoryMappings()[solutionId];
  if (!storyIds) {
    return storyIds;
  }

  const solutionCards: ISolution[] = t(
    'publicSolutions:solution-cards',
    {},
    { returnObjects: true }
  );

  const sessionSolutionStories = getSessionSolutionStories();
  // handle if session storage isn't available post deployment. This can be removed 24 hours after deployment of  abcd-1899
  if (sessionSolutionStories === null) {
    const { id } = getRandomStoryId(storyIds);
    return solutionCards.find((sc) => sc.id === id);
  }

  const remainingStoriesToDisplay = sessionSolutionStories[
    solutionId
  ] as number[];

  const { id, index } = getRandomStoryId(remainingStoriesToDisplay);
  remainingStoriesToDisplay.splice(index, 1);

  sessionSolutionStories[solutionId] =
    remainingStoriesToDisplay.length === 0
      ? storyIds
      : remainingStoriesToDisplay;

  setSessionSolutionStories(sessionSolutionStories);
  return solutionCards.find((sc) => sc.id === id);
};
