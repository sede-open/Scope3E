import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { carbonIntensityConfig } from 'mocks/carbonIntensity';

import { CarbonIntensityConfigContext } from './CarbonIntensityConfigContext';
import {
  CarbonIntensityConfigProvider,
  CARBON_INTENSITY_CONFIG_QUERY,
} from './CarbonIntensityConfigProvider';

describe('CarbonIntensityConfigProvider', () => {
  it('should render config values if they have been fetched', async () => {
    const mocks = [
      {
        request: { query: CARBON_INTENSITY_CONFIG_QUERY },
        result: {
          data: {
            carbonIntensityConfig,
          },
          errors: undefined,
        },
      },
    ];

    const dataTestId = 'config-item';
    const { queryAllByTestId } = render(
      <MockedProvider mocks={mocks}>
        <CarbonIntensityConfigProvider>
          <CarbonIntensityConfigContext.Consumer>
            {(values) => (
              <>
                {values.map((configItem) => (
                  <div key={configItem.type} data-testid={dataTestId}>
                    {configItem.type}
                  </div>
                ))}
              </>
            )}
          </CarbonIntensityConfigContext.Consumer>
        </CarbonIntensityConfigProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryAllByTestId(dataTestId)).toHaveLength(
        carbonIntensityConfig.length
      );
    });
  });
});
