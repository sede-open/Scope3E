import { MockedProvider } from '@apollo/client/testing';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';
import { mocked } from 'jest-mock';
import * as CorporateEmissionsMocks from 'mocks/corporateEmissions';
import * as meMocks from 'mocks/me';
import I18nProvider from 'next-translate/I18nProvider';
import * as toast from 'utils/toast';
import { ValueChain } from '.';
import commonNamespace from '../../../locales/en/common.json';
import corporateEmissionFormNamespace from '../../../locales/en/corporateEmissionForm.json';
import valueChainNamespace from '../../../locales/en/valueChain.json';
import { ValueChainRoutes } from './constants';
import { Customers } from './Customers';
import { AllocateEmissionsForm } from './Customers/AllocateEmissionsForm';
import { FormType } from './types';

jest.mock('./Customers/AllocateEmissionsForm');
jest.mock('./Customers');
jest.mock('utils/toast');
const mockedAllocationForm = mocked(AllocateEmissionsForm);
const customerMock = mocked(Customers);

describe('Value Chain Customer Modal', () => {
  beforeEach(() => {
    resetLDMocks();
    mockFlags({ isValueChainCommunityBannerEnabled: false });
  });
  mockedAllocationForm.mockImplementation(({ onSuccess }) => {
    return (
      <div>
        <button
          data-testid="mocked-modal-button"
          type="button"
          onClick={() => onSuccess()}
        >
          Close
        </button>
      </div>
    );
  });
  const setup = () => {
    const corporateEmissionsMock = CorporateEmissionsMocks.getCorporateEmissions(
      [
        {
          id: 'emission-0',
          scope1: 1000,
          scope2: 1000,
          scope3: 1000,
          offset: 1000,
          year: 2020,
        },
      ]
    );
    return render(
      <I18nProvider
        namespaces={{
          valueChain: valueChainNamespace,
          common: commonNamespace,
          corporateEmissionForm: corporateEmissionFormNamespace,
        }}
      >
        <MockedProvider
          mocks={[corporateEmissionsMock, meMocks.getGetMeMock()]}
          addTypename={false}
        >
          <AuthenticatedUserProvider>
            <ModalProvider>
              <ValueChain selectedTab={ValueChainRoutes.Customers} />
            </ModalProvider>
          </AuthenticatedUserProvider>
        </MockedProvider>
      </I18nProvider>
    );
  };
  describe('when emission is created', () => {
    beforeAll(() => {
      customerMock.mockReset();
      customerMock.mockImplementation(({ setModalState }) => {
        return (
          <div>
            <button
              type="button"
              data-testid="open-modal-button"
              onClick={() =>
                setModalState({
                  isOpen: true,
                  formType: FormType.ALLOCATE_EMISSIONS,
                  allocateEmissionsFormProps: {
                    isEditing: false,
                    selectedYear: 2020,
                  },
                })
              }
            >
              Open Modal
            </button>
          </div>
        );
      });
    });
    it('should open cta modal when emission is allocated', async () => {
      const { findByTestId } = setup();
      const openButton = await findByTestId('open-modal-button');
      await act(async () => {
        await userEvent.click(openButton);
        const cal = await findByTestId('mocked-modal-button');
        await userEvent.click(cal);
      });
      const dismissButton = await findByTestId('dismiss-selector');
      expect(dismissButton).toBeInTheDocument();
    });

    it('should show toaster message once modal closed with dismiss button', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const expectedSuccessToastPayload = {
        title: 'Emissions successfully allocated to customer',
        subtitle:
          'You will receive an email when they accept or reject the emissions',
      };
      const { findByTestId } = setup();
      const openButton = await findByTestId('open-modal-button');
      // open allocation emission form modal
      await userEvent.click(openButton);
      await act(async () => {
        // close allocation emission modal with onSuccess, triggers displaying of Emission allocation Modal
        await userEvent.click(await findByTestId('mocked-modal-button'));
      });
      // Dismiss emission allocation modal.
      const dismissButton = await findByTestId('dismiss-selector');
      await act(async () => {
        await userEvent.click(dismissButton);
        await userEvent.click(openButton);
        await userEvent.click(await findByTestId('mocked-modal-button'));
      });
      expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
        expectedSuccessToastPayload
      );
    });
  });

  describe('when emission is updated', () => {
    beforeAll(() => {
      customerMock.mockReset();
      customerMock.mockImplementation(({ setModalState }) => {
        return (
          <div>
            <button
              type="button"
              data-testid="open-modal-button"
              onClick={() =>
                setModalState({
                  isOpen: true,
                  formType: FormType.ALLOCATE_EMISSIONS,
                  allocateEmissionsFormProps: {
                    isEditing: true,
                    selectedYear: 2020,
                  },
                })
              }
            >
              Open Modal
            </button>
          </div>
        );
      });
    });

    it('should display success toastr', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const expectedSuccessToastPayload = {
        title: 'Emissions updated and allocated to customer',
        subtitle:
          'You will receive an email when they accept or reject the emissions',
      };
      const { findByTestId } = setup();
      await act(async () => {
        const openButton = await findByTestId('open-modal-button');
        await userEvent.click(openButton);
        await userEvent.click(await findByTestId('mocked-modal-button'));
      });
      expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
        expectedSuccessToastPayload
      );
    });
  });
});
