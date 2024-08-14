import styled from 'styled-components';
import {
  AlizarinCrimson,
  Alto,
  Gray,
  Scorpion,
  SilverChalice,
  Supernova,
  Tundora,
  White,
} from 'styles/colours';
import Button from 'components/Button';
import { CTAContainer } from 'components/CTAContainer';
import { Text } from 'components/Text';

export const StepTitle = styled.h4`
  color: ${Tundora};
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const StepIntro = styled.p`
  color: ${Scorpion};
  font-size: 0.875rem;
  margin-bottom: 2rem;
`;

export const StepContainer = styled.div`
  padding: 2rem 3rem 3rem 0;
`;

export const StepNavigation = styled.div`
  align-items: center;
  display: flex;
  justify-content: right;
  padding-top: 1rem;
`;

export const TagListContainer = styled.div`
  margin-bottom: 1rem;
`;

export const StepTracker = styled.p`
  color: ${Gray};
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  margin-bottom: 8px;
`;

export const BackButton = styled(Button)`
  min-width: 0;
  cursor: pointer;
  padding: 1rem;
  margin-right: 12px;
`;

export const NextButton = styled(Button).attrs({
  color: 'primary',
})`
  min-height: 48px;
`;

export const InputContainer = styled.div<{ hasError?: boolean }>`
  width: 100%;
  max-width: 600px;
  background-color: ${White};
  border: 1px solid ${({ hasError }) => (hasError ? AlizarinCrimson : Alto)};
  margin-bottom: ${({ hasError }) => (hasError ? '0' : '16px')};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CompanyName = styled(Text).attrs({
  color: Tundora,
})`
  line-height: 20px;
`;

export const InviterTitle = styled(Text)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: ${Tundora};
  line-height: '16px';
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  margin: 2px 0;
`;

export const CtaContainer = styled(CTAContainer)`
  margin-top: 78px;
`;

export const LoadingSpinnerContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 16px 16px;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ConnectButton = styled(Button)<{
  isSelected: boolean;
}>`
  align-items: center;
  background-color: ${White};
  border: 1px solid ${SilverChalice};
  color: ${Tundora};
  cursor: pointer;
  display: flex;
  font-weight: bold;
  padding: 2px 14px 2px 10px;
  transition: background-color border-color 0.2s linear;

  &:hover,
  &:focus {
    border-color: ${Scorpion};
    background: ${White};
  }

  &::before {
    background: transparent url(/plus.svg) no-repeat 6px 6px;
    background-size: 12px 12px;
    content: '';
    display: block;
    height: 24px;
    margin-right: 0.4rem;
    width: 24px;
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    background: ${Supernova};
    border-color: ${Supernova};
    cursor: default;

    &:hover,
    &:focus {
      border-color: ${Supernova};
      background: ${Supernova};
    }

    &::before {
      background: transparent url(/checkbox-tick.svg) no-repeat 0 0;
      background-size: 24px 24px;
    }
  `}
`;

export const UserOnboardingCardImages = styled.div`
  &::before {
    background-size: cover;
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 375px;
  }
`;

export const UserOnboardingCardSectors = styled(UserOnboardingCardImages)`
  &::before {
    background: ${White} url('/images/onboarding-card-sectors.png') no-repeat 0
      0;
  }
`;

export const UserOnboardingCardIntersets = styled(UserOnboardingCardImages)`
  &::before {
    background: ${White} url('/images/onboarding-card-interests.png') no-repeat
      0 0;
  }
`;

export const UserOnboardingCardInvitations = styled(UserOnboardingCardImages)`
  &::before {
    background: ${White} url('/images/onboarding-card-invitations.png')
      no-repeat 0 0;
  }
`;
