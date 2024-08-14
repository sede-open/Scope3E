import I18nProvider from 'next-translate/I18nProvider';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';

import {
  CompanySectorType,
  EmissionAllocationMethod,
  EmissionAllocationStatus,
} from 'types/globalTypes';
import common from '../../../locales/en/common.json';
import valueChain from '../../../locales/en/valueChain.json';
import { PendingAllocation } from '.';

export default {
  title: 'PendingAllocation',
  component: PendingAllocation,
};

const allocationMethodOptions = {
  Economical: EmissionAllocationMethod.ECONOMICAL,
  Physical: EmissionAllocationMethod.PHYSICAL,
  Other: EmissionAllocationMethod.OTHER,
};

const approvedEmissionAllocation = {
  addedToCustomerScopeTotal: false,
  allocationMethod: null,
  id: '2FA2BE18-0E99-4F4D-815D-C66F143CFCB5',
  emissions: 8937,
  status: EmissionAllocationStatus.APPROVED,
  note: 'Give me allocations...',
  customer: {
    id: 'some-id',
    name: 'The Waterfall Hub Corp',
    companySectors: [
      {
        sectorType: CompanySectorType.PRIMARY,
        sector: { name: 'hardware' },
      },
    ],
  },
  supplier: {
    id: 'some-id',
    name: 'DHL',
    companySectors: [
      {
        sectorType: CompanySectorType.PRIMARY,
        sector: { name: 'Logistics' },
      },
    ],
  },
  category: {
    id: '3A46C00E-CD7C-496C-98B2-4B83599F9C37',
    name: 'Cat. 13 - Some category',
    order: 13,
  },
  createdAt: '2021-02-26 09:41:06.937',
  year: 2020,
};

export const withDummyData = () => (
  <I18nProvider lang="en" namespaces={{ common, valueChain }}>
    <PendingAllocation
      allocation={{
        ...approvedEmissionAllocation,
        allocationMethod: select(
          'Allocation method',
          allocationMethodOptions,
          EmissionAllocationMethod.ECONOMICAL
        ),
      }}
      isDisabled={boolean('isDisabled', false)}
      isMissingEmissions={boolean('isMissingEmissions', false)}
      onAccept={action('onAccept')}
      onAddEmissions={action('onAddEmissions')}
      onReject={action('onReject')}
      hasEditPermission={boolean('hasEditPermission', true)}
    />
  </I18nProvider>
);
