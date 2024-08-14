import { render } from '@testing-library/react';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { formatInteger } from 'utils/number';
import * as cogSpinnerSelectors from 'components/CogSpinner/selectors';
import * as scope3DashboardAllocationMocks from 'mocks/scope3DashboardAllocations';
import { Scope3PieChart } from '.';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');

const { userCompany } = scope3DashboardAllocationMocks;

const setup = (overrides: any = {}) => {
  const props = {
    emissionsTotal: 0,
    allocatedEmissionsTotal: 0,
    unallocatedEmissionsTotal: 0,
    isLoading: false,
    ...overrides,
  };
  return render(<Scope3PieChart {...props} />);
};

describe('Scope3PieChart', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: userCompany.id },
    }));
  });

  describe('when loading === true', () => {
    it('should render Cog Spinner', async () => {
      const { queryByTestId, getByTestId } = setup({ isLoading: true });

      expect(getByTestId(selectors.pieChartWrapper)).toBeInTheDocument();
      expect(getByTestId(cogSpinnerSelectors.cogSpinner)).toBeInTheDocument();
      expect(queryByTestId(selectors.chartLableValue)).not.toBeInTheDocument();
    });
  });

  describe('(EmptyState) - when there are no emission allocations or emissions total', () => {
    it('should display a "-" as the Label value', async () => {
      const { findByTestId, getByText } = setup({});

      expect(await findByTestId(selectors.pieChartWrapper)).toBeInTheDocument();
      expect(await findByTestId(selectors.chartLableValue)).toBeInTheDocument();
      expect(getByText('-')).toBeVisible();
      expect((await findByTestId(selectors.chartLableValue)).textContent).toBe(
        '-'
      );
    });

    it('should NOT display label value unit', async () => {
      const { findByTestId, queryByTestId } = setup({});

      expect(await findByTestId(selectors.pieChartWrapper)).toBeInTheDocument();
      expect(queryByTestId(selectors.unitLabel)).not.toBeInTheDocument();
    });
  });

  describe('when scope 3 emissions data exists', () => {
    it('should render pie chart title and total scope 3 value', async () => {
      const scope3Total = 1000;
      const { getByTestId, getByText } = setup({ emissionsTotal: scope3Total });

      expect(getByTestId(selectors.pieChartWrapper)).toBeInTheDocument();
      expect(getByTestId(selectors.chartLableValue)).toBeInTheDocument();

      // assert total emissions value passed to pie chart
      expect(getByText(formatInteger(scope3Total))).toBeVisible();
      expect(getByTestId(selectors.unitLabel)).toBeInTheDocument();
    });
  });
});
