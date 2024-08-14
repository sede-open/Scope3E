import {
  COMPANY_BY_DUNS_QUERY,
  DNB_TYPEAHEAD_QUERY,
} from 'containers/AccountSettings/CompanyRelationships/InviteCompanyForm/queries';
import {
  CompanyByDunsQueryVariables,
  CompanyByDunsQuery_companyByDuns,
} from 'types/CompanyByDunsQuery';
import {
  DnBTypeaheadQueryVariables,
  DnBTypeaheadQuery_dnbTypeaheadSearch,
} from 'types/DnBTypeaheadQuery';
import { CompanyStatus } from 'types/globalTypes';

export const dnbTypeaheadSearchResult = {
  duns: '12312121',
  primaryName: 'example Enterprises',
  isGlobalUltimate: true,
  globalUltimateDuns: '12312121',
  globalUltimatePrimaryName: 'example Enterprises',
  addressLine1: 'Park Lodge',
  addressCountryIsoAlpha2Code: 'UK',
  addressRegionName: 'Greater London',
};

export const dnbTypeaheadSearchResult2 = {
  duns: '99999999',
  primaryName: 'Hello Enterprises',
  isGlobalUltimate: true,
  globalUltimateDuns: '99999999',
  globalUltimatePrimaryName: 'Hello Enterprises',
  addressLine1: 'Park Street',
  addressCountryIsoAlpha2Code: 'UK',
  addressRegionName: 'Greater London',
};

export const companyByDuns = {
  id: '2FA2BE18-0E99-4F4D-815D-C66F143CFG5',
  name: 'example Enterprises',
  status: CompanyStatus.ACTIVE,
};

export const dnbTypeaheadQueryMock = (
  queryVariableOverrides: DnBTypeaheadQueryVariables,
  resultOverride?: DnBTypeaheadQuery_dnbTypeaheadSearch[]
) => ({
  request: {
    query: DNB_TYPEAHEAD_QUERY,
    variables: {
      ...queryVariableOverrides,
    },
  },
  result: {
    data: {
      dnbTypeaheadSearch:
        resultOverride ??
        (([
          dnbTypeaheadSearchResult,
        ] as unknown) as DnBTypeaheadQuery_dnbTypeaheadSearch[]),
    },
  },
});

export const companyByDunsQueryMockSuccess = (
  queryVariableOverrides: CompanyByDunsQueryVariables,
  resultOverride?: Partial<CompanyByDunsQuery_companyByDuns>
) => ({
  request: {
    query: COMPANY_BY_DUNS_QUERY,
    variables: {
      ...queryVariableOverrides,
    },
  },
  result: {
    data: {
      companyByDuns: {
        ...companyByDuns,
        ...resultOverride,
      },
    },
  },
});

export const companyByDunsQueryMockFail = (
  queryVariableOverrides: CompanyByDunsQueryVariables
) => ({
  request: {
    query: COMPANY_BY_DUNS_QUERY,
    variables: {
      ...queryVariableOverrides,
    },
  },
  result: {
    data: {
      companyByDuns: null,
    },
  },
});
