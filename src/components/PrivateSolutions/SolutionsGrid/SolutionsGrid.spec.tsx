import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import * as privateSolutionsMock from 'mocks/privateSolutions';
import * as meMocks from 'mocks/me';
import * as userOnboardingMocks from 'mocks/userOnboarding';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';

import * as privateSolutionCardSelectors from '../../../containers/PrivateSolutions/PrivateSolutionCard/selectors';
import * as privateSolutionsSelectors from '../../../containers/PrivateSolutions/selectors';
import { SolutionsGrid } from '.';

const setup = (overrides: any = {}) => {
  const props = {
    id: privateSolutionsSelectors.recommendedSolutionsGrid,
    translationPrefix: 'some-prefix',
    solutions: [
      privateSolutionsMock.privateSolutionCardMock.MOCK_THIRD_PARTY_SOLUTION,
    ],
    ...overrides,
  };

  return render(
    <MockedProvider
      mocks={[
        meMocks.getGetMeMock(),
        userOnboardingMocks.getCombinedSolutionInterestsQueryMock([]),
      ]}
      addTypename={false}
    >
      <AuthenticatedUserProvider>
        <ModalProvider>
          <SolutionsGrid {...props} />
        </ModalProvider>
      </AuthenticatedUserProvider>
    </MockedProvider>
  );
};

describe('SolutionsGrid', () => {
  // describe('when hasEditDetails === true', () => {
  //   it('should render the edit interests button', async () => {
  //     const { findByTestId } = setup({ hasEditDetails: true });

  //     expect(
  //       await findByTestId(editInterestButtonSelectors.editInterestsButton)
  //     ).toBeInTheDocument();
  //   });

  //   describe('when the edit interests button is clicked', () => {
  //     it('should display the Edit interests modal', async () => {
  //       const { findByTestId, queryByTestId } = setup({ hasEditDetails: true });

  //       const editInterestsButton = await findByTestId(
  //         editInterestButtonSelectors.editInterestsButton
  //       );

  //       act(() => {
  //         fireEvent.click(editInterestsButton);
  //       });

  //       const editInterestsModal = await findByTestId(
  //         editInterestsModalSelectors.editInterests
  //       );
  //       expect(editInterestsModal).toBeInTheDocument();

  //       expect(
  //         queryByTestId(editInterestsModalSelectors.introText)
  //       ).not.toBeInTheDocument();
  //     });
  //   });
  // });

  // describe('when hasEditDetails === false', () => {
  //   it('should NOT render the edit details button', async () => {
  //     const { queryByTestId } = setup();

  //     expect(
  //       queryByTestId(editInterestButtonSelectors.editInterestsButton)
  //     ).not.toBeInTheDocument();
  //   });
  // });

  // describe('when hasViewAllNavBtn === true', () => {
  //   it('should render the view all solutions button', async () => {
  //     const { findByTestId } = setup({ hasViewAllNavBtn: true });

  //     expect(
  //       await findByTestId(selectors.viewAllSolutionsBtn)
  //     ).toBeInTheDocument();
  //   });
  // });

  // describe('when hasViewAllNavBtn === false', () => {
  //   it('should NOT render the view all solutions button', async () => {
  //     const { queryByTestId } = setup();

  //     expect(
  //       queryByTestId(selectors.viewAllSolutionsBtn)
  //     ).not.toBeInTheDocument();
  //   });
  // });

  describe('when solutions are empty', () => {
    it('should not render solution card', async () => {
      const { queryByTestId } = setup({
        solutions: [],
        hasEditDetails: true,
      });

      // expect(
      //   await findByTestId(editInterestButtonSelectors.editInterestsButton)
      // ).toBeInTheDocument();

      expect(
        queryByTestId(privateSolutionCardSelectors.cardWrapper)
      ).not.toBeInTheDocument();
    });
  });

  describe('when solutions data exists', () => {
    it('should render the solution card anchor element', async () => {
      const { findByTestId, findAllByTestId } = setup();

      expect(
        await findAllByTestId(privateSolutionCardSelectors.cardWrapper)
      ).toBeTruthy();
      expect(
        await findByTestId(privateSolutionCardSelectors.buttonAnchor)
      ).toBeInTheDocument();
      expect(
        await findByTestId(privateSolutionCardSelectors.cardSrcPath)
      ).toBeInTheDocument();
      expect(
        await findAllByTestId(privateSolutionCardSelectors.cardTitle)
      ).toBeTruthy();
      expect(
        await findAllByTestId(privateSolutionCardSelectors.cardSubtext)
      ).toBeTruthy();
    });
  });
});
