import { render } from '@testing-library/react';
import { SolutionsCard } from 'components/SolutionsDisplay/SolutionsCard';
import { Solutions } from 'containers/PrivateSolutions/types';
import { SolutionStoryMapping } from 'interfaces/Solutions';
import { mocked } from 'jest-mock';
import useTranslation from 'next-translate/useTranslation';
import {
  getSessionSolutionStories,
  setSessionSolutionStories,
  solutionStoryMappings,
} from 'utils/solutionStory';
import { DetailContentBlock } from '.';
import publicSolutions from '../../../../locales/en/publicSolutions.json';
import { QuoteGraphic } from '../QuoteGraphic';
import { ContentBlockType, IContentBlockItem } from './types';

jest.mock('../QuoteGraphic');
jest.mock('components/SolutionsDisplay/SolutionsCard');
jest.mock('next-translate/useTranslation');

const quoteGraphicMocked = mocked(QuoteGraphic);
const solutionsCardMocked = mocked(SolutionsCard);
const useTranslationMocked = mocked(useTranslation);
describe('DetailContentBlock Component', () => {
  const mockedTransations = (params: string) => {
    if (params === 'publicSolutions:solution-cards') {
      return publicSolutions['solution-cards'];
    }
    return '';
  };
  useTranslationMocked.mockReturnValue({ t: mockedTransations });
  quoteGraphicMocked.mockReturnValue(<div data-testid="quote-graphic" />);
  solutionsCardMocked.mockReturnValue(<div data-testid="solution-card" />);
  beforeEach(() => {
    quoteGraphicMocked.mockClear();
    solutionsCardMocked.mockClear();
  });

  const storyContentItems: IContentBlockItem[] = [
    {
      type: ContentBlockType.TITLE,
      content: 'Header 1',
    },
    {
      type: ContentBlockType.TITLE,
      content: 'Header 2',
    },
  ];

  it('should render a quote', () => {
    const contentItems: IContentBlockItem[] = [
      {
        type: ContentBlockType.TITLE,
        content: 'Header 1',
      },
      {
        type: ContentBlockType.TITLE,
        content: 'Header 2',
      },
      {
        type: ContentBlockType.TITLE,
        content: 'Header 3',
      },
      {
        type: ContentBlockType.TITLE,
        content: 'Header 4',
      },
    ];
    const { queryByTestId } = render(
      <DetailContentBlock
        contentItems={contentItems}
        solutionId={Solutions.EMOBILITY}
      />
    );
    const quote = queryByTestId('quote-graphic');
    expect(quote).not.toBeNull();
  });

  it('should render a random story without sessionStorage', () => {
    const { queryByTestId } = render(
      <DetailContentBlock
        contentItems={storyContentItems}
        solutionId={Solutions.EMOBILITY}
      />
    );
    const solutionCard = queryByTestId('solution-card');
    expect(solutionCard).not.toBeNull();
  });

  it('should render a random story with sessionStorage', () => {
    setSessionSolutionStories(solutionStoryMappings());
    const { queryByTestId } = render(
      <DetailContentBlock
        contentItems={storyContentItems}
        solutionId={Solutions.EMOBILITY}
      />
    );
    const solutionCard = queryByTestId('solution-card');
    expect(solutionCard).not.toBeNull();

    const solutionsInSession = (getSessionSolutionStories() as Partial<
      SolutionStoryMapping
    >)[Solutions.EMOBILITY] as number[];

    const eMobilityStories = solutionStoryMappings()[
      Solutions.EMOBILITY
    ] as number[];

    expect(solutionsInSession.length).toEqual(eMobilityStories.length - 1);
  });

  it('should render without a story', () => {
    setSessionSolutionStories(solutionStoryMappings());
    const { queryByTestId } = render(
      <DetailContentBlock
        contentItems={storyContentItems}
        solutionId={Solutions.HYDROGEN}
      />
    );
    const solutionCard = queryByTestId('solution-card');
    expect(solutionCard).toBeNull();
  });

  it('should render if there is only 1 story', () => {
    const { queryByTestId } = render(
      <DetailContentBlock
        contentItems={storyContentItems}
        solutionId={Solutions.TELEMATICS}
      />
    );
    const solutionCard = queryByTestId('solution-card');
    expect(solutionCard).not.toBeNull();
  });

  it('should refresh session storage stories if there is only 1 left to display', () => {
    const setupSession = solutionStoryMappings();
    setupSession[Solutions.IMMERSION_COOLING] = setupSession[
      Solutions.IMMERSION_COOLING
    ]?.splice(0, 1);
    setSessionSolutionStories(setupSession);
    const { queryByTestId } = render(
      <DetailContentBlock
        contentItems={storyContentItems}
        solutionId={Solutions.IMMERSION_COOLING}
      />
    );
    const solutionCard = queryByTestId('solution-card');
    expect(solutionCard).not.toBeNull();
    const solutionsInSession = (getSessionSolutionStories() as Partial<
      SolutionStoryMapping
    >)[Solutions.IMMERSION_COOLING] as number[];
    const expectedResult = solutionStoryMappings()[
      Solutions.IMMERSION_COOLING
    ] as number[];
    expect(solutionsInSession).toEqual(expectedResult);
  });
});
