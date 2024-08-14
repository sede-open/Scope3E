import { act, fireEvent, render, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';
import { MockedProvider } from '@apollo/client/testing';

import { CorporateEmissionType } from 'types/globalTypes';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import * as analyticsEvents from 'utils/analytics';
import { ElectricityLocationGridNames } from 'utils/electricityGrid';
import * as controlSelectors from 'components/Wizard/WizardControls/selectors';
import {
  INEXPERIENCED_FLOW_BACK,
  INEXPERIENCED_FLOW_CANCEL,
  INEXPERIENCED_FLOW_NEXT,
} from 'utils/analyticsEvents';
import * as meMocks from 'mocks/me';
import { companySectorsPrimarySectorName } from 'utils/companySectors';

import inexperiencedUserFlowNamespace from '../../../../../../locales/en/inexperiencedFlow.json';
import commonNamespace from '../../../../../../locales/en/common.json';
import locationsNamespace from '../../../../../../locales/en/locations.json';
import formNamespace from '../../../../../../locales/en/form.json';
import { HUNDRED_MILLION, ONE_BILLION } from '../../../../../constants';
import { getInitialWizardState } from '../../utils';
import * as selectors from '../../selectors';
import {
  ElectricityGridTypes,
  InexperiencedFlowSteps,
  SCOPE2_SOURCES_FORM_FIELD_KEYS as FIELD_KEYS,
  SCOPE2_SOURCE_FIELD_KEYS as ROW_FIELD_KEYS,
} from '../../types';
import { ElectricityForm, IProps } from '.';

const setup = (overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    emissionType: CorporateEmissionType.BASELINE,
    closeModal: jest.fn(),
    onBack: jest.fn(),
    onNext: jest.fn(),
    wizardState: getInitialWizardState(),
    ...overrides,
  };

  return render(
    <I18nProvider
      namespaces={{
        inexperiencedFlow: inexperiencedUserFlowNamespace,
        common: commonNamespace,
        locations: locationsNamespace,
        form: formNamespace,
      }}
    >
      <MockedProvider mocks={[meMocks.getGetMeMock()]} addTypename={false}>
        <AuthenticatedUserProvider>
          <ElectricityForm {...props} />
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );
};

const locationRow = {
  [ROW_FIELD_KEYS.GRID_FACTOR_TYPE]: {
    label: 'By country',
    value: ElectricityGridTypes.LOCATION,
  },
  [ROW_FIELD_KEYS.AMOUNT]: 1_000,
  [ROW_FIELD_KEYS.GRID_LOCATION]: {
    label: 'Lithuania',
    value: ElectricityLocationGridNames.LITHUANIA,
  },
  [ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR]: '',
};

const customGridRow = {
  [ROW_FIELD_KEYS.GRID_FACTOR_TYPE]: {
    label: 'Custom value in kg CO2e/kWh',
    value: ElectricityGridTypes.CUSTOM,
  },
  [ROW_FIELD_KEYS.AMOUNT]: 10_000,
  [ROW_FIELD_KEYS.GRID_LOCATION]: null,
  [ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR]: 0.65,
};

const wizardStateWithExistingValues = {
  ...getInitialWizardState(),
  electricitySources: [locationRow, customGridRow],
};

