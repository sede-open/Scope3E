import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';

import {
  Silver,
  SilverChalice,
  Alto,
  Scorpion,
  TahitiGold,
  Tundora,
  AlizarinCrimson,
} from 'styles/colours';
import { getCurrentYear } from 'utils/date';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import * as ambitionSimulationMocks from 'mocks/ambitionSimulation';
import * as meMocks from 'mocks/me';
import { ModalContentType } from 'containers/types';
import * as corporateEmissionFormSelectors from 'containers/Modals/CorporateEmissionForm/selectors';
import * as contactFormSelectors from 'components/ContactUs/selectors';
import * as taskListModalSelectors from 'containers/Modals/TaskListPrompt/selectors';
import * as emissionPathSelectSelectors from 'containers/Modals/EmissionPathSelect/selectors';
import * as emissionPathCardsSelectors from 'components/EmissionPathCards/selectors';
import ambitionSimulationNamespace from '../../../locales/en/ambitionSimulation.json';
import commonNamespace from '../../../locales/en/common.json';
import locationsNamespace from '../../../locales/en/locations.json';
import { AmbitionSimulation } from '.';
import * as selectors from './selectors';
import corporateEmissionFormNamespace from '../../../locales/en/corporateEmissionForm.json';

jest.mock('utils/redirect');
jest.mock('utils/date');

const setup = (mocks: any = []) =>
  render(
    <I18nProvider
      namespaces={{
        ambitionSimulation: ambitionSimulationNamespace,
        corporateEmissionForm: corporateEmissionFormNamespace,
        common: commonNamespace,
        locations: locationsNamespace,
      }}
    >
      <MockedProvider
        mocks={[meMocks.getGetMeMock(), ...mocks]}
        addTypename={false}
      >
        <AuthenticatedUserProvider>
          <ModalProvider>
            <AmbitionSimulation />
          </ModalProvider>
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );

const selectPrivacyTypeNo = async () => {
  const { findByTestId } = screen;
  const privateTypeNo = await findByTestId(selectors.privacyTypeNo);
  fireEvent.click(privateTypeNo);
};

