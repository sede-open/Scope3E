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
import processRefrigerantsNamespace from '../../../../../../locales/en/processRefrigerants.json';
import formNamespace from '../../../../../../locales/en/form.json';
import { getInitialWizardState } from '../../utils';
import * as selectors from '../../selectors';
import {
  InexperiencedFlowSteps,
  ProcessRefrigerantName,
  SCOPE1_SOURCES_FORM_FIELD_KEYS as FIELD_KEYS,
  SCOPE1_SOURCE_FIELD_KEYS as ROW_FIELD_KEYS,
} from '../../types';
import { ONE_BILLION } from '../../../../../constants';
import { ProcessRefrigerantsForm, IProps } from '.';

jest.mock('effects/useAuthenticatedUser');

const setup = (overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    emissionType: CorporateEmissionType.BASELINE,
    closeModal: jest.fn(),
    onBack: jest.fn(),
    onNext: jest.fn(),
    wizardState: getInitialWizardState(),
    onSetExternalLinkDisclaimer: jest.fn(),
    ...overrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        inexperiencedFlow: inexperiencedUserFlowNamespace,
        common: commonNamespace,
        processRefrigerants: processRefrigerantsNamespace,
        form: formNamespace,
      }}
    >
      <ProcessRefrigerantsForm {...props} />
    </I18nProvider>
  );
};

const wizardStateWithExistingValues = {
  ...getInitialWizardState(),
  processRefrigerantsSources: [
    {
      amount: 10_000,
      source: { value: ProcessRefrigerantName.METHANE, label: 'Methane' },
    },
    {
      amount: 100_000,
      source: {
        value: ProcessRefrigerantName.CARBON_DIOXIDE,
        label: 'Carbon Dioxide',
      },
    },
  ],
};

