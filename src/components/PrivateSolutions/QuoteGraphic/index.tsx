import useTranslation from 'next-translate/useTranslation';

import { ChangelogSquare } from 'components/Glyphs/ChangelogSquare';
import { ChangelogSquares } from 'components/Glyphs/ChangelogSquares';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  solutionId: string;
}

export const QuoteGraphic = ({ solutionId }: IProps) => {
  const { t } = useTranslation();

  return (
    <div data-testid={selectors.quoteGraphic}>
      <StyledComponents.GraphicContainer>
        <StyledComponents.ChangelogSquareContainer>
          <ChangelogSquare title={t('solutionDetail:square-graphic-text')} />
        </StyledComponents.ChangelogSquareContainer>
        <StyledComponents.ChangelogSquaresContainer>
          <ChangelogSquares title={t('solutionDetail:squares-graphic-text')} />
        </StyledComponents.ChangelogSquaresContainer>
      </StyledComponents.GraphicContainer>
      <StyledComponents.QuoteContainer>
        <StyledComponents.Quote>
          {t(`solutionDetail:${solutionId}-quote`)}
        </StyledComponents.Quote>
        <StyledComponents.QuoteName>
          {t(`solutionDetail:${solutionId}-quote-name`)}
        </StyledComponents.QuoteName>
        <StyledComponents.QuoteRole>
          {t(`solutionDetail:${solutionId}-quote-role`)}
        </StyledComponents.QuoteRole>
      </StyledComponents.QuoteContainer>
    </div>
  );
};
