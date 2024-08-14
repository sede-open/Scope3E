import { WizardControls } from 'components/Wizard/WizardControls';
import { WizardStepWithInfoLayout } from 'components/Wizard/WizardStepWithInfoLayout';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { getCorporateEmissionAccessMock } from 'mocks/emissionAccess';
import useTranslation from 'next-translate/useTranslation';
import { useCallback } from 'react';
import { CorporateEmissionType } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import {
  INEXPERIENCED_FLOW_BACK,
  INEXPERIENCED_FLOW_CANCEL,
  INEXPERIENCED_FLOW_NEXT,
} from 'utils/analyticsEvents';
import { companySectorsPrimarySectorName } from 'utils/companySectors';
import { formatDecimal } from 'utils/number';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import * as selectors from '../../selectors';
import {
  EMISSION_YEAR_FIELD_KEYS,
  InexperiencedFlowSteps,
  WizardState,
} from '../../types';
import { useCreateInexperiencedBaseline } from './mutations';
import { ScopeSummary } from './ScopeSummary';
import { SummaryInfo } from './SummaryInfo';
import { getScope2Type } from './utils';

export interface IProps {
  onNext: () => void;
  onBack: () => void;
  closeModal: () => void;
  wizardState: WizardState;
  emissionType: CorporateEmissionType | null;
}

export const Summary = ({
  wizardState,
  onNext,
  onBack,
  closeModal,
  emissionType,
}: IProps) => {
  const { t } = useTranslation();
  const { company } = useAuthenticatedUser();

  if (!company) {
    return null;
  }

  const scope1TotalEmissions =
    wizardState.stationaryCombustionTotal +
    wizardState.processRefrigerantsTotal;
  const scope2TotalEmissions =
    wizardState.electricityTotal + wizardState.heatCoolingTotal;

  const totalEmissions = scope1TotalEmissions + scope2TotalEmissions;

  const scope1TotalDisplay = formatDecimal(scope1TotalEmissions);
  const scope2TotalDisplay = formatDecimal(scope2TotalEmissions);
  const totalDisplay = formatDecimal(totalEmissions);

  const stationaryCombustionDisplay = formatDecimal(
    wizardState.stationaryCombustionTotal
  );
  const processRefrigerantsDisplay = formatDecimal(
    wizardState.processRefrigerantsTotal
  );
  const electricityDisplay = formatDecimal(wizardState.electricityTotal);
  const heatCoolingSteamDisplay = formatDecimal(wizardState.heatCoolingTotal);

  const [createEmission] = useCreateInexperiencedBaseline({
    onError: (err) => {
      console.debug({ err });
      displayErrorMessage({
        title: t('common:save-toast-error'),
      });
    },

    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:save-toast-success'),
      });

      onNext();
    },
  });

  const onNextClick = useCallback(async () => {
    trackEvent(INEXPERIENCED_FLOW_NEXT, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.SUMMARY,
    });

    const corporateEmissionAccess = getCorporateEmissionAccessMock();

    await createEmission({
      variables: {
        input: {
          year: Number(wizardState[EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR]),
          companyId: company.id,
          type: emissionType || CorporateEmissionType.BASELINE,
          scope1: scope1TotalEmissions,
          scope2: scope2TotalEmissions,
          scope2Type: getScope2Type(wizardState),
          scope3: null,
          offset: null,
          headCount: null,
          corporateEmissionAccess,
        },
      },
    });
  }, [wizardState, scope1TotalEmissions, scope2TotalEmissions]);

  const onBackClick = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_BACK, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.SUMMARY,
    });
    onBack();
  }, []);

  const closeModalClick = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_CANCEL, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.SUMMARY,
    });
    closeModal();
  }, []);

  return (
    <WizardStepWithInfoLayout
      dataTestId={selectors.summary}
      title={t('inexperiencedFlow:summary-title')}
      subtitle={t('inexperiencedFlow:summary-subtitle')}
      leftContent={
        <>
          <ScopeSummary
            unit={t('common:unit-mt-co2')}
            totalRow={{
              name: t('inexperiencedFlow:summary-scope1'),
              total: scope1TotalDisplay,
              dataTestId: selectors.summaryScope1Total,
            }}
            detailRows={[
              {
                name: t('inexperiencedFlow:summary-combustion'),
                total: stationaryCombustionDisplay,
                dataTestId: selectors.summaryCombustionTotal,
              },
              {
                name: t('inexperiencedFlow:summary-process-refrigerants'),
                total: processRefrigerantsDisplay,
                dataTestId: selectors.summaryRefrigerantsTotal,
              },
            ]}
          />

          <ScopeSummary
            unit={t('common:unit-mt-co2')}
            totalRow={{
              name: t('inexperiencedFlow:summary-scope2'),
              total: scope2TotalDisplay,
              dataTestId: selectors.summaryScope2Total,
            }}
            detailRows={[
              {
                name: t('inexperiencedFlow:summary-electricity'),
                total: electricityDisplay,
                dataTestId: selectors.summaryElectricityTotal,
              },
              {
                name: t('inexperiencedFlow:summary-heat-cooling-steam'),
                total: heatCoolingSteamDisplay,
                dataTestId: selectors.summaryHeatCoolingSteamTotal,
              },
            ]}
          />

          <ScopeSummary
            isBaselineTotal
            unit={t('common:unit-mt-co2')}
            totalRow={{
              name: t('inexperiencedFlow:summary-total-emissions', {
                year: wizardState[EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR],
              }),
              total: totalDisplay,
              dataTestId: selectors.summaryTotal,
            }}
          />

          <WizardControls
            onNext={onNextClick}
            closeModal={closeModalClick}
            onBack={onBackClick}
            isValid
            isSubmitting={false}
            nextText={t('common:save')}
          />
        </>
      }
      rightContent={<SummaryInfo />}
    />
  );
};
