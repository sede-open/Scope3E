import { FieldError } from 'react-hook-form';
import { EmailEnquiry } from 'types/globalTypes';
import {
  EmailSource,
  EnquiryOptionType,
  ENQUIRY_OPTIONS,
  SourceOptionType,
} from './types';

export const getErrorMessage = (t: any, fieldError?: FieldError) => {
  switch (fieldError?.type) {
    case 'required':
      return t('form:error-required');
    case 'pattern':
      return t('form:error-pattern');
    case 'maxLength':
      return t('form:error-max-length');
    case 'minLength':
      return t('form:minimum-length', { length: 2 });
    default:
      return '';
  }
};

export const SOLUTION_EMAIL_ENQUIRY: {
  [key in ENQUIRY_OPTIONS]: EmailEnquiry;
} = {
  [ENQUIRY_OPTIONS.GENERAL_ENQUIRY]: EmailEnquiry.GENERAL_ENQUIRY,
  [ENQUIRY_OPTIONS.JOIN]: EmailEnquiry.JOIN,
  [ENQUIRY_OPTIONS.LOW_CARBON_SOLUTIONS]: EmailEnquiry.LOW_CARBON_SOLUTION,
};

export const getEnquiryOptions = (t: any) =>
  Object.values(ENQUIRY_OPTIONS).map((value: ENQUIRY_OPTIONS) => ({
    label: t(`publicGetInTouch:enquiry-${value}`),
    value: SOLUTION_EMAIL_ENQUIRY[value],
  }));

const convertToJsonKeyFormat = (value: string) => {
  return value.toLowerCase().replace(/_/g, '-');
};

export const getSourceOptions = (t: any): SourceOptionType[] =>
  Object.values(EmailSource).map((value: EmailSource) => ({
    label: t(`publicGetInTouch:source-${convertToJsonKeyFormat(value)}`),
    value,
  }));

export const getDefaultEnquiryOption = (
  t: unknown,
  enquiryOptionQuery?: ENQUIRY_OPTIONS
): EnquiryOptionType | null => {
  let defaultOption = null;

  if (enquiryOptionQuery) {
    defaultOption =
      getEnquiryOptions(t).find(
        (e) => e.value === SOLUTION_EMAIL_ENQUIRY[enquiryOptionQuery]
      ) ?? null;
  }
  return defaultOption;
};
