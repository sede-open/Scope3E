import { PATTERNS } from 'components/Form/utils';
import { FieldError } from 'react-hook-form';

export const getErrorMessage = (t: any, fieldError?: FieldError) => {
  switch (fieldError?.type) {
    case 'required':
      return t('form:error-required');
    case 'pattern':
      return t('form:error-pattern');
    case 'validate':
      return t('form:error-validate-external-email');
    case 'maxLength':
      return t('form:error-max-length');
    case 'minLength':
      return t('form:minimum-length', { length: 2 });
    default:
      return '';
  }
};

export const validateInternalEmail = (email: string) =>
  PATTERNS.exampleEmail.test(email);
