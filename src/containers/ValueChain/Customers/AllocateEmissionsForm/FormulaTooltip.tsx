import useTranslation from 'next-translate/useTranslation';
import { TransText } from 'utils/TransText';
import { InfoToolTip } from 'components/InfoToolTip';
import Icon from 'components/Icon';
import * as StyledComponents from '../../styledComponents';

export const FormulaTooltip = () => {
  const { t } = useTranslation();
  const b = <b />;

  const icon = (
    <StyledComponents.IconContainer>
      <Icon
        src="/images/PublicSite/open.svg"
        alt={t('common:open-tab')}
        size={12}
      />
    </StyledComponents.IconContainer>
  );
  const valueChainReportingLink = (
    <StyledComponents.StyledExternalLink
      textAlign="left"
      link={t(
        'valueChain:allocation-form-emissions-tooltip-value-chain-reporting-link'
      )}
    >
      {t(
        'valueChain:allocation-form-emissions-tooltip-value-chain-reporting-link'
      )}
    </StyledComponents.StyledExternalLink>
  );
  const productLifeCycleReportingLink = (
    <StyledComponents.StyledExternalLink
      textAlign="left"
      link={t(
        'valueChain:allocation-form-emissions-tooltip-product-life-cycle-reporting-link'
      )}
    >
      {t(
        'valueChain:allocation-form-emissions-tooltip-product-life-cycle-reporting-link'
      )}
    </StyledComponents.StyledExternalLink>
  );

  return (
    <StyledComponents.TooltipContainer>
      <InfoToolTip
        id="formula-tool-tip"
        offset={{
          left: 120,
          right: 0,
          bottom: 0,
          top: 0,
        }}
        place="top"
        title={t('valueChain:allocation-formula-tool-tip-title')}
        ariaLabel={t('valueChain:allocation-formula-tool-tip-aria-label')}
        autoWidth
        shouldAlignPointerRight
      >
        <StyledComponents.ToolTipContent>
          <StyledComponents.FormulaContainer>
            <StyledComponents.FlexRowWrapper>
              <StyledComponents.TextWrapper borderBottom>
                <StyledComponents.FormulaText>
                  <TransText
                    text={t('valueChain:allocation-formula-top')}
                    components={{
                      b,
                    }}
                  />
                </StyledComponents.FormulaText>
              </StyledComponents.TextWrapper>
              <StyledComponents.TextWrapper>
                <StyledComponents.FormulaText>
                  <TransText
                    text={t('valueChain:allocation-formula-bottom')}
                    components={{
                      b,
                    }}
                  />
                </StyledComponents.FormulaText>
              </StyledComponents.TextWrapper>
            </StyledComponents.FlexRowWrapper>
            <StyledComponents.AlignmentWrapper>
              <StyledComponents.OperatorContainer>
                <StyledComponents.FormulaText>X</StyledComponents.FormulaText>
              </StyledComponents.OperatorContainer>
              <StyledComponents.FormulaText>
                <TransText
                  text={t('valueChain:allocation-cradle-to-gate-emissions')}
                  components={{
                    b,
                  }}
                />
              </StyledComponents.FormulaText>
            </StyledComponents.AlignmentWrapper>
          </StyledComponents.FormulaContainer>
          <StyledComponents.LinkText>
            <TransText
              text={t('valueChain:allocation-cradle-to-gate-definition')}
              components={{
                b,
              }}
            />
          </StyledComponents.LinkText>
          <StyledComponents.LinkText>
            <TransText
              text={t('valueChain:allocation-exact-definition')}
              components={{
                productLifeCycleReportingLink,
                icon,
                b,
              }}
            />
          </StyledComponents.LinkText>
          <StyledComponents.LinkText>
            <TransText
              text={t('valueChain:allocation-more-info')}
              components={{
                valueChainReportingLink,
                icon,
                b,
              }}
            />
          </StyledComponents.LinkText>
        </StyledComponents.ToolTipContent>
      </InfoToolTip>
    </StyledComponents.TooltipContainer>
  );
};
