import { render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as scope3DashboardAllocationMocks from 'mocks/scope3DashboardAllocations';
import * as emptyStateSelectors from 'containers/Dashboard/Scope3Dashboard/EmptyState/selectors';
import * as percentageSelectors from 'containers/Dashboard/Scope3Dashboard/PercentageBar/selectors';

import scope3DashboardNamespace from '../../../../../locales/en/scope3Dashboard.json';
import commonNamespace from '../../../../../locales/en/common.json';
import { Sectors } from '.';
import * as sectorsSelectors from './selectors';

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
        common: commonNamespace,
        scope3Dashboard: scope3DashboardNamespace,
      }}
    >
      <Sectors {...props} />
    </I18nProvider>
  );
};

describe('Scope3 Dashboard - Sectors', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: userCompany.id },
    }));
  });

  describe('when there are no customer emission allocations', () => {
    it('should display the empty state', async () => {
      const { findByTestId } = setup([]);

      expect(
        await findByTestId(sectorsSelectors.sectorsContainer)
      ).toBeInTheDocument();
      expect(
        await findByTestId(emptyStateSelectors.emptyStateWrapper)
      ).toBeInTheDocument();
    });
  });

  it('should render Supply Chain nav button', async () => {
    const { findByTestId, getByTestId } = setup([]);

    expect(
      await findByTestId(sectorsSelectors.sectorsContainer)
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

  it('should contain Sectors title and subtext', async () => {
    const { findByTestId, getByText } = setup([]);

    expect(
      await findByTestId(emptyStateSelectors.emptyStateWrapper)
    ).toBeInTheDocument();
    expect(
      getByText(scope3DashboardNamespace['sectors-empty-state-title'])
    ).toBeVisible();
    expect(
      getByText(scope3DashboardNamespace['sectors-empty-state-subtext'])
    ).toBeVisible();
  });

  describe('when there are emission allocations', () => {
    it('should display the sectors row', async () => {
      const { findByTestId } = setup({
        allocations:
          scope3DashboardAllocationMocks.scope3DashboardEmissionsAllocationMockSingle,
      });

      expect(
        await findByTestId(sectorsSelectors.sectorsContainer)
      ).toBeInTheDocument();
      expect(
        await findByTestId(sectorsSelectors.sectorsRow)
      ).toBeInTheDocument();
      expect(
        await findByTestId(sectorsSelectors.sectorsName)
      ).toBeInTheDocument();
      expect(
        await findByTestId(sectorsSelectors.sectorsTotalEmissions)
      ).toBeInTheDocument();
      expect(
        await findByTestId(percentageSelectors.percentageContainer)
      ).toBeInTheDocument();
    });
  });
});
