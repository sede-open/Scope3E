import { fireEvent, act, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';

import * as toast from 'utils/toast';
import * as deleteEmissionAllocationMocks from 'mocks/deleteEmissionAllocation';
import valueChainNamespace from '../../../../../locales/en/valueChain.json';
import * as selectors from './selectors';
import { DeleteAllocationForm } from '.';

jest.mock('utils/toast');

const mockOnClose = jest.fn();

const defaultId = 'some-allocation-id';
const setup = ({ mocks, id = defaultId }: { mocks: any[]; id?: string }) =>
  render(
    <I18nProvider
      namespaces={{
        valueChain: valueChainNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteAllocationForm id={id} onClose={mockOnClose} />
      </MockedProvider>
    </I18nProvider>
  );

describe('DeleteAllocationForm', () => {
  describe('when the allocation is successfully deleted', () => {
    it('should display the success toast message', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const expectedSuccessToastPayload = {
        title: 'Emissions deleted',
        subtitle: "We'll inform your supplier of your decision",
      };

      const { findByTestId } = setup({
        mocks: [
          deleteEmissionAllocationMocks.getDeleteEmissionAllocationMock({
            id: defaultId,
          }),
        ],
      });

      const submitButton = await findByTestId(
        selectors.deleteEmissionAllocationSubmit
      );

      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expectedSuccessToastPayload
        );
      });
    });

    it('should close the modal', async () => {
      const { findByTestId } = setup({
        mocks: [
          deleteEmissionAllocationMocks.getDeleteEmissionAllocationMock({
            id: defaultId,
          }),
        ],
      });

      const submitButton = await findByTestId(
        selectors.deleteEmissionAllocationSubmit
      );

      await act(async () => {
        fireEvent.click(submitButton);

        await waitFor(() => {
          expect(mockOnClose).toHaveBeenCalled();
        });
      });
    });

    describe('when the allocation deletion returns an error', () => {
      it('should display the success toast message', async () => {
        jest.spyOn(toast, 'displayErrorMessage');
        const expectedErrorToastPayload = {
          title: 'Something went wrong',
          subtitle: 'Please try again',
        };

        const { findByTestId } = setup({
          mocks: [
            deleteEmissionAllocationMocks.getDeleteEmissionAllocationMockError({
              id: defaultId,
            }),
          ],
        });

        const submitButton = await findByTestId(
          selectors.deleteEmissionAllocationSubmit
        );

        await act(async () => {
          fireEvent.click(submitButton);
        });

        await waitFor(() => {
          expect(toast.displayErrorMessage).toHaveBeenCalledWith(
            expectedErrorToastPayload
          );
        });
      });
    });
  });

  describe('when the Cancel button is clicked', () => {
    it('should close the modal', async () => {
      const { findByTestId } = setup({
        mocks: [
          deleteEmissionAllocationMocks.getDeleteEmissionAllocationMock({
            id: defaultId,
          }),
        ],
      });

      const cancelButton = await findByTestId(
        selectors.deleteEmissionAllocationCancel
      );

      await act(async () => {
        fireEvent.click(cancelButton);

        await waitFor(() => {
          expect(mockOnClose).toHaveBeenCalled();
        });
      });
    });
  });
});
