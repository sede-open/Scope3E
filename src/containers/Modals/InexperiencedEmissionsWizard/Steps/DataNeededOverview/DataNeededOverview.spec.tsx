import { fireEvent, render, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';

import { CompanySectorType, CorporateEmissionType } from 'types/globalTypes';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as controlSelectors from 'components/Wizard/WizardControls/selectors';
import * as analyticsEvents from 'utils/analytics';
import {
  INEXPERIENCED_FLOW_BACK,
  INEXPERIENCED_FLOW_CANCEL,
  INEXPERIENCED_FLOW_NEXT,
} from 'utils/analyticsEvents';

import inexperiencedUserFlowNamespace from '../../../../../../locales/en/inexperiencedFlow.json';
import * as selectors from '../../selectors';
import { getInitialWizardState } from '../../utils';
import {
  EMISSION_YEAR_FIELD_KEYS,
  InexperiencedFlowSteps,
  SCOPE_1_SOURCE_FIELD_KEYS,
  SCOPE_2_SOURCE_FIELD_KEYS,
} from '../../types';

import { DataNeededOverview, IProps } from '.';

jest.mock('effects/useAuthenticatedUser');

const year = 2020;

const initialWizardState = {
  ...getInitialWizardState(),
  [EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR]: year,
};

const setup = (overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    emissionType: CorporateEmissionType.BASELINE,
    closeModal: jest.fn(),
    onNext: jest.fn(),
    onBack: jest.fn(),
    wizardState: initialWizardState,
    ...overrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        inexperiencedFlow: inexperiencedUserFlowNamespace,
      }}
    >
      <DataNeededOverview {...props} />
    </I18nProvider>
  );
};

describe('DataNeededOverview', () => {
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

  it('should render', () => {
    const { getByTestId } = setup();
    expect(getByTestId(selectors.dataNeededOverview)).toBeInTheDocument();
  });

  it('should not render any data points if scope 1+2 selections are false', () => {
    const { queryByText } = setup();

    expect(queryByText(`Type of fuels (L) in ${year}`)).toBeNull();
    expect(queryByText(`Refrigerant (kg) used in ${year}`)).toBeNull();
    expect(queryByText(`Process emissions (tCO2e) in ${year}`)).toBeNull();
    expect(
      queryByText(`Electricity (kWh) purchased per country in ${year}`)
    ).toBeNull();
    expect(
      queryByText(`Heat and steam (kWh) purchased per country in ${year}`)
    ).toBeNull();
  });

  describe.each`
    wizardStateKey                                                   | dataPoint
    ${SCOPE_1_SOURCE_FIELD_KEYS.STATIONARY_MOBILE_COMBUSTION}        | ${`Type of fuels (L) in ${year}`}
    ${SCOPE_1_SOURCE_FIELD_KEYS.INDUSTRIAL_PROCESS_AND_REFRIGIRANTS} | ${`Refrigerant (kg) used in ${year}`}
    ${SCOPE_1_SOURCE_FIELD_KEYS.INDUSTRIAL_PROCESS_AND_REFRIGIRANTS} | ${`Process emissions (tCO2e) in ${year}`}
    ${SCOPE_2_SOURCE_FIELD_KEYS.PURCHASED_ELECTRICITY}               | ${`Electricity (kWh) purchased per country in ${year}`}
    ${SCOPE_2_SOURCE_FIELD_KEYS.PURCHASED_HEAT_COOLING}              | ${`Heat and steam (kWh) purchased per country in ${year}`}
  `(
    'when $wizardStateKey has been selected as an emission source',
    ({ wizardStateKey, dataPoint }) => {
      it('should render correct data point needed', () => {
        const { getByText } = setup({
          wizardState: {
            ...initialWizardState,
            [wizardStateKey]: true,
          },
        });

        expect(getByText(dataPoint)).toBeInTheDocument();
      });
    }
  );

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
            currentStep: InexperiencedFlowSteps.DATA_NEEDED_OVERVIEW,
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
            currentStep: InexperiencedFlowSteps.DATA_NEEDED_OVERVIEW,
          }
        );
      });
    });
  });

  describe('when next button is clicked', () => {
    it('should track analytics event', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');
      const { getByTestId } = setup();

      fireEvent.click(getByTestId(controlSelectors.nextBtn));

      await waitFor(() => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          INEXPERIENCED_FLOW_NEXT,
          {
            companyName: userMock.company.name,
            primarySector: userMock.company.companySectors[0].sector.name,
            emissionType: CorporateEmissionType.BASELINE,
            currentStep: InexperiencedFlowSteps.DATA_NEEDED_OVERVIEW,
          }
        );
      });
    });
  });
});