describe('AmbitionSimulation', () => {
  const unitAmount = 1000;
  const ambitionYear = 2020;
  const millionUnitAmount = 1_000_000;

  beforeEach(() => {
    ((getCurrentYear as unknown) as jest.Mock).mockImplementation(
      () => ambitionYear
    );
  });

  it('should render reduction data for default ambition year', async () => {
    const { findByTestId, getByTestId } = setup([
      ambitionSimulationMocks.simulationDataQuery,
    ]);

    await findByTestId(selectors.ambitionSimulation);
    expect(getByTestId(selectors.ambitionYear)).toHaveTextContent('2022');

    const ambitionReductionInfoList = await findByTestId(
      selectors.ambitionInfoList
    );
    expect(
      within(ambitionReductionInfoList).getByTestId(
        selectors.conditionalEmissions
      )
    ).toHaveTextContent('1,636');
    expect(
      within(ambitionReductionInfoList).getByTestId(selectors.latestEmissions)
    ).toHaveTextContent('1,700');
    expect(
      getByTestId(selectors.ambitionReductionPercentage)
    ).toHaveTextContent('3.8');
  });

  describe('when target includes offsets', () => {
    it('should display net emissions as latest emissions', async () => {
      const { findByTestId } = setup([
        {
          ...ambitionSimulationMocks.simulationDataQuery,
          result: {
            data: {
              ...ambitionSimulationMocks.simulationDataQuery.result.data,
              target: {
                ...ambitionSimulationMocks.simulationDataQuery.result.data
                  .target,
                includeCarbonOffset: true,
              },
              latestCorporateEmission: {
                ...ambitionSimulationMocks.simulationDataQuery.result.data
                  .latestCorporateEmission,
                offset: 10,
              },
            },
          },
        },
      ]);

      expect(await findByTestId(selectors.latestEmissions)).toHaveTextContent(
        '1,690 '
      );
    });
  });

  describe('when target excludes offsets', () => {
    it('should display gross emissions as latest emissions', async () => {
      const { findByTestId } = setup([
        {
          ...ambitionSimulationMocks.simulationDataQuery,
          result: {
            data: {
              ...ambitionSimulationMocks.simulationDataQuery.result.data,
              target: {
                ...ambitionSimulationMocks.simulationDataQuery.result.data
                  .target,
                includeCarbonOffset: false,
              },
              latestCorporateEmission: {
                ...ambitionSimulationMocks.simulationDataQuery.result.data
                  .latestCorporateEmission,
                offset: 10,
              },
            },
          },
        },
      ]);

      expect(await findByTestId(selectors.latestEmissions)).toHaveTextContent(
        '1,700 '
      );
    });
  });

  it('should render reduction data for default ambition year when ambition is to increase emissions', async () => {
    const { findByTestId, getByTestId } = setup([
      ambitionSimulationMocks.simulationNegativeDataQuery,
    ]);

    await findByTestId(selectors.ambitionSimulation);
    expect(getByTestId(selectors.ambitionYear)).toHaveTextContent('2022');

    const ambitionReductionInfoList = await findByTestId(
      selectors.ambitionInfoList
    );
    expect(
      within(ambitionReductionInfoList).getByTestId(
        selectors.conditionalEmissions
      )
    ).toHaveTextContent('1,636');
    expect(
      within(ambitionReductionInfoList).getByTestId(selectors.latestEmissions)
    ).toHaveTextContent('300');
    expect(
      getByTestId(selectors.ambitionReductionPercentage)
    ).toHaveTextContent('0');
  });

  it('should render reduction data for custom tab', async () => {
    const { findByTestId } = setup([
      ambitionSimulationMocks.simulationDataQuery,
    ]);

    await findByTestId(selectors.ambitionSimulation);

    fireEvent.click(await findByTestId('tab-custom'));

    expect(
      ((await findByTestId(
        selectors.customReductionPercentage
      )) as HTMLInputElement).value
    ).toBe('3.8');

    const customReductionInfoList = await findByTestId(
      selectors.customReductionInfoList
    );
    expect(
      within(customReductionInfoList).getByTestId(
        selectors.conditionalEmissions
      )
    ).toHaveTextContent('1,636');
    expect(
      within(customReductionInfoList).getByTestId(selectors.latestEmissions)
    ).toHaveTextContent('1,700');
  });

  it('should allow user to set lever values to produce emission reduction', async () => {
    const { getByTestId, findByTestId, findByLabelText } = setup([
      ambitionSimulationMocks.simulationDataQuery,
    ]);

    await findByTestId(selectors.ambitionSimulation);

    await selectEvent.select(
      await findByLabelText('electricityLever current fuel'),
      'Electricity in country'
    );

    await selectEvent.select(
      await findByLabelText('electricityLever swap fuel'),
      'Solar PV'
    );

    fireEvent.change(
      getByTestId(selectors.getFuelQuantityTestId('electricityLever')),
      {
        target: { value: unitAmount },
      }
    );

    // based on:
    // default country: United Kingdom
    // electricity grid value for United Kingdom: 3.12
    // solar co2MTPerUnit: 0
    expect(
      await findByTestId(
        selectors.getEmissionChangePercentageTestId('electricityLever')
      )
    ).toHaveTextContent('0');
  });

  it('should allow user to set swap fuel the same as current fuel', async () => {
    const { getByTestId, findByTestId, findByLabelText } = setup([
      ambitionSimulationMocks.simulationDataQuery,
    ]);

    await findByTestId(selectors.ambitionSimulation);

    await selectEvent.select(
      await findByLabelText('electricityLever current fuel'),
      'Electricity in country'
    );

    await selectEvent.select(
      await findByLabelText('electricityLever swap fuel'),
      'Electricity in country'
    );

    fireEvent.change(
      getByTestId(selectors.getFuelQuantityTestId('electricityLever')),
      {
        target: { value: unitAmount },
      }
    );
  });

  it('should display total simulated reductions', async () => {
    const { getByTestId, findByTestId, findByLabelText } = setup([
      ambitionSimulationMocks.simulationDataQuery,
    ]);

    await findByTestId(selectors.ambitionSimulation);

    await selectEvent.select(
      await findByLabelText('electricityLever current fuel'),
      'Electricity in country'
    );

    await selectEvent.select(
      await findByLabelText('electricityLever swap fuel'),
      'Wind'
    );

    fireEvent.change(
      getByTestId(selectors.getFuelQuantityTestId('electricityLever')),
      {
        target: { value: unitAmount },
      }
    );

    expect(
      await findByTestId(selectors.simulationReductions)
    ).toHaveTextContent('-0');
  });

  it('should display outstanding emission reductions when on ambition tab', async () => {
    const { getByTestId, findByTestId, findByLabelText } = setup([
      ambitionSimulationMocks.simulationDataQuery,
    ]);

    await findByTestId(selectors.ambitionSimulation);

    await selectEvent.select(
      await findByLabelText('electricityLever current fuel'),
      'Electricity in country'
    );

    await selectEvent.select(
      await findByLabelText('electricityLever swap fuel'),
      'Solar PV'
    );

    fireEvent.change(
      getByTestId(selectors.getFuelQuantityTestId('electricityLever')),
      {
        target: { value: unitAmount },
      }
    );

    expect(
      await findByTestId(selectors.simulationOutstandingReductions)
    ).toHaveTextContent('64 tCO2e');
  });

  it('should display outstanding emission reductions when on custom tab', async () => {
    const { getByTestId, findByTestId, findByLabelText } = setup([
      ambitionSimulationMocks.simulationDataQueryNoTarget,
    ]);

    await findByTestId(selectors.ambitionSimulation);

    expect(
      getByTestId(selectors.simulationOutstandingReductions).textContent
    ).toBe('0 tCO2e');

    fireEvent.click(getByTestId('tab-custom'));

    fireEvent.change(await findByTestId(selectors.customReductionPercentage), {
      target: { value: 50 },
    });

    expect(
      await findByTestId(selectors.simulationOutstandingReductions)
    ).toHaveTextContent('850 tCO2e');

    await selectEvent.select(
      await findByLabelText('electricityLever current fuel'),
      'Electricity in country'
    );

    await selectEvent.select(
      await findByLabelText('electricityLever swap fuel'),
      'Solar PV'
    );

    fireEvent.change(
      getByTestId(selectors.getFuelQuantityTestId('electricityLever')),
      {
        target: { value: unitAmount },
      }
    );

    expect(
      await findByTestId(selectors.simulationOutstandingReductions)
    ).toHaveTextContent('850 tCO2e');
  });

  it('should disable form when target set on ambition tab', async () => {
    const { getByTestId, findByTestId } = setup([
      ambitionSimulationMocks.simulationDataQueryNoTarget,
    ]);

    await findByTestId(selectors.ambitionSimulation);

    expect(getByTestId(selectors.progressArcLine)).toHaveStyle(
      `stroke: ${Silver}`
    );
    expect(getByTestId(selectors.achievedPercentageReduction)).toHaveStyle(
      `color: ${SilverChalice}`
    );
    expect(getByTestId(selectors.simulationReductions)).toHaveStyle(
      `color: ${SilverChalice}`
    );
    expect(getByTestId(selectors.simulationOutstandingReductions)).toHaveStyle(
      `color: ${SilverChalice}`
    );
    expect(getByTestId(selectors.contactModalOpenBtn)).toBeDisabled();

    expect(
      getByTestId(selectors.getLeverIconTestId('electricityLever'))
    ).toHaveStyle(`background: ${Alto}`);
    expect(
      getByTestId(selectors.getLeverTitleTestId('electricityLever'))
    ).toHaveStyle(`color: ${SilverChalice}`);
    expect(
      getByTestId(
        selectors.getEmissionChangePercentageTestId('electricityLever')
      )
    ).toHaveStyle(`color: ${SilverChalice}`);
    expect(
      getByTestId(selectors.getFuelQuantityTestId('electricityLever'))
    ).toHaveAttribute('disabled');
  });

  it('should enable the form when target is not set on custom tab', async () => {
    const { getByTestId, findByTestId } = setup([
      ambitionSimulationMocks.simulationDataQueryNoTarget,
    ]);

    await findByTestId(selectors.ambitionSimulation);

    expect(getByTestId(selectors.achievedPercentageReduction)).toHaveStyle(
      `color: ${SilverChalice}`
    );
    expect(getByTestId(selectors.simulationReductions)).toHaveStyle(
      `color: ${SilverChalice}`
    );
    expect(getByTestId(selectors.simulationOutstandingReductions)).toHaveStyle(
      `color: ${SilverChalice}`
    );
    expect(getByTestId(selectors.contactModalOpenBtn)).toBeDisabled();

    expect(
      getByTestId(selectors.getLeverIconTestId('electricityLever'))
    ).toHaveStyle(`background: ${Alto}`);
    expect(
      getByTestId(selectors.getLeverTitleTestId('electricityLever'))
    ).toHaveStyle(`color: ${SilverChalice}`);
    expect(
      getByTestId(
        selectors.getEmissionChangePercentageTestId('electricityLever')
      )
    ).toHaveStyle(`color: ${SilverChalice}`);
    expect(
      getByTestId(selectors.getFuelQuantityTestId('electricityLever'))
    ).toHaveAttribute('disabled');

    fireEvent.click(getByTestId('tab-custom'));

    await findByTestId(selectors.ambitionSimulation);

    expect(getByTestId(selectors.achievedPercentageReduction)).toHaveStyle(
      `color: ${Scorpion}`
    );
    expect(getByTestId(selectors.simulationReductions)).toHaveStyle(
      `color: ${Scorpion}`
    );
    expect(getByTestId(selectors.simulationOutstandingReductions)).toHaveStyle(
      `color: ${Scorpion}`
    );
    expect(getByTestId(selectors.contactModalOpenBtn)).not.toBeDisabled();

    expect(
      getByTestId(selectors.getLeverIconTestId('electricityLever'))
    ).toHaveStyle(`background: ${TahitiGold}`);
    expect(
      getByTestId(selectors.getLeverTitleTestId('electricityLever'))
    ).toHaveStyle(`color: ${Tundora}`);
    expect(
      getByTestId(
        selectors.getEmissionChangePercentageTestId('electricityLever')
      )
    ).toHaveStyle(`color: ${AlizarinCrimson}`);
    expect(
      getByTestId(selectors.getFuelQuantityTestId('electricityLever'))
    ).not.toHaveAttribute('disabled');
  });

  it('should render empty state when latestEmissions are missing', async () => {
    const { queryByTestId, findByTestId, getByTestId } = setup([
      ambitionSimulationMocks.simulationDataQueryNoData,
    ]);

    await findByTestId(selectors.ambitionSimulation);

    expect(queryByTestId(selectors.simulationTabs)).toBeNull();
    expect(getByTestId(selectors.emissionsEmptyState)).toBeInTheDocument();
  });

  it('should allow the user to enter emission', async () => {
    const { findByTestId, findByLabelText } = setup([
      ambitionSimulationMocks.simulationDataQueryNoData,
      ambitionSimulationMocks.createBaselineMock,
      ambitionSimulationMocks.simulationDataQueryNoTarget,
      ambitionSimulationMocks.simulationDataQuery,
    ]);

    await findByTestId(selectors.ambitionSimulation);

    // open emission path select modal
    fireEvent.click(await findByTestId(selectors.emissionsEmptyStateBtn));

    expect(
      await findByTestId(emissionPathSelectSelectors.container)
    ).toBeInTheDocument();

    fireEvent.click(
      await findByTestId(emissionPathCardsSelectors.experiencedUserButton)
    );

    expect(
      await findByTestId(
        corporateEmissionFormSelectors.getEmissionFormTestId(
          ModalContentType.NEW_BASELINE
        )
      )
    ).toBeInTheDocument();

    expect(
      await findByTestId(corporateEmissionFormSelectors.yearSelect)
    ).toBeInTheDocument();

    // fill out baseline form
    await selectEvent.select(
      await findByLabelText(
        corporateEmissionFormNamespace['baseline-edit-year']
      ),
      ambitionSimulationMocks.baseline.year.toString()
    );

    fireEvent.change(
      await findByTestId(corporateEmissionFormSelectors.scope1Input),
      {
        target: {
          value: ambitionSimulationMocks.baseline.scope1,
        },
      }
    );
    fireEvent.change(
      await findByTestId(corporateEmissionFormSelectors.scope2Input),
      {
        target: {
          value: ambitionSimulationMocks.baseline.scope2,
        },
      }
    );

    await selectPrivacyTypeNo();

    await act(async () => {
      fireEvent.click(
        await findByTestId(corporateEmissionFormSelectors.submitBtn)
      );
    });

    // // task list prompt modal
    expect(
      await findByTestId(taskListModalSelectors.taskListModal)
    ).toBeInTheDocument();
  });

  describe('when on custom tab', () => {
    it('should open contact modal', async () => {
      const { getByTestId, findByTestId, queryByTestId } = setup([
        ambitionSimulationMocks.simulationDataQueryNoTarget,
      ]);

      await findByTestId(selectors.ambitionSimulation);

      fireEvent.click(getByTestId('tab-custom'));

      await waitFor(() =>
        expect(queryByTestId(contactFormSelectors.form)).toBeNull()
      );
      fireEvent.click(getByTestId(selectors.contactModalOpenBtn));
      expect(await findByTestId(contactFormSelectors.form)).toBeVisible();
    });
  });

  describe('when on ambition tab', () => {
    describe('when ambition exists', () => {
      it('should open contact modal', async () => {
        const { findByTestId, queryByTestId } = setup([
          ambitionSimulationMocks.simulationDataQuery,
        ]);

        await waitFor(() => {
          expect(
            queryByTestId(contactFormSelectors.form)
          ).not.toBeInTheDocument();
        });

        await act(async () => {
          fireEvent.click(await findByTestId(selectors.contactModalOpenBtn));
        });

        expect(await findByTestId(contactFormSelectors.form)).toBeVisible();
      });
    });
  });

  describe('Simulation country selection', () => {
    it('should have default country set as United Kingdom,', async () => {
      const { findByTestId, getByTestId } = setup([
        ambitionSimulationMocks.simulationDataQueryNoTarget,
      ]);

      fireEvent.click(await findByTestId('tab-custom'));

      await findByTestId(selectors.ambitionSimulation);

      // assert default simulation country
      expect(getByTestId(selectors.simulationCountry).textContent).toContain(
        'United Kingdom'
      );
    });

    describe('when only electricty lever fuels and value entered', () => {
      it('should update total lever card when simluation country is changed', async () => {
        const { findByTestId, findByLabelText, getByTestId } = setup([
          ambitionSimulationMocks.simulationDataQueryNoTarget,
        ]);

        fireEvent.click(await findByTestId('tab-custom'));

        await findByTestId(selectors.ambitionSimulation);

        fireEvent.change(
          await findByTestId(selectors.customReductionPercentage),
          {
            target: { value: 50 },
          }
        );

        // assert default total lever card default value
        expect(
          getByTestId(selectors.achievedPercentageReduction).textContent
        ).toContain('0%');

        // assert outstanding reductions when default simulation country
        expect(
          getByTestId(selectors.simulationOutstandingReductions).textContent
        ).toContain('850 tCO2e');

        await selectEvent.select(
          await findByLabelText('electricityLever current fuel'),
          'Electricity in country'
        );

        await selectEvent.select(
          await findByLabelText('electricityLever swap fuel'),
          'Solar PV'
        );

        fireEvent.change(
          getByTestId(selectors.getFuelQuantityTestId('electricityLever')),
          {
            target: { value: millionUnitAmount },
          }
        );

        expect(
          getByTestId(selectors.achievedPercentageReduction)
        ).toBeInTheDocument();

        // assert total lever card value when default simulation country
        expect(
          getByTestId(selectors.achievedPercentageReduction)
        ).toHaveTextContent('18.4%');

        await selectEvent.select(
          await findByLabelText('Simulation country'),
          'Portugal'
        );

        // assert total lever card value when selected simulation country
        expect(
          getByTestId(selectors.achievedPercentageReduction).textContent
        ).toContain('18.9%');

        // assert outstanding reductions when selected simulation country
        expect(
          getByTestId(selectors.simulationOutstandingReductions).textContent
        ).toContain('528 tCO2e');
      });
    });

    describe('when only mobility lever fuels and value entered', () => {
      it('should update total lever card when simluation country is changed', async () => {
        const { findByTestId, findByLabelText, getByTestId } = setup([
          ambitionSimulationMocks.simulationDataQueryNoTarget,
        ]);

        fireEvent.click(await findByTestId('tab-custom'));

        await findByTestId(selectors.ambitionSimulation);

        fireEvent.change(
          await findByTestId(selectors.customReductionPercentage),
          {
            target: { value: 50 },
          }
        );

        // assert default total lever card default value
        expect(
          getByTestId(selectors.achievedPercentageReduction).textContent
        ).toContain('0%');

        await selectEvent.select(
          await findByLabelText('mobilityLever current fuel'),
          'Petrol (100% mineral)'
        );

        await selectEvent.select(
          await findByLabelText('mobilityLever swap fuel'),
          'Electricity in country'
        );

        fireEvent.change(
          getByTestId(selectors.getFuelQuantityTestId('mobilityLever')),
          {
            target: { value: millionUnitAmount },
          }
        );

        expect(
          getByTestId(selectors.achievedPercentageReduction)
        ).toBeInTheDocument();

        // assert total lever card value when default simulation country
        expect(
          getByTestId(selectors.achievedPercentageReduction)
        ).toHaveTextContent('158%');

        await selectEvent.select(
          await findByLabelText('Simulation country'),
          'Portugal'
        );

        // assert total lever card value when selected simulation country
        expect(
          getByTestId(selectors.achievedPercentageReduction).textContent
        ).toContain('157.6%');
      });
    });

    describe('when only road freight lever fuels and value entered', () => {
      it('should update total lever card when simluation country is changed', async () => {
        const { findByTestId, findByLabelText, getByTestId } = setup([
          ambitionSimulationMocks.simulationDataQueryNoTarget,
        ]);

        fireEvent.click(await findByTestId('tab-custom'));

        await findByTestId(selectors.ambitionSimulation);

        fireEvent.change(
          await findByTestId(selectors.customReductionPercentage),
          {
            target: { value: 50 },
          }
        );

        // assert default total lever card default value
        expect(
          getByTestId(selectors.achievedPercentageReduction).textContent
        ).toContain('0%');

        await selectEvent.select(
          await findByLabelText('roadFreightLever current fuel'),
          'Diesel (100% mineral)'
        );

        await selectEvent.select(
          await findByLabelText('roadFreightLever swap fuel'),
          'Electricity in country'
        );

        fireEvent.change(
          getByTestId(selectors.getFuelQuantityTestId('roadFreightLever')),
          {
            target: { value: millionUnitAmount },
          }
        );

        expect(
          getByTestId(selectors.achievedPercentageReduction)
        ).toBeInTheDocument();

        // assert total lever card value when default simulation country
        expect(
          getByTestId(selectors.achievedPercentageReduction)
        ).toHaveTextContent('170.4%');

        await selectEvent.select(
          await findByLabelText('Simulation country'),
          'Portugal'
        );

        // assert total lever card value when selected simulation country
        expect(
          getByTestId(selectors.achievedPercentageReduction).textContent
        ).toContain('169.7%');
      });
    });

    describe('when only travel lever fuels and value entered', () => {
      it('should update total lever card when simluation country is changed', async () => {
        const { findByTestId, findByLabelText, getByTestId } = setup([
          ambitionSimulationMocks.simulationDataQueryNoTarget,
        ]);

        fireEvent.click(await findByTestId('tab-custom'));

        await findByTestId(selectors.ambitionSimulation);

        fireEvent.change(
          await findByTestId(selectors.customReductionPercentage),
          {
            target: { value: 50 },
          }
        );

        // assert default total lever card default value
        expect(
          getByTestId(selectors.achievedPercentageReduction).textContent
        ).toContain('0%');

        await selectEvent.select(
          await findByLabelText('travelLever current fuel'),
          'Car (Petrol)'
        );

        await selectEvent.select(
          await findByLabelText('travelLever swap fuel'),
          'Electricity in country'
        );

        fireEvent.change(
          getByTestId(selectors.getFuelQuantityTestId('travelLever')),
          {
            target: { value: millionUnitAmount },
          }
        );

        expect(
          getByTestId(selectors.achievedPercentageReduction)
        ).toBeInTheDocument();

        // assert total lever card value when default simulation country
        expect(
          getByTestId(selectors.achievedPercentageReduction)
        ).toHaveTextContent('2.9%');

        await selectEvent.select(
          await findByLabelText('Simulation country'),
          'Portugal'
        );

        // assert total lever card value when selected simulation country
        expect(
          getByTestId(selectors.achievedPercentageReduction).textContent
        ).toContain('2.8%');
      });
    });

    describe('when only data centre lever fuels and value entered', () => {
      it('should update total lever card when simluation country is changed', async () => {
        const { findByTestId, findByLabelText, getByTestId } = setup([
          ambitionSimulationMocks.simulationDataQueryNoTarget,
        ]);

        fireEvent.click(await findByTestId('tab-custom'));

        await findByTestId(selectors.ambitionSimulation);

        fireEvent.change(
          await findByTestId(selectors.customReductionPercentage),
          {
            target: { value: 50 },
          }
        );

        // assert default total lever card default value
        expect(
          getByTestId(selectors.achievedPercentageReduction).textContent
        ).toContain('0%');

        await selectEvent.select(
          await findByLabelText('dataCentreLever current fuel'),
          'Average air cooling'
        );

        await selectEvent.select(
          await findByLabelText('dataCentreLever swap fuel'),
          'Immersion cooling'
        );

        fireEvent.change(
          getByTestId(selectors.getFuelQuantityTestId('dataCentreLever')),
          {
            target: { value: millionUnitAmount },
          }
        );

        expect(
          getByTestId(selectors.achievedPercentageReduction)
        ).toBeInTheDocument();

        // assert total lever card value when default simulation country
        expect(
          getByTestId(selectors.achievedPercentageReduction)
        ).toHaveTextContent('1462.8%');

        await selectEvent.select(
          await findByLabelText('Simulation country'),
          'Portugal'
        );

        // assert total lever card value when selected simulation country
        expect(
          getByTestId(selectors.achievedPercentageReduction).textContent
        ).toContain('1506.9%');
      });
    });

    describe('when mobility lever, travel lever, electricity lever, data centre lever and road freight lever fuels and values entered', () => {
      it('should update total lever card when simluation country is changed', async () => {
        const { findByTestId, findByLabelText, getByTestId } = setup([
          ambitionSimulationMocks.simulationDataQueryNoTarget,
        ]);

        fireEvent.click(await findByTestId('tab-custom'));

        await findByTestId(selectors.ambitionSimulation);

        fireEvent.change(
          await findByTestId(selectors.customReductionPercentage),
          {
            target: { value: 50 },
          }
        );

        // assert default total lever card default value
        expect(
          getByTestId(selectors.achievedPercentageReduction).textContent
        ).toContain('0%');

        await selectEvent.select(
          await findByLabelText('electricityLever current fuel'),
          'Electricity in country'
        );

        await selectEvent.select(
          await findByLabelText('electricityLever swap fuel'),
          'Solar PV'
        );

        fireEvent.change(
          getByTestId(selectors.getFuelQuantityTestId('electricityLever')),
          {
            target: { value: millionUnitAmount },
          }
        );

        await selectEvent.select(
          await findByLabelText('mobilityLever current fuel'),
          'Petrol (100% mineral)'
        );

        await selectEvent.select(
          await findByLabelText('mobilityLever swap fuel'),
          'Electricity in country'
        );

        fireEvent.change(
          getByTestId(selectors.getFuelQuantityTestId('mobilityLever')),
          {
            target: { value: millionUnitAmount },
          }
        );

        await selectEvent.select(
          await findByLabelText('roadFreightLever current fuel'),
          'Diesel (100% mineral)'
        );

        await selectEvent.select(
          await findByLabelText('roadFreightLever swap fuel'),
          'Electricity in country'
        );

        fireEvent.change(
          getByTestId(selectors.getFuelQuantityTestId('roadFreightLever')),
          {
            target: { value: millionUnitAmount },
          }
        );

        await selectEvent.select(
          await findByLabelText('travelLever current fuel'),
          'Car (Petrol)'
        );

        await selectEvent.select(
          await findByLabelText('travelLever swap fuel'),
          'Electricity in country'
        );

        fireEvent.change(
          getByTestId(selectors.getFuelQuantityTestId('travelLever')),
          {
            target: { value: millionUnitAmount },
          }
        );

        await selectEvent.select(
          await findByLabelText('dataCentreLever current fuel'),
          'Average air cooling'
        );

        await selectEvent.select(
          await findByLabelText('dataCentreLever swap fuel'),
          'Immersion cooling'
        );

        fireEvent.change(
          getByTestId(selectors.getFuelQuantityTestId('dataCentreLever')),
          {
            target: { value: millionUnitAmount },
          }
        );

        expect(
          getByTestId(selectors.achievedPercentageReduction)
        ).toBeInTheDocument();

        // assert total lever card value when default simulation country
        expect(
          getByTestId(selectors.achievedPercentageReduction)
        ).toHaveTextContent('1812.5%');

        await selectEvent.select(
          await findByLabelText('Simulation country'),
          'Portugal'
        );

        // assert total lever card value when selected simulation country
        expect(
          getByTestId(selectors.achievedPercentageReduction).textContent
        ).toContain('1855.9%');
      });
    });
  });
});
