import { SquaresGraphic } from 'components/Glyphs/SquaresGraphic';
import useTranslation from 'next-translate/useTranslation';

import * as StyledComponents from './styledComponents';

export const UnexpectedError = ({ errorMessage }: { errorMessage: string }) => {
  const { t } = useTranslation('errorPage:page-unexpected-error');
  return (
    <StyledComponents.Container>
      <StyledComponents.SquaresContainer>
        <SquaresGraphic />
      </StyledComponents.SquaresContainer>
      <StyledComponents.Content>
        <StyledComponents.Title>
          {t('errorPage:page-unexpected-error')}
        </StyledComponents.Title>
        <StyledComponents.Paragraph>{errorMessage}</StyledComponents.Paragraph>
      </StyledComponents.Content>
    </StyledComponents.Container>
  );
};
