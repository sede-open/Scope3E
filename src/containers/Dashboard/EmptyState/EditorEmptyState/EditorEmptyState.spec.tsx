import { act, fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import * as inexperiencedWizardSelectors from 'containers/Modals/InexperiencedEmissionsWizard/selectors';
import * as emissionPathCardSelectors from 'components/EmissionPathCards/selectors';
import * as corporateEmissionFormSelectors from 'containers/Modals/CorporateEmissionForm/selectors';
import { ModalContentType } from 'containers/types';
import * as meMocks from 'mocks/me';

import { EditorEmptyState } from '.';

const setup = () =>
  render(
    <MockedProvider mocks={[meMocks.getGetMeMock()]} addTypename={false}>
      <AuthenticatedUserProvider>
        <ModalProvider>
          <EditorEmptyState />
        </ModalProvider>
      </AuthenticatedUserProvider>
    </MockedProvider>
  );

describe('EditorEmptyState', () => {
  describe('when inexperienced flow button is clicked', () => {
    it('should launch the inexperienced baseline user flow', async () => {
      const { findByTestId } = setup();

      await act(async () => {
        fireEvent.click(
          await findByTestId(emissionPathCardSelectors.inexperiencedUserButton)
        );
      });

      expect(
        await findByTestId(inexperiencedWizardSelectors.emissionYearSelectForm)
      ).toBeInTheDocument();
    });
  });

  describe('when experienced flow button is clicked', () => {
    it('should launch the experienced baseline user flow', async () => {
      const { findByTestId } = setup();

      await act(async () => {
        fireEvent.click(
          await findByTestId(emissionPathCardSelectors.experiencedUserButton)
        );
      });

      expect(
        await findByTestId(
          corporateEmissionFormSelectors.getEmissionFormTestId(
            ModalContentType.NEW_BASELINE
          )
        )
      ).toBeInTheDocument();
    });
  });
});
