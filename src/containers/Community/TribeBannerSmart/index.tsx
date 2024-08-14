import useTranslation from 'next-translate/useTranslation';
import { TransText } from 'utils/TransText';
import { useTribeUsageStatsQuery } from '../queries';
import * as selectors from '../selectors';
import * as StyledComponents from './styledComponents';

export const TribeBannerSmart = () => {
  const { t } = useTranslation();
  const b = <b />;
  const space = <StyledComponents.Spacer marginLeft="4px" />;

  const { data: tribeUsageStats } = useTribeUsageStatsQuery();
  const members = tribeUsageStats?.tribeUsageStats.members;
  const topics = tribeUsageStats?.tribeUsageStats.topics;
  const replies = tribeUsageStats?.tribeUsageStats.replies;

  return (
    <StyledComponents.IntroModuleContainer
      data-testid={selectors.tribeBannerSmart}
    >
      <StyledComponents.TextContainer>
        <StyledComponents.Title>
          {t('community:intro-title')}
        </StyledComponents.Title>
        <StyledComponents.SubTitle>
          {t('community:intro-text')}
        </StyledComponents.SubTitle>

        <StyledComponents.TribeUsageStatsInfoText>
          <TransText
            text={
              topics
                ? t('community:topics', {
                    topics,
                  })
                : ''
            }
            components={{
              b,
              space,
            }}
          />

          <StyledComponents.Spacer marginLeft="32px" />

          <TransText
            text={
              replies
                ? t('community:replies', {
                    replies,
                  })
                : ''
            }
            components={{
              b,
              space,
            }}
          />

          <StyledComponents.Spacer marginLeft="32px" />

          <TransText
            text={
              members
                ? t('community:members', {
                    members,
                  })
                : ''
            }
            components={{
              b,
              space,
            }}
          />
        </StyledComponents.TribeUsageStatsInfoText>
      </StyledComponents.TextContainer>
    </StyledComponents.IntroModuleContainer>
  );
};
