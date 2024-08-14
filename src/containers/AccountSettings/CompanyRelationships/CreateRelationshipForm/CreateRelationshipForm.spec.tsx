import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import * as companyRelationshipsMocks from 'mocks/companyRelationships';
import { CompanyRelationshipsQuery_companyRelationships } from 'types/CompanyRelationshipsQuery';
import { CompanyRelationshipType } from 'types/globalTypes';
import * as toast from 'utils/toast';
import { CreateRelationshipForm } from '.';
import * as selectors from './selectors';

const mockOnClose = jest.fn();
const mockOpenInviteCompanyModal = jest.fn();
const setup = (
  existingRelationship:
    | CompanyRelationshipsQuery_companyRelationships
    | undefined,
  relationshipType: CompanyRelationshipType,
  mocks: any[]
) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CreateRelationshipForm
        companyId={companyRelationshipsMocks.userCompany.id}
        existingRelationship={existingRelationship}
        onClose={mockOnClose}
        openInviteCompanyModal={mockOpenInviteCompanyModal}
        relationshipType={relationshipType}
      />
    </MockedProvider>
  );

describe('CreateRelationshipForm', () => {
  describe('when there is an existing relationship (Re-send invite flow)', () => {
    const relationshipType = CompanyRelationshipType.SUPPLIER;

    it('should disable the Select company input', async () => {
      const {
        findByTestId,
      } = setup(
        companyRelationshipsMocks.existingRelationship,
        relationshipType,
        [companyRelationshipsMocks.updateCompanyRelationshipSupplierMock]
      );

      const selectCompanyInputContainer = await findByTestId(
        selectors.createRelationshipNameInput
      );

      expect(
        selectCompanyInputContainer.querySelector('input')
      ).toHaveAttribute('disabled');
    });

    it('should pre-select the correct company', async () => {
      const {
        findByText,
      } = setup(
        companyRelationshipsMocks.existingRelationship,
        relationshipType,
        [companyRelationshipsMocks.updateCompanyRelationshipSupplierMock]
      );

      expect(
        await findByText(
          companyRelationshipsMocks.existingRelationship.customer.name
        )
      ).toBeInTheDocument();
    });

    describe('if there is already a Note value for the relationship', () => {
      it('should pre-populate the Note field', async () => {
        const {
          getByTestId,
        } = setup(
          companyRelationshipsMocks.existingRelationship,
          relationshipType,
          [companyRelationshipsMocks.updateCompanyRelationshipSupplierMock]
        );

        const noteTextarea = await getByTestId(
          `${selectors.createRelationshipNoteInput}-input`
        );

        expect(noteTextarea).toHaveValue(
          companyRelationshipsMocks.existingRelationship.note
        );
      });
    });

    describe('when the form is successfully submitted', () => {
      const newNoteValue =
        companyRelationshipsMocks.updateCompanyRelationshipSupplierMock.request
          .variables.input.note;

      it('should display the success toast message', async () => {
        jest.spyOn(toast, 'displaySuccessMessage');
        const expectedSuccessToastPayload = {
          title: 'companyRelationships:form-toast-save-title-success',
          subtitle: 'companyRelationships:form-toast-save-subtitle-success',
        };

        const {
          findByTestId,
        } = setup(
          companyRelationshipsMocks.existingRelationship,
          relationshipType,
          [companyRelationshipsMocks.updateCompanyRelationshipSupplierMock]
        );

        const noteTextarea = await findByTestId(
          `${selectors.createRelationshipNoteInput}-input`
        );

        fireEvent.change(noteTextarea, {
          target: {
            value: newNoteValue,
          },
        });

        expect(noteTextarea).toHaveValue(newNoteValue);

        const submitButton = await findByTestId(
          selectors.createRelationshipSubmit
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
        const {
          findByTestId,
        } = setup(
          companyRelationshipsMocks.existingRelationship,
          relationshipType,
          [companyRelationshipsMocks.updateCompanyRelationshipSupplierMock]
        );

        const noteTextarea = await findByTestId(
          `${selectors.createRelationshipNoteInput}-input`
        );

        fireEvent.change(noteTextarea, {
          target: {
            value: newNoteValue,
          },
        });

        const submitButton = await findByTestId(
          selectors.createRelationshipSubmit
        );

        act(() => {
          fireEvent.click(submitButton);
        });

        await waitFor(() => {
          expect(mockOnClose).toHaveBeenCalled();
        });
      });
    });

    describe('when the form submission returns an error', () => {
      it('should display the error displayErrorMessage toast', async () => {
        jest.spyOn(toast, 'displayErrorMessage');
        const expectedErrorToastPayload = {
          title: 'companyRelationships:form-toast-save-title-error',
          subtitle: 'companyRelationships:form-toast-save-subtitle-error',
        };

        const {
          findByTestId,
        } = setup(
          companyRelationshipsMocks.existingRelationship,
          relationshipType,
          [companyRelationshipsMocks.updateCompanyRelationshipSupplierMockError]
        );

        const submitButton = await findByTestId(
          selectors.createRelationshipSubmit
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

      it('should display the error message text in an InputError', async () => {
        const {
          getByTestId,
          findByTestId,
        } = setup(
          companyRelationshipsMocks.existingRelationship,
          relationshipType,
          [companyRelationshipsMocks.updateCompanyRelationshipSupplierMockError]
        );

        const submitButton = await findByTestId(
          selectors.createRelationshipSubmit
        );

        await act(async () => {
          fireEvent.click(submitButton);
        });

        await waitFor(() => {
          expect(
            getByTestId(selectors.createRelationshipApiError)
          ).toHaveTextContent(
            companyRelationshipsMocks.updateCompanyRelationshipSupplierMockError
              .result.errors[0].message
          );
        });
      });
    });
  });
});
