import { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';

import {
  EmissionAllocationDirection,
  EmissionAllocationStatus,
} from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import { EXPERIENCED_FLOW_START } from 'utils/analyticsEvents';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { ModalContentType } from 'containers/types';
import Modal from 'components/Modal';
import CogSpinner from 'components/CogSpinner';
import { companySectorsPrimarySectorName } from 'utils/companySectors';

import { useCorporateEmissionFormQuery } from './queries';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';
import { CorporateEmissionForm } from './Form';
import { getTitle, getSubtitle, getEmissionType } from './utils';

export interface IProps {
  closeModal: () => void;
  onNewActualSuccess?: () => void;
  onNewBaselineSuccess: () => void;
  formType: ModalContentType | null;
  selectedEmissionYear?: number;
}

export const CorporateEmissionFormContainer = ({
  onNewActualSuccess,
  onNewBaselineSuccess,
  closeModal,
  formType,
  selectedEmissionYear,
}: IProps) => {
  const { company } = useAuthenticatedUser();
  const { t } = useTranslation();

  useEffect(() => {
    trackEvent(EXPERIENCED_FLOW_START, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType: getEmissionType(formType),
    });
  }, []);

  const {
    data: emissionsFormData,
    loading: isLoading,
  } = useCorporateEmissionFormQuery({
    companyId: company?.id || '',
    emissionAllocation:
      EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
    statuses: [EmissionAllocationStatus.APPROVED],
    year: null,
  });

  return (
    <Modal
      isOpen
      isFullDisplay
      isContentLoading={isLoading}
      onClose={closeModal}
    >
      <div data-testid={selectors.getEmissionFormTestId(formType)}>
        {!isLoading && (
          <>
            <StyledComponents.Title data-testid={selectors.title}>
              {getTitle(t, formType)}
            </StyledComponents.Title>
            <StyledComponents.SubTitle data-testid={selectors.subtitle}>
              {getSubtitle(t, formType)}
            </StyledComponents.SubTitle>
          </>
        )}

        {isLoading ? (
          <StyledComponents.SpinnerContainer>
            <CogSpinner />
          </StyledComponents.SpinnerContainer>
        ) : (
          <CorporateEmissionForm
            closeModal={closeModal}
            emissionsFormData={emissionsFormData}
            formType={formType}
            onNewActualSuccess={onNewActualSuccess}
            onNewBaselineSuccess={onNewBaselineSuccess}
            selectedEmissionYear={selectedEmissionYear}
          />
        )}
      </div>
    </Modal>
  );
};
