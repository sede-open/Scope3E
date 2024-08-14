import Button from 'components/Button';
import Icon from 'components/Icon';
import { ModalType } from 'context/ModalProvider/types';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useModal } from 'effects/useModal';
import useTranslation from 'next-translate/useTranslation';
import { Scorpion } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { CorporateEmissionType } from 'types/globalTypes';
import * as StyledComponents from './styledComponents';

export const EmptyState = () => {
  const { t } = useTranslation();
  const { canEditSupplyDashboard } = useAuthenticatedUser();

  const { openModal } = useModal();

  const openEmissionPathSelect = () => {
    openModal({
      modalType: ModalType.EMISSION_PATH_SELECT,
      contentProps: {
        emissionType: CorporateEmissionType.ACTUAL,
      },
    });
  };

  return (
    <StyledComponents.EmptyStateContainer data-testid="emissions-trendline-empty">
      <Icon alt="" src="/images/data-missing.svg" size="115px" />
      <StyledComponents.TextContainer>
        <StyledComponents.Title
          as="h4"
          family={exampleBold}
          color={Scorpion}
          size="16px"
        >
          {t('dashboard:emissions-trendline-empty-heading')}
        </StyledComponents.Title>
        <StyledComponents.EmptyStateMessage color={Scorpion} size="16px">
          {t('dashboard:emissions-trendline-empty-message')}
        </StyledComponents.EmptyStateMessage>
      </StyledComponents.TextContainer>
      {canEditSupplyDashboard && (
        <StyledComponents.ButtonContainer>
          <Button
            onClick={openEmissionPathSelect}
            data-testid="emissions-trendline-empty-cta-primary"
          >
            {t('dashboard:emissions-trendline-empty-cta-primary')}
          </Button>
        </StyledComponents.ButtonContainer>
      )}
    </StyledComponents.EmptyStateContainer>
  );
};
