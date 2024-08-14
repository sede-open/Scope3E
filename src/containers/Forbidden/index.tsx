import useTranslation from 'next-translate/useTranslation';

import { SquaresGraphic } from 'components/Glyphs/SquaresGraphic';

import * as StyledComponents from './styledComponents';

export const Forbidden = () => {
  const { t } = useTranslation();
  return (
    <StyledComponents.Container>
      <StyledComponents.SquaresContainer>
        <SquaresGraphic />
      </StyledComponents.SquaresContainer>
      <StyledComponents.Content>
        <StyledComponents.Title>{t('forbidden:title')}</StyledComponents.Title>
        <StyledComponents.Paragraph>
          {t('forbidden:paragraph')}
        </StyledComponents.Paragraph>
      </StyledComponents.Content>
    </StyledComponents.Container>
  );
};
