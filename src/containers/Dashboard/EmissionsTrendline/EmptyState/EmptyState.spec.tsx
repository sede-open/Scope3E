import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render } from '@testing-library/react';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import * as corporateEmissionFormQueryMocks from 'mocks/corporateEmissionForm';
import * as meMocks from 'mocks/me';
import I18nProvider from 'next-translate/I18nProvider';
import { EmptyState } from '.';
import modalNamespace from '../../../../../locales/en/modals.json';

const setup = (overrides: any = {}) => {
  const props = {
    setEmissionModal: jest.fn(),
    ...overrides,
  };
  return render(
    <I18nProvider namespaces={{ modals: modalNamespace }}>
      <MockedProvider
        mocks={[
          corporateEmissionFormQueryMocks.getCorporateEmissionFormQueryMock({}),
          meMocks.getGetMeMock(),
        ]}
        addTypename={false}
      >
        <AuthenticatedUserProvider>
          <ModalProvider>
            <EmptyState {...props} />
          </ModalProvider>
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );
};

describe('EmptyState', () => {
  describe('when the primary CTA is clicked', () => {
    it('should display the Inexperienced modal', async () => {
      const setEmissionModal = jest.fn();
      const { findByTestId, findByText } = setup({
        setEmissionModal,
      });

      await act(async () => {
        fireEvent.click(
          await findByTestId('emissions-trendline-empty-cta-primary')
        );
      });

      expect(
        await findByText(modalNamespace['emission-path-select-title'])
      ).toBeInTheDocument();
    });
  });
});
