import { GraphQLError } from 'graphql';
import {
  ACCEPT_COMPANY_INVITE_MUTATION,
  DECLINE_COMPANY_INVITE_MUTATION,
} from 'containers/HandleInvitation/mutations';
import { USER_COMPANY_ID } from './constants';

export const ACCEPT_PAGE_TITLE = 'Details submitted';
export const DECLINE_PAGE_TITLE = 'Thank you';
export const FORM_PAGE_TITLE = 'Set up your account';
export const DECLINE_REASON_SELECT_LABEL = 'Why can’t you confirm the details?';
export const DECLINE_REASON =
  "I'm not authorised to represent my company to participate in the Hub";
export const ERROR_MESSAGE = 'Panic';

export const acceptCompanyInvitationMock = {
  request: {
    query: ACCEPT_COMPANY_INVITE_MUTATION,
    variables: {
      input: {
        companyId: USER_COMPANY_ID,
      },
    },
  },
  result: {
    data: {
      companyId: USER_COMPANY_ID,
    },
  },
};

export const declineCompanyInvitationMock = {
  request: {
    query: DECLINE_COMPANY_INVITE_MUTATION,
    variables: {
      input: {
        companyId: USER_COMPANY_ID,
        reason: DECLINE_REASON,
      },
    },
  },
  result: {
    data: {
      companyId: USER_COMPANY_ID,
      reason: DECLINE_REASON,
    },
  },
};

export const acceptCompanyInvitationErrorMock = {
  request: {
    query: ACCEPT_COMPANY_INVITE_MUTATION,
    variables: {
      input: {
        companyId: USER_COMPANY_ID,
      },
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError(ERROR_MESSAGE)],
  },
};

export const declineCompanyInvitationErrorMock = {
  request: {
    query: DECLINE_COMPANY_INVITE_MUTATION,
    variables: {
      input: {
        companyId: USER_COMPANY_ID,
      },
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError(ERROR_MESSAGE)],
  },
};
