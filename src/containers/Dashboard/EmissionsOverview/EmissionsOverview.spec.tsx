import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import * as meMocks from 'mocks/me';

import * as barChartSelectors from '../../../components/EmissionsBarChart/selectors';
import * as composedChartSelectors from '../../../components/EmissionsComposedChart/selectors';
import * as overviewSelectors from './selectors';
import { EmissionsOverview, IProps } from '.';

const setup = (overrides: Partial<IProps> = {}, mocks: any) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthenticatedUserProvider>
        <ModalProvider>
          <EmissionsOverview
            selectMoreOption={jest.fn()}
            emissions={[]}
            loading={false}
            {...overrides}
          />
        </ModalProvider>
      </AuthenticatedUserProvider>
    </MockedProvider>
  );

describe('EmissionsOverview', () => {
  it('should NOT display create/edit buttons when user does not have canEditSupplyDashboard permission', async () => {
    const { queryByTestId } = setup({}, [
      meMocks.getGetMeMock({ canEditSupplyDashboard: false }),
    ]);

    await waitFor(() => {
      expect(
        queryByTestId(overviewSelectors.dashboardEmissionActions)
      ).toBeNull();
    });
  });

  it('should display create/edit buttons when user has canEditSupplyDashboard permission', async () => {
    const { findByTestId } = setup({}, [
      meMocks.getGetMeMock({ canEditSupplyDashboard: true }),
    ]);

    expect(
      await findByTestId(overviewSelectors.dashboardEmissionActions)
    ).toBeInTheDocument();
  });

  it('should display toggle graph buttons when user has canViewSupplyDashboard permission', async () => {
    const { findByTestId } = setup({}, [
      meMocks.getGetMeMock({ canEditSupplyDashboard: true }),
    ]);

    expect(
      await findByTestId(overviewSelectors.toggleComposedChartBtn)
    ).toBeInTheDocument();
    expect(
      await findByTestId(overviewSelectors.toggleBarChartBtn)
    ).toBeInTheDocument();
  });

  it('should display toggle graph buttons when user has canEditSupplyDashboard permission', async () => {
    const { findByTestId } = setup({}, [
      meMocks.getGetMeMock({ canEditSupplyDashboard: true }),
    ]);

    expect(
      await findByTestId(overviewSelectors.toggleComposedChartBtn)
    ).toBeInTheDocument();
    expect(
      await findByTestId(overviewSelectors.toggleBarChartBtn)
    ).toBeInTheDocument();
  });

  it('should not display overview graph if loading === true', async () => {
    const { queryByTestId } = setup({ loading: true }, [
      meMocks.getGetMeMock({ canEditSupplyDashboard: true }),
    ]);

    await waitFor(() => {
      expect(
        queryByTestId(composedChartSelectors.emissionsComposedChart)
      ).not.toBeInTheDocument();
    });
  });

  it('should display Composed Chart graph as default for Emissions Overview', async () => {
    const { findByTestId, queryByTestId } = setup({}, [
      meMocks.getGetMeMock({ canEditSupplyDashboard: true }),
    ]);

    expect(queryByTestId(barChartSelectors.barChart)).not.toBeInTheDocument();
    expect(
      await findByTestId(composedChartSelectors.emissionsComposedChart)
    ).toBeInTheDocument();
  });

  it('when Bar Chart btn is clicked and currently in Composed Chart view, chart should toggle to Bar Chart', async () => {
    const { findByTestId, queryByTestId } = setup({}, [
      meMocks.getGetMeMock({ canEditSupplyDashboard: true }),
    ]);

    // default chart view
    expect(
      await findByTestId(composedChartSelectors.emissionsComposedChart)
    ).toBeInTheDocument();
    expect(queryByTestId(barChartSelectors.barChart)).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(await findByTestId(overviewSelectors.toggleBarChartBtn));
    });

    expect(await findByTestId(barChartSelectors.barChart)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        queryByTestId(composedChartSelectors.emissionsComposedChart)
      ).not.toBeInTheDocument();
    });
  });

  it('when Composed Chart btn is clicked and currently in Bar Chart view, chart should toggle to Composed Chart', async () => {
    const { findByTestId, queryByTestId } = setup({}, [
      meMocks.getGetMeMock({ canEditSupplyDashboard: true }),
    ]);

    // default chart view
    expect(
      await findByTestId(composedChartSelectors.emissionsComposedChart)
    ).toBeInTheDocument();

    expect(queryByTestId(barChartSelectors.barChart)).not.toBeInTheDocument();

    // toggle to bar chart view
    await act(async () => {
      fireEvent.click(await findByTestId(overviewSelectors.toggleBarChartBtn));
    });

    expect(await findByTestId(barChartSelectors.barChart)).toBeInTheDocument();

    // toggle back to composed chart view
    await act(async () => {
      fireEvent.click(
        await findByTestId(overviewSelectors.toggleComposedChartBtn)
      );
    });

    expect(
      await findByTestId(composedChartSelectors.emissionsComposedChart)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByTestId(barChartSelectors.barChart)).not.toBeInTheDocument();
    });
  });
});
