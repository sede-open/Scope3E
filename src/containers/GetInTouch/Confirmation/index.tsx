import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import { SolutionsTopThree } from 'components/SolutionsTopThree';
import * as selectors from 'containers/GetInTouch/selectors';
import { Link } from 'components/Link';

import * as StyledComponents from './styledComponents';

export const Confirmation = () => {
  const { t } = useTranslation();

  return (
    <StyledComponents.Wrapper>
      <StyledComponents.HeadContainer>
        <StyledComponents.GraphicContainer>
          <StyledComponents.Graphic
            data-testid={selectors.pageGraphic}
            alt={t('publicGetInTouch:squares-graphic')}
            title={t('publicGetInTouch:squares-graphic')}
          />
        </StyledComponents.GraphicContainer>
        <StyledComponents.TextContainer>
          <StyledComponents.TitleContainer>
            <StyledComponents.Title>
              {t('publicConfirmation:page-title')}
            </StyledComponents.Title>
          </StyledComponents.TitleContainer>
          <StyledComponents.SubtitleContainer>
            <StyledComponents.Subtitle>
              {t('publicConfirmation:page-subtitle[0]')}
            </StyledComponents.Subtitle>
          </StyledComponents.SubtitleContainer>
          <StyledComponents.SubtitleContainer>
            <StyledComponents.Subtitle>
              {t('publicConfirmation:page-subtitle[1]')}
              <Trans
                components={[
                  <Link
                    href={`mailto:${t('common:support-email')}`}
                    target="_blank"
                  />,
                ]}
                i18nKey="publicConfirmation:page-subtitle[2]"
              />
            </StyledComponents.Subtitle>
          </StyledComponents.SubtitleContainer>
        </StyledComponents.TextContainer>
      </StyledComponents.HeadContainer>
      <StyledComponents.SubTextContainer>
        <StyledComponents.Subtext>
          {t('publicConfirmation:page-subtext')}
        </StyledComponents.Subtext>
      </StyledComponents.SubTextContainer>
      <StyledComponents.SolutionsContainer>
        <SolutionsTopThree />
      </StyledComponents.SolutionsContainer>
    </StyledComponents.Wrapper>
  );
};
