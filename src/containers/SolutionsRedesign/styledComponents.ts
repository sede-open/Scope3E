import Button from 'components/Button';
import { Text } from 'components/Text';
import styled from 'styled-components';
import { ifProp, prop } from 'styled-tools';
import { FunGreen, abcdGray, Tundora, White } from 'styles/colours';
import { exampleBold, exampleMedium } from 'styles/fonts';
import { device } from 'styles/variables';

export const SolutionsBackground = styled.div`
  padding: 126px 24px 0 24px;

  width: 100%;
  height: 250px;
  background-image: url('/images/PublicSite/SuccessStories/mountains.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media ${device.tabletM} {
    padding: 126px 126px 0 126px;
    height: 425px;
  }
`;

export const SolutionsTitle = styled(Text).attrs({
  as: 'h1',
  color: Tundora,
  family: exampleBold,
  size: '3rem',
})`
  display: none;
  @media ${device.tabletM} {
    display: unset;
  }
`;

export const Stories = styled.section`
  width: 100%;
  text-align: left;
  padding: 52px 24px 52px 24px;

  @media ${device.tabletM} {
    padding: 76px 132px 80px 132px;
  }
`;

export const StoriesTitle = styled(Text).attrs({
  as: 'h2',
  color: FunGreen,
  family: exampleBold,
  size: '1.625rem',
})``;

export const StorySection = styled.div<{
  $position: 'start' | 'center' | 'end';
}>`
  width: 100%;
  display: flex;
  padding-top: 40px;
  justify-content: ${prop('$position')};
`;

export const Story = styled.div<{ $reverse: boolean }>`
  display: flex;
  gap: 36px;
  flex-direction: ${ifProp('$reverse', 'column-reverse', 'column')};
  align-items: center;
  flex: 1;

  @media ${device.tabletS} {
    flex-direction: row;
    align-items: start;
    flex: unset;
    gap: 72px;
  }
`;

export const Avatar = styled.img`
  max-width: min(244px, 80%);
  border-radius: 50%;
`;

export const StoryTexts = styled.div`
  margin-top: auto;
  max-width: 496px;
`;

export const Title = styled(Text).attrs({
  family: exampleBold,
  size: '1.1875rem',
  color: Tundora,
})`
  margin-bottom: 24px;
`;

export const Quote = styled(Text).attrs({
  family: exampleMedium,
  size: '1.1875rem',
  color: Tundora,
})`
  margin-bottom: 40px;
`;

export const StoryButton = styled(Button).attrs({
  color: 'redesign-primary',
})`
  width: fit-content;
  margin-bottom: 12px;

  &:enabled:hover,
  &:enabled:active {
    path {
      stroke: ${Tundora};
    }
  }
`;

export const StoryButtonText = styled.span`
  margin-right: 12px;
`;

export const GreenBackground = styled.section`
  width: 100%;
  background-color: ${FunGreen};
  padding: 30px 24px 38px 24px;

  @media ${device.tabletM} {
    text-align: center;
    padding: 30px 132px 38px 132px;
  }
`;

export const WhiteBoldHeader = styled(Text).attrs({
  as: 'h1',
  color: White,
  family: exampleBold,
  size: '2rem',
})``;

export const WhiteBoldText = styled(Text).attrs({
  as: 'h2',
  color: White,
  family: exampleBold,
  size: '1.625rem',
})`
  margin-bottom: 44px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 22px;
`;

export const CtaButton = styled(Button).attrs({
  color: 'redesign-secondary-borderless',
})`
  color: ${Tundora};
  min-width: 200px;
`;

export const AuthorSection = styled.div`
  width: 100%;
  background-color: ${FunGreen};
  padding: 44px 24px;
`;

export const AuthorFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;

  @media ${device.tabletS} {
    flex-direction: row;
  }
`;

export const MobileHeading = styled(Text).attrs({
  as: 'h1',
  family: exampleBold,
  size: '2rem',
  color: White,
})`
  margin-bottom: 44px;
  @media ${device.tabletM} {
    display: none;
  }
`;

export const AuthorDescription = styled.div`
  text-align: start;
  max-width: 550px;
`;

export const AuthorPosition = styled(Text).attrs({
  as: 'h2',
  color: White,
  family: exampleBold,
  size: '1.625rem',
})``;

export const StoryTextContainer = styled.div`
  padding: 60px 24px;
  max-width: 528px;
  margin-left: auto;
  margin-right: auto;
`;

export const Answer = styled(Text).attrs({
  family: exampleMedium,
  size: '1.1875rem',
  color: Tundora,
})`
  margin-bottom: 40px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Break = styled.div`
  height: 20px;
`;

export const MoreStoriesContainer = styled.div`
  background-color: ${abcdGray};
  width: 100%;
  min-height: 692px;
  padding: 48px 24px;
  display: flex;
  justify-content: center;
`;

export const MoreStories = styled.div`
  max-width: 800px;
`;

export const FooterButtons = styled.div`
  width: 100%;
  background-color: ${FunGreen};
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
`;
