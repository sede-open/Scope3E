import { fireEvent, render, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';

import * as IEACSelectors from 'components/IEARangeInfo/selectors';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';

import emissionsOverviewChartNamespace from '../../../locales/en/emissionsOverviewChart.json';

import { Legend, IProps } from './Legend';

const setup = (overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    shouldShowGrossEmissions: false,
    ...overrides,
  };

  return render(
    <I18nProvider
      namespaces={{
        emissionsOverviewChart: emissionsOverviewChartNamespace,
      }}
    >
      <ModalProvider>
        <Legend {...props} />
      </ModalProvider>
    </I18nProvider>
  );
};

describe('Legend', () => {
  it('should render target legend', () => {
    const { getByText } = setup();
    expect(
      getByText(emissionsOverviewChartNamespace['legend-label-target-data'])
    ).toBeInTheDocument();
  });

  it('should render iea legend', () => {
    const { getByText } = setup();
    expect(
      getByText(emissionsOverviewChartNamespace['legend-label-iea'])
    ).toBeInTheDocument();
  });

  it('should render net emissions legend', () => {
    const { getByText } = setup();
    expect(
      getByText(emissionsOverviewChartNamespace['legend-label-net-emission'])
    ).toBeInTheDocument();
  });

  it('should NOT render gross emissions legend by default', () => {
    const { queryByText } = setup();
    expect(
      queryByText(
        emissionsOverviewChartNamespace['legend-label-gross-emission']
      )
    ).not.toBeInTheDocument();
  });

  describe('when prop shouldShowGrossEmissions === true', () => {
    it('should render gross emissions legend', () => {
      const { getByText } = setup({ shouldShowGrossEmissions: true });
      expect(
        getByText(
          emissionsOverviewChartNamespace['legend-label-gross-emission']
        )
      ).toBeInTheDocument();
    });
  });

  describe('when iea legend is clicked', () => {
    it('should open Iamc modal', async () => {
      const { getByText, getByTestId, queryByTestId } = setup();

      expect(
        queryByTestId(IEACSelectors.modalContainer)
      ).not.toBeInTheDocument();

      const ieaLegend = getByText(
        emissionsOverviewChartNamespace['legend-label-iea']
      );

      fireEvent.click(ieaLegend);

      await waitFor(() => {
        expect(getByTestId(IEACSelectors.modalContainer)).toBeInTheDocument();
      });
    });
  });
});
