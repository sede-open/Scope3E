import { OptionType } from 'components/SingleSelect';
import { ModalContentType } from 'containers/types';
import { FieldError } from 'react-hook-form';
import {
  CorporateEmissionFormQuery_corporateEmissions,
  CorporateEmissionFormQuery_corporateEmissions_corporateEmissionAccess,
} from 'types/CorporateEmissionFormQuery';
import {
  DashboardDataQuery_corporateEmissions as Emission,
  DashboardDataQuery_corporateEmissions_carbonIntensities as CarbonIntensities,
} from 'types/DashboardDataQuery';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { CorporateEmissionType, Scope2Type } from 'types/globalTypes';
import { Validation } from 'utils/form';
import { EmissionPrivacyType } from './DataPubliclyAvailable';
import {
  CarbonIntensityValues,
  CARBON_INTENSITY_FIELD_KEYS,
  FIELD_KEYS,
} from './types';

export const defaultYearValue = { value: '', label: '' };
export const API_NO_FILE_ERROR = 'File does not exist';
export const API_FILE_NOT_DELETED = 'File could be deleted';
export const MAX_INPUT_CHARACTER_LENGTH = 26;
export const VALUE_CHAIN_SUPPLIERS_TAB_ROUTE = '/value-chain/suppliers';

const defaultNumberOfOptions = 16;

export const INITIAL_CARBON_INTENSITY_FIELD = {
  type: null,
  value: '',
};

export const getEmissionYears = (
  period: number = defaultNumberOfOptions,
  disabledYears: number[] = []
) => {
  const years: OptionType[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < period; i += 1) {
    const year = currentYear - i;
    const isDisabled = disabledYears.indexOf(year) !== -1;
    years.push({
      value: currentYear - i,
      label: String(currentYear - i),
      isDisabled,
    });
  }
  return years;
};

export const getYearOptions = (
  formType: ModalContentType | null,
  emissions: Emission[]
) => {
  const years: OptionType[] = [];

  // When editing actual emissions
  if (formType === ModalContentType.EDIT_ACTUAL) {
    emissions.forEach(({ year, type }) => {
      if (type === CorporateEmissionType.ACTUAL)
        years.push({ value: year, label: String(year), isDisabled: false });
    });
  } else if (
    // When adding a new actual emission
    formType === ModalContentType.NEW_ACTUAL
  ) {
    const yearsWithEmissionRecords = emissions.map((emission) => emission.year);
    years.push(
      ...getEmissionYears(defaultNumberOfOptions, yearsWithEmissionRecords)
    );
  } else if (
    // When editing baseline
    formType === ModalContentType.EDIT_BASELINE
  ) {
    years.push(...getEmissionYears());
    years.forEach((year, index) => {
      const emission = emissions.find((emision) => emision.year === year.value);
      if (!emission) {
        years[index].isDisabled = true;
      }
      return year;
    });
  } else {
    years.push(...getEmissionYears());
  }

  return years;
};

export const getErrorMessage = (
  t: any,
  fieldError?: FieldError,
  fieldKey?: string,
  translationInputs: { [key: string]: string } = {}
) => {
  switch (fieldError?.type) {
    case Validation.REQUIRED:
      return t(`form:${fieldKey}-required`);
    case Validation.LESS_THAN_OR_EQUAL_TO_BILLION:
      return t('form:error-less-than-billion');
    case Validation.LESS_THAN_OR_EQUAL_TO_TRILLION:
      return t('form:error-less-than-trillion');
    case Validation.MAX_PERCENTAGE:
      return t('form:error-max-percentage');
    case Validation.MAX_PDF_SIZE:
      return t('form:error-large-file');
    case Validation.NOT_PDF_MIMETYPE:
      return t('form:error-wrong-media-type');
    case Validation.MINIMUM_VALUE_ERROR_NAME:
      return t('form:minimum-value-error', translationInputs);
    default:
      return '';
  }
};

export const getTitle = (t: any, formType: ModalContentType | null) => {
  switch (formType) {
    case ModalContentType.NEW_BASELINE:
      return t('corporateEmissionForm:baseline-new-title');
    case ModalContentType.EDIT_BASELINE:
      return t('corporateEmissionForm:baseline-edit-title');
    case ModalContentType.NEW_ACTUAL:
      return t('corporateEmissionForm:actual-new-title');
    case ModalContentType.EDIT_ACTUAL:
      return t('corporateEmissionForm:actual-edit-title');
    default:
      return '';
  }
};

