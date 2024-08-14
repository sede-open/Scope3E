import { render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { CompanyRelationshipType } from 'types/globalTypes';
import { NetworkTableHeader } from '.';
import companyRelationshipNamespace from '../../../../../../locales/en/companyRelationships.json';

type NetworkTableHeaderProps = React.ComponentProps<typeof NetworkTableHeader>;
describe('NetworkTableHeader', () => {
  const setup = (props?: Partial<NetworkTableHeaderProps>) =>
    render(
      <I18nProvider
        namespaces={{ companyRelationships: companyRelationshipNamespace }}
      >
        <NetworkTableHeader
          relationshipType={CompanyRelationshipType.SUPPLIER}
          canEditCompanyRelationships={false}
          openInviteCompanyModal={jest.fn()}
          totalRelations={0}
          totalRelationsWithAmbitions={0}
          totalRelationsWithSBTI={0}
          dropdownOptions={[]}
          onDropdownValueChange={jest.fn()}
          dropdownValues={undefined}
          {...props}
        />
      </I18nProvider>
    );
  it('should display plural titles if relations > 1', () => {
    const { queryByText } = setup({
      totalRelations: 2,
      totalRelationsWithAmbitions: 2,
    });

    expect(queryByText('2 suppliers')).toBeInTheDocument();
    expect(queryByText('2 suppliers (0 with SBTi)')).toBeInTheDocument();
  });

  it('should display singular titles if relations = 1', () => {
    const { queryByText } = setup({
      totalRelations: 1,
      totalRelationsWithAmbitions: 1,
    });

    expect(queryByText('1 supplier')).toBeInTheDocument();
    expect(queryByText('1 supplier (0 with SBTi)')).toBeInTheDocument();
  });
});
