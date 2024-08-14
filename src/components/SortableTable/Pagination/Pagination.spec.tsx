import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '.';

describe('Pagination Component', () => {
  describe('when pages < 7', () => {
    const size = 26;
    const perPage = 5;
    const totalPages = Math.ceil(size / perPage);
    const setup = (onPageChange: (page: number) => void = jest.fn()) => {
      return render(
        <Pagination
          page={3}
          onPageChange={onPageChange}
          perPage={perPage}
          size={size}
        />
      );
    };
    it('should render all page numbers', () => {
      const { getByRole } = setup();

      for (let i = 1; i <= totalPages; i++) {
        expect(getByRole('button', { name: i.toString() })).toBeInTheDocument();
      }
    });

    it('should change page numbers', async () => {
      const onPageChange = jest.fn();
      const { getByRole, getByTitle } = setup(onPageChange);
      await userEvent.click(getByRole('button', { name: '1' }));
      expect(onPageChange).toHaveBeenCalledWith(1);
      const leftArrowButton = getByTitle('Left Arrow').closest(
        'button'
      ) as HTMLButtonElement;
      await userEvent.click(leftArrowButton);
      expect(onPageChange).toHaveBeenCalledWith(2);
      const rightArrowButton = getByTitle('Right Arrow').closest(
        'button'
      ) as HTMLButtonElement;
      await userEvent.click(rightArrowButton);
      expect(onPageChange).toHaveBeenCalledWith(4);
    });
  });

  describe('when pages > 7', () => {
    const setup = (page: number) => {
      const size = 50;
      const perPage = 5;
      return render(
        <Pagination
          page={page}
          onPageChange={() => {}}
          perPage={perPage}
          size={size}
        />
      );
    };
    it('should display 2 ellipsis when on a central page', () => {
      const { getAllByTitle } = setup(5);
      const ellipsisButtons = getAllByTitle('Ellipsis');
      expect(ellipsisButtons.length).toEqual(2);
    });
    it('should display 1 ellipsis near an end page', () => {
      const { getByTitle } = setup(2);
      const ellipsisButtons = getByTitle('Ellipsis');
      expect(ellipsisButtons).toBeInTheDocument();
    });

    it('should display 1 ellipsis near a start page', () => {
      const { getByTitle } = setup(8);
      const ellipsisButtons = getByTitle('Ellipsis');
      expect(ellipsisButtons).toBeInTheDocument();
    });

    it('should change page on all buttons', () => {
      const { getByTitle } = setup(8);
      const ellipsisButtons = getByTitle('Ellipsis');
      expect(ellipsisButtons).toBeInTheDocument();
    });
  });

  describe('when pages = 1', () => {
    it('should disable arrows', () => {
      const { getByTitle } = render(
        <Pagination page={1} onPageChange={() => {}} perPage={5} size={4} />
      );

      const leftArrowButton = getByTitle('Left Arrow').closest(
        'button'
      ) as HTMLButtonElement;
      expect(leftArrowButton).toBeDisabled();
      const rightArrowButton = getByTitle('Right Arrow').closest(
        'button'
      ) as HTMLButtonElement;
      expect(rightArrowButton).toBeDisabled();
    });
  });
});
