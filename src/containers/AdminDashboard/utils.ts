import { PATTERNS } from 'components/Form/utils';
import { FieldError } from 'react-hook-form';
import { Validation } from 'utils/form';

export const getErrorMessage = (t: any, fieldError?: FieldError) => {
  switch (fieldError?.type) {
    case Validation.REQUIRED:
      return t('form:error-required');
    case Validation.PATTERN:
      return t('form:error-pattern');
    case 'validate':
      return t('form:error-validate-external-email');
    case 'validateInternalEmail':
      return t('form:error-validate-internal-email');
    case Validation.MIN_LENGTH:
      return t('form:min-2-characters');
    case Validation.MAX_LENGTH:
      return t('form:error-max-length');
    default:
      return '';
  }
};

export const validateInternalEmail = (email: string) =>
  PATTERNS.exampleEmail.test(email);
