import { AdminCompaniesQuery_companies_data as Company } from 'types/AdminCompaniesQuery';
import { companiesTableHeaders, getCompaniesTableRows } from './utils';
import { AdminDashboardTable } from '../../AdminDashboardTable/AdminDashboardTable';
import { ModalState } from '../../types';

interface IProps {
  companiesList: Company[];
  setModalState: (state: ModalState) => void;
}

export const CompaniesTable = ({ companiesList, setModalState }: IProps) => {
  const tableRows = getCompaniesTableRows({
    companiesList,
    setModalState,
  });
  return (
    <AdminDashboardTable headers={companiesTableHeaders} rows={tableRows} />
  );
};
