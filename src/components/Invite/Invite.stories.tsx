import I18nProvider from 'next-translate/I18nProvider';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import {
  CompanyRelationshipType,
  CompanySectorType,
  CompanyStatus,
  InviteStatus,
} from 'types/globalTypes';
import companyRelationships from '../../../locales/en/companyRelationships.json';
import { Invite } from '.';

const invite = {
  id: 'some-invite-id',
  status: InviteStatus.AWAITING_SUPPLIER_APPROVAL,
  inviteType: CompanyRelationshipType.CUSTOMER,
  customer: {
    id: 'some-customer-id',
    name: 'Customer Co.',
    companySectors: [
      {
        sectorType: CompanySectorType.PRIMARY,
        sector: { name: 'Manufacturing' },
      },
    ],
    location: 'UK',
    status: CompanyStatus.ACTIVE,
  },
  supplier: {
    id: 'some-supplier-id',
    name: 'Supplier Co.',
    companySectors: [
      {
        sectorType: CompanySectorType.PRIMARY,
        sector: { name: 'Manufacturing' },
      },
    ],
    location: 'US',
    status: CompanyStatus.ACTIVE,
  },
  note: 'Some message text to display in the Message section',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default {
  title: 'Invite',
  component: Invite,
};

export const withDummyData = () => (
  <I18nProvider lang="en" namespaces={{ companyRelationships }}>
    <Invite
      invite={invite}
      isDisabled={boolean('isDisabled', false)}
      onAccept={action('onAccept')}
      onReject={action('onReject')}
      shouldDisplayControls={boolean('shouldDisplayControls', true)}
    />
  </I18nProvider>
);
