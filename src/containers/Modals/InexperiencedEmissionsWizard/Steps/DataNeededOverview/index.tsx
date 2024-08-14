import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import {
  INEXPERIENCED_FLOW_BACK,
  INEXPERIENCED_FLOW_CANCEL,
  INEXPERIENCED_FLOW_NEXT,
} from 'utils/analyticsEvents';
import { trackEvent } from 'utils/analytics';

import { CorporateEmissionType } from 'types/globalTypes';
import { WizardStepWithInfoLayout } from 'components/Wizard/WizardStepWithInfoLayout';
import { WizardControls } from 'components/Wizard/WizardControls';
import Icon from 'components/Icon';
import { companySectorsPrimarySectorName } from 'utils/companySectors';

import * as selectors from '../../selectors';
import { InexperiencedFlowSteps, WizardState } from '../../types';

import * as StyledComponents from './styledComponents';
import { getDataNeededList } from './utils';

export interface IProps {
  onNext: () => void;
  onBack: () => void;
  closeModal: () => void;
  emissionType: CorporateEmissionType | null;
  wizardState: WizardState;
}

export const DataNeededOverview = ({
  wizardState,
  onNext,
  onBack,
  closeModal,
  emissionType,
}: IProps) => {
  const { company } = useAuthenticatedUser();
  const { t } = useTranslation();

  const dataNeeded = getDataNeededList(wizardState, t);
  const cancelText = t('common:come-back-later');

  const onNextClick = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_NEXT, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.DATA_NEEDED_OVERVIEW,
    });
    onNext();
  }, []);

  const onBackClick = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_BACK, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.DATA_NEEDED_OVERVIEW,
    });
    onBack();
  }, []);

  const closeModalClick = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_CANCEL, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.DATA_NEEDED_OVERVIEW,
    });
    closeModal();
  }, []);

  return (
    <WizardStepWithInfoLayout
      dataTestId={selectors.dataNeededOverview}
      title={t('inexperiencedFlow:data-needed-title')}
      subtitle={t('inexperiencedFlow:data-needed-subtitle')}
      leftContent={
        <>
          <StyledComponents.DataListContainer>
            <StyledComponents.DataList>
              {dataNeeded.map((data) => (
                <StyledComponents.DataListItem key={data}>
                  {data}
                </StyledComponents.DataListItem>
              ))}
            </StyledComponents.DataList>
          </StyledComponents.DataListContainer>
          <WizardControls
            cancelText={cancelText}
            onNext={onNextClick}
            closeModal={closeModalClick}
            onBack={onBackClick}
            isValid
            isSubmitting={false}
          />
        </>
      }
      rightContent={<Icon src="/journey.svg" alt="" size="180px" />}
    />
  );
};
