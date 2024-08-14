import { fireEvent, render, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';

import { CompanySectorType, CorporateEmissionType } from 'types/globalTypes';
import * as analyticsEvents from 'utils/analytics';
import * as controlSelectors from 'components/Wizard/WizardControls/selectors';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import {
  INEXPERIENCED_FLOW_BACK,
  INEXPERIENCED_FLOW_CANCEL,
  INEXPERIENCED_FLOW_NEXT,
} from 'utils/analyticsEvents';

import inexperiencedUserFlowNamespace from '../../../../../../locales/en/inexperiencedFlow.json';
import commonNamespace from '../../../../../../locales/en/common.json';
import locationsNamespace from '../../../../../../locales/en/locations.json';
import formNamespace from '../../../../../../locales/en/form.json';
import { getInitialWizardState } from '../../utils';
import * as selectors from '../../selectors';
import {
  HeatCoolingGridTypes,
  InexperiencedFlowSteps,
  SCOPE2_SOURCES_FORM_FIELD_KEYS as FIELD_KEYS,
  SCOPE2_SOURCE_FIELD_KEYS as ROW_FIELD_KEYS,
} from '../../types';
import { ONE_BILLION } from '../../../../../constants';
import { DEFRA_GRID_FACTOR } from '../../constants';
import { HeatCoolingForm, IProps } from '.';

jest.mock('effects/useAuthenticatedUser');

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
      <HeatCoolingForm {...props} />
    </I18nProvider>
  );
};

const defraRow = {
  [ROW_FIELD_KEYS.GRID_FACTOR_TYPE]: {
    label: 'DEFRA',
    value: HeatCoolingGridTypes.DEFRA,
  },
  [ROW_FIELD_KEYS.AMOUNT]: 100_000_000,
  [ROW_FIELD_KEYS.GRID_LOCATION]: null,
  [ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR]: DEFRA_GRID_FACTOR,
};

const customGridRow = {
  [ROW_FIELD_KEYS.GRID_FACTOR_TYPE]: {
    label: 'Custom value in kg CO2e/kWh',
    value: HeatCoolingGridTypes.CUSTOM,
  },
  [ROW_FIELD_KEYS.AMOUNT]: 10_000,
  [ROW_FIELD_KEYS.GRID_LOCATION]: null,
  [ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR]: 0.65,
};

const wizardStateWithExistingValues = {
  ...getInitialWizardState(),
  heatCoolingSources: [defraRow, customGridRow],
};

