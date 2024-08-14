import { act, render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';
import { CorporateEmissionType } from 'types/globalTypes';
import * as meMocks from 'mocks/me';
import * as removeEmissionFormQueryMocks from 'mocks/removeEmissionForm';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import * as toast from 'utils/toast';
import commonNamespace from '../../../../locales/en/common.json';
import removeEmissionFormNamespace from '../../../../locales/en/removeEmissionForm.json';
import { RemoveEmissionForm } from '.';
import { getEmissionYears } from './utils';
import * as selectors from './selectors';

const setup = (mocks: any, overrides: any = {}) => {
  const props = {
    closeModal: jest.fn(),
    emissions: [],
    ...overrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        common: commonNamespace,
        removeEmissionForm: removeEmissionFormNamespace,
      }}
    >
      <MockedProvider
        mocks={[meMocks.getGetMeMock(), ...mocks]}
        addTypename={false}
      >
        <AuthenticatedUserProvider>
          <RemoveEmissionForm {...props} />
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );
};

describe('RemoveEmissionForm', () => {
  it('should delete an emission and call successful toast message', async () => {
    const emission = removeEmissionFormQueryMocks.getEmission(
      2020,
      CorporateEmissionType.ACTUAL
    );
    const closeModal = jest.fn();
    jest.spyOn(toast, 'displaySuccessMessage');

    const { findByTestId, findByLabelText } = setup(
      [
        removeEmissionFormQueryMocks.getRemoveEmissionFormQueryMock([emission]),
        removeEmissionFormQueryMocks.deleteSuccessMock,
      ],
      {
        closeModal,
      }
    );

    await selectEvent.select(
      await findByLabelText(
        removeEmissionFormNamespace['remove-emission-form-year-label']
      ),
      emission.year.toString()
    );

    expect(await findByTestId(selectors.totalEmissionInput)).toHaveValue(
      '3,000'
    );

    await waitFor(() => {
      expect(toast.displaySuccessMessage).not.toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      fireEvent.click(await findByTestId(selectors.onSubmitBtn));
    });

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalledTimes(1);
      expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
      expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          title: commonNamespace['delete-toast-success'],
        })
      );
    });
  });

  it('should call the error toast message when create API error', async () => {
    const emission = removeEmissionFormQueryMocks.getEmission(
      2020,
      CorporateEmissionType.ACTUAL
    );
    jest.spyOn(toast, 'displayErrorMessage');

    const { findByTestId, findByLabelText } = setup([
      removeEmissionFormQueryMocks.getRemoveEmissionFormQueryMock([emission]),
      removeEmissionFormQueryMocks.deleteMockError,
    ]);

    await selectEvent.select(
      await findByLabelText(
        removeEmissionFormNamespace['remove-emission-form-year-label']
      ),
      emission.year.toString()
    );

    expect(toast.displayErrorMessage).not.toHaveBeenCalledTimes(1);

    fireEvent.click(await findByTestId(selectors.onSubmitBtn));

    const apiError = await findByTestId(selectors.apiError);

    expect(apiError.textContent).toBe(
      removeEmissionFormQueryMocks.MOCK_ERROR_MESSAGE
    );

    await waitFor(() => {
      expect(toast.displayErrorMessage).toHaveBeenCalledTimes(1);
      expect(toast.displayErrorMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          title: commonNamespace['delete-toast-error'],
        })
      );
    });
  });

  it('should display total emissions value for year', async () => {
    const emission = removeEmissionFormQueryMocks.getEmission(
      2020,
      CorporateEmissionType.ACTUAL
    );

    const closeModal = jest.fn();
    jest.spyOn(toast, 'displaySuccessMessage');

    const { findByTestId, findByLabelText } = setup(
      [
        removeEmissionFormQueryMocks.getRemoveEmissionFormQueryMock([emission]),
        removeEmissionFormQueryMocks.deleteSuccessMock,
      ],
      {
        closeModal,
      }
    );

    await selectEvent.select(
      await findByLabelText(
        removeEmissionFormNamespace['remove-emission-form-year-label']
      ),
      emission.year.toString()
    );

    expect(await findByTestId(selectors.totalEmissionInput)).toHaveValue(
      '3,000'
    );
  });

  describe('getEmissionYears util', () => {
    it('should return sorted years with existing emissions data and only include ACTUAL emission years', () => {
      const emissions = [
        removeEmissionFormQueryMocks.getEmission(
          2019,
          CorporateEmissionType.ACTUAL
        ),
        removeEmissionFormQueryMocks.getEmission(
          2020,
          CorporateEmissionType.ACTUAL
        ),
        removeEmissionFormQueryMocks.getEmission(
          2015,
          CorporateEmissionType.BASELINE
        ),
        removeEmissionFormQueryMocks.getEmission(
          2017,
          CorporateEmissionType.ACTUAL
        ),
        removeEmissionFormQueryMocks.getEmission(
          2016,
          CorporateEmissionType.ACTUAL
        ),
      ];

      const result = getEmissionYears(emissions);
      expect(result).toHaveLength(4);

      expect(result).toEqual([
        { value: 2020, label: '2020' },
        { value: 2019, label: '2019' },
        { value: 2017, label: '2017' },
        { value: 2016, label: '2016' },
      ]);
    });
  });
});
