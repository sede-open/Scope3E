import { COMPANIES_QUERY } from 'containers/AccountSettings/CompanyRelationships/queries';

export const companiesMock = {
  request: {
    query: COMPANIES_QUERY,
  },
  result: {
    data: {
      companies: [
        {
          id: 'some-id-01',
          name: 'Company name 1',
        },
        {
          id: 'some-id-02',
          name: 'Company name 2',
        },
        {
          id: 'some-id-03',
          name: 'Company name 3',
        },
        {
          id: 'some-id-04',
          name: 'Company name 4',
        },
        {
          id: 'some-id-05',
          name: 'Company name 5',
        },
        {
          id: 'some-id-06',
          name: 'Corporation name 6',
        },
        {
          id: 'some-id-07',
          name: 'Corporation name 6',
        },
        {
          id: 'some-id-08',
          name: 'Corporation name 6',
        },
        {
          id: 'some-id-09',
          name: 'Corporation name 6',
        },
        {
          id: 'some-id-10',
          name: 'Corporation name 6',
        },
      ],
    },
  },
};
