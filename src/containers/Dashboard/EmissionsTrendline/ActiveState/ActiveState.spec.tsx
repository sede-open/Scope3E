import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { ActiveState } from '.';

const getEmission = (year: number) => ({
  id: 'emissionId',
  scope1: 1223,
  scope2: 1333,
  scope3: 1256,
  offset: 1000,
  examplePercentage: 5,
  headCount: 10,
  year,
});

const setup = (overrides: any = {}) => {
  const props = {
    emissions: [getEmission(2016), getEmission(2017), getEmission(2018)],
    loading: false,
    ...overrides,
  };

  return render(
    <MockedProvider mocks={[]}>
      <ActiveState {...props} />
    </MockedProvider>
  );
};

describe('ActiveState', () => {
  describe('when loading is true', () => {
    it('should not display the YearTrends component', () => {
      const { queryByTestId } = setup({ loading: true });

      expect(
        queryByTestId('emissions-trendline-year-trends')
      ).not.toBeInTheDocument();
    });

    it('should not display the Chart', () => {
      const { queryByTestId } = setup({ loading: true });

      expect(
        queryByTestId('emissions-trendline-chart')
      ).not.toBeInTheDocument();
    });
  });

  describe('when loading is false', () => {
    [3, 4, 5, 6, 7, 8, 9, 10].forEach((length) => {
      const emissions = new Array(length)
        .fill('')
        .map((_, index) => getEmission(2019 - index))
        .reverse();

      describe(`For data of length ${length}`, () => {
        it('should display the Chart', () => {
          const { queryByTestId } = setup({ loading: false, emissions });

          expect(
            queryByTestId('emissions-trendline-chart')
          ).toBeInTheDocument();
        });
      });
    });
  });
});
