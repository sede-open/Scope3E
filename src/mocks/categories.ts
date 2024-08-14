import { CATEGORIES_QUERY } from 'containers/ValueChain/AcceptAllocationForm/queries';

export const categoriesMock = {
  request: {
    query: CATEGORIES_QUERY,
  },
  result: {
    data: {
      categories: [
        {
          id: 'some-id-01',
          name: 'Cat. 1 - Some upstream category',
          order: 1,
        },
        {
          id: 'some-id-02',
          name: 'Cat. 2 - Some upstream category',
          order: 2,
        },
        {
          id: 'some-id-03',
          name: 'Cat. 3 - Some upstream category',
          order: 3,
        },
        {
          id: 'some-id-04',
          name: 'Cat. 4 - Some upstream category',
          order: 4,
        },
        {
          id: 'some-id-05',
          name: 'Cat. 5 - Some upstream category',
          order: 5,
        },
        {
          id: 'some-id-09',
          name: 'Cat. 9 - Some downstream category',
          order: 9,
        },
        {
          id: 'some-id-10',
          name: 'Cat. 10 - Some downstream category',
          order: 10,
        },
        {
          id: 'some-id-11',
          name: 'Cat. 11 - Some downstream category',
          order: 11,
        },
      ],
    },
  },
};
