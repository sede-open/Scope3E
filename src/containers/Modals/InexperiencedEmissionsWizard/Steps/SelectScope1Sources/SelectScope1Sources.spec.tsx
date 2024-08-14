import { fireEvent, render, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';

import { CompanySectorType, CorporateEmissionType } from 'types/globalTypes';
import * as analyticsEvents from 'utils/analytics';
import {
  INEXPERIENCED_FLOW_BACK,
  INEXPERIENCED_FLOW_CANCEL,
  INEXPERIENCED_FLOW_NEXT,
} from 'utils/analyticsEvents';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as controlSelectors from 'components/Wizard/WizardControls/selectors';

import inexperiencedUserFlowNamespace from '../../../../../../locales/en/inexperiencedFlow.json';
import * as selectors from '../../selectors';
import { getInitialWizardState } from '../../utils';
import { SelectScope1Sources, IProps } from '.';
import { InexperiencedFlowSteps } from '../../types';

jest.mock('effects/useAuthenticatedUser');

const setup = (overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    emissionType: CorporateEmissionType.BASELINE,
    onNext: jest.fn(),
    closeModal: jest.fn(),
    onBack: jest.fn(),
    wizardState: getInitialWizardState(),
    ...overrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        inexperiencedFlow: inexperiencedUserFlowNamespace,
      }}
    >
      <SelectScope1Sources {...props} />
    </I18nProvider>
  );
};

describe('SelectScope1Sources', () => {
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
            currentStep: InexperiencedFlowSteps.SELECT_SCOPE_1_SOURCES,
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
            currentStep: InexperiencedFlowSteps.SELECT_SCOPE_1_SOURCES,
          }
        );
      });
    });
  });

  describe('when next button is clicked', () => {
    it('should track analytics event', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');
      const { getByTestId, findByTestId } = setup();

      fireEvent.click(
        getByTestId(
          selectors.getLabelTestId(selectors.stationaryAndMobileCombustionInput)
        )
      );

      fireEvent.click(await findByTestId(controlSelectors.nextBtn));

      await waitFor(() => {
        expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
          INEXPERIENCED_FLOW_NEXT,
          {
            companyName: userMock.company.name,
            primarySector: userMock.company.companySectors[0].sector.name,
            emissionType: CorporateEmissionType.BASELINE,
            currentStep: InexperiencedFlowSteps.SELECT_SCOPE_1_SOURCES,
          }
        );
      });
    });
  });
});
