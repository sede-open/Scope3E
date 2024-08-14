import { Video } from 'components/Video';
import { Text } from 'components/Text';
import useTranslation from 'next-translate/useTranslation';
import * as StyledComponents from './styledComponents';

export const VideoSection = () => {
  const { t } = useTranslation('publicHome');
  return (
    <StyledComponents.VideoSectionContainer>
      <StyledComponents.VideoContainer>
        <Video url="https://abcdprodst.blob.core.windows.net/public/seth.mp4" />
      </StyledComponents.VideoContainer>
      <StyledComponents.Title>{t('whyDoWeDoIt')}</StyledComponents.Title>
      <StyledComponents.DescriptionSection>
        <div>
          <Text weight="bold" size="1.1875rem">
            {t('trackingClimateChange')}
          </Text>
        </div>
        <div>
          <Text size="1.1875rem">{t('incrediblyDifficult')}</Text>
          <br />
          <Text size="1.1875rem">{t('whatCanTheHubDo')}</Text>
        </div>
      </StyledComponents.DescriptionSection>
    </StyledComponents.VideoSectionContainer>
  );
};
