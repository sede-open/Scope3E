import { MockedProvider } from '@apollo/client/testing';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import * as radioInputFieldSelectors from 'components/Form/Fields/RadioInputField/selectors';
import * as fileInputSelectors from 'components/InputFile/selectors';
import { ModalContentType } from 'containers/types';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { CarbonIntensityConfigProvider } from 'context/CarbonIntensityConfigProvider/CarbonIntensityConfigProvider';
import * as carbonIntensityMocks from 'mocks/carbonIntensity';
import { USER_COMPANY_ID, USER_COMPANY_NAME } from 'mocks/constants';
import * as corporateEmissionFormMocks from 'mocks/corporateEmissionForm';
import {
  createActualMockFull,
  createActualWithFileFailMock,
  createActualWithFileMock,
  createBaselineMockError,
  createBaselineMockFull,
  createBaselineMockRequired,
  updateBaselineMockFull,
  updateEmissionRemoveFileMock,
  updateEmissionWithFileMock,
  verificationFileMock,
} from 'mocks/emissions';
import * as meMocks from 'mocks/me';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';
import {
  AlizarinCrimson,
  Alto,
  CongressBlue,
  SilverChalice,
  Tundora,
} from 'styles/colours';
import {
  CarbonIntensityMetricType,
  CorporateEmissionType,
  EmissionAllocationDirection,
  EmissionAllocationMethod,
} from 'types/globalTypes';
import * as analyticsEvents from 'utils/analytics';
import { trackEvent } from 'utils/analytics';
import { SAVE_BASELINE_EXPERIENCED_FLOW } from 'utils/analyticsEvents';
import * as toast from 'utils/toast';
import { CorporateEmissionFormContainer } from '.';
import carbonIntensityNamespace from '../../../../locales/en/carbonIntensity.json';
import commonNamespace from '../../../../locales/en/common.json';
import corporateEmissionFormNamespace from '../../../../locales/en/corporateEmissionForm.json';
import formNamespace from '../../../../locales/en/form.json';
import { MAX_VERIFICATION_FILE_SIZE } from '../../../constants';
import * as carbonIntensitySelectors from './CarbonIntensities/selectors';
import * as selectors from './selectors';
import * as summaryCardSelectors from './SummaryCard/selectors';
import { getFormattedFieldValue, getNetEmissions } from './SummaryCard/utils';
import { VALUE_CHAIN_SUPPLIERS_TAB_ROUTE } from './utils';

const getEmissionAllocation = ({
  emissions,
  year,
}: {
  emissions: number;
  year: number;
}) => ({
  ...corporateEmissionFormMocks.emissionAllocation,
  allocationMethod: EmissionAllocationMethod.ECONOMICAL,
  id: '2FA2BE18-0E99-4F4D-815D-C66F143CFCB5',
  emissions,
  year,
});

const emptyEmissionAllocationMock = corporateEmissionFormMocks.getCorporateEmissionFormQueryMock(
  {
    corporateEmissions: [],
    emissionAllocations: [],
  }
);
const selectPrivacyTypeNo = async () => {
  const { findByTestId } = screen;
  const privateTypeNo = await findByTestId(selectors.privacyTypePrivate);
  fireEvent.click(privateTypeNo);
};
const setup = (mocks: any, overrides: any = {}) => {
  const props = {
    formType: ModalContentType.NEW_BASELINE,
    onNewBaselineSuccess: jest.fn(),
    closeModal: jest.fn(),
    emissions: [],
    ...overrides,
  };

  // scrollIntoView is not implemented in jsdom - fix to mock
  Element.prototype.scrollIntoView = jest.fn();

  return render(
    <I18nProvider
      namespaces={{
        common: commonNamespace,
        form: formNamespace,
        corporateEmissionForm: corporateEmissionFormNamespace,
        carbonIntensity: carbonIntensityNamespace,
      }}
    >
      <MockedProvider
        mocks={[
          meMocks.getGetMeMock(),
          carbonIntensityMocks.getCarbonIntensityConfigsMock(),
          ...mocks,
        ]}
        addTypename={false}
      >
        <AuthenticatedUserProvider>
          <CarbonIntensityConfigProvider>
            <CorporateEmissionFormContainer {...props} />
          </CarbonIntensityConfigProvider>
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );
};

