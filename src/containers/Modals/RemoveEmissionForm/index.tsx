import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useForm, Controller } from 'react-hook-form';
import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import Button from 'components/Button';
import { SingleSelect } from 'components/SingleSelect';
import { NumberInput } from 'components/NumberInput';
import { InputLabel } from 'components/InputLabel';
import { InputError } from 'components/InputError';
import Modal from 'components/Modal';
import CogSpinner from 'components/CogSpinner';
import { CTAContainer } from 'components/CTAContainer';
import { FIELD_KEYS, defaultYearValue, getEmissionYears } from './utils';
import { useDeleteCorporateEmission } from '../../Dashboard/mutations';
import { useRemoveEmissionFormQuery } from './queries';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  closeModal: () => void;
}

export const RemoveEmissionForm = ({ closeModal }: IProps) => {
  const { t } = useTranslation();

  const { company } = useAuthenticatedUser();

  const {
    data: removeEmissionFormData,
    loading: isRemoveEmissionFormDataLoading,
  } = useRemoveEmissionFormQuery({
    companyId: company?.id || '',
  });

  const emissions = removeEmissionFormData?.corporateEmissions ?? [];
  const MAX_MENU_HEIGHT = 95;
  const {
    handleSubmit,
    errors,
    formState: { isSubmitting },
    control,
    watch,
    setValue,
  } = useForm();

  const [apiError, setApiError] = useState('');
  const [emissionToDelete, setEmission] = useState<Emission | undefined>();

  const yearValue = watch(FIELD_KEYS.YEAR);

  useEffect(() => {
    const emission = emissions.find((e) => e.year === Number(yearValue?.value));

    if (emission) {
      const totalEmissions =
        emission.scope1 + emission.scope2 + (emission.scope3 ?? 0);
      setValue(FIELD_KEYS.EMISSIONS, totalEmissions);
      setEmission(emission);
    }
  }, [yearValue]);

  const yearOptions = getEmissionYears(emissions);

  const [deleteEmission] = useDeleteCorporateEmission({
    onError: (err) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('common:delete-toast-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:delete-toast-success'),
      });
      closeModal();
    },
  });

  const onSubmit = async () => {
    if (emissionToDelete) {
      await deleteEmission({
        variables: {
          input: {
            id: emissionToDelete.id,
          },
        },
      });
    }
  };

  return (
    <Modal isOpen onClose={closeModal}>
      <StyledComponents.RemoveEmissionContainer>
        <StyledComponents.TextContainer>
          <StyledComponents.Title>
            {t('removeEmissionForm:remove-emission-form-title')}
          </StyledComponents.Title>
          <StyledComponents.Subtitle>
            {t('removeEmissionForm:remove-emission-form-subtitle')}
          </StyledComponents.Subtitle>
        </StyledComponents.TextContainer>

        {isRemoveEmissionFormDataLoading ? (
          <CogSpinner />
        ) : (
          <StyledComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <StyledComponents.FormColumns>
              <StyledComponents.FormColumn>
                <InputLabel
                  dataTestId={selectors.yearLabel}
                  htmlFor={FIELD_KEYS.YEAR}
                >
                  {t('removeEmissionForm:remove-emission-form-year-label')}
                </InputLabel>

                <Controller
                  control={control}
                  name={FIELD_KEYS.YEAR}
                  defaultValue={defaultYearValue}
                  rules={{
                    required: true,
                  }}
                  render={({ value, onChange }) => (
                    <>
                      <SingleSelect
                        dataTestId={selectors.yearSelect}
                        inputId={FIELD_KEYS.YEAR}
                        name={FIELD_KEYS.YEAR}
                        options={yearOptions}
                        hasError={Boolean(errors.year)}
                        onChange={onChange}
                        placeholder={t('common:form-placeholder')}
                        value={value}
                        removeValueContainerPadding
                        maxMenuHeight={MAX_MENU_HEIGHT}
                        styles={{
                          valueContainer: (provided) => ({
                            ...provided,
                            margin: '16px',
                          }),
                        }}
                      />
                    </>
                  )}
                />
              </StyledComponents.FormColumn>

              <StyledComponents.FormColumn>
                <Controller
                  control={control}
                  defaultValue=""
                  name={FIELD_KEYS.EMISSIONS}
                  render={({ onChange, value }) => (
                    <>
                      <NumberInput
                        dataTestId={selectors.totalEmissionInput}
                        id={FIELD_KEYS.EMISSIONS}
                        name={FIELD_KEYS.EMISSIONS}
                        onChange={onChange}
                        decimals={0}
                        label={t(
                          'removeEmissionForm:remove-emission-form-total-label'
                        )}
                        units={t('common:unit-mt-co2')}
                        value={value}
                        disabled
                        isRequired
                      />
                    </>
                  )}
                />
              </StyledComponents.FormColumn>
            </StyledComponents.FormColumns>
            <StyledComponents.ApiErrorWrapper>
              {apiError && (
                <InputError data-testid={selectors.apiError}>
                  {apiError}
                </InputError>
              )}
            </StyledComponents.ApiErrorWrapper>
            <CTAContainer>
              <Button
                color="secondary"
                data-testid={selectors.cancelBtn}
                onClick={closeModal}
                disabled={isSubmitting}
              >
                {t('common:close')}
              </Button>
              <Button
                type="submit"
                data-testid={selectors.onSubmitBtn}
                disabled={!yearValue || isSubmitting}
              >
                {t('common:remove-data')}
              </Button>
            </CTAContainer>
          </StyledComponents.Form>
        )}
      </StyledComponents.RemoveEmissionContainer>
    </Modal>
  );
};
