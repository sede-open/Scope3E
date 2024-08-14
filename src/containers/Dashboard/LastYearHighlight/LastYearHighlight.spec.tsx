import { act, fireEvent, render, within } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { MockedProvider } from '@apollo/client/testing';

import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { AlizarinCrimson, FunGreen, Scorpion } from 'styles/colours';
import * as corporateEmissionFormSelectors from 'containers/Modals/CorporateEmissionForm/selectors';
import { ModalContentType } from 'containers/types';
import * as meMocks from 'mocks/me';
import * as emissionPathOptionUserButton from 'components/EmissionPathCards/selectors';
import * as emissionPathSelectSelectors from 'containers/Modals/EmissionPathSelect/selectors';

import commonNamespace from '../../../../locales/en/common.json';
import dashboardNamespace from '../../../../locales/en/dashboard.json';

import { LastYearHighlight, IProps } from '.';
import * as selectors from './selectors';

const lastYear = new Date().getFullYear() - 1;

const setup = (
  overrides: Partial<IProps> = {},
  mocks: any[] = [meMocks.getGetMeMock()]
) => {
  const props = {
    lastYearEmission: undefined,
    historicEmission: undefined,
    lastYear,
    setEmissionModal: jest.fn(),
    selectEmissionYear: jest.fn(),
    ...overrides,
  };
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <I18nProvider
        namespaces={{
          common: commonNamespace,
          dashboard: dashboardNamespace,
        }}
      >
        <AuthenticatedUserProvider>
          <ModalProvider>
            <LastYearHighlight {...props} />
          </ModalProvider>
        </AuthenticatedUserProvider>
      </I18nProvider>
    </MockedProvider>
  );
};

