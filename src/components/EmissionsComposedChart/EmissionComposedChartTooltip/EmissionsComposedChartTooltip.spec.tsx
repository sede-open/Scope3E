import { render } from '@testing-library/react';
import { TooltipPayload } from 'recharts';
import I18nProvider from 'next-translate/I18nProvider';

import { offTargetLabel } from 'components/Charts/OffTargetLabel/selectors';
import { onTargetLabel } from 'components/Charts/OnTargetLabel/selectors';

import emissionsOverviewChartNamespace from '../../../../locales/en/emissionsOverviewChart.json';
import commonNamespace from '../../../../locales/en/common.json';

import { EmissionsTooltip, IProps } from '.';
import * as selectors from './selectors';

const netEmission = {
  dataKey: 'netEmissions',
  payload: {
    year: 2019,
    netEmissions: 900,
  },
};
const netEmissionLow = {
  dataKey: 'netEmissions',
  payload: {
    year: 2019,
    netEmissions: 50,
  },
};

const grossEmission = {
  dataKey: 'grossEmissions',
  payload: {
    year: 2019,
    grossEmissions: 1000,
  },
};
const grossEmissionLow = {
  dataKey: 'grossEmissions',
  payload: {
    year: 2019,
    grossEmissions: 100,
  },
};

const targetEmission = {
  dataKey: 'totalTargetEmission',
  payload: {
    year: 2019,
    totalTargetEmission: 500,
  },
};

const zeroTargetEmission = {
  dataKey: 'totalTargetEmission',
  payload: {
    year: 2019,
    totalTargetEmission: 0,
  },
};

const iea = {
  dataKey: 'iea',
  payload: {
    year: 2019,
    iea: [50.54, 100.45],
  },
};

const setup = (overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    includeCarbonOffset: false,
    payload: undefined,
    baselineYear: 2019,
    ...overrides,
  };

  return render(
    <I18nProvider
      namespaces={{
        emissionsOverviewChart: emissionsOverviewChartNamespace,
        common: commonNamespace,
      }}
    >
      <EmissionsTooltip {...props} />
    </I18nProvider>
  );
};

