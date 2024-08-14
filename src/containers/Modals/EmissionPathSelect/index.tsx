import { EmissionPathCards } from 'components/EmissionPathCards';
import Modal from 'components/Modal';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import { CorporateEmissionType } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import { EMISSION_PATH_SELECT_OPENED } from 'utils/analyticsEvents';
import { companySectorsPrimarySectorName } from 'utils/companySectors';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export interface IProps {
  closeModal: () => void;
  emissionType: CorporateEmissionType;
  selectedEmissionYear?: number;
}

export const EmissionPathSelect = ({
  closeModal,
  emissionType,
  selectedEmissionYear,
}: IProps) => {
  const { t } = useTranslation();

  const { company } = useAuthenticatedUser();

  useEffect(() => {
    trackEvent(EMISSION_PATH_SELECT_OPENED, {
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      companyName: company?.name,
      emissionType,
    });
  }, []);
  return (
    <Modal isOpen onClose={closeModal}>
      <StyledComponents.Container data-testid={selectors.container}>
        <StyledComponents.Title>
          {t('modals:emission-path-select-title')}
        </StyledComponents.Title>
        <StyledComponents.Subtitle>
          {t('modals:emission-path-select-subtitle')}
        </StyledComponents.Subtitle>
        <EmissionPathCards
          emissionType={emissionType}
          selectedEmissionYear={selectedEmissionYear}
        />
      </StyledComponents.Container>
    </Modal>
  );
};
