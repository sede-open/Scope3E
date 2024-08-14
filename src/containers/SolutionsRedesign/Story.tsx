import { NewTab } from 'components/Glyphs/NewTab';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { White } from 'styles/colours';
import { StoryAuthor } from './constants';
import * as StyledComponents from './styledComponents';

type Props = {
  author: StoryAuthor;
  position: 'start' | 'center' | 'end';
  reverse?: boolean;
};
export const Story = ({ author, position, reverse = false }: Props) => {
  const { t } = useTranslation('publicSolutions');
  return (
    <StyledComponents.StorySection $position={position}>
      <StyledComponents.Story $reverse={reverse}>
        {!reverse && (
          <StyledComponents.Avatar
            src={`/images/PublicSite/SuccessStories/${author}.jpeg`}
          />
        )}
        <StyledComponents.StoryTexts>
          <StyledComponents.Title>
            {t(`${author}.name`)}, {t(`${author}.position`)}
          </StyledComponents.Title>
          <StyledComponents.Quote>
            “{t(`${author}.quote`)}”
          </StyledComponents.Quote>
          <Link href={`/stories/${author}`} passHref>
            <StyledComponents.StoryButton>
              <StyledComponents.StoryButtonText>
                {t('readStory', { name: t(`${author}.name`) })}
              </StyledComponents.StoryButtonText>
              <NewTab color={White} />
            </StyledComponents.StoryButton>
          </Link>
        </StyledComponents.StoryTexts>
        {reverse && (
          <StyledComponents.Avatar
            src={`/images/PublicSite/SuccessStories/${author}.jpeg`}
          />
        )}
      </StyledComponents.Story>
    </StyledComponents.StorySection>
  );
};