describe('HeatCoolingForm', () => {
  const userMock = {
    company: {
      name: 'Company Ltd',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'IT services' },
        },
      ],
    },
  };

  beforeEach(() => {
    (useAuthenticatedUser as jest.Mock).mockReturnValue(userMock);
  });

  it('should render one emission row by default', async () => {
    const { findAllByTestId } = setup();

    expect(await findAllByTestId(selectors.heatCoolingFieldRow)).toHaveLength(
      1
    );
  });

  it('should NOT display a form error for amount on initial load', async () => {
    const { findAllByTestId, queryByTestId } = setup();

    expect(await findAllByTestId(selectors.heatCoolingFieldRow)).toHaveLength(
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
    it('should enable a custom grid factor input', async () => {
      const { findByTestId } = setup({
        wizardState: {
          ...getInitialWizardState(),
          heatCoolingSources: [customGridRow],
        },
      });

      expect(
        await findByTestId(selectors.sourceCustomGridFactor)
      ).not.toBeDisabled();
    });
  });

  describe('when a DEFRA grid factor type is selected', () => {
    it('should disabled custom grid input', async () => {
      const { findByTestId } = setup({
        wizardState: {
          ...getInitialWizardState(),
          heatCoolingSources: [defraRow],
        },
      });

      expect(
        await findByTestId(selectors.sourceCustomGridFactor)
      ).toBeDisabled();
    });
  });

  describe('when add more options button is clicked', () => {
    it('should add a new row', async () => {
      const { getByTestId, findAllByTestId } = setup();

      expect(await findAllByTestId(selectors.heatCoolingFieldRow)).toHaveLength(
        1
      );

      fireEvent.click(getByTestId(selectors.addMoreRows));

      expect(await findAllByTestId(selectors.heatCoolingFieldRow)).toHaveLength(
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
          await findAllByTestId(selectors.heatCoolingFieldRow)
        ).toHaveLength(2);

        fireEvent.click(getByTestId(selectors.deleteSource));

        expect(
          await findAllByTestId(selectors.heatCoolingFieldRow)
        ).toHaveLength(1);
      });
    });
  });

  describe('when heatCooling values already exist', () => {
    it('should render field rows with those values', async () => {
      const { getAllByTestId, getByText } = setup({
        wizardState: wizardStateWithExistingValues,
      });

      await waitFor(() => {
        expect(getAllByTestId(selectors.heatCoolingFieldRow)).toHaveLength(2);
      });

      expect(getByText('DEFRA')).toBeInTheDocument();
      expect(getByText('Custom value in kg CO2e/kWh')).toBeInTheDocument();

      const gridFactorInputs = getAllByTestId(selectors.sourceCustomGridFactor);
      expect((gridFactorInputs[0] as HTMLInputElement).value).toBe('0.17261');
      expect((gridFactorInputs[1] as HTMLInputElement).value).toBe('0.65000');

      const amountInputs = getAllByTestId(selectors.sourceAmount);
      expect((amountInputs[0] as HTMLInputElement).value).toBe('100,000,000');
      expect((amountInputs[1] as HTMLInputElement).value).toBe('10,000');
    });

    it('should display the total emissions for the selected fuels', async () => {
      const { findByTestId } = setup({
        wizardState: wizardStateWithExistingValues,
      });

      // DEFRA = 0.17261 * 1_00_000_000 / 1_000 = 17261
      // Custom = 0.65 * 10_000 / 1_000 = 6.5
      // Total = 350

      expect(await findByTestId(selectors.totalEmissions)).toHaveTextContent(
        '17,267.50 tCO2e'
      );
    });
  });

  describe('when user tries to enter more than 100 as the custom grid factor', () => {
    it('should show an error', async () => {
      const { findByTestId, findByText, getByLabelText } = setup();

      const gridTypeLabelText = `${FIELD_KEYS.EMISSION_SOURCES}[0].${ROW_FIELD_KEYS.GRID_FACTOR_TYPE}`;

      await selectEvent.select(
        getByLabelText(gridTypeLabelText),
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
      const { getByTestId, findByText } = setup();

      const amountInput = getByTestId(selectors.sourceAmount);

      fireEvent.change(amountInput, { target: { value: 0 } });

      expect(await findByText('Minimum value is 1')).toBeInTheDocument();
    });
  });

  describe('when user tries to enter 1_000_000_000 as the amount of fuel', () => {
    it('should not show an error', async () => {
      const { getByTestId, queryByText } = setup();

      const amountInput = getByTestId(selectors.sourceAmount);

      fireEvent.change(amountInput, { target: { value: ONE_BILLION } });

      await waitFor(() => {
        expect(queryByText('Maximum value is 100,000,000')).toBeNull();
      });
    });
  });

  describe('when user tries to enter more than a 1_000_000_000 as the amount of fuel', () => {
    it('should show an error', async () => {
      const { getByTestId, findByText } = setup();

      const amountInput = getByTestId(selectors.sourceAmount);

      fireEvent.change(amountInput, { target: { value: ONE_BILLION + 1 } });

      expect(
        await findByText('Maximum value is 1,000,000,000')
      ).toBeInTheDocument();
    });
  });

  describe('when cancel button is clicked', () => {
    it('should close the modal', async () => {
      const closeModal = jest.fn();

      const { getByTestId } = setup({ closeModal });

      fireEvent.click(getByTestId(controlSelectors.cancelBtn));

      await waitFor(() => {
        expect(closeModal).toHaveBeenCalled();
      });
    });

    it('should track analytics event', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');
      const { getByTestId } = setup();

      fireEvent.click(getByTestId(controlSelectors.cancelBtn));

      await waitFor(() => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          INEXPERIENCED_FLOW_CANCEL,
          {
            companyName: userMock.company.name,
            primarySector: userMock.company.companySectors[0].sector.name,
            emissionType: CorporateEmissionType.BASELINE,
            currentStep: InexperiencedFlowSteps.HEAT_COOLING_FORM,
          }
        );
      });
    });
  });

  describe('when back button is clicked', () => {
    it('should track analytics event', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');
      const { getByTestId } = setup();

      fireEvent.click(getByTestId(controlSelectors.backBtn));

      await waitFor(() => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          INEXPERIENCED_FLOW_BACK,
          {
            companyName: userMock.company.name,
            primarySector: userMock.company.companySectors[0].sector.name,
            emissionType: CorporateEmissionType.BASELINE,
            currentStep: InexperiencedFlowSteps.HEAT_COOLING_FORM,
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

      expect(await findByTestId(controlSelectors.nextBtn)).not.toBeDisabled();

      fireEvent.click(await findByTestId(controlSelectors.nextBtn));

      await waitFor(() => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          INEXPERIENCED_FLOW_NEXT,
          {
            companyName: userMock.company.name,
            primarySector: userMock.company.companySectors[0].sector.name,
            emissionType: CorporateEmissionType.BASELINE,
            currentStep: InexperiencedFlowSteps.HEAT_COOLING_FORM,
          }
        );
      });
    });
  });

  describe('when wizard state has values for the form', () => {
    describe('when previously selected amount is more than 1_000_000_000', () => {
      it('should display an error on initial load', async () => {
        const defraRowHigh = {
          ...defraRow,
          [ROW_FIELD_KEYS.AMOUNT]: 100_000_000_000,
        };

        const { findByTestId } = setup({
          wizardState: {
            ...wizardStateWithExistingValues,
            heatCoolingSources: [defraRowHigh],
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
          [ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR]: 101,
        };

        const { findByTestId } = setup({
          wizardState: {
            ...wizardStateWithExistingValues,
            heatCoolingSources: [customGridRowHigh],
          },
        });

        expect(
          await findByTestId(`${selectors.sourceCustomGridFactor}-error`)
        ).toHaveTextContent('Maximum value is 100');
      });
    });
  });
});
