import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { EmissionsTrendline } from '.';

const setEmissionModal = () => {};
const setup = (overrides: any = {}) => {
  const props = {
    emissions: [],
    loading: false,
    setEmissionModal,
    ...overrides,
  };

  return render(
    <MockedProvider mocks={[]}>
      <EmissionsTrendline {...props} />
    </MockedProvider>
  );
};

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

describe('EmissionsTrendline', () => {
  describe('when thre is less than 3 years of emissions data', () => {
    it('should display the Empty State', () => {
      const { queryByTestId } = setup({
        emissions: [getEmission(2016)],
      });

      expect(queryByTestId('emissions-trendline-empty')).toBeInTheDocument();
    });

    it('should not display the Active State', () => {
      const { queryByTestId } = setup({
        emissions: [getEmission(2016)],
      });

      expect(
        queryByTestId('emissions-trendline-active')
      ).not.toBeInTheDocument();
    });
  });
});
