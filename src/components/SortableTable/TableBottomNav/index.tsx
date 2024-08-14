import { Text } from 'components/Text';
import Trans from 'next-translate/Trans';
import { Gray } from 'styles/colours';
import { Pagination } from '../Pagination';
import { PaginationProps } from '../types';
import { PaginationContainer } from './styledComponents';

export const TableBottomNav = (props: PaginationProps) => {
  const { size, perPage, page } = props;
  const shownResults = `${(page - 1) * perPage + 1}-${
    perPage * page > size ? size : perPage * page
  }`;
  return (
    <PaginationContainer>
      <Text color={Gray}>
        <Trans
          i18nKey="common:table-pagination"
          values={{ shownResults, totalResults: size }}
        />
      </Text>
      <Pagination {...props} />
    </PaginationContainer>
  );
};
