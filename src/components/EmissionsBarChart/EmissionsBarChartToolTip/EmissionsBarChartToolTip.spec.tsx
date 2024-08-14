import { render } from '@testing-library/react';
import { TooltipPayload } from 'recharts';
import I18nProvider from 'next-translate/I18nProvider';
import { EmissionsBarChartKeys } from 'components/EmissionsBarChart/utils';

import emissionsOverviewChartNamespace from '../../../../locales/en/emissionsOverviewChart.json';
import commonNamespace from '../../../../locales/en/common.json';

import { EmissionsBarChartTooltip } from '.';
import * as selectors from './selectors';

const scope1 = {
  dataKey: EmissionsBarChartKeys.SCOPE1,
  payload: {
    year: 2016,
    scope1: 200_000,
  },
};

const scope2 = {
  dataKey: EmissionsBarChartKeys.SCOPE2,
  payload: {
    year: 2016,
    scope2: 210_000,
  },
};

const scope3 = {
  dataKey: EmissionsBarChartKeys.SCOPE3,
  payload: {
    year: 2016,
    scope1: 200_000,
    scope2: 210_000,
    scope3: 220_000,
  },
};

const offset = {
  dataKey: EmissionsBarChartKeys.OFFSET,
  payload: {
    year: 2016,
    scope1: 200_000,
    scope2: 210_000,
    scope3: 220_000,
    offset: -204_000,
  },
};

const completePayload = {
  dataKey: EmissionsBarChartKeys.OFFSET,
  payload: {
    year: 2016,
    scope1: 200_000,
    scope2: 210_000,
    scope3: 220_000,
    offset: -204_000,
    scope1And2TargetEmission: 200_000,
    scope3TargetEmission: 210_000,
    totalTargetEmission: 200_000,
  },
};

const noOffsetData = {
  dataKey: EmissionsBarChartKeys.OFFSET,
  payload: {
    year: 2016,
    offset: undefined,
  },
};

const noScope3Data = {
  dataKey: EmissionsBarChartKeys.OFFSET,
  payload: {
    year: 2016,
    scope3: undefined,
  },
};

const noScope1And2Data = {
  dataKey: EmissionsBarChartKeys.OFFSET,
  payload: {
    year: 2016,
    scope1: undefined,
    scope2: undefined,
    scope3: 220_000,
  },
};

const setup = (overrides = {}) => {
  const props = {
    payload: undefined,
    isScope3TargetFormData: false,
    baselineYear: undefined,
    ...overrides,
  };

  return render(
    <I18nProvider
      namespaces={{
        emissionsOverviewChart: emissionsOverviewChartNamespace,
        common: commonNamespace,
      }}
    >
      <EmissionsBarChartTooltip {...props} />
    </I18nProvider>
  );
};

