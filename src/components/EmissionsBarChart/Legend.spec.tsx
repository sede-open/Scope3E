import { render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import emissionsOverviewChartNamespace from '../../../locales/en/emissionsOverviewChart.json';

import { Legend, IProps } from './Legend';

const setup = (overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    shouldShowTotalAmbition: false,
    isScope3TargetFormData: false,
    isEmissionOffsetData: false,
    isScope1And2TargetFormData: false,
    ...overrides,
  };

  return render(
    <I18nProvider
      namespaces={{
        emissionsOverviewChart: emissionsOverviewChartNamespace,
      }}
    >
      <Legend {...props} />)
    </I18nProvider>
  );
};

describe('Legend', () => {
  it('should display "Scope1"', () => {
    const { getByTestId } = setup();

    // assert visibility
    expect(
      getByTestId(emissionsOverviewChartNamespace['bar-chart-legend-scope1'])
    ).toBeInTheDocument();
  });

  it('should display "Scope2"', () => {
    const { getByTestId } = setup();

    // assert visibility
    expect(
      getByTestId(emissionsOverviewChartNamespace['bar-chart-legend-scope2'])
    ).toBeInTheDocument();
  });

  it('should display "Scope3"', () => {
    const { getByTestId } = setup();

    // assert visibility
    expect(
      getByTestId(emissionsOverviewChartNamespace['bar-chart-legend-scope3'])
    ).toBeInTheDocument();
  });

  describe('when emissions offset data has NOT been entered', () => {
    it('should not display "Offsets', () => {
      const { queryByTestId } = setup({ isEmissionOffsetData: false });

      // assert no visibility
      expect(
        queryByTestId(
          emissionsOverviewChartNamespace['bar-chart-legend-offsets']
        )
      ).not.toBeInTheDocument();
    });
  });

  describe('when emissions offset data has been entered', () => {
    it('should display "Offsets"', () => {
      const { getByTestId } = setup({ isEmissionOffsetData: true });

      // assert visibility
      expect(
        getByTestId(emissionsOverviewChartNamespace['bar-chart-legend-offsets'])
      ).toBeInTheDocument();
    });
  });

  describe('when no target form data has been entered', () => {
    it('should display emission form legend items only', () => {
      const { getByTestId, queryByTestId } = setup({
        shouldShowTotalAmbition: false,
        isScope1And2TargetFormData: false,
        isScope3TargetFormData: false,
      });

      // assert no visibility
      expect(
        queryByTestId(
          emissionsOverviewChartNamespace[
            'bar-chart-legend-scope1-and-2-target-emission'
          ]
        )
      ).not.toBeInTheDocument();
      expect(
        queryByTestId(
          emissionsOverviewChartNamespace[
            'bar-chart-legend-scope3-target-emission'
          ]
        )
      ).not.toBeInTheDocument();

      // assert visibility
      expect(
        getByTestId(emissionsOverviewChartNamespace['bar-chart-legend-scope1'])
      ).toBeInTheDocument();
      expect(
        getByTestId(emissionsOverviewChartNamespace['bar-chart-legend-scope2'])
      ).toBeInTheDocument();
      expect(
        getByTestId(emissionsOverviewChartNamespace['bar-chart-legend-scope3'])
      ).toBeInTheDocument();
    });
  });

  describe('when no target offset included and scope 1, 2, 3 target form data entered', () => {
    it('should display "Scope1 & 2 ambition" and "Scope3 ambition"', () => {
      const { getByTestId, queryByTestId } = setup({
        shouldShowTotalAmbition: false,
        isScope1And2TargetFormData: true,
        isScope3TargetFormData: true,
      });

      // assert visibility
      expect(
        getByTestId(
          emissionsOverviewChartNamespace[
            'bar-chart-legend-scope1-and-2-target-emission'
          ]
        )
      ).toBeInTheDocument();
      expect(
        getByTestId(
          emissionsOverviewChartNamespace[
            'bar-chart-legend-scope3-target-emission'
          ]
        )
      ).toBeInTheDocument();

      // assert no visibility
      expect(
        queryByTestId(
          emissionsOverviewChartNamespace['bar-chart-legend-your-ambition']
        )
      ).not.toBeInTheDocument();
    });
  });

  describe('when scope1&2 target form data, but no target offset included and scope 3 target form data NOT entered', () => {
    it('should display "Your ambition" and not "Scope3 ambition"', () => {
      const { getByTestId, queryByTestId } = setup({
        shouldShowTotalAmbition: false,
        isScope1And2TargetFormData: true,
        isScope3TargetFormData: false,
      });

      // assert visibility
      expect(
        getByTestId(
          emissionsOverviewChartNamespace['bar-chart-legend-your-ambition']
        )
      ).toBeInTheDocument();

      // assert no visibility
      expect(
        queryByTestId(
          emissionsOverviewChartNamespace[
            'bar-chart-legend-scope1-and-2-target-emission'
          ]
        )
      ).not.toBeInTheDocument();
      expect(
        queryByTestId(
          emissionsOverviewChartNamespace[
            'bar-chart-legend-scope3-target-emission'
          ]
        )
      ).not.toBeInTheDocument();
    });
  });

  describe('when target offset included and scope 1, 2, 3 target form data entered', () => {
    it('should display "Your ambition" but not "Scope1 & 2 ambition" or "Scope3 ambition"', () => {
      const { getByTestId, queryByTestId } = setup({
        shouldShowTotalAmbition: true,
        isScope1And2TargetFormData: true,
        isScope3TargetFormData: true,
      });

      // assert visibility
      expect(
        getByTestId(
          emissionsOverviewChartNamespace['bar-chart-legend-your-ambition']
        )
      ).toBeInTheDocument();

      // assert no visibility
      expect(
        queryByTestId(
          emissionsOverviewChartNamespace[
            'bar-chart-legend-scope1-and-2-target-emission'
          ]
        )
      ).not.toBeInTheDocument();

      expect(
        queryByTestId(
          emissionsOverviewChartNamespace[
            'bar-chart-legend-scope3-target-emission'
          ]
        )
      ).not.toBeInTheDocument();
    });
  });

  describe('when target offset included and scope 3 target form data has NOT been entered', () => {
    it('should display "Your ambition" but not "Scope1 & 2 ambition" or "Scope3 ambition"', () => {
      const { getByTestId, queryByTestId } = setup({
        shouldShowTotalAmbition: true,
        isScope1And2TargetFormData: true,
        isScope3TargetFormData: false,
      });

      // assert visibility
      expect(
        getByTestId(
          emissionsOverviewChartNamespace['bar-chart-legend-your-ambition']
        )
      ).toBeInTheDocument();

      // assert no visibility
      expect(
        queryByTestId(
          emissionsOverviewChartNamespace[
            'bar-chart-legend-scope1-and-2-target-emission'
          ]
        )
      ).not.toBeInTheDocument();

      expect(
        queryByTestId(
          emissionsOverviewChartNamespace[
            'bar-chart-legend-scope3-target-emission'
          ]
        )
      ).not.toBeInTheDocument();
    });
  });

  describe('when scope1&2 target form data, but target offset not included and no scope 3 target form data', () => {
    it('should display "Your ambition" but not "Scope1 & 2 ambition" or "Scope3 ambition"', () => {
      const { getByTestId, queryByTestId } = setup({
        shouldShowTotalAmbition: false,
        isScope3TargetFormData: false,
        isScope1And2TargetFormData: true,
      });

      // assert visibility
      expect(
        getByTestId(
          emissionsOverviewChartNamespace['bar-chart-legend-your-ambition']
        )
      ).toBeInTheDocument();

      // assert no visibility
      expect(
        queryByTestId(
          emissionsOverviewChartNamespace[
            'bar-chart-legend-scope1-and-2-target-emission'
          ]
        )
      ).not.toBeInTheDocument();

      expect(
        queryByTestId(
          emissionsOverviewChartNamespace[
            'bar-chart-legend-scope3-target-emission'
          ]
        )
      ).not.toBeInTheDocument();
    });
  });
});
