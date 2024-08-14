import useTranslation from 'next-translate/useTranslation';

import { FooterCard } from 'components/FooterCard';

import { SolutionsDisplay } from '../../components/SolutionsDisplay';
import * as StyledComponents from './styledComponents';

export const Solutions = () => {
  const { t } = useTranslation();

  const solutionsLength = t(
    'publicSolutions:solution-cards',
    {},
    { returnObjects: true }
  ).length;

  return (
    <>
      <StyledComponents.Wrapper>
        <StyledComponents.TitleContainer>
          <StyledComponents.Title>
            {t('publicSolutions:page-title')}
          </StyledComponents.Title>
        </StyledComponents.TitleContainer>
        <SolutionsDisplay solutionsLength={solutionsLength} />
      </StyledComponents.Wrapper>
      <FooterCard invertColor />
    </>
  );
};