describe('ElectricityForm', () => {
  it('should render one emission row by default', async () => {
    const { findAllByTestId } = setup();

    expect(await findAllByTestId(selectors.electricityFieldRow)).toHaveLength(
      1
    );
  });

  it('should NOT display a form error for amount on initial load', async () => {
    const { findAllByTestId, queryByTestId } = setup();

    expect(await findAllByTestId(selectors.electricityFieldRow)).toHaveLength(
      1
    );

    await waitFor(() => {
      expect(queryByTestId(`${selectors.sourceAmount}-error`)).toBeNull();
    });
  });

  it('should not render delete button next to the first row', async () => {
    const { queryByTestId } = setup();

    await waitFor(() =>
      expect(queryByTestId(selectors.deleteSource)).toBeNull()
    );
  });

  it('should display 0 as total emissions by default', async () => {
    const { findByTestId } = setup();

    expect(await findByTestId(selectors.totalEmissions)).toHaveTextContent(
      '0 tCO2e'
    );
  });

  describe('when a custom grid factor type is selected', () => {
    it('should render a custom grid factor input', async () => {
      const { findByTestId, queryByTestId } = setup({
        wizardState: {
          ...getInitialWizardState(),
          electricitySources: [customGridRow],
        },
      });

      expect(
        await findByTestId(selectors.sourceCustomGridFactor)
      ).toBeInTheDocument();
      expect(queryByTestId(selectors.sourceGridLocation)).toBeNull();
    });
  });

  describe('when a location grid factor type is selected', () => {
    it('should render a location select', async () => {
      const { findByTestId, queryByTestId } = setup({
        wizardState: {
          ...getInitialWizardState(),
          electricitySources: [locationRow],
        },
      });

      expect(
        await findByTestId(selectors.sourceGridLocation)
      ).toBeInTheDocument();
      expect(queryByTestId(selectors.sourceCustomGridFactor)).toBeNull();
    });
  });

  describe('when add more options button is clicked', () => {
    it('should add a new row', async () => {
      const { getByTestId, findAllByTestId } = setup();

      expect(await findAllByTestId(selectors.electricityFieldRow)).toHaveLength(
        1
      );

      fireEvent.click(getByTestId(selectors.addMoreRows));

      expect(await findAllByTestId(selectors.electricityFieldRow)).toHaveLength(
        2
      );
    });
  });

  describe('when multiple rows exist', () => {
    describe('when delete button is clicked', () => {
      it('should remove that row', async () => {
        const { getByTestId, findByTestId, findAllByTestId } = setup();

        fireEvent.click(await findByTestId(selectors.addMoreRows));

        expect(
          await findAllByTestId(selectors.electricityFieldRow)
        ).toHaveLength(2);

        fireEvent.click(getByTestId(selectors.deleteSource));

        expect(
          await findAllByTestId(selectors.electricityFieldRow)
        ).toHaveLength(1);
      });
    });
  });

  describe('when electricity values already exist', () => {
    it('should render field rows with those values', async () => {
      const { getAllByTestId, findAllByTestId, getByText } = setup({
        wizardState: wizardStateWithExistingValues,
      });

      expect(await findAllByTestId(selectors.electricityFieldRow)).toHaveLength(
        2
      );

      expect(getByText('By country')).toBeInTheDocument();
      expect(getByText('Lithuania')).toBeInTheDocument();
      expect(getByText('Custom value in kg CO2e/kWh')).toBeInTheDocument();

      const amountInputs = getAllByTestId(selectors.sourceAmount);
      expect((amountInputs[0] as HTMLInputElement).value).toBe('1,000');
      expect((amountInputs[1] as HTMLInputElement).value).toBe('10,000');
    });

    it('should display the total emissions for the selected fuels', async () => {
      const { findByTestId } = setup({
        wizardState: wizardStateWithExistingValues,
      });

      // Custom = 0.65 * 10_000 / 1_000 = 6.5
      // Lithuania = 0.18121454378 * 1_000 / 1_000 = 0.1812145438
      // Total = 6.6812145438

      expect(await findByTestId(selectors.totalEmissions)).toHaveTextContent(
        '6.68 tCO2e'
      );
    });
  });

  it('should only allow user to select a grid location once', async () => {
    const {
      findByLabelText,
      getByTestId,
      findAllByText,
      queryAllByText,
    } = setup();

    await waitFor(() => expect(queryAllByText('Lithuania')).toHaveLength(0));

    const firstRowInput = await findByLabelText(
      `${FIELD_KEYS.EMISSION_SOURCES}[0].${ROW_FIELD_KEYS.GRID_LOCATION}`
    );
    await selectEvent.openMenu(firstRowInput);

    expect(await findAllByText('Lithuania')).toHaveLength(1);

    await selectEvent.select(firstRowInput, 'Lithuania');

    expect(await findAllByText('Lithuania')).toHaveLength(1);

    fireEvent.click(getByTestId(selectors.addMoreRows));

    const secondFuelInput = await findByLabelText(
      `${FIELD_KEYS.EMISSION_SOURCES}[1].${ROW_FIELD_KEYS.GRID_LOCATION}`
    );
    await selectEvent.openMenu(secondFuelInput);

    expect(await findAllByText('Lithuania')).toHaveLength(1);
  });

  describe('when field rows exist for all emissions to be entered', () => {
    it('should not render "Add another source" button', () => {
      const { queryByTestId } = setup({
        wizardState: {
          ...getInitialWizardState(),
          electricitySources: [
            ...Object.values(ElectricityLocationGridNames).map(() => ({
              [ROW_FIELD_KEYS.GRID_FACTOR_TYPE]: {
                label: '',
                value: '',
              },
              [ROW_FIELD_KEYS.AMOUNT]: '',
              [ROW_FIELD_KEYS.GRID_LOCATION]: null,
              [ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR]: '',
            })),
          ],
        },
      });

      expect(queryByTestId(selectors.addMoreRows)).not.toBeInTheDocument();
    });
  });

  describe('when user tries to enter more than 100 as the custom grid factor', () => {
    it('should show an error', async () => {
      const { findByTestId, findByText, findByLabelText } = setup();

      const gridTypeLabelText = `${FIELD_KEYS.EMISSION_SOURCES}[0].${ROW_FIELD_KEYS.GRID_FACTOR_TYPE}`;

      await selectEvent.select(
        await findByLabelText(gridTypeLabelText),
        'Custom value in kg CO2e/kWh'
      );

      const customGridInput = await findByTestId(
        selectors.sourceCustomGridFactor
      );

      fireEvent.change(customGridInput, { target: { value: 101 } });

      expect(await findByText('Maximum value is 100')).toBeInTheDocument();
    });
  });

  describe('when user tries to enter 0 as the amount of emission', () => {
    it('should show an error', async () => {
      const { findByTestId, findByText } = setup();

      const amountInput = await findByTestId(selectors.sourceAmount);

      fireEvent.change(amountInput, { target: { value: 0 } });

      expect(await findByText('Minimum value is 1')).toBeInTheDocument();
    });
  });

  describe('when user tries to enter 100_000_000 as the amount of fuel', () => {
    it('should not show an error', async () => {
      const { findByTestId, queryByText } = setup();

      const amountInput = await findByTestId(selectors.sourceAmount);

      fireEvent.change(amountInput, { target: { value: HUNDRED_MILLION + 1 } });

      await waitFor(() => {
        expect(queryByText('Maximum value is 100,000,000')).toBeNull();
      });
    });
  });

  describe('when user tries to enter more than a 1_000_000_000 as the amount of fuel', () => {
    it('should show an error', async () => {
      const { findByTestId, findByText } = setup();

      const amountInput = await findByTestId(selectors.sourceAmount);

      fireEvent.change(amountInput, { target: { value: ONE_BILLION + 1 } });

      expect(
        await findByText('Maximum value is 1,000,000,000')
      ).toBeInTheDocument();
    });
  });

  describe('when cancel button is clicked', () => {
    it('should close the modal', async () => {
      const closeModal = jest.fn();

      const { findByTestId } = setup({ closeModal });

      fireEvent.click(await findByTestId(controlSelectors.cancelBtn));

      await waitFor(() => {
        expect(closeModal).toHaveBeenCalled();
      });
    });

    it('should track analytics event', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');
      const { findByTestId } = setup();

      fireEvent.click(await findByTestId(controlSelectors.cancelBtn));

      await waitFor(() => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          INEXPERIENCED_FLOW_CANCEL,
          {
            companyName: meMocks.baseMe.company!.name,
            primarySector: companySectorsPrimarySectorName(
              meMocks.baseMe.company?.companySectors
            ),
            emissionType: CorporateEmissionType.BASELINE,
            currentStep: InexperiencedFlowSteps.ELECTRICITY_FORM,
          }
        );
      });
    });
  });

  describe('when back button is clicked', () => {
    it('should track analytics event', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');
      const { findByTestId } = setup();

      fireEvent.click(await findByTestId(controlSelectors.backBtn));

      await waitFor(() => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          INEXPERIENCED_FLOW_BACK,
          {
            companyName: meMocks.baseMe.company!.name,
            primarySector: companySectorsPrimarySectorName(
              meMocks.baseMe.company?.companySectors
            ),
            emissionType: CorporateEmissionType.BASELINE,
            currentStep: InexperiencedFlowSteps.ELECTRICITY_FORM,
          }
        );
      });
    });
  });

  describe('when next button is clicked', () => {
    it('should track analytics event', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');
      const { findByTestId } = setup({
        wizardState: wizardStateWithExistingValues,
      });

      fireEvent.click(await findByTestId(controlSelectors.nextBtn));

      await waitFor(() => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          INEXPERIENCED_FLOW_NEXT,
          {
            companyName: meMocks.baseMe.company!.name,
            primarySector: companySectorsPrimarySectorName(
              meMocks.baseMe.company?.companySectors
            ),
            emissionType: CorporateEmissionType.BASELINE,
            currentStep: InexperiencedFlowSteps.ELECTRICITY_FORM,
          }
        );
      });
    });
  });

  describe('when user switches between grid factor types multiple times', () => {
    it('should correctly validate conditional fields', async () => {
      const { findByTestId, getByLabelText } = setup();

      const nextButton = await findByTestId(controlSelectors.nextBtn);

      const gridTypeLabelText = `${FIELD_KEYS.EMISSION_SOURCES}[0].${ROW_FIELD_KEYS.GRID_FACTOR_TYPE}`;
      const gridLocationFieldName = `${FIELD_KEYS.EMISSION_SOURCES}[0].${ROW_FIELD_KEYS.GRID_LOCATION}`;

      expect(nextButton).toBeDisabled();

      await act(async () => {
        await selectEvent.select(
          getByLabelText(gridTypeLabelText),
          'By country'
        );
      });

      expect(nextButton).toBeDisabled();

      await act(async () => {
        await selectEvent.select(
          getByLabelText(gridLocationFieldName),
          'Albania'
        );
      });

      expect(nextButton).toBeDisabled();

      await act(async () => {
        fireEvent.change(await findByTestId(selectors.sourceAmount), {
          target: { value: 99 },
        });
      });

      expect(nextButton).not.toBeDisabled();

      await act(async () => {
        await selectEvent.select(
          getByLabelText(gridTypeLabelText),
          'Custom value in kg CO2e/kWh'
        );
      });

      expect(nextButton).toBeDisabled();

      await act(async () => {
        fireEvent.change(await findByTestId(selectors.sourceCustomGridFactor), {
          target: { value: 1 },
        });
      });

      expect(nextButton).not.toBeDisabled();

      await act(async () => {
        fireEvent.change(await findByTestId(selectors.sourceCustomGridFactor), {
          target: { value: 0 },
        });
      });

      expect(nextButton).not.toBeDisabled();

      await act(async () => {
        await selectEvent.select(
          getByLabelText(gridTypeLabelText),
          'By country'
        );
      });

      expect(nextButton).toBeDisabled();

      await act(async () => {
        await selectEvent.select(
          getByLabelText(gridTypeLabelText),
          'Custom value in kg CO2e/kWh'
        );
      });

      expect(nextButton).toBeDisabled();
    });
  });

  describe('when wizard state has values for the form', () => {
    describe('when previously selected amount is more than 1_000_000_000', () => {
      it('should display an error on initial load', async () => {
        const locationRowHigh = {
          ...locationRow,
          [ROW_FIELD_KEYS.AMOUNT]: 1_000_000_001,
          [ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR]: 111,
        };

        const { findByTestId } = setup({
          wizardState: {
            ...wizardStateWithExistingValues,
            electricitySources: [locationRowHigh],
          },
        });

        expect(
          await findByTestId(`${selectors.sourceAmount}-error`)
        ).toHaveTextContent('Maximum value is 1,000,000,000');
      });
    });

    describe('when previously selected custom grid value is higher than 100', () => {
      it('should display an error on initial load', async () => {
        const customGridRowHigh = {
          ...customGridRow,
          [ROW_FIELD_KEYS.AMOUNT]: 1_000,
          [ROW_FIELD_KEYS.GRID_LOCATION]: null,
          [ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR]: 101,
        };
        const { findByTestId } = setup({
          wizardState: {
            ...wizardStateWithExistingValues,
            electricitySources: [customGridRowHigh],
          },
        });

        expect(
          await findByTestId(`${selectors.sourceCustomGridFactor}-error`)
        ).toHaveTextContent('Maximum value is 100');
      });
    });
  });
});
