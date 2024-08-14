import { render } from '@testing-library/react';

import { AlizarinCrimson, FunGreen } from 'styles/colours';
import { RankVariance, IProps } from './RankVariance';

const setup = (overrides: Partial<IProps> = {}) => {
  const props = {
    previousRank: 5,
    currentRank: 3,
    year: 2020,
    ...overrides,
  };
  return render(<RankVariance {...props} />);
};

describe('RankVariance', () => {
  // No variation - if not first
  it('should display no variance label when previous rank is the same as current but worse than 1st', () => {
    const { getByTestId } = setup({
      previousRank: 3,
      currentRank: 3,
      year: 2018,
    });

    expect(getByTestId('rank-variance').textContent).toContain(
      'dashboard:no-variation'
    );
    expect(getByTestId('rank-variance').textContent).not.toContain(
      'dashboard:you-were'
    );
    expect(getByTestId('rank-variance').textContent).toContain('2018');

    expect(getByTestId('rank-variance-info')).toHaveStyle(
      `color: ${AlizarinCrimson}`
    );
  });

  //  No varionation - if first
  it('should display no variance label when previous rank is the same as current and 1st', () => {
    const { getByTestId } = setup({
      previousRank: 1,
      currentRank: 1,
      year: 2018,
    });

    expect(getByTestId('rank-variance').textContent).toContain(
      'dashboard:no-variation'
    );
    expect(getByTestId('rank-variance').textContent).not.toContain(
      'dashboard:you-were'
    );

    expect(getByTestId('rank-variance').textContent).toContain('2018');

    expect(getByTestId('rank-variance-info')).toHaveStyle(`color: ${FunGreen}`);
  });

  // Dropped position
  it('should display previous rank label when previous rank is better than current rank ', () => {
    const { getByTestId } = setup({
      previousRank: 3,
      currentRank: 4,
      year: 2018,
    });

    expect(getByTestId('rank-variance').textContent).not.toContain(
      'dashboard:no-variation'
    );
    expect(getByTestId('rank-variance').textContent).toContain(
      'dashboard:you-were'
    );

    expect(getByTestId('rank-variance-info').textContent).toContain('3rd');

    expect(getByTestId('rank-variance').textContent).toContain('2018');

    expect(getByTestId('rank-variance-info')).toHaveStyle(
      `color: ${AlizarinCrimson}`
    );
  });

  // Risen position
  it('should display previous rank label when previous rank is worse than current ', () => {
    const { getByTestId } = setup({
      previousRank: 4,
      currentRank: 3,
      year: 2018,
    });

    expect(getByTestId('rank-variance').textContent).not.toContain(
      'dashboard:no-variation'
    );
    expect(getByTestId('rank-variance').textContent).toContain(
      'dashboard:you-were'
    );

    expect(getByTestId('rank-variance-info').textContent).toContain('4th');

    expect(getByTestId('rank-variance').textContent).toContain('2018');

    expect(getByTestId('rank-variance-info')).toHaveStyle(`color: ${FunGreen}`);
  });
});
