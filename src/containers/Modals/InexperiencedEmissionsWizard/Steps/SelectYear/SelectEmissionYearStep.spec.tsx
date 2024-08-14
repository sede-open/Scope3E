import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { CorporateEmissionType } from 'types/globalTypes';
import * as analyticsEvents from 'utils/analytics';
import { SelectYearStepQuery_corporateEmissions as Emission } from 'types/SelectYearStepQuery';
import {
  INEXPERIENCED_FLOW_CANCEL,
  INEXPERIENCED_FLOW_NEXT,
} from 'utils/analyticsEvents';
import * as controlSelectors from 'components/Wizard/WizardControls/selectors';
import * as meMocks from 'mocks/me';
import { baseMe } from 'mocks/me';
import * as inexperiencedFlowMocks from 'mocks/inexperiencedFlow';
import inexperiencedUserFlowNamespace from '../../../../../../locales/en/inexperiencedFlow.json';

import { SelectYear } from '.';
import { IProps } from './utils';
import * as selectors from '../../selectors';
import { getInitialWizardState } from '../../utils';
import { InexperiencedFlowSteps } from '../../types';

const emptyEmissionMock = inexperiencedFlowMocks.getSelectYearStepQueryMock({
  corporateEmissions: [],
});

const getEmission = (
  year: number,
  formType: CorporateEmissionType
): Emission => ({
  id: `some-id-${year}`,
  year,
  type: formType,
});

const existingEmissions = [
  getEmission(2016, CorporateEmissionType.BASELINE),
  getEmission(2017, CorporateEmissionType.ACTUAL),
  getEmission(2018, CorporateEmissionType.ACTUAL),
  getEmission(2020, CorporateEmissionType.ACTUAL),
] as Emission[];

const setup = (mocks: any, overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    onNext: jest.fn(),
    closeModal: jest.fn(),
    emissionType: CorporateEmissionType.BASELINE,
    wizardState: getInitialWizardState(),
    ...overrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        inexperiencedFlow: inexperiencedUserFlowNamespace,
      }}
    >
      <MockedProvider
        mocks={[meMocks.getGetMeMock(), ...mocks]}
        addTypename={false}
      >
        <AuthenticatedUserProvider>
          <SelectYear {...props} />
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );
};

describe('SelectYearStep', () => {
  it('should render BASELINE emission Select Year Step form content', async () => {
    const { findByTestId, findByLabelText } = setup([emptyEmissionMock], {
      emissionType: CorporateEmissionType.BASELINE,
    });
    const baselineYearInput = await findByLabelText('Baseline year');
    expect(baselineYearInput).toBeInTheDocument();
    expect(
      await findByTestId(selectors.emissionYearSelectForm)
    ).toBeInTheDocument();
  });

  it('should render ACTUAL emission Select Year Step form content', async () => {
    const { findByTestId, findByLabelText } = setup(
      [
        inexperiencedFlowMocks.getSelectYearStepQueryMock({
          corporateEmissions: [
            inexperiencedFlowMocks.corporateBaselineEmission,
          ],
        }),
      ],
      { emissionType: CorporateEmissionType.ACTUAL }
    );
    const actualEmissionYearInput = await findByLabelText('Submission year');
    expect(actualEmissionYearInput).toBeInTheDocument();
    expect(
      await findByTestId(selectors.emissionYearSelectForm)
    ).toBeInTheDocument();
  });

  describe('Select year dropdown', () => {
    describe('when attempting to select an existing emission year', () => {
      it('should not allow user to select year and proceed', async () => {
        const { findByTestId, findByLabelText } = setup(
          [
            inexperiencedFlowMocks.getSelectYearStepQueryMock({
              corporateEmissions: existingEmissions,
            }),
          ],
          { emissionType: CorporateEmissionType.ACTUAL }
        );

        const onNext = jest.fn();

        expect(
          await findByTestId(selectors.emissionYearSelectForm)
        ).toBeInTheDocument();

        const actualEmissionYearInput = await findByLabelText(
          'Submission year'
        );
        expect(actualEmissionYearInput).toBeInTheDocument();

        await selectEvent.select(
          actualEmissionYearInput,
          existingEmissions[1].year.toString()
        );

        fireEvent.click(await findByTestId(controlSelectors.nextBtn));

        await waitFor(() => {
          expect(onNext).not.toHaveBeenCalledWith(existingEmissions[1].year);
        });
      });
    });

    describe('when emission year is selected', () => {
      it('should allow the user to progress to the next step', async () => {
        const onNext = jest.fn();
        const year = new Date().getFullYear() - 1;

        const { findByLabelText, findByTestId } = setup([emptyEmissionMock], {
          onNext,
        });

        const baselineYearInput = await findByLabelText('Baseline year');
        await selectEvent.select(baselineYearInput, year.toString());

        fireEvent.click(await findByTestId(controlSelectors.nextBtn));

        await waitFor(() => {
          expect(onNext).toHaveBeenCalledWith({ year });
        });
      });
    });
  });

  describe('when cancel button is clicked', () => {
    it('should close the modal', async () => {
      const closeModal = jest.fn();

      const { findByTestId } = setup([emptyEmissionMock], { closeModal });

      fireEvent.click(await findByTestId(controlSelectors.cancelBtn));

      await waitFor(() => {
        expect(closeModal).toHaveBeenCalled();
      });
    });

    it('should track analytics event', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');
      const { findByTestId } = setup([emptyEmissionMock]);

      fireEvent.click(await findByTestId(controlSelectors.cancelBtn));

      await waitFor(() => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          INEXPERIENCED_FLOW_CANCEL,
          {
            companyName: baseMe.company!.name,
            primarySector: baseMe.company!.companySectors![0].sector.name,
            emissionType: CorporateEmissionType.BASELINE,
            currentStep: InexperiencedFlowSteps.SELECT_EMISSION_YEAR,
          }
        );
      });
    });
  });

  describe('when next button is clicked', () => {
    it('should track analytics event', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');
      const onNext = jest.fn();
      const year = new Date().getFullYear() - 1;

      const { findByLabelText, findByTestId } = setup([emptyEmissionMock], {
        onNext,
      });

      const baselineYearInput = await findByLabelText('Baseline year');
      await selectEvent.select(baselineYearInput, year.toString());

      fireEvent.click(await findByTestId(controlSelectors.nextBtn));

      await waitFor(() => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          INEXPERIENCED_FLOW_NEXT,
          {
            companyName: baseMe.company?.name,
            primarySector: baseMe.company!.companySectors![0].sector.name,
            emissionType: CorporateEmissionType.BASELINE,
            currentStep: InexperiencedFlowSteps.SELECT_EMISSION_YEAR,
          }
        );
      });
    });
  });
});
