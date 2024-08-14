import useTranslation from 'next-translate/useTranslation';

import { trackEvent } from 'utils/analytics';
import { isexampleDomain } from 'utils/url';
import { SOLUTIONS_SELECTED_EVENT } from 'utils/analyticsEvents';
import { truncate } from 'utils/truncate';
import {
  getSolutionId,
  getSolutionImageSrc,
} from 'components/SolutionsDisplay/SolutionsCard/utils';
import { ISolution } from 'interfaces/Solutions';

import { useModal } from 'effects/useModal';
import { ModalType } from 'context/ModalProvider/types';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export const SolutionCards = () => {
  const { t } = useTranslation();
  const { openModal } = useModal();

  const handleClick = (solution: ISolution) => {
    trackEvent(SOLUTIONS_SELECTED_EVENT, {
      title: solution.title,
      id: getSolutionId(solution.id),
    });

    if (!isexampleDomain(solution.url)) {
      openModal({
        modalType: ModalType.EXTERNAL_LINK_DISCLAIMER,
        contentProps: {
          externalLink: solution.url,
        },
      });
    } else {
      window.open(solution.url);
    }
  };
  const solutionCards: ISolution[] = t(
    'publicSolutions:solution-cards',
    {},
    { returnObjects: true }
  );
  const totalSolutionsLength = solutionCards.length;
  const solutionsRangeStart = totalSolutionsLength - 3;
  const topThreeSolutions = solutionCards
    .slice(solutionsRangeStart, totalSolutionsLength)
    .reverse();

  return (
    <div data-testid={selectors.solutionCard}>
      {topThreeSolutions.map((solution) => {
        const solutionId = getSolutionId(solution.id);
        const solutionTitle = solution.title;
        const imageTitle = solution.imgAlt;

        return (
          <StyledComponents.Container key={solutionId}>
            <StyledComponents.Link
              data-testid={solutionId}
              as="a"
              onClick={() => handleClick(solution)}
              title={solutionTitle}
            >
              <StyledComponents.SmallHoverContainer>
                <StyledComponents.SmallImage
                  src={getSolutionImageSrc(solution.id)}
                  title={imageTitle}
                  alt={imageTitle}
                  data-testid={solutionId}
                />
                <StyledComponents.SmallOpenInNewTab>
                  <div>{t('publicSolutions:open-in-new-tab')}</div>
                </StyledComponents.SmallOpenInNewTab>
              </StyledComponents.SmallHoverContainer>

              <StyledComponents.TextWrapper>
                <StyledComponents.DateContainer>
                  <StyledComponents.DateText>
                    {solution.date}
                  </StyledComponents.DateText>
                </StyledComponents.DateContainer>
                <StyledComponents.TitleContainer>
                  <StyledComponents.TitleText title={solutionTitle}>
                    {truncate(solutionTitle)}
                  </StyledComponents.TitleText>
                </StyledComponents.TitleContainer>
                <StyledComponents.ReadMoreContainer>
                  <StyledComponents.NewTabIcon
                    src="/new-tab.svg"
                    title={solutionTitle}
                  />
                  <StyledComponents.ReadMoreText title={solutionTitle}>
                    {t('publicSolutions:read-more')}
                  </StyledComponents.ReadMoreText>
                </StyledComponents.ReadMoreContainer>
              </StyledComponents.TextWrapper>
            </StyledComponents.Link>
          </StyledComponents.Container>
        );
      })}
    </div>
  );
};
