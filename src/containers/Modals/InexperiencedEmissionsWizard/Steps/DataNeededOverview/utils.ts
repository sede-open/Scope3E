import {
  EMISSION_YEAR_FIELD_KEYS,
  SCOPE_1_SOURCE_FIELD_KEYS,
  SCOPE_2_SOURCE_FIELD_KEYS,
  WizardState,
} from '../../types';

export const getDataNeededList = (state: WizardState, t: any) => {
  const dataNeeded = [];

  const selectedYear = state[EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR];

  if (state[SCOPE_1_SOURCE_FIELD_KEYS.STATIONARY_MOBILE_COMBUSTION] === true) {
    dataNeeded.push(
      t('inexperiencedFlow:data-needed-fuels', { year: selectedYear })
    );
  }

  if (
    state[SCOPE_1_SOURCE_FIELD_KEYS.INDUSTRIAL_PROCESS_AND_REFRIGIRANTS] ===
    true
  ) {
    dataNeeded.push(
      t('inexperiencedFlow:data-needed-refrigirants', { year: selectedYear })
    );
    dataNeeded.push(
      t('inexperiencedFlow:data-needed-process', { year: selectedYear })
    );
  }

  if (state[SCOPE_2_SOURCE_FIELD_KEYS.PURCHASED_ELECTRICITY] === true) {
    dataNeeded.push(
      t('inexperiencedFlow:data-needed-electricity', { year: selectedYear })
    );
  }

  if (state[SCOPE_2_SOURCE_FIELD_KEYS.PURCHASED_HEAT_COOLING] === true) {
    dataNeeded.push(
      t('inexperiencedFlow:data-needed-heat-cooling', { year: selectedYear })
    );
  }

  return dataNeeded;
};