describe('LastYearHighlight', () => {
  it('should render "-" when emission for last year does not exist', async () => {
    const { findByTestId } = setup();
    expect(await findByTestId(selectors.lastYearEmission)).toHaveTextContent(
      '-'
    );
  });

  it('should render emission in tCO2e when it is less than 1,000,000,000', async () => {
    const lastYearEmission = ({
      year: lastYear,
      scope1: 250000,
      scope2: 250000,
      scope3: undefined,
      offset: 10000,
    } as unknown) as Emission;

    const { findByTestId } = setup({
      lastYearEmission,
    });
    expect(await findByTestId(selectors.lastYearEmission)).toHaveTextContent(
      '490,000'
    );
    expect(await findByTestId(selectors.lastYearEmission)).toHaveTextContent(
      'tCO2e'
    );
  });

  it('should render emission in K tCO2e when it is equal to 10,000,000', async () => {
    const lastYearEmission = ({
      year: lastYear,
      scope1: 10000000,
      scope2: 0,
      scope3: 0,
      offset: undefined,
    } as unknown) as Emission;

    const { findByTestId } = setup({
      lastYearEmission,
    });
    expect(await findByTestId(selectors.lastYearEmission)).toHaveTextContent(
      '10,000'
    );
    expect(await findByTestId(selectors.lastYearEmission)).toHaveTextContent(
      'k tCO2e'
    );
  });

  it('should render emission in K tCO2e when it is more to 10,000,000', async () => {
    const lastYearEmission = ({
      year: lastYear,
      scope1: 10000000,
      scope2: 10006500,
      scope3: 0,
      offset: undefined,
    } as unknown) as Emission;

    const { findByTestId } = setup({
      lastYearEmission,
    });
    expect(await findByTestId(selectors.lastYearEmission)).toHaveTextContent(
      '20,007'
    );
    expect(await findByTestId(selectors.lastYearEmission)).toHaveTextContent(
      'k tCO2e'
    );
  });

  it('should not display button for users with no canEditSupplyDashboard permission - emission', () => {
    const lastYearEmission = ({
      year: lastYear,
      scope1: 10000000,
      scope2: 10006500,
      scope3: 0,
      offset: undefined,
    } as unknown) as Emission;

    const { queryByTestId } = setup(
      {
        lastYearEmission,
      },
      [meMocks.getGetMeMock({ canEditSupplyDashboard: false })]
    );

    expect(queryByTestId(selectors.lastYearAddButton)).not.toBeInTheDocument();
  });

  it('should not display add button for users with no canEditSupplyDashboard permission - no emission', () => {
    const { queryByTestId } = setup(
      {
        lastYearEmission: undefined,
      },
      [meMocks.getGetMeMock({ canEditSupplyDashboard: false })]
    );
    expect(queryByTestId(selectors.lastYearAddButton)).not.toBeInTheDocument();
  });

  it('should not display emission percentage change if baseline and historic actual emissions do not exist', () => {
    const { queryByTestId } = setup({
      lastYearEmission: undefined,
      historicEmission: undefined,
    });

    expect(queryByTestId(selectors.highlightChange)).not.toBeInTheDocument();
  });

  it('should display the correct historic year', async () => {
    const historicEmission = ({
      year: 2015,
      scope1: 200000,
      scope2: 200000,
      scope3: 200000,
      offset: undefined,
    } as unknown) as Emission;

    const lastYearEmission = ({
      year: lastYear,
      scope1: 100000,
      scope2: 100000,
      scope3: 100000,
      offset: undefined,
    } as unknown) as Emission;

    const { findByTestId } = setup({
      lastYearEmission,
      historicEmission,
    });

    expect(await findByTestId(selectors.highlightYear)).toHaveTextContent(
      '2015'
    );
    expect(await findByTestId(selectors.highlightYear)).toHaveStyle(
      `color: ${Scorpion}`
    );
  });

  it('should display decreased emission percentage change message if last year emissions are less than historic emissions', async () => {
    const historicEmission = ({
      year: 2015,
      scope1: 200000,
      scope2: 200000,
      scope3: 200000,
      offset: undefined,
    } as unknown) as Emission;

    const lastYearEmission = ({
      year: lastYear,
      scope1: 100000,
      scope2: 100000,
      scope3: 100000,
      offset: undefined,
    } as unknown) as Emission;

    const { findByTestId } = setup({
      lastYearEmission,
      historicEmission,
    });

    expect(await findByTestId(selectors.highlightChange)).toBeInTheDocument();
    expect(await findByTestId(selectors.highlightDecrease)).toBeInTheDocument();

    expect(await findByTestId(selectors.highlightDecrease)).toHaveTextContent(
      '50%'
    );
    expect(await findByTestId(selectors.highlightDecrease)).toHaveTextContent(
      'decrease'
    );
    expect(await findByTestId(selectors.highlightDecrease)).toHaveStyle(
      `color: ${FunGreen}`
    );
  });

  it('should display increased emission percentage change message if last year emissions are greater than historic emissions', async () => {
    const historicEmission = ({
      year: 2015,
      scope1: 100000,
      scope2: 100000,
      scope3: 100000,
      offset: undefined,
    } as unknown) as Emission;

    const lastYearEmission = ({
      year: lastYear,
      scope1: 150000,
      scope2: 150000,
      scope3: 150000,
      offset: undefined,
    } as unknown) as Emission;

    const { findByTestId } = setup({
      lastYearEmission,
      historicEmission,
    });

    expect(await findByTestId(selectors.highlightIncrease)).toBeInTheDocument();

    expect(await findByTestId(selectors.highlightIncrease)).toHaveTextContent(
      '50%'
    );
    expect(await findByTestId(selectors.highlightIncrease)).toHaveTextContent(
      'increase'
    );
    expect(await findByTestId(selectors.highlightIncrease)).toHaveStyle(
      `color: ${AlizarinCrimson}`
    );
  });

  it('should display zero decrease in percentage change if last year emissions are equal to historic emissions', async () => {
    const historicEmission = ({
      year: 2015,
      scope1: 100000,
      scope2: 100000,
      scope3: 100000,
      offset: undefined,
    } as unknown) as Emission;

    const lastYearEmission = ({
      year: lastYear,
      scope1: 100000,
      scope2: 100000,
      scope3: 100000,
      offset: undefined,
    } as unknown) as Emission;

    const { findByTestId } = setup({
      lastYearEmission,
      historicEmission,
    });

    expect(await findByTestId(selectors.highlightDecrease)).toHaveTextContent(
      '0%'
    );
    expect(await findByTestId(selectors.highlightDecrease)).toHaveTextContent(
      'decrease'
    );
    expect(await findByTestId(selectors.highlightDecrease)).toHaveStyle(
      `color: ${AlizarinCrimson}`
    );
  });

  describe('when the Add emission button is clicked', () => {
    it('should launch the add new emission modal flow with last year pre-selected', async () => {
      const { findByTestId } = setup();

      await act(async () => {
        fireEvent.click(await findByTestId(selectors.lastYearAddButton));
      });

      const emissionFlowOptionModel = await findByTestId(
        emissionPathSelectSelectors.container
      );
      expect(emissionFlowOptionModel).toBeInTheDocument();
      act(() => {
        fireEvent.click(emissionFlowOptionModel);
      });

      const experiencedUserBtn = await findByTestId(
        emissionPathOptionUserButton.experiencedUserButton
      );

      expect(experiencedUserBtn).toBeInTheDocument();
      act(() => {
        fireEvent.click(experiencedUserBtn);
      });

      const emissionFormModal = await findByTestId(
        corporateEmissionFormSelectors.getEmissionFormTestId(
          ModalContentType.NEW_ACTUAL
        )
      );
      expect(emissionFormModal).toBeInTheDocument();

      expect(
        await within(emissionFormModal).findByText(lastYear.toString())
      ).toBeTruthy();
    });
  });
});
