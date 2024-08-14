import { render } from '@testing-library/react';
import { TooltipPayload } from 'recharts';

import { formatInteger } from 'utils/number';
import { TrendlineTooltip } from './TrendlineTooltip';

describe('TrendlineTooltip', () => {
  const getPayload = (
    year: number,
    scope3: number | null,
    isPrediction: boolean
  ) => ({
    dataKey: 'scope1',
    payload: {
      year,
      scope1: 1234,
      scope2: 5678,
      scope3,
      isPrediction,
    },
  });

  describe('when the data is prediction data', () => {
    it('should render the prediction heading', () => {
      const year = 2016;
      const payload = ([
        getPayload(year, 123, true),
      ] as unknown) as TooltipPayload['payload'];
      const { getByTestId } = render(<TrendlineTooltip payload={payload} />);

      expect(getByTestId('trendline-tooltip-title').textContent).toContain(
        `${year}dashboard:emissions-trendline-chart-tooltip-prediction`
      );
    });
  });

  describe('when the data is historical data', () => {
    it('should render the historic heading', () => {
      const year = 2016;
      const payload = ([
        getPayload(year, 123, false),
      ] as unknown) as TooltipPayload['payload'];
      const { getByTestId } = render(<TrendlineTooltip payload={payload} />);

      expect(getByTestId('trendline-tooltip-title').textContent).toContain(
        `${year}dashboard:emissions-trendline-chart-tooltip-historic`
      );
    });
  });

  it('should render scope1 and scope2 emissions', () => {
    const payload = ([
      getPayload(2016, 123, false),
    ] as unknown) as TooltipPayload['payload'];
    const { getByTestId } = render(<TrendlineTooltip payload={payload} />);

    expect(getByTestId('trendline-tooltip-scope1-value').textContent).toContain(
      formatInteger(payload[0].payload.scope1)
    );
    expect(getByTestId('trendline-tooltip-scope2-value').textContent).toContain(
      formatInteger(payload[0].payload.scope2)
    );
  });

  describe('conditional scope3', () => {
    describe('when the data is prediction data and scope3 is null', () => {
      it('should render the empty value', () => {
        const payload = ([
          getPayload(2016, null, true),
        ] as unknown) as TooltipPayload['payload'];
        const { getByTestId } = render(<TrendlineTooltip payload={payload} />);

        expect(
          getByTestId('trendline-tooltip-scope3-empty-value')
        ).toBeInTheDocument();
      });
    });

    describe('when the data is historic and scope 3 is null', () => {
      it('should render nothing', () => {
        const payload = ([
          getPayload(2016, null, false),
        ] as unknown) as TooltipPayload['payload'];
        const { queryByTestId } = render(
          <TrendlineTooltip payload={payload} />
        );

        expect(
          queryByTestId('trendline-tooltip-scope3-empty-value')
        ).not.toBeInTheDocument();
        expect(
          queryByTestId('trendline-tooltip-scope3-value')
        ).not.toBeInTheDocument();
      });
    });

    describe('when there is scope3 data', () => {
      it('should render the scope3 value', () => {
        const scope3Value = 12345;
        const payload = ([
          getPayload(2016, scope3Value, true),
        ] as unknown) as TooltipPayload['payload'];
        const { getByTestId } = render(<TrendlineTooltip payload={payload} />);

        expect(
          getByTestId('trendline-tooltip-scope3-value').textContent
        ).toContain(formatInteger(scope3Value));
      });
    });
  });
});
