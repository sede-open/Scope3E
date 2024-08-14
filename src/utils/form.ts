import { FieldError } from 'react-hook-form';
import { ONE_BILLION } from '../constants';

export const moreThanOrEqualTo1 = (value: number) => value >= 1;
export const lessThanOrEqualToOneBillion = (value: number) =>
  value <= ONE_BILLION;
export const lessThanOrEqualToHundred = (value: number) => value <= 100;

export enum Validation {
  REQUIRED = 'required',
  PATTERN = 'pattern',
  MIN_LENGTH = 'minLength',
  MAX_LENGTH = 'maxLength',
  MORE_THAN_OR_EQUAL_TO_ONE = 'moreThanOrEqualTo1',
  LESS_THAN_OR_EQUAL_TO_HUNDRED_MILLION = 'lessThanOrEqualToHundredMillion',
  LESS_THAN_OR_EQUAL_TO_HUNDRED = 'lessThanOrEqualToHundred',
  LESS_THAN_OR_EQUAL_TO_BILLION = 'lessThanOrEqualToBillion',
  LESS_THAN_OR_EQUAL_TO_TRILLION = 'lessThanOrEqualToTrillion',
  MAX_PERCENTAGE = 'maxPercentage',
  USER_EXISTS_ERROR_NAME = 'errorUserExists',
  ALREADY_CONNECTED_ERROR_NAME = 'errorAlreadyConnected',
  CONNECTION_PENDING_ERROR_NAME = 'errorConnectionPending',
  CONNECTION_DECLINED_ERROR_NAME = 'errorConnectionDeclined',
  CONNECTION_VETOED_ERROR_NAME = 'errorVetoedCompany',
  MINIMUM_VALUE_ERROR_NAME = 'errorVetoedCompany',
  MAX_PDF_SIZE = 'maxPDFSize',
  NOT_PDF_MIMETYPE = 'notPDFMimetype',
}

export const getFormErrorMessage = (t: any, fieldError?: FieldError) => {
  switch (fieldError?.type) {
    case Validation.MORE_THAN_OR_EQUAL_TO_ONE:
      return t('form:more-than-1');
    case Validation.LESS_THAN_OR_EQUAL_TO_HUNDRED_MILLION:
      return t('form:less-than-hundred-million');
    case Validation.LESS_THAN_OR_EQUAL_TO_HUNDRED:
      return t('form:less-than-hundred');
    case Validation.LESS_THAN_OR_EQUAL_TO_BILLION:
      return t('form:less-than-billion');
    case Validation.REQUIRED:
      return t('form:error-required');
    default:
      return '';
  }
};
