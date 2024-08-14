import { fireEvent, render, act } from '@testing-library/react';
import { createQueryContainer } from 'utils/tests';

import Dropdown, { IProps } from '.';

type SampleApiData = { id: string; title: string };

const sampleApiDataToListItems = (data: SampleApiData[]) =>
  data.map(({ id, title }) => ({ id, label: title }));

const testIdPrefix = 'test';

const setup = (overrides: Partial<IProps<SampleApiData[]>> = {}) => {
  const props: IProps<SampleApiData[]> = {
    fetchData: jest.fn().mockResolvedValueOnce(
      createQueryContainer({
        data: [
          { id: '1', title: 'a' },
          { id: '2', title: 'b' },
        ],
      })
    ),
    dataToListItems: sampleApiDataToListItems,
    placeholder: { label: '--', id: '' },
    initialSelected: { label: '', id: '' },
    onSelectedChange: jest.fn(),
    isNullable: false,
    dataTestIdPrefix: testIdPrefix,
    disabled: false,
    ...overrides,
  };
  return render(
    <div data-testid="some-html-outside-the-component">
      <Dropdown {...props} />
    </div>
  );
};

describe('Dropdown', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('when the dropdown arrow is clicked', () => {
    it('should open the dropdown menu', async () => {
      const { findByTestId } = setup();
      const inputField = await findByTestId(`${testIdPrefix}-dropdown-input`);
      expect(inputField).toBeInTheDocument();

      act(() => {
        fireEvent.click(inputField);
      });

      const dropdownListContainer = await findByTestId(
        `${testIdPrefix}-dropdown-list-container`
      );

      expect(dropdownListContainer).toBeInTheDocument();
    });

    describe('when dropdown is disabled', () => {
      it('should not open the dropdown menu', async () => {
        const { findByTestId, queryByTestId } = setup({ disabled: true });
        const inputField = await findByTestId(`${testIdPrefix}-dropdown-input`);
        expect(inputField).toBeInTheDocument();

        act(() => {
          fireEvent.click(inputField);
        });

        const dropdownListContainer = await queryByTestId(
          `${testIdPrefix}-dropdown-list-container`
        );

        expect(dropdownListContainer).not.toBeInTheDocument();
      });
    });
  });

  it('should open the drop down menu when the down arrow icon is clicked', async () => {
    const { findByTestId } = setup();
    const dropdownButton = await findByTestId(
      `${testIdPrefix}-down-arrow-button`
    );
    expect(dropdownButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(dropdownButton);
    });

    const dropdownListContainer = await findByTestId(
      `${testIdPrefix}-dropdown-list-container`
    );

    expect(dropdownListContainer).toBeInTheDocument();
  });

  describe('when the user clicks away from the dropdown', () => {
    it('should close the drop down menu', async () => {
      const { findByTestId } = setup();
      const dropdownButton = await findByTestId(
        `${testIdPrefix}-down-arrow-button`
      );
      expect(dropdownButton).toBeInTheDocument();

      act(() => {
        fireEvent.click(dropdownButton);
      });

      const dropdownListContainer = await findByTestId(
        `${testIdPrefix}-dropdown-list-container`
      );

      expect(dropdownListContainer).toBeInTheDocument();

      await act(async () => {
        fireEvent.mouseDown(
          await findByTestId('some-html-outside-the-component')
        );
      });

      expect(dropdownListContainer).not.toBeInTheDocument();
    });

    it('the input value should revert to the selected item', async () => {
      jest.useFakeTimers();
      const fetchData = jest.fn().mockResolvedValueOnce(
        createQueryContainer({
          data: [
            { id: '1', title: 'Agriculture' },
            { id: '2', title: 'Aviation' },
          ],
        })
      );

      const { findByTestId } = setup({ fetchData });
      const dropdownButton = await findByTestId(
        `${testIdPrefix}-down-arrow-button`
      );
      expect(dropdownButton).toBeInTheDocument();

      act(() => {
        fireEvent.click(dropdownButton);
      });

      const dropdownListContainer = await findByTestId(
        `${testIdPrefix}-dropdown-list-container`
      );

      expect(dropdownListContainer).toBeInTheDocument();

      /* sets up a selected item */
      await act(async () => {
        fireEvent.click(
          await findByTestId(`${testIdPrefix}-dropdown-list-item-0`)
        );
      });

      expect(dropdownListContainer).not.toBeInTheDocument();

      const inputField = await findByTestId(`${testIdPrefix}-dropdown-input`);

      expect(inputField).toHaveValue('Agriculture');

      await act(async () => {
        fireEvent.change(inputField, { target: { value: 'My search' } });
        jest.advanceTimersByTime(1000);
      });

      expect(inputField).toHaveValue('My search');

      await act(async () => {
        fireEvent.click(dropdownButton);
      });

      expect(
        await findByTestId(`${testIdPrefix}-dropdown-list-container`)
      ).toBeInTheDocument();

      await act(async () => {
        fireEvent.mouseDown(
          await findByTestId('some-html-outside-the-component')
        );
      });

      expect(inputField).toHaveValue('Agriculture');
    });
  });

  it('should clear the search when the user clicks the X icon', async () => {
    jest.useFakeTimers();
    const { findByTestId } = setup();
    const dropdownButton = await findByTestId(
      `${testIdPrefix}-down-arrow-button`
    );
    expect(dropdownButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(dropdownButton);
    });

    const dropdownListContainer = await findByTestId(
      `${testIdPrefix}-dropdown-list-container`
    );

    expect(dropdownListContainer).toBeInTheDocument();

    const xButton = await findByTestId(`${testIdPrefix}-x-button`);

    expect(xButton).toBeInTheDocument();

    const inputField = await findByTestId(`${testIdPrefix}-dropdown-input`);

    await act(async () => {
      fireEvent.change(inputField, { target: { value: 'My search' } });
      jest.advanceTimersByTime(1000);
    });

    expect(inputField).toHaveValue('My search');

    act(() => {
      fireEvent.click(xButton);
    });

    expect(await findByTestId(`${testIdPrefix}-dropdown-input`)).toHaveValue(
      ''
    );
  });

  it('should fetch more data when the user scrolls to the bottom of the dropdown menu', async () => {
    jest.useFakeTimers();

    const fetchData = jest
      .fn()
      .mockResolvedValueOnce(
        createQueryContainer({
          data: [
            { id: '1', title: 'a' },
            { id: '2', title: 'b' },
          ],
        })
      )
      .mockResolvedValueOnce(
        createQueryContainer({
          data: [
            { id: '3', title: 'c' },
            { id: '4', title: 'd' },
          ],
        })
      )
      .mockResolvedValueOnce(
        createQueryContainer({
          data: [
            { id: '5', title: 'e' },
            { id: '6', title: 'f' },
          ],
        })
      );

    const { findByTestId } = setup({ fetchData });

    /* Open the dropdown list */
    const dropdownButton = await findByTestId(
      `${testIdPrefix}-down-arrow-button`
    );
    expect(dropdownButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(dropdownButton);
    });

    const dropdownListContainer = await findByTestId(
      `${testIdPrefix}-dropdown-list-container`
    );

    expect(dropdownListContainer).toBeInTheDocument();

    expect(
      dropdownListContainer.querySelectorAll('.dropdown-list-item')
    ).toHaveLength(2);

    act(() => {
      fireEvent.scroll(dropdownListContainer, {
        target: { scrollY: 100 },
      });
      jest.advanceTimersByTime(1000);
    });

    expect(
      (
        await findByTestId(`${testIdPrefix}-dropdown-list-container`)
      ).querySelectorAll('.dropdown-list-item')
    ).toHaveLength(4);

    await act(async () => {
      fireEvent.scroll(dropdownListContainer, { target: { scrollY: 100 } });
      jest.advanceTimersByTime(1000);
    });

    expect(
      (
        await findByTestId(`${testIdPrefix}-dropdown-list-container`)
      ).querySelectorAll('.dropdown-list-item')
    ).toHaveLength(6);
  });

  it('should set the input value when the user selects an item from the dropdown list', async () => {
    const fetchData = jest.fn().mockResolvedValueOnce(
      createQueryContainer({
        data: [
          { id: '1', title: 'Agriculture' },
          { id: '2', title: 'Aviation' },
        ],
      })
    );

    const { findByTestId } = setup({ fetchData });

    /* Open the dropdown list */
    const dropdownButton = await findByTestId(
      `${testIdPrefix}-down-arrow-button`
    );
    expect(dropdownButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(dropdownButton);
    });

    const dropdownListContainer = await findByTestId(
      `${testIdPrefix}-dropdown-list-container`
    );

    expect(dropdownListContainer).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(
        await findByTestId(`${testIdPrefix}-dropdown-list-item-0`)
      );
    });

    const inputField = await findByTestId(`${testIdPrefix}-dropdown-input`);

    expect(inputField).toHaveValue('Agriculture');
  });

  it('should include a placeholder item in the dropdown list when the input is nullable', async () => {
    const { findByTestId } = setup({ isNullable: true });

    /* Open the dropdown list */
    const dropdownButton = await findByTestId(
      `${testIdPrefix}-down-arrow-button`
    );
    expect(dropdownButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(dropdownButton);
    });

    const dropdownListContainer = await findByTestId(
      `${testIdPrefix}-dropdown-list-container`
    );

    expect(dropdownListContainer).toBeInTheDocument();

    expect(
      dropdownListContainer.querySelectorAll('.dropdown-list-item')
    ).toHaveLength(3);

    expect(
      await findByTestId(`${testIdPrefix}-dropdown-list-item-placeholder`)
    ).toBeInTheDocument();

    const inputField = (await findByTestId(
      `${testIdPrefix}-dropdown-input`
    )) as HTMLInputElement;

    expect(inputField.placeholder).toEqual('--');
  });

  it('should render an informative message when no options are found for a search result', async () => {
    jest.useFakeTimers();
    const fetchData = jest
      .fn()
      .mockResolvedValueOnce(
        createQueryContainer({
          data: [
            { id: '1', title: 'a' },
            { id: '2', title: 'b' },
          ],
        })
      )
      .mockResolvedValueOnce(
        createQueryContainer({
          data: [],
        })
      );

    const { findByTestId } = setup({ fetchData });

    /* Open the dropdown list */
    const dropdownButton = await findByTestId(
      `${testIdPrefix}-down-arrow-button`
    );
    expect(dropdownButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(dropdownButton);
    });

    const dropdownListContainer = await findByTestId(
      `${testIdPrefix}-dropdown-list-container`
    );

    expect(dropdownListContainer).toBeInTheDocument();

    const inputField = await findByTestId(`${testIdPrefix}-dropdown-input`);

    await act(async () => {
      fireEvent.change(inputField, { target: { value: 'Not a real sector' } });
      jest.advanceTimersByTime(1000);
    });

    expect(inputField).toHaveValue('Not a real sector');

    const noResultsDropdownListItem = (await findByTestId(
      `${testIdPrefix}-dropdown-list-item-no-results`
    )) as HTMLDivElement;

    expect(noResultsDropdownListItem).toBeInTheDocument();

    expect(noResultsDropdownListItem.innerHTML).toEqual(
      expect.stringContaining(
        'No results matching <strong>Not a real sector</strong>'
      )
    );
  });

  it('should revert the selected value to the initial selected when the menu is closed', async () => {
    jest.useFakeTimers();
    const { findByTestId } = setup({
      initialSelected: { id: 'xxx', label: 'A sector' },
    });
    const dropdownButton = await findByTestId(
      `${testIdPrefix}-down-arrow-button`
    );
    expect(dropdownButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(dropdownButton);
    });

    const dropdownListContainer = await findByTestId(
      `${testIdPrefix}-dropdown-list-container`
    );

    expect(dropdownListContainer).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(await findByTestId(`${testIdPrefix}-dropdown-input`), {
        target: { value: 'My search' },
      });
      jest.advanceTimersByTime(1000);
    });

    expect(await findByTestId(`${testIdPrefix}-dropdown-input`)).toHaveValue(
      'My search'
    );

    /* Clearing the search */
    await act(async () => {
      fireEvent.click(await findByTestId(`${testIdPrefix}-x-button`));
      jest.advanceTimersByTime(1000);
    });

    expect(await findByTestId(`${testIdPrefix}-dropdown-input`)).toHaveValue(
      ''
    );

    expect(dropdownListContainer).toBeInTheDocument();

    /* Closing the dropdown menu */
    await act(async () => {
      fireEvent.click(await findByTestId(`${testIdPrefix}-x-button`));
      jest.advanceTimersByTime(1000);
    });

    expect(dropdownListContainer).not.toBeInTheDocument();

    expect(await findByTestId(`${testIdPrefix}-dropdown-input`)).toHaveValue(
      'A sector'
    );
  });
});
