import { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import useDebouncedCallback from 'effects/useDebouncedCallback';
import useClickedOutside from 'effects/useOnOuterClick';
import { captureException } from 'utils/logging';
import Icon from 'components/Icon';
import { Spinner } from 'components/Spinner';
import { QueryContainer } from 'containers/types';
import DropdownList, { DropdownListItem } from './DropdownList';
import * as StyledComponents from './styledComponents';

export interface FetchDataArgs {
  search?: string;
  start: number;
}

export interface IProps<T> {
  fetchData: (args: FetchDataArgs) => Promise<QueryContainer<T>>;
  dataToListItems: (data: T) => DropdownListItem[];
  placeholder: DropdownListItem;
  initialSelected: DropdownListItem;
  onSelectedChange: (item: DropdownListItem) => void;
  disabled?: boolean;
  isNullable?: boolean;
  dataTestIdPrefix?: string;
  dropdownWidth?: string;
}

function Dropdown<T>({
  fetchData,
  dataToListItems,
  placeholder,
  initialSelected,
  onSelectedChange,
  isNullable,
  dataTestIdPrefix,
  dropdownWidth,
  disabled,
}: IProps<T>) {
  const emptyPlaceholderText = isNullable ? '--' : 'Select an option';
  const dropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const xButtonRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [selectedItem, setSelectedItem] = useState<DropdownListItem>(
    initialSelected || placeholder
  );
  const [inputValue, setInputValue] = useState(initialSelected.label);
  const [search, setSearch] = useState('');
  const [start, setStart] = useState(0);
  const [listItems, setListItems] = useState<DropdownListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchListItems = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetchData({
        search,
        start,
      });

      const { data } = response;

      const newListItems = dataToListItems(data);

      if (search && !start) {
        setListItems(newListItems);
        return;
      }

      setListItems((prev) => [...prev, ...newListItems]);
    } catch (e) {
      captureException(e as Error);
      setListItems([{ label: 'Error: Could not fetch results', id: '' }]);
    } finally {
      setIsLoading(false);
    }
  }, [start, search]);

  const updateSearch = useDebouncedCallback((newValue: string) => {
    setStart(0);
    return search === '' && newValue === ''
      ? fetchListItems()
      : setSearch(() => newValue);
  }, 750);

  const handleChangeSearch = (newValue: string) => {
    setIsLoading(true);
    setInputValue(newValue);
    if (listItems.length) {
      setListItems([]);
    }
    updateSearch(newValue);
  };

  const handleSelect = (item: DropdownListItem) => {
    setIsOpen(false);
    setInputValue(item.label);
    setSelectedItem(() => item);
  };

  const handleXIconClick = () => {
    if (search) {
      handleChangeSearch('');
      setSelectedItem({ id: selectedItem.id, label: selectedItem.label });
    } else {
      handleSelect(selectedItem);
    }
  };

  useEffect(() => {
    onSelectedChange(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    fetchListItems();
  }, [fetchListItems]);

  useClickedOutside(
    () => {
      handleSelect(selectedItem);
    },
    [dropdownRef, xButtonRef],
    [selectedItem]
  );

  return (
    <StyledComponents.DropdownContainer>
      <StyledComponents.Dropdown
        ref={dropdownRef}
        dropdownWidth={dropdownWidth}
      >
        <StyledComponents.DropdownInput
          data-testid={`${dataTestIdPrefix}-dropdown-input`}
          onClick={() => {
            setIsOpen(true);
            setInputValue(search);
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeSearch(e.target.value)
          }
          value={inputValue}
          placeholder={emptyPlaceholderText}
          disabled={disabled}
        />
        {isOpen && (
          <DropdownList
            dataTestIdPrefix={dataTestIdPrefix}
            isNullable={isNullable}
            isLoading={isLoading}
            listItems={listItems}
            handleSelect={handleSelect}
            setStart={setStart}
            placeholder={placeholder}
            search={search}
          />
        )}
      </StyledComponents.Dropdown>
      {isOpen ? (
        <StyledComponents.SearchActionsContainer
          onClick={handleXIconClick}
          ref={xButtonRef}
          data-testid={`${dataTestIdPrefix}-x-button`}
        >
          <button type="button">
            <Icon src="/cross.svg" alt="Close window" size={24} />
          </button>
        </StyledComponents.SearchActionsContainer>
      ) : (
        <StyledComponents.SearchActionsContainer
          onClick={() => {
            if (disabled) {
              return;
            }
            setIsOpen(true);
          }}
          data-testid={`${dataTestIdPrefix}-down-arrow-button`}
        >
          <button type="button">
            <Icon src="/down-arrow.svg" alt="Open menu" size={20} />
          </button>
        </StyledComponents.SearchActionsContainer>
      )}
      {isLoading ? (
        <StyledComponents.LoadingSpinnerContainer>
          <Spinner $size="1.5rem" />
        </StyledComponents.LoadingSpinnerContainer>
      ) : null}
    </StyledComponents.DropdownContainer>
  );
}

Dropdown.defaultProps = {
  isNullable: false,
  dataTestIdPrefix: 'dropdown',
  disabled: false,
};

export default Dropdown;
