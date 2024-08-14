import useTranslation from 'next-translate/useTranslation';

import Button from 'components/Button';
import { InfoToolTip } from 'components/InfoToolTip';
import { Scorpion } from 'styles/colours';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  hasToolTip?: boolean;
  solutionId: string;
  toggleContactModal: () => void;
}

export const SolutionHighlightCard = ({
  hasToolTip,
  solutionId,
  toggleContactModal,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <StyledComponents.HighlightContainer
      data-testid={selectors.solutionHighlightCard}
    >
      <StyledComponents.SubtitleContainer>
        <StyledComponents.HighlightSubtitle>
          {t('solutionDetail:highlight-estimated-cost-subtitle')}
        </StyledComponents.HighlightSubtitle>
        {hasToolTip && (
          <StyledComponents.TooltipContainer
            data-testid={selectors.highlighTooltip}
          >
            <InfoToolTip
              id="highlight-tool-tip"
              offset={{
                left: 75,
                right: 0,
                bottom: 0,
                top: 0,
              }}
              place="top"
              shouldAlignPointerRight
              color={Scorpion}
              title={t('common:common-tooltip')}
              ariaLabel={t('solutionDetail:highlight-tool-tip-aria-label')}
            >
              <StyledComponents.ContentWrapper>
                {t('solutionDetail:highlight-toolip-content')}
              </StyledComponents.ContentWrapper>
            </InfoToolTip>
          </StyledComponents.TooltipContainer>
        )}
      </StyledComponents.SubtitleContainer>
      <StyledComponents.HighlightSubtext>
        {t(`solutionDetail:${solutionId}-estimated-cost-highlight-subtext`)}
      </StyledComponents.HighlightSubtext>
      <StyledComponents.HighlightSubtitle>
        {t('solutionDetail:highlight-decarbonisation-subtitle')}
      </StyledComponents.HighlightSubtitle>
      <StyledComponents.HighlightSubtext>
        {t(`solutionDetail:${solutionId}-decarbonisation-highlight-subtext`)}
      </StyledComponents.HighlightSubtext>
      <StyledComponents.HighlightSubtitle>
        {t('solutionDetail:highlight-regions-subtitle')}
      </StyledComponents.HighlightSubtitle>
      <StyledComponents.HighlightSubtext>
        {t(`solutionDetail:${solutionId}-regions-highlight-subtext`)}
      </StyledComponents.HighlightSubtext>
      <StyledComponents.HighlightSubtitle>
        {t('solutionDetail:highlight-delivering-organisation-subtitle')}
      </StyledComponents.HighlightSubtitle>
      <StyledComponents.HighlightSubtext>
        {t(
          `solutionDetail:${solutionId}-delivering-organisation-highlight-subtext`
        )}
      </StyledComponents.HighlightSubtext>

      <StyledComponents.HighlightContactUsContainer>
        <StyledComponents.SalesImage
          src="/images/solution-sales-people.png"
          alt={t('solutionDetail:sales-team-photo-alt-text')}
        />
        <StyledComponents.HighlightExplore>
          {t('solutionDetail:highlight-explore')}
        </StyledComponents.HighlightExplore>
        <StyledComponents.CtaContainer>
          <Button
            width="auto"
            color="primary"
            onClick={toggleContactModal}
            data-testid={selectors.highlightContactUsBtn}
          >
            {t('solutionDetail:highlight-btn-text')}
          </Button>
        </StyledComponents.CtaContainer>
      </StyledComponents.HighlightContactUsContainer>
    </StyledComponents.HighlightContainer>
  );
};

SolutionHighlightCard.defaultProps = {
  hasToolTip: false,
};
