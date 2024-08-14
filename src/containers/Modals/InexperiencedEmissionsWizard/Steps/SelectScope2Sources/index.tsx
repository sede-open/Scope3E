import { ReactChild, useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Controller, useForm } from 'react-hook-form';

import { CorporateEmissionType } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import {
  INEXPERIENCED_FLOW_BACK,
  INEXPERIENCED_FLOW_CANCEL,
  INEXPERIENCED_FLOW_NEXT,
} from 'utils/analyticsEvents';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { IllustratedCheckboxField } from 'components/Form/Fields/IllustratedCheckboxField';
import { ModalForm } from 'components/ModalForm';
import { WizardStepLayout } from 'components/Wizard/WizardStepLayout';
import { WizardControls } from 'components/Wizard/WizardControls';
import Icon from 'components/Icon';
import { companySectorsPrimarySectorName } from 'utils/companySectors';

import * as StyledComponents from '../../styledComponents';
import * as selectors from '../../selectors';
import {
  SCOPE_2_SOURCE_FIELD_KEYS as FIELD_KEYS,
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
  [FIELD_KEYS.PURCHASED_ELECTRICITY]: {
    title: 'inexperiencedFlow:purchased-electricity-title',
    subtitle: 'inexperiencedFlow:purchased-electricity-subtitle',
    icon: <Icon src="/purchased-electricity.svg" alt="" size={60} />,
    selector: selectors.electricityInput,
  },
  [FIELD_KEYS.PURCHASED_HEAT_COOLING]: {
    title: 'inexperiencedFlow:purchased-heat-cooling-title',
    subtitle: 'inexperiencedFlow:purchased-heat-cooling-subtitle',
    icon: <Icon src="/heat-cooling-steam.svg" alt="" size={60} />,
    selector: selectors.heatCoolingInput,
  },
};

export const SelectScope2Sources = ({
  closeModal,
  emissionType,
  onBack,
  onNext,
  wizardState,
}: IProps) => {
  const { company } = useAuthenticatedUser();
  const { t } = useTranslation();

  const fields = Object.values(FIELD_KEYS) as FIELD_KEYS[];

  const pageTitle = t('inexperiencedFlow:scope-2-select-title');

  const pageSubtitle = t('inexperiencedFlow:scope-2-select-subtitle');

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
      emissionType,
      currentStep: InexperiencedFlowSteps.SELECT_SCOPE_2_SOURCES,
    });
    onNext(data);
  }, []);

  const onBackClick = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_BACK, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.SELECT_SCOPE_2_SOURCES,
    });
    onBack(formValues);
  }, [formValues]);

  const onCancel = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_CANCEL, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.SELECT_SCOPE_2_SOURCES,
    });
    closeModal();
  }, []);

  return (
    <WizardStepLayout>
      <ModalForm
        isXl
        title={pageTitle}
        subtitle={pageSubtitle}
        dataTestId={selectors.scope2SourceSelectForm}
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
