import { object } from '@storybook/addon-knobs';
import { RelationshipStatus } from 'containers/AccountSettings/CompanyRelationships/RelationshipStatus';
import { CompanyRelationshipDisplayStatus } from 'containers/AccountSettings/CompanyRelationships/types';
import { uniqueId } from 'lodash';
import I18nProvider from 'next-translate/I18nProvider';
import { useEffect, useState } from 'react';
import { SortableTable } from '.';
import companyRelationships from '../../../locales/en/companyRelationships.json';

enum TableColumnNames {
  COMPANY_NAME = 'COMPANY_NAME',
  SECTOR = 'SECTOR',
  LOCATION = 'LOCATION',
  STATUS = 'STATUS',
  EMISSIONS = 'EMISSIONS',
}

const headers = [
  {
    columnName: TableColumnNames.COMPANY_NAME,
    cell: 'Company name',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.SECTOR,
    cell: 'Sector',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.LOCATION,
    cell: 'Location',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.STATUS,
    cell: 'Status',
    isSortable: false,
  },
  {
    columnName: TableColumnNames.EMISSIONS,
    cell: 'Emissions',
    isSortable: true,
  },
];

const getRows = () => [
  {
    rowName: uniqueId(),
    columns: [
      { columnName: TableColumnNames.COMPANY_NAME, cell: 'Acme Corporation' },
      { columnName: TableColumnNames.SECTOR, cell: 'Shipping & Trading' },
      { columnName: TableColumnNames.LOCATION, cell: 'UK' },
      {
        columnName: TableColumnNames.STATUS,
        cell: (
          <RelationshipStatus
            canEditSupplyDashboard
            reSendInvite={() => {}}
            status={CompanyRelationshipDisplayStatus.INVITATION_SENT}
          />
        ),
        sortValue: CompanyRelationshipDisplayStatus.INVITATION_SENT,
      },
      {
        columnName: TableColumnNames.EMISSIONS,
        cell: '1,500 tCO2',
        sortValue: 1500,
      },
    ],
  },
  {
    rowName: uniqueId(),
    columns: [
      {
        columnName: TableColumnNames.COMPANY_NAME,
        cell: 'Umbrella Corporation',
      },
      { columnName: TableColumnNames.SECTOR, cell: 'Logistics' },
      { columnName: TableColumnNames.LOCATION, cell: 'UK' },
      {
        columnName: TableColumnNames.STATUS,
        cell: (
          <RelationshipStatus
            canEditSupplyDashboard
            reSendInvite={() => {}}
            status={CompanyRelationshipDisplayStatus.CONNECTED}
          />
        ),
        sortValue: CompanyRelationshipDisplayStatus.CONNECTED,
      },
      {
        columnName: TableColumnNames.EMISSIONS,
        cell: '500 tCO2',
        sortValue: 500,
      },
    ],
  },
  {
    rowName: uniqueId(),
    columns: [
      {
        columnName: TableColumnNames.COMPANY_NAME,
        cell: 'Massive Dynamic',
      },
      { columnName: TableColumnNames.SECTOR, cell: 'IT' },
      { columnName: TableColumnNames.LOCATION, cell: 'Ireland' },
      {
        columnName: TableColumnNames.STATUS,
        cell: (
          <RelationshipStatus
            canEditSupplyDashboard
            reSendInvite={() => {}}
            status={CompanyRelationshipDisplayStatus.INVITATION_SENT}
          />
        ),
        sortValue: CompanyRelationshipDisplayStatus.INVITATION_SENT,
      },
      {
        columnName: TableColumnNames.EMISSIONS,
        cell: '2,000 tCO2',
        sortValue: 2000,
      },
    ],
  },
  {
    rowName: uniqueId(),
    columns: [
      {
        columnName: TableColumnNames.COMPANY_NAME,
        cell: 'Massive Dynamic',
      },
      { columnName: TableColumnNames.SECTOR, cell: 'IT' },
      { columnName: TableColumnNames.LOCATION, cell: 'UK' },
      {
        columnName: TableColumnNames.STATUS,
        cell: (
          <RelationshipStatus
            canEditSupplyDashboard
            reSendInvite={() => {}}
            status={CompanyRelationshipDisplayStatus.INVITATION_SENT}
          />
        ),
        sortValue: CompanyRelationshipDisplayStatus.INVITATION_SENT,
      },
      {
        columnName: TableColumnNames.EMISSIONS,
        cell: '21,000 tCO2',
        sortValue: 21000,
      },
    ],
  },
];

export default {
  title: 'SortableTable',
  component: SortableTable,
};

const rows = [...getRows(), ...getRows(), ...getRows(), ...getRows()];
export const withDummyData = () => {
  return (
    <I18nProvider lang="en" namespaces={{ companyRelationships }}>
      <SortableTable
        headers={object('Headers', headers)}
        rows={object('Rows', [...rows])}
        defaultSortColumn={TableColumnNames.EMISSIONS}
      />
    </I18nProvider>
  );
};

interface ApiRes {
  quote: string;
  character: string;
  anime: string;
}

export const asyncData = () => {
  const headers2 = [
    {
      columnName: 'anime',
      cell: 'anime',
      isSortable: true,
    },
    {
      columnName: 'character',
      cell: 'character',
      isSortable: true,
    },
    {
      columnName: 'quote',
      cell: 'quote',
      isSortable: true,
    },
  ];

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [quotes, setQuotes] = useState<any[]>([]);
  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    const res = await fetch(
      `https://animechan.vercel.app/api/quotes/anime?title=naruto&page=${pageNumber}`
    );
    const q = (await res.json()) as ApiRes[];
    setQuotes(
      q.map((value) => {
        return {
          rowName: value.quote,
          columns: [
            {
              columnName: 'anime',
              cell: value.anime,
            },
            {
              columnName: 'character',
              cell: value.character,
            },
            {
              columnName: 'quote',
              cell: value.quote,
            },
          ],
        };
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  return (
    <I18nProvider lang="en" namespaces={{ companyRelationships }}>
      <SortableTable
        headers={object('Headers', headers2)}
        rows={quotes}
        defaultSortColumn={TableColumnNames.EMISSIONS}
        onPageChange={(pageNumber) => {
          setPage(pageNumber);
          fetchData(pageNumber);
        }}
        loading={loading}
        size={100}
      />
    </I18nProvider>
  );
};
