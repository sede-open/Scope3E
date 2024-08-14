import { SearchSelectOptionTagType } from 'components/SearchSelect/types';
import { Dispatch, SetStateAction } from 'react';
import { ErrorOption, FieldError } from 'react-hook-form/dist/types/form';
import Trans from 'next-translate/Trans';

import { DnBTypeaheadQuery_dnbTypeaheadSearch } from 'types/DnBTypeaheadQuery';
import { CompanyStatus } from 'types/globalTypes';
import { Validation } from 'utils/form';
import { InputErrorLink } from 'components/InputErrorLink';

import {
  COMPANY_RELATIONSHIP_CONNECTED_ERROR,
  COMPANY_RELATIONSHIP_PENDING_ERROR,
  COMPANY_RELATIONSHIP_REJECTED_ERROR,
  USER_EXISTS_ERROR,
  VETOED_COMPANY_ERROR,
} from './constants';
import { FIELD_KEYS } from './types';
import { mailTo } from '../../../../constants';

export const getCompanyOptions = (
  t: any,
  dnbTypeaheadSearch?: DnBTypeaheadQuery_dnbTypeaheadSearch[]
) => {
  if (dnbTypeaheadSearch) {
    return dnbTypeaheadSearch.map((company) => {
      const addressDetails = [];

      if (company.addressLine1) {
        addressDetails.push(company.addressLine1);
      }

      if (company.addressCountryIsoAlpha2Code) {
        if (company.addressRegionName) {
          addressDetails.push(
            `${company.addressRegionName} - ${company.addressCountryIsoAlpha2Code}`
          );
        } else {
          addressDetails.push(company.addressCountryIsoAlpha2Code);
        }
      }

      return {
        label: company.primaryName,
        metaLabels: addressDetails,
        tag: company.isGlobalUltimate
          ? {
              name: t('companyRelationships:parent-company'),
              type: SearchSelectOptionTagType.PRIMARY,
            }
          : {
              name: t('companyRelationships:subsidiary-company'),
              type: SearchSelectOptionTagType.SECONDARY,
            },
        value: company.duns,
      };
    });
  }

  return [];
};

export const handleAPIErrors = ({
  apiError,
  setFieldError,
  setApiError,
}: {
  apiError: Error;
  setFieldError: (name: string, error: ErrorOption) => void;
  setApiError: Dispatch<SetStateAction<string>>;
}) => {
  switch (apiError.message) {
    case COMPANY_RELATIONSHIP_CONNECTED_ERROR:
      setFieldError(FIELD_KEYS.COMPANY, {
        type: Validation.ALREADY_CONNECTED_ERROR_NAME,
      });
      break;
    case COMPANY_RELATIONSHIP_PENDING_ERROR:
      setFieldError(FIELD_KEYS.COMPANY, {
        type: Validation.CONNECTION_PENDING_ERROR_NAME,
      });
      break;
    case COMPANY_RELATIONSHIP_REJECTED_ERROR:
      setFieldError(FIELD_KEYS.COMPANY, {
        type: Validation.CONNECTION_DECLINED_ERROR_NAME,
      });
      break;
    case VETOED_COMPANY_ERROR:
      setFieldError(FIELD_KEYS.COMPANY, {
        type: Validation.CONNECTION_VETOED_ERROR_NAME,
      });
      break;
    case USER_EXISTS_ERROR:
      setFieldError(FIELD_KEYS.EMAIL, {
        type: Validation.USER_EXISTS_ERROR_NAME,
      });
      break;
    default:
      setApiError(apiError.message);
  }
};

export const getErrorMessage = (
  t: any,
  fieldError?: FieldError,
  selectedCompany?: string
) => {
  switch (fieldError?.type) {
    case Validation.REQUIRED:
      return t('form:error-required');
    case Validation.PATTERN:
      return t('form:error-pattern');
    case Validation.MIN_LENGTH:
      return t('form:min-2-characters');
    case Validation.MAX_LENGTH:
      return t('form:max-255-characters');
    case Validation.ALREADY_CONNECTED_ERROR_NAME:
      return t(`companyRelationships:error-already-connected`, {
        companyName: selectedCompany,
      });
    case Validation.CONNECTION_PENDING_ERROR_NAME:
      return t(`companyRelationships:error-connection-pending`);
    case Validation.CONNECTION_DECLINED_ERROR_NAME:
      return t(`companyRelationships:error-connection-declined`);
    case Validation.CONNECTION_VETOED_ERROR_NAME:
      return (
        <Trans
          i18nKey="companyRelationships:error-vetoed-company"
          components={{
            selectedCompany: <span>{selectedCompany}</span>,
            inputErrorLink: <InputErrorLink href={mailTo} />,
          }}
        />
      );
    case Validation.USER_EXISTS_ERROR_NAME:
      return t('companyRelationships:error-user-exists');
    default:
      return '';
  }
};

export const hasCompanyDeclinedInvite = (status?: CompanyStatus) =>
  status === CompanyStatus.INVITATION_DECLINED;

export const hasCompanyBeenVetoed = (status?: CompanyStatus) =>
  status === CompanyStatus.VETOED;

export const errorsContainVetoedError = (errorType?: string) =>
  errorType === Validation.CONNECTION_VETOED_ERROR_NAME;
