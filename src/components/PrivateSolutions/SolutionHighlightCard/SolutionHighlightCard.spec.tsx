import { fireEvent, render, waitFor, act } from '@testing-library/react';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as privateSolutionsMock from 'mocks/privateSolutions';
import * as contactFormSelectors from 'components/ContactUs/selectors';
import { SolutionHighlightCard } from '.';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');

const setup = (overrides: any = {}) => {
  const props = {
    hasToolTip: true,
    solutionPrefix: 'some-prefix',
    toggleContactModal: jest.fn(),
    ...overrides,
  };
  return render(<SolutionHighlightCard {...props} />);
};

describe('SolutionHighlightCard', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: privateSolutionsMock.user.company.id },
    }));
  });

  describe('when hasToolTip === true', () => {
    it('should render tooltip', async () => {
      const { getByTestId } = setup();

      expect(getByTestId(selectors.solutionHighlightCard)).toBeInTheDocument();
      expect(getByTestId(selectors.highlighTooltip)).toBeInTheDocument();
    });
  });

  describe('when hasToolTip === false', () => {
    it('should NOT render tooltip', async () => {
      const { getByTestId, queryByTestId } = setup({ hasToolTip: false });

      expect(getByTestId(selectors.solutionHighlightCard)).toBeInTheDocument();
      expect(queryByTestId(selectors.highlighTooltip)).not.toBeInTheDocument();
    });
  });

  describe('contact us button', () => {
    it('should render on the solution highlight card', async () => {
      const { getByTestId } = setup();

      expect(getByTestId(selectors.solutionHighlightCard)).toBeInTheDocument();
      expect(getByTestId(selectors.highlightContactUsBtn)).toBeInTheDocument();
    });

    it('should call toggleContactModal when button is clicked', async () => {
      const toggleContactModal = jest.fn();
      const { getByTestId } = setup({ toggleContactModal });

      expect(getByTestId(selectors.solutionHighlightCard)).toBeInTheDocument();
      expect(getByTestId(selectors.highlightContactUsBtn)).toBeInTheDocument();

      fireEvent.click(getByTestId(selectors.highlightContactUsBtn));

      await waitFor(() => {
        expect(toggleContactModal).toHaveBeenCalled();
      });
    });

    it('should open contact modal', async () => {
      const { getByTestId, findByTestId } = setup();

      await findByTestId(selectors.solutionHighlightCard);

      await act(async () => {
        fireEvent.click(getByTestId(selectors.highlightContactUsBtn));
      });

      expect(findByTestId(contactFormSelectors.form)).toBeTruthy();
    });
  });
});
