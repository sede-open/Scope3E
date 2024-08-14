import { render } from '@testing-library/react';
import { TooltipPayload } from 'recharts';
import I18nProvider from 'next-translate/I18nProvider';

import { offTargetLabel } from 'components/Charts/OffTargetLabel/selectors';
import { onTargetLabel } from 'components/Charts/OnTargetLabel/selectors';

import carbonIntensityNamespace from '../../../../locales/en/carbonIntensity.json';
import commonNamespace from '../../../../locales/en/common.json';

import { CarbonIntensityTooltip } from '.';
import { IProps } from './types';
import * as selectors from './selectors';
import { CarbonIntensityChartKey } from '../types';

const intensityEmission = {
  dataKey: CarbonIntensityChartKey.ACTUAL_INTENSITIES,
  payload: {
    year: 2019,
    [CarbonIntensityChartKey.ACTUAL_INTENSITIES]: 900,
  },
};

const intensityTargetEmission = {
  dataKey: CarbonIntensityChartKey.TARGET_INTENSITIES,
  payload: {
    year: 2019,
    [CarbonIntensityChartKey.TARGET_INTENSITIES]: 500,
  },
};

const ieaEmissionRange = {
  dataKey: CarbonIntensityChartKey.IEA,
  payload: {
    year: 2019,
    [CarbonIntensityChartKey.IEA]: [50.54, 100.45],
  },
};

const setup = (overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    payload: undefined,
    baselineYear: 2019,
    ...overrides,
  };

  return render(
    <I18nProvider
      namespaces={{
        carbonIntensity: carbonIntensityNamespace,
        common: commonNamespace,
      }}
    >
      <CarbonIntensityTooltip {...props} />
    </I18nProvider>
  );
};

