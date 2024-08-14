import { OptionType } from 'components/SingleSelect';
import { Solutions } from 'containers/PrivateSolutions/types';
import { FieldError } from 'react-hook-form';
import { ValueType } from 'react-select';
import { EmailEnquiry } from 'types/globalTypes';
import { regionOptions } from './data';

export const getErrorMessage = (t: any, fieldError?: FieldError) => {
  switch (fieldError?.type) {
    case 'required':
      return t('form:error-required');
    case 'pattern':
      return t('form:error-pattern');
    default:
      return '';
  }
};

export const getRegionOptions = (t: any) =>
  regionOptions.map(({ label, value }) => ({
    label: t(`contactUs:region-${label}`),
    value,
  }));

export const SOLUTION_EMAIL_ENQUIRY: { [key in Solutions]: EmailEnquiry } = {
  [Solutions.CO2_FLEET_EMISSION_COMPENSATION]:
    EmailEnquiry.CO2_FLEET_EMISSION_COMPENSATION,
  [Solutions.EMOBILITY]: EmailEnquiry.EMOBILITY,
  [Solutions.HYDROGEN]: EmailEnquiry.HYDROGEN,
  [Solutions.IMMERSION_COOLING]: EmailEnquiry.IMMERSION_COOLING,
  [Solutions.INSTA_FREIGHT]: EmailEnquiry.INSTA_FREIGHT,
  [Solutions.LNG]: EmailEnquiry.LNG,
  [Solutions.LUBRICANT_SOLUTIONS]: EmailEnquiry.LUBRICANT_SOLUTIONS,
  [Solutions.MACHINE_MAX]: EmailEnquiry.MACHINE_MAX,
  [Solutions.NATURE_BASED]: EmailEnquiry.NATURE_BASED,
  [Solutions.REDUCING_CO2_INTENSITY_WITH_example_CHEMICALS]:
    EmailEnquiry.REDUCING_CO2_INTENSITY_WITH_example_CHEMICALS,
  [Solutions.SUSTAINABLE_AVIATION]: EmailEnquiry.SUSTAINABLE_AVIATION,
  [Solutions.SUSTAINABLE_BITUMEN]: EmailEnquiry.SUSTAINABLE_BITUMEN,
  [Solutions.TELEMATICS]: EmailEnquiry.TELEMATICS,
  [Solutions.VESSELS_SOFTWARE]: EmailEnquiry.VESSELS_SOFTWARE,
  [Solutions.CORROSION_FREE_PIPELINES]: EmailEnquiry.CORROSION_FREE_PIPELINES,
  [Solutions.ADIP_ULTRA]: EmailEnquiry.ADIP_ULTRA,
  [Solutions.BLUE_HYDROGEN]: EmailEnquiry.BLUE_HYDROGEN,
  [Solutions.DECARBONISE_YOUR_FLEET]: EmailEnquiry.DECARBONISE_YOUR_FLEET,
  [Solutions.ONSITE_SOLAR]: EmailEnquiry.ONSITE_SOLAR,
  [Solutions.BATTERY_STORAGE]: EmailEnquiry.BATTERY_STORAGE,
  [Solutions.ENERGY_MANAGEMENT]: EmailEnquiry.ENERGY_MANAGEMENT,
  [Solutions.CORPORATE_POWER_PURCHASE_AGREEMENTS]:
    EmailEnquiry.CORPORATE_POWER_PURCHASE_AGREEMENTS,
  [Solutions.CANSOLV]: EmailEnquiry.CANSOLV,
  [Solutions.LEVERAGING_DISTRIBUTED_ENERGY]:
    EmailEnquiry.LEVERAGING_DISTRIBUTED_ENERGY,
  [Solutions.LO3_ENERGY_CONSUMPTION_TRACKING]:
    EmailEnquiry.LO3_ENERGY_CONSUMPTION_TRACKING,
  [Solutions.INNOWATTS_CARBON_ENERGY_ANALYTICS]:
    EmailEnquiry.INNOWATTS_CARBON_ENERGY_ANALYTICS,
  [Solutions.RENEWABLE_ENERGY_CERTIFICATES]:
    EmailEnquiry.RENEWABLE_ENERGY_CERTIFICATES,
  [Solutions.RENEWABLE_POWER]: EmailEnquiry.RENEWABLE_POWER,
  [Solutions.SUSTAINABLE_LAND_ASSET_ENHANCEMENT]:
    EmailEnquiry.SUSTAINABLE_LAND_ASSET_ENHANCEMENT,
  [Solutions.I6_FUEL_MANAGEMENT]: EmailEnquiry.I6_FUEL_MANAGEMENT,
  [Solutions.RENEWABLE_NATURAL_GAS]: EmailEnquiry.RENEWABLE_NATURAL_GAS,
  [Solutions.ONSITE_RENEWABLE_POWER_GENERATION]:
    EmailEnquiry.ONSITE_RENEWABLE_POWER_GENERATION,
  [Solutions.DETECT_TECHNOLOGY_INDUSTRIAL_EFFICIENCY]:
    EmailEnquiry.DETECT_TECHNOLOGY_INDUSTRIAL_EFFICIENCY,
  [Solutions.LONG_HAUL_BIO_LNG]: EmailEnquiry.LONG_HAUL_BIO_LNG,
  [Solutions.SOLAR_SOLUTIONS]: EmailEnquiry.SOLAR_SOLUTION,
  [Solutions.SIMULATION_TECHNOLOGY]: EmailEnquiry.SIMULATION_TECHNOLOGY,
};

export const getSolutionOption = (t: any) => (solution: Solutions) => ({
  label: t(`privateSolutions:${solution}-card-title`),
  value: SOLUTION_EMAIL_ENQUIRY[solution],
});

export const getEnquiryOptions = (t: any) => [
  {
    label: t('contactUs:enquiry-general-label'),
    value: EmailEnquiry.GENERAL_ENQUIRY,
  },
  ...Object.values(Solutions).map(getSolutionOption(t)),
];

export const onEnquiryChange = (
  value: ValueType<OptionType>,
  onChange: any
) => {
  let enquiries: ValueType<OptionType> = value;
  if (value && Array.isArray(value) && value.length > 1) {
    if (value[value.length - 1].value === 'General enquiry') {
      enquiries = value.filter((e) => e.value === 'General enquiry');
    } else {
      enquiries = value.filter((e) => e.value !== 'General enquiry');
    }
  }
  onChange(enquiries);
};
