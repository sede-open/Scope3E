import { EmailEnquiry } from 'types/globalTypes';

export enum FIELD_KEYS {
  NAME = 'name',
  COMPANY = 'company',
  EMAIL = 'email',
  MESSAGE = 'message',
  ENQUIRY = 'enquiry',
  SOURCE = 'source',
  COMMS_CONSENT = 'commsConsent',
  TERMS_CONSENT = 'termsConsent',
}

export enum ENQUIRY_OPTIONS {
  GENERAL_ENQUIRY = 'general-enquiry',
  LOW_CARBON_SOLUTIONS = 'low-carbon-solution',
  JOIN = 'join',
}

export enum EmailSource {
  Events = 'EVENTS',
  Email = 'EMAIL',
  SocialMedia = 'SOCIAL_MEDIA',
  SearchEngine = 'SEARCH_ENGINE',
  Recommended = 'RECOMMENDED',
  WordOfMouth = 'WORD_OF_MOUTH',
  Other = 'OTHER',
}
export type EnquiryOptionType = {
  label: string;
  value: EmailEnquiry;
};

export type SourceOptionType = {
  label: string;
  value: EmailSource;
};

export interface IGetInTouchFormValues {
  [FIELD_KEYS.NAME]: string;
  [FIELD_KEYS.COMPANY]: string;
  [FIELD_KEYS.EMAIL]: string;
  [FIELD_KEYS.ENQUIRY]: EnquiryOptionType | null;
  [FIELD_KEYS.MESSAGE]: string;
  [FIELD_KEYS.COMMS_CONSENT]: boolean;
  [FIELD_KEYS.TERMS_CONSENT]: boolean;
  [FIELD_KEYS.SOURCE]: SourceOptionType | null;
}
