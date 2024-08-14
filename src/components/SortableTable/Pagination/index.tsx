import { ReactNode } from 'react';
import { PaginationProps } from '../types';
import { Ellipsis } from './Icons/Ellipsis';
import { LeftArrow } from './Icons/LeftArrow';
import { RightArrow } from './Icons/RightArrow';
import { PaginationButton, PaginationContainer } from './styledComponents';
import * as selectors from '../selectors';

export const Pagination = ({
  perPage,
  page,
  size,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(size / perPage);

  const startPages = [1, 2, 3, 4, 5, <Ellipsis />, totalPages];

  const middlePages = [
    1,
    <Ellipsis />,
    page - 1,
    page,
    page + 1,
    <Ellipsis />,
    totalPages,
  ];

  const endPages = [
    1,
    <Ellipsis />,
    totalPages - 4,
    totalPages - 3,
    totalPages - 2,
    totalPages - 1,
    totalPages,
  ];

  let pages: (number | ReactNode)[] = [];

  if (totalPages > 7) {
    if (page <= 4) {
      pages = startPages;
    } else if (totalPages - 3 <= page) {
      pages = endPages;
    } else {
      pages = middlePages;
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  return (
    <PaginationContainer>
      <PaginationButton
        disabled={page === 1}
        $arrow="left"
        onClick={() => onPageChange(page - 1)}
      >
        <LeftArrow />
      </PaginationButton>
      {pages.map((v, i) => {
        const isActive = !!(Number(v) && page === v);
        return (
          <PaginationButton
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            data-testid={`${selectors.paginationButton}-${v}`}
            $active={isActive}
            onClick={() => Number(v) && !isActive && onPageChange(v as number)}
            $ellipsis={!Number(v)}
          >
            {v}
          </PaginationButton>
        );
      })}
      <PaginationButton
        disabled={page === totalPages}
        $arrow="right"
        onClick={() => onPageChange(page + 1)}
      >
        <RightArrow />
      </PaginationButton>
    </PaginationContainer>
  );
};
