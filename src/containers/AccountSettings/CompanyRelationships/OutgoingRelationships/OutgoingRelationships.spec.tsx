import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortableTable } from 'components/SortableTable';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { mockFlags } from 'jest-launchdarkly-mock';
import { mocked } from 'jest-mock';
import {
  createCompanyRelationship,
  externalCompany,
  getSupplierRelationships,
  userCompany,
} from 'mocks/companyRelationships';
import { baseMe } from 'mocks/me';
import I18nProvider from 'next-translate/I18nProvider';
import {
  AmbitionPrivacyStatus,
  CompanyRelationshipType,
  CompanySectorType,
  EmissionPrivacyStatus,
  InviteStatus,
} from 'types/globalTypes';
import { OutgoingRelationships } from '.';
import companyRelationshipNamespace from '../../../../../locales/en/companyRelationships.json';
import { TableColumnNames } from './types';

jest.mock('effects/useAuthenticatedUser');
jest.mock('components/SortableTable');
const mockedSortableTable = mocked(SortableTable);

type OutgoingRelationshipsProps = React.ComponentProps<
  typeof OutgoingRelationships
>;

const setup = ({
  relationships = [],
  relationshipType = CompanyRelationshipType.SUPPLIER,
}: Partial<OutgoingRelationshipsProps>) => {
  return render(
    <I18nProvider
      namespaces={{ companyRelationships: companyRelationshipNamespace }}
    >
      <OutgoingRelationships
        relationships={relationships}
        relationshipType={relationshipType}
      />
    </I18nProvider>
  );
};

describe('OutgoingRelationships', () => {
  ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
    () => baseMe
  );
  mockedSortableTable.mockReturnValue(<div />);
  beforeEach(() => {
    mockedSortableTable.mockClear();
  });
  describe('when relationshipType is Supplier', () => {
    describe('when isNetworkPageEnabled is true', () => {
      beforeEach(() => {
        mockFlags({ isNetworkPageEnabled: true });
      });
      it('should display supplier table headings', () => {
        setup({
          relationships: getSupplierRelationships(),
        });
        expect(mockedSortableTable).toHaveBeenCalledWith(
          expect.objectContaining({
            headers: expect.arrayContaining([
              expect.objectContaining({
                cell: companyRelationshipNamespace[
                  'table-header-name'
                ].toUpperCase(),
              }),
              expect.objectContaining({
                cell: companyRelationshipNamespace[
                  'table-header-invited-by'
                ].toUpperCase(),
              }),
              expect.objectContaining({
                cell: companyRelationshipNamespace[
                  'table-header-sector'
                ].toUpperCase(),
              }),
              expect.objectContaining({
                cell: companyRelationshipNamespace[
                  'table-header-emissions-data'
                ].toUpperCase(),
              }),
              expect.objectContaining({
                cell: companyRelationshipNamespace[
                  'table-header-ambition'
                ].toUpperCase(),
              }),
              expect.objectContaining({
                cell: companyRelationshipNamespace[
                  'table-header-status'
                ].toUpperCase(),
              }),
              expect.objectContaining({
                cell: companyRelationshipNamespace[
                  'table-header-actions'
                ].toUpperCase(),
              }),
            ]),
          }),
          {}
        );
      });

      it('should display correct values in table rows', () => {
        const supplierRelationships = [
          createCompanyRelationship({
            overrides: {
              id: '0',
              inviteType: CompanyRelationshipType.SUPPLIER,
              status: InviteStatus.APPROVED,
              customer: userCompany,
              supplier: {
                ...externalCompany,
                name: 'Zed ltd',
                companySectors: [
                  {
                    sectorType: CompanySectorType.PRIMARY,
                    sector: { name: 'Agriculture' },
                  },
                ],
                location: 'UK',
              },
              ambitionPrivacyStatus: AmbitionPrivacyStatus.SHARED,
              emissionPrivacyStatus: EmissionPrivacyStatus.SHARED,
            },
          }),
        ];
        setup({
          relationships: supplierRelationships,
        });
        expect(mockedSortableTable).toHaveBeenCalledWith(
          expect.objectContaining({
            rows: expect.arrayContaining([
              expect.objectContaining({
                columns: expect.arrayContaining([
                  expect.objectContaining({
                    sortValue: supplierRelationships[0].supplier.name,
                    columnName: TableColumnNames.COMPANY_NAME,
                  }),
                  { cell: '-', columnName: 'INVITED_BY' },
                  { cell: 'Agriculture', columnName: 'SECTOR' },
                  expect.objectContaining({
                    columnName: 'EMISSIONS_DATA',
                    sortValue: 'Shared',
                  }),
                  expect.objectContaining({
                    columnName: 'AMBITION',
                    sortValue: 'Shared',
                  }),
                  expect.objectContaining({
                    columnName: 'STATUS',
                    sortValue: 'connected',
                  }),
                  { cell: '-', columnName: 'ACTIONS', sortValue: '-' },
                ]),
              }),
            ]),
          }),
          {}
        );
      });

      it('should display total shared ambitions', () => {
        const { getByText } = setup({
          relationships: [
            ...getSupplierRelationships(),
            createCompanyRelationship({
              overrides: {
                id: '3',
                inviteType: CompanyRelationshipType.SUPPLIER,
                status: InviteStatus.APPROVED,
                ambitionPrivacyStatus: AmbitionPrivacyStatus.SHARED_SBTI,
                customer: userCompany,
                supplier: {
                  ...externalCompany,
                  name: 'Zed ltd',
                  companySectors: [
                    {
                      sectorType: CompanySectorType.PRIMARY,
                      sector: { name: 'Agriculture' },
                    },
                  ],
                  location: 'UK',
                },
              },
            }),
            createCompanyRelationship({
              overrides: {
                id: '4',
                inviteType: CompanyRelationshipType.SUPPLIER,
                status: InviteStatus.APPROVED,
                ambitionPrivacyStatus: AmbitionPrivacyStatus.NOT_SHARED,
                customer: userCompany,
                supplier: {
                  ...externalCompany,
                  name: 'Zed ltd',
                  companySectors: [
                    {
                      sectorType: CompanySectorType.PRIMARY,
                      sector: { name: 'Agriculture' },
                    },
                  ],
                  location: 'UK',
                },
              },
            }),
          ],
        });

        expect(getByText('2 suppliers (1 with SBTi)'));
      });
      describe('when filter options are selected', () => {
        it('should display relevant data', async () => {
          mockFlags({ isNetworkPageEnabled: true });
          const { getByText } = setup({
            relationships: getSupplierRelationships(),
          });
          const dropdown = getByText(
            companyRelationshipNamespace['dropdown-placeholder']
          );
          await userEvent.click(dropdown);
          const optionText = 'Zoology';
          const option = getByText(optionText);
          await userEvent.click(option);
          const firstSortTableRow =
            mockedSortableTable.mock.calls[1][0].rows[0];
          const filteredColumn = firstSortTableRow.columns.find(
            (column) => column.columnName === TableColumnNames.SECTOR
          );
          expect(filteredColumn?.cell).toEqual(optionText);
        });
      });
    });
  });
});