export const getSaveButtonText = (
  t: any,
  formType: ModalContentType | null
) => {
  switch (formType) {
    case ModalContentType.NEW_BASELINE:
      return t('corporateEmissionForm:baseline-save');
    case ModalContentType.EDIT_BASELINE:
      return t('corporateEmissionForm:baseline-save');
    case ModalContentType.NEW_ACTUAL:
      return t('corporateEmissionForm:actual-save');
    case ModalContentType.EDIT_ACTUAL:
      return t('corporateEmissionForm:actual-save');
    default:
      return '';
  }
};

export const getSubtitle = (t: any, formType: ModalContentType | null) => {
  switch (formType) {
    case ModalContentType.NEW_BASELINE:
      return t('corporateEmissionForm:baseline-new-subtitle');
    case ModalContentType.EDIT_BASELINE:
      return t('corporateEmissionForm:baseline-edit-subtitle');
    case ModalContentType.NEW_ACTUAL:
      return t('corporateEmissionForm:actual-new-subtitle');
    case ModalContentType.EDIT_ACTUAL:
      return t('corporateEmissionForm:actual-edit-subtitle');
    default:
      return '';
  }
};

export const getYearLabel = (t: any, formType: ModalContentType | null) => {
  switch (formType) {
    case ModalContentType.NEW_BASELINE:
      return t('corporateEmissionForm:baseline-year');
    case ModalContentType.EDIT_BASELINE:
      return t('corporateEmissionForm:baseline-edit-year');
    case ModalContentType.NEW_ACTUAL:
      return t('corporateEmissionForm:actual-new-year');
    case ModalContentType.EDIT_ACTUAL:
      return t('corporateEmissionForm:actual-edit-year');
    default:
      return '';
  }
};

export const getEmissionType = (formType: ModalContentType | null) => {
  switch (formType) {
    case ModalContentType.NEW_BASELINE:
    case ModalContentType.EDIT_BASELINE:
      return CorporateEmissionType.BASELINE;
    case ModalContentType.NEW_ACTUAL:
    case ModalContentType.EDIT_ACTUAL:
      return CorporateEmissionType.ACTUAL;
    default:
      throw new Error('Invalid form type');
  }
};

export const getCarbonIntensitiesValues = (
  t: any,
  carbonIntensities: CarbonIntensities[] = []
): CarbonIntensityValues[] =>
  carbonIntensities.length === 0
    ? [INITIAL_CARBON_INTENSITY_FIELD]
    : carbonIntensities.map((intensity) => ({
        [CARBON_INTENSITY_FIELD_KEYS.METRIC]: {
          label: t(`carbonIntensity:${intensity.intensityMetric}`),
          value: intensity.intensityMetric,
        },
        [CARBON_INTENSITY_FIELD_KEYS.VALUE]: intensity.intensityValue,
      }));

const getPrivacyType = (
  corporateEmissionAccess: CorporateEmissionFormQuery_corporateEmissions_corporateEmissionAccess
) => {
  return corporateEmissionAccess.scope1And2 ||
    corporateEmissionAccess.scope3 ||
    corporateEmissionAccess.carbonOffsets ||
    corporateEmissionAccess.carbonIntensity
    ? EmissionPrivacyType.Public
    : EmissionPrivacyType.Private;
};

export const getDefaultFormValues = (
  formType: ModalContentType | null,
  emissions: CorporateEmissionFormQuery_corporateEmissions[],
  t: any,
  selectedEmissionYear?: number
) => {
  let formData: undefined | CorporateEmissionFormQuery_corporateEmissions;

  if (formType === ModalContentType.EDIT_BASELINE) {
    formData = emissions.find((e) => e.type === CorporateEmissionType.BASELINE);
  }

  if (selectedEmissionYear) {
    formData = emissions.find((e) => e.year === selectedEmissionYear);
  }

  if (formData) {
    const carbonIntensities = getCarbonIntensitiesValues(
      t,
      formData.carbonIntensities
    );
    return {
      year: { value: formData.year, label: String(formData.year) },
      scope1: formData.scope1,
      scope2: formData.scope2,
      scope3: formData.scope3,
      scope2Type: formData.scope2Type,
      offset: formData.offset,
      headCount: formData.headCount,
      verificationFile: null,
      carbonIntensities,
      [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_1_AND_2]:
        formData?.corporateEmissionAccess?.scope1And2 ?? false,
      [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_3]:
        formData?.corporateEmissionAccess?.scope3 ?? false,
      [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_OFFSET]:
        formData?.corporateEmissionAccess?.carbonOffsets ?? false,
      [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_INTENSITY]:
        formData?.corporateEmissionAccess?.carbonIntensity ?? false,
      [FIELD_KEYS.PUBLIC_LINK]:
        formData?.corporateEmissionAccess?.publicLink ?? '',
      [FIELD_KEYS.PRIVACY_TYPE]: formData?.corporateEmissionAccess
        ? getPrivacyType(formData.corporateEmissionAccess)
        : undefined,
    };
  }

  return {
    year: selectedEmissionYear
      ? { value: selectedEmissionYear, label: String(selectedEmissionYear) }
      : undefined,
    scope2Type: Scope2Type.MARKET,
    verificationFile: null,
    carbonIntensities: getCarbonIntensitiesValues(t),
    [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_1_AND_2]: false,
    [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_3]: false,
    [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_OFFSET]: false,
    [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_INTENSITY]: false,
    [FIELD_KEYS.PUBLIC_LINK]: '',
  };
};

