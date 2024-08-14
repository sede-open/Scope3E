import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { USER_COMPANY_ID } from 'mocks/constants';
import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { Scope3DashboardAllocationsQuery_emissionAllocations as Allocation } from 'types/Scope3DashboardAllocationsQuery';
import { EmissionAllocationStatus } from 'types/globalTypes';
import * as scope3DashboardAllocationsMocks from 'mocks/scope3DashboardAllocations';
import { Scope3Dashboard } from '.';
import { scope3DashboardTabs } from './constants';
import {
  getScope3TotalForYear,
  getTotalAllocatedEmissions,
  getTotalUnallocatedEmissions,
  getYearOptions,
  setChartPadding,
  getPercentAllocated,
  sortCategoriesByEmissionTotal,
  sortSectorsByEmissionTotal,
} from './utils';
import * as pieChartSelectors from './Scope3PieChart/selectors';
import * as categoriesSelectors from './Categories/selectors';
import * as sectorsSelectors from './Sectors/selectors';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');

const setup = (mocks: any[]) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Scope3Dashboard emissions={[]} companyId={USER_COMPANY_ID} />
    </MockedProvider>
  );

describe('Scope3Dashboard', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: USER_COMPANY_ID },
    }));
  });

  it('should render the Scope 3 Pie Chart section', async () => {
    const { findByTestId } = setup([]);

    expect(
      await findByTestId(pieChartSelectors.pieChartWrapper)
    ).toBeInTheDocument();
  });

  it('should render the Scope 3 Dashboard year select', async () => {
    const { findByTestId } = setup([]);

    expect(
      await findByTestId(selectors.scope3DashboardYear)
    ).toBeInTheDocument();
  });

  it('should render Tab container with nested Categories tab container as default', async () => {
    const { findByTestId } = setup([]);

    expect(
      await findByTestId(selectors.tabContentContainer)
    ).toBeInTheDocument();

    // assert categories tab as default
    expect(
      await findByTestId(categoriesSelectors.categoriesContainer)
    ).toBeInTheDocument();
  });

  it('should render Categories tab container and toggle to Sectors tab container', async () => {
    const { getByTestId, findByTestId, queryByTestId } = setup([]);

    expect(
      await findByTestId(selectors.tabContentContainer)
    ).toBeInTheDocument();

    expect(
      queryByTestId(sectorsSelectors.sectorsContainer)
    ).not.toBeInTheDocument();

    // default tab
    expect(
      await findByTestId(categoriesSelectors.categoriesContainer)
    ).toBeInTheDocument();

    // toggle sector tab
    fireEvent.click(getByTestId(`tab-${scope3DashboardTabs[1].value}`));

    expect(
      await findByTestId(sectorsSelectors.sectorsContainer)
    ).toBeInTheDocument();

    expect(
      queryByTestId(categoriesSelectors.categoriesContainer)
    ).not.toBeInTheDocument();
  });

  it('should allow the user to toggle back to Categories tab container from Sectors tab container', async () => {
    const { getByTestId, findByTestId } = setup([]);

    expect(
      await findByTestId(selectors.tabContentContainer)
    ).toBeInTheDocument();

    // default tab
    expect(
      await findByTestId(categoriesSelectors.categoriesContainer)
    ).toBeInTheDocument();

    // toggle sector tab
    fireEvent.click(getByTestId(`tab-${scope3DashboardTabs[1].value}`));

    expect(
      await findByTestId(sectorsSelectors.sectorsContainer)
    ).toBeInTheDocument();

    // toggle categories tab
    fireEvent.click(getByTestId(`tab-${scope3DashboardTabs[0].value}`));

    expect(
      await findByTestId(categoriesSelectors.categoriesContainer)
    ).toBeInTheDocument();
  });

  describe('getYearOptions', () => {
    it('should return correct year values that have emissions', () => {
      const emissions = ([
        {
          year: 2016,
          scope1: 1,
          scope2: 2,
          scope3: 4,
          offset: 1,
        },
        {
          year: 2017,
          scope1: 5,
          scope2: 6,
          scope3: 7,
          offset: 8,
        },
        {
          year: 2018,
          scope1: 1,
          scope2: 1,
          scope3: 0,
          offset: 2,
        },
      ] as unknown) as Emission[];

      const result = getYearOptions(emissions);

      const expectedResult = [2018, 2017, 2016];

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getTotalAllocatedEmissions', () => {
    it('should return total allocated emissions value', () => {
      const allocationsData = ([
        {
          emissions: 1000,
          status: EmissionAllocationStatus.APPROVED,
          year: 2019,
        },
        {
          emissions: 5000,
          status: EmissionAllocationStatus.APPROVED,
          year: 2020,
        },
        {
          emissions: 100,
          status: EmissionAllocationStatus.APPROVED,
          year: 2020,
        },
      ] as unknown) as Allocation[];

      const result = getTotalAllocatedEmissions(allocationsData);

      const expectedResult = 6100;

      expect(result).toEqual(expectedResult);
    });

    it('should return 0 if no allocated emissions', () => {
      const allocationsData = ([
        {
          emissions: 0,
          status: undefined,
          year: 2019,
        },
        {
          emissions: 0,
          status: undefined,
          year: 2020,
        },
        {
          emissions: 0,
          status: undefined,
          year: 2020,
        },
      ] as unknown) as Allocation[];

      const result = getTotalAllocatedEmissions(allocationsData);

      const expectedResult = 0;

      expect(result).toEqual(expectedResult);
    });

    it('should not include rejected emission allocations to total', () => {
      const allocationsData = ([
        {
          emissions: 1000,
          status: EmissionAllocationStatus.REJECTED,
          year: 2019,
        },
        {
          emissions: 5000,
          status: EmissionAllocationStatus.APPROVED,
          year: 2020,
        },
        {
          emissions: 100,
          status: EmissionAllocationStatus.AWAITING_APPROVAL,
          year: 2020,
        },
      ] as unknown) as Allocation[];

      const result = getTotalAllocatedEmissions(allocationsData);

      const expectedResult = 5100;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getScope3TotalForYear', () => {
    it('should return scope 3 emissions total value for selected year', () => {
      const emissions = ([
        {
          year: 2016,
          scope1: 1,
          scope2: 2,
          scope3: 4,
          offset: 1,
        },
        {
          year: 2017,
          scope1: 5,
          scope2: 6,
          scope3: 7,
          offset: 8,
        },
        {
          year: 2018,
          scope1: 1,
          scope2: 1,
          scope3: 0,
          offset: 2,
        },
      ] as unknown) as Emission[];

      const selectedYear = 2017;
      const result = getScope3TotalForYear(emissions, selectedYear);
      const expectedResult = 7;

      expect(result).toEqual(expectedResult);
    });

    it('should return 0 if no scope 3 emissions for selected year', () => {
      const emissions = ([
        {
          year: 2016,
          scope1: 1,
          scope2: 2,
          scope3: 4,
          offset: 1,
        },
        {
          year: 2017,
          scope1: 5,
          scope2: 6,
          scope3: null,
          offset: 8,
        },
        {
          year: 2018,
          scope1: 1,
          scope2: 1,
          scope3: null,
          offset: 2,
        },
      ] as unknown) as Emission[];

      const selectedYear = 2017;
      const result = getScope3TotalForYear(emissions, selectedYear);
      const expectedResult = 0;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getTotalUnallocatedEmissions', () => {
    it('should return total unallocated emissions value', () => {
      const totalAllocatedEmissions = 1000;
      const scope3Total = 4000;
      const result = getTotalUnallocatedEmissions(
        totalAllocatedEmissions,
        scope3Total
      );
      const expectedResult = 3000;

      expect(result).toEqual(expectedResult);
    });

    it('should return 0 total unallocated emissions value when no scope3Total', () => {
      const totalAllocatedEmissions = 0;
      const scope3Total = null;
      const result = getTotalUnallocatedEmissions(
        totalAllocatedEmissions,
        scope3Total
      );
      const expectedResult = 0;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('setChartPadding', () => {
    it('should return pie chart section padding when allocated emissions data is true', () => {
      const hasAllocatedEmissions = true;
      const expectedPadding = 5;
      const result = setChartPadding(hasAllocatedEmissions);
      expect(result).toBe(expectedPadding);
    });

    it('should return zero padding for pie chart section when allocated emissions data is false', () => {
      const hasAllocatedEmissions = false;
      const expectedPadding = 0;
      const result = setChartPadding(hasAllocatedEmissions);
      expect(result).toBe(expectedPadding);
    });
  });

  describe('getPercentAllocated', () => {
    it('should return percentage value of emissions allocated', () => {
      const emissionsTotal = 50_000;
      const allocatedPartTotal = 10_000;
      const result = getPercentAllocated(emissionsTotal, allocatedPartTotal);
      const expectedResult = 20;

      expect(result).toEqual(expectedResult);
    });

    it('should return 0 if emissions total === 0', () => {
      const emissionsTotal = 0;
      const allocatedPartTotal = 0;
      const result = getPercentAllocated(emissionsTotal, allocatedPartTotal);
      const expectedResult = 0;

      expect(result).toEqual(expectedResult);
    });

    it('should round to 1 decimal place by default for display', () => {
      const emissionsTotal = 50_034.00345;
      const allocatedPartTotal = 9_036.00045;
      const result = getPercentAllocated(emissionsTotal, allocatedPartTotal);
      const expectedResult = 18.1;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('sortCategoriesByEmissionTotal', () => {
    it('should sort categories by emissions total value', async () => {
      const result = sortCategoriesByEmissionTotal(
        scope3DashboardAllocationsMocks.scope3DashboardEmissionsAllocationMockMultiple
      );

      expect(result[0].emissions).toEqual(8937);
      expect(result[1].emissions).toEqual(4959);
      expect(result[2].emissions).toEqual(2304);
      expect(result[3].emissions).toEqual(1000);
    });
  });

  describe('sortSectorsByEmissionTotal', () => {
    it('should sort sectors by emissions total value', () => {
      const result = sortSectorsByEmissionTotal(
        scope3DashboardAllocationsMocks.scope3DashboardEmissionsAllocationMockMultiple
      );

      expect(result[0].emissions).toEqual(8937);
      expect(result[1].emissions).toEqual(4959);
      expect(result[2].emissions).toEqual(2304);
      expect(result[3].emissions).toEqual(1000);
      expect(result).toHaveLength(4);
    });
  });

  describe('collateSimilarSectorsAndSortSectorsByEmissionTotal', () => {
    it('should collate similar sectors and sort by emissions total value', () => {
      const result = sortSectorsByEmissionTotal(
        scope3DashboardAllocationsMocks.scope3DashboardEmissionsAllocationMockMultipleSimilarSector
      );

      expect(result[0].emissions).toEqual(9937);
      expect(result[1].emissions).toEqual(7263);
      expect(result).toHaveLength(2);
    });
  });
});
