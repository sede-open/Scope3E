import { GraphQLError } from 'graphql';

import { ENQUIRY_EMAIL_MUTATION } from 'components/ContactUs/mutations';

export const testUser = {
  name: 'Test',
  email: 'test.user@company.com',
  company: 'test company',
  enquiry: '',
  message: 'testy mctest test',
};

export const enquiryEmailMock = {
  request: {
    query: ENQUIRY_EMAIL_MUTATION,
    variables: {
      input: {
        name: testUser.name,
        email: testUser.email,
        enquiries: testUser.enquiry,
        message: testUser.message,
        company: testUser.company,
      },
    },
  },
  result: {
    data: { enquiryEmail: 'Email successfully sent to recipient.' },
  },
};

export const enquiryEmailErrorMock = {
  request: {
    query: ENQUIRY_EMAIL_MUTATION,
    variables: {
      input: {
        name: testUser.name,
        email: testUser.email,
        enquiries: testUser.enquiry,
        message: testUser.message,
        company: testUser.company,
      },
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('error')],
  },
};
