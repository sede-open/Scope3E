import { fireEvent, render, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { MockedProvider } from '@apollo/client/testing';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as toast from 'utils/toast';
import {
  getCreateBaselineErrorMock,
  getCreateBaselineMock,
} from 'mocks/inexperiencedFlow';
import * as controlSelectors from 'components/Wizard/WizardControls/selectors';
import * as analyticsEvents from 'utils/analytics';
import { ElectricityLocationGridNames } from 'utils/electricityGrid';
import {
  INEXPERIENCED_FLOW_BACK,
  INEXPERIENCED_FLOW_CANCEL,
  INEXPERIENCED_FLOW_NEXT,
} from 'utils/analyticsEvents';
import {
  CompanySectorType,
  CorporateEmissionType,
  Scope2Type,
} from 'types/globalTypes';

import inexperiencedUserFlowNamespace from '../../../../../../locales/en/inexperiencedFlow.json';
import commonNamespace from '../../../../../../locales/en/common.json';
import { getInitialWizardState } from '../../utils';
import * as selectors from '../../selectors';
import {
  EMISSION_YEAR_FIELD_KEYS,
  HeatCoolingGridTypes,
  WizardState,
  SCOPE2_SOURCE_FIELD_KEYS as ROW_FIELD_KEYS,
  ElectricityGridTypes,
  InexperiencedFlowSteps,
} from '../../types';
import { Summary, IProps } from '.';

jest.mock('effects/useAuthenticatedUser');

const setup = (overrides: Partial<IProps> = {}, mocks: any[] = []) => {
  const props: IProps = {
    closeModal: jest.fn(),
    onBack: jest.fn(),
    onNext: jest.fn(),
    emissionType: CorporateEmissionType.BASELINE,
    wizardState: getInitialWizardState(),
    ...overrides,
  };

  return render(
    <I18nProvider
      namespaces={{
        inexperiencedFlow: inexperiencedUserFlowNamespace,
        common: commonNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <Summary {...props} />
      </MockedProvider>
      ,
    </I18nProvider>
  );
};

const getWizardState = (overrides: Partial<WizardState>) => ({
  ...getInitialWizardState(),
  ...overrides,
});

describe('Summary', () => {
  const userMock = {
    company: {
      id: 'companyId',
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

  const baselineYear = 2018;
  const stationaryCombustionTotal = 1234;
  const processRefrigerantsTotal = 3456;

  it('should render scope 1 total', () => {
    const { getByTestId } = setup({
      wizardState: getWizardState({
        stationaryCombustionTotal,
        processRefrigerantsTotal,
      }),
    });

    expect(getByTestId(selectors.summaryScope1Total)).toHaveTextContent(
      '4,690.00 tCO2e'
    );
  });

  it('should display "Save" as next button text', () => {
    const { getByTestId } = setup({
      wizardState: getWizardState({
        [EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR]: baselineYear,
        stationaryCombustionTotal,
      }),
    });

    expect(getByTestId(controlSelectors.nextBtn)).toHaveTextContent('Save');
  });

  it('should render emissions total', () => {
    const { getByTestId } = setup({
      wizardState: getWizardState({
        stationaryCombustionTotal,
        processRefrigerantsTotal,
      }),
    });

    expect(getByTestId(selectors.summaryTotal)).toHaveTextContent(
      '4,690.00 tCO2e'
    );
  });

  describe('when next is clicked', () => {
    describe('when baseline is created successfully', () => {
      it('should show a success toaster', async () => {
        jest.spyOn(toast, 'displaySuccessMessage');
        const expectedSuccessToastPayload = {
          title: 'Save successful',
        };

        const { getByTestId } = setup(
          {
            wizardState: getWizardState({
              [EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR]: baselineYear,
              stationaryCombustionTotal,
            }),
          },
          [
            getCreateBaselineMock({
              year: baselineYear,
              scope1: stationaryCombustionTotal,
              companyId: userMock.company.id,
            }),
          ]
        );

        fireEvent.click(getByTestId(controlSelectors.nextBtn));

        await waitFor(() => {
          expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
            expectedSuccessToastPayload
          );
        });
      });

      it('should call onNext()', async () => {
        const onNext = jest.fn();

        const { getByTestId } = setup(
          {
            wizardState: getWizardState({
              [EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR]: baselineYear,
              stationaryCombustionTotal,
            }),
            onNext,
          },
          [
            getCreateBaselineMock({
              year: baselineYear,
              scope1: stationaryCombustionTotal,
              companyId: userMock.company.id,
            }),
          ]
        );

        fireEvent.click(getByTestId(controlSelectors.nextBtn));

        await waitFor(() => {
          expect(onNext).toHaveBeenCalled();
        });
      });

      it('should track analytics event', async () => {
        jest.spyOn(analyticsEvents, 'trackEvent');

        const { findByTestId } = setup(
          {
            wizardState: getWizardState({
              [EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR]: baselineYear,
              stationaryCombustionTotal,
            }),
          },
          [
            getCreateBaselineMock({
              year: baselineYear,
              scope1: stationaryCombustionTotal,
              companyId: userMock.company.id,
            }),
          ]
        );

        fireEvent.click(await findByTestId(controlSelectors.nextBtn));

        await waitFor(() => {
          expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
            INEXPERIENCED_FLOW_NEXT,
            {
              companyName: userMock.company.name,
              primarySector: userMock.company.companySectors[0].sector.name,
              emissionType: CorporateEmissionType.BASELINE,
              currentStep: InexperiencedFlowSteps.SUMMARY,
            }
          );
        });
      });

      describe('when heat and cooling emissions contain a DEFRA grid factor', () => {
        it('should show a success toaster', async () => {
          jest.spyOn(toast, 'displaySuccessMessage');
          const expectedSuccessToastPayload = {
            title: 'Save successful',
          };

          const { getByTestId } = setup(
            {
              wizardState: getWizardState({
                [EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR]: baselineYear,
                stationaryCombustionTotal,
                heatCoolingSources: [
                  {
                    [ROW_FIELD_KEYS.GRID_FACTOR_TYPE]: {
                      value: HeatCoolingGridTypes.DEFRA,
                      label: 'DEFRA',
                    },
                    [ROW_FIELD_KEYS.AMOUNT]: 100,
                    [ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR]: 1.5,
                  },
                ],
              }),
            },
            [
              getCreateBaselineMock({
                year: baselineYear,
                scope1: stationaryCombustionTotal,
                companyId: userMock.company.id,
                scope2Type: Scope2Type.LOCATION,
              }),
            ]
          );

          fireEvent.click(getByTestId(controlSelectors.nextBtn));

          await waitFor(() => {
            expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
              expectedSuccessToastPayload
            );
          });
        });
      });

      describe('when electricity emissions contain a location grid factor', () => {
        it('should show a success toaster', async () => {
          jest.spyOn(toast, 'displaySuccessMessage');
          const expectedSuccessToastPayload = {
            title: 'Save successful',
          };

          const { getByTestId } = setup(
            {
              wizardState: getWizardState({
                [EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR]: baselineYear,
                stationaryCombustionTotal,
                electricitySources: [
                  {
                    [ROW_FIELD_KEYS.GRID_FACTOR_TYPE]: {
                      value: ElectricityGridTypes.LOCATION,
                      label: 'By country',
                    },
                    [ROW_FIELD_KEYS.AMOUNT]: 100,
                    [ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR]: 1.5,
                    [ROW_FIELD_KEYS.GRID_LOCATION]: {
                      value: ElectricityLocationGridNames.LITHUANIA,
                      label: 'Lithuania',
                    },
                  },
                ],
              }),
            },
            [
              getCreateBaselineMock({
                year: baselineYear,
                scope1: stationaryCombustionTotal,
                companyId: userMock.company.id,
                scope2Type: Scope2Type.LOCATION,
              }),
            ]
          );

          fireEvent.click(getByTestId(controlSelectors.nextBtn));

          await waitFor(() => {
            expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
              expectedSuccessToastPayload
            );
          });
        });
      });
    });

    describe('when baseline fails to be created', () => {
      it('should show an error toaster', async () => {
        jest.spyOn(toast, 'displayErrorMessage');
        const expectedErrorToastPayload = {
          title: 'Save unsuccessful',
        };

        const { getByTestId } = setup(
          {
            wizardState: getWizardState({
              [EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR]: baselineYear,
              stationaryCombustionTotal,
            }),
          },
          [
            getCreateBaselineErrorMock({
              year: baselineYear,
              scope1: stationaryCombustionTotal,
              companyId: userMock.company.id,
            }),
          ]
        );

        fireEvent.click(getByTestId(controlSelectors.nextBtn));

        await waitFor(() => {
          expect(toast.displayErrorMessage).toHaveBeenCalledWith(
            expectedErrorToastPayload
          );
        });
      });
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
            currentStep: InexperiencedFlowSteps.SUMMARY,
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
            currentStep: InexperiencedFlowSteps.SUMMARY,
          }
        );
      });
    });
  });
});
