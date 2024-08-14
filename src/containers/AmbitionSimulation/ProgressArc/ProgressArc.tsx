import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';

import {
  FunGreen,
  Gray,
  AlizarinCrimson,
  Scorpion,
  Silver,
  SilverChalice,
} from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { Text } from 'components/Text';
import { round } from 'utils/number';

import * as selectors from '../selectors';
import * as StyledComponents from './styledComponents';

export interface IProps {
  desiredPercentageChange: number;
  achievedPercentageChange: number;
  disabled: boolean;
}

export const STROKE_DASH = 18.5;

const ProgressArcWrapper = styled.div<{ progressFraction: number }>`
  position: relative;

  svg {
    display: block;
    margin: 0 auto;
  }

  .progress {
    transition: stroke-dasharray 0.5s linear;

    ${({ progressFraction }) => {
      if (
        !Number.isFinite(progressFraction) ||
        Number.isNaN(progressFraction) ||
        progressFraction <= 0
      ) {
        return `
          stroke-dasharray: 0 ${STROKE_DASH};
          stroke: ${Silver};
        `;
      }

      return `
        stroke-dasharray: ${progressFraction * STROKE_DASH} ${STROKE_DASH};
        stroke: ${FunGreen};
      `;
    }}
  }
`;

const getProgressColour = (achievedPercentageChange: number) => {
  if (achievedPercentageChange > 0) {
    return AlizarinCrimson;
  }
  if (achievedPercentageChange < 0) {
    return FunGreen;
  }

  return Scorpion;
};

const capAchievedPercentagePoints = (
  achievedPercentageReduction: number | undefined
) => {
  if (!achievedPercentageReduction) {
    return achievedPercentageReduction;
  }

  if (achievedPercentageReduction > 10000) {
    return '+10000';
  }

  if (achievedPercentageReduction < -10000) {
    return '-10000';
  }

  return String(achievedPercentageReduction);
};

export const ProgressArc = ({
  achievedPercentageChange,
  desiredPercentageChange,
  disabled,
}: IProps) => {
  const { t } = useTranslation();

  const progressFraction = achievedPercentageChange / desiredPercentageChange;

  const roundedAchievedPercentage = round(achievedPercentageChange) ?? 0;
  const progressColour = disabled
    ? SilverChalice
    : getProgressColour(roundedAchievedPercentage);

  const achievedPercentageReduction =
    achievedPercentageChange === 0
      ? achievedPercentageChange
      : achievedPercentageChange * -1;
  const desiredPercentageReduction =
    desiredPercentageChange === 0
      ? desiredPercentageChange
      : desiredPercentageChange * -1;

  return (
    <ProgressArcWrapper
      data-testid={selectors.simulationProgressArc}
      progressFraction={progressFraction}
    >
      <svg viewBox="0 0.5 10 8">
        <path
          d="M2 8 A 4 4 0 1 1 8 8"
          fill="none"
          strokeWidth="0.4"
          stroke={Silver}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          data-testid={selectors.progressArcLine}
          className="progress"
          d="M2 8 A 4 4 0 1 1 8 8"
          fill="none"
          strokeWidth="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <StyledComponents.ProgressInfo>
        <Text
          data-testid={selectors.achievedPercentageReduction}
          color={progressColour}
          family={exampleBold}
          size="32px"
          as="h1"
        >
          {capAchievedPercentagePoints(round(achievedPercentageReduction))}%
        </Text>
        <StyledComponents.ProgressSubtitle color={progressColour} size="14px">
          {t('ambitionSimulation:achieved')}
        </StyledComponents.ProgressSubtitle>
        <Text
          data-testid={selectors.desiredPercentageReduction}
          color={Gray}
          size="14px"
        >
          {t('ambitionSimulation:of')} {round(desiredPercentageReduction)}
          {'% '}
          {t('ambitionSimulation:desired-ambition')}
        </Text>
      </StyledComponents.ProgressInfo>
    </ProgressArcWrapper>
  );
};
