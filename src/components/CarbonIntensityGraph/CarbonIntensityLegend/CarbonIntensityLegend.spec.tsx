import { fireEvent, render, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';

import * as IEASelectors from 'components/IEARangeInfo/selectors';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';

import carbonIntensityNamespace from '../../../../locales/en/carbonIntensity.json';

import { CarbonIntensityLegend } from '.';

const setup = () =>
  render(
    <I18nProvider
      namespaces={{
        carbonIntensity: carbonIntensityNamespace,
      }}
    >
      <ModalProvider>
        <CarbonIntensityLegend />
      </ModalProvider>
    </I18nProvider>
  );

describe('CarbonIntensityLegend', () => {
  describe('when iea legend is clicked', () => {
    it('should open IEA popup', async () => {
      const { getByText, getByTestId, queryByTestId } = setup();

      expect(
        queryByTestId(IEASelectors.modalContainer)
      ).not.toBeInTheDocument();

      const ieaLegend = getByText('≤2°C Scenarios');

      fireEvent.click(ieaLegend);

      await waitFor(() => {
        expect(getByTestId(IEASelectors.modalContainer)).toBeInTheDocument();
      });
    });
  });
});
