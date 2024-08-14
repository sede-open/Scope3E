import { useResponsive } from 'effects/useResponsive';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { screenSize } from 'styles/variables';
import { StoryAuthor } from './constants';
import { Story } from './Story';
import * as StyledComponents from './styledComponents';

export const SolutionsRedesign = () => {
  const { t } = useTranslation('publicSolutions');
  const screen = useResponsive();
  const isMobileView = screen <= screenSize.tabletM;

  return (
    <>
      <StyledComponents.SolutionsBackground>
        <StyledComponents.SolutionsTitle>
          {t('successStories')}
        </StyledComponents.SolutionsTitle>
      </StyledComponents.SolutionsBackground>
      {isMobileView && (
        <StyledComponents.GreenBackground>
          <StyledComponents.WhiteBoldHeader>
            {t('successStories')}
          </StyledComponents.WhiteBoldHeader>
        </StyledComponents.GreenBackground>
      )}

      <StyledComponents.Stories>
        <StyledComponents.StoriesTitle>
          {t('whatClientsSay')}
        </StyledComponents.StoriesTitle>
        <Story author={StoryAuthor.PETE_MARTIN} position="start" />
        <Story reverse author={StoryAuthor.THOMAS_ROBISCO} position="start" />
        <Story author={StoryAuthor.LOTTIE_ELWOOD} position="end" />
        <Story reverse author={StoryAuthor.JUSTIN_IEMMA} position="center" />
        <Story author={StoryAuthor.CHUA_SUN_FAT} position="center" />
      </StyledComponents.Stories>
      <StyledComponents.GreenBackground>
        <StyledComponents.WhiteBoldText>
          {t('howCanWeSupport')}
        </StyledComponents.WhiteBoldText>
        <StyledComponents.ButtonsContainer>
          <Link href="/demo" passHref>
            <StyledComponents.CtaButton>
              {t('requestDemo')}
            </StyledComponents.CtaButton>
          </Link>
          <Link href="/features" passHref>
            <StyledComponents.CtaButton>
              {t('exploreFeatures')}
            </StyledComponents.CtaButton>
          </Link>
        </StyledComponents.ButtonsContainer>
      </StyledComponents.GreenBackground>
    </>
  );
};
