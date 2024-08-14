import useTranslation from 'next-translate/useTranslation';
import { FooterCard } from 'components/FooterCard';
import { ChangelogSquares } from 'components/Glyphs/ChangelogSquares';
import { ChangelogSquare } from 'components/Glyphs/ChangelogSquare';
import Icon from 'components/Icon';
import * as StyledComponents from './styledComponents';
import {
  baselineEmissions,
  supportAtScale,
  discoverAlternatives,
} from './data';

export const Features = () => {
  const { t } = useTranslation();
  return (
    <>
      <StyledComponents.Wrapper>
        <StyledComponents.HeaderContainer>
          <StyledComponents.TitleContainer>
            <StyledComponents.Title>
              {t('publicFeatures:page-title')}
            </StyledComponents.Title>
            <StyledComponents.SubTitle>
              {t('publicFeatures:page-sub-title')}
            </StyledComponents.SubTitle>
          </StyledComponents.TitleContainer>
          <StyledComponents.SquaresGraphicContainer>
            <StyledComponents.SquaresGraphic>
              <ChangelogSquares title={t('changeLog:squares-graphic')} />
            </StyledComponents.SquaresGraphic>
          </StyledComponents.SquaresGraphicContainer>
        </StyledComponents.HeaderContainer>
        <StyledComponents.SingleSquareGraphicContainer>
          <StyledComponents.SingleSquareGraphic>
            <ChangelogSquare title={t('changeLog:squares-graphic')} />
          </StyledComponents.SingleSquareGraphic>
        </StyledComponents.SingleSquareGraphicContainer>
      </StyledComponents.Wrapper>
      <StyledComponents.FeatureTitleContainer>
        <StyledComponents.FeatureBreaker />

        <StyledComponents.FeatureTitle>
          {t('publicFeatures:baseline-emissions')}
        </StyledComponents.FeatureTitle>
        <StyledComponents.FeatureSubTitle>
          {t('publicFeatures:baseline-emissions-description')}
        </StyledComponents.FeatureSubTitle>
      </StyledComponents.FeatureTitleContainer>
      <StyledComponents.IconsWrapper>
        {baselineEmissions.map((item) => (
          <StyledComponents.IconContainer key={item.id}>
            <StyledComponents.Icon>
              <Icon
                src={item.imagePath}
                size="168px"
                alt={t(`publicFeatures:${item.title}`)}
              />
            </StyledComponents.Icon>
            <StyledComponents.IconLabel>
              {t(`publicFeatures:${item.title}`)}
            </StyledComponents.IconLabel>
            <StyledComponents.IconLabelText>
              {t(`publicFeatures:${item.content}`)}
            </StyledComponents.IconLabelText>
          </StyledComponents.IconContainer>
        ))}
      </StyledComponents.IconsWrapper>
      <StyledComponents.FeatureTitleContainer>
        <StyledComponents.FeatureBreaker />

        <StyledComponents.FeatureTitle>
          {t('publicFeatures:support-at-scale')}
        </StyledComponents.FeatureTitle>
        <StyledComponents.FeatureSubTitle>
          {t('publicFeatures:support-at-scale-description')}
        </StyledComponents.FeatureSubTitle>
      </StyledComponents.FeatureTitleContainer>
      <StyledComponents.IconsWrapper>
        {supportAtScale.map((item) => (
          <StyledComponents.IconContainer key={item.id}>
            <StyledComponents.Icon>
              <Icon
                src={item.imagePath}
                size="168px"
                alt={t(`publicFeatures:${item.title}`)}
              />
            </StyledComponents.Icon>
            <StyledComponents.IconLabel>
              {t(`publicFeatures:${item.title}`)}
            </StyledComponents.IconLabel>
            <StyledComponents.IconLabelText>
              {t(`publicFeatures:${item.content}`)}
            </StyledComponents.IconLabelText>
          </StyledComponents.IconContainer>
        ))}
      </StyledComponents.IconsWrapper>
      <StyledComponents.FeatureTitleContainer>
        <StyledComponents.FeatureBreaker />

        <StyledComponents.FeatureTitle>
          {t('publicFeatures:discover-alternatives')}
        </StyledComponents.FeatureTitle>
        <StyledComponents.FeatureSubTitle>
          {t('publicFeatures:discover-alternatives-description')}
        </StyledComponents.FeatureSubTitle>
      </StyledComponents.FeatureTitleContainer>
      <StyledComponents.IconsWrapper>
        {discoverAlternatives.map((item) => (
          <StyledComponents.IconContainer key={item.id}>
            <StyledComponents.Icon>
              <Icon
                src={item.imagePath}
                size="168px"
                alt={t(`publicFeatures:${item.title}`)}
              />
            </StyledComponents.Icon>
            <StyledComponents.IconLabel>
              {t(`publicFeatures:${item.title}`)}
            </StyledComponents.IconLabel>
            <StyledComponents.IconLabelText>
              {t(`publicFeatures:${item.content}`)}
            </StyledComponents.IconLabelText>
          </StyledComponents.IconContainer>
        ))}
      </StyledComponents.IconsWrapper>
      <FooterCard invertColor />
    </>
  );
};
