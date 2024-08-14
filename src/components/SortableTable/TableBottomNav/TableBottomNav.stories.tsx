import { number } from '@storybook/addon-knobs';
import { useState } from 'react';
import { TableBottomNav } from '.';

export const withDummyData = () => {
  const [page, setPage] = useState(1);
  return (
    <div>
      <TableBottomNav
        perPage={number('per page', 5)}
        size={number('size', 53)}
        page={number('page', page)}
        onPageChange={setPage}
      />
    </div>
  );
};

export default {
  title: 'Table Bottom Nav',
  component: TableBottomNav,
};
