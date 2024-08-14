import { boolean } from '@storybook/addon-knobs';

import { DescriptionList } from '.';

const items = [
  {
    term: 'Supplier',
    description: 'Ink Corp',
  },
  {
    term: 'Year',
    description: '2021',
  },
  {
    term: 'Emissions',
    description: '200,000,000 tCO2e',
  },
  {
    term: 'Allocation method',
    description: 'Physical',
  },
  {
    term: 'Externally verified',
    description: 'Yes',
  },
];

export default {
  title: 'DescriptionList',
  component: DescriptionList,
};

export const withDummyData = () => (
  <DescriptionList items={items} isVertical={boolean('isVertical', false)} />
);
