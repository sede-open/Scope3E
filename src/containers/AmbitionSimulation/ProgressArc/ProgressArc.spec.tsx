import { render } from '@testing-library/react';

import { FunGreen, Scorpion, AlizarinCrimson, Silver } from 'styles/colours';

import { ProgressArc, IProps, STROKE_DASH } from './ProgressArc';

const setup = (overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    achievedPercentageChange: -10.234,
    desiredPercentageChange: -12.986,
    disabled: false,
    ...overrides,
  };
  return render(<ProgressArc {...props} />);
};

describe('ProgressArc', () => {
  it('should render rounded desired emissions', () => {
    const { getByTestId } = setup({
      desiredPercentageChange: -12.986,
    });

    expect(getByTestId('desired-percentage-reduction').textContent).toContain(
      '13'
    );
  });

  it('should render rounded achieved emissions', () => {
    const { getByTestId } = setup({
      desiredPercentageChange: -0.003,
    });

    expect(getByTestId('achieved-percentage-reduction').textContent).toContain(
      '0'
    );
  });

  it('when achievedPercentageChange is negative', () => {
    const { getByTestId } = setup({
      achievedPercentageChange: -10.234,
      desiredPercentageChange: -12.986,
    });
    expect(getByTestId('simulation-progress-arc')).toBeInTheDocument();
    expect(getByTestId('achieved-percentage-reduction').textContent).toContain(
      '10.2'
    );
    expect(getByTestId('achieved-percentage-reduction')).toHaveStyle(
      `color: ${FunGreen}`
    );
    expect(getByTestId('desired-percentage-reduction').textContent).toContain(
      '13'
    );
  });

  it('when achievedPercentageChange is zero', () => {
    const { getByTestId } = setup({
      achievedPercentageChange: 0,
      desiredPercentageChange: -12.986,
    });
    expect(getByTestId('simulation-progress-arc')).toBeInTheDocument();
    expect(getByTestId('achieved-percentage-reduction').textContent).toContain(
      '0'
    );
    expect(getByTestId('achieved-percentage-reduction')).toHaveStyle(
      `color: ${Scorpion}`
    );
    expect(getByTestId('desired-percentage-reduction').textContent).toContain(
      '13'
    );
  });

  it('when achievedPercentageChange is positive', () => {
    const { getByTestId } = setup({
      achievedPercentageChange: 10,
      desiredPercentageChange: -12,
    });
    expect(getByTestId('simulation-progress-arc')).toBeInTheDocument();
    expect(getByTestId('achieved-percentage-reduction').textContent).toContain(
      '10'
    );
    expect(getByTestId('achieved-percentage-reduction')).toHaveStyle(
      `color: ${AlizarinCrimson}`
    );
    expect(getByTestId('desired-percentage-reduction').textContent).toContain(
      '12'
    );
  });

  it('when fractional change between desiredPercentageChange and achievedPercentageChange is negative', () => {
    const { getByTestId } = setup({
      achievedPercentageChange: 10,
      desiredPercentageChange: -12,
    });
    expect(getByTestId('progress-arc-line')).toHaveStyle(`stroke: ${Silver}`);
    expect(getByTestId('progress-arc-line')).toHaveStyle(
      `stroke-dasharray: 0 ${STROKE_DASH}`
    );
  });

  it('when fractional change between desiredPercentageChange and achievedPercentageChange is 0', () => {
    const { getByTestId } = setup({
      achievedPercentageChange: 0,
      desiredPercentageChange: -12,
    });
    expect(getByTestId('progress-arc-line')).toHaveStyle(`stroke: ${Silver}`);
    expect(getByTestId('progress-arc-line')).toHaveStyle(
      `stroke-dasharray: 0 ${STROKE_DASH}`
    );
  });

  it('when fractional change between desiredPercentageChange and achievedPercentageChange is positive', () => {
    const { getByTestId } = setup({
      achievedPercentageChange: -3,
      desiredPercentageChange: -12,
    });
    expect(getByTestId('progress-arc-line')).toHaveStyle(`stroke: ${FunGreen}`);
    expect(getByTestId('progress-arc-line')).toHaveStyle(
      `stroke-dasharray: ${0.25 * STROKE_DASH} ${STROKE_DASH}`
    );
  });

  it('should cap positive achieved emissions at +10,000%', () => {
    const { getByTestId } = setup({
      achievedPercentageChange: -2000000,
      desiredPercentageChange: -12,
    });
    expect(getByTestId('achieved-percentage-reduction').textContent).toContain(
      '+10000%'
    );
  });

  it('should cap negative achieved emissions at -10,000%', () => {
    const { getByTestId } = setup({
      achievedPercentageChange: 2000000,
      desiredPercentageChange: -12,
    });
    expect(getByTestId('achieved-percentage-reduction').textContent).toContain(
      '-10000%'
    );
  });
});