describe('ProcessRefrigerantsForm', () => {
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

    expect(
      await findAllByTestId(selectors.processRefrigerantsFieldRow)
    ).toHaveLength(1);
  });

  it('should NOT display a form error for amount on initial load', async () => {
    const { findAllByTestId, queryByTestId } = setup();

    expect(
      await findAllByTestId(selectors.processRefrigerantsFieldRow)
    ).toHaveLength(1);

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

  describe('when add more options button is clicked', () => {
    it('should add a new row', async () => {
      const { getByTestId, findAllByTestId } = setup();

      expect(
        await findAllByTestId(selectors.processRefrigerantsFieldRow)
      ).toHaveLength(1);

      fireEvent.click(getByTestId(selectors.addMoreRows));

      expect(
        await findAllByTestId(selectors.processRefrigerantsFieldRow)
      ).toHaveLength(2);
    });
  });

  describe('when multiple rows exist', () => {
    describe('when delete button is clicked', () => {
      it('should remove that row', async () => {
        const { getByTestId, findByTestId, findAllByTestId } = setup();

        fireEvent.click(await findByTestId(selectors.addMoreRows));

        expect(
          await findAllByTestId(selectors.processRefrigerantsFieldRow)
        ).toHaveLength(2);

        fireEvent.click(getByTestId(selectors.deleteSource));

        expect(
          await findAllByTestId(selectors.processRefrigerantsFieldRow)
        ).toHaveLength(1);
      });
    });

    it('should display 0 as total emissions by default', async () => {
      const { findByTestId } = setup();

      expect(await findByTestId(selectors.totalEmissions)).toHaveTextContent(
        '0 tCO2e'
      );
    });
  });

  describe('when process and refrigerant values already exist', () => {
    it('should render field rows with those values', async () => {
      const { getAllByTestId, findAllByTestId, getByText } = setup({
        wizardState: wizardStateWithExistingValues,
      });

      expect(
        await findAllByTestId(selectors.processRefrigerantsFieldRow)
      ).toHaveLength(2);

      expect(getByText('Methane')).toBeInTheDocument();
      expect(getByText('Carbon Dioxide')).toBeInTheDocument();

      const amountInputs = getAllByTestId(selectors.sourceAmount);
      expect((amountInputs[0] as HTMLInputElement).value).toBe('10,000');
      expect((amountInputs[1] as HTMLInputElement).value).toBe('100,000');
    });

    it('should display the total emissions for the selected fuels', async () => {
      const { findByTestId } = setup({
        wizardState: wizardStateWithExistingValues,
      });

      // Methane = 0.025 * 10_000 = 250
      // Carbon Dioxide = 0.001 * 100_000 = 100
      // Total = 350

      expect(await findByTestId(selectors.totalEmissions)).toHaveTextContent(
        '350.00 tCO2e'
      );
    });
  });

  it('should only allow user to select an emission once', async () => {
    const {
      findByLabelText,
      getByTestId,
      findAllByText,
      queryAllByText,
    } = setup();

    await waitFor(() => expect(queryAllByText('Methane')).toHaveLength(0));

    const firstFuelInput = await findByLabelText(
      `${FIELD_KEYS.EMISSION_SOURCES}[0].${ROW_FIELD_KEYS.SOURCE}`
    );
    await selectEvent.openMenu(firstFuelInput);

    expect(await findAllByText('Methane')).toHaveLength(1);

    await selectEvent.select(firstFuelInput, 'Methane');

    expect(await findAllByText('Methane')).toHaveLength(1);

    fireEvent.click(getByTestId(selectors.addMoreRows));

    const secondFuelInput = await findByLabelText(
      `${FIELD_KEYS.EMISSION_SOURCES}[1].${ROW_FIELD_KEYS.SOURCE}`
    );
    await selectEvent.openMenu(secondFuelInput);

    expect(await findAllByText('Methane')).toHaveLength(1);
  });

  describe('when field rows exist for all emissions to be entered', () => {
    it('should not render "Add another emission type" button', async () => {
      const { queryByTestId } = setup({
        wizardState: {
          ...getInitialWizardState(),
          processRefrigerantsSources: [
            ...Object.values(ProcessRefrigerantName).map((fuel) => ({
              amount: 0,
              source: { value: fuel, label: '' },
            })),
          ],
        },
      });

      await waitFor(() => {
        expect(queryByTestId(selectors.addMoreRows)).toBeNull();
      });
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
        expect(queryByText('Maximum value is 1,000,000,000')).toBeNull();
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
            currentStep: InexperiencedFlowSteps.PROCESS_REFRIGERANT_FORM,
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
            currentStep: InexperiencedFlowSteps.PROCESS_REFRIGERANT_FORM,
          }
        );
      });
    });
  });

  describe('when next button is clicked', () => {
    it('should track analytics event', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');
      const { getByTestId, findByTestId, findByLabelText } = setup();

      const amountInput = getByTestId(selectors.sourceAmount);

      const firstFuelInput = await findByLabelText(
        `${FIELD_KEYS.EMISSION_SOURCES}[0].${ROW_FIELD_KEYS.SOURCE}`
      );
      await selectEvent.select(firstFuelInput, 'Methane');

      fireEvent.change(amountInput, { target: { value: 100 } });

      fireEvent.click(await findByTestId(controlSelectors.nextBtn));

      await waitFor(() => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          INEXPERIENCED_FLOW_NEXT,
          {
            companyName: userMock.company.name,
            primarySector: userMock.company.companySectors[0].sector.name,
            emissionType: CorporateEmissionType.BASELINE,
            currentStep: InexperiencedFlowSteps.PROCESS_REFRIGERANT_FORM,
          }
        );
      });
    });
  });

  describe('when wizard state has values for the form', () => {
    describe('when previously selected amount is more than 1_000_000_000', () => {
      it('should display an error on initial load', async () => {
        const { findByTestId } = setup({
          wizardState: {
            ...getInitialWizardState(),
            processRefrigerantsSources: [
              {
                amount: 10_000_000_000,
                source: {
                  value: ProcessRefrigerantName.METHANE,
                  label: 'Methane',
                },
              },
            ],
          },
        });

        expect(
          await findByTestId(`${selectors.sourceAmount}-error`)
        ).toHaveTextContent('Maximum value is 1,000,000,000');
      });
    });
  });
});
