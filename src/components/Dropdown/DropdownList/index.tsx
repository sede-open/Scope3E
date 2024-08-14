import useDebouncedCallback from 'effects/useDebouncedCallback';
import { UIEvent, Dispatch, SetStateAction, MouseEvent } from 'react';
import { SilverChalice, White, Black } from 'styles/colours';
import * as StyledComponents from './styledComponents';

export type DropdownListItem = { label: string; id: any };

interface IProps<T extends DropdownListItem = DropdownListItem> {
  isLoading: boolean;
  listItems: T[];
  setStart: Dispatch<SetStateAction<number>>;
  handleSelect: (item: DropdownListItem) => void;
  search: string;
  placeholder?: DropdownListItem;
  isNullable?: boolean;
  dataTestIdPrefix?: string;
}

const highlightListItem = (e: MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.background = SilverChalice;
  e.currentTarget.style.color = White;
};

const removeListItemHighlight = (e: MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.background = 'none';
  e.currentTarget.style.color = Black;
};

function DropdownList({
  isLoading,
  listItems,
  setStart,
  handleSelect,
  isNullable,
  placeholder,
  dataTestIdPrefix,
  search,
}: IProps) {
  const debouncedSetStart = useDebouncedCallback((value: number) => {
    setStart(value);
  }, 500);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (isLoading) {
      return;
    }
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottomHit = scrollHeight - scrollTop <= clientHeight;

    if (bottomHit) {
      debouncedSetStart(listItems.length);
    }
  };

  if (!listItems.length) {
    return (
      <StyledComponents.DropdownList
        onScroll={handleScroll}
        data-testid={`${dataTestIdPrefix}-dropdown-list-container`}
      >
        {search && !isLoading ? (
          <StyledComponents.DropdownListItem
            className="dropdown-list-item"
            key="no-results"
            role="option"
            aria-selected="true"
            data-testid={`${dataTestIdPrefix}-dropdown-list-item-no-results`}
          >
            <StyledComponents.DropdownListItemSpan>
              No results matching <strong>{search}</strong>
            </StyledComponents.DropdownListItemSpan>
          </StyledComponents.DropdownListItem>
        ) : null}
      </StyledComponents.DropdownList>
    );
  }
  return (
    <StyledComponents.DropdownList
      onScroll={handleScroll}
      data-testid={`${dataTestIdPrefix}-dropdown-list-container`}
    >
      {isNullable && placeholder ? (
        <StyledComponents.DropdownListItem
          className="dropdown-list-item"
          role="option"
          aria-selected="true"
          key="placeholder"
          onClick={() => handleSelect(placeholder)}
          onKeyDown={() => handleSelect(placeholder)}
          onMouseOver={highlightListItem}
          onMouseLeave={removeListItemHighlight}
          data-testid={`${dataTestIdPrefix}-dropdown-list-item-placeholder`}
        >
          <StyledComponents.DropdownListItemSpan>
            {placeholder.label}
          </StyledComponents.DropdownListItemSpan>
        </StyledComponents.DropdownListItem>
      ) : null}
      {listItems.map((item, index) => (
        <StyledComponents.DropdownListItem
          className="dropdown-list-item"
          key={item.id}
          onClick={() => handleSelect(item)}
          onKeyDown={() => handleSelect(item)}
          role="option"
          onMouseOver={highlightListItem}
          onMouseLeave={removeListItemHighlight}
          tabIndex={index}
          data-testid={`${dataTestIdPrefix}-dropdown-list-item-${index}`}
        >
          <StyledComponents.DropdownListItemSpan>
            {item.label}
          </StyledComponents.DropdownListItemSpan>
        </StyledComponents.DropdownListItem>
      ))}
    </StyledComponents.DropdownList>
  );
}

DropdownList.defaultProps = {
  isNullable: false,
  placeholder: null,
  dataTestIdPrefix: 'dropdown-list',
};

export default DropdownList;
