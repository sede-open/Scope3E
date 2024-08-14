import { FieldError } from 'react-hook-form';
import { DECLINE_REASON_OPTIONS } from '../types';
import * as StyledComponents from './styledComponents';

export const getErrorMessage = (t: any, fieldError?: FieldError) => {
  switch (fieldError?.type) {
    case 'required':
      return t('form:error-required');
    default:
      return '';
  }
};

export const getDeclineReasonOptions = (t: any) =>
  Object.values(DECLINE_REASON_OPTIONS).map((value: any) => ({
    label: t(`handleInvitation:decline-detail-${value}`),
    value,
  }));

export const getLabelText = (t: any, type: string) => (
  <StyledComponents.RadioBtnLabelText>
    {t(`handleInvitation:form-radio-${type}`)}
  </StyledComponents.RadioBtnLabelText>
);
