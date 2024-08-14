import { GraphQLError } from 'graphql';

import { ENQUIRY_EMAIL_MUTATION } from 'components/ContactUs/mutations';
import { EmailEnquiry, RegionName } from 'types/globalTypes';

export const companyId = 'companyId';
export const contactMock = {
  firstName: 'Mc',
  lastName: 'Test',
  company: 'Test Company',
  email: 'testing@test.com',
  enquiries: [EmailEnquiry.LUBRICANT_SOLUTIONS],
  regions: [RegionName.EUROPE],
  message: 'Hello world',
};

export const enquiryEmailMock = {
  request: {
    query: ENQUIRY_EMAIL_MUTATION,
    variables: {
      input: {
        name: `${contactMock.firstName} ${contactMock.lastName}`,
        company: contactMock.company,
        email: contactMock.email,
        enquiries: contactMock.enquiries,
        regions: contactMock.regions,
        message: contactMock.message,
        consent: true,
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
        name: `${contactMock.firstName} ${contactMock.lastName}`,
        company: contactMock.company,
        email: contactMock.email,
        enquiries: contactMock.enquiries,
        regions: contactMock.regions,
        message: contactMock.message,
        consent: true,
      },
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError('error')],
  },
};
