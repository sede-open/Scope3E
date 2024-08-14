import { OpenTab } from 'components/Glyphs/OpenTab';
import { SolutionsCard } from 'components/SolutionsDisplay/SolutionsCard';
import useTranslation from 'next-translate/useTranslation';
import { TransText } from 'utils/TransText';
import solutionDetail from '../../../../locales/en/solutionDetail.json';
import { QuoteGraphic } from '../QuoteGraphic';
import * as StyledComponents from './styledComponents';
import { SolutionCardContainer } from './styledComponents';
import { ContentBlockType, IProps } from './types';
import { getStory, injectQuoteAndStoryIntoContentItems } from './utils';

export const DetailContentBlock = ({
  components,
  contentItems: preFormattedContentItems,
  solutionId,
}: IProps) => {
  const { t } = useTranslation();

  const hasQuote = !!(solutionDetail as { [key: string]: any })[
    `${solutionId}-quote`
  ];

  const story = getStory(solutionId, t);
  const hasStory = !!story;

  const contentItems = injectQuoteAndStoryIntoContentItems(
    preFormattedContentItems,
    hasQuote,
    hasStory
  );

  return (
    <>
      {contentItems.map(({ type, content }) => {
        if (
          type === ContentBlockType.PARAGRAPH &&
          typeof content === 'string'
        ) {
          return (
            <StyledComponents.StyledParagraph key={content}>
              <TransText components={components} text={content} />
            </StyledComponents.StyledParagraph>
          );
        }

        if (
          type === ContentBlockType.OPEN_IN_NEW_TAB_TEXT &&
          typeof content === 'string'
        ) {
          return (
            <StyledComponents.Container key={content}>
              <StyledComponents.IconContainer>
                <OpenTab title={t('common:open-tab')} />
              </StyledComponents.IconContainer>
              <StyledComponents.StyledParagraph key={content}>
                <TransText components={components} text={content} />
              </StyledComponents.StyledParagraph>
            </StyledComponents.Container>
          );
        }

        if (type === ContentBlockType.TITLE && typeof content === 'string') {
          return (
            <StyledComponents.Title key={content}>
              <TransText components={components} text={content} />
            </StyledComponents.Title>
          );
        }

        if (
          type === ContentBlockType.UNORDERED_LIST &&
          Array.isArray(content)
        ) {
          return (
            <StyledComponents.StyledUnorderedList
              items={content.map((contentItem) => (
                <TransText components={components} text={contentItem} />
              ))}
              key={content[0]}
            />
          );
        }

        if (type === ContentBlockType.ORDERED_LIST && Array.isArray(content)) {
          return (
            <StyledComponents.StyledOrderedList>
              {content.map((contentI) => {
                return (
                  <StyledComponents.OrderedListItem>
                    {contentI}
                  </StyledComponents.OrderedListItem>
                );
              })}
            </StyledComponents.StyledOrderedList>
          );
        }

        if (type === ContentBlockType.QUOTE) {
          return <QuoteGraphic key={type} solutionId={solutionId} />;
        }

        if (type === ContentBlockType.STORY && story) {
          return (
            <SolutionCardContainer key={type}>
              <SolutionsCard
                solution={story}
                isMostRecentlyAddedSolution={false}
                layout="horizontal"
              />
            </SolutionCardContainer>
          );
        }

        if (type === ContentBlockType.IMAGE) {
          return (
            <StyledComponents.ImageContainer
              src={`/images/PrivateSolutionsContentImages/${content}`}
            />
          );
        }

        if (
          type === ContentBlockType.DISCLAIMER &&
          typeof content === 'string'
        ) {
          return (
            <StyledComponents.Disclaimer key={content}>
              <TransText components={components} text={content} />
            </StyledComponents.Disclaimer>
          );
        }

        return null;
      })}
    </>
  );
};

DetailContentBlock.defaultProps = {
  components: undefined,
};
