import { useCallback, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import CogSpinner from 'components/CogSpinner';
import Modal from 'components/Modal';
import { trackEvent } from 'utils/analytics';
import { getIntensityEmission } from 'utils/carbonIntensities';
import {
  TARGET_FORM_DISMISSED,
  TARGET_FORM_SUBMIT,
} from 'utils/analyticsEvents';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';

import {
  TargetFormDataQuery_targets_absolute as AbsoluteTarget,
  TargetFormDataQuery_targets_intensity as IntensityTarget,
} from 'types/TargetFormDataQuery';
import { CorporateEmissionType, TargetType } from 'types/globalTypes';
import { useTargetFormData } from './queries';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';
import {
  AbsoluteFormValues,
  FIELD_KEYS,
  FormTargetType,
  FormValues,
  IncludeCarbonOffsetStatus,
  IntensityFormValues,
} from './types';
import { TargetCard } from './TargetCard';
import { Form } from './Form';
import { TargetChart } from './TargetChart';
import { useSaveTargets } from './mutations';
import { getTargetDataForSaving } from './utils';

interface IProps {
  closeModal: () => void;
}

export const TargetFormContainer = ({ closeModal }: IProps) => {
  const { t } = useTranslation();

  const { company } = useAuthenticatedUser();

  const companyId = company?.id;

  if (!companyId) {
    return null;
  }

  const { data: targetFormData, loading: isLoading } = useTargetFormData({
    companyId,
  });

  const absolute = targetFormData?.targets?.absolute ?? [];
  const intensity = targetFormData?.targets?.intensity ?? [];

  const emissions = targetFormData?.corporateEmissions ?? [];
  const baseline = emissions.find(
    (e) => e.type === CorporateEmissionType.BASELINE
  );

  const getAbsoluteDefaultValues = (
    target?: AbsoluteTarget
  ): AbsoluteFormValues => {
    const baselineOption = { value: baseline?.year, label: baseline?.year };

    const defaultScope1And2ValueYear =
      target?.scope1And2Year != null
        ? {
            value: target?.scope1And2Year,
            label: target?.scope1And2Year,
          }
        : null;

    const defaultScope3ValueYear =
      target?.scope3Year != null
        ? {
            value: target?.scope3Year,
            label: target?.scope3Year,
          }
        : null;

    let defaultIncludeCarbonOffsetValue: IncludeCarbonOffsetStatus | undefined;
    if (target) {
      defaultIncludeCarbonOffsetValue =
        target?.includeCarbonOffset === true
          ? IncludeCarbonOffsetStatus.INCLUDED
          : IncludeCarbonOffsetStatus.EXCLUDED;
    }

    return {
      [FIELD_KEYS.BASELINE_SCOPE_1_AND_2]: baselineOption,
      [FIELD_KEYS.BASELINE_SCOPE_3]: baselineOption,
      [FIELD_KEYS.SCOPE_1_AND_2_YEAR]: defaultScope1And2ValueYear,
      [FIELD_KEYS.SCOPE_1_AND_2_REDUCTION]: target?.scope1And2Reduction ?? null,
      [FIELD_KEYS.SCOPE_3_YEAR]: defaultScope3ValueYear,
      [FIELD_KEYS.SCOPE_3_REDUCTION]: target?.scope3Reduction ?? null,
      [FIELD_KEYS.STRATEGY]: target?.strategy ?? null,
      [FIELD_KEYS.INCLUDE_CARBON_OFFSET]:
        defaultIncludeCarbonOffsetValue ?? null,
      [FIELD_KEYS.SCOPE_1_AND_2_PRIVACY_TYPE]:
        target?.scope1And2PrivacyType ?? null,
      [FIELD_KEYS.SCOPE_3_PRIVACY_TYPE]: target?.scope3PrivacyType ?? null,
    };
  };

  const getIntensityDefaultValues = (
    target?: IntensityTarget
  ): IntensityFormValues => {
    const absoluteDefaultValues = getAbsoluteDefaultValues(target);

    const targetIntensityMetricOption =
      baseline?.carbonIntensities.find(
        ({ intensityMetric }) => target?.intensityMetric === intensityMetric
      ) ?? baseline?.carbonIntensities[0];

    const intensityMetricOption = targetIntensityMetricOption
      ? {
          label: t(
            `carbonIntensity:${targetIntensityMetricOption.intensityMetric}`
          ),
          value: targetIntensityMetricOption.intensityMetric,
          intensityValue: targetIntensityMetricOption.intensityValue,
        }
      : null;

    return {
      ...absoluteDefaultValues,
      [FIELD_KEYS.INTENSITY_METRIC]: intensityMetricOption,
    };
  };

  const form = useForm<FormValues>({
    defaultValues: {
      absolute: absolute.map(getAbsoluteDefaultValues),
      intensity: intensity.map(getIntensityDefaultValues),
    },
  });

  const formValues = form.watch(['absolute', 'intensity']);

  useEffect(() => {
    form.reset({
      absolute: absolute.map(getAbsoluteDefaultValues),
      intensity: intensity.map(getIntensityDefaultValues),
    });
  }, [targetFormData]);

  const options = {
    onError: () => {
      displayErrorMessage({
        title: t('common:save-toast-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:save-toast-success'),
      });
      trackEvent(TARGET_FORM_SUBMIT, {
        companyId,
        companyName: company?.name,
      });
      closeModal();
    },
  };

  const [saveTargets] = useSaveTargets(options);

  const onSubmit = useCallback(async (data: FormValues) => {
    const {
      absolute: absoluteTargets = [],
      intensity: intensityTargets = [],
    } = data;

    if (absoluteTargets.length === 0 && intensityTargets.length === 0) {
      return;
    }

    await saveTargets({
      variables: {
        input: {
          companyId,
          toSave: [
            ...getTargetDataForSaving(absoluteTargets, TargetType.ABSOLUTE),
            ...getTargetDataForSaving(intensityTargets, TargetType.INTENSITY),
          ],
        },
      },
    });
  }, []);

  const handleOpenAbsoluteForm = () => {
    form.reset({
      absolute: [...formValues.absolute, getAbsoluteDefaultValues()],
      intensity: formValues.intensity,
    });
  };

  const handleOpenIntensityForm = () => {
    form.reset({
      absolute: formValues.absolute,
      intensity: [...formValues.intensity, getIntensityDefaultValues()],
    });
  };

  const getIncludesCarbonOffset = (
    includeCarbonOffset?: IncludeCarbonOffsetStatus | null
  ) =>
    includeCarbonOffset &&
    includeCarbonOffset === IncludeCarbonOffsetStatus.INCLUDED;

  const isDisabled =
    (!formValues.absolute.length && !formValues.intensity.length) ||
    form.formState.isSubmitting ||
    Boolean(Object.keys(form.errors).length);

  return (
    <Modal isOpen isFullDisplay onClose={closeModal}>
      <StyledComponents.Wrapper data-testid={selectors.targetForm}>
        <StyledComponents.TitleContainer>
          <StyledComponents.Title>
            {t('targetForm:new-title')}
          </StyledComponents.Title>
          <StyledComponents.SubtitleContainer>
            <StyledComponents.Subtitle>
              {t('targetForm:new-subtitle')}
            </StyledComponents.Subtitle>
          </StyledComponents.SubtitleContainer>
        </StyledComponents.TitleContainer>
        {isLoading ? (
          <CogSpinner />
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {formValues.absolute.length ? (
              formValues.absolute.map((field, index) => (
                <TargetCard
                  key={FormTargetType.ABSOLUTE}
                  formKey={FormTargetType.ABSOLUTE}
                  form={
                    <Form
                      formKey={FormTargetType.ABSOLUTE}
                      form={form}
                      field={field}
                      fieldIndex={index}
                      baseline={baseline}
                    />
                  }
                  chart={
                    <TargetChart
                      baseline={baseline || null}
                      scope1And2Year={field.scope1And2Year?.value}
                      scope1And2Reduction={field.scope1And2Reduction}
                      scope3Year={field.scope3Year?.value}
                      scope3Reduction={field.scope3Reduction}
                      includeCarbonOffset={getIncludesCarbonOffset(
                        field.includeCarbonOffset
                      )}
                      strategy={field.strategy}
                    />
                  }
                />
              ))
            ) : (
              <TargetCard
                key={FormTargetType.ABSOLUTE}
                formKey={FormTargetType.ABSOLUTE}
                onFormOpen={handleOpenAbsoluteForm}
              />
            )}

            {formValues.intensity.length ? (
              formValues.intensity.map((field, index) => {
                const calculatedEmission =
                  baseline && field.intensityMetric
                    ? getIntensityEmission({
                        emission: baseline,
                        intensity: {
                          intensityMetric: field.intensityMetric.value,
                          intensityValue: field.intensityMetric.intensityValue,
                        },
                      })
                    : null;
                return (
                  <TargetCard
                    key={FormTargetType.INTENSITY}
                    formKey={FormTargetType.INTENSITY}
                    displayForm={Boolean(baseline?.carbonIntensities.length)}
                    intensityMetric={field.intensityMetric?.value}
                    form={
                      <Form
                        formKey={FormTargetType.INTENSITY}
                        form={form}
                        field={field}
                        fieldIndex={index}
                        baseline={baseline}
                      />
                    }
                    chart={
                      <TargetChart
                        baseline={calculatedEmission}
                        scope1And2Year={field.scope1And2Year?.value}
                        scope1And2Reduction={field.scope1And2Reduction}
                        scope3Year={field.scope3Year?.value}
                        scope3Reduction={field.scope3Reduction}
                        includeCarbonOffset={getIncludesCarbonOffset(
                          field.includeCarbonOffset
                        )}
                        strategy={field.strategy}
                      />
                    }
                  />
                );
              })
            ) : (
              <TargetCard
                key={FormTargetType.INTENSITY}
                formKey={FormTargetType.INTENSITY}
                displayForm={Boolean(baseline?.carbonIntensities.length)}
                onFormOpen={handleOpenIntensityForm}
              />
            )}

            <StyledComponents.CtaContainer>
              <StyledComponents.CloseCta
                data-testid={selectors.closeBtn}
                onClick={() => {
                  closeModal();
                  trackEvent(TARGET_FORM_DISMISSED, {
                    companyId: company?.id,
                    companyName: company?.name,
                  });
                }}
                disabled={form.formState.isSubmitting}
              >
                {t('common:cancel')}
              </StyledComponents.CloseCta>
              <StyledComponents.SubmitCta
                type="submit"
                data-testid={selectors.submitBtn}
                disabled={isDisabled}
              >
                {t('targetForm:save')}
              </StyledComponents.SubmitCta>
            </StyledComponents.CtaContainer>
          </form>
        )}
      </StyledComponents.Wrapper>
    </Modal>
  );
};
