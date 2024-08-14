import { render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import scope3DashboardNamespace from '../../../../../locales/en/scope3Dashboard.json';

import { Legend } from './Legend';

const setup = () =>
  render(
    <I18nProvider
      namespaces={{
        scope3Dashboard: scope3DashboardNamespace,
      }}
    >
      <Legend />)
    </I18nProvider>
  );

describe('Legend', () => {
  it('should display "Unallocated"', () => {
    const { getByText } = setup();

    // assert visibility
    expect(
      getByText(scope3DashboardNamespace['pie-chart-legend-unallocated'])
    ).toBeVisible();
  });

  it('should display "Allocated"', () => {
    const { getByText } = setup();

    // assert visibility
    expect(
      getByText(scope3DashboardNamespace['pie-chart-legend-allocated'])
    ).toBeVisible();
  });
});
