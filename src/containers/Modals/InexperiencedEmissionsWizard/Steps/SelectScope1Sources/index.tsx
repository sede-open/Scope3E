import { ReactChild, useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Controller, useForm } from 'react-hook-form';

import { CorporateEmissionType } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import {
  INEXPERIENCED_FLOW_BACK,
  INEXPERIENCED_FLOW_CANCEL,
  INEXPERIENCED_FLOW_NEXT,
} from 'utils/analyticsEvents';
import { IllustratedCheckboxField } from 'components/Form/Fields/IllustratedCheckboxField';
import { ModalForm } from 'components/ModalForm';
import Icon from 'components/Icon';
import { WizardStepLayout } from 'components/Wizard/WizardStepLayout';
import { WizardControls } from 'components/Wizard/WizardControls';
import { companySectorsPrimarySectorName } from 'utils/companySectors';

import * as StyledComponents from '../../styledComponents';
import * as selectors from '../../selectors';
import {
  SCOPE_1_SOURCE_FIELD_KEYS as FIELD_KEYS,
  WizardState,
  InexperiencedFlowSteps,
} from '../../types';
import { getDefaultFormValues } from '../../utils';

type FormValues = {
  [key in FIELD_KEYS]?: boolean;
};

export interface IProps {
  closeModal: () => void;
  emissionType: CorporateEmissionType | null;
  onBack: (update: Partial<WizardState>) => void;
  onNext: (update: Partial<WizardState>) => void;
  wizardState: WizardState;
}

type FieldInfoType = {
  [key in FIELD_KEYS]: {
    title: string;
    subtitle: string;
    icon: ReactChild;
    selector: string;
  };
};

const fieldInfo: FieldInfoType = {
  [FIELD_KEYS.STATIONARY_MOBILE_COMBUSTION]: {
    title: 'inexperiencedFlow:stationary-mobile-combustion-title',
    subtitle: 'inexperiencedFlow:stationary-mobile-combustion-subtitle',
    icon: <Icon src="/stationary-mobile-combustion.svg" alt="" size={60} />,
    selector: selectors.stationaryAndMobileCombustionInput,
  },
  [FIELD_KEYS.INDUSTRIAL_PROCESS_AND_REFRIGIRANTS]: {
    title: 'inexperiencedFlow:industrial-processes-title',
    subtitle: 'inexperiencedFlow:industrial-processes-subtitle',
    icon: <Icon src="/industrial-process.svg" alt="" size={60} />,
    selector: selectors.industrialProcessAndRefrigirantsInput,
  },
};

export const SelectScope1Sources = ({
  closeModal,
  emissionType,
  onBack,
  onNext,
  wizardState,
}: IProps) => {
  const { company } = useAuthenticatedUser();
  const { t } = useTranslation();

  const fields = Object.values(FIELD_KEYS) as FIELD_KEYS[];

  const pageTitle = t('inexperiencedFlow:scope-1-select-title');

  const pageSubtitle = t('inexperiencedFlow:scope-1-select-subtitle');

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    watch,
  } = useForm<FormValues>({
    defaultValues: getDefaultFormValues(fields, wizardState),
    mode: 'onChange',
  });

  const formValues = watch();
  const isValid = Object.values(formValues).some((e) => e === true);

  const onSubmit = useCallback((data: FormValues) => {
    trackEvent(INEXPERIENCED_FLOW_NEXT, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      currentStep: InexperiencedFlowSteps.SELECT_SCOPE_1_SOURCES,
      emissionType,
    });

    onNext(data);
  }, []);

  const onBackClick = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_BACK, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.SELECT_SCOPE_1_SOURCES,
    });
    onBack(formValues);
  }, [formValues]);

  const onCancel = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_CANCEL, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.SELECT_SCOPE_1_SOURCES,
    });
    closeModal();
  }, []);

  return (
    <WizardStepLayout>
      <ModalForm
        isXl
        title={pageTitle}
        subtitle={pageSubtitle}
        dataTestId={selectors.scope1SourceSelectForm}
        isLoading={false}
        onSubmit={handleSubmit(onSubmit)}
      >
        <StyledComponents.SourceSelectionContainer>
          {fields.map((field) => {
            const { title, subtitle, icon, selector } = fieldInfo[field];

            return (
              <Controller
                key={field}
                control={control}
                name={field}
                render={({ value, onChange }) => (
                  <IllustratedCheckboxField
                    dataTestId={selector}
                    id={field}
                    title={t(title)}
                    subtitle={t(subtitle)}
                    icon={icon}
                    isChecked={value}
                    onChange={onChange}
                  />
                )}
              />
            );
          })}
        </StyledComponents.SourceSelectionContainer>
        <WizardControls
          closeModal={onCancel}
          onBack={onBackClick}
          isValid={isValid}
          isSubmitting={isSubmitting}
        />
      </ModalForm>
    </WizardStepLayout>
  );
};