export const getDefaultVerificationFile = (
  formType: ModalContentType | null,
  emissions: Emission[],
  selectedEmissionYear?: number
) => {
  if (formType === ModalContentType.EDIT_BASELINE) {
    const baseline = emissions.find(
      (e) => e.type === CorporateEmissionType.BASELINE
    );
    return baseline?.verificationFile;
  }

  if (selectedEmissionYear) {
    const selectedEmission = emissions.find(
      (e) => e.year === selectedEmissionYear
    );
    return selectedEmission?.verificationFile;
  }

  return null;
};

export const getEmissionAllocationsForYear = ({
  emissionAllocations,
  year,
}: {
  emissionAllocations: EmissionAllocationsQuery_emissionAllocations[];
  year: number | undefined;
}) =>
  emissionAllocations.reduce(
    (acc, { emissions, year: allocationYear }) =>
      Number(year) === Number(allocationYear) ? acc + Number(emissions) : acc,
    0
  );

const metricOrValueIsNull = (carbonIntensity: CarbonIntensityValues) =>
  (carbonIntensity[CARBON_INTENSITY_FIELD_KEYS.VALUE] &&
    !carbonIntensity[CARBON_INTENSITY_FIELD_KEYS.METRIC]?.value) ||
  (carbonIntensity[CARBON_INTENSITY_FIELD_KEYS.METRIC]?.value &&
    !carbonIntensity[CARBON_INTENSITY_FIELD_KEYS.VALUE]);

const metricOrValueHasRequiredErrors = (
  errors: {
    [FIELD_KEYS.CARBON_INTENSITIES]?: (FieldError | any)[];
  },
  errorIndex: number
) =>
  errors?.[FIELD_KEYS.CARBON_INTENSITIES]?.[errorIndex]?.[
    CARBON_INTENSITY_FIELD_KEYS.VALUE
  ]?.type === Validation.REQUIRED ||
  errors?.[FIELD_KEYS.CARBON_INTENSITIES]?.[errorIndex]?.[
    CARBON_INTENSITY_FIELD_KEYS.METRIC
  ]?.type === Validation.REQUIRED;

const valueHasInvalidError = (
  carbonIntensity: CarbonIntensityValues,
  errors: {
    [FIELD_KEYS.CARBON_INTENSITIES]?: (FieldError | any)[];
  },
  errorIndex: number
) =>
  !carbonIntensity[CARBON_INTENSITY_FIELD_KEYS.METRIC]?.value &&
  errors?.[FIELD_KEYS.CARBON_INTENSITIES]?.[errorIndex]?.[
    CARBON_INTENSITY_FIELD_KEYS.VALUE
  ];

export const getCarbonIntensityValidationUpdates = ({
  errors,
  carbonIntensities,
}: {
  carbonIntensities: CarbonIntensityValues[];
  errors: {
    [FIELD_KEYS.CARBON_INTENSITIES]?: (FieldError | any)[];
  };
}) => {
  let areCarbonIntensitiesInvalid = false;
  const carbonIntensityErrorsToClear: string[] = [];

  carbonIntensities.forEach((carbonIntensity, index) => {
    if (metricOrValueIsNull(carbonIntensity)) {
      areCarbonIntensitiesInvalid = true;
    } else if (metricOrValueHasRequiredErrors(errors, index)) {
      carbonIntensityErrorsToClear.push(
        `${FIELD_KEYS.CARBON_INTENSITIES}[${index}]`
      );
    }

    if (valueHasInvalidError(carbonIntensity, errors, index)) {
      carbonIntensityErrorsToClear.push(
        `${FIELD_KEYS.CARBON_INTENSITIES}[${index}]`
      );
    }
  });

  return { areCarbonIntensitiesInvalid, carbonIntensityErrorsToClear };
};