describe('CarbonIntensityTooltip', () => {
  describe('when payload contains an actual intensity emission', () => {
    const payload = ([
      intensityEmission,
    ] as unknown) as TooltipPayload['payload'];

    it('should render actual intensity emissions', () => {
      const { getByTestId } = setup({ payload });

      expect(getByTestId(selectors.actualIntensityLabel).textContent).toBe(
        `${
          payload[0].payload[CarbonIntensityChartKey.ACTUAL_INTENSITIES]
        } tCO2e`
      );
    });

    describe('when payload contains target intensity emission', () => {
      describe('when the actual intensity emission is bigger than the target', () => {
        it('should render off target label', () => {
          const payloadWithLargeIntensity = ([
            intensityEmission,
            intensityTargetEmission,
          ] as unknown) as TooltipPayload['payload'];

          const { getByTestId, queryByTestId } = setup({
            payload: payloadWithLargeIntensity,
          });

          expect(getByTestId(offTargetLabel)).toBeInTheDocument();
          expect(queryByTestId(onTargetLabel)).toBeNull();
        });
      });

      describe('when the actual intensity emission is smaller than the target', () => {
        it('should render on target label', () => {
          const smallIntensityEmission = {
            dataKey: CarbonIntensityChartKey.ACTUAL_INTENSITIES,
            payload: {
              year: 2019,
              [CarbonIntensityChartKey.ACTUAL_INTENSITIES]: 200,
            },
          };

          const payloadWithSmallIntensity = ([
            smallIntensityEmission,
            intensityTargetEmission,
          ] as unknown) as TooltipPayload['payload'];

          const { getByTestId, queryByTestId } = setup({
            payload: payloadWithSmallIntensity,
          });

          expect(getByTestId(onTargetLabel)).toBeInTheDocument();
          expect(queryByTestId(offTargetLabel)).toBeNull();
        });
      });

      describe('when the actual intensity emission is the same as the target', () => {
        it('should render on target label', () => {
          const intensityEmissionSameAsTarget = {
            dataKey: CarbonIntensityChartKey.ACTUAL_INTENSITIES,
            payload: {
              year: 2019,
              [CarbonIntensityChartKey.ACTUAL_INTENSITIES]:
                intensityTargetEmission.payload[
                  CarbonIntensityChartKey.TARGET_INTENSITIES
                ],
            },
          };

          const payloadWithSmallIntensity = ([
            intensityEmissionSameAsTarget,
            intensityTargetEmission,
          ] as unknown) as TooltipPayload['payload'];

          const { getByTestId, queryByTestId } = setup({
            payload: payloadWithSmallIntensity,
          });

          expect(getByTestId(onTargetLabel)).toBeInTheDocument();
          expect(queryByTestId(offTargetLabel)).toBeNull();
        });
      });
    });

    describe('when payload does not contain target intensity emission', () => {
      it('should not render target intensity label', () => {
        const { queryByTestId } = setup({ payload });
        expect(queryByTestId(selectors.targetLabel)).not.toBeInTheDocument();
      });
    });

    describe('when payload does not contain iea intensity emission', () => {
      it('should not render iea intensity label', () => {
        const { queryByTestId } = setup({ payload });
        expect(queryByTestId(selectors.ieaMaxLabel)).not.toBeInTheDocument();
        expect(queryByTestId(selectors.ieaMinLabel)).not.toBeInTheDocument();
      });
    });
  });

  describe('when payload contains intensity target emissions', () => {
    const payload = ([
      intensityTargetEmission,
    ] as unknown) as TooltipPayload['payload'];

    it('should render intensity target emissions', () => {
      const { getByTestId } = setup({ payload });

      expect(getByTestId(selectors.targetLabel)).toHaveTextContent(
        `${
          payload[0].payload[CarbonIntensityChartKey.TARGET_INTENSITIES]
        } tCO2e`
      );
    });

    describe('when payload does not contain actual intensity emission', () => {
      it('should not render actual intensity label', () => {
        const { queryByTestId } = setup({ payload });
        expect(
          queryByTestId(selectors.actualIntensityLabel)
        ).not.toBeInTheDocument();
      });
    });

    describe('when payload does not contain iea intensity emission', () => {
      it('should not render iea intensity label', () => {
        const { queryByTestId } = setup({ payload });
        expect(queryByTestId(selectors.ieaMaxLabel)).not.toBeInTheDocument();
        expect(queryByTestId(selectors.ieaMinLabel)).not.toBeInTheDocument();
      });
    });
  });

  describe('when payload contains intensity iea emissions', () => {
    const payload = ([
      ieaEmissionRange,
    ] as unknown) as TooltipPayload['payload'];

    it('should render intensity target emissions', () => {
      const { getByTestId } = setup({ payload });

      expect(getByTestId(selectors.ieaMinLabel)).toHaveTextContent(
        'min:51 tCO2e'
      );

      expect(getByTestId(selectors.ieaMaxLabel)).toHaveTextContent(
        `max:100 tCO2e`
      );
    });

    describe('when payload does not contain actual intensity emission', () => {
      it('should not render actual intensity label', () => {
        const { queryByTestId } = setup({ payload });
        expect(
          queryByTestId(selectors.actualIntensityLabel)
        ).not.toBeInTheDocument();
      });
    });

    describe('when payload does not contain target intensity emission', () => {
      it('should not render target intensity label', () => {
        const { queryByTestId } = setup({ payload });
        expect(queryByTestId(selectors.targetLabel)).not.toBeInTheDocument();
      });
    });
  });

  describe('year label', () => {
    const payload = ([
      intensityEmission,
      intensityTargetEmission,
    ] as unknown) as TooltipPayload['payload'];

    it('should render a year', () => {
      const { getByTestId } = setup({ payload });

      expect(getByTestId(selectors.yearLabel)).toHaveTextContent(
        payload[0].payload.year.toString()
      );
    });

    describe('when year is the same as baseline year', () => {
      it('should render baseline year label', () => {
        const { getByTestId } = setup({
          payload,
          baselineYear: intensityEmission.payload.year,
        });

        expect(getByTestId(selectors.yearLabel)).toHaveTextContent(
          `${intensityEmission.payload.year} - Baseline year`
        );
      });
    });

    describe('when year is NOT the same as baseline year', () => {
      it('should NOT render baseline year label', () => {
        const { queryByText } = setup({
          payload,
          baselineYear: intensityEmission.payload.year + 1,
        });

        expect(queryByText('Baseline year')).not.toBeInTheDocument();
      });
    });
  });
});
