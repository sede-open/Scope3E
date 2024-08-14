import { render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';

import {
  DashboardDataQuery_corporateEmissions as Emission,
  DashboardDataQuery_target as Target,
} from 'types/DashboardDataQuery';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { TargetStrategyType } from 'types/globalTypes';

import dashboardNamespace from '../../../../locales/en/dashboard.json';
import { TargetHighlight, IProps } from '.';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');

const setup = (overrides: Partial<IProps> = {}) => {
  const props = {
    baseline: ({
      year: 2018,
      scope1: 100000,
      scope2: 200000,
      scope3: 300000,
      offset: undefined,
    } as unknown) as Emission,
    mostRecentEmission: ({
      year: 2019,
      scope1: 10000000,
      scope2: 10000000,
      scope3: 10000000,
      offset: undefined,
      examplePercentage: 60,
    } as unknown) as Emission,
    target: undefined,
    openModal: jest.fn(),
    ...overrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        dashboard: dashboardNamespace,
      }}
    >
      <TargetHighlight {...props} />
    </I18nProvider>
  );
};

const getTarget = (overwrites: Partial<Target> = {}): Target => ({
  scope1And2Year: 2040,
  scope1And2Reduction: 60,
  scope3Year: 2040,
  scope3Reduction: 60,
  strategy: TargetStrategyType.AGGRESSIVE,
  includeCarbonOffset: true,
  ...overwrites,
});

describe('TargetHighlight', () => {
  beforeAll(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      canEditSupplyDashboard: true,
    }));
  });

  it('should render "-" when target does not exist', () => {
    const { getByTestId } = setup();
    expect(getByTestId(selectors.highlightTargetEmission).textContent).toBe(
      '-'
    );
  });

  it('should round the target value to 2 decimals', () => {
    const baseline = ({
      year: 2020,
      scope1: 43434,
      scope2: 43434,
      scope3: undefined,
      offset: undefined,
    } as unknown) as Emission;

    const target: Target = getTarget();

    const { getByTestId } = setup({
      target,
      baseline,
    });

    expect(
      getByTestId(selectors.highlightTargetEmission).textContent
    ).toContain('34,747');
    expect(
      getByTestId(selectors.highlightTargetEmission).textContent
    ).toContain('common:unit-mt-co2');
  });

  it('should render target in tCO2e when it is less than 1,000,000,000', () => {
    const target = getTarget({
      scope1And2Reduction: 90,
      scope3Reduction: 90,
    });

    const { getByTestId } = setup({
      target,
    });

    expect(
      getByTestId(selectors.highlightTargetEmission).textContent
    ).toContain('60,000');
    expect(
      getByTestId(selectors.highlightTargetEmission).textContent
    ).toContain('common:unit-mt-co2');
  });

  it('should render target in K tCO2e when it is over 10,000,000', () => {
    const target = getTarget({
      scope1And2Reduction: 10,
      scope3Reduction: 10,
    });

    const baseline = ({
      year: 2018,
      scope1: 10000000,
      scope2: 10000000,
      scope3: 10000000,
      offset: undefined,
    } as unknown) as Emission;

    const { getByTestId } = setup({
      target,
      baseline,
    });

    expect(
      getByTestId(selectors.highlightTargetEmission).textContent
    ).toContain('27,000');
    expect(
      getByTestId(selectors.highlightTargetEmission).textContent
    ).toContain('common:unit-kt-co2');
  });

  it('should not display button for users with no canEditSupplyDashboard permission - target', () => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      canEditSupplyDashboard: false,
    }));
    const target = getTarget({
      scope1And2Reduction: 10,
    });

    const { queryByTestId } = setup({
      target,
    });
    expect(
      queryByTestId(selectors.highlightAddTargetBtn)
    ).not.toBeInTheDocument();
  });

  it('should not display add button for users with no canEditSupplyDashboard permission - no emission', () => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      canEditSupplyDashboard: false,
    }));
    const { queryByTestId } = setup();
    expect(
      queryByTestId(selectors.highlightAddTargetBtn)
    ).not.toBeInTheDocument();
  });

  it('should not display the target ambition status when target does not exist', () => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      canEditSupplyDashboard: true,
    }));

    const baseline = ({
      year: 2018,
      scope1: 10000000,
      scope2: 10000000,
      scope3: 10000000,
      offset: undefined,
    } as unknown) as Emission;

    const { queryByTestId } = setup({
      baseline,
    });

    const targetStatus = queryByTestId(selectors.highlightTargetStatus);

    expect(targetStatus).not.toBeInTheDocument();
  });

  it('should display the target ambition status when target exists', () => {
    const target = getTarget({
      scope1And2Reduction: 10,
    });

    const mostRecentEmission = ({
      year: 2019,
      scope1: 290000,
      scope2: 240000,
      scope3: undefined,
      offset: undefined,
      examplePercentage: 60,
    } as unknown) as Emission;

    const { queryByTestId } = setup({
      target,
      mostRecentEmission,
    });

    const targetStatus = queryByTestId(selectors.highlightTargetEmission);
    expect(targetStatus).toBeInTheDocument();
  });

  it('should not display a target ambitious status when previous emissions do not exist', () => {
    const target = getTarget({
      scope1And2Reduction: 50,
    });

    const { queryByTestId } = setup({
      target,
      mostRecentEmission: undefined,
    });

    const targetStatus = queryByTestId(selectors.highlightTargetStatus);
    expect(targetStatus).not.toBeInTheDocument();
  });

  it('should display the target not reached status when percentage is greater than 0%', () => {
    const target = getTarget({
      scope1And2Reduction: 50,
      scope3Reduction: 50,
    });

    const mostRecentEmission = ({
      year: 2019,
      scope1: 290000,
      scope2: 240000,
      scope3: undefined,
      offset: undefined,
      examplePercentage: 60,
    } as unknown) as Emission;

    const { queryByTestId } = setup({
      target,
      mostRecentEmission,
    });

    const targetNotReached = queryByTestId(
      selectors.highlightTargetNotReachedStatus
    );
    expect(targetNotReached).toBeInTheDocument();
  });

  it('should display the target reached status when percentage is less than 0%', () => {
    const target = getTarget({
      scope1And2Reduction: 50,
    });

    const mostRecentEmission = ({
      year: 2019,
      scope1: 2900,
      scope2: 2400,
      scope3: undefined,
      offset: undefined,
      examplePercentage: 60,
    } as unknown) as Emission;

    const { queryByTestId } = setup({
      target,
      mostRecentEmission,
    });

    const targetReached = queryByTestId(selectors.highlightTargetReachedStatus);
    expect(targetReached).toBeInTheDocument();
  });

  describe('when target is to reduce by 100%', () => {
    describe('when user has not reached their ambition', () => {
      it('should display "100% to reach your ambition"', () => {
        const target = getTarget({
          scope1And2Reduction: 100,
          scope3Reduction: 100,
        });

        const mostRecentEmission = ({
          year: 2019,
          scope1: 90000,
          scope2: 100000,
          scope3: undefined,
          offset: undefined,
          examplePercentage: 60,
        } as unknown) as Emission;

        const { queryByTestId } = setup({
          target,
          mostRecentEmission,
        });

        const targetNotReached = queryByTestId(
          selectors.highlightTargetNotReachedStatus
        );
        expect(targetNotReached).toHaveTextContent('100% to reach');
      });
    });
  });
});
