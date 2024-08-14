import useTranslation from 'next-translate/useTranslation';

import { Scorpion, Gray } from 'styles/colours';
import { formatInteger } from 'utils/number';
import { ProgressArc } from 'containers/AmbitionSimulation/ProgressArc/ProgressArc';
import { Text } from 'components/Text';
import Icon from 'components/Icon';
import { EnvironmentCatalystDisabled } from 'components/Glyphs/EnvironmentCatalystDisabled';
import { EnvironmentCatalyst } from 'components/Glyphs/EnvironmentCatalyst';
import { InfoGreenIcon } from 'components/Glyphs/InfoGreen';
import { InfoIcon } from 'components/Glyphs/Info';
import { InfoDisabledIcon } from 'components/Glyphs/InfoDisabled';

import * as StyledComponents from './styledComponents';
import * as selectors from '../selectors';

function getInformationIconSvgPath(outStandingReductionValue: number) {
  if (outStandingReductionValue <= 0) {
    return <InfoGreenIcon />;
  }
  return <InfoIcon />;
}

export interface IProps {
  emissionReduction: number;
  outstandingReductions: number;
  achievedPercentageChange: number;
  desiredPercentageChange: number;
  disabled: boolean;
  toggleContactModal: () => void;
}

export const TotalLeverCard = ({
  emissionReduction,
  outstandingReductions,
  achievedPercentageChange,
  desiredPercentageChange,
  disabled,
  toggleContactModal,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <StyledComponents.Wrapper>
      <StyledComponents.ProgressWrapper>
        <ProgressArc
          achievedPercentageChange={achievedPercentageChange}
          desiredPercentageChange={desiredPercentageChange}
          disabled={disabled}
        />
      </StyledComponents.ProgressWrapper>

      <StyledComponents.InfoWrapper>
        <StyledComponents.InfoSection>
          {disabled ? <EnvironmentCatalystDisabled /> : <EnvironmentCatalyst />}
          <StyledComponents.TotalEmissions>
            <StyledComponents.Value
              data-testid={selectors.simulationReductions}
              size="16px"
              color={Scorpion}
              disabled={disabled}
              as="h4"
            >
              {formatInteger(emissionReduction)} {t('common:unit-mt-co2')}
            </StyledComponents.Value>
            <Text size="12px" color={Gray}>
              {t('ambitionSimulation:total-simulated-emissions')}
            </Text>
          </StyledComponents.TotalEmissions>
        </StyledComponents.InfoSection>

        <StyledComponents.InfoSection>
          {disabled ? (
            <InfoDisabledIcon />
          ) : (
            getInformationIconSvgPath(outstandingReductions)
          )}
          <StyledComponents.TotalEmissions>
            <StyledComponents.Value
              data-testid={selectors.simulationOutstandingReductions}
              size="16px"
              color={Scorpion}
              disabled={disabled}
              as="h4"
            >
              {formatInteger(outstandingReductions)} {t('common:unit-mt-co2')}
            </StyledComponents.Value>
            <Text size="12px" color={Gray}>
              {t('ambitionSimulation:achieve-ambition')}
            </Text>
          </StyledComponents.TotalEmissions>
        </StyledComponents.InfoSection>

        <StyledComponents.ContactButton
          data-testid={selectors.contactModalOpenBtn}
          onClick={toggleContactModal}
          disabled={disabled}
        >
          {t('ambitionSimulation:solutions-contact-btn')}
        </StyledComponents.ContactButton>

        <StyledComponents.FindOutMoreSection
          as="a"
          href="/simulation-calculations"
          target="_blank"
          aria-label={t(`common:opening-in-a-new-window`)}
        >
          <StyledComponents.IconContainer>
            <Icon
              src="/images/PublicSite/open.svg"
              alt={t('common:open-tab')}
            />
          </StyledComponents.IconContainer>
          <Text color={Scorpion} size="14px">
            <StyledComponents.FindMoreLink>
              {t('ambitionSimulation:calculation-more-info')}
            </StyledComponents.FindMoreLink>
          </Text>
        </StyledComponents.FindOutMoreSection>
      </StyledComponents.InfoWrapper>
    </StyledComponents.Wrapper>
  );
};