describe('EmissionsTooltip', () => {
  it('should render gross emissions', () => {
    const payload = ([grossEmission] as unknown) as TooltipPayload['payload'];
    const { getByTestId, queryByTestId } = setup({ payload });
    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );
    expect(getByTestId(selectors.grossEmissionsLabel).textContent).toBe(
      `1,000 ${commonNamespace['unit-mt-co2']}`
    );
    expect(queryByTestId(selectors.targetLabel)).not.toBeInTheDocument();
  });

  it('should render net emissions', () => {
    const payload = ([netEmission] as unknown) as TooltipPayload['payload'];
    const { getByTestId, queryByTestId } = setup({ payload });
    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );
    expect(getByTestId(selectors.netEmissionsLabel).textContent).toBe(
      `900 ${commonNamespace['unit-mt-co2']}`
    );
    expect(queryByTestId(selectors.targetLabel)).not.toBeInTheDocument();
  });

  it('should render target emissions', () => {
    const payload = ([targetEmission] as unknown) as TooltipPayload['payload'];
    const { getByTestId, queryByTestId } = setup({ payload });
    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );
    expect(getByTestId(selectors.targetLabel).textContent).toBe(
      `${payload[0].payload.totalTargetEmission.toString()} ${
        commonNamespace['unit-mt-co2']
      }`
    );
    expect(
      queryByTestId(selectors.grossEmissionsLabel)
    ).not.toBeInTheDocument();
  });

  it('should render gross and target emissions', () => {
    const payload = ([
      targetEmission,
      grossEmission,
    ] as unknown) as TooltipPayload['payload'];
    const { getByTestId } = setup({ payload });
    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );
    expect(getByTestId(selectors.targetLabel).textContent).toBe(
      `${payload[0].payload.totalTargetEmission.toString()} ${
        commonNamespace['unit-mt-co2']
      }`
    );
    expect(getByTestId(selectors.grossEmissionsLabel).textContent).toBe(
      `1,000 ${commonNamespace['unit-mt-co2']}`
    );
  });

  it('should render net, gross and target emissions', () => {
    const payload = ([
      targetEmission,
      grossEmission,
      netEmission,
    ] as unknown) as TooltipPayload['payload'];
    const { getByTestId } = setup({ payload });
    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );
    expect(getByTestId(selectors.targetLabel).textContent).toBe(
      `${payload[0].payload.totalTargetEmission.toString()} ${
        commonNamespace['unit-mt-co2']
      }`
    );
    expect(getByTestId(selectors.netEmissionsLabel).textContent).toBe(
      `900 ${commonNamespace['unit-mt-co2']}`
    );
    expect(getByTestId(selectors.grossEmissionsLabel).textContent).toBe(
      `1,000 ${commonNamespace['unit-mt-co2']}`
    );
  });

  it('should render IEA range values', () => {
    const payload = ([iea] as unknown) as TooltipPayload['payload'];
    const { getByTestId } = setup({ payload });
    expect(getByTestId('emissions-tooltip-iea-min').textContent).toContain(
      `51 ${commonNamespace['unit-mt-co2']}`
    );
    expect(getByTestId('emissions-tooltip-iea-max').textContent).toContain(
      `100 ${commonNamespace['unit-mt-co2']}`
    );
  });

  it('should render target when it is 0', () => {
    const payload = ([
      zeroTargetEmission,
      grossEmission,
    ] as unknown) as TooltipPayload['payload'];
    const { getByTestId } = setup({ payload });
    expect(getByTestId(selectors.targetLabel).textContent).toBe(
      `- ${commonNamespace['unit-mt-co2']}`
    );
    expect(getByTestId(selectors.grossEmissionsLabel).textContent).toBe(
      `1,000 ${commonNamespace['unit-mt-co2']}`
    );
  });

  describe('when target does NOT include offsets', () => {
    it('should render if on target message', () => {
      const payload = ([
        targetEmission,
        grossEmissionLow,
      ] as unknown) as TooltipPayload['payload'];
      const { getByTestId } = setup({ payload });
      expect(getByTestId(onTargetLabel)).toBeInTheDocument();
    });

    it('should render if on emissions not on target message', () => {
      const payload = ([
        targetEmission,
        grossEmission,
      ] as unknown) as TooltipPayload['payload'];
      const { getByTestId } = setup({ payload });
      expect(getByTestId(offTargetLabel).textContent).toContain('100%');
    });
  });

  describe('when target does includes offsets', () => {
    it('should render if on target message', () => {
      const payload = ([
        netEmissionLow,
        targetEmission,
      ] as unknown) as TooltipPayload['payload'];

      const { getByTestId } = setup({
        payload,
        includeCarbonOffset: true,
      });

      expect(getByTestId(onTargetLabel)).toBeInTheDocument();
    });

    it('should render if on emissions not on target message', () => {
      const payload = ([
        netEmission,
        targetEmission,
      ] as unknown) as TooltipPayload['payload'];

      const { getByTestId } = setup({
        payload,
        includeCarbonOffset: true,
      });

      expect(getByTestId(offTargetLabel).textContent).toContain('80%');
    });
  });

  describe('when year is the same as baseline year', () => {
    it('should render baseline year label', () => {
      const payload = ([
        netEmission,
        targetEmission,
      ] as unknown) as TooltipPayload['payload'];

      const { getByTestId } = setup({
        payload,
        includeCarbonOffset: true,
        baselineYear: netEmission.payload.year,
      });

      expect(getByTestId(selectors.yearLabel)).toHaveTextContent(
        `${netEmission.payload.year} - ${commonNamespace['tooltip-baseline-year']}`
      );
    });
  });

  describe('when year is NOT the same as baseline year', () => {
    it('should NOT render baseline year label', () => {
      const payload = ([
        netEmission,
        targetEmission,
      ] as unknown) as TooltipPayload['payload'];

      const { queryByText } = setup({
        payload,
        includeCarbonOffset: true,
        baselineYear: netEmission.payload.year + 1,
      });

      expect(
        queryByText(emissionsOverviewChartNamespace['tooltip-baseline-year'])
      ).not.toBeInTheDocument();
    });
  });
});