describe('Emission Form', () => {
  const isFieldPopulated = true;

  const carbonIntensity = {
    type: CarbonIntensityMetricType.BUSINESS_TRAVEL_PER_PASSENGER_KM,
    value: 100,
  };

  it('should save emission when all fields have been filled in, but not call successful toast message when new baseline submission', async () => {
    const onNewBaselineSuccess = jest.fn();
    jest.spyOn(toast, 'displaySuccessMessage');

    const { findByTestId, findByLabelText } = setup(
      [
        emptyEmissionAllocationMock,
        createBaselineMockFull({
          carbonIntensities: [carbonIntensity],
          headCount: null,
        }),
      ],
      {
        onNewBaselineSuccess,
      }
    );

    await selectEvent.select(
      await findByLabelText('Baseline year'),
      corporateEmissionFormMocks.corporateEmission.year.toString()
    );

    expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

    await selectEvent.select(
      await findByLabelText('Select carbon intensity metric'),
      carbonIntensityNamespace[carbonIntensity.type]
    );

    fireEvent.change(
      await findByTestId(carbonIntensitySelectors.carbonIntensityValueInput),
      {
        target: {
          value: carbonIntensity.value,
        },
      }
    );

    await act(async () => {
      fireEvent.change(await findByTestId(selectors.scope1Input), {
        target: {
          value: corporateEmissionFormMocks.corporateEmission.scope1,
        },
      });
      fireEvent.change(await findByTestId(selectors.scope2Input), {
        target: {
          value: corporateEmissionFormMocks.corporateEmission.scope2,
        },
      });
      fireEvent.change(await findByTestId(selectors.scope3Input), {
        target: {
          value: corporateEmissionFormMocks.corporateEmission.scope3,
        },
      });
      fireEvent.change(await findByTestId(selectors.offsetInput), {
        target: {
          value: corporateEmissionFormMocks.corporateEmission.offset,
        },
      });

      await selectPrivacyTypeNo();
    });

    expect(toast.displaySuccessMessage).not.toHaveBeenCalled();

    await act(async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');
      fireEvent.click(await findByTestId(selectors.submitBtn));

      await waitFor(() => {
        expect(trackEvent).toHaveBeenCalledWith(
          ...[
            SAVE_BASELINE_EXPERIENCED_FLOW,
            {
              companyId: USER_COMPANY_ID,
              companyName: USER_COMPANY_NAME,
              emissionType: CorporateEmissionType.BASELINE,
            },
          ]
        );
      });
    });

    await waitFor(() => {
      expect(onNewBaselineSuccess).toHaveBeenCalledTimes(1);
      expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(0);
      expect(toast.displaySuccessMessage).not.toHaveBeenCalledWith(
        expect.objectContaining({
          title: commonNamespace['save-toast-success'],
        })
      );
    });
  });

  it('should save the new baseline emission when all required fields have been filled in but not call a successful toast message', async () => {
    const onNewBaselineSuccess = jest.fn();
    jest.spyOn(toast, 'displaySuccessMessage');
    const { findByTestId, findByLabelText } = setup(
      [emptyEmissionAllocationMock, createBaselineMockRequired],
      {
        onNewBaselineSuccess,
      }
    );
    expect(await findByTestId(selectors.submitBtn)).toBeDisabled();

    await selectEvent.select(
      await findByLabelText('Baseline year'),
      corporateEmissionFormMocks.corporateEmission.year.toString()
    );

    expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

    await act(async () => {
      fireEvent.change(await findByTestId(selectors.scope1Input), {
        target: {
          value: corporateEmissionFormMocks.corporateEmission.scope1,
        },
      });
      fireEvent.change(await findByTestId(selectors.scope2Input), {
        target: {
          value: corporateEmissionFormMocks.corporateEmission.scope2,
        },
      });

      await selectPrivacyTypeNo();
    });

    expect(toast.displaySuccessMessage).not.toHaveBeenCalledTimes(1);

    await act(async () => {
      fireEvent.click(await findByTestId(selectors.submitBtn));
    });

    await waitFor(() => {
      expect(onNewBaselineSuccess).toHaveBeenCalledTimes(1);
      expect(toast.displaySuccessMessage).not.toHaveBeenCalledTimes(1);
      expect(toast.displaySuccessMessage).not.toHaveBeenCalledWith(
        expect.objectContaining({
          title: commonNamespace['save-toast-success'],
        })
      );
    });
  });

  it('should show required errors when form submit is clicked', async () => {
    const onNewBaselineSuccess = jest.fn();
    const { findByTestId, findByLabelText } = setup(
      [emptyEmissionAllocationMock, createBaselineMockRequired],
      {
        onNewBaselineSuccess,
      }
    );
    expect(await findByTestId(selectors.submitBtn)).toBeDisabled();

    await selectEvent.select(
      await findByLabelText('Baseline year'),
      corporateEmissionFormMocks.corporateEmission.year.toString()
    );
    await act(async () => {
      fireEvent.click(await findByTestId(selectors.submitBtn));
    });

    const scope1Error = await findByTestId(`${selectors.scope1Input}-error`);
    expect(scope1Error.textContent).toBe(formNamespace['scope1-required']);
    expect(
      await findByTestId(`${selectors.scope2Input}-error`)
    ).toHaveTextContent(formNamespace['scope2-required']);
    expect(await findByTestId(selectors.scope1Input)).toHaveStyle(
      `border: 1px solid ${AlizarinCrimson}`
    );
    expect(await findByTestId(selectors.scope2Input)).toHaveStyle(
      `border: 1px solid ${AlizarinCrimson}`
    );
    expect(await findByTestId(selectors.scope1InputContainer)).toHaveStyle(
      `border: 1px solid ${AlizarinCrimson}`
    );
    expect(await findByTestId(selectors.scope2InputContainer)).toHaveStyle(
      `border: 1px solid ${AlizarinCrimson}`
    );
  });

  it('should show more than a billion error for scope 1, 2 and Offset inputs', async () => {
    const onNewBaselineSuccess = jest.fn();
    const { findByTestId, findByLabelText } = setup(
      [emptyEmissionAllocationMock, createBaselineMockFull()],
      {
        onNewBaselineSuccess,
      }
    );
    expect(await findByTestId(selectors.submitBtn)).toBeDisabled();
    await selectEvent.select(
      await findByLabelText('Baseline year'),
      corporateEmissionFormMocks.corporateEmission.year.toString()
    );

    expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

    await act(async () => {
      fireEvent.change(await findByTestId(selectors.scope1Input), {
        target: {
          value: 1_000_000_000_00,
        },
      });

      fireEvent.change(await findByTestId(selectors.scope2Input), {
        target: {
          value: 1_000_000_000_00,
        },
      });

      fireEvent.change(await findByTestId(selectors.offsetInput), {
        target: {
          value: 1_000_000_000_00,
        },
      });

      fireEvent.click(await findByTestId(selectors.submitBtn));
    });

    const scope1Error = await findByTestId(`${selectors.scope1Input}-error`);

    expect(formNamespace['error-less-than-billion']).toEqual(
      'Max value is a billion'
    );

    expect(scope1Error).toHaveTextContent(
      formNamespace['error-less-than-billion']
    );
    expect(
      await findByTestId(`${selectors.scope2Input}-error`)
    ).toHaveTextContent(formNamespace['error-less-than-billion']);
    expect(
      await findByTestId(`${selectors.offsetInput}-error`)
    ).toHaveTextContent(formNamespace['error-less-than-billion']);
  });

  it('should show max value of a trillion error for scope 3 input', async () => {
    const onNewBaselineSuccess = jest.fn();
    const { findByTestId, findByLabelText } = setup(
      [emptyEmissionAllocationMock, createBaselineMockFull()],
      {
        onNewBaselineSuccess,
      }
    );
    expect(await findByTestId(selectors.submitBtn)).toBeDisabled();

    await selectEvent.select(
      await findByLabelText('Baseline year'),
      corporateEmissionFormMocks.corporateEmission.year.toString()
    );

    expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

    await act(async () => {
      fireEvent.change(await findByTestId(selectors.scope3Input), {
        target: {
          value: 1_000_000_000_001,
        },
      });

      fireEvent.click(await findByTestId(selectors.submitBtn));
    });

    expect(formNamespace['error-less-than-trillion']).toEqual(
      'Max value is a trillion'
    );

    expect(
      await findByTestId(`${selectors.scope3Input}-error`)
    ).toHaveTextContent(formNamespace['error-less-than-trillion']);
  });

  it('should display API error on failed submission', async () => {
    const onNewBaselineSuccess = jest.fn();

    const { findByTestId, findByLabelText } = setup(
      [emptyEmissionAllocationMock, createBaselineMockError],
      {
        onNewBaselineSuccess,
      }
    );
    expect(await findByTestId(selectors.submitBtn)).toBeDisabled();

    await selectEvent.select(
      await findByLabelText('Baseline year'),
      corporateEmissionFormMocks.corporateEmission.year.toString()
    );

    expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

    await act(async () => {
      fireEvent.change(await findByTestId(selectors.scope1Input), {
        target: {
          value: corporateEmissionFormMocks.corporateEmission.scope1,
        },
      });
      fireEvent.change(await findByTestId(selectors.scope2Input), {
        target: {
          value: corporateEmissionFormMocks.corporateEmission.scope2,
        },
      });

      await selectPrivacyTypeNo();
      fireEvent.click(await findByTestId(selectors.submitBtn));
    });

    const apiError = await findByTestId(selectors.apiErrorYear);
    expect(apiError.textContent).toBe('Baseline exists');

    expect(await findByTestId(selectors.yearInputContainer)).toHaveStyle(
      `border: 1px solid ${AlizarinCrimson}`
    );
  });

  it('should call the error toast message when API error', async () => {
    const onNewBaselineSuccess = jest.fn();
    jest.spyOn(toast, 'displayErrorMessage');

    const { findByTestId, findByLabelText } = setup(
      [emptyEmissionAllocationMock, createBaselineMockError],
      {
        onNewBaselineSuccess,
      }
    );
    expect(await findByTestId(selectors.submitBtn)).toBeDisabled();

    await selectEvent.select(
      await findByLabelText('Baseline year'),
      corporateEmissionFormMocks.corporateEmission.year.toString()
    );

    expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

    await act(async () => {
      fireEvent.change(await findByTestId(selectors.scope1Input), {
        target: {
          value: corporateEmissionFormMocks.corporateEmission.scope1,
        },
      });
      fireEvent.change(await findByTestId(selectors.scope2Input), {
        target: {
          value: corporateEmissionFormMocks.corporateEmission.scope2,
        },
      });

      await selectPrivacyTypeNo();
    });

    expect(toast.displayErrorMessage).not.toHaveBeenCalledTimes(1);

    await act(async () => {
      fireEvent.click(await findByTestId(selectors.submitBtn));
    });

    const apiError = await findByTestId(selectors.apiErrorYear);
    expect(apiError.textContent).toBe('Baseline exists');

    await waitFor(() => {
      expect(toast.displayErrorMessage).toHaveBeenCalledTimes(1);
      expect(toast.displayErrorMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          title: commonNamespace['save-toast-error'],
        })
      );
    });
  });

  it('should trigger closeModal when cancel btn is clicked', async () => {
    const closeModal = jest.fn();
    const { findByTestId } = setup(
      [emptyEmissionAllocationMock, createBaselineMockError],
      {
        closeModal,
      }
    );

    await act(async () => {
      fireEvent.click(await findByTestId(selectors.cancelBtn));
    });

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('new actual form type', () => {
    it('should render correct title, subtitle and year label', async () => {
      const { findByTestId } = setup(
        [emptyEmissionAllocationMock, createBaselineMockFull()],
        {
          formType: ModalContentType.NEW_ACTUAL,
        }
      );

      expect(await findByTestId(selectors.title)).toHaveTextContent(
        'Add historical emissions data'
      );
      expect(await findByTestId(selectors.subtitle)).toHaveTextContent(
        'You can edit your data later and as often as you want'
      );
      expect(await findByTestId(selectors.yearLabel)).toHaveTextContent(
        'Submission year'
      );
    });

    it('should submit an actual emission and call successful toast message', async () => {
      const closeModal = jest.fn();
      const onNewActualSuccess = jest.fn();
      jest.spyOn(toast, 'displaySuccessMessage');

      const { findByTestId, findByLabelText } = setup(
        [
          emptyEmissionAllocationMock,
          createActualMockFull({
            carbonIntensities: [carbonIntensity],
            headCount: null,
          }),
        ],
        {
          onNewActualSuccess,
          closeModal,
          formType: ModalContentType.NEW_ACTUAL,
        }
      );

      await selectEvent.select(
        await findByLabelText('Select carbon intensity metric'),
        carbonIntensityNamespace[carbonIntensity.type]
      );

      fireEvent.change(
        await findByTestId(carbonIntensitySelectors.carbonIntensityValueInput),
        {
          target: {
            value: carbonIntensity.value,
          },
        }
      );

      await selectEvent.select(
        await findByLabelText('Submission year'),
        corporateEmissionFormMocks.corporateEmission.year.toString()
      );

      expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

      await act(async () => {
        fireEvent.change(await findByTestId(selectors.scope1Input), {
          target: {
            value: corporateEmissionFormMocks.corporateEmission.scope1,
          },
        });
        fireEvent.change(await findByTestId(selectors.scope2Input), {
          target: {
            value: corporateEmissionFormMocks.corporateEmission.scope2,
          },
        });
        fireEvent.change(await findByTestId(selectors.scope3Input), {
          target: {
            value: corporateEmissionFormMocks.corporateEmission.scope3,
          },
        });
        fireEvent.change(await findByTestId(selectors.offsetInput), {
          target: {
            value: corporateEmissionFormMocks.corporateEmission.offset,
          },
        });

        await selectPrivacyTypeNo();
      });

      expect(toast.displaySuccessMessage).not.toHaveBeenCalledTimes(1);

      await act(async () => {
        fireEvent.click(await findByTestId(selectors.submitBtn));
      });

      await waitFor(() => {
        expect(closeModal).toHaveBeenCalledTimes(1);
        expect(onNewActualSuccess).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: commonNamespace['save-toast-success'],
          })
        );
      });
    });
  });

  describe('edit actual form type', () => {
    it('should render correct title, subtitle and year label', async () => {
      const { findByTestId } = setup(
        [emptyEmissionAllocationMock, createActualMockFull()],
        {
          formType: ModalContentType.EDIT_ACTUAL,
        }
      );

      expect(await findByTestId(selectors.title)).toHaveTextContent(
        'Edit emission'
      );
      expect(await findByTestId(selectors.subtitle)).toHaveTextContent(
        'You can edit your data later and as often as you want'
      );
      expect(await findByTestId(selectors.yearLabel)).toHaveTextContent(
        'Select year to edit'
      );
    });

    it('should only enable all inputs when year has been selected', async () => {
      const {
        findByTestId,
        findByLabelText,
        getByTestId,
        getByLabelText,
      } = setup(
        [
          corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
            corporateEmissions: [
              {
                ...corporateEmissionFormMocks.corporateEmission,
                type: CorporateEmissionType.ACTUAL,
              },
            ],
          }),
          createBaselineMockFull(),
        ],
        {
          formType: ModalContentType.EDIT_ACTUAL,
        }
      );

      expect(await findByTestId(selectors.scope1Input)).toBeDisabled();
      expect(getByTestId(selectors.scope2Input)).toBeDisabled();
      expect(getByTestId(selectors.scope3Input)).toBeDisabled();
      expect(getByTestId(selectors.offsetInput)).toBeDisabled();
      expect(
        getByTestId(carbonIntensitySelectors.carbonIntensityValueInput)
      ).toBeDisabled();
      expect(getByLabelText('Select carbon intensity metric')).toBeDisabled();

      expect(getByTestId(selectors.submitBtn)).toBeDisabled();

      await selectEvent.select(
        await findByLabelText('Select year to edit'),
        corporateEmissionFormMocks.corporateEmission.year.toString()
      );

      expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

      expect(await findByTestId(selectors.scope1Input)).not.toBeDisabled();
      expect(await findByTestId(selectors.scope2Input)).not.toBeDisabled();
      expect(await findByTestId(selectors.scope3Input)).not.toBeDisabled();
      expect(await findByTestId(selectors.offsetInput)).not.toBeDisabled();
      expect(
        getByTestId(carbonIntensitySelectors.carbonIntensityValueInput)
      ).not.toBeDisabled();
      expect(
        getByLabelText('Select carbon intensity metric')
      ).not.toBeDisabled();
    });
  });

  describe('edit baseline', () => {
    it('should populate form data with baseline values', async () => {
      const closeModal = jest.fn();
      const { findByTestId } = setup(
        [
          corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
            corporateEmissions: [corporateEmissionFormMocks.corporateEmission],
          }),
          updateBaselineMockFull,
        ],
        {
          closeModal,
          formType: ModalContentType.EDIT_BASELINE,
        }
      );

      expect(
        ((await findByTestId(selectors.scope1Input)) as HTMLInputElement).value
      ).toBe('1,111.00');
      expect(
        ((await findByTestId(selectors.scope2Input)) as HTMLInputElement).value
      ).toBe('2,222.00');
      expect(
        ((await findByTestId(selectors.scope3Input)) as HTMLInputElement).value
      ).toBe('3,333.00');
      expect(
        ((await findByTestId(selectors.offsetInput)) as HTMLInputElement).value
      ).toBe('4,444.00');

      const scope2LocationLabel = await findByTestId(
        radioInputFieldSelectors.getLabelSelector(
          selectors.scope2LocationRadioBtn
        )
      );

      await act(async () => {
        fireEvent.click(scope2LocationLabel);

        fireEvent.click(await findByTestId(selectors.submitBtn));
      });

      await waitFor(() => expect(closeModal).toHaveBeenCalled());
    });

    it('should update and save the emission when all required fields are filled and call a successful toast message ', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const closeModal = jest.fn();
      const { findByTestId } = setup(
        [
          corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
            corporateEmissions: [corporateEmissionFormMocks.corporateEmission],
          }),
          updateBaselineMockFull,
        ],
        {
          closeModal,
          formType: ModalContentType.EDIT_BASELINE,
        }
      );

      expect(toast.displaySuccessMessage).not.toHaveBeenCalledTimes(1);

      const scope2LocationLabel = await findByTestId(
        radioInputFieldSelectors.getLabelSelector(
          selectors.scope2LocationRadioBtn
        )
      );

      await act(async () => {
        fireEvent.click(scope2LocationLabel);
        await selectPrivacyTypeNo();
      });

      await act(async () => {
        fireEvent.click(await findByTestId(selectors.submitBtn));
      });

      await waitFor(() => {
        expect(closeModal).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: commonNamespace['save-toast-success'],
          })
        );
      });
    });
  });

  describe('Emission form information labels, sublabels and content', () => {
    it('should render scope 1 label and sublabel', async () => {
      const onNewBaselineSuccess = jest.fn();
      const { findByTestId } = setup(
        [emptyEmissionAllocationMock, createBaselineMockRequired],
        {
          onNewBaselineSuccess,
        }
      );

      const scope1Label = await findByTestId(`${selectors.scope1Input}-label`);
      expect(scope1Label).toBeVisible();

      const scope1SubLabel = await findByTestId(
        `${selectors.scope1Input}-sublabel`
      );
      expect(scope1SubLabel).toBeVisible();
    });

    it('should render scope 2 label and sublabel', async () => {
      const onNewBaselineSuccess = jest.fn();
      const { findByTestId } = setup(
        [emptyEmissionAllocationMock, createBaselineMockRequired],
        {
          onNewBaselineSuccess,
        }
      );

      const scope2Label = await findByTestId(`${selectors.scope2Input}-label`);
      expect(scope2Label).toBeVisible();

      const scope2SubLabel = await findByTestId(
        `${selectors.scope2Input}-sublabel`
      );
      expect(scope2SubLabel).toBeVisible();
    });

    it('should render scope 3 label and sublabel', async () => {
      const onNewBaselineSuccess = jest.fn();
      const { findByTestId } = setup(
        [emptyEmissionAllocationMock, createBaselineMockRequired],
        {
          onNewBaselineSuccess,
        }
      );
      const scope3Label = await findByTestId(`${selectors.scope3Input}-label`);
      expect(scope3Label).toBeVisible();

      const scope3SubLabel = await findByTestId(
        `${selectors.scope3Input}-sublabel`
      );
      expect(scope3SubLabel).toBeVisible();
    });

    it('should render value chain suppliers tab link in scope 3 sub label link content', async () => {
      const onNewBaselineSuccess = jest.fn();
      const { findByTestId } = setup(
        [emptyEmissionAllocationMock, createBaselineMockRequired],
        {
          onNewBaselineSuccess,
        }
      );
      const scope3SubLabelLink = await findByTestId(
        selectors.scope3SubLabelLink
      );
      expect(scope3SubLabelLink).toBeVisible();
      expect(scope3SubLabelLink).toHaveAttribute(
        'href',
        VALUE_CHAIN_SUPPLIERS_TAB_ROUTE
      );
    });

    it('should render offset label and sublabel', async () => {
      const onNewBaselineSuccess = jest.fn();
      const { findByTestId } = setup(
        [emptyEmissionAllocationMock, createBaselineMockRequired],
        {
          onNewBaselineSuccess,
        }
      );

      const offsetLabel = await findByTestId(`${selectors.offsetInput}-label`);
      expect(offsetLabel).toBeVisible();

      const offsetSubLabel = await findByTestId(
        `${selectors.offsetInput}-sublabel`
      );
      expect(offsetSubLabel).toBeVisible();
    });
  });

  describe('when uploading a verification file', () => {
    describe('when upload is successful', () => {
      const file = new File(['(⌐□_□)'], verificationFileMock.originalFilename, {
        type: 'application/pdf',
      });

      beforeEach(() => {
        global.fetch = jest.fn();
        ((global.fetch as unknown) as jest.Mock).mockResolvedValue({
          ok: true,
          json: () => verificationFileMock,
        });
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should create a new emission with a new uploaded file', async () => {
        const closeModal = jest.fn();
        jest.spyOn(toast, 'displaySuccessMessage');

        const { findByTestId, findByText, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createActualWithFileMock],
          {
            formType: ModalContentType.NEW_ACTUAL,
            closeModal,
          }
        );

        await selectEvent.select(
          await findByLabelText('Submission year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

        const fileInput = await findByTestId(
          `${selectors.verificationInput}${fileInputSelectors.input}`
        );
        Object.defineProperty(fileInput, 'files', {
          value: [file],
        });

        await act(async () => {
          fireEvent.change(fileInput);

          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope1,
            },
          });

          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope2,
            },
          });

          await selectPrivacyTypeNo();
        });

        expect(await findByText(file.name)).toBeInTheDocument();

        await act(async () => {
          fireEvent.click(await findByTestId(selectors.submitBtn));
        });

        await waitFor(() => {
          expect(closeModal).toHaveBeenCalledTimes(1);
          expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
          expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
            expect.objectContaining({
              title: commonNamespace['save-toast-success'],
            })
          );
        });
      });

      describe('when emission mutation fails the first time', () => {
        it('should re-use the already uploaded file', async () => {
          const closeModal = jest.fn();
          jest.spyOn(toast, 'displaySuccessMessage');
          jest.spyOn(toast, 'displayErrorMessage');

          const { findByTestId, findByText, findByLabelText } = setup(
            [
              emptyEmissionAllocationMock,
              createActualWithFileFailMock,
              createActualWithFileMock,
            ],
            {
              formType: ModalContentType.NEW_ACTUAL,
              closeModal,
            }
          );

          await selectEvent.select(
            await findByLabelText('Submission year'),
            corporateEmissionFormMocks.corporateEmission.year.toString()
          );

          expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

          const fileInput = await findByTestId(
            `${selectors.verificationInput}${fileInputSelectors.input}`
          );
          Object.defineProperty(fileInput, 'files', {
            value: [file],
          });

          await act(async () => {
            fireEvent.change(fileInput);

            fireEvent.change(await findByTestId(selectors.scope1Input), {
              target: {
                value: corporateEmissionFormMocks.corporateEmission.scope1,
              },
            });

            fireEvent.change(await findByTestId(selectors.scope2Input), {
              target: {
                value: corporateEmissionFormMocks.corporateEmission.scope2,
              },
            });
            await selectPrivacyTypeNo();
          });

          expect(await findByText(file.name)).toBeInTheDocument();

          const submitBtn = await findByTestId(selectors.submitBtn);

          act(() => {
            fireEvent.click(submitBtn);
          });

          await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(toast.displayErrorMessage).toHaveBeenCalledTimes(1);
            expect(toast.displayErrorMessage).toHaveBeenCalledWith({
              title: commonNamespace['save-toast-error'],
            });
          });

          act(() => {
            fireEvent.click(submitBtn);
          });

          await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(closeModal).toHaveBeenCalledTimes(1);
            expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
            expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
              expect.objectContaining({
                title: commonNamespace['save-toast-success'],
              })
            );
          });
        });
      });

      it.each`
        emissionType                      | formType
        ${CorporateEmissionType.ACTUAL}   | ${ModalContentType.EDIT_ACTUAL}
        ${CorporateEmissionType.BASELINE} | ${ModalContentType.EDIT_BASELINE}
      `(
        'should replace an existing verification file when editing $emissionType',
        async ({
          emissionType,
          formType,
        }: {
          emissionType: CorporateEmissionType;
          formType:
            | ModalContentType.EDIT_ACTUAL
            | ModalContentType.EDIT_BASELINE;
        }) => {
          const closeModal = jest.fn();
          jest.spyOn(toast, 'displaySuccessMessage');

          const emissionWithFile = {
            ...corporateEmissionFormMocks.corporateEmission,
            verificationFile: {
              id: '1233455555',
              originalFilename: 'original.pdf',
            },
            type: emissionType,
          };

          updateEmissionWithFileMock.request.variables.input.type = emissionType;
          updateEmissionWithFileMock.result.data.updateEmission.type = emissionType;

          const { findByTestId, findByText, findByLabelText } = setup(
            [
              corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
                corporateEmissions: [emissionWithFile],
              }),
              updateEmissionWithFileMock,
            ],
            {
              formType,
              closeModal,
            }
          );

          const getYearLabel = () =>
            formType === ModalContentType.EDIT_ACTUAL
              ? 'Select year to edit'
              : 'Baseline year';

          await selectEvent.select(
            await findByLabelText(getYearLabel()),
            corporateEmissionFormMocks.corporateEmission.year.toString()
          );

          expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

          await act(async () => {
            fireEvent.click(
              await findByTestId(
                `${selectors.verificationInput}${fileInputSelectors.deleteButton}`
              )
            );
          });

          expect(
            await findByText(commonNamespace['no-file-selected'])
          ).toBeInTheDocument();

          const fileInput = await findByTestId(
            `${selectors.verificationInput}${fileInputSelectors.input}`
          );

          Object.defineProperty(fileInput, 'files', {
            value: [file],
          });

          await act(async () => {
            fireEvent.change(fileInput);

            fireEvent.change(await findByTestId(selectors.scope1Input), {
              target: {
                value: corporateEmissionFormMocks.corporateEmission.scope1,
              },
            });

            fireEvent.change(await findByTestId(selectors.scope2Input), {
              target: {
                value: corporateEmissionFormMocks.corporateEmission.scope2,
              },
            });

            fireEvent.click(await findByTestId(selectors.submitBtn));
          });

          await waitFor(async () => {
            expect(await findByText(file.name)).toBeInTheDocument();
            expect(closeModal).toHaveBeenCalledTimes(1);
            expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
            expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
              expect.objectContaining({
                title: commonNamespace['save-toast-success'],
              })
            );
          });
        }
      );
    });

    describe('when uploading a file that is not a PDF', () => {
      it('should display an error message', async () => {
        const imageFile = new File(
          ['(⌐□_□)'],
          verificationFileMock.originalFilename,
          {
            type: 'image/png',
          }
        );

        const { findByText, findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, updateEmissionWithFileMock],
          {
            formType: ModalContentType.NEW_ACTUAL,
          }
        );

        await selectEvent.select(
          await findByLabelText('Submission year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

        const fileInput = await findByTestId(
          `${selectors.verificationInput}${fileInputSelectors.input}`
        );
        Object.defineProperty(fileInput, 'files', {
          value: [imageFile],
        });

        await act(async () => {
          fireEvent.change(fileInput);

          fireEvent.click(await findByTestId(selectors.submitBtn));
        });

        expect(
          await findByText(formNamespace['error-wrong-media-type'])
        ).toBeInTheDocument();
      });
    });

    describe('when uploading a file that is too large', () => {
      it('should display an error message', async () => {
        const largeFile = new File(
          ['(⌐□_□)'],
          verificationFileMock.originalFilename,
          {
            type: 'application/pdf',
          }
        );
        Object.defineProperty(largeFile, 'size', {
          value: MAX_VERIFICATION_FILE_SIZE + 10,
        });

        const { findByText, findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, updateEmissionWithFileMock],
          {
            formType: ModalContentType.NEW_ACTUAL,
          }
        );

        await selectEvent.select(
          await findByLabelText('Submission year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

        const fileInput = await findByTestId(
          `${selectors.verificationInput}${fileInputSelectors.input}`
        );
        Object.defineProperty(fileInput, 'files', {
          value: [largeFile],
        });

        await act(async () => {
          fireEvent.change(fileInput);

          fireEvent.click(await findByTestId(selectors.submitBtn));
        });

        expect(
          await findByText(formNamespace['error-large-file'])
        ).toBeInTheDocument();
      });
    });
  });

  describe('when removing an existing verification file', () => {
    it('should successfully remove the file', async () => {
      const closeModal = jest.fn();
      jest.spyOn(toast, 'displaySuccessMessage');

      const emissionWithFile = {
        ...corporateEmissionFormMocks.corporateEmission,
        verificationFile: {
          id: '1233455555',
          originalFilename: 'original.pdf',
        },
      };

      const { findByTestId, findByText, findByLabelText } = setup(
        [
          corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
            corporateEmissions: [emissionWithFile],
          }),
          updateEmissionRemoveFileMock,
        ],
        {
          formType: ModalContentType.EDIT_BASELINE,
          closeModal,
        }
      );

      await selectEvent.select(
        await findByLabelText('Baseline year'),
        corporateEmissionFormMocks.corporateEmission.year.toString()
      );

      expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();

      await act(async () => {
        fireEvent.click(
          await findByTestId(
            `${selectors.verificationInput}${fileInputSelectors.deleteButton}`
          )
        );
      });

      expect(
        await findByText(commonNamespace['no-file-selected'])
      ).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(await findByTestId(selectors.submitBtn));
      });

      await waitFor(() => {
        expect(closeModal).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: commonNamespace['save-toast-success'],
          })
        );
      });
    });
  });

  describe('when there are no emission allocations for the selected year', () => {
    it('should not display the scope 3 "min. value allowed" message', async () => {
      const { queryByTestId } = setup([
        emptyEmissionAllocationMock,
        createBaselineMockRequired,
      ]);

      await waitFor(() => {
        expect(
          queryByTestId(selectors.scope3MinimumMessage)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('when there are emission allocations for the selected year', () => {
    it('should display the scope 3 "min. value allowed" message', async () => {
      const selectedEmissionYear = 2020;
      const allocatedEmissions = 1000;

      const { findByTestId } = setup(
        [
          corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
            emissionAllocation:
              EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
            emissionAllocations: [
              getEmissionAllocation({
                emissions: allocatedEmissions / 2,
                year: selectedEmissionYear,
              }),
              getEmissionAllocation({
                emissions: allocatedEmissions / 2,
                year: selectedEmissionYear,
              }),
              getEmissionAllocation({
                emissions: 1234,
                year: selectedEmissionYear - 1,
              }),
            ],
          }),
          createBaselineMockRequired,
        ],
        {
          selectedEmissionYear,
        }
      );

      expect(
        await findByTestId(selectors.scope3MinimumMessage)
      ).toHaveTextContent(
        'min. value allowed due to supplier allocations: 1,000 tCO2e'
      );
    });

    it('should prevent a value under the minimum from being submitted', async () => {
      const selectedEmissionYear = 2020;
      const allocatedEmissions = 1000;

      const { findByTestId } = setup(
        [
          corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
            emissionAllocation:
              EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
            emissionAllocations: [
              getEmissionAllocation({
                emissions: allocatedEmissions,
                year: selectedEmissionYear,
              }),
            ],
          }),
          createBaselineMockRequired,
        ],
        {
          selectedEmissionYear,
        }
      );

      const scope1Input = await findByTestId(selectors.scope1Input);
      const scope2Input = await findByTestId(selectors.scope2Input);
      const scope3Input = await findByTestId(selectors.scope3Input);
      const submitButton = await findByTestId(selectors.submitBtn);

      await act(async () => {
        fireEvent.change(scope1Input, {
          target: {
            value: 123,
          },
        });
      });

      await act(async () => {
        fireEvent.change(scope2Input, {
          target: {
            value: 456,
          },
        });
      });

      await act(async () => {
        fireEvent.change(scope3Input, {
          target: {
            value: allocatedEmissions - 1,
          },
        });

        await waitFor(() => {
          expect(scope3Input).toHaveValue(`${allocatedEmissions - 1}.00`);
        });
      });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(submitButton).toHaveAttribute('disabled');

      await act(async () => {
        fireEvent.change(scope3Input, {
          target: {
            value: '1,000.00',
          },
        });

        await waitFor(() => {
          expect(scope3Input).toHaveValue('1,000.00');
        });
      });

      await waitFor(() => {
        expect(submitButton).not.toHaveAttribute('disabled');
      });
    });
  });

  describe('Corporate Emission Form Summary Card', () => {
    describe('Active state', () => {
      it('should duplicate and display form field values for scope1, scope2, scope3 and offsets', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope1,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope2,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope3,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.offset,
            },
          });
        });

        expect(
          await findByTestId(summaryCardSelectors.scope1Total)
        ).toHaveTextContent(
          getFormattedFieldValue(
            corporateEmissionFormMocks.corporateEmission.scope1,
            isFieldPopulated
          )
        );
        expect(
          await findByTestId(summaryCardSelectors.scope2Total)
        ).toHaveTextContent(
          getFormattedFieldValue(
            corporateEmissionFormMocks.corporateEmission.scope2,
            isFieldPopulated
          )
        );
        expect(
          await findByTestId(summaryCardSelectors.scope3Total)
        ).toHaveTextContent(
          getFormattedFieldValue(
            corporateEmissionFormMocks.corporateEmission.scope3,
            isFieldPopulated
          )
        );
        expect(
          await findByTestId(summaryCardSelectors.offsetsTotal)
        ).toHaveTextContent(
          getFormattedFieldValue(
            corporateEmissionFormMocks.corporateEmission.offset,
            isFieldPopulated
          )
        );
      });

      it('should display total net emissions when values entered', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope1,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope2,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope3,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.offset,
            },
          });
        });

        const expectedTotalNetEmissionsValue = getNetEmissions(
          corporateEmissionFormMocks.corporateEmission
        );

        expect(
          await findByTestId(summaryCardSelectors.total)
        ).toHaveTextContent(
          getFormattedFieldValue(
            expectedTotalNetEmissionsValue,
            isFieldPopulated
          )
        );
      });

      it('should display 0 if field values exist and total is equal to 0', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmissionZeroNetTotal.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value:
                corporateEmissionFormMocks.corporateEmissionZeroNetTotal.scope1,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value:
                corporateEmissionFormMocks.corporateEmissionZeroNetTotal.scope2,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value:
                corporateEmissionFormMocks.corporateEmissionZeroNetTotal.scope3,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value:
                corporateEmissionFormMocks.corporateEmissionZeroNetTotal.offset,
            },
          });
        });

        const expectedTotalNetEmissionsValue = getNetEmissions(
          corporateEmissionFormMocks.corporateEmissionZeroNetTotal
        );

        expect(
          await findByTestId(summaryCardSelectors.total)
        ).toHaveTextContent(String(expectedTotalNetEmissionsValue));
      });

      it('should display "-" if field values have been removed and no longer exist', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope1,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope2,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope3,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.offset,
            },
          });
        });

        const expectedTotalNetEmissionsValue = getNetEmissions(
          corporateEmissionFormMocks.corporateEmission
        );

        expect(
          await findByTestId(summaryCardSelectors.total)
        ).toHaveTextContent(
          getFormattedFieldValue(
            expectedTotalNetEmissionsValue,
            isFieldPopulated
          )
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: '',
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: '',
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: '',
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: '',
            },
          });
        });

        expect(
          await findByTestId(summaryCardSelectors.total)
        ).toHaveTextContent('-');
      });

      it('should render 0 when emissions are equal to 0', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: 0,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: 0,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: 0,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: 0,
            },
          });
        });

        expect(
          await findByTestId(summaryCardSelectors.total)
        ).toHaveTextContent('0.00');
        expect(
          await findByTestId(summaryCardSelectors.scope1Total)
        ).toHaveTextContent('0.00');
        expect(
          await findByTestId(summaryCardSelectors.scope2Total)
        ).toHaveTextContent('0.00');
        expect(
          await findByTestId(summaryCardSelectors.scope3Total)
        ).toHaveTextContent('0.00');
        expect(
          await findByTestId(summaryCardSelectors.offsetsTotal)
        ).toHaveTextContent('0.00');
      });

      it('should render total as negative value if less than 0', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: 100,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: 100,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: 0,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: 300,
            },
          });
        });

        expect(
          await findByTestId(summaryCardSelectors.total)
        ).toHaveTextContent(`-100.00`);
        expect(
          await findByTestId(summaryCardSelectors.scope1Total)
        ).toHaveTextContent('100.00');
        expect(
          await findByTestId(summaryCardSelectors.scope2Total)
        ).toHaveTextContent('100.00');
        expect(
          await findByTestId(summaryCardSelectors.scope3Total)
        ).toHaveTextContent('0.00');
        expect(
          await findByTestId(summaryCardSelectors.offsetsTotal)
        ).toHaveTextContent('300.00');
      });

      it('should render emission total in tCO2e when it is less than 1,000,000,000', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: 25_000,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: 25_000,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: 25_000,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: 1_000,
            },
          });
        });

        expect(
          await findByTestId(summaryCardSelectors.totalUnits)
        ).toHaveTextContent('tCO2e');
      });

      it('should render emission in MtCO2e when it is equal to 1,000,000', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: 333_333.9,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: 333_333.33,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: 333_333.33,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: 0,
            },
          });
        });

        expect(
          await findByTestId(summaryCardSelectors.totalUnits)
        ).toHaveTextContent('MtCO2e');
      });

      it('should render emission in MtCO2e when it is more than 1,000,000', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: 10_333_333.9,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: 10_333_333.33,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: 10_333_333.33,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: 0,
            },
          });
        });

        expect(
          await findByTestId(summaryCardSelectors.totalUnits)
        ).toHaveTextContent('MtCO2e');
      });

      it('should render active state colors for scope1 field', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope1,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope2,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope3,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.offset,
            },
          });
        });

        expect(await findByTestId(summaryCardSelectors.scope1)).toHaveStyle(
          `border-left: 2px solid ${CongressBlue}`
        );
        expect(
          await findByTestId(summaryCardSelectors.scope1Title)
        ).toHaveStyle(`color: ${Tundora}`);
        expect(
          await findByTestId(summaryCardSelectors.scope1Units)
        ).toHaveStyle(`color: ${Tundora}`);
        expect(
          await findByTestId(summaryCardSelectors.scope1Total)
        ).toHaveStyle(`color: ${Tundora}`);
      });

      it('should render active state colors for scope2 field', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope1,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope2,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope3,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.offset,
            },
          });
        });

        expect(await findByTestId(summaryCardSelectors.scope2)).toHaveStyle(
          `border-left: 2px solid ${CongressBlue}`
        );
        expect(
          await findByTestId(summaryCardSelectors.scope2Title)
        ).toHaveStyle(`color: ${Tundora}`);
        expect(
          await findByTestId(summaryCardSelectors.scope2Units)
        ).toHaveStyle(`color: ${Tundora}`);
        expect(
          await findByTestId(summaryCardSelectors.scope2Total)
        ).toHaveStyle(`color: ${Tundora}`);
      });

      it('should render active state colors for scope3 field', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope1,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope2,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope3,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.offset,
            },
          });
        });

        expect(await findByTestId(summaryCardSelectors.scope3)).toHaveStyle(
          `border-left: 2px solid ${CongressBlue}`
        );
        expect(
          await findByTestId(summaryCardSelectors.scope3Title)
        ).toHaveStyle(`color: ${Tundora}`);
        expect(
          await findByTestId(summaryCardSelectors.scope3Units)
        ).toHaveStyle(`color: ${Tundora}`);
        expect(
          await findByTestId(summaryCardSelectors.scope3Total)
        ).toHaveStyle(`color: ${Tundora}`);
      });

      it('should render active state colors for scope1 field', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId, findByLabelText } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        await selectEvent.select(
          await findByLabelText('Baseline year'),
          corporateEmissionFormMocks.corporateEmission.year.toString()
        );

        await act(async () => {
          fireEvent.change(await findByTestId(selectors.scope1Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope1,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope2Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope2,
            },
          });
          fireEvent.change(await findByTestId(selectors.scope3Input), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.scope3,
            },
          });
          fireEvent.change(await findByTestId(selectors.offsetInput), {
            target: {
              value: corporateEmissionFormMocks.corporateEmission.offset,
            },
          });
        });

        expect(await findByTestId(summaryCardSelectors.offsets)).toHaveStyle(
          `border-left: 2px solid ${CongressBlue}`
        );
        expect(
          await findByTestId(summaryCardSelectors.offsetsTitle)
        ).toHaveStyle(`color: ${Tundora}`);
        expect(
          await findByTestId(summaryCardSelectors.offsetsUnits)
        ).toHaveStyle(`color: ${Tundora}`);
        expect(
          await findByTestId(summaryCardSelectors.offsetsTotal)
        ).toHaveStyle(`color: ${Tundora}`);
      });

      describe('when editing an emission', () => {
        it('should populate field data with values', async () => {
          const { findByTestId } = setup(
            [
              corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
                corporateEmissions: [
                  corporateEmissionFormMocks.corporateEmission,
                ],
              }),
              updateBaselineMockFull,
            ],
            {
              formType: ModalContentType.EDIT_BASELINE,
            }
          );

          const expectedTotalNetEmissionsValue = getNetEmissions(
            corporateEmissionFormMocks.corporateEmission
          );

          expect(
            await findByTestId(summaryCardSelectors.total)
          ).toHaveTextContent(
            getFormattedFieldValue(
              expectedTotalNetEmissionsValue,
              isFieldPopulated
            )
          );

          expect(
            await findByTestId(summaryCardSelectors.scope1Total)
          ).toHaveTextContent(
            getFormattedFieldValue(
              corporateEmissionFormMocks.corporateEmission.scope1,
              isFieldPopulated
            )
          );
          expect(
            await findByTestId(summaryCardSelectors.scope2Total)
          ).toHaveTextContent(
            getFormattedFieldValue(
              corporateEmissionFormMocks.corporateEmission.scope2,
              isFieldPopulated
            )
          );
          expect(
            await findByTestId(summaryCardSelectors.scope3Total)
          ).toHaveTextContent(
            getFormattedFieldValue(
              corporateEmissionFormMocks.corporateEmission.scope3,
              isFieldPopulated
            )
          );
          expect(
            await findByTestId(summaryCardSelectors.offsetsTotal)
          ).toHaveTextContent(
            getFormattedFieldValue(
              corporateEmissionFormMocks.corporateEmission.offset,
              isFieldPopulated
            )
          );
        });
      });
    });

    describe('Empty state', () => {
      it('should render "-" when emissions do not exist', async () => {
        const onNewBaselineSuccess = jest.fn();
        const { findByTestId } = setup(
          [emptyEmissionAllocationMock, createBaselineMockFull()],
          {
            onNewBaselineSuccess,
          }
        );

        expect(
          await findByTestId(summaryCardSelectors.total)
        ).toHaveTextContent('-');
        expect(
          await findByTestId(summaryCardSelectors.scope1Total)
        ).toHaveTextContent('-');
        expect(
          await findByTestId(summaryCardSelectors.scope2Total)
        ).toHaveTextContent('-');
        expect(
          await findByTestId(summaryCardSelectors.scope3Total)
        ).toHaveTextContent('-');
        expect(
          await findByTestId(summaryCardSelectors.offsetsTotal)
        ).toHaveTextContent('-');
      });
    });

    it('should render empty state colors for scope1 field', async () => {
      const onNewBaselineSuccess = jest.fn();
      const { findByTestId } = setup(
        [emptyEmissionAllocationMock, createBaselineMockFull()],
        {
          onNewBaselineSuccess,
        }
      );

      expect(await findByTestId(summaryCardSelectors.scope1)).toHaveStyle(
        `border-left: 2px solid ${Alto}`
      );
      expect(await findByTestId(summaryCardSelectors.scope1Title)).toHaveStyle(
        `color: ${SilverChalice}`
      );
      expect(await findByTestId(summaryCardSelectors.scope1Units)).toHaveStyle(
        `color: ${SilverChalice}`
      );
      expect(await findByTestId(summaryCardSelectors.scope1Total)).toHaveStyle(
        `color: ${SilverChalice}`
      );
    });

    it('should render empty state colors for scope2 field', async () => {
      const onNewBaselineSuccess = jest.fn();
      const { findByTestId } = setup(
        [emptyEmissionAllocationMock, createBaselineMockFull()],
        {
          onNewBaselineSuccess,
        }
      );

      expect(await findByTestId(summaryCardSelectors.scope2)).toHaveStyle(
        `border-left: 2px solid ${Alto}`
      );
      expect(await findByTestId(summaryCardSelectors.scope2Title)).toHaveStyle(
        `color: ${SilverChalice}`
      );
      expect(await findByTestId(summaryCardSelectors.scope2Units)).toHaveStyle(
        `color: ${SilverChalice}`
      );
      expect(await findByTestId(summaryCardSelectors.scope2Total)).toHaveStyle(
        `color: ${SilverChalice}`
      );
    });

    it('should render empty state colors for scope3 field', async () => {
      const onNewBaselineSuccess = jest.fn();
      const { findByTestId } = setup(
        [emptyEmissionAllocationMock, createBaselineMockFull()],
        {
          onNewBaselineSuccess,
        }
      );

      expect(await findByTestId(summaryCardSelectors.scope3)).toHaveStyle(
        `border-left: 2px solid ${Alto}`
      );
      expect(await findByTestId(summaryCardSelectors.scope3Title)).toHaveStyle(
        `color: ${SilverChalice}`
      );
      expect(await findByTestId(summaryCardSelectors.scope3Units)).toHaveStyle(
        `color: ${SilverChalice}`
      );
      expect(await findByTestId(summaryCardSelectors.scope3Total)).toHaveStyle(
        `color: ${SilverChalice}`
      );
    });

    it('should render empty state colors for offsets field', async () => {
      const onNewBaselineSuccess = jest.fn();
      const { findByTestId } = setup(
        [emptyEmissionAllocationMock, createBaselineMockFull()],
        {
          onNewBaselineSuccess,
        }
      );

      expect(await findByTestId(summaryCardSelectors.offsets)).toHaveStyle(
        `border-left: 2px solid ${Alto}`
      );
      expect(await findByTestId(summaryCardSelectors.offsetsTitle)).toHaveStyle(
        `color: ${SilverChalice}`
      );
      expect(await findByTestId(summaryCardSelectors.offsetsUnits)).toHaveStyle(
        `color: ${SilverChalice}`
      );
      expect(await findByTestId(summaryCardSelectors.offsetsTotal)).toHaveStyle(
        `color: ${SilverChalice}`
      );
    });
  });

  describe('carbon intensities', () => {
    it('should not be able to delete the first carbon intensity row', async () => {
      const { findByTestId, queryAllByTestId } = setup([], {});
      expect(await findByTestId(selectors.title)).toBeInTheDocument();
      expect(
        queryAllByTestId(carbonIntensitySelectors.carbonIntensityRowDeleteBtn)
      ).toHaveLength(0);
    });

    describe('when user clicks add new intensity metric button', () => {
      it('should add another carbon intensity row', async () => {
        const { findAllByTestId, getByTestId } = setup([], {});

        expect(
          await findAllByTestId(carbonIntensitySelectors.carbonIntensityRow)
        ).toHaveLength(1);

        fireEvent.click(
          getByTestId(carbonIntensitySelectors.carbonIntensityAddRowBtn)
        );

        expect(
          await findAllByTestId(carbonIntensitySelectors.carbonIntensityRow)
        ).toHaveLength(2);
      });
    });

    describe('when more than one row has added', () => {
      it('should allow the user to delete second and later rows', async () => {
        const { findAllByTestId, findByText } = setup([], {});

        fireEvent.click(await findByText('Add another measure of activity'));
        fireEvent.click(await findByText('Add another measure of activity'));

        expect(
          await findAllByTestId(carbonIntensitySelectors.carbonIntensityRow)
        ).toHaveLength(3);

        const deleteIntensityBtns = await findAllByTestId(
          carbonIntensitySelectors.carbonIntensityRowDeleteBtn
        );

        expect(deleteIntensityBtns).toHaveLength(2);

        fireEvent.click(deleteIntensityBtns[1]);
        fireEvent.click(deleteIntensityBtns[0]);

        expect(
          await findAllByTestId(carbonIntensitySelectors.carbonIntensityRow)
        ).toHaveLength(1);
      });
    });

    describe('when user has a row for each type of carbon intensity', () => {
      it('should not display add carbon intensity row button', async () => {
        const { findAllByTestId, queryByTestId } = setup(
          [
            corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
              corporateEmissions: [
                {
                  ...corporateEmissionFormMocks.corporateEmission,
                  carbonIntensities: carbonIntensityMocks.carbonIntensityConfig.map(
                    (config) => ({
                      intensityMetric: config.type,
                      intensityValue: 1,
                    })
                  ),
                  type: CorporateEmissionType.BASELINE,
                },
              ],
              emissionAllocations: [],
            }),
          ],
          {
            formType: ModalContentType.EDIT_BASELINE,
          }
        );

        expect(
          await findAllByTestId(carbonIntensitySelectors.carbonIntensityRow)
        ).toHaveLength(carbonIntensityMocks.carbonIntensityConfig.length);

        expect(
          queryByTestId(carbonIntensitySelectors.carbonIntensityAddRowBtn)
        ).toBeNull();
      });
    });

    describe.each`
      formType
      ${ModalContentType.NEW_BASELINE}
      ${ModalContentType.NEW_ACTUAL}
    `(
      'when form is of type $formType',
      ({ formType }: { formType: ModalContentType }) => {
        it('should display one carbon intensity row by default', async () => {
          const { findAllByTestId } = setup([], {
            formType,
          });

          expect(
            await findAllByTestId(carbonIntensitySelectors.carbonIntensityRow)
          ).toHaveLength(1);
        });
      }
    );

    const { carbonIntensityConfig } = carbonIntensityMocks;
    const carbonIntensities = [
      carbonIntensityConfig[0],
      carbonIntensityConfig[1],
    ].map((config) => ({
      intensityMetric: config.type,
      intensityValue: 1,
    }));

    describe('when form is of type EDIT_BASELINE', () => {
      describe('when the existing emission does not have any carbon intensities', () => {
        it('should display one carbon intensity option as default', async () => {
          const { findAllByTestId } = setup(
            [
              corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
                corporateEmissions: [
                  {
                    ...corporateEmissionFormMocks.corporateEmission,
                    carbonIntensities: [],
                    type: CorporateEmissionType.BASELINE,
                  },
                ],
              }),
            ],
            {
              formType: ModalContentType.EDIT_BASELINE,
            }
          );

          expect(
            await findAllByTestId(carbonIntensitySelectors.carbonIntensityRow)
          ).toHaveLength(1);
        });
      });

      describe('when the existing emission has carbon intensities', () => {
        it('should display all of their values in different rows', async () => {
          const { findAllByTestId } = setup(
            [
              corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
                corporateEmissions: [
                  {
                    ...corporateEmissionFormMocks.corporateEmission,
                    carbonIntensities,
                    type: CorporateEmissionType.BASELINE,
                  },
                ],
              }),
            ],
            {
              formType: ModalContentType.EDIT_BASELINE,
            }
          );

          expect(
            await findAllByTestId(carbonIntensitySelectors.carbonIntensityRow)
          ).toHaveLength(carbonIntensities.length);
        });
      });
    });

    describe('when form is of type EDIT_ACTUAL', () => {
      describe('when the existing emission does not have any carbon intensities', () => {
        it('should display one carbon intensity option as default', async () => {
          const { findAllByTestId } = setup(
            [
              corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
                corporateEmissions: [
                  {
                    ...corporateEmissionFormMocks.corporateEmission,
                    carbonIntensities: [],
                    type: CorporateEmissionType.ACTUAL,
                  },
                ],
              }),
            ],
            {
              formType: ModalContentType.EDIT_ACTUAL,
            }
          );

          expect(
            await findAllByTestId(carbonIntensitySelectors.carbonIntensityRow)
          ).toHaveLength(1);
        });
      });

      describe('when the existing emission has carbon intensities', () => {
        it('should display all of their values in different rows', async () => {
          const { findAllByTestId, findByLabelText } = setup(
            [
              corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
                corporateEmissions: [
                  {
                    ...corporateEmissionFormMocks.corporateEmission,
                    carbonIntensities,
                    type: CorporateEmissionType.ACTUAL,
                  },
                ],
              }),
            ],
            {
              formType: ModalContentType.EDIT_ACTUAL,
            }
          );

          await selectEvent.select(
            await findByLabelText('Select year to edit'),
            corporateEmissionFormMocks.corporateEmission.year.toString()
          );

          expect(
            await findAllByTestId(carbonIntensitySelectors.carbonIntensityRow)
          ).toHaveLength(carbonIntensities.length);
        });
      });
    });

    describe('when user selects a carbon intensity metric', () => {
      describe('when user does not enter a value', () => {
        describe('when the form is submitted', () => {
          it('should display an error message on the value field', async () => {
            const { findByLabelText, findByTestId } = setup(
              [
                corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
                  corporateEmissions: [
                    {
                      ...corporateEmissionFormMocks.corporateEmission,
                      carbonIntensities: [],
                      type: CorporateEmissionType.BASELINE,
                    },
                  ],
                }),
              ],
              {
                formType: ModalContentType.EDIT_BASELINE,
              }
            );

            await selectEvent.select(
              await findByLabelText('Select carbon intensity metric'),
              carbonIntensityNamespace.NUMBER_OF_EMPLOYEES
            );

            fireEvent.click(await findByTestId(selectors.submitBtn));

            expect(
              await findByTestId(
                `${carbonIntensitySelectors.carbonIntensityValueInput}-error`
              )
            ).toHaveTextContent(formNamespace['carbonIntensities-required']);
          });
        });
      });

      describe('when user selects a value but not a metric', () => {
        describe('when the form is submitted', () => {
          it('should display an error message on the metric field', async () => {
            const { findByTestId } = setup(
              [
                corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
                  corporateEmissions: [
                    {
                      ...corporateEmissionFormMocks.corporateEmission,
                      carbonIntensities: [],
                      type: CorporateEmissionType.BASELINE,
                    },
                  ],
                }),
              ],
              {
                formType: ModalContentType.EDIT_BASELINE,
              }
            );

            fireEvent.change(
              await findByTestId(
                carbonIntensitySelectors.carbonIntensityValueInput
              ),
              {
                target: {
                  value: 1,
                },
              }
            );

            fireEvent.click(await findByTestId(selectors.submitBtn));

            expect(
              await findByTestId(
                `${carbonIntensitySelectors.carbonIntensityMetricField}-error`
              )
            ).toHaveTextContent(formNamespace['carbonIntensities-required']);
          });
        });
      });

      it('should not be able to enter a number that is more than a billion', async () => {
        const carbonIntensityToTest = carbonIntensityConfig[0];
        const { findByLabelText, findByTestId, findByText } = setup(
          [
            corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
              corporateEmissions: [
                {
                  ...corporateEmissionFormMocks.corporateEmission,
                  carbonIntensities: [],
                  type: CorporateEmissionType.BASELINE,
                },
              ],
            }),
          ],
          {
            formType: ModalContentType.EDIT_BASELINE,
          }
        );

        await selectEvent.select(
          await findByLabelText('Select carbon intensity metric'),
          carbonIntensityNamespace[carbonIntensityToTest.type]
        );

        fireEvent.change(
          await findByTestId(
            carbonIntensitySelectors.carbonIntensityValueInput
          ),
          {
            target: {
              value: 1_000_000_001,
            },
          }
        );

        fireEvent.click(await findByTestId(selectors.submitBtn));

        expect(await findByText('Max value is a billion')).toBeInTheDocument();
      });

      describe('when user enters a value that is less than the selected metric minimum', () => {
        it('should display the min value error message', async () => {
          const carbonIntensityToTest = carbonIntensityConfig[0];
          const { findByLabelText, findByTestId, findByText } = setup(
            [
              corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
                corporateEmissions: [
                  {
                    ...corporateEmissionFormMocks.corporateEmission,
                    carbonIntensities: [],
                    type: CorporateEmissionType.BASELINE,
                  },
                ],
              }),
            ],
            {
              formType: ModalContentType.EDIT_BASELINE,
            }
          );

          await selectEvent.select(
            await findByLabelText('Select carbon intensity metric'),
            carbonIntensityNamespace[carbonIntensityToTest.type]
          );

          fireEvent.change(
            await findByTestId(
              carbonIntensitySelectors.carbonIntensityValueInput
            ),
            {
              target: {
                value: 0,
              },
            }
          );

          fireEvent.click(await findByTestId(selectors.submitBtn));

          expect(
            await findByText(
              `The minimum value is ${carbonIntensityToTest.minValue}`
            )
          ).toBeInTheDocument();
        });

        describe('when metric selection is cleared', () => {
          it('should also clear the value error message', async () => {
            const carbonIntensityToTest = carbonIntensityConfig[0];
            const { findByLabelText, findByTestId, queryByText } = setup(
              [
                corporateEmissionFormMocks.getCorporateEmissionFormQueryMock({
                  corporateEmissions: [
                    {
                      ...corporateEmissionFormMocks.corporateEmission,
                      carbonIntensities: [],
                      type: CorporateEmissionType.BASELINE,
                    },
                  ],
                }),
              ],
              {
                formType: ModalContentType.EDIT_BASELINE,
              }
            );

            await selectEvent.select(
              await findByLabelText('Select carbon intensity metric'),
              carbonIntensityNamespace[carbonIntensityToTest.type]
            );

            fireEvent.change(
              await findByTestId(
                carbonIntensitySelectors.carbonIntensityValueInput
              ),
              {
                target: {
                  value: 0,
                },
              }
            );

            fireEvent.click(await findByTestId(selectors.submitBtn));

            await selectEvent.clearAll(
              await findByLabelText('Select carbon intensity metric')
            );

            expect(
              queryByText(
                `The minimum value is ${carbonIntensityToTest.minValue}`
              )
            ).toBeNull();
          });
        });
      });
    });
  });
});
