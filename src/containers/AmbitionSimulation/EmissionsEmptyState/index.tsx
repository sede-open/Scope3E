import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { CorporateEmissionType } from 'types/globalTypes';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useModal } from 'effects/useModal';
import { ModalType } from 'context/ModalProvider/types';
import { Text } from 'components/Text';
import { Scorpion } from 'styles/colours';

import * as selectors from '../selectors';
import * as StyledComponents from './styledComponents';

export const EmissionsEmptyState = () => {
  const { t } = useTranslation();
  const { canEditSupplyDashboard } = useAuthenticatedUser();

  const { openModal } = useModal();

  const openNewEmissionsForm = useCallback(() => {
    openModal({
      modalType: ModalType.EMISSION_PATH_SELECT,
      contentProps: {
        emissionType: CorporateEmissionType.BASELINE,
      },
    });
  }, []);

  return (
    <StyledComponents.Wrapper data-testid={selectors.emissionsEmptyState}>
      <Text color={Scorpion} size="16px">
        {t('ambitionSimulation:empty-emission-message')}
      </Text>

      {canEditSupplyDashboard && (
        <StyledComponents.CTAButton
          data-testid={selectors.emissionsEmptyStateBtn}
          onClick={openNewEmissionsForm}
        >
          {t('ambitionSimulation:add-emission-btn')}
        </StyledComponents.CTAButton>
      )}
    </StyledComponents.Wrapper>
  );
};
