import I18nProvider from 'next-translate/I18nProvider';

import { CompanyRelationshipDisplayStatus } from 'containers/AccountSettings/CompanyRelationships/types';
import { RelationshipStatus } from 'containers/AccountSettings/CompanyRelationships/RelationshipStatus';
import companyRelationships from '../../../locales/en/companyRelationships.json';
import { Table } from '.';

const headers = ['Company name', 'Sector', 'Location', 'Status'];

const rows = [
  ['Acme Corporation', 'Shipping & Trading', 'UK', 'Invitation sent'],
  [
    'Umbrella Corporation',
    'Logistics',
    'UK',
    <RelationshipStatus
      canEditSupplyDashboard
      reSendInvite={() => {}}
      status={CompanyRelationshipDisplayStatus.CONNECTED}
    />,
  ],
  ['Massive Dynamic', 'IT', 'UK', 123],
  [
    'Massive Dynamic',
    'IT',
    'UK',
    <RelationshipStatus
      canEditSupplyDashboard
      reSendInvite={() => {}}
      status={CompanyRelationshipDisplayStatus.INVITATION_SENT}
    />,
  ],
  ['Massive Dynamic', 'IT', 'UK', 'Connected'],
  [
    'Massive Dynamic',
    'IT',
    'UK',
    <RelationshipStatus
      canEditSupplyDashboard
      reSendInvite={() => {}}
      status={CompanyRelationshipDisplayStatus.INVITATION_DECLINED}
    />,
  ],
];

export default {
  title: 'Table',
  component: Table,
};

export const withDummyData = () => (
  <I18nProvider lang="en" namespaces={{ companyRelationships }}>
    <Table headers={headers} rows={rows} />
  </I18nProvider>
);
