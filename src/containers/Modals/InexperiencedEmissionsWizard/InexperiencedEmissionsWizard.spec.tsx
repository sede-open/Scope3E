import {
  act,
  fireEvent,
  Matcher,
  MatcherOptions,
  render,
  SelectorMatcherOptions,
  waitFor,
  waitForOptions,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';

import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { CorporateEmissionType } from 'types/globalTypes';
import * as taskListModalSelectors from 'containers/Modals/TaskListPrompt/selectors';
import * as controlSelectors from 'components/Wizard/WizardControls/selectors';
import * as modalSelectors from 'components/Modal/selectors';
import * as disclaimerSelectors from 'components/ExternalLinkDisclaimer/selectors';
import * as emissionsMocks from 'mocks/emissions';
import { USER_COMPANY_ID } from 'mocks/constants';

import inexperiencedUserFlowNamespace from '../../../../locales/en/inexperiencedFlow.json';
import fuelsNamespace from '../../../../locales/en/fuels.json';
import processRefrigerantsNamespace from '../../../../locales/en/processRefrigerants.json';

import { InexperiencedEmissionsWizard, IProps } from '.';

import * as selectors from './selectors';
import {
  InexperiencedFlowSteps,
  SCOPE1_SOURCES_FORM_FIELD_KEYS,
  SCOPE1_SOURCE_FIELD_KEYS,
  SCOPE2_SOURCES_FORM_FIELD_KEYS,
  SCOPE2_SOURCE_FIELD_KEYS,
} from './types';

jest.mock('effects/useAuthenticatedUser');

const year = new Date().getFullYear() - 1;

const setup = (overrides: Partial<IProps> = {}, mocks: any[] = []) => {
  const props: IProps = {
    closeModal: jest.fn(),
    emissionType: CorporateEmissionType.BASELINE,

    ...overrides,
  };
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ModalProvider>
        <I18nProvider
          namespaces={{
            inexperiencedFlow: inexperiencedUserFlowNamespace,
            fuels: fuelsNamespace,
            processRefrigerants: processRefrigerantsNamespace,
          }}
        >
          <InexperiencedEmissionsWizard {...props} />
        </I18nProvider>
      </ModalProvider>
    </MockedProvider>
  );
};