describe('EmissionsBarChartTooltip', () => {
  it('should display scope1 emissions', () => {
    const payload = ([scope1] as unknown) as TooltipPayload['payload'];
    const { getByTestId } = setup({ payload });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(getByTestId(selectors.scope1Label).textContent).toBe(
      `200,000 ${commonNamespace['unit-mt-co2']}`
    );
  });

  it('should display scope2 emissions', () => {
    const payload = ([scope2] as unknown) as TooltipPayload['payload'];
    const { getByTestId } = setup({ payload });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(getByTestId(selectors.scope2Label).textContent).toBe(
      `210,000 ${commonNamespace['unit-mt-co2']}`
    );
  });

  it('should not display scope2 emissions if no scope2 emissions', () => {
    const payload = ([scope1] as unknown) as TooltipPayload['payload'];
    const { queryByTestId, getByTestId } = setup({ payload });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(queryByTestId(selectors.scope2Label)).not.toBeInTheDocument();
    expect(getByTestId(selectors.scope1Label).textContent).toBe(
      `200,000 ${commonNamespace['unit-mt-co2']}`
    );
  });

  it('should not display scope1 and scope2 emissions if no scope1 emissions', () => {
    const payload = ([
      noScope1And2Data,
    ] as unknown) as TooltipPayload['payload'];
    const { queryByTestId, getByTestId } = setup({ payload });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(queryByTestId(selectors.scope2Label)).not.toBeInTheDocument();
    expect(queryByTestId(selectors.scope1Label)).not.toBeInTheDocument();
  });

  it('should display scope3 emissions', () => {
    const payload = ([scope3] as unknown) as TooltipPayload['payload'];
    const { getByTestId } = setup({ payload });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(getByTestId(selectors.scope3Label).textContent).toBe(
      `220,000 ${commonNamespace['unit-mt-co2']}`
    );
  });

  it('should not display scope3 emissions if no scope1 and 2 emissions', () => {
    const payload = ([
      noScope1And2Data,
    ] as unknown) as TooltipPayload['payload'];
    const { getByTestId, queryByTestId } = setup({ payload });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(queryByTestId(selectors.scope3Label)).not.toBeInTheDocument();
  });

  it('should not display scope3 emissions when undefined', () => {
    const payload = ([noScope3Data] as unknown) as TooltipPayload['payload'];
    const { getByTestId, queryByTestId } = setup({ payload });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(queryByTestId(selectors.scope3Label)).not.toBeInTheDocument();
  });

  it('should display offset emissions', () => {
    const payload = ([offset] as unknown) as TooltipPayload['payload'];
    const { getByTestId } = setup({ payload });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(getByTestId(selectors.offsetLabel).textContent).toBe(
      `-204,000 ${commonNamespace['unit-mt-co2']}`
    );
  });

  it('should not display offset emissions when undefined', () => {
    const payload = ([noOffsetData] as unknown) as TooltipPayload['payload'];
    const { getByTestId, queryByTestId } = setup({ payload });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(queryByTestId(selectors.offsetLabel)).not.toBeInTheDocument();
  });

  it('should display total target emissions with label "Your ambition" if emission offsets included', () => {
    const payload = ([completePayload] as unknown) as TooltipPayload['payload'];
    const { getByTestId } = setup({ payload, isOffsetTargetFormData: true });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(getByTestId(selectors.totalTargetEmissionsLabel).textContent).toBe(
      `200,000 ${commonNamespace['unit-mt-co2']}`
    );
  });

  it('should not display total target emissions if emission offsets are not included', () => {
    const payload = ([completePayload] as unknown) as TooltipPayload['payload'];
    const { queryByTestId, getByTestId } = setup({
      payload,
    });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(
      queryByTestId(selectors.totalTargetEmissionsLabel)
    ).not.toBeInTheDocument();
  });

  it('should not display scope3 target if scope3 target form data has not been entered', () => {
    const payload = ([completePayload] as unknown) as TooltipPayload['payload'];
    const { queryByTestId, getByTestId } = setup({
      payload,
      isScope3TargetFormData: false,
    });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(queryByTestId(selectors.scope3TargetLabel)).not.toBeInTheDocument();
  });

  it('should display scope3 target if scope3 target form data has been entered', () => {
    const payload = ([completePayload] as unknown) as TooltipPayload['payload'];
    const { getByTestId } = setup({ payload, isScope3TargetFormData: true });

    expect(getByTestId(selectors.yearLabel).textContent).toContain(
      payload[0].payload.year.toString()
    );

    expect(getByTestId(selectors.scope3TargetLabel).textContent).toBe(
      `210,000 ${commonNamespace['unit-mt-co2']}`
    );
  });

  describe('when year is the same as baseline year', () => {
    it('should render baseline year label', () => {
      const payload = ([
        completePayload,
      ] as unknown) as TooltipPayload['payload'];

      const { getByTestId } = setup({
        payload,
        baselineYear: completePayload.payload.year,
      });

      expect(getByTestId(selectors.yearLabel)).toHaveTextContent(
        `${completePayload.payload.year} - ${commonNamespace['tooltip-baseline-year']}`
      );
    });
  });

  describe('when year is NOT the same as baseline year', () => {
    it('should NOT render baseline year label', () => {
      const payload = ([
        completePayload,
      ] as unknown) as TooltipPayload['payload'];

      const { queryByText } = setup({
        payload,
        baselineYear: completePayload.payload.year + 1,
      });

      expect(
        queryByText(emissionsOverviewChartNamespace['tooltip-baseline-year'])
      ).not.toBeInTheDocument();
    });
  });
});
