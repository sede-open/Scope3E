import useTranslation from 'next-translate/useTranslation';
import CarouselSlider from 'components/CarouselSlider';
import { StoryAuthor } from 'containers/SolutionsRedesign/constants';
import { TestimonialCard } from './TestimonialCard';
import * as StyledComponents from './styledComponents';

const CustomDot = ({ onClick, active }: any) => (
  <StyledComponents.DotItem $active={active}>
    <StyledComponents.Dot onClick={onClick} />
  </StyledComponents.DotItem>
);

export const TestimonialSection = () => {
  const { t } = useTranslation('publicSolutions');
  return (
    <StyledComponents.TestimonialBackground>
      <StyledComponents.TestimonialTitle>
        {t('whatClientsSay')}
      </StyledComponents.TestimonialTitle>
      <CarouselSlider
        slidesToSlide={1}
        showDots
        responsive={{
          All: { breakpoint: { max: 3000, min: 0 }, items: 1 },
        }}
        arrows={false}
        customDot={<CustomDot />}
      >
        {[
          StoryAuthor.PETE_MARTIN,
          StoryAuthor.THOMAS_ROBISCO,
          StoryAuthor.LOTTIE_ELWOOD,
          StoryAuthor.JUSTIN_IEMMA,
          StoryAuthor.CHUA_SUN_FAT,
        ].map((userKeyword) => (
          <TestimonialCard
            key={userKeyword}
            imageSrc={`/images/PublicSite/SuccessStories/${userKeyword}.jpeg`}
            name={t(`${userKeyword}.name`)}
            quote={t(`${userKeyword}.quote`)}
            position={t(`${userKeyword}.position`)}
            link={`/stories/${userKeyword}`}
          />
        ))}
      </CarouselSlider>
    </StyledComponents.TestimonialBackground>
  );
};
