import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { AlternativeSolutionsGrid } from 'components/PrivateSolutions/AlternativeSolutionsGrid';
import { SolutionsGridHeader } from 'components/PrivateSolutions/SolutionsGridHeader';
import { SolutionsFilter } from 'components/PrivateSolutions/SolutionsFilter';
import { OptionType } from 'components/SingleSelect';
import { SolutionInterestsSystemName } from 'types/globalTypes';
import Button from 'components/Button';
import { SolutionsGrid } from '../../components/PrivateSolutions/SolutionsGrid';
import {
  getUserSolutionRecommendations,
  getUserSolutionAlternatives,
} from './utils';
import { EmptyState } from './EmptyState';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';
import { SOLUTIONS_PER_PAGE, MS_BOOKINGS_URL } from './constants';
import { DecarbonisationPotential, Region } from './types';

interface IProps {
  interests: SolutionInterestsSystemName[];
}

export const PrivateSolutions = ({ interests }: IProps) => {
  if (!interests.length) {
    return null;
  }

  const { company } = useAuthenticatedUser();
  if (!company) {
    return null;
  }

  const { t } = useTranslation();
  const [numberOfSolutionsToShow, setNumberOfSolutionsToShow] = useState(
    SOLUTIONS_PER_PAGE
  );
  const [region, setRegion] = useState(Region.ALL);
  const [decarbonisationPotential, setDecarbonisationPotential] = useState(
    DecarbonisationPotential.ALL
  );

  const solutionsRecommendations = getUserSolutionRecommendations(
    interests,
    region,
    decarbonisationPotential
  );

  const recommendedSolutions = solutionsRecommendations.slice(
    0,
    numberOfSolutionsToShow
  );

  const handleShowMoreSolutions = () => {
    setNumberOfSolutionsToShow(numberOfSolutionsToShow + SOLUTIONS_PER_PAGE);
  };

  const onFilterUse = (
    regionOption: OptionType,
    decarbonisationPotentialOption: OptionType
  ): void => {
    setDecarbonisationPotential(
      decarbonisationPotentialOption.value as DecarbonisationPotential
    );
    setRegion(regionOption.value as Region);
  };

  const alternativeSolutions = getUserSolutionAlternatives(
    recommendedSolutions
  );
  const hasRecommendedSolutionInterests = recommendedSolutions.length > 0;
  const hasAlternativeSolutionInterests = alternativeSolutions.length > 0;

  return (
    <StyledComponents.Wrapper data-testid={selectors.solutions}>
      <StyledComponents.Banner data-testid={selectors.banner}>
        <StyledComponents.BannerTitle>
          {t('privateSolutions:banner-title')}
        </StyledComponents.BannerTitle>
        <StyledComponents.BannerSubtext>
          {t('privateSolutions:banner-title-subtext')}
        </StyledComponents.BannerSubtext>
        <StyledComponents.Anchor
          data-testid={selectors.bannerBtn}
          href={MS_BOOKINGS_URL}
          target="_blank"
          rel="external"
        >
          <Button>{t('privateSolutions:banner-button')}</Button>
        </StyledComponents.Anchor>
      </StyledComponents.Banner>
      <SolutionsGridHeader
        translationPrefix="privateSolutions"
        id={selectors.recommendedSolutionsGrid}
        hasEditDetails
        hasSubtitle
      />
      <SolutionsFilter onFilter={onFilterUse} />
      {hasRecommendedSolutionInterests ? (
        <>
          <SolutionsGrid solutions={recommendedSolutions} />
          {recommendedSolutions.length < solutionsRecommendations.length && (
            <StyledComponents.CtaContainer>
              <StyledComponents.CtaButton
                onClick={handleShowMoreSolutions}
                data-testid={selectors.showMoreRecommendations}
                color="secondary"
              >
                {t(`privateSolutions:${selectors.showMoreRecommendations}`)}
              </StyledComponents.CtaButton>
            </StyledComponents.CtaContainer>
          )}
        </>
      ) : (
        <EmptyState />
      )}
      {hasAlternativeSolutionInterests && alternativeSolutions.length < 3 && (
        <>
          <SolutionsGridHeader
            translationPrefix="privateSolutions"
            id={selectors.alternativeSolutionsGrid}
          />
          <SolutionsGrid solutions={alternativeSolutions} />
        </>
      )}
      {hasAlternativeSolutionInterests && alternativeSolutions.length > 3 && (
        <AlternativeSolutionsGrid
          translationPrefix="privateSolutions"
          id={selectors.alternativeSolutionsGrid}
          solutions={alternativeSolutions}
        />
      )}
    </StyledComponents.Wrapper>
  );
};
