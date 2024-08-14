import { CorporateEmissionType } from 'types/globalTypes';
import { OptionType } from 'components/SingleSelect';
import { SelectYearStepQuery_corporateEmissions as Emission } from 'types/SelectYearStepQuery';
import {
  EMISSION_YEAR_FIELD_KEYS as FIELD_KEYS,
  WizardState,
} from '../../types';

export type FormValues = {
  [FIELD_KEYS.EMISSION_YEAR]: OptionType;
};

export const YEAR_MENU_HEIGHT = 115;
export interface IProps {
  onNext: (update: Partial<WizardState>) => void;
  closeModal: () => void;
  wizardState: WizardState;
  emissionType: CorporateEmissionType | null;
  selectedEmissionYear?: number;
}

export const getTitle = (t: any, emissionType: CorporateEmissionType | null) =>
  emissionType === CorporateEmissionType.BASELINE
    ? t('inexperiencedFlow:baseline-select-title')
    : t('inexperiencedFlow:inexperienced-flow-add-actual-emission-title');

export const getSubTitle = (
  t: any,
  emissionType: CorporateEmissionType | null
) =>
  emissionType === CorporateEmissionType.BASELINE
    ? t('inexperiencedFlow:baseline-select-subtitle')
    : '';

export const getYearLabel = (
  t: any,
  emissionType: CorporateEmissionType | null
) =>
  emissionType === CorporateEmissionType.BASELINE
    ? t('inexperiencedFlow:baseline-select-label')
    : t('inexperiencedFlow:inexperienced-flow-add-actual-emission-select-year');

const defaultNumberOfOptions = 16;

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

export const getYearSelectOptions = (
  emissionType: CorporateEmissionType | null,
  emissions: Emission[]
) => {
  const years: OptionType[] = [];
  // When add new actual
  if (emissionType === CorporateEmissionType.ACTUAL) {
    const yearsWithEmissionRecords = emissions.map((emission) => emission.year);
    years.push(
      ...getEmissionYears(defaultNumberOfOptions, yearsWithEmissionRecords)
    );
  } else {
    // When adding new baseline
    years.push(...getEmissionYears());
  }

  return years;
};
