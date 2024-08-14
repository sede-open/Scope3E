import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';

import { ReductionRankType } from 'types/globalTypes';
import { COMPANY_REDUCTION_RANK_QUERY } from 'containers/Dashboard/queries';
import { RankHighlight, IProps } from '.';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');

const lastYear = new Date().getFullYear() - 1;
const yearBeforeLast = lastYear - 1;

const noRankQuery = {
  request: {
    query: COMPANY_REDUCTION_RANK_QUERY,
    variables: {
      year: lastYear,
      companyId: 'companyId',
      previousYear: yearBeforeLast,
    },
  },
  result: {
    data: { currentRank: null, previousRank: null },
  },
};

const companyEmissionRank = {
  id: 'id',
  rank: 2,
  currentYear: lastYear,
  primarySector: 'Chemicals',
  secondarySector: 'Aviation',
  reductionPercentage: -2,
  rankType: ReductionRankType.SELECTED,
  hasVerificationFile: true,
  hasPreviousYearVerificationFile: true,
};

const rankQuery = {
  request: {
    query: COMPANY_REDUCTION_RANK_QUERY,
    variables: {
      year: lastYear,
      companyId: 'companyId',
      previousYear: yearBeforeLast,
    },
  },
  result: {
    data: { currentRank: companyEmissionRank, previousRank: null },
  },
};

const rankQueryWithPrevious = {
  request: {
    query: COMPANY_REDUCTION_RANK_QUERY,
    variables: {
      year: lastYear,
      companyId: 'companyId',
      previousYear: yearBeforeLast,
    },
  },
  result: {
    data: {
      currentRank: companyEmissionRank,
      previousRank: { ...companyEmissionRank, currentYear: lastYear - 1 },
    },
  },
};

const setup = (mocks: any = [], overrides: Partial<IProps> = {}) => {
  const props = {
    lastYear,
    ...overrides,
  };
  return render(
    <MockedProvider mocks={[...mocks]} addTypename={false}>
      <RankHighlight {...props} />
    </MockedProvider>
  );
};

describe('RankHighlight', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: 'companyId' },
    }));
  });

  it('should render the previous year', async () => {
    const { findByTestId, getByTestId } = setup([noRankQuery]);
    await findByTestId(selectors.highlightRank);
    expect(getByTestId(selectors.highlightRankYear).textContent).toContain(
      lastYear.toString()
    );
  });

  it('should render company rank with ordinal', async () => {
    const { findByTestId, getByTestId } = setup([rankQuery]);
    await findByTestId(selectors.highlightRank);
    await waitFor(() => {
      expect(getByTestId(selectors.highlightRankValue).textContent).toBe('2nd');
    });
  });

  it('should render "-" when company does not have a rank for the previous year', async () => {
    const { findByTestId, getByTestId } = setup([noRankQuery]);
    await findByTestId(selectors.highlightRank);
    expect(getByTestId(selectors.highlightRankValue).textContent).toBe('-');
  });

  it('should not display RankVariance if previousRank does not exist', async () => {
    const { findByTestId, queryByTestId } = setup([rankQuery]);
    await findByTestId(selectors.highlightRank);

    expect(queryByTestId(selectors.rankVariance)).toBeNull();
  });

  it('should display RankVariance if previousRank exists', async () => {
    const { findByTestId, getByTestId } = setup([rankQueryWithPrevious]);
    await findByTestId(selectors.highlightRank);
    await waitFor(() => {
      expect(getByTestId(selectors.rankVariance).textContent).toContain(
        'dashboard:no-variation'
      );
    });
  });
});
