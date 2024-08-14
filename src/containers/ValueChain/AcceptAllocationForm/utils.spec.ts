import * as emissionAllocationsMocks from 'mocks/emissionAllocations';
import {
  EmissionAllocationMethod,
  EmissionAllocationStatus,
} from 'types/globalTypes';

import { getTotalEmissionAllocations, isUpstreamCategory } from './utils';

describe('getTotalEmissionAllocations', () => {
  it('should return the total number of valid emission allocations', () => {
    const getEmissionAllocation = ({
      emissions,
      status,
    }: {
      emissions: number;
      status: EmissionAllocationStatus;
    }) => ({
      ...emissionAllocationsMocks.approvedEmissionAllocation,
      allocationMethod: EmissionAllocationMethod.ECONOMICAL,
      emissions,
      status,
    });

    const allocations = [
      getEmissionAllocation({
        emissions: 1000,
        status: EmissionAllocationStatus.REJECTED,
      }),
      getEmissionAllocation({
        emissions: 1000,
        status: EmissionAllocationStatus.APPROVED,
      }),
      getEmissionAllocation({
        emissions: 1000,
        status: EmissionAllocationStatus.REQUESTED,
      }),
      getEmissionAllocation({
        emissions: 1000,
        status: EmissionAllocationStatus.APPROVED,
      }),
      getEmissionAllocation({
        emissions: 1000,
        status: EmissionAllocationStatus.AWAITING_APPROVAL,
      }),
      getEmissionAllocation({
        emissions: 1000,
        status: EmissionAllocationStatus.APPROVED,
      }),
    ];

    expect(getTotalEmissionAllocations(allocations)).toBe(
      allocations.length * 1000
    );
  });

  describe('isUpstreamCategory', () => {
    it.each`
      categoryString                                           | expected
      ${'Cat. 1 - Purchased goods and services'}               | ${true}
      ${'Cat. 2 - Capital 9 goods'}                            | ${true}
      ${'Cat. 3 - Fuel- and energy-related activities 10'}     | ${true}
      ${'Cat. 8 - Upstream leased assets'}                     | ${true}
      ${'Cat. 9 - Downstream transportation and distribution'} | ${false}
      ${'Cat. 10 - Processing of sold products'}               | ${false}
      ${'Cat. 11 - Use of sold products'}                      | ${false}
    `(
      'should return $expected when the category string is $categoryString',
      ({
        categoryString,
        expected,
      }: {
        categoryString: string;
        expected: boolean;
      }) => {
        expect(isUpstreamCategory(categoryString)).toBe(expected);
      }
    );
  });
});