const fillOutBaselineYearAndGoNext = async ({
  findByLabelText,
  getByTestId,
}: {
  getByTestId: (
    text: Matcher,
    options?: MatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement;
  findByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
}) => {
  await act(async () => {
    const baselineYearInput = await findByLabelText('Baseline year');
    await selectEvent.select(baselineYearInput, year.toString());

    fireEvent.click(getByTestId(controlSelectors.nextBtn));
  });
};

const fillOutScope1AndGoNext = async ({
  findByLabelText,
  findByTestId,
  getByTestId,
}: {
  getByTestId: (
    text: Matcher,
    options?: MatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement;
  findByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
  findByTestId: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
}) => {
  await fillOutBaselineYearAndGoNext({
    findByLabelText,
    getByTestId,
  });

  fireEvent.click(
    await findByTestId(`${selectors.stationaryAndMobileCombustionInput}-label`)
  );

  fireEvent.click(
    await findByTestId(
      `${selectors.industrialProcessAndRefrigirantsInput}-label`
    )
  );

  await act(async () => {
    fireEvent.click(await findByTestId(controlSelectors.nextBtn));
  });

  expect(
    await findByTestId(selectors.scope2SourceSelectForm)
  ).toBeInTheDocument();
};

const fillOutScope2AndGoNext = async ({
  findByLabelText,
  findByTestId,
  getByTestId,
}: {
  getByTestId: (
    text: Matcher,
    options?: MatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement;
  findByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
  findByTestId: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
}) => {
  await fillOutScope1AndGoNext({
    getByTestId,
    findByLabelText,
    findByTestId,
  });

  fireEvent.click(await findByTestId(`${selectors.electricityInput}-label`));

  fireEvent.click(await findByTestId(`${selectors.heatCoolingInput}-label`));

  await act(async () => {
    fireEvent.click(await findByTestId(controlSelectors.nextBtn));
  });
};

const dataOverviewStepNext = async ({
  findByLabelText,
  findByTestId,
  getByTestId,
}: {
  getByTestId: (
    text: Matcher,
    options?: MatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement;
  findByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
  findByTestId: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
}) => {
  await fillOutScope2AndGoNext({
    getByTestId,
    findByLabelText,
    findByTestId,
  });

  fireEvent.click(await findByTestId(controlSelectors.nextBtn));
};

const fillOutCombustionFormAndNext = async ({
  findByLabelText,
  findByTestId,
  getByTestId,
}: {
  getByTestId: (
    text: Matcher,
    options?: MatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement;
  findByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
  findByTestId: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
}) => {
  await dataOverviewStepNext({
    getByTestId,
    findByLabelText,
    findByTestId,
  });

  const amountInput = getByTestId(selectors.sourceAmount);

  const firstFuelInput = await findByLabelText(
    `${SCOPE1_SOURCES_FORM_FIELD_KEYS.EMISSION_SOURCES}[0].${SCOPE1_SOURCE_FIELD_KEYS.SOURCE}`
  );
  await selectEvent.select(firstFuelInput, 'LNG');

  fireEvent.change(amountInput, { target: { value: 100 } });

  await act(async () => {
    fireEvent.click(await findByTestId(controlSelectors.nextBtn));
  });
};

const fillOutProcessesFormAndNext = async ({
  findByLabelText,
  findByTestId,
  getByTestId,
}: {
  getByTestId: (
    text: Matcher,
    options?: MatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement;
  findByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
  findByTestId: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
}) => {
  await fillOutCombustionFormAndNext({
    getByTestId,
    findByLabelText,
    findByTestId,
  });

  const amountInput = await findByTestId(selectors.sourceAmount);

  const firstFuelInput = await findByLabelText(
    `${SCOPE1_SOURCES_FORM_FIELD_KEYS.EMISSION_SOURCES}[0].${SCOPE1_SOURCE_FIELD_KEYS.SOURCE}`
  );
  await selectEvent.select(firstFuelInput, 'Methane');

  fireEvent.change(amountInput, { target: { value: 100 } });

  await act(async () => {
    fireEvent.click(await findByTestId(controlSelectors.nextBtn));
  });
};

const fillOutElectricityFormAndNext = async ({
  findByLabelText,
  findByTestId,
  getByTestId,
}: {
  getByTestId: (
    text: Matcher,
    options?: MatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement;
  findByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
  findByTestId: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
}) => {
  await fillOutProcessesFormAndNext({
    getByTestId,
    findByLabelText,
    findByTestId,
  });

  const firstGridFactorTypeInput = await findByLabelText(
    `${SCOPE2_SOURCES_FORM_FIELD_KEYS.EMISSION_SOURCES}[0].${SCOPE2_SOURCE_FIELD_KEYS.GRID_FACTOR_TYPE}`
  );
  await selectEvent.select(
    firstGridFactorTypeInput,
    'Custom value in kg CO2e/kWh'
  );

  const gridFactorInput = await findByTestId(selectors.sourceCustomGridFactor);
  fireEvent.change(gridFactorInput, { target: { value: 0.5 } });

  const amountInput = await findByTestId(selectors.sourceAmount);
  fireEvent.change(amountInput, { target: { value: 100 } });

  await act(async () => {
    fireEvent.click(await findByTestId(controlSelectors.nextBtn));
  });
};

const fillOutHeatAndCoolingAndNext = async ({
  findByLabelText,
  findByTestId,
  getByTestId,
}: {
  getByTestId: (
    text: Matcher,
    options?: MatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement;
  findByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
  findByTestId: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement>;
}) => {
  await fillOutElectricityFormAndNext({
    getByTestId,
    findByLabelText,
    findByTestId,
  });

  const firstGridFactorTypeInput = await findByLabelText(
    `${SCOPE2_SOURCES_FORM_FIELD_KEYS.EMISSION_SOURCES}[0].${SCOPE2_SOURCE_FIELD_KEYS.GRID_FACTOR_TYPE}`
  );
  await selectEvent.select(firstGridFactorTypeInput, 'DEFRA');

  const amountInput = await findByTestId(selectors.sourceAmount);
  fireEvent.change(amountInput, { target: { value: 100 } });

  await act(async () => {
    fireEvent.click(await findByTestId(controlSelectors.nextBtn));
  });
};

const goBack = async ({
  getByTestId,
}: {
  getByTestId: (
    text: Matcher,
    options?: MatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement;
}) => {
  await act(async () => {
    fireEvent.click(getByTestId(controlSelectors.backBtn));
  });
};

const assertReadMoreLink = ({
  stepFn,
  stepSelector,
}: {
  stepFn: (args: any) => void;
  stepSelector: string;
}) => {
  describe('when the read more button is clicked', () => {
    it('should display the external link disclaimer', async () => {
      const { getByTestId, findByLabelText, findByTestId } = setup();

      await stepFn({
        findByLabelText,
        findByTestId,
        getByTestId,
      });

      await act(async () => {
        fireEvent.click(await getByTestId(selectors.readMoreButton));
      });

      expect(
        await findByTestId(disclaimerSelectors.container)
      ).toBeInTheDocument();
    });
  });

  describe('when the external link disclaimer is dismissed', () => {
    it('should return to the wizard', async () => {
      const { getByTestId, findByLabelText, findByTestId } = setup();

      await stepFn({
        findByLabelText,
        findByTestId,
        getByTestId,
      });

      await act(async () => {
        fireEvent.click(await getByTestId(selectors.readMoreButton));
      });

      await act(async () => {
        fireEvent.click(await getByTestId(disclaimerSelectors.cancelButton));
      });

      expect(await findByTestId(stepSelector)).toBeInTheDocument();
    });
  });
};

describe('InexperiencedEmissionsWizard', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: {
        id: USER_COMPANY_ID,
      },
    }));
  });

  it('should render baseline select form by default', () => {
    const { getByTestId } = setup();
    expect(getByTestId(selectors.emissionYearSelectForm)).toBeInTheDocument();
  });

  describe('Select emission year select step', () => {
    describe('when baseline year form is filled out', () => {
      it('should allow the user to progress to select scope 1 sources form', async () => {
        const { getByTestId, findByLabelText } = setup();

        await fillOutBaselineYearAndGoNext({
          findByLabelText,
          getByTestId,
        });

        await waitFor(() => {
          expect(
            getByTestId(selectors.scope1SourceSelectForm)
          ).toBeInTheDocument();
        });
      });

      it('should display the progress bar with 0% value', async () => {
        const { findByTestId } = setup();

        expect(await findByTestId(selectors.progressBar)).toHaveTextContent(
          '0%'
        );
      });
    });
  });

  describe('scope 1 source step', () => {
    it('should have next button disabled', async () => {
      const { getByTestId, findByLabelText } = setup();

      await fillOutBaselineYearAndGoNext({
        findByLabelText,
        getByTestId,
      });

      await waitFor(() => {
        expect(
          getByTestId(selectors.scope1SourceSelectForm)
        ).toBeInTheDocument();
        expect(getByTestId(controlSelectors.nextBtn)).toBeDisabled();
      });
    });

    it('should display scope 1 selections', async () => {
      const { getByTestId, findByLabelText } = setup();

      await fillOutBaselineYearAndGoNext({
        findByLabelText,
        getByTestId,
      });

      await waitFor(() => {
        expect(
          getByTestId(`${selectors.stationaryAndMobileCombustionInput}-label`)
        ).toBeInTheDocument();
        expect(
          getByTestId(
            `${selectors.industrialProcessAndRefrigirantsInput}-label`
          )
        ).toBeInTheDocument();
      });
    });

    describe('when user goes back to baseline select', () => {
      it('should show already selected baseline year', async () => {
        const {
          getByTestId,
          findByLabelText,
          findByTestId,
          getByText,
        } = setup();

        await fillOutBaselineYearAndGoNext({
          findByLabelText,
          getByTestId,
        });

        expect(
          await findByTestId(selectors.scope1SourceSelectForm)
        ).toBeInTheDocument();

        await goBack({ getByTestId });

        expect(
          await findByTestId(selectors.emissionYearSelectForm)
        ).toBeInTheDocument();

        await waitFor(() => {
          expect(getByText(String(year))).toBeInTheDocument();
        });
      });
    });

    describe('when user selects a scope 1 source', () => {
      it('should enable next button', async () => {
        const { getByTestId, findByLabelText, findByTestId } = setup();

        await fillOutBaselineYearAndGoNext({
          findByLabelText,
          getByTestId,
        });

        expect(
          await findByTestId(selectors.scope1SourceSelectForm)
        ).toBeInTheDocument();

        fireEvent.click(
          getByTestId(`${selectors.stationaryAndMobileCombustionInput}-label`)
        );

        await waitFor(() => {
          expect(getByTestId(controlSelectors.nextBtn)).not.toBeDisabled();
        });
      });

      describe('when next button is clicked', () => {
        it('should show scope 2 select form', async () => {
          const { getByTestId, findByLabelText, findByTestId } = setup();

          await fillOutBaselineYearAndGoNext({
            findByLabelText,
            getByTestId,
          });

          expect(
            await findByTestId(selectors.scope1SourceSelectForm)
          ).toBeInTheDocument();

          await act(async () => {
            fireEvent.click(
              getByTestId(
                `${selectors.stationaryAndMobileCombustionInput}-label`
              )
            );
          });

          await act(async () => {
            fireEvent.click(await findByTestId(controlSelectors.nextBtn));
          });

          expect(
            await findByTestId(selectors.scope2SourceSelectForm)
          ).toBeInTheDocument();
        });
      });
    });

    it('should display the progress bar with 20% value', async () => {
      const { getByTestId, findByLabelText, findByTestId } = setup();

      await fillOutBaselineYearAndGoNext({
        findByLabelText,
        getByTestId,
      });

      expect(await findByTestId(selectors.progressBar)).toHaveTextContent(
        '20%'
      );
    });
  });

  describe('scope 2 source step', () => {
    it('should have next button disabled', async () => {
      const { getByTestId, findByLabelText, findByTestId } = setup();

      await fillOutScope1AndGoNext({
        getByTestId,
        findByLabelText,
        findByTestId,
      });

      await waitFor(() => {
        expect(
          getByTestId(selectors.scope2SourceSelectForm)
        ).toBeInTheDocument();
        expect(getByTestId(controlSelectors.nextBtn)).toBeDisabled();
      });
    });

    it('should display scope 2 selections', async () => {
      const { getByTestId, findByLabelText, findByTestId } = setup();

      await fillOutScope1AndGoNext({
        getByTestId,
        findByLabelText,
        findByTestId,
      });

      await waitFor(() => {
        expect(
          getByTestId(`${selectors.electricityInput}-label`)
        ).toBeInTheDocument();
        expect(
          getByTestId(`${selectors.heatCoolingInput}-label`)
        ).toBeInTheDocument();
      });
    });

    describe('when user selects a scope 2 source', () => {
      it('should enable next button', async () => {
        const { getByTestId, findByLabelText, findByTestId } = setup();

        await fillOutScope1AndGoNext({
          getByTestId,
          findByLabelText,
          findByTestId,
        });

        await act(async () => {
          fireEvent.click(
            await findByTestId(`${selectors.electricityInput}-label`)
          );
        });

        expect(await findByTestId(controlSelectors.nextBtn)).not.toBeDisabled();
      });

      describe('when next button is clicked', () => {
        it('should show data needed overview', async () => {
          const { getByTestId, findByLabelText, findByTestId } = setup();

          await fillOutScope2AndGoNext({
            findByLabelText,
            findByTestId,
            getByTestId,
          });

          expect(
            await findByTestId(selectors.dataNeededOverview)
          ).toBeInTheDocument();
        });
      });
    });

    describe('when user goes back to scope 1 select', () => {
      it('should render already selected values', async () => {
        const { getByTestId, findByLabelText, findByTestId } = setup();

        await fillOutScope1AndGoNext({
          getByTestId,
          findByLabelText,
          findByTestId,
        });

        await goBack({ getByTestId });

        expect(
          await findByTestId(selectors.scope1SourceSelectForm)
        ).toBeInTheDocument();

        expect(
          getByTestId(
            selectors.getInputTestId(
              selectors.industrialProcessAndRefrigirantsInput
            )
          )
        ).toBeChecked();

        expect(
          getByTestId(
            selectors.getInputTestId(
              selectors.stationaryAndMobileCombustionInput
            )
          )
        ).toBeChecked();
      });
    });

    it('should display the progress bar with 29% value', async () => {
      const { getByTestId, findByLabelText, findByTestId } = setup();

      await fillOutScope1AndGoNext({
        getByTestId,
        findByLabelText,
        findByTestId,
      });

      expect(await findByTestId(selectors.progressBar)).toHaveTextContent(
        '29%'
      );
    });
  });

  describe('data overview step', () => {
    describe('when next button is clicked', () => {
      describe('when stationary and mobile combustion source selected', () => {
        it('should render stationary and mobile combustion form', async () => {
          const { getByTestId, findByLabelText, findByTestId } = setup();

          await fillOutScope2AndGoNext({
            findByLabelText,
            findByTestId,
            getByTestId,
          });

          fireEvent.click(await findByTestId(controlSelectors.nextBtn));

          expect(
            await findByTestId(selectors.combustionForm)
          ).toBeInTheDocument();
        });
      });
    });

    it('should display the progress bar with 33% value', async () => {
      const { getByTestId, findByLabelText, findByTestId } = setup();

      await fillOutScope2AndGoNext({
        getByTestId,
        findByLabelText,
        findByTestId,
      });

      expect(await findByTestId(selectors.progressBar)).toHaveTextContent(
        '33%'
      );
    });
  });

  describe('stationary and mobile combustion step', () => {
    describe('when back button is clicked', () => {
      it('should go back to the data overview step', async () => {
        const { getByTestId, findByLabelText, findByTestId } = setup();

        await fillOutScope2AndGoNext({
          findByLabelText,
          findByTestId,
          getByTestId,
        });

        fireEvent.click(await findByTestId(controlSelectors.nextBtn));

        expect(
          await findByTestId(selectors.combustionForm)
        ).toBeInTheDocument();

        fireEvent.click(await findByTestId(controlSelectors.backBtn));

        expect(
          await findByTestId(selectors.dataNeededOverview)
        ).toBeInTheDocument();
      });
    });

    describe('when next button is clicked', () => {
      describe('when process and refrigerant input has been selected', () => {
        it('should render process and refrigerant step', async () => {
          const { getByTestId, findByLabelText, findByTestId } = setup();

          await fillOutBaselineYearAndGoNext({
            getByTestId,
            findByLabelText,
          });

          // scope 1 sources
          fireEvent.click(
            await findByTestId(
              `${selectors.stationaryAndMobileCombustionInput}-label`
            )
          );

          fireEvent.click(
            await findByTestId(
              `${selectors.industrialProcessAndRefrigirantsInput}-label`
            )
          );

          await act(async () => {
            fireEvent.click(await findByTestId(controlSelectors.nextBtn));
          });

          // scope 2 sources
          fireEvent.click(
            await findByTestId(`${selectors.electricityInput}-label`)
          );

          await act(async () => {
            fireEvent.click(await findByTestId(controlSelectors.nextBtn));
          });

          // data overview step
          await act(async () => {
            fireEvent.click(await findByTestId(controlSelectors.nextBtn));
          });

          // combustion step
          const firstFuelInput = await findByLabelText(
            `${SCOPE1_SOURCES_FORM_FIELD_KEYS.EMISSION_SOURCES}[0].${SCOPE1_SOURCE_FIELD_KEYS.SOURCE}`
          );

          await selectEvent.select(firstFuelInput, 'Natural gas');

          await act(async () => {
            fireEvent.click(await findByTestId(controlSelectors.nextBtn));
          });

          await waitFor(() => expect(selectors.processRefrigerantsForm));

          expect(await findByTestId(selectors.progressBar)).toHaveTextContent(
            '50%'
          );
        });
      });
    });

    assertReadMoreLink({
      stepFn: dataOverviewStepNext,
      stepSelector: selectors.combustionForm,
    });
  });

  describe('process and refrigerant step', () => {
    describe('when back button is clicked', () => {
      it('should go back to the stationary and mobile combustion step step', async () => {
        const { getByTestId, findByLabelText, findByTestId } = setup();

        await fillOutCombustionFormAndNext({
          findByLabelText,
          findByTestId,
          getByTestId,
        });

        expect(
          await findByTestId(selectors.processRefrigerantsForm)
        ).toBeInTheDocument();

        fireEvent.click(await findByTestId(controlSelectors.backBtn));

        expect(
          await findByTestId(selectors.combustionForm)
        ).toBeInTheDocument();
      });
    });

    describe('when next button is clicked', () => {
      describe('when electricity input has been selected', () => {
        it('should render electricity step', async () => {
          const { getByTestId, findByLabelText, findByTestId } = setup();

          await fillOutProcessesFormAndNext({
            findByLabelText,
            findByTestId,
            getByTestId,
          });

          expect(
            await findByTestId(selectors.electricityForm)
          ).toBeInTheDocument();
        });
      });
    });

    assertReadMoreLink({
      stepFn: fillOutCombustionFormAndNext,
      stepSelector: selectors.processRefrigerantsForm,
    });

    it('should display the progress bar with 56% value', async () => {
      const { getByTestId, findByLabelText, findByTestId } = setup();

      await fillOutCombustionFormAndNext({
        getByTestId,
        findByLabelText,
        findByTestId,
      });

      expect(await findByTestId(selectors.progressBar)).toHaveTextContent(
        '56%'
      );
    });
  });

  describe('electricity step', () => {
    describe('when back button is clicked', () => {
      it('should go back to the industrial processes step', async () => {
        const { getByTestId, findByLabelText, findByTestId } = setup();

        await fillOutProcessesFormAndNext({
          findByLabelText,
          findByTestId,
          getByTestId,
        });

        expect(
          await findByTestId(selectors.electricityForm)
        ).toBeInTheDocument();

        fireEvent.click(await findByTestId(controlSelectors.backBtn));

        expect(
          await findByTestId(selectors.processRefrigerantsForm)
        ).toBeInTheDocument();
      });
    });

    describe('when next button is clicked', () => {
      it('should display heat and cooling form', async () => {
        const { getByTestId, findByLabelText, findByTestId } = setup();

        await fillOutElectricityFormAndNext({
          findByLabelText,
          findByTestId,
          getByTestId,
        });

        expect(
          await findByTestId(selectors.heatCoolingForm)
        ).toBeInTheDocument();
      });
    });

    it('should display the progress bar with 67% value', async () => {
      const { getByTestId, findByLabelText, findByTestId } = setup();

      await fillOutProcessesFormAndNext({
        getByTestId,
        findByLabelText,
        findByTestId,
      });

      expect(await findByTestId(selectors.progressBar)).toHaveTextContent(
        '67%'
      );
    });
  });

  describe('heat and cooling step', () => {
    describe('when back button is clicked', () => {
      it('should go back to the industrial processes step', async () => {
        const { getByTestId, findByLabelText, findByTestId } = setup();

        await fillOutElectricityFormAndNext({
          findByLabelText,
          findByTestId,
          getByTestId,
        });

        expect(
          await findByTestId(selectors.heatCoolingForm)
        ).toBeInTheDocument();

        fireEvent.click(await findByTestId(controlSelectors.backBtn));

        expect(
          await findByTestId(selectors.electricityForm)
        ).toBeInTheDocument();
      });
    });

    it('should display the progress bar with 78% value', async () => {
      const { getByTestId, findByLabelText, findByTestId } = setup();

      await fillOutElectricityFormAndNext({
        getByTestId,
        findByLabelText,
        findByTestId,
      });

      expect(await findByTestId(selectors.progressBar)).toHaveTextContent(
        '78%'
      );
    });
  });

  describe('summary step', () => {
    it('should display the progress bar with 89% value', async () => {
      const { getByTestId, findByLabelText, findByTestId } = setup();

      await fillOutHeatAndCoolingAndNext({
        getByTestId,
        findByLabelText,
        findByTestId,
      });

      expect(await findByTestId(selectors.progressBar)).toHaveTextContent(
        '89%'
      );
    });

    describe('when save button is clicked', () => {
      it('should create a new baseline and open the task list prompt modal', async () => {
        const { getByTestId, findByLabelText, findByTestId } = setup({}, [
          emissionsMocks.createInexperiencedBaselineMockFull,
        ]);

        await fillOutHeatAndCoolingAndNext({
          findByLabelText,
          findByTestId,
          getByTestId,
        });

        await act(async () => {
          fireEvent.click(await findByTestId(controlSelectors.nextBtn));
        });

        expect(
          await findByTestId(taskListModalSelectors.taskListModal)
        ).toBeInTheDocument();
      });
    });
  });

  describe.each`
    stepName                                         | setupFn
    ${InexperiencedFlowSteps.SELECT_EMISSION_YEAR}   | ${null}
    ${InexperiencedFlowSteps.SELECT_SCOPE_1_SOURCES} | ${fillOutBaselineYearAndGoNext}
    ${InexperiencedFlowSteps.SELECT_SCOPE_2_SOURCES} | ${fillOutScope1AndGoNext}
    ${InexperiencedFlowSteps.DATA_NEEDED_OVERVIEW}   | ${fillOutScope2AndGoNext}
  `(
    'On the $stepName step',
    ({ setupFn }: { setupFn: ((args: any) => void) | null }) => {
      it.each`
        buttonName       | clickSelector
        ${'Cancel'}      | ${controlSelectors.cancelBtn}
        ${'Modal close'} | ${modalSelectors.closeButton}
      `(
        'when the $buttonName button is clicked, should close the modal',
        async ({ clickSelector }: { clickSelector: string }) => {
          const closeModal = jest.fn();
          const { getByTestId, findByLabelText, findByTestId } = setup({
            closeModal,
          });

          if (setupFn) {
            await setupFn({
              getByTestId,
              findByLabelText,
              findByTestId,
            });
          }

          await act(async () => {
            fireEvent.click(await findByTestId(clickSelector));
          });

          expect(closeModal).toHaveBeenCalled();
        }
      );
    }
  );

  describe.each`
    stepName                                                    | setupFn
    ${InexperiencedFlowSteps.STATIONARY_MOBILE_COMBUSTION_FORM} | ${dataOverviewStepNext}
    ${InexperiencedFlowSteps.PROCESS_REFRIGERANT_FORM}          | ${fillOutCombustionFormAndNext}
    ${InexperiencedFlowSteps.ELECTRICITY_FORM}                  | ${fillOutProcessesFormAndNext}
    ${InexperiencedFlowSteps.HEAT_COOLING_FORM}                 | ${fillOutElectricityFormAndNext}
    ${InexperiencedFlowSteps.SUMMARY}                           | ${fillOutHeatAndCoolingAndNext}
  `(
    'On the "$stepName" step',
    ({ setupFn }: { setupFn: (args: any) => void }) => {
      it.each`
        buttonName       | clickSelector
        ${'Cancel'}      | ${controlSelectors.cancelBtn}
        ${'Modal close'} | ${modalSelectors.closeButton}
      `(
        'when the $buttonName button is clicked, should display the cancel confirmation modal',
        async ({ clickSelector }: { clickSelector: string }) => {
          const closeModal = jest.fn();
          const { getByTestId, findByLabelText, findByTestId } = setup({
            closeModal,
          });

          await setupFn({
            getByTestId,
            findByLabelText,
            findByTestId,
          });

          await act(async () => {
            fireEvent.click(await findByTestId(clickSelector));
          });

          expect(closeModal).not.toHaveBeenCalled();

          expect(
            await findByTestId(selectors.cancelConfirmation)
          ).toBeInTheDocument();
        }
      );
    }
  );

  describe('when the cancel confirmation modal is displayed', () => {
    it.each`
      buttonName              | clickSelector
      ${'"No, take me back"'} | ${selectors.cancelConfirmationCancel}
      ${'Modal close'}        | ${modalSelectors.closeButton}
    `(
      'and the $buttonName is clicked, should switch back to the wizard view',
      async ({ clickSelector }: { clickSelector: string }) => {
        const closeModal = jest.fn();
        const { getByTestId, findByLabelText, findByTestId } = setup({
          closeModal,
        });

        await dataOverviewStepNext({
          getByTestId,
          findByLabelText,
          findByTestId,
        });

        await act(async () => {
          fireEvent.click(await findByTestId(controlSelectors.cancelBtn));
        });

        expect(
          await findByTestId(selectors.cancelConfirmation)
        ).toBeInTheDocument();

        await act(async () => {
          fireEvent.click(await findByTestId(clickSelector));
        });

        expect(closeModal).not.toHaveBeenCalled();

        expect(
          await findByTestId(selectors.combustionForm)
        ).toBeInTheDocument();
      }
    );

    it('and the "Yes, cancel" button is clicked, should close the modal', async () => {
      const closeModal = jest.fn();
      const { getByTestId, findByLabelText, findByTestId } = setup({
        closeModal,
      });

      await dataOverviewStepNext({
        getByTestId,
        findByLabelText,
        findByTestId,
      });

      await act(async () => {
        fireEvent.click(await findByTestId(controlSelectors.cancelBtn));
      });

      expect(
        await findByTestId(selectors.cancelConfirmation)
      ).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(
          await findByTestId(selectors.cancelConfirmationConfirm)
        );
      });

      expect(closeModal).toHaveBeenCalled();
    });
  });
});
