import useTranslation from 'next-translate/useTranslation';

import { trackEvent } from 'utils/analytics';
import { isexampleDomain } from 'utils/url';
import { SOLUTIONS_SELECTED_EVENT } from 'utils/analyticsEvents';

import { ISolution } from 'interfaces/Solutions';
import { useModal } from 'effects/useModal';
import { ModalType } from 'context/ModalProvider/types';
import * as selectors from '../selectors';
import * as StyledComponents from './styledComponents';
import {
  MainDateText,
  MainHorizontalContainer,
  MainHorizontalTitleContainer,
  MainHoverContainerHorizontal,
  MainImageHorizontal,
  MainOpenInNewTabHorizontal,
  MainReadMoreHorizontalContainer,
  MainReadMoreImage,
  MainReadMoreTextHorizontal,
  MainTitleHorizontalText,
  TextWrapperHorizontal,
} from './styledComponents';
import { getSolutionId, getSolutionImageSrc } from './utils';

interface IProps {
  isMostRecentlyAddedSolution: boolean;
  solution: ISolution;
  layout?: 'veritical' | 'horizontal';
}

export const SolutionsCard = ({
  isMostRecentlyAddedSolution,
  solution,
  layout = 'veritical',
}: IProps) => {
  const { t } = useTranslation();

  const { id, title, imgAlt, date, url } = solution;
  const { openModal } = useModal();

  const solutionId = getSolutionId(id);
  const imagePath = getSolutionImageSrc(id);

  const handleClick = () => {
    trackEvent(SOLUTIONS_SELECTED_EVENT, {
      title,
      id: solutionId,
    });

    if (!isexampleDomain(url)) {
      openModal({
        modalType: ModalType.EXTERNAL_LINK_DISCLAIMER,
        contentProps: {
          externalLink: url,
        },
      });
    } else {
      window.open(url);
    }
  };
  if (layout === 'horizontal') {
    return (
      <div data-testid={selectors.solutionsCard}>
        <StyledComponents.Link
          data-testid={selectors.link}
          onClick={handleClick}
          title={title}
        >
          <MainHorizontalContainer>
            <MainHoverContainerHorizontal>
              <MainImageHorizontal
                src={imagePath}
                title={imgAlt}
                alt={imgAlt}
                data-testid={solutionId}
              />
              <MainOpenInNewTabHorizontal>
                <div>{t('publicSolutions:open-in-new-tab')}</div>
              </MainOpenInNewTabHorizontal>
            </MainHoverContainerHorizontal>
            <TextWrapperHorizontal>
              <MainDateText>{date}</MainDateText>
              <MainHorizontalTitleContainer>
                <MainTitleHorizontalText title={title}>
                  {title}
                </MainTitleHorizontalText>
              </MainHorizontalTitleContainer>

              <MainReadMoreHorizontalContainer>
                <MainReadMoreImage src="/new-tab.svg" title={title} />
                <MainReadMoreTextHorizontal title={title}>
                  {t('publicSolutions:read-more')}
                </MainReadMoreTextHorizontal>
              </MainReadMoreHorizontalContainer>
            </TextWrapperHorizontal>
          </MainHorizontalContainer>
        </StyledComponents.Link>
      </div>
    );
  }

  return isMostRecentlyAddedSolution ? (
    <StyledComponents.MainContainer data-testid={selectors.solutionsCard}>
      <StyledComponents.Link
        data-testid={selectors.link}
        onClick={handleClick}
        title={title}
      >
        <StyledComponents.MainHoverContainer>
          <StyledComponents.MainImage
            src={imagePath}
            title={imgAlt}
            alt={imgAlt}
            data-testid={solutionId}
          />
          <StyledComponents.MainOpenInNewTab>
            <div>{t('publicSolutions:open-in-new-tab')}</div>
          </StyledComponents.MainOpenInNewTab>
        </StyledComponents.MainHoverContainer>

        <StyledComponents.TextWrapper>
          <StyledComponents.MainDateContainer>
            <StyledComponents.MainDateText>
              {date}
            </StyledComponents.MainDateText>
          </StyledComponents.MainDateContainer>
          <StyledComponents.MainTitleContainer>
            <StyledComponents.MainTitleText title={title}>
              {title}
            </StyledComponents.MainTitleText>
          </StyledComponents.MainTitleContainer>
          <StyledComponents.MainReadMoreContainer>
            <StyledComponents.MainReadMoreImage
              src="/new-tab.svg"
              title={title}
            />
            <StyledComponents.MainReadMoreText title={title}>
              {t('publicSolutions:read-more')}
            </StyledComponents.MainReadMoreText>
          </StyledComponents.MainReadMoreContainer>
        </StyledComponents.TextWrapper>
      </StyledComponents.Link>
    </StyledComponents.MainContainer>
  ) : (
    <StyledComponents.SmallContainer data-testid={selectors.solutionsCard}>
      <StyledComponents.Link
        data-testid={selectors.link}
        onClick={handleClick}
        title={title}
      >
        <StyledComponents.SmallHoverContainer>
          <StyledComponents.SmallImage
            src={imagePath}
            title={imgAlt}
            alt={imgAlt}
            data-testid={solutionId}
          />
          <StyledComponents.SmallOpenInNewTab>
            <div>{t('publicSolutions:open-in-new-tab')}</div>
          </StyledComponents.SmallOpenInNewTab>
        </StyledComponents.SmallHoverContainer>
        <StyledComponents.TextWrapper>
          <StyledComponents.SmallDateContainer>
            <StyledComponents.SmallDateText>
              {date}
            </StyledComponents.SmallDateText>
          </StyledComponents.SmallDateContainer>
          <StyledComponents.SmallTitleContainer>
            <StyledComponents.SmallTitleText title={title}>
              {title}
            </StyledComponents.SmallTitleText>
          </StyledComponents.SmallTitleContainer>
          <StyledComponents.SmallReadMoreContainer>
            <StyledComponents.SmallNewTabIcon
              src="/new-tab.svg"
              title={title}
            />
            <StyledComponents.SmallReadMoreText title={title}>
              {t('publicSolutions:read-more')}
            </StyledComponents.SmallReadMoreText>
          </StyledComponents.SmallReadMoreContainer>
        </StyledComponents.TextWrapper>
      </StyledComponents.Link>
    </StyledComponents.SmallContainer>
  );
};

SolutionsCard.defaultProps = {
  layout: 'vertical',
};
