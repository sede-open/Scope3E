import { render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as emptyStateSelectors from 'containers/Dashboard/Scope3Dashboard/EmptyState/selectors';
import * as scope3DashboardAllocationMocks from 'mocks/scope3DashboardAllocations';
import * as percentageSelectors from 'containers/Dashboard/Scope3Dashboard/PercentageBar/selectors';
import scope3DashboardNamespace from '../../../../../locales/en/scope3Dashboard.json';
import categoriesNamespace from '../../../../../locales/en/categories.json';
import { Categories } from '.';
import * as categoriesSelectors from './selectors';

jest.mock('effects/useAuthenticatedUser');

const { userCompany } = scope3DashboardAllocationMocks;

const setup = (overrides: any = {}) => {
  const props = {
    allocations: [],
    emissionsTotal: 100_000,
    selectedYear: 2020,
    ...overrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        scope3Dashboard: scope3DashboardNamespace,
        categories: categoriesNamespace,
      }}
    >
      <Categories {...props} />
    </I18nProvider>
  );
};

describe('Scope3 Dashboard - Categories', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: userCompany.id },
    }));
  });

  describe('when there are no emission allocations', () => {
    it('should display the empty state', async () => {
      const { findByTestId } = setup([]);
      expect(
        await findByTestId(categoriesSelectors.categoriesContainer)
      ).toBeInTheDocument();
      expect(
        await findByTestId(emptyStateSelectors.emptyStateWrapper)
      ).toBeInTheDocument();
    });

    it('should render Supply Chain nav button', async () => {
      const { findByTestId, getByTestId } = setup([]);

      expect(
        await findByTestId(categoriesSelectors.categoriesContainer)
      ).toBeInTheDocument();
      expect(
        await findByTestId(emptyStateSelectors.emptyStateWrapper)
      ).toBeInTheDocument();
      expect(
        await findByTestId(emptyStateSelectors.emptyStateCTA)
      ).toBeInTheDocument();

      expect(getByTestId(emptyStateSelectors.emptyStateCTA)).toHaveAttribute(
        'href',
        '/value-chain'
      );
    });

    it('should contain Categories empty state title and subtext', async () => {
      const { findByTestId, getByText } = setup([]);

      expect(
        await findByTestId(emptyStateSelectors.emptyStateWrapper)
      ).toBeInTheDocument();
      expect(
        getByText(scope3DashboardNamespace['categories-empty-state-title'])
      ).toBeVisible();
      expect(
        getByText(scope3DashboardNamespace['categories-empty-state-subtext'])
      ).toBeVisible();
    });
  });

  describe('when there are emission allocations', () => {
    it('should display the categories row', async () => {
      const { findByTestId } = setup({
        allocations:
          scope3DashboardAllocationMocks.scope3DashboardEmissionsAllocationMockSingle,
      });

      expect(
        await findByTestId(categoriesSelectors.categoriesContainer)
      ).toBeInTheDocument();
      expect(
        await findByTestId(categoriesSelectors.categoriesRow)
      ).toBeInTheDocument();
      expect(
        await findByTestId(categoriesSelectors.categoriesName)
      ).toBeInTheDocument();
      expect(
        await findByTestId(categoriesSelectors.categoriesTotalEmissions)
      ).toBeInTheDocument();
      expect(
        await findByTestId(percentageSelectors.percentageContainer)
      ).toBeInTheDocument();
    });

    it('should render a list of rows that include category names', async () => {
      const { findByTestId, getByText } = setup({
        allocations:
          scope3DashboardAllocationMocks.scope3DashboardEmissionsAllocationMockMultiple,
      });

      expect(
        await findByTestId(categoriesSelectors.categoriesContainer)
      ).toBeInTheDocument();
      // assert category names
      expect(
        getByText(categoriesNamespace.END_OF_LIFE_TREATMENT_OF_SOLD_PRODUCTS)
      ).toBeVisible();
      expect(getByText(categoriesNamespace.USE_OF_SOLD_PRODUCTS)).toBeVisible();
      expect(getByText(categoriesNamespace.FRANCHISES)).toBeVisible();
      expect(getByText(categoriesNamespace.BUSINESS_TRAVEL)).toBeVisible();
    });
  });
});
