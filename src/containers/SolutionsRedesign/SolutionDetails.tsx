import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { Fragment } from 'react';
import { TransText } from 'utils/TransText';
import { moreStoriesMap, StoryAuthor } from './constants';
import { EcolabVideo } from './EcolabVideo';
import { Story } from './Story';
import * as StyledComponents from './styledComponents';

type Props = {
  author: StoryAuthor;
};
export const SolutionDetails = ({ author }: Props) => {
  const { t } = useTranslation('publicSolutions');
  const testimonial: { question: string; answer: string }[] = t(
    `${author}.testimonial`,
    {},
    { returnObjects: true }
  );

  const [anotherStoryAuthorReverse, anotherStoryAuthor] = moreStoriesMap[
    author
  ];
  return (
    <>
      <StyledComponents.SolutionsBackground>
        <StyledComponents.SolutionsTitle>
          {t('successStories')}
        </StyledComponents.SolutionsTitle>
      </StyledComponents.SolutionsBackground>

      <StyledComponents.AuthorSection>
        <StyledComponents.MobileHeading>
          {t('successStories')}
        </StyledComponents.MobileHeading>
        <StyledComponents.AuthorFlex>
          <StyledComponents.Avatar
            src={`/images/PublicSite/SuccessStories/${author}.jpeg`}
          />
          <StyledComponents.AuthorDescription>
            <StyledComponents.AuthorPosition>
              {t('hearFrom', {
                name: t(`${author}.name`),
                position: t(`${author}.position`),
              })}
            </StyledComponents.AuthorPosition>
          </StyledComponents.AuthorDescription>
        </StyledComponents.AuthorFlex>
      </StyledComponents.AuthorSection>
      <StyledComponents.StoryTextContainer>
        {testimonial.map(({ question, answer }) => (
          <Fragment key={question}>
            <StyledComponents.Title>{question}</StyledComponents.Title>
            <StyledComponents.Answer>
              <TransText
                text={answer}
                components={{
                  br: <StyledComponents.Break />,
                  ecolabVideo: <EcolabVideo />,
                }}
              />
            </StyledComponents.Answer>
          </Fragment>
        ))}
      </StyledComponents.StoryTextContainer>
      <StyledComponents.MoreStoriesContainer>
        <StyledComponents.MoreStories>
          <StyledComponents.StoriesTitle>
            {t('readMoreStories')}
          </StyledComponents.StoriesTitle>
          <Story
            key={anotherStoryAuthorReverse}
            author={anotherStoryAuthorReverse}
            position="center"
            reverse
          />
          <Story
            key={anotherStoryAuthor}
            author={anotherStoryAuthor}
            position="center"
          />
        </StyledComponents.MoreStories>
      </StyledComponents.MoreStoriesContainer>
      <StyledComponents.FooterButtons>
        <Link href="/stories" passHref>
          <StyledComponents.CtaButton>
            {t('seeAllSuccessStories')}
          </StyledComponents.CtaButton>
        </Link>
        <Link href="/demo" passHref>
          <StyledComponents.CtaButton>
            {t('requestDemo')}
          </StyledComponents.CtaButton>
        </Link>
      </StyledComponents.FooterButtons>
    </>
  );
};
