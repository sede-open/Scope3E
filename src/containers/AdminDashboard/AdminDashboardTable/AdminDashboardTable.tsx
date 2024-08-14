import useTranslation from 'next-translate/useTranslation';
import { Table } from 'components/Table';
import * as selectors from '../selectors';
import * as StyledComponents from './styledComponents';

type Row = any[] | any;

interface IProps {
  headers: string[];
  rows: Row[];
}

export const AdminDashboardTable = ({ headers, rows }: IProps) => {
  const { t } = useTranslation();

  return (
    <StyledComponents.TableContainer>
      <Table
        headers={headers.map(t)}
        rows={rows}
        testId={selectors.adminDashboardTable}
      />
    </StyledComponents.TableContainer>
  );
};
