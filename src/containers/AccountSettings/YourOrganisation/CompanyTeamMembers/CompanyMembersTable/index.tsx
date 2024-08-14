import useTranslation from 'next-translate/useTranslation';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';

import { SortableTable } from 'components/SortableTable';

import { getTableHeaders, getUsersTableRows, TableColumnNames } from './utils';
import { IProps } from './types';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export const CompanyMembersTable = ({ usersList, setModalState }: IProps) => {
  const { t } = useTranslation();
  const { id: currentUserId } = useAuthenticatedUser();

  const tableRows = getUsersTableRows({
    usersList,
    currentUserId,
    setModalState,
  });

  return (
    <StyledComponents.TableLayout>
      <SortableTable
        dataTestId={selectors.companyUserTable}
        defaultSortColumn={TableColumnNames.STATUS}
        headers={getTableHeaders().map((header) => ({
          ...header,
          cell: t(header.cell).toUpperCase(),
        }))}
        rows={tableRows}
        hasLargePaddingLeft
      />
    </StyledComponents.TableLayout>
  );
};
