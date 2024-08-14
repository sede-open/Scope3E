import { number } from '@storybook/addon-knobs';
import { useState } from 'react';
import { Pagination } from '.';

export const withoutEllipsis = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      perPage={number('Per Page', 15)}
      size={number('Size', 53)}
      page={page}
      onPageChange={setPage}
    />
  );
};

export const withEllipsis = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      perPage={number('Per Page', 5)}
      size={number('Size', 53)}
      page={page}
      onPageChange={setPage}
    />
  );
};

export default {
  title: 'Pagination',
  component: Pagination,
};
